"use client";

import type { ReactNode } from 'react';
import { PromptProvider } from '@/contexts/prompt-context';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <PromptProvider>
      {children}
    </PromptProvider>
  );
}
