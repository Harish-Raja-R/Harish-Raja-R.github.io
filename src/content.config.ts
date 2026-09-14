import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content'; 
import { z } from 'astro/zod'

const works = defineCollection({
    loader: glob({pattern: "src/content/**/*.md"}),
    schema: ({image}) => z.object({
        title: z.string().max(60),
        subtitle: z.string().optional(),
        slug: z.string(),
        client: z.string().max(60),
        category: z.string(),
        services: z.string().max(100),
        technologies: z.array(z.string()).optional(),
        metrics: z.array(z.string()).optional(),
        year: z.string().max(10),
        featuredImage: image(),
        imageTwo: image(),
        imageThree: image(),
        imageFour: image(),
        liveSite: z.string().url(),
        githubUrl: z.string().url().optional(),
        description: z.string().max(500),
        isFeatured: z.boolean(),
        isDraft: z.boolean()
    })
})

export const collections = { works };