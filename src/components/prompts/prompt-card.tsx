"use client";

import type { Prompt } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Heart, Edit, Trash2, Eye } from 'lucide-react';
import { usePrompts } from '@/contexts/prompt-context';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

interface PromptCardProps {
  prompt: Prompt;
  isAdminView?: boolean;
  onEdit?: (prompt: Prompt) => void;
}

export function PromptCard({ prompt, isAdminView = false, onEdit }: PromptCardProps) {
  const { state, toggleFavorite, deletePrompt: contextDeletePrompt } = usePrompts();
  const { toast } = useToast();
  const isFavorite = state.favorites.has(prompt.id);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content);
    toast({ title: "Copied!", description: "Prompt content copied to clipboard." });
  };

  const handleToggleFavorite = () => {
    toggleFavorite(prompt.id);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: prompt.title,
    });
  };
  
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${prompt.title}"?`)) {
      contextDeletePrompt(prompt.id);
      toast({ title: "Prompt deleted", description: prompt.title, variant: "destructive" });
    }
  };

  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg">{prompt.title}</CardTitle>
        <CardDescription className="text-sm capitalize">{prompt.category} - {prompt.language}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3">{prompt.content}</p>
        {prompt.aiModel && <Badge variant="secondary" className="mt-2">{prompt.aiModel}</Badge>}
      </CardContent>
      <CardFooter className="flex justify-between items-center gap-1 flex-wrap">
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={handleCopy} title="Copy Prompt">
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleToggleFavorite} title={isFavorite ? "Unfavorite" : "Favorite"}>
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-accent text-accent' : ''}`} />
          </Button>
          <Link href={`/prompts/${prompt.id}`} passHref>
            <Button variant="ghost" size="icon" title="View Details">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        {isAdminView && onEdit && (
          <div className="flex gap-1">
            <Button variant="outline" size="icon" onClick={() => onEdit(prompt)} title="Edit Prompt">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="destructive" size="icon" onClick={handleDelete} title="Delete Prompt">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
