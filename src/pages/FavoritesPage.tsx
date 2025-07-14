import { observer } from 'mobx-react-lite';
import { favoritesStore } from '@/stores/favoritesStore';
import styles from './FavoritesPage.module.css';
import { MovieCard } from '@/components/MovieCard';

export const FavoritesPage = observer(() => {
  const { favorites } = favoritesStore;

  if (favorites.length === 0) {
    return (
      <h2 className={styles.empty}>Вы пока не добавили фильмы в избранное</h2>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Избранное</h1>
      <div className={styles.grid}>
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            className={styles.movieCard}
          />
        ))}
      </div>
    </div>
  );
});
