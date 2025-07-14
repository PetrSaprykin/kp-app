import { makeAutoObservable, runInAction } from 'mobx';
import { type Movie } from '@/types/movie';

const LS_KEY = 'favorite_movies_v2';

class FavoritesStore {
  favorites: Movie[] = [];
  isLoaded = false;

  constructor() {
    makeAutoObservable(this);
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage() {
    try {
      const data = localStorage.getItem(LS_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          runInAction(() => {
            this.favorites = parsed;
          });
        }
      }
    } catch (e) {
      console.error('Error loading favorites:', e);
    } finally {
      runInAction(() => {
        this.isLoaded = true;
      });
    }
  }

  private saveToLocalStorage() {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(this.favorites));
    } catch (e) {
      console.error('Error saving favorites:', e);
    }
  }

  add(movie: Movie) {
    const exists = this.favorites.some((m) => m.id === movie.id);
    if (!exists) {
      this.favorites.push(movie);
      this.saveToLocalStorage();
    }
  }

  remove(id: number) {
    this.favorites = this.favorites.filter((m) => m.id !== id);
    this.saveToLocalStorage();
  }

  isFavorite(id: number) {
    return this.favorites.some((m) => m.id === id);
  }
}

export const favoritesStore = new FavoritesStore();
