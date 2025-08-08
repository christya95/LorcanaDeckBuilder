import { create } from 'zustand';
import { useStore } from './useStore';
import { useEffect } from 'react';
import elasticlunr from 'elasticlunr';
import { shallow } from 'zustand/shallow';
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
  setFilters: (f: Partial<Filters> | ((prev: Filters) => Partial<Filters>)) => void;
  clearFilters: () => void;
  index: elasticlunr.Index<Card> | null;
  buildIndex: (cards: Card[]) => void;
  results: Card[];
  updateResults: () => void;
}

const DEFAULT_FILTERS: Filters = { inks: [], cost: [1, 9], types: [], inkable: 'any' };

// Memoized filtering function for better performance
function filterCards(cards: Card[], filters: Filters): Card[] {
  if (!cards.length) return [];
  
  const { inks, cost, types, inkable } = filters;
  const [lo, hi] = cost;
  const isInkable = (c: Card) => c.inkable ?? !/uninkable/i.test(c.text || '');
  
  // Early return if no filters are applied
  if (!inks.length && (lo === 1 && hi === 9) && !types?.length && inkable === 'any') {
    return cards;
  }

  return cards.filter(card => {
    // Ink filter
    if (inks.length && !inks.includes(card.ink)) return false;
    
    // Cost filter
    const cardCost = Number(card.ink_cost ?? 0);
    if (lo !== 1 || hi !== 9) {
      if (hi === 9) {
        if (cardCost < lo) return false;
      } else {
        if (cardCost < lo || cardCost > hi) return false;
      }
    }
    
    // Type filter
    if (types?.length && !types.includes((card.type || '').split('/')[0])) return false;
    
    // Inkable filter
    if (inkable === 'inkable' && !isInkable(card)) return false;
    if (inkable === 'uninkable' && isInkable(card)) return false;
    
    return true;
  });
}

export const useSearch = create<SearchState>((set, get) => ({
  query: '',
  setQuery: (q: string) => {
    if (get().query !== q) {
      set({ query: q });
      get().updateResults();
    }
  },
  filters: DEFAULT_FILTERS,
  setFilters: (f: Partial<Filters> | ((prev: Filters) => Partial<Filters>)) => {
    const currentFilters = get().filters;
    const update = typeof f === 'function' ? f(currentFilters) : f;
    const next = { ...currentFilters, ...update };
    if (shallow(currentFilters, next)) return;
    set({ filters: next });
    get().updateResults();
  },
  clearFilters: () => {
    set({ query: '', filters: { inks: [], cost: [1, 9], types: [], inkable: 'any' } });
    get().updateResults();
  },
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
    get().updateResults();
  },
  results: [],
  updateResults: () => {
    const { query, filters, index } = get();
    const cards = useStore.getState().cards;
    
    if (!cards.length) {
      set({ results: [] });
      return;
    }

    let searchResults: Card[];
    
    if (query && index) {
      const hits = index.search(query, {
        fields: { name: { boost: 3 }, subtitle: { boost: 2 }, text: { boost: 1 } },
        expand: true,
        bool: 'AND',
      });
      const map = new Map(cards.map(c => [c.id, c]));
      searchResults = hits.map(h => map.get(Number(h.ref))!).filter(Boolean);
    } else {
      searchResults = cards;
    }

    const filtered = filterCards(searchResults, filters);
    set({ results: filtered });
  },
}));

export const useSearchInit = () => {
  const cards = useStore(s => s.cards);
  const buildIndex = useSearch(s => s.buildIndex);
  
  useEffect(() => { 
    if (cards.length) {
      console.log(`Building search index for ${cards.length} cards`);
      buildIndex(cards); 
    }
  }, [cards.length]);
};
