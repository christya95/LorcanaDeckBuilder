/**
 * Ink type constants for the Lorcana Trading Card Game
 * Defines the available ink types and their associated colors
 */

export const INK_TYPES = {
  AMBER: 'Amber',
  AMETHYST: 'Amethyst', 
  EMERALD: 'Emerald',
  RUBY: 'Ruby',
  SAPPHIRE: 'Sapphire',
  STEEL: 'Steel',
} as const;

export type InkType = typeof INK_TYPES[keyof typeof INK_TYPES];

export const INK_COLORS: Record<InkType, string> = {
  [INK_TYPES.AMBER]: '#FF8C00',
  [INK_TYPES.AMETHYST]: '#9370DB',
  [INK_TYPES.EMERALD]: '#228B22',
  [INK_TYPES.RUBY]: '#DC143C',
  [INK_TYPES.SAPPHIRE]: '#4169E1',
  [INK_TYPES.STEEL]: '#708090',
};

export const INK_TYPE_LIST: InkType[] = [
  INK_TYPES.AMBER,
  INK_TYPES.AMETHYST,
  INK_TYPES.EMERALD,
  INK_TYPES.RUBY,
  INK_TYPES.SAPPHIRE,
  INK_TYPES.STEEL,
];

export const INK_TYPE_IMAGE_PATHS: Record<InkType, string> = {
  [INK_TYPES.AMBER]: '/images/ink-types/amber.png',
  [INK_TYPES.AMETHYST]: '/images/ink-types/amethyst.png',
  [INK_TYPES.EMERALD]: '/images/ink-types/emerald.png',
  [INK_TYPES.RUBY]: '/images/ink-types/ruby.png',
  [INK_TYPES.SAPPHIRE]: '/images/ink-types/sapphire.png',
  [INK_TYPES.STEEL]: '/images/ink-types/steel.png',
};
