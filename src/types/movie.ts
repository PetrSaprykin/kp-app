export interface Movie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string | null;
  genre_ids: number[];
  overview: string;
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: {
    id: number;
    name: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieFilters {
  page?: number;
  sort_by?: string;
  with_genres?: string;
  'vote_average.gte'?: string;
  'vote_average.lte'?: string;
  year_gte?: string;
  year_lte?: string;
}
