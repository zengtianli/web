'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation'; // Changed from next/link for programmatic navigation after selection
import { FileText, Search as SearchIcon } from 'lucide-react'; // Using lucide-react for icons

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'; // Assuming shadcn/ui command component is available
import { Button } from '@/components/ui/button'; // Assuming shadcn/ui button component
import { cn } from '@/lib/utils'; // For conditional classes

interface SearchResultItem {
  id: string;
  title: string;
  url: string; // Changed from path to url to match data structure
  content?: string; // Keep for potential future use like snippets
  type?: string; // Added based on logs
  // Add other relevant fields if necessary, e.g., type (page, project)
}

// Debounce function (can be moved to a utils file if used elsewhere)
function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
  let timeout: NodeJS.Timeout | null = null;
  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
  return debounced as (...args: Parameters<F>) => void;
}

export function SearchDialog() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Open/close dialog with Ctrl+K or Cmd+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const fetchResults = async (searchTerm: string) => {
    if (searchTerm.trim().length < 1) { // Typically search after 1 or 2 chars
      setResults([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) {
        console.error('Search API error:', response.statusText);
        setResults([]);
      } else {
        const data: SearchResultItem[] = await response.json();
        setResults(data);
      }
    } catch (error) {
      console.error('Failed to fetch search results:', error);
      setResults([]);
    }
    setIsLoading(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchResults = useCallback(debounce(fetchResults, 300), []);

  useEffect(() => {
    debouncedFetchResults(query);
  }, [query, debouncedFetchResults]);

  const handleSelectResult = (selectedUrl: string) => { // Parameter changed from path to selectedUrl
    console.log('Selected item url:', selectedUrl);
    if (typeof selectedUrl !== 'string' || !selectedUrl) {
      console.error('Error: URL is undefined or not a string. Navigation aborted.', selectedUrl);
      return;
    }
    router.push(selectedUrl);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          'relative h-9 w-full justify-start rounded-[0.5rem] text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64'
        )}
        onClick={() => setIsOpen(true)}
      >
        <SearchIcon className="h-4 w-4 mr-2" />
        <span className="hidden lg:inline-flex">搜索全站...</span>
        <span className="inline-flex lg:hidden">搜索...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        {/* The CommandDialog component should handle its own title for accessibility internally */}
        <CommandInput
          placeholder="输入关键词搜索页面、项目等..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList aria-label="搜索结果">
          {isLoading && <CommandEmpty>加载中...</CommandEmpty>}
          {!isLoading && !results.length && query.trim().length > 1 && (
            <CommandEmpty>未找到与 "{query}" 相关的内容。</CommandEmpty>
          )}
          {!isLoading && !results.length && query.trim().length < 1 && (
            <CommandEmpty>请输入关键词开始搜索。</CommandEmpty>
          )}
          {!isLoading && results.length > 0 && (
            <CommandGroup heading="搜索结果">
              {results.map((item) => {
                console.log('Rendering CommandItem with:', item); // Debugging line for each item
                return (
                  <CommandItem
                    key={item.id}
                    value={`${item.title} ${item.url || ''}`} // Use item.url
                    onSelect={() => handleSelectResult(item.url)} // Pass item.url
                    className="cursor-pointer"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
} 