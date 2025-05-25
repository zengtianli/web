import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface SearchItem {
  id: string;
  title: string;
  path: string;
  content: string;
  tags?: string[];
}

let searchIndex: SearchItem[] = [];

// Load the search index on server start or when first accessed
function loadSearchIndex() {
  if (searchIndex.length > 0 && process.env.NODE_ENV === 'production') {
    // In production, assume index doesn't change and load once
    return;
  }
  try {
    const filePath = path.join(process.cwd(), 'public', 'search-index.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    searchIndex = JSON.parse(jsonData);
    console.log('Search index loaded successfully for API.');
  } catch (error) {
    console.error('Failed to load search index for API:', error);
    searchIndex = []; // Ensure it's an empty array on failure
  }
}

// Load the index when the module is loaded
loadSearchIndex();

export async function GET(request: Request) {
  // Ensure index is loaded, especially for development where it might change
  if (process.env.NODE_ENV !== 'production') {
    loadSearchIndex();
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase();

  if (!query) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  if (searchIndex.length === 0) {
    // This might happen if the index file is missing or an error occurred during load
    return NextResponse.json({ error: 'Search index is not available.' }, { status: 500 });
  }

  const results = searchIndex.filter(item => {
    const titleMatch = item.title.toLowerCase().includes(query);
    const contentMatch = item.content.toLowerCase().includes(query);
    const tagsMatch = item.tags ? item.tags.join(' ').toLowerCase().includes(query) : false;
    return titleMatch || contentMatch || tagsMatch;
  });

  return NextResponse.json(results);
} 