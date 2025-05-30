"use client";

import type { PromptCategory, PromptLanguageCode, AIModel } from '@/lib/types';
import { usePrompts } from '@/contexts/prompt-context';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface Filters {
  searchTerm: string;
  category: PromptCategory | 'all';
  language: PromptLanguageCode | 'all';
  aiModel: AIModel | 'all';
}

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

export function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  const { state } = usePrompts();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchTerm: e.target.value });
  };

  const handleSelectChange = (name: keyof Filters) => (value: string) => {
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="mb-6 p-4 bg-card rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div>
          <Label htmlFor="searchTerm" className="mb-1 block text-sm font-medium">Search Prompts</Label>
          <Input
            id="searchTerm"
            type="text"
            placeholder="Search by title or content..."
            value={filters.searchTerm}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="category" className="mb-1 block text-sm font-medium">Category</Label>
          <Select value={filters.category} onValueChange={handleSelectChange('category')}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {state.categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="language" className="mb-1 block text-sm font-medium">Language</Label>
          <Select value={filters.language} onValueChange={handleSelectChange('language')}>
            <SelectTrigger id="language">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              {Object.entries(state.languages).map(([code, name]) => (
                <SelectItem key={code} value={code}>{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="aiModel" className="mb-1 block text-sm font-medium">AI Model</Label>
          <Select value={filters.aiModel} onValueChange={handleSelectChange('aiModel')}>
            <SelectTrigger id="aiModel">
              <SelectValue placeholder="Select AI Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Models</SelectItem>
              {state.aiModels.map(model => (
                <SelectItem key={model} value={model}>{model}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
