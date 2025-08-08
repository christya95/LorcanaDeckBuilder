/**
 * Ink Icon Component
 * Displays ink type icons using PNG assets with consistent styling
 */

import React from "react";
import { Box } from "@mui/material";
import { InkType, INK_TYPE_IMAGE_PATHS } from "../constants/inkTypes";
import { UI_CONSTANTS } from "../constants/uiConstants";

interface InkIconProps {
  /** The ink type to display */
  inkType: InkType;

  /** Size of the icon in pixels */
  size?: number;

  /** Additional CSS class name */
  className?: string;

  /** Whether the icon is selected/active */
  isSelected?: boolean;

  /** Click handler for the icon */
  onClick?: () => void;

  /** Whether the icon is clickable */
  isClickable?: boolean;
}

/**
 * Individual ink icon component
 */
export const InkIcon: React.FC<InkIconProps> = ({
  inkType,
  size = 24,
  className = "",
  isSelected = false,
  onClick,
  isClickable = false,
}) => {
  const imagePath = INK_TYPE_IMAGE_PATHS[inkType];

  const handleClick = () => {
    if (isClickable && onClick) {
      onClick();
    }
  };

  return (
    <Box
      onClick={handleClick}
      className={className}
      sx={{
        cursor: isClickable ? "pointer" : "default",
        transition: UI_CONSTANTS.TRANSITIONS.FAST,
        transform: isSelected ? "scale(1.1)" : "scale(1)",
        opacity: isSelected ? 1 : 0.7,
        filter: isSelected
          ? `drop-shadow(0 0 8px rgba(255,255,255,0.3))`
          : "none",
        "&:hover": isClickable
          ? {
              transform: "scale(1.15)",
              opacity: 1,
            }
          : {},
      }}
    >
      <img
        src={imagePath}
        alt={`${inkType} ink type`}
        width={size}
        height={size}
        style={{
          display: "block",
          objectFit: "contain",
        }}
      />
    </Box>
  );
};

/**
 * Ink icon selector component for filter interfaces
 */
export const InkIconSelector: React.FC<{
  inkType: InkType;
  isSelected: boolean;
  onToggle: (inkType: InkType) => void;
  size?: number;
}> = ({ inkType, isSelected, onToggle, size = 32 }) => {
  return (
    <InkIcon
      inkType={inkType}
      size={size}
      isSelected={isSelected}
      isClickable={true}
      onClick={() => onToggle(inkType)}
    />
  );
};

/**
 * Ink icon display component for read-only contexts
 */
export const InkIconDisplay: React.FC<{
  inkType: InkType;
  size?: number;
}> = ({ inkType, size = 24 }) => {
  return <InkIcon inkType={inkType} size={size} isClickable={false} />;
};
