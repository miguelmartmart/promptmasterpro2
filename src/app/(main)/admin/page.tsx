"use client";

import { useState } from 'react';
import { usePrompts } from '@/contexts/prompt-context';
import { PromptList } from '@/components/prompts/prompt-list';
import { Button } from '@/components/ui/button';
import { PlusCircle, UserCog } from 'lucide-react';
import { PromptFormDialog } from '@/components/admin/prompt-form-dialog';
import type { Prompt } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminPage() {
  const { state } = usePrompts();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [promptToEdit, setPromptToEdit] = useState<Prompt | null>(null);

  const handleAddNew = () => {
    setPromptToEdit(null);
    setIsFormOpen(true);
  };

  const handleEdit = (prompt: Prompt) => {
    setPromptToEdit(prompt);
    setIsFormOpen(true);
  };
  
  if (state.isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-10 w-32" />
        </div>
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
            <UserCog className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Manage Prompts</h1>
        </div>
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Prompt
        </Button>
      </div>
      
      <PromptList prompts={state.prompts} isAdminView={true} onEditPrompt={handleEdit} />

      <PromptFormDialog 
        isOpen={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        promptToEdit={promptToEdit} 
      />
    </div>
  );
}
