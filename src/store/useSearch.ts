import { create } from 'zustand';
import { useStore } from './useStore';
import { useEffect } from 'react';
import elasticlunr from 'elasticlunr';
import type { Card } from '../types';

interface Filters {
  inks: string[];
  cost: [number, number];
  types?: string[];
  inkable: 'any' | 'inkable' | 'uninkable';
}

interface SearchState {
  query: string;
  setQuery: (q: string) => void;
  filters: Filters;
  setFilters: (f: Partial<Filters>) => void;
  clearFilters: () => void;
  index: elasticlunr.Index<Card> | null;
  buildIndex: (cards: Card[]) => void;
  results: () => Card[];
}

const DEFAULT_FILTERS: Filters = { inks: [], cost: [1, 9], types: [], inkable: 'any' };

export const useSearch = create<SearchState>((set, get) => ({
  query: '',
  setQuery: (q: string) => set({ query: q }),
  filters: DEFAULT_FILTERS,
  setFilters: (f: Partial<Filters>) => set({ filters: { ...get().filters, ...f } }),
  clearFilters: () => set({ query: '', filters: DEFAULT_FILTERS }),
  index: null,
  buildIndex: (cards: Card[]) => {
    const idx = elasticlunr<Card>();
    idx.setRef('id');
    idx.addField('name');
    idx.addField('subtitle');
    idx.addField('text');
    idx.addField('type');
    idx.addField('classifications');
    idx.addField('set');
    idx.addField('ink');
    idx.addField('rarity');
    cards.forEach(c => idx.addDoc(c));
    set({ index: idx });
  },
  results: () => {
    const { query, filters, index } = get();
    const cards = useStore.getState().cards;
    let hits: Array<{ ref: any }>;
    if (query && index) {
      hits = index.search(query, {
        fields: { name: { boost: 3 }, subtitle: { boost: 2 }, text: { boost: 1 } },
        expand: true,
        bool: 'AND',
      });
    } else {
      hits = cards.map(c => ({ ref: c.id, score: 1 }));
    }
    const map = new Map(cards.map(c => [c.id, c]));
    const results = hits.map(h => map.get(Number(h.ref))!).filter(Boolean);
    const filtered: Card[] = [];
    const isInkable = (c: Card) => c.inkable ?? !/uninkable/i.test(c.text || '');
    for (const card of results) {
      if (filters.inks.length && !filters.inks.includes(card.ink)) continue;
      const [lo, hi] = filters.cost;
      const cost = Number(card.ink_cost ?? 0);
      if (lo !== 1 || hi !== 9) {
        if (hi === 9) {
          if (cost < lo) continue;
        } else {
          if (cost < lo || cost > hi) continue;
        }
      }
      if (filters.types?.length && !filters.types.includes((card.type || '').split('/')[0])) continue;
      if (filters.inkable === 'inkable' && !isInkable(card)) continue;
      if (filters.inkable === 'uninkable' && isInkable(card)) continue;
      filtered.push(card);
    }
    return filtered;
  },
}));

export const useSearchInit = () => {
  const cards = useStore(s => s.cards);
  const buildIndex = useSearch(s => s.buildIndex);
  useEffect(() => { if (cards.length) buildIndex(cards); }, [cards.length, buildIndex]);
};
