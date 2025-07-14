import { useState } from 'react';
import { type Movie } from '@/types/movie';
import { Link } from 'react-router-dom';
import styles from './MovieCard.module.css';
import { observer } from 'mobx-react-lite';
import { favoritesStore } from '@/stores/favoritesStore';
import { ConfirmModal } from '@/components/ConfirmModal';

interface Props {
  movie: Movie;
  className?: string;
}

export const MovieCard = observer(({ movie, className }: Props) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const isFavorite = favoritesStore.isFavorite(movie.id);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      favoritesStore.remove(movie.id);
    } else {
      setShowConfirm(true);
    }
  };

  const confirmAdd = () => {
    favoritesStore.add(movie);
    setShowConfirm(false);
  };

  return (
    <>
      <div className={`${styles.card} ${className}`}>
        <Link to={`/movie/${movie.id}`}>
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              loading="lazy"
            />
          )}
          <h3>{movie.title}</h3>
          <p>
            {movie.release_date?.slice(0, 4)} | ⭐{' '}
            {movie.vote_average?.toFixed(1)}
          </p>
        </Link>

        <button onClick={handleButtonClick} className={styles.favorite}>
          {isFavorite ? '★ Удалить' : '☆ Добавить'}
        </button>
      </div>

      {showConfirm && (
        <ConfirmModal
          title={`Добавить «${movie.title}» в избранное?`}
          onConfirm={confirmAdd}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
});
