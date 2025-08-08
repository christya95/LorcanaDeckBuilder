import elasticlunr from 'elasticlunr';
import type { Card } from '../types';

export function buildIndex(cards: Card[]) {
  const idx = elasticlunr<Card>();
  
  // Configure index with optimized settings
  idx.setRef('id');
  idx.addField('name', { boost: 5 });
  idx.addField('subtitle', { boost: 3 });
  idx.addField('text');
  idx.addField('type');
  idx.addField('classifications');
  idx.addField('set');
  idx.addField('ink');
  idx.addField('rarity');
  
  // Add documents in batches for better performance
  const batchSize = 100;
  for (let i = 0; i < cards.length; i += batchSize) {
    const batch = cards.slice(i, i + batchSize);
    batch.forEach(card => idx.addDoc(card));
  }
  
  return idx;
}
