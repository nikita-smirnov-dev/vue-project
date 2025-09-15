export interface IBaseMovie {
  id: number;
  tmdbRating: number;
  releaseYear: number;
  genres: string[];
  runtime: number;
  title: string;
  plot: string;
  posterUrl: string;
  director: string;
  production: string;
  language: string;
  budget: string;
  revenue: string;
  awardsSummary: string;
  trailerUrl: string;
  trailerYouTubeId: string;
}

export interface IRandomMovie
  extends Pick<
    IBaseMovie,
    | 'id'
    | 'tmdbRating'
    | 'releaseYear'
    | 'genres'
    | 'runtime'
    | 'plot'
    | 'posterUrl'
    | 'title'
  > {}
