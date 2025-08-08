import { db } from '../lib/dexie';
import { buildIndex } from '../lib/elastic';
import type { Card } from '../types';
import elasticlunr from 'elasticlunr';

// Updated set codes to match what's actually available in the repository
const SETS = ["TFC", "ROTF", "ITI", "UR", "SDS", "INK"];
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/LorcanaJSON/LorcanaJSON@latest/cards';
const GITHUB_BASE = 'https://raw.githubusercontent.com/LorcanaJSON/LorcanaJSON/main/EN/cards';

async function fetchSet(set: string) {
  const urls = [`${CDN_BASE}/${set}.json`, `${GITHUB_BASE}/${set}.json`];
  for (const url of urls) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        console.log(`Successfully loaded set: ${set}`);
        return data;
      }
    } catch (error) {
      console.warn(`Failed to fetch ${set} from ${url}:`, error);
      // ignore and try next source
    }
  }
  console.warn(`Failed to load set: ${set} from all sources`);
  return null;
}

function normalize(cards: Card[]): Card[] {
  const map = new Map<number, Card>();
  for (const card of cards) {
    if (!map.has(card.id)) map.set(card.id, card);
  }
  return Array.from(map.values());
}

export async function loadCards(): Promise<{ cards: Card[]; index: elasticlunr.Index<Card> }> {
  const cached = await db.cards.toArray();
  if (cached && cached.length) {
    console.log(`Using ${cached.length} cached cards`);
    const index = buildIndex(cached);
    return { cards: cached, index };
  }

  let all: Card[] = [];
  for (const set of SETS) {
    const data = await fetchSet(set);
    if (data) {
      const setCards = data.cards || data;
      all = all.concat(setCards);
      console.log(`Added ${setCards.length} cards from ${set}`);
    }
  }

  if (!all.length) {
    console.log('No cards loaded from external sources, trying local data');
    try {
      const local = await fetch('/data/cards.json').then(r => r.json());
      all = local.cards || local;
      console.log(`Loaded ${all.length} cards from local data`);
    } catch (error) {
      console.error('Failed to load local cards:', error);
    }
  }

  const cards = normalize(all);
  if (cards.length) {
    await db.cards.bulkPut(cards);
    console.log(`Cached ${cards.length} cards`);
  }
  const index = buildIndex(cards);
  return { cards, index };
}
