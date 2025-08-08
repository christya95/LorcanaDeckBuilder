/**
 * Card-related type definitions for the Lorcana Deck Builder
 * Provides type safety for card data structures and operations
 */

import { InkType } from '../constants/inkTypes';

/**
 * Represents a single card in the Lorcana Trading Card Game
 */
export interface Card {
  /** Unique identifier for the card */
  id: number;
  
  /** Card name (e.g., "Rhino - Motivational Speaker") */
  name: string;
  
  /** Subtitle or additional name information */
  subtitle?: string;
  
  /** Primary ink type of the card */
  ink: string;
  
  /** Ink cost to play the card */
  ink_cost: number;
  
  /** Card number within the set */
  card_number: string;
  
  /** Card rarity (Common, Uncommon, Rare, Legendary, etc.) */
  rarity: string;
  
  /** Card type (Character, Action, Item, etc.) */
  type: string;
  
  /** Array of card classifications */
  classifications: string[];
  
  /** Lore value of the card */
  lore: number;
  
  /** Card text/ability description */
  text: string;
  
  /** URL to the card image */
  image_url?: string;
  
  /** Alternative image property */
  image?: string;
  
  /** Set the card belongs to */
  set: string;
  
  /** Artist who illustrated the card */
  illustrator?: string;
  
  /** Whether the card can be inked (used as ink) */
  inkable?: boolean;
}

/**
 * Represents a card with quantity information for deck building
 */
export interface CardWithQuantity {
  /** The card data */
  card: Card;
  
  /** Number of copies in the deck */
  quantity: number;
}

/**
 * Represents a card entry in a deck list
 */
export interface DeckCardEntry {
  /** The card data */
  card: Card;
  
  /** Number of copies in the deck */
  count: number;
}

/**
 * Card display configuration for different screen sizes
 */
export interface CardDisplayConfig {
  /** Width of the card in pixels */
  width: number;
  
  /** Height of the card in pixels */
  height: number;
  
  /** Gap between cards in pixels */
  gap: number;
  
  /** Minimum number of columns to display */
  minColumns: number;
}

/**
 * Card filter options for searching and filtering
 */
export interface CardFilters {
  /** Selected ink types */
  inks: InkType[];
  
  /** Cost range [min, max] */
  cost: [number, number];
  
  /** Selected card types */
  types?: string[];
  
  /** Inkable filter: 'any', 'inkable', or 'uninkable' */
  inkable: 'any' | 'inkable' | 'uninkable';
}

/**
 * Card search and filter state
 */
export interface CardSearchState {
  /** Current search query */
  query: string;
  
  /** Applied filters */
  filters: CardFilters;
  
  /** Search results */
  results: Card[];
  
  /** Total number of results */
  totalResults: number;
  
  /** Whether search index is ready */
  indexReady: boolean;
}
