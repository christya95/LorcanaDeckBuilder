import { useStore } from './useStore';
import type { Card } from '../types';
import { db } from '../lib/dexie';

export const useDecks = () => {
  const selectedDeckId = useStore(s => s.selectedDeckId);
  const decks = useStore(s => s.decks);
  const deckLists = useStore(s => s.deckLists);
  const cards = useStore(s => s.cards);

  const inc = (deckId: number, card: Card) => {
    useStore.setState(state => {
      const lists = { ...state.deckLists };
      const list = { ...(lists[deckId] || {}) };
      const next = Math.min(4, (list[card.id] || 0) + 1);
      list[card.id] = next;
      lists[deckId] = list;
      return { deckLists: lists };
    });
  };

  const dec = (deckId: number, cardId: number) => {
    useStore.setState(state => {
      const lists = { ...state.deckLists };
      const list = { ...(lists[deckId] || {}) };
      const next = Math.max(0, (list[cardId] || 0) - 1);
      if (next === 0) delete list[cardId]; else list[cardId] = next;
      lists[deckId] = list;
      return { deckLists: lists };
    });
  };

  const addToSelectedOrPrompt = (card: Card) => {
    let id = useStore.getState().selectedDeckId;
    if (!id) {
      const newDeckId = Date.now();
      const meta = { id: newDeckId, name: 'Quick Deck', createdAt: Date.now(), updatedAt: Date.now() } as any;
      useStore.setState(state => ({
        decks: [...state.decks, meta],
        selectedDeckId: newDeckId,
        deckLists: { ...state.deckLists, [newDeckId]: {} }
      }));
      id = newDeckId;
    }
    inc(id!, card);
  };

  const countInSelectedDeck = (cardId: number) => {
    const id = useStore.getState().selectedDeckId;
    if (!id) return 0;
    return useStore.getState().deckLists[id]?.[cardId] || 0;
  };

  const deckCards = (deckId?: number) => {
    const id = deckId ?? useStore.getState().selectedDeckId;
    if (!id) return [] as Array<{ cardId: string; count: number; snapshot: Card }>;
    const list = useStore.getState().deckLists[id] || {};
    return Object.entries(list).map(([cid, count]) => {
      const snapshot = cards.find(c => c.id === Number(cid)) as Card;
      return { cardId: cid, count: count as number, snapshot };
    });
  };

  /**
   * Computes deck statistics including inkable/uninkable counts
   * Properly handles the inkable property from card data
   */
  function computeStats(rows: { count: number; snapshot: Card }[]) {
    const stats = {
      total: 0,
      inkable: 0,
      uninkable: 0,
      types: {} as Record<string, number>,
      curve: Array.from({ length: 9 }, (_, i) => ({ cost: i < 8 ? String(i + 1) : '9+', count: 0 })),
    };

    // Improved inkable detection logic
    const isInkable = (c: Card): boolean => {
      // If inkable property is explicitly set, use it
      if (c.inkable !== undefined) {
        return c.inkable !== false;
      }
      
      // Fallback: check if card text contains "uninkable"
      if (c.text) {
        return !/uninkable/i.test(c.text);
      }
      
      // Default to inkable if no information available
      return true;
    };

    for (const { count, snapshot } of rows) {
      stats.total += count;
      
      // Count inkable vs uninkable cards
      if (isInkable(snapshot)) {
        stats.inkable += count;
      } else {
        stats.uninkable += count;
      }
      
      // Count by type
      const type = snapshot.type?.split('/')[0] || 'Other';
      stats.types[type] = (stats.types[type] || 0) + count;
      
      // Count by cost curve
      const cost = snapshot.ink_cost ?? 0;
      if (cost >= 1) {
        const idx = cost >= 9 ? 8 : cost - 1;
        stats.curve[idx].count += count;
      }
    }
    
    return stats;
  }

  const stats = () => computeStats(deckCards());

  const saveDeck = async (name: string) => {
    const id = selectedDeckId ?? Date.now();
    const list = deckLists[id] || {};
    const meta = decks.find(d => d.id === id);
    const deck = { id, name, createdAt: meta?.createdAt ?? Date.now(), updatedAt: Date.now() };
    await db.decks.put(deck);
    await db.deckCards.where('deckId').equals(id).delete();
    await Promise.all(
      Object.entries(list).map(([cardId, count]) =>
        db.deckCards.add({ deckId: id, cardId: Number(cardId), count, snapshot: {} })
      )
    );
    useStore.setState(state => ({
      decks: state.decks.some(d => d.id === id)
        ? state.decks.map(d => (d.id === id ? deck : d))
        : [...state.decks, deck],
      deckLists: { ...state.deckLists, [id]: list },
      selectedDeckId: id,
    }));
  };

  return { selectedDeckId, decks, deckLists, inc, dec, addToSelectedOrPrompt, countInSelectedDeck, deckCards, stats, saveDeck };
};
