import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams, useNavigate } from 'react-router-dom';
import { TMDB_API } from '@/api/tmdb';
import { type MovieDetails, type Movie } from '@/types/movie';
import styles from './MovieDetailsPage.module.css';
import { favoritesStore } from '@/stores/favoritesStore';
import { ConfirmModal } from '@/components/ConfirmModal';

export const MovieDetailsPage = observer(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError('');
    TMDB_API.getMovieDetails(Number(id))
      .then(setMovie)
      .catch(() => setError('Не удалось загрузить фильм'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (error || !movie)
    return <div className={styles.error}>{error || 'Фильм не найден'}</div>;

  // выбираем из MovieDetails Movie
  const basicMovieData: Movie = {
    id: movie.id,
    title: movie.title,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    poster_path: movie.poster_path,
    genre_ids: movie.genres.map((g) => g.id),
    overview: movie.overview,
  };

  const isFavorite = favoritesStore.isFavorite(movie.id);

  const handleClick = () => {
    if (isFavorite) {
      favoritesStore.remove(movie.id);
    } else {
      setShowConfirm(true);
    }
  };

  const onConfirmAdd = () => {
    favoritesStore.add(basicMovieData);
    setShowConfirm(false);
  };

  const onCancelAdd = () => {
    setShowConfirm(false);
  };

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        Назад
      </button>

      <div className={styles.details}>
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className={styles.poster}
            loading="lazy"
          />
        ) : (
          <div className={styles.posterPlaceholder}>Нет изображения</div>
        )}

        <div className={styles.info}>
          <h1>{movie.title}</h1>
          <p>
            <strong>Описание:</strong> {movie.overview || 'Нет описания'}
          </p>
          <p>
            <strong>Рейтинг:</strong> {movie.vote_average.toFixed(1)}/10
          </p>
          <p>
            <strong>Дата выхода:</strong>{' '}
            {new Date(movie.release_date).toLocaleDateString()}
          </p>
          <p>
            <strong>Жанры:</strong>{' '}
            {movie.genres.length
              ? movie.genres.map((g) => g.name).join(', ')
              : 'Не указаны'}
          </p>

          <button className={styles.favButton} onClick={handleClick}>
            {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
          </button>
        </div>
      </div>

      {showConfirm && (
        <ConfirmModal
          title={`Добавить «${movie.title}» в избранное?`}
          onConfirm={onConfirmAdd}
          onCancel={onCancelAdd}
        />
      )}
    </div>
  );
});
