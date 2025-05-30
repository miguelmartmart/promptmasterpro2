"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generatePrompt, type GeneratePromptInput, type GeneratePromptOutput } from '@/ai/flows/generate-prompt';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Copy, Lightbulb } from 'lucide-react';

const formSchema = z.object({
  promptRequest: z.string().min(10, "Please provide a more detailed request for the prompt.").max(500, "Request is too long."),
});

type PromptGeneratorFormValues = z.infer<typeof formSchema>;

export function PromptGeneratorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<PromptGeneratorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      promptRequest: '',
    },
  });

  const onSubmit: SubmitHandler<PromptGeneratorFormValues> = async (data) => {
    setIsLoading(true);
    setGeneratedPrompt(null);
    try {
      const input: GeneratePromptInput = { promptRequest: data.promptRequest };
      const result: GeneratePromptOutput = await generatePrompt(input);
      setGeneratedPrompt(result.generatedPrompt);
      toast({ title: "Prompt Generated!", description: "Your new prompt is ready." });
    } catch (error) {
      console.error("Error generating prompt:", error);
      toast({
        title: "Error",
        description: "Failed to generate prompt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyGeneratedPrompt = () => {
    if (generatedPrompt) {
      navigator.clipboard.writeText(generatedPrompt);
      toast({ title: "Copied!", description: "Generated prompt copied to clipboard." });
    }
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Lightbulb className="h-6 w-6 text-primary" />
          AI Prompt Generator
        </CardTitle>
        <CardDescription>Describe the kind of prompt you need, and our AI will craft one for you.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="promptRequest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="promptRequest" className="text-base">Your Prompt Request</FormLabel>
                  <FormControl>
                    <Textarea
                      id="promptRequest"
                      placeholder="e.g., 'A prompt to generate a short story about a time-traveling cat' or 'Create a prompt for generating marketing copy for a new SAAS product.'"
                      rows={5}
                      {...field}
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
              ) : (
                "Generate Prompt"
              )}
            </Button>
          </form>
        </Form>

        {generatedPrompt && (
          <div className="mt-8 p-4 border border-primary/50 rounded-lg bg-primary/10">
            <h3 className="text-lg font-semibold mb-2 text-primary">Generated Prompt:</h3>
            <p className="whitespace-pre-wrap text-foreground/90 mb-4">{generatedPrompt}</p>
            <Button onClick={handleCopyGeneratedPrompt} variant="outline" size="sm">
              <Copy className="mr-2 h-4 w-4" /> Copy Generated Prompt
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
