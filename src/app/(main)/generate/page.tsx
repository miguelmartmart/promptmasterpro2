
"use client";

import { PromptGeneratorForm } from '@/components/ai/prompt-generator-form';
import { ProtectedRoute } from '@/components/auth/protected-route';

export default function GeneratePromptPage() {
  return (
    <ProtectedRoute>
      <div>
        <PromptGeneratorForm />
      </div>
    </ProtectedRoute>
  );
}
