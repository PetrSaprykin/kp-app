import { MovieCard } from '@/components/MovieCard';
import { type Movie } from '@/types/movie';
import styles from './MovieList.module.css';

interface MovieListProps {
  movies: Movie[];
}

export const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className={styles.movieList}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie}  />
      ))}
    </div>
  );
};
