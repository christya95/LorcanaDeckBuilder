export interface Card {
  id: number;
  name: string;
  subtitle?: string;
  ink: string;
  ink_cost: number;
  card_number: string;
  rarity: string;
  type: string;
  classifications: string[];
  lore: number;
  text: string;
  image_url?: string;
  image?: string;
  set: string;
  illustrator?: string;
  inkable?: boolean;
}

export interface DeckList {
  [cardId: number]: number;
}

export interface DeckMeta {
  id?: number;
  name: string;
  createdAt: number;
  updatedAt: number;
}

export interface Filters {
  inks: string[];
  cost: [number, number];
  types?: string[];
  inkable: 'any' | 'inkable' | 'uninkable';
}
