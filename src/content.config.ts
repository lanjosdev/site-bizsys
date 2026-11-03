import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    id: z.number(),
    title: z.string(),
    client: z.string().default('Bizsys'),
    year: z.number().optional(),
    partnership: z.string().optional(),
    categories: z.array(z.string()).default([]),
    mediaType: z.enum(['video', 'carousel', 'image']).default('image'),
    videoUrl: z.string().optional(),
    galleryImages: z.array(z.string()).default([]),
    featuredImage: z.string(),
    excerpt: z.string().optional(),
    date: z.string(),
    awards: z.array(z.string()).default([]),
  }),
});

export const collections = { posts };
