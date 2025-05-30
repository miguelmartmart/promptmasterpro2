import type { Prompt } from '@/lib/types';

export const mockPrompts: Prompt[] = [
  {
    id: '1',
    title: 'Generate a catchy marketing slogan',
    content: 'Create a catchy and memorable slogan for a new eco-friendly water bottle brand. The brand emphasizes sustainability, style, and hydration. The target audience is young professionals aged 25-35.',
    category: 'Marketing',
    language: 'en',
    aiModel: 'Gemini 1.5 Flash',
    tags: ['slogan', 'branding', 'eco-friendly'],
    createdBy: 'official',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
  },
  {
    id: '2',
    title: 'Escribir un post para blog sobre IA',
    content: 'Escribe un borrador para una entrada de blog (aproximadamente 500 palabras) sobre el impacto de la inteligencia artificial en la industria creativa. Incluye ejemplos de cómo la IA está siendo utilizada en campos como el diseño gráfico, la música y la escritura.',
    category: 'Writing',
    language: 'es',
    aiModel: 'GPT-4o',
    tags: ['blogging', 'AI', 'creatividad'],
    createdBy: 'official',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: '3',
    title: 'Create a Python script for web scraping',
    content: 'Write a Python script using BeautifulSoup and Requests libraries to scrape headlines from a news website. The script should take a URL as input and output a list of headlines. Ensure error handling for network issues or changes in website structure.',
    category: 'Development',
    language: 'en',
    aiModel: 'Claude 3',
    tags: ['python', 'web scraping', 'coding'],
    createdBy: 'community',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  },
  {
    id: '4',
    title: 'Gerar ideias para posts em redes sociais',
    content: 'Gere 5 ideias de posts para redes sociais para uma pequena cafeteria local. O objetivo é aumentar o engajamento e atrair mais clientes. Considere diferentes plataformas como Instagram e Facebook.',
    category: 'Marketing',
    language: 'pt-BR',
    aiModel: 'Llama 3 8B',
    tags: ['social media', 'ideias', 'cafeteria'],
    createdBy: 'admin',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    id: '5',
    title: 'Explain Quantum Computing to a 5-year-old',
    content: 'Explain the basic concept of quantum computing in a way that a 5-year-old can understand. Use simple analogies and avoid technical jargon.',
    category: 'Education',
    language: 'en',
    tags: ['explain', 'quantum', 'simple'],
    createdBy: 'community',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  }
];
