/**
 * Card-related constants for the Lorcana Deck Builder
 * Defines card limits, costs, and other card-specific configurations
 */

export const CARD_CONSTANTS = {
  MAX_COPIES_PER_CARD: 4,
  MIN_COST: 1,
  MAX_COST: 9,
  COST_RANGE: [1, 9] as [number, number],
  DEFAULT_COST_RANGE: [1, 9] as [number, number],
} as const;

export const CARD_COST_OPTIONS = Array.from(
  { length: CARD_CONSTANTS.MAX_COST }, 
  (_, index) => index + 1
);

export const CARD_DISPLAY_CONFIG = {
  GRID: {
    MOBILE: {
      CARD_WIDTH: 160,
      CARD_HEIGHT: 224,
      GAP: 4,
      MIN_COLUMNS: 2,
    },
    TABLET: {
      CARD_WIDTH: 180,
      CARD_HEIGHT: 252,
      GAP: 6,
      MIN_COLUMNS: 3,
    },
    DESKTOP: {
      CARD_WIDTH: 190,
      CARD_HEIGHT: 266,
      GAP: 7,
      MIN_COLUMNS: 4,
    },
    LARGE_SCREEN: {
      CARD_WIDTH: 200,
      CARD_HEIGHT: 280,
      GAP: 8,
      MIN_COLUMNS: 5,
    },
  },
} as const;

export const CARD_IMAGE_CONFIG = {
  FALLBACK_URL: '/art/card-ph.svg',
  ASPECT_RATIO: 1.4, // Width to height ratio
} as const;
