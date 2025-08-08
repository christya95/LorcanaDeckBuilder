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
  rarities: string[];
  types: string[];
  sets: string[];
  cost: [number, number];
}
