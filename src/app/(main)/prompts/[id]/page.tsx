"use client";

import { useParams } from 'next/navigation';
import { usePrompts } from '@/contexts/prompt-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Heart, Share2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function PromptDetailPage() {
  const params = useParams();
  const { id } = params;
  const { state, toggleFavorite } = usePrompts();
  const { toast } = useToast();

  const prompt = state.prompts.find(p => p.id === id);

  if (state.isLoading) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-6 w-1/4 mt-2" />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </CardFooter>
      </Card>
    );
  }

  if (!prompt) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold mb-4">Prompt Not Found</h2>
        <p className="text-muted-foreground mb-6">The prompt you are looking for does not exist or has been moved.</p>
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back to Catalog
          </Link>
        </Button>
      </div>
    );
  }

  const isFavorite = state.favorites.has(prompt.id);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content);
    toast({ title: "Copied!", description: "Prompt content copied to clipboard." });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: prompt.title,
        text: `Check out this prompt: ${prompt.title}`,
        url: window.location.href,
      }).catch(err => console.error("Error sharing:", err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link Copied!", description: "Prompt URL copied to clipboard." });
    }
  };

  const handleToggleFavorite = () => {
    toggleFavorite(prompt.id);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: prompt.title,
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
        <Button variant="outline" asChild className="mb-6">
            <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Catalog
            </Link>
        </Button>
        <Card className="shadow-xl">
        <CardHeader>
            <CardTitle className="text-3xl font-bold">{prompt.title}</CardTitle>
            <CardDescription className="text-base">
            Category: <Badge variant="secondary">{prompt.category}</Badge> | 
            Language: <Badge variant="secondary">{prompt.language}</Badge>
            {prompt.aiModel && <> | Model: <Badge variant="secondary">{prompt.aiModel}</Badge></>}
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">Prompt Content:</h3>
            <div className="p-4 bg-muted rounded-md whitespace-pre-wrap text-foreground/90 leading-relaxed">
            {prompt.content}
            </div>
            {prompt.tags && prompt.tags.length > 0 && (
            <div>
                <h4 className="text-md font-semibold mb-1">Tags:</h4>
                <div className="flex flex-wrap gap-2">
                {prompt.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                </div>
            </div>
            )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
            <div className="flex gap-2">
            <Button onClick={handleCopy}><Copy className="mr-2 h-4 w-4" /> Copy Prompt</Button>
            <Button variant="outline" onClick={handleShare}><Share2 className="mr-2 h-4 w-4" /> Share</Button>
            </div>
            <Button variant={isFavorite ? "default" : "outline"} onClick={handleToggleFavorite} className={isFavorite ? 'bg-accent hover:bg-accent/90 text-accent-foreground' : ''}>
            <Heart className={`mr-2 h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} /> 
            {isFavorite ? 'Favorited' : 'Add to Favorites'}
            </Button>
        </CardFooter>
        </Card>
    </div>
  );
}
