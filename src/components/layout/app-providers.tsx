
"use client";

import type { ReactNode } from 'react';
import { PromptProvider } from '@/contexts/prompt-context';
import { AuthProvider } from '@/contexts/auth-context';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <PromptProvider>
        {children}
      </PromptProvider>
    </AuthProvider>
  );
}
