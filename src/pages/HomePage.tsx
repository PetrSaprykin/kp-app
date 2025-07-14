import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filters } from '@/components/Filters';
import { MovieList } from '@/components/MovieList';
import { TMDB_API } from '@/api/tmdb';
import type { Movie, MovieFilters } from '@/types/movie';
import styles from './HomePage.module.css';

export const HomePage = () => {
  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [nextPage, setNextPage] = useState(1);

  const loadMovies = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const newMovies: Movie[] = [];

      for (let i = 0; i < 3; i++) {
        const pageToLoad = nextPage + i;

        const filters: MovieFilters = {
          page: pageToLoad,
          with_genres: searchParams.get('with_genres') || undefined,
          'vote_average.gte': searchParams.get('rating_gte') || undefined,
          'vote_average.lte': searchParams.get('rating_lte') || undefined,
          year_gte: searchParams.get('year_gte') || '1990',
          year_lte: searchParams.get('year_lte') || undefined,
        };

        const response = await TMDB_API.getMovies(filters);
        if (response.results.length === 0) {
          setHasMore(false);
          break;
        }

        newMovies.push(...response.results);

        if (response.results.length < 20) {
          setHasMore(false);
          break;
        }
      }

      setMovies((prev) => {
        const unique = newMovies.filter(
          (m) => !prev.some((existing) => existing.id === m.id),
        );
        return [...prev, ...unique];
      });

      setNextPage((prev) => prev + 3);
    } catch (error) {
      console.error('Ошибка при загрузке фильмов:', error);
    } finally {
      setLoading(false);
    }
  }, [searchParams, nextPage, loading, hasMore]);

  useEffect(() => {
    setMovies([]);
    setNextPage(1);
    setHasMore(true);
    setTimeout(() => {
      loadMovies();
    }, 0);
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !loading &&
        hasMore
      ) {
        loadMovies();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMovies, loading, hasMore]);

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <div>
      <Filters />
      <MovieList movies={movies} />
      {loading && <div className={styles.statusSpan}>Загрузка...</div>}
      {movies.length === 0 && !loading && (
        <div className={styles.statusSpan}>
          Фильмы не найдены, попробуйте изменить фильтры
        </div>
      )}
    </div>
  );
};
