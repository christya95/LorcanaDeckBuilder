import type { Card, DeckList } from '../types';

function norm(name: string) {
  return name.toLowerCase().replace(/[-–]/g, ' ').replace(/\s+/g, ' ').trim();
}

export function exportDeck(list: DeckList, cards: Card[]): string {
  const lines: string[] = [];
  Object.entries(list).forEach(([id, count]) => {
    const card = cards.find(c => c.id === Number(id));
    if (card) {
      const name = card.subtitle ? `${card.name} - ${card.subtitle}` : card.name;
      lines.push(`${count} ${name}`);
    }
  });
  return lines.join('\n');
}

export function importDeck(text: string, cards: Card[]): DeckList {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const list: DeckList = {};
  lines.forEach(line => {
    const match = line.match(/^(\d+)\s+(.+)$/);
    if (!match) return;
    const count = Number(match[1]);
    const name = norm(match[2]);
    const card = cards.find(c => norm(c.name + (c.subtitle ? ` ${c.subtitle}` : '')) === name);
    if (card) {
      list[card.id] = count;
    }
  });
  return list;
}
