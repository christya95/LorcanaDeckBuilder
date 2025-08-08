import React from "react";

// Ink color definitions with enhanced colors
export const INK_COLORS = {
  Amber: "#FF8C00",
  Amethyst: "#9370DB",
  Emerald: "#228B22",
  Ruby: "#DC143C",
  Sapphire: "#4169E1",
  Steel: "#708090",
} as const;

export type InkType = keyof typeof INK_COLORS;

// Enhanced base hexagon component with better styling
const HexagonIcon: React.FC<{
  children?: React.ReactNode;
  color: string;
  size?: number;
  className?: string;
}> = ({ children, color, size = 24, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    style={{ display: "block" }}
  >
    <defs>
      <clipPath id="hexagon">
        <path d="M12 2L22 8.5V15.5L12 22L2 15.5V8.5L12 2Z" />
      </clipPath>
      <filter id="glow">
        <feGaussianBlur stdDeviation="1" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Enhanced border with gradient */}
    <path
      d="M12 1L23 8.5V16.5L12 24L1 16.5V8.5L12 1Z"
      fill="none"
      stroke="url(#goldGradient)"
      strokeWidth="0.8"
      filter="url(#glow)"
    />

    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#D4AF37" stopOpacity="1" />
        <stop offset="100%" stopColor="#B8860B" stopOpacity="0.8" />
      </linearGradient>
    </defs>

    {/* Background with subtle gradient */}
    <path
      d="M12 2L22 8.5V15.5L12 22L2 15.5V8.5L12 2Z"
      fill={`url(#${color.replace("#", "")}Gradient)`}
      clipPath="url(#hexagon)"
    />

    <defs>
      <linearGradient
        id={`${color.replace("#", "")}Gradient`}
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="0%" stopColor={color} stopOpacity="0.9" />
        <stop offset="50%" stopColor={color} stopOpacity="1" />
        <stop offset="100%" stopColor={color} stopOpacity="0.7" />
      </linearGradient>
    </defs>

    {children}
  </svg>
);

// Enhanced individual ink type icons with more detailed patterns
export const AmberIcon: React.FC<{ size?: number; className?: string }> = ({
  size,
  className,
}) => (
  <HexagonIcon color={INK_COLORS.Amber} size={size} className={className}>
    {/* Enhanced gold/orange geometric pattern */}
    <path
      d="M12 4L16 8L14 12L16 16L12 20L8 16L10 12L8 8L12 4Z"
      fill="#FFD700"
      opacity="0.9"
      filter="url(#glow)"
    />
    <circle cx="12" cy="12" r="2" fill="#FFA500" opacity="0.7" />
    <path d="M10 10L14 10L14 14L10 14Z" fill="#FF8C00" opacity="0.6" />
  </HexagonIcon>
);

export const AmethystIcon: React.FC<{ size?: number; className?: string }> = ({
  size,
  className,
}) => (
  <HexagonIcon color={INK_COLORS.Amethyst} size={size} className={className}>
    {/* Enhanced purple swirling pattern */}
    <path
      d="M8 6C10 8 14 8 16 6C14 10 10 10 8 6Z M8 18C10 16 14 16 16 18C14 14 10 14 8 18Z"
      fill="#E6E6FA"
      opacity="0.8"
      filter="url(#glow)"
    />
    <circle cx="12" cy="12" r="1.5" fill="#DDA0DD" opacity="0.6" />
    <path d="M11 9L13 9L13 15L11 15Z" fill="#9370DB" opacity="0.5" />
  </HexagonIcon>
);

export const EmeraldIcon: React.FC<{ size?: number; className?: string }> = ({
  size,
  className,
}) => (
  <HexagonIcon color={INK_COLORS.Emerald} size={size} className={className}>
    {/* Enhanced green leaf pattern */}
    <path
      d="M12 4L14 8L16 12L14 16L12 20L10 16L8 12L10 8L12 4Z"
      fill="#90EE90"
      opacity="0.8"
      filter="url(#glow)"
    />
    <circle cx="12" cy="12" r="1.5" fill="#32CD32" opacity="0.7" />
    <path d="M10 10L14 10L14 14L10 14Z" fill="#228B22" opacity="0.6" />
  </HexagonIcon>
);

export const RubyIcon: React.FC<{ size?: number; className?: string }> = ({
  size,
  className,
}) => (
  <HexagonIcon color={INK_COLORS.Ruby} size={size} className={className}>
    {/* Enhanced red flame pattern */}
    <path
      d="M12 6L14 10L16 14L14 18L12 20L10 18L8 14L10 10L12 6Z"
      fill="#FF6B6B"
      opacity="0.9"
      filter="url(#glow)"
    />
    <circle cx="12" cy="12" r="1.5" fill="#FF4500" opacity="0.7" />
    <path d="M11 8L13 8L13 16L11 16Z" fill="#DC143C" opacity="0.6" />
  </HexagonIcon>
);

export const SapphireIcon: React.FC<{ size?: number; className?: string }> = ({
  size,
  className,
}) => (
  <HexagonIcon color={INK_COLORS.Sapphire} size={size} className={className}>
    {/* Enhanced blue wave pattern */}
    <path
      d="M6 8C8 10 10 12 12 10C14 12 16 10 18 8C16 12 14 14 12 12C10 14 8 12 6 8Z"
      fill="#87CEEB"
      opacity="0.8"
      filter="url(#glow)"
    />
    <circle cx="12" cy="12" r="1.5" fill="#4682B4" opacity="0.7" />
    <path d="M9 10L15 10L15 14L9 14Z" fill="#4169E1" opacity="0.6" />
  </HexagonIcon>
);

export const SteelIcon: React.FC<{ size?: number; className?: string }> = ({
  size,
  className,
}) => (
  <HexagonIcon color={INK_COLORS.Steel} size={size} className={className}>
    {/* Enhanced gray geometric pattern */}
    <path
      d="M8 6L16 6L16 18L8 18L8 6Z M10 8L14 8L14 16L10 16L10 8Z"
      fill="#C0C0C0"
      opacity="0.7"
      filter="url(#glow)"
    />
    <circle cx="12" cy="12" r="1.5" fill="#A9A9A9" opacity="0.6" />
    <path d="M11 9L13 9L13 15L11 15Z" fill="#708090" opacity="0.5" />
  </HexagonIcon>
);

// Icon mapping
export const INK_ICONS = {
  Amber: AmberIcon,
  Amethyst: AmethystIcon,
  Emerald: EmeraldIcon,
  Ruby: RubyIcon,
  Sapphire: SapphireIcon,
  Steel: SteelIcon,
} as const;

// Utility function to get icon component
export const getInkIcon = (inkType: InkType) => {
  return INK_ICONS[inkType] || SteelIcon;
};
