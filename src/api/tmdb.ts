import axios from 'axios';
import {
  type MovieDetails,
  type MoviesResponse,
  type MovieFilters,
} from '@/types/movie';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'e3e7596c12dcc41cb9b25c28c2d74176';

const tmdbApi = axios.create({
  baseURL: API_URL,
  params: {
    api_key: API_KEY,
    language: 'ru-RU',
  },
  timeout: 10000,
});

export const TMDB_API = {
  async getMovies(filters: MovieFilters = {}): Promise<MoviesResponse> {
    try {
      const params: any = {
        page: filters.page || 1,
        sort_by: filters.sort_by || 'popularity.desc',
      };

      if (filters.with_genres) {
        params.with_genres = filters.with_genres;
      }

      // рейтинг
      if (filters['vote_average.gte']) {
        params['vote_average.gte'] = filters['vote_average.gte'];
      }
      if (filters['vote_average.lte']) {
        params['vote_average.lte'] = filters['vote_average.lte'];
      }

      if (filters.year_gte) {
        params['primary_release_date.gte'] = `${filters.year_gte}-01-01`; // Начало года
      }
      if (filters.year_lte) {
        params['primary_release_date.lte'] = `${filters.year_lte}-12-31`; // Конец года
      }

      const { data } = await tmdbApi.get<MoviesResponse>('/discover/movie', {
        params,
      });
      return data;
    } catch (error) {
      console.error('TMDB API Error:', error);
      throw error;
    }
  },

  async getMovieDetails(id: number): Promise<MovieDetails> {
    try {
      const { data } = await tmdbApi.get<MovieDetails>(`/movie/${id}`);
      return data;
    } catch (error) {
      console.error('TMDB API Error:', error);
      throw error;
    }
  },

  async searchMovies(query: string, page = 1): Promise<MoviesResponse> {
    try {
      const { data } = await tmdbApi.get<MoviesResponse>('/search/movie', {
        params: { query, page },
      });
      return data;
    } catch (error) {
      console.error('TMDB API Error:', error);
      throw error;
    }
  },

  async getGenres(): Promise<{ id: number; name: string }[]> {
    try {
      const { data } = await tmdbApi.get<{
        genres: { id: number; name: string }[];
      }>('/genre/movie/list');
      return data.genres;
    } catch (error) {
      console.error('TMDB API Error:', error);
      return [];
    }
  },
};
