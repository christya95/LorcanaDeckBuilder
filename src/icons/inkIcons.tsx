import React from "react";

// Ink color definitions for reference
export const INK_COLORS = {
  Amber: "#FF8C00",
  Amethyst: "#9370DB",
  Emerald: "#228B22",
  Ruby: "#DC143C",
  Sapphire: "#4169E1",
  Steel: "#708090",
} as const;

export type InkType = keyof typeof INK_COLORS;

// PNG-based ink icon component
const InkIcon: React.FC<{
  inkType: InkType;
  size?: number;
  className?: string;
}> = ({ inkType, size = 24, className }) => {
  const getImagePath = (type: InkType): string => {
    const typeMap = {
      Amber: "/images/ink-types/amber.svg",
      Amethyst: "/images/ink-types/amethyst.svg",
      Emerald: "/images/ink-types/emerald.svg",
      Ruby: "/images/ink-types/ruby.svg",
      Sapphire: "/images/ink-types/sapphire.svg",
      Steel: "/images/ink-types/steel.svg",
    };
    return typeMap[type];
  };

  return (
    <img
      src={getImagePath(inkType)}
      alt={`${inkType} ink type`}
      width={size}
      height={size}
      className={className}
      style={{
        display: "block",
        objectFit: "contain",
      }}
    />
  );
};

// Individual ink type components
export const AmberIcon: React.FC<{ size?: number; className?: string }> = ({
  size,
  className,
}) => <InkIcon inkType="Amber" size={size} className={className} />;

export const AmethystIcon: React.FC<{ size?: number; className?: string }> = ({
  size,
  className,
}) => <InkIcon inkType="Amethyst" size={size} className={className} />;

export const EmeraldIcon: React.FC<{ size?: number; className?: string }> = ({
  size,
  className,
}) => <InkIcon inkType="Emerald" size={size} className={className} />;

export const RubyIcon: React.FC<{ size?: number; className?: string }> = ({
  size,
  className,
}) => <InkIcon inkType="Ruby" size={size} className={className} />;

export const SapphireIcon: React.FC<{ size?: number; className?: string }> = ({
  size,
  className,
}) => <InkIcon inkType="Sapphire" size={size} className={className} />;

export const SteelIcon: React.FC<{ size?: number; className?: string }> = ({
  size,
  className,
}) => <InkIcon inkType="Steel" size={size} className={className} />;

// Mapping object for easy access
export const INK_ICONS = {
  Amber: AmberIcon,
  Amethyst: AmethystIcon,
  Emerald: EmeraldIcon,
  Ruby: RubyIcon,
  Sapphire: SapphireIcon,
  Steel: SteelIcon,
} as const;

// Utility function to get ink icon component
export const getInkIcon = (inkType: InkType) => {
  return INK_ICONS[inkType] || SteelIcon;
};
