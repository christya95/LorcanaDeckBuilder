import { db } from '../lib/dexie';
import { buildIndex } from '../lib/elastic';
import type { Card } from '../types';
import type elasticlunr from 'elasticlunr';

const REMOTE_BASE = 'https://raw.githubusercontent.com/LorcanaJSON/LorcanaJSON/main/EN';

export async function loadCards(): Promise<{ cards: Card[]; index: elasticlunr.Index<Card>; }> {
  // Try cache
  const cached = await db.cards.toArray();
  if (cached && cached.length) {
    const index = await buildIndex(cached);
    return { cards: cached, index };
  }
  try {
    const res = await fetch(`${REMOTE_BASE}/allCards.json`);
    if (res.ok) {
      const data = await res.json();
      const cards: Card[] = data.cards || data;
      await db.cards.bulkPut(cards);
      const index = await buildIndex(cards);
      return { cards, index };
    }
  } catch (e) {
    console.warn('Remote fetch failed', e);
  }
  const local = await fetch('/data/cards.json').then(r => r.json());
  const cards: Card[] = local;
  const index = await buildIndex(cards);
  return { cards, index };
}
