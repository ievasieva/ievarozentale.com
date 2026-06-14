import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date().optional(),
    client: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const cv = defineCollection({
  type: 'content',
  schema: z.object({
    role: z.string(),
    organisation: z.string(),
    period: z.string(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

const tracks = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    duration: z.string().optional(),
    audioUrl: z.string().optional(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, cv, tracks };
