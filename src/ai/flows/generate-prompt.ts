// src/ai/flows/generate-prompt.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating new prompts using the Gemini 1.5 Flash model.
 *
 * - generatePrompt - A function that generates a new prompt based on a user's request.
 * - GeneratePromptInput - The input type for the generatePrompt function.
 * - GeneratePromptOutput - The return type for the generatePrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePromptInputSchema = z.object({
  promptRequest: z.string().describe('The request for the prompt to generate.'),
});
export type GeneratePromptInput = z.infer<typeof GeneratePromptInputSchema>;

const GeneratePromptOutputSchema = z.object({
  generatedPrompt: z.string().describe('The generated prompt.'),
});
export type GeneratePromptOutput = z.infer<typeof GeneratePromptOutputSchema>;

export async function generatePrompt(input: GeneratePromptInput): Promise<GeneratePromptOutput> {
  return generatePromptFlow(input);
}

const generatePromptPrompt = ai.definePrompt({
  name: 'generatePromptPrompt',
  input: {schema: GeneratePromptInputSchema},
  output: {schema: GeneratePromptOutputSchema},
  prompt: `You are an AI expert prompt engineer. Generate a new prompt based on the user's request below:

Request: {{{promptRequest}}}

Generated Prompt:`, // Removed triple braces
});

const generatePromptFlow = ai.defineFlow(
  {
    name: 'generatePromptFlow',
    inputSchema: GeneratePromptInputSchema,
    outputSchema: GeneratePromptOutputSchema,
  },
  async input => {
    const {output} = await generatePromptPrompt(input);
    return output!;
  }
);
