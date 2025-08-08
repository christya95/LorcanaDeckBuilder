import { db } from '../lib/dexie';
import { buildIndex } from '../lib/elastic';
import type { Card } from '../types';
import type { Index } from 'elasticlunr';

const SETS = ["TFC","ROTF","ITI","UR","SDS","INKBOUND"];
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/LorcanaJSON/LorcanaJSON@latest/cards';
const GITHUB_BASE = 'https://raw.githubusercontent.com/LorcanaJSON/LorcanaJSON/main/EN/cards';

async function fetchSet(set: string) {
  const urls = [`${CDN_BASE}/${set}.json`, `${GITHUB_BASE}/${set}.json`];
  for (const url of urls) {
    try {
      const res = await fetch(url);
      if (res.ok) return await res.json();
    } catch {
      // ignore and try next source
    }
  }
  return null;
}

function normalize(cards: Card[]): Card[] {
  const map = new Map<number, Card>();
  for (const card of cards) {
    if (!map.has(card.id)) map.set(card.id, card);
  }
  return Array.from(map.values());
}

export async function loadCards(): Promise<{ cards: Card[]; index: Index<Card> }> {
  const cached = await db.cards.toArray();
  if (cached && cached.length) {
    const index = buildIndex(cached);
    return { cards: cached, index };
  }

  let all: Card[] = [];
  for (const set of SETS) {
    const data = await fetchSet(set);
    if (data) all = all.concat(data.cards || data);
  }

  if (!all.length) {
    const local = await fetch('/data/cards.json').then(r => r.json());
    all = local.cards || local;
  }

  const cards = normalize(all);
  if (cards.length) await db.cards.bulkPut(cards);
  const index = buildIndex(cards);
  return { cards, index };
}
