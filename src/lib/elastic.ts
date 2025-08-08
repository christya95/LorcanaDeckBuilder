import type elasticlunr from 'elasticlunr';
import type { Card } from '../types';

export type CardIndex = elasticlunr.Index<Card>;

let lib: typeof import('elasticlunr') | null = null;

async function getLib() {
  if (!lib) {
    // elasticlunr tries to assign to a global `lunr` which breaks in strict ESM
    // environments (like Vite). Predeclare the global before loading the lib.
    (globalThis as any).lunr = {};
    lib = (await import('elasticlunr')).default;
    (globalThis as any).lunr = lib;
  }
  return lib;
}

export async function buildIndex(cards: Card[]): Promise<CardIndex> {
  const elasticlunr = await getLib();
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
