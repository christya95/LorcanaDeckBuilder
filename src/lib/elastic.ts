import elasticlunr from 'elasticlunr';
import type { Card } from '../types';

export type CardIndex = elasticlunr.Index<Card>;

export function buildIndex(cards: Card[]): CardIndex {
  const index = elasticlunr<Card>(function () {
    this.setRef('id');
    this.addField('name', { boost: 5 });
    this.addField('subtitle', { boost: 3 });
    this.addField('text');
    this.addField('type');
    this.addField('classifications');
    this.addField('set');
    this.addField('ink');
    this.addField('rarity');
  });
  cards.forEach(card => index.addDoc(card));
  return index;
}
