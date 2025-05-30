import type { Prompt } from '@/lib/types';
import { PromptCard } from './prompt-card';

interface PromptListProps {
  prompts: Prompt[];
  isAdminView?: boolean;
  onEditPrompt?: (prompt: Prompt) => void;
}

export function PromptList({ prompts, isAdminView = false, onEditPrompt }: PromptListProps) {
  if (prompts.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No prompts found. Try adjusting your filters or adding new prompts!</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {prompts.map(prompt => (
        <PromptCard key={prompt.id} prompt={prompt} isAdminView={isAdminView} onEdit={onEditPrompt} />
      ))}
    </div>
  );
}
