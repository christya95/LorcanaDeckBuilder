import { create } from 'zustand';
import type { Card, DeckList, Filters, DeckMeta } from '../types';
import { loadCards } from '../data/lorcana';
import { exportDeck as doExport, importDeck as doImport } from '../lib/export';
import { db } from '../lib/dexie';
import type elasticlunr from 'elasticlunr';

interface State {
  cards: Card[];
  index: elasticlunr.Index<Card> | null;
  indexReady: boolean;
  decks: DeckMeta[];
  deckLists: Record<number, DeckList>;
  selectedDeckId: number | null;
  query: string;
  filters: Filters;
  setFilters: (f: Filters) => void;
  load: () => Promise<void>;
  search: (q: string) => Card[];
  addCard: (deckId: number, cardId: number) => void;
  removeCard: (deckId: number, cardId: number) => void;
  saveDeck: (name: string) => Promise<number>;
  exportDeck: (deckId: number) => string;
  importDeck: (text: string) => number;
}

export const useStore = create<State>((set, get) => ({
  cards: [],
  index: null,
  indexReady: false,
  decks: [],
  deckLists: {},
  selectedDeckId: null,
  query: '',
  filters: { inks: [], rarities: [], types: [], sets: [], cost: [0, 10] },
  setFilters: (f: Filters) => set({ filters: f }),
  load: async () => {
    const { cards, index } = await loadCards();
    const decks = await db.decks.toArray();
    const deckLists: Record<number, DeckList> = {};
    for (const deck of decks) {
      const entries = await db.deckCards.where('deckId').equals(deck.id!).toArray();
      deckLists[deck.id!] = Object.fromEntries(entries.map(e => [e.cardId, e.count]));
    }
    set({ cards, index, indexReady: true, decks, deckLists });
  },
  search: (q: string) => {
    const { index } = get();
    if (!index) return [];
    if (!q) return get().cards;
    return index.search(q, { expand: true }).map(r => index.documentStore.getDoc(r.ref));
  },
  addCard: (deckId: number, cardId: number) => {
    const lists = { ...get().deckLists };
    const list = lists[deckId] || (lists[deckId] = {});
    list[cardId] = (list[cardId] || 0) + 1;
    set({ deckLists: lists });
  },
  removeCard: (deckId: number, cardId: number) => {
    const lists = { ...get().deckLists };
    const list = lists[deckId];
    if (!list) return;
    if (list[cardId] <= 1) delete list[cardId]; else list[cardId]--;
    set({ deckLists: lists });
  },
  saveDeck: async (name: string) => {
    const deck: DeckMeta = { name, createdAt: Date.now(), updatedAt: Date.now() };
    const id = await db.decks.add(deck);
    const list = get().deckLists[id] || {};
    await Promise.all(Object.entries(list).map(([cardId, count]) => db.deckCards.add({ deckId: id, cardId: Number(cardId), count, snapshot: {} })));
    set(state => ({ decks: [...state.decks, { ...deck, id }], selectedDeckId: id }));
    return id;
  },
  exportDeck: (deckId: number) => {
    const list = get().deckLists[deckId] || {};
    return doExport(list, get().cards);
  },
  importDeck: (text: string) => {
    const list = doImport(text, get().cards);
    const id = Date.now();
    set(state => ({ deckLists: { ...state.deckLists, [id]: list }, decks: [...state.decks, { id, name: 'Imported Deck', createdAt: Date.now(), updatedAt: Date.now() }] }));
    return id;
  }
}));
