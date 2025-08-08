/**
 * UI constants for consistent styling and behavior across the application
 * Defines spacing, colors, animations, and other UI-related configurations
 */

export const UI_CONSTANTS = {
  SPACING: {
    XS: 0.5,
    SM: 1,
    MD: 1.5,
    LG: 2,
    XL: 3,
  },
  
  BORDER_RADIUS: {
    SM: 2,
    MD: 3,
    LG: 4,
  },
  
  TRANSITIONS: {
    FAST: '0.2s ease',
    NORMAL: '0.3s ease',
    SLOW: '0.5s ease',
    CUBIC_BEZIER: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  SHADOWS: {
    LIGHT: '0 2px 8px rgba(0,0,0,0.1)',
    MEDIUM: '0 8px 24px rgba(0,0,0,.35)',
    HEAVY: '0 16px 48px rgba(0,0,0,.4)',
    GLOW: '0 0 10px rgba(255,215,0,0.6)',
  },
  
  OPACITY: {
    DISABLED: 0.5,
    HOVER: 0.8,
    ACTIVE: 0.9,
  },
  
  Z_INDEX: {
    DROPDOWN: 1000,
    MODAL: 1300,
    TOOLTIP: 1500,
    CARD_OVERLAY: 9999,
  },
} as const;

export const THEME_COLORS = {
  BACKGROUND: {
    PRIMARY: 'background.default',
    SECONDARY: 'background.paper',
    CARD_GALLERY: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    DECK_BUILDER: 'linear-gradient(135deg, #2d1b69 0%, #11998e 50%, #38ef7d 100%)',
  },
  
  TEXT: {
    PRIMARY: 'text.primary',
    SECONDARY: 'text.secondary',
  },
  
  BORDER: {
    LIGHT: 'rgba(255,255,255,0.1)',
    MEDIUM: 'rgba(255,255,255,0.2)',
  },
} as const;

export const RESPONSIVE_BREAKPOINTS = {
  MOBILE: 'sm',
  TABLET: 'md',
  DESKTOP: 'lg',
  LARGE_SCREEN: 'xl',
} as const;
