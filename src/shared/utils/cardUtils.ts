/**
 * Utility functions for card operations and data manipulation
 * Provides helper functions for card-related functionality
 */

import { Card } from '../types/card';
import { InkType, INK_COLORS } from '../constants/inkTypes';
import { CARD_CONSTANTS } from '../constants/cardConstants';

/**
 * Gets the image URL for a card, with fallback support
 */
export const getCardImageUrl = (card: Card): string => {
  return card.image_url || card.image || '/art/card-ph.svg';
};

/**
 * Determines if a card is inkable based on its properties
 */
export const isCardInkable = (card: Card): boolean => {
  // If inkable property is explicitly set, use that
  if (card.inkable !== undefined) {
    return card.inkable;
  }
  
  // Fallback: check if card text contains "uninkable"
  return !card.text.toLowerCase().includes('uninkable');
};

/**
 * Extracts ink types from a card's ink property
 * Handles multicolor cards with comma-separated ink types
 */
export const getCardInkTypes = (card: Card): InkType[] => {
  if (!card.ink) return [];
  
  const inkTypes = card.ink.split(',').map(ink => ink.trim());
  return inkTypes.filter(ink => Object.values(INK_COLORS).includes(ink)) as InkType[];
};

/**
 * Gets the primary ink color for a card
 */
export const getCardPrimaryInkColor = (card: Card): string => {
  const inkTypes = getCardInkTypes(card);
  if (inkTypes.length === 0) return INK_COLORS.Steel;
  
  return INK_COLORS[inkTypes[0]];
};

/**
 * Checks if a card is multicolor (has multiple ink types)
 */
export const isMulticolorCard = (card: Card): boolean => {
  return getCardInkTypes(card).length > 1;
};

/**
 * Validates if a card can be added to a deck
 */
export const canAddCardToDeck = (
  card: Card, 
  currentQuantity: number, 
  maxQuantity: number = CARD_CONSTANTS.MAX_COPIES_PER_CARD
): boolean => {
  return currentQuantity < maxQuantity;
};

/**
 * Formats card cost for display
 */
export const formatCardCost = (cost: number): string => {
  return cost >= CARD_CONSTANTS.MAX_COST ? `${CARD_CONSTANTS.MAX_COST}+` : cost.toString();
};

/**
 * Sorts cards by a specified criteria
 */
export const sortCards = (cards: Card[], sortBy: 'name' | 'cost' | 'type' | 'ink' = 'name'): Card[] => {
  return [...cards].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'cost':
        return a.ink_cost - b.ink_cost;
      case 'type':
        return a.type.localeCompare(b.type);
      case 'ink':
        return a.ink.localeCompare(b.ink);
      default:
        return 0;
    }
  });
};

/**
 * Filters cards based on multiple criteria
 */
export const filterCards = (
  cards: Card[],
  filters: {
    query?: string;
    inkTypes?: InkType[];
    costRange?: [number, number];
    cardTypes?: string[];
    inkable?: 'any' | 'inkable' | 'uninkable';
  }
): Card[] => {
  return cards.filter(card => {
    // Text search
    if (filters.query) {
      const searchTerm = filters.query.toLowerCase();
      const cardText = `${card.name} ${card.subtitle || ''} ${card.text} ${card.type}`.toLowerCase();
      if (!cardText.includes(searchTerm)) return false;
    }

    // Ink type filter
    if (filters.inkTypes && filters.inkTypes.length > 0) {
      const cardInkTypes = getCardInkTypes(card);
      if (!filters.inkTypes.some(ink => cardInkTypes.includes(ink))) return false;
    }

    // Cost range filter
    if (filters.costRange) {
      const [minCost, maxCost] = filters.costRange;
      if (card.ink_cost < minCost || card.ink_cost > maxCost) return false;
    }

    // Card type filter
    if (filters.cardTypes && filters.cardTypes.length > 0) {
      if (!filters.cardTypes.includes(card.type)) return false;
    }

    // Inkable filter
    if (filters.inkable && filters.inkable !== 'any') {
      const isInkable = isCardInkable(card);
      if (filters.inkable === 'inkable' && !isInkable) return false;
      if (filters.inkable === 'uninkable' && isInkable) return false;
    }

    return true;
  });
};
