import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TMDB_API } from '@/api/tmdb';
import styles from './Filters.module.css';

export const Filters = () => {
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // состояние фильтров
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    searchParams.get('with_genres')?.split(',') || [],
  );
  const [ratingGte, setRatingGte] = useState(
    searchParams.get('rating_gte') || '',
  );
  const [ratingLte, setRatingLte] = useState(
    searchParams.get('rating_lte') || '',
  );
  const [yearGte, setYearGte] = useState(searchParams.get('year_gte') || '');
  const [yearLte, setYearLte] = useState(searchParams.get('year_lte') || '');

  const isInvalidRange =
    (ratingGte && ratingLte && parseFloat(ratingGte) > parseFloat(ratingLte)) ||
    (yearGte && yearLte && parseInt(yearGte) > parseInt(yearLte)) ||
    false;

  useEffect(() => {
    TMDB_API.getGenres().then(setGenres);
  }, []);

  const handleApply = () => {
    const newParams = new URLSearchParams();

    if (selectedGenres.length)
      newParams.set('with_genres', selectedGenres.join(','));
    if (ratingGte) newParams.set('rating_gte', ratingGte);
    if (ratingLte) newParams.set('rating_lte', ratingLte);
    if (yearGte) newParams.set('year_gte', yearGte);
    if (yearLte) newParams.set('year_lte', yearLte);

    setSearchParams(newParams);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.filterGroup}>
        <label>Жанры</label>
        <div className={styles.genreList}>
          {genres.map((genre) => (
            <label key={genre.id} className={styles.genreItem}>
              <input
                type="checkbox"
                value={genre.id.toString()}
                checked={selectedGenres.includes(genre.id.toString())}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedGenres((prev) =>
                    prev.includes(value)
                      ? prev.filter((id) => id !== value)
                      : [...prev, value],
                  );
                }}
              />
              <span>{genre.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label>Рейтинг (0-10)</label>
        <div className={styles.rangeInputs}>
          <input
            type="number"
            placeholder="От"
            min="0"
            max="10"
            step="0.1"
            value={ratingGte}
            onChange={(e) => setRatingGte(e.target.value)}
          />
          <span>:</span>
          <input
            type="number"
            placeholder="До"
            min="0"
            max="10"
            step="0.1"
            value={ratingLte}
            onChange={(e) => setRatingLte(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label>Год выпуска</label>
        <div className={styles.rangeInputs}>
          <input
            type="number"
            placeholder="От 1990"
            min="1990"
            max={String(new Date().getFullYear())}
            value={yearGte}
            onChange={(e) => setYearGte(e.target.value)}
          />
          <span>:</span>
          <input
            type="number"
            placeholder={String(new Date().getFullYear())}
            min="1990"
            max={String(new Date().getFullYear())}
            value={yearLte}
            onChange={(e) => setYearLte(e.target.value)}
          />
        </div>
        {isInvalidRange && (
          <span className={styles.error}>Задан неверный диапазон</span>
        )}
      </div>

      <button
        onClick={handleApply}
        className={styles.applyButton}
        disabled={isInvalidRange}
      >
        Применить
      </button>
    </div>
  );
};
