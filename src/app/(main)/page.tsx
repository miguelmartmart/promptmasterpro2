"use client";

import { useState, useMemo } from 'react';
import { usePrompts } from '@/contexts/prompt-context';
import { PromptList } from '@/components/prompts/prompt-list';
import { FilterBar, type Filters } from '@/components/prompts/filter-bar';
import type { Prompt } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomePage() {
  const { state } = usePrompts();
  const [filters, setFilters] = useState<Filters>({
    searchTerm: '',
    category: 'all',
    language: 'all',
    aiModel: 'all',
  });

  const filteredPrompts = useMemo(() => {
    return state.prompts.filter((prompt: Prompt) => {
      const searchTermMatch = filters.searchTerm.toLowerCase() === '' ||
        prompt.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        prompt.content.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const categoryMatch = filters.category === 'all' || prompt.category === filters.category;
      const languageMatch = filters.language === 'all' || prompt.language === filters.language;
      const aiModelMatch = filters.aiModel === 'all' || prompt.aiModel === filters.aiModel;
      return searchTermMatch && categoryMatch && languageMatch && aiModelMatch;
    });
  }, [state.prompts, filters]);

  if (state.isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end p-4 bg-card rounded-lg shadow">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-20 w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FilterBar filters={filters} onFilterChange={setFilters} />
      <PromptList prompts={filteredPrompts} />
    </div>
  );
}
