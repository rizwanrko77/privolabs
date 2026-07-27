/**
 * PrivoLabs — Content Collection Schemas
 * Source: 01-ARCHITECTURE.md §4
 *
 * Type-safe, validated at build time.
 * Quote length (120–340) and bio length (320) enforced at schema level.
 */

import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob, file } from 'astro/loaders';

const CLUSTERS = [
  'ai-agentic-systems',
  'mobile-app-development',
  'cloud-devops',
  'quality-automation',
  'iot-emerging-tech',
  'buying-hiring',
] as const;

const insights = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/insights' }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().max(160),
    cluster: z.enum(CLUSTERS),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string(),               // references team.id
    readingTime: z.number(),           // minutes
    featured: z.boolean().default(false),
    relatedService: z.string().optional(),  // route to CTA toward
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),               // may be anonymised descriptor
    anonymised: z.boolean().default(false),
    industry: z.enum([
      'healthcare',
      'finance',
      'retail',
      'logistics',
      'manufacturing',
      'other',
    ]),
    practice: z.array(
      z.enum(['ai', 'custom', 'cloud', 'mobile', 'quality'])
    ),
    summary: z.string().max(180),
    stack: z.array(z.string()),
    results: z.array(
      z.object({
        metric: z.string(),
        value: z.string(),
        caption: z.string().optional(),
      })
    ),
    testimonial: z.string().optional(),  // references testimonials.id
    order: z.number(),
  }),
});

const team = defineCollection({
  loader: file('src/content/team/members.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
    bio: z.string().max(320),
    photo: z.string().optional(),
    linkedin: z.string().url().optional(),
    specialisms: z.array(z.string()).max(4),
    order: z.number(),
    leadership: z.boolean().default(false),
    placeholder: z.boolean().default(false),  // excluded from production builds
  }),
});

/**
 * §4.1 Why the quote length is enforced:
 * The testimonial card is designed around a 2–3 sentence quote.
 * A 60-char quote leaves a hole; a 600-char one overflows the slider.
 * The build fails loudly rather than shipping a broken card.
 */
const testimonials = defineCollection({
  loader: file('src/content/testimonials/quotes.json'),
  schema: z.object({
    id: z.string(),
    quote: z.string().min(120).max(340),   // enforced — see §4.1
    authorName: z.string(),
    authorRole: z.string(),
    company: z.string(),
    companyLogo: z.string().optional(),
    industry: z.string().optional(),
    relatedWork: z.string().optional(),    // references work slug
    featured: z.boolean().default(false),
    placeholder: z.boolean().default(false),
  }),
});

const technologies = defineCollection({
  loader: file('src/content/technologies/list.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    category: z.enum([
      'ai-ml',
      'frontend',
      'backend',
      'mobile',
      'cloud-data',
      'quality',
    ]),
    tagline: z.string().max(90),
    order: z.number(),
  }),
});

export const collections = { insights, work, team, testimonials, technologies };
