
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const { user, signInWithGoogle, loadingAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/'); // Redirect to home if already logged in
    }
  }, [user, router]);

  if (loadingAuth && !user) { // Show loader if auth is loading and user is not yet determined
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  if (user) {
     return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-muted-foreground">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-primary/20 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <Image 
            src="https://placehold.co/80x80.png?text=PCP" 
            alt="PromptCraft Pro Logo" 
            width={80} 
            height={80} 
            className="mx-auto mb-4 rounded-lg" // Changed to rounded-lg for a bit more modern feel
            data-ai-hint="abstract geometric logo"
          />
          <CardTitle className="text-3xl font-bold">Welcome to PromptCraft Pro</CardTitle>
          <CardDescription>Sign in to access your personalized prompt library and features.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={signInWithGoogle} 
            disabled={loadingAuth}
            className="w-full text-lg py-6"
          >
            {loadingAuth ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <LogIn className="mr-2 h-5 w-5" />
            )}
            Sign In with Google
          </Button>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            By signing in, you agree to our 
            <Link href="/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary ml-1">Terms of Service</Link> and 
            <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary ml-1">Privacy Policy</Link>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
