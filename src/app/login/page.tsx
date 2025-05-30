
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
  
  // If user becomes available while on login page (e.g., due to fast auth state restoration),
  // this will prevent rendering the login form briefly before redirect.
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
            src="/_next/static/media/or3nQ6H_1_WfwkMZI_qYFrcdmhHkjko-s.p.be19f591.woff2" // Using one of the existing font/image as a placeholder
            alt="PromptCraft Pro Logo" 
            width={80} 
            height={80} 
            className="mx-auto mb-4 rounded-full"
            data-ai-hint="abstract logo"
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
            <a href="/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary ml-1">Terms of Service</a> and 
            <a href="/privacy_policy.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary ml-1">Privacy Policy</a>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
