import Dexie, { Table } from 'dexie';
import type { Card } from '../types';

export interface Deck {
  id?: number;
  name: string;
  createdAt: number;
  updatedAt: number;
}

export interface DeckCard {
  id?: number;
  deckId: number;
  cardId: number;
  count: number;
  snapshot: any;
}

export class LorcanaDB extends Dexie {
  cards!: Table<Card, number>;
  decks!: Table<Deck, number>;
  deckCards!: Table<DeckCard, number>;

  constructor() {
    super('lorcana');
    this.version(1).stores({
      cards: 'id,name',
      decks: '++id, name, createdAt, updatedAt',
      deckCards: '++id, deckId, cardId'
    });
  }
}

export const db = new LorcanaDB();
