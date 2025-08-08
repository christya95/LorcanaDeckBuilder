import { useStore } from './useStore';
import type { Card } from '../types';

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

  function computeStats(rows: { count: number; snapshot: Card }[]) {
    const stats = {
      total: 0,
      inkable: 0,
      uninkable: 0,
      types: {} as Record<string, number>,
      curve: Array.from({ length: 10 }, (_, i) => ({ cost: i < 9 ? String(i) : '9+', count: 0 })),
    };
    for (const { count, snapshot } of rows) {
      stats.total += count;
      const inkable = snapshot.inkable ?? !(/uninkable/i.test(snapshot.text || ''));
      if (inkable) stats.inkable += count; else stats.uninkable += count;
      const type = snapshot.type?.split('/')[0] || 'Other';
      stats.types[type] = (stats.types[type] || 0) + count;
      const cost = snapshot.ink_cost ?? 0;
      const idx = cost >= 9 ? 9 : cost;
      stats.curve[idx].count += count;
    }
    return stats;
  }

  const stats = () => computeStats(deckCards());

  return { selectedDeckId, inc, dec, addToSelectedOrPrompt, countInSelectedDeck, deckCards, stats };
};
