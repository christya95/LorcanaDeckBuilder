import { create } from 'zustand';
import { useStore } from './useStore';
import type { Card } from '../types';

interface Filters {
  inks: string[];
  cost: [number, number];
}

interface SearchState {
  query: string;
  setQuery: (q: string) => void;
  filters: Filters;
  setFilters: (f: Partial<Filters>) => void;
  clearFilters: () => void;
  results: () => Card[];
}

const DEFAULT_FILTERS: Filters = { inks: [], cost: [1, 9] };

export const useSearch = create<SearchState>((set, get) => ({
  query: '',
  setQuery: (q: string) => set({ query: q }),
  filters: DEFAULT_FILTERS,
  setFilters: (f: Partial<Filters>) => set({ filters: { ...get().filters, ...f } }),
  clearFilters: () => set({ query: '', filters: DEFAULT_FILTERS }),
  results: () => {
    const { query, filters } = get();
    const store = useStore.getState();
    const cards = store.cards;
    let result = query ? store.search(query) : cards;
    if (filters.inks.length) {
      result = result.filter(c => filters.inks.includes(c.ink));
    }
    const [lo, hi] = filters.cost;
    if (lo !== 1 || hi !== 9) {
      result = result.filter(c => {
        const val = Number(c.ink_cost ?? 0);
        if (hi === 9) return val >= lo;
        return val >= lo && val <= hi;
      });
    }
    return result;
  },
}));
