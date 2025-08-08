import { create } from 'zustand';
import { useEffect } from 'react';
import elasticlunr from 'elasticlunr';
import { useStore } from './useStore';
import type { Card } from '../types';

interface Filters {
  inks: string[];
  types: string[];
  rarities: string[];
  sets: string[];
  cost: [number, number];
  inkable: 'any' | 'inkable' | 'uninkable';
}

interface SearchState {
  query: string;
  setQuery: (q: string) => void;
  filters: Filters;
  setFilters: (f: Partial<Filters>) => void;
  clearFilters: () => void;
  buildIndex: (cards: Card[]) => void;
  results: () => Card[];
}

const DEFAULT_FILTERS: Filters = { inks: [], types: [], rarities: [], sets: [], cost: [1,9], inkable: 'any' };

let index: elasticlunr.Index<Card> | null = null;

export const useSearch = create<SearchState>((set, get) => ({
  query: '',
  setQuery: (q: string) => set({ query: q }),
  filters: DEFAULT_FILTERS,
  setFilters: (f: Partial<Filters>) => set({ filters: { ...get().filters, ...f } }),
  clearFilters: () => set({ query: '', filters: DEFAULT_FILTERS }),
  buildIndex: (cards: Card[]) => {
    index = elasticlunr<Card>(function () {
      this.addField('name');
      this.addField('subtitle');
      this.addField('text');
      this.addField('type');
      this.addField('classifications');
      this.addField('set');
      this.addField('ink');
      this.addField('rarity');
      this.setRef('id');
    });
    cards.forEach(c => index!.addDoc(c));
  },
  results: () => {
    const { query, filters } = get();
    const cards = useStore.getState().cards;
    const hits = query
      ? (index ? index.search(query, { fields: { name:{boost:3}, subtitle:{boost:2}, text:{boost:1} }, expand:true, bool:"AND" }) : [])
      : cards.map(c => ({ ref: String(c.id), score: 1 }));
    const res: Card[] = [];
    for (const h of hits) {
      const card = cards.find(c => String(c.id) === h.ref);
      if (!card) continue;
      if (filters.inks.length && !filters.inks.includes(card.ink)) continue;
      if (filters.types.length && !filters.types.includes((card.type || '').split('/')[0])) continue;
      if (filters.rarities.length && !filters.rarities.includes(card.rarity)) continue;
      if (filters.sets.length && !filters.sets.includes(card.set)) continue;
      const isInkable = (c: Card) => (c as any).inkable ?? !/uninkable/i.test(c.text || '');
      if (filters.inkable === 'inkable' && !isInkable(card)) continue;
      if (filters.inkable === 'uninkable' && isInkable(card)) continue;
      const cost = Number(card.ink_cost ?? 0);
      const [lo, hi] = filters.cost;
      if (cost < lo) continue;
      if (hi !== 9 && cost > hi) continue;
      res.push(card);
    }
    return res;
  }
}));

export const useSearchIndex = () => {
  const cards = useStore(s => s.cards);
  const buildIndex = useSearch(s => s.buildIndex);
  useEffect(() => { if(cards.length){ buildIndex(cards); } }, [cards.length, buildIndex]);
};
