export interface Prompt {
  id: string;
  title: string;
  content: string;
  category: PromptCategory;
  language: PromptLanguageCode;
  aiModel?: AIModel;
  tags?: string[];
  createdBy?: string; 
  createdAt: string; 
  updatedAt: string; 
  isFavorite?: boolean; // Added for client-side state
}

export const PromptCategories = ["Marketing", "Development", "Writing", "Art", "Productivity", "Education", "Fun"] as const;
export type PromptCategory = typeof PromptCategories[number];

export const PromptLanguages = {
  'en': 'English',
  'es': 'Español',
  'pt-BR': 'Português (Brasil)'
} as const;
export type PromptLanguageCode = keyof typeof PromptLanguages;
export type PromptLanguageName = typeof PromptLanguages[PromptLanguageCode];

export const AIModels = ["Gemini 1.5 Flash", "GPT-4o", "Claude 3", "Llama 3 8B", "Other"] as const;
export type AIModel = typeof AIModels[number];
