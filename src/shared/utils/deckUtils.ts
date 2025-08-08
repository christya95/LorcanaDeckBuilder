/**
 * Utility functions for deck operations and statistics
 * Provides helper functions for deck-related functionality
 */

import { Card } from '../types/card';
import { Deck, DeckList, DeckStats, PieChartData } from '../types/deck';
import { CARD_CONSTANTS } from '../constants/cardConstants';
import { INK_COLORS } from '../constants/inkTypes';
import { isCardInkable, getCardInkTypes } from './cardUtils';

/**
 * Calculates deck statistics from a deck list and card data
 */
export const calculateDeckStats = (
  deckList: DeckList, 
  allCards: Card[]
): DeckStats => {
  const stats: DeckStats = {
    totalCards: 0,
    inkableCount: 0,
    uninkableCount: 0,
    inkDistribution: {},
    typeDistribution: {},
    costDistribution: {},
  };

  // Process each card in the deck
  Object.entries(deckList).forEach(([cardId, quantity]) => {
    const card = allCards.find(c => c.id === parseInt(cardId));
    if (!card) return;

    const totalQuantity = quantity;
    stats.totalCards += totalQuantity;

    // Count inkable vs uninkable
    if (isCardInkable(card)) {
      stats.inkableCount += totalQuantity;
    } else {
      stats.uninkableCount += totalQuantity;
    }

    // Count ink types
    const inkTypes = getCardInkTypes(card);
    inkTypes.forEach(inkType => {
      stats.inkDistribution[inkType] = (stats.inkDistribution[inkType] || 0) + totalQuantity;
    });

    // Count card types
    stats.typeDistribution[card.type] = (stats.typeDistribution[card.type] || 0) + totalQuantity;

    // Count costs
    stats.costDistribution[card.ink_cost] = (stats.costDistribution[card.ink_cost] || 0) + totalQuantity;
  });

  return stats;
};

/**
 * Converts deck statistics to pie chart data
 */
export const convertStatsToPieChartData = (
  distribution: Record<string, number>,
  colorMap: Record<string, string> = {}
): PieChartData[] => {
  const total = Object.values(distribution).reduce((sum, count) => sum + count, 0);
  
  return Object.entries(distribution)
    .map(([label, value]) => ({
      label,
      value,
      color: colorMap[label] || '#666666',
      percentage: total > 0 ? Math.round((value / total) * 100) : 0,
    }))
    .sort((a, b) => b.value - a.value);
};

/**
 * Generates ink color pie chart data from deck statistics
 */
export const generateInkColorPieChartData = (deckStats: DeckStats): PieChartData[] => {
  return convertStatsToPieChartData(deckStats.inkDistribution, INK_COLORS);
};

/**
 * Generates inkable status pie chart data from deck statistics
 */
export const generateInkablePieChartData = (deckStats: DeckStats): PieChartData[] => {
  const distribution = {
    Inkable: deckStats.inkableCount,
    Uninkable: deckStats.uninkableCount,
  };

  return convertStatsToPieChartData(distribution, {
    Inkable: '#4CAF50',
    Uninkable: '#FF9800',
  });
};

/**
 * Generates card type pie chart data from deck statistics
 */
export const generateCardTypePieChartData = (deckStats: DeckStats): PieChartData[] => {
  return convertStatsToPieChartData(deckStats.typeDistribution);
};

/**
 * Validates if a deck meets the minimum requirements
 */
export const validateDeck = (deckList: DeckList, allCards: Card[]): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  const totalCards = Object.values(deckList).reduce((sum, quantity) => sum + quantity, 0);
  
  // Check minimum deck size
  if (totalCards < 60) {
    errors.push(`Deck must contain at least 60 cards. Current: ${totalCards}`);
  }
  
  // Check maximum deck size
  if (totalCards > 60) {
    warnings.push(`Deck contains ${totalCards} cards. Standard deck size is 60.`);
  }
  
  // Check individual card limits
  Object.entries(deckList).forEach(([cardId, quantity]) => {
    if (quantity > CARD_CONSTANTS.MAX_COPIES_PER_CARD) {
      const card = allCards.find(c => c.id === parseInt(cardId));
      const cardName = card?.name || `Card ${cardId}`;
      errors.push(`${cardName} has ${quantity} copies. Maximum allowed: ${CARD_CONSTANTS.MAX_COPIES_PER_CARD}`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Creates a new empty deck
 */
export const createEmptyDeck = (name: string): Deck => {
  return {
    meta: {
      name,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    cards: {},
  };
};

/**
 * Adds a card to a deck
 */
export const addCardToDeck = (
  deck: Deck, 
  cardId: number, 
  quantity: number = 1
): Deck => {
  const currentQuantity = deck.cards[cardId] || 0;
  const newQuantity = Math.min(
    currentQuantity + quantity, 
    CARD_CONSTANTS.MAX_COPIES_PER_CARD
  );
  
  return {
    ...deck,
    meta: {
      ...deck.meta,
      updatedAt: Date.now(),
    },
    cards: {
      ...deck.cards,
      [cardId]: newQuantity,
    },
  };
};

/**
 * Removes a card from a deck
 */
export const removeCardFromDeck = (
  deck: Deck, 
  cardId: number, 
  quantity: number = 1
): Deck => {
  const currentQuantity = deck.cards[cardId] || 0;
  const newQuantity = Math.max(0, currentQuantity - quantity);
  
  const newCards = { ...deck.cards };
  
  if (newQuantity === 0) {
    delete newCards[cardId];
  } else {
    newCards[cardId] = newQuantity;
  }
  
  return {
    ...deck,
    meta: {
      ...deck.meta,
      updatedAt: Date.now(),
    },
    cards: newCards,
  };
};
