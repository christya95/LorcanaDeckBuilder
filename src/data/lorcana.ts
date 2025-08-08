import { db } from '../lib/dexie';
import { buildIndex } from '../lib/elastic';
import type { Card } from '../types';
import type elasticlunr from 'elasticlunr';

const REMOTE_URL = 'https://api.lorcana-api.com/cards/all';

function normalize(r: any, idx: number): Card {
  return {
    id: idx,
    name: r.Name,
    subtitle: undefined,
    ink: (r.Color || '').split(',')[0]?.trim() || '',
    ink_cost: Number(r.Cost ?? 0),
    card_number: String(r.Card_Num ?? ''),
    rarity: r.Rarity || '',
    type: r.Type || '',
    classifications: r.Classifications ? r.Classifications.split(',').map((s: string) => s.trim()) : [],
    lore: Number(r.Lore ?? 0),
    text: r.Body_Text || '',
    image_url: r.Image || undefined,
    set: r.Set_Name || '',
    illustrator: r.Artist || '',
  };
}

export async function loadCards(): Promise<{ cards: Card[]; index: elasticlunr.Index<Card>; }> {
  const cached = await db.cards.toArray();
  if (cached && cached.length) {
    const index = await buildIndex(cached);
    return { cards: cached, index };
  }
  try {
    const res = await fetch(REMOTE_URL);
    if (res.ok) {
      const data = await res.json();
      const cards = (data as any[]).map(normalize);
      await db.cards.bulkPut(cards);
      const index = await buildIndex(cards);
      return { cards, index };
    }
  } catch (e) {
    console.warn('Remote fetch failed', e);
  }
  const localRaw = await fetch('/data/cards.merged.json').then(r => r.json());
  const cards = (localRaw as any[]).map(normalize);
  const index = await buildIndex(cards);
  return { cards, index };
}
