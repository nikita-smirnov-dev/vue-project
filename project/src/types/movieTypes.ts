import { z } from 'zod';

// Base Movie schema

export const BaseMovieSchema = z.object({
  id: z.number(),
  tmdbRating: z.number(),
  releaseYear: z.number(),
  genres: z.array(z.string()),
  runtime: z.number(),
  title: z.string(),
  plot: z.string(),
  posterUrl: z.string().nullable(),
  director: z.string().nullable(),
  production: z.string().nullable().optional(),
  language: z.string().nullable().optional(),
  budget: z.string().nullable().optional(),
  revenue: z.string().nullable().optional(),
  awardsSummary: z.string().nullable().optional(),
  trailerUrl: z.string(),
  trailerYouTubeId: z.string(),
});

// Random movie schema

export const RandomMovieSchema = BaseMovieSchema.pick({
  id: true,
  tmdbRating: true,
  releaseYear: true,
  genres: true,
  runtime: true,
  title: true,
  plot: true,
  posterUrl: true,
});

export type RandomMovie = z.infer<typeof RandomMovieSchema>;
