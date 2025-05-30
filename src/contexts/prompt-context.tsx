
"use client";

import type { Prompt, PromptCategory, PromptLanguageCode, AIModel } from '@/lib/types';
import { mockPrompts } from '@/data/mock-prompts';
import React, { createContext, useContext, useReducer, useEffect, type ReactNode, useCallback } from 'react';

interface PromptState {
  prompts: Prompt[];
  favorites: Set<string>;
  isLoading: boolean;
  categories: readonly PromptCategory[];
  languages: Record<PromptLanguageCode, string>;
  aiModels: readonly AIModel[];
}

type PromptAction =
  | { type: 'LOAD_STATE'; payload: Partial<PromptState> }
  | { type: 'ADD_PROMPT'; payload: Prompt }
  | { type: 'UPDATE_PROMPT'; payload: Prompt }
  | { type: 'DELETE_PROMPT'; payload: string } // id
  | { type: 'TOGGLE_FAVORITE'; payload: string }; // id

const initialState: PromptState = {
  prompts: [],
  favorites: new Set(),
  isLoading: true,
  categories: ["Marketing", "Development", "Writing", "Art", "Productivity", "Education", "Fun"],
  languages: { 'en': 'English', 'es': 'Español', 'pt-BR': 'Português (Brasil)' },
  aiModels: ["Gemini 1.5 Flash", "GPT-4o", "Claude 3", "Llama 3 8B", "Other"],
};

const PromptContext = createContext<{
  state: PromptState;
  dispatch: React.Dispatch<PromptAction>;
  addPrompt: (prompt: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePrompt: (prompt: Prompt) => void;
  deletePrompt: (id: string) => void;
  toggleFavorite: (id: string) => void;
} | undefined>(undefined);

function promptReducer(state: PromptState, action: PromptAction): PromptState {
  switch (action.type) {
    case 'LOAD_STATE':
      return { ...state, ...action.payload, isLoading: false };
    case 'ADD_PROMPT':
      return { ...state, prompts: [...state.prompts, action.payload] };
    case 'UPDATE_PROMPT':
      return {
        ...state,
        prompts: state.prompts.map(p => p.id === action.payload.id ? action.payload : p),
      };
    case 'DELETE_PROMPT':
      return {
        ...state,
        prompts: state.prompts.filter(p => p.id !== action.payload),
      };
    case 'TOGGLE_FAVORITE': {
      const newFavorites = new Set(state.favorites);
      if (newFavorites.has(action.payload)) {
        newFavorites.delete(action.payload);
      } else {
        newFavorites.add(action.payload);
      }
      return { ...state, favorites: newFavorites };
    }
    default:
      return state;
  }
}

const LOCAL_STORAGE_KEY_PROMPTS = 'promptCraftPro_prompts';
const LOCAL_STORAGE_KEY_FAVORITES = 'promptCraftPro_favorites';

export const PromptProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(promptReducer, initialState);

  useEffect(() => {
    try {
      const storedPrompts = localStorage.getItem(LOCAL_STORAGE_KEY_PROMPTS);
      const storedFavorites = localStorage.getItem(LOCAL_STORAGE_KEY_FAVORITES);
      
      const prompts = storedPrompts ? JSON.parse(storedPrompts) : mockPrompts;
      const favorites = storedFavorites ? new Set(JSON.parse(storedFavorites)) : new Set();
      
      dispatch({ type: 'LOAD_STATE', payload: { prompts, favorites } });
    } catch (error) {
      console.error("Failed to load from localStorage", error);
      dispatch({ type: 'LOAD_STATE', payload: { prompts: mockPrompts, favorites: new Set() } });
    }
  }, []);

  useEffect(() => {
    if (!state.isLoading) {
      localStorage.setItem(LOCAL_STORAGE_KEY_PROMPTS, JSON.stringify(state.prompts));
      localStorage.setItem(LOCAL_STORAGE_KEY_FAVORITES, JSON.stringify(Array.from(state.favorites)));
    }
  }, [state.prompts, state.favorites, state.isLoading]);

  const addPrompt = useCallback((promptData: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPrompt: Prompt = {
      ...promptData,
      id: Date.now().toString(), // Simple ID generation
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_PROMPT', payload: newPrompt });
  }, []);

  const updatePrompt = useCallback((promptData: Prompt) => {
    const updatedPrompt = { ...promptData, updatedAt: new Date().toISOString() };
    dispatch({ type: 'UPDATE_PROMPT', payload: updatedPrompt });
  }, []);
  
  const deletePrompt = useCallback((id: string) => {
    dispatch({ type: 'DELETE_PROMPT', payload: id });
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
  }, []);


  return (
    <PromptContext.Provider value={{ state, dispatch, addPrompt, updatePrompt, deletePrompt, toggleFavorite }}>
      {children}
    </PromptContext.Provider>
  );
};

export const usePrompts = () => {
  const context = useContext(PromptContext);
  if (context === undefined) {
    throw new Error('usePrompts must be used within a PromptProvider');
  }
  return context;
};
