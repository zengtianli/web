'use client'

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { uiTexts } from '@/lib/ui-texts';

interface SearchItem {
  id: string;
  title: string;
  path: string;
  content: string; // Keep for potential snippets, though not displayed in this basic version
}

// Basic debounce function
function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
  let timeout: NodeJS.Timeout | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => void;
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const fetchResults = async (searchTerm: string) => {
    if (searchTerm.trim() === '') {
      setResults([]);
      setShowResults(false);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) {
        console.error('Search API error:', response.statusText);
        setResults([]);
        setShowResults(true); // Show to indicate no results or error
        return;
      }
      const data: SearchItem[] = await response.json();
      setResults(data);
      setShowResults(true);
    } catch (error) {
      console.error('Failed to fetch search results:', error);
      setResults([]);
      setShowResults(true); // Show to indicate error
    }
    setIsLoading(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchResults = useCallback(debounce(fetchResults, 300), []);

  useEffect(() => {
    debouncedFetchResults(query);
  }, [query, debouncedFetchResults]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleFocus = () => {
    if (results.length > 0 || query) {
        setShowResults(true);
    }
  };

  const handleBlur = () => {
    // Delay hiding results to allow click on result items
    setTimeout(() => {
        setShowResults(false);
    }, 150);
  };

  return (
    <div style={{ position: 'relative', margin: '1rem 0' }}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={uiTexts.placeholder.searchSite}
        style={{
          padding: '0.5rem',
          fontSize: '1rem',
          width: '300px',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}
      />
      {isLoading && <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', border: '1px solid #eee', padding: '0.5rem', zIndex: 10 }}>{uiTexts.loading.searching}</div>}
      {showResults && !isLoading && (
        <div style={{
          position: 'absolute',
          top: '100%', // Position below the input
          left: 0,
          right: 0,
          maxHeight: '300px',
          overflowY: 'auto',
          background: 'white',
          border: '1px solid #eee',
          borderTop: 'none',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          zIndex: 10, // Ensure it's above other content
          color: '#333' // Text color for results
        }}>
          {results.length > 0 ? (
            <ul>
              {results.map((item) => (
                <li key={item.id} style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0' }}>
                  <Link href={item.path} onClick={() => { setQuery(''); setShowResults(false); }}>
                    <span style={{ display: 'block', fontWeight: 'bold' }}>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div style={{ padding: '0.5rem' }}>{query ? uiTexts.stats.noResults : uiTexts.placeholder.search}</div>
          )}
        </div>
      )}
    </div>
  );
} 