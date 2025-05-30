
"use client";

import { useMemo } from 'react';
import { usePrompts } from '@/contexts/prompt-context';
import { PromptList } from '@/components/prompts/prompt-list';
import { Heart } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { ProtectedRoute } from '@/components/auth/protected-route';

export default function FavoritesPage() {
  const { state } = usePrompts();

  const favoritePrompts = useMemo(() => {
    return state.prompts.filter(prompt => state.favorites.has(prompt.id));
  }, [state.prompts, state.favorites]);

  const FavoritesContent = () => {
    if (state.isLoading) {
      return (
        <div className="space-y-6">
          <Skeleton className="h-10 w-1/3 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
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
        <div className="flex items-center gap-2 mb-6">
          <Heart className="h-8 w-8 text-accent" />
          <h1 className="text-3xl font-bold">My Favorite Prompts</h1>
        </div>
        {favoritePrompts.length > 0 ? (
          <PromptList prompts={favoritePrompts} />
        ) : (
          <p className="text-center text-muted-foreground py-8">
            You haven't added any prompts to your favorites yet. Explore the catalog and click the heart icon to save your favorites!
          </p>
        )}
      </div>
    );
  };
  
  return (
    <ProtectedRoute>
      <FavoritesContent />
    </ProtectedRoute>
  );
}
