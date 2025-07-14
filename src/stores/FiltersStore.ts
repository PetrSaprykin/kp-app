import { makeAutoObservable } from 'mobx';
import { type MovieFilters } from '@/types/movie';

class FiltersStore {
  filters: MovieFilters = {
    page: 1,
    sort_by: 'popularity.desc',
  };

  constructor() {
    makeAutoObservable(this);
  }

  setFilters(newFilters: Partial<MovieFilters>) {
    this.filters = { ...this.filters, ...newFilters };
  }

  resetFilters() {
    this.filters = {
      page: 1,
      sort_by: 'popularity.desc',
    };
  }
}

export const filtersStore = new FiltersStore();
