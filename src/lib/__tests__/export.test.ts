import { describe, it, expect } from 'vitest';
import { exportDeck, importDeck } from '../export';
import type { Card } from '../../types';

const cards: Card[] = [
  { id: 1, name: 'Mickey Mouse', subtitle: 'Brave Little Tailor', ink: 'Ruby', ink_cost: 3, card_number: '101', rarity: 'Common', type: 'Character', classifications: ['Hero'], lore: 2, text: '', set: 'The First Chapter' },
  { id: 2, name: 'Elsa', subtitle: 'Snow Queen', ink: 'Sapphire', ink_cost: 6, card_number: '202', rarity: 'Rare', type: 'Character', classifications: ['Queen'], lore: 3, text: '', set: 'The First Chapter' }
];

describe('export/import deck', () => {
  it('exports deck to text', () => {
    const list = { 1: 2, 2: 1 };
    const out = exportDeck(list, cards);
    expect(out).toContain('2 Mickey Mouse - Brave Little Tailor');
    expect(out).toContain('1 Elsa - Snow Queen');
  });

  it('imports deck from text', () => {
    const text = '2 Mickey Mouse - Brave Little Tailor\n1 Elsa - Snow Queen';
    const list = importDeck(text, cards);
    expect(list[1]).toBe(2);
    expect(list[2]).toBe(1);
  });

  it('imports deck ignoring case and dashes', () => {
    const text = '2 MICKEY MOUSE BRAVE LITTLE TAILOR\n1 elsa – snow queen';
    const list = importDeck(text, cards);
    expect(list[1]).toBe(2);
    expect(list[2]).toBe(1);
  });
});
