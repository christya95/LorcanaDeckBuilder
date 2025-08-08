import { useStore } from './useStore';
import type { DeckList } from '../types';

export const useDecks = () => {
  const selectedDeckId = useStore(s => s.selectedDeckId) || 1;
  const deckLists = useStore(s => s.deckLists);
  const addCard = useStore(s => s.addCard);
  const removeCard = useStore(s => s.removeCard);

  if (!deckLists[selectedDeckId]) deckLists[selectedDeckId] = {};
  const deckCards: DeckList = deckLists[selectedDeckId];
  const countInSelectedDeck = (cardId: number) => deckCards[cardId] || 0;

  return { selectedDeckId, addCard, removeCard, deckCards, countInSelectedDeck };
};
