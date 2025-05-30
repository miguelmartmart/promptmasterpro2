"use client";

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Prompt, PromptCategory, PromptLanguageCode, AIModel } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { usePrompts } from '@/contexts/prompt-context';
import { useEffect } from 'react';

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters.").max(100),
  content: z.string().min(20, "Prompt content must be at least 20 characters.").max(2000),
  category: z.custom<PromptCategory>(val => typeof val === 'string' && val.length > 0, "Category is required."),
  language: z.custom<PromptLanguageCode>(val => typeof val === 'string' && val.length > 0, "Language is required."),
  aiModel: z.custom<AIModel>().optional(),
  tags: z.string().optional().transform(val => val ? val.split(',').map(tag => tag.trim()).filter(tag => tag) : []),
});

type PromptFormValues = z.infer<typeof formSchema>;

interface PromptFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  promptToEdit?: Prompt | null;
}

export function PromptFormDialog({ isOpen, onOpenChange, promptToEdit }: PromptFormDialogProps) {
  const { state, addPrompt, updatePrompt } = usePrompts();
  
  const form = useForm<PromptFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      category: undefined,
      language: undefined,
      aiModel: undefined,
      tags: [],
    },
  });

  useEffect(() => {
    if (promptToEdit) {
      form.reset({
        title: promptToEdit.title,
        content: promptToEdit.content,
        category: promptToEdit.category,
        language: promptToEdit.language,
        aiModel: promptToEdit.aiModel,
        tags: promptToEdit.tags || [],
      });
    } else {
      form.reset({ // Reset to default when adding new
        title: '',
        content: '',
        category: undefined, // Or a default category if you prefer
        language: undefined, // Or a default language
        aiModel: undefined,
        tags: [],
      });
    }
  }, [promptToEdit, form, isOpen]); // isOpen dependency ensures form resets when dialog reopens for 'new'

  const onSubmit: SubmitHandler<PromptFormValues> = (data) => {
    if (promptToEdit) {
      updatePrompt({ ...promptToEdit, ...data, tags: data.tags || [] });
    } else {
      addPrompt({ ...data, tags: data.tags || [] });
    }
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { onOpenChange(open); if (!open) form.reset(); }}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{promptToEdit ? 'Edit Prompt' : 'Add New Prompt'}</DialogTitle>
          <DialogDescription>
            {promptToEdit ? 'Update the details of this prompt.' : 'Fill in the details to add a new prompt to the catalog.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl><Input placeholder="e.g., Generate a marketing slogan" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="content" render={({ field }) => (
              <FormItem>
                <FormLabel>Prompt Content</FormLabel>
                <FormControl><Textarea placeholder="Enter the full prompt text here..." rows={6} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {state.categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="language" render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a language" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {Object.entries(state.languages).map(([code, name]) => <SelectItem key={code} value={code}>{name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="aiModel" render={({ field }) => (
              <FormItem>
                <FormLabel>AI Model (Optional)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select an AI model" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {state.aiModels.map(model => <SelectItem key={model} value={model}>{model}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="tags" render={({ field }) => (
                <FormItem>
                    <FormLabel>Tags (Optional)</FormLabel>
                    <FormControl>
                        <Input 
                            placeholder="e.g., marketing, writing, code" 
                            {...field} 
                            value={Array.isArray(field.value) ? field.value.join(', ') : ''}
                            onChange={e => field.onChange(e.target.value.split(',').map(tag => tag.trim()))}
                        />
                    </FormControl>
                    <FormDescription>Enter tags separated by commas.</FormDescription>
                    <FormMessage />
                </FormItem>
            )} />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">{promptToEdit ? 'Save Changes' : 'Add Prompt'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
