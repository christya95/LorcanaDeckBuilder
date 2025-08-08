/**
 * Deck-related type definitions for the Lorcana Deck Builder
 * Provides type safety for deck data structures and operations
 */

import { Card } from './card';

/**
 * Represents a deck list with card quantities
 * Maps card ID to quantity
 */
export interface DeckList {
  [cardId: number]: number;
}

/**
 * Deck metadata information
 */
export interface DeckMeta {
  /** Unique deck identifier */
  id?: number;
  
  /** Deck name */
  name: string;
  
  /** Creation timestamp */
  createdAt: number;
  
  /** Last update timestamp */
  updatedAt: number;
}

/**
 * Complete deck information including metadata and cards
 */
export interface Deck {
  /** Deck metadata */
  meta: DeckMeta;
  
  /** Deck card list */
  cards: DeckList;
}

/**
 * Deck statistics for analysis and display
 */
export interface DeckStats {
  /** Total number of cards in the deck */
  totalCards: number;
  
  /** Number of inkable cards */
  inkableCount: number;
  
  /** Number of uninkable cards */
  uninkableCount: number;
  
  /** Distribution of ink types */
  inkDistribution: Record<string, number>;
  
  /** Distribution of card types */
  typeDistribution: Record<string, number>;
  
  /** Distribution of card costs */
  costDistribution: Record<number, number>;
}

/**
 * Pie chart data structure for deck statistics visualization
 */
export interface PieChartData {
  /** Label for the data point */
  label: string;
  
  /** Numeric value */
  value: number;
  
  /** Color for the segment */
  color: string;
  
  /** Percentage of total */
  percentage: number;
}

/**
 * Deck builder state
 */
export interface DeckBuilderState {
  /** Currently selected deck */
  selectedDeckId: number | null;
  
  /** All user decks */
  decks: Deck[];
  
  /** Loading state */
  isLoading: boolean;
  
  /** Error state */
  error: string | null;
}
