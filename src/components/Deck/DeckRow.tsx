import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Card } from "@/types";
import { INK_COLORS, getInkIcon, type InkType } from "@/icons/inkIcons";

interface DeckRowProps {
  card: Card;
  count: number;
  maxCount: number;
  onIncrement: () => void;
  onDecrement: () => void;
  showPrice?: boolean;
}

/**
 * DeckRow component displays a card in the deck list with colorful background
 * based on the card's ink type and supports multicolor cards
 */
export default function DeckRow({
  card,
  count,
  maxCount,
  onIncrement,
  onDecrement,
  showPrice = false,
}: DeckRowProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Get ink colors for the card (supports multicolor)
  const getInkColors = (card: Card): string[] => {
    if (!card.ink) return [INK_COLORS.Steel];

    // Handle multicolor cards (comma-separated inks)
    const inks = card.ink.split(",").map((ink) => ink.trim());
    return inks.map((ink) => INK_COLORS[ink as InkType] || INK_COLORS.Steel);
  };

  const inkColors = getInkColors(card);
  const primaryColor = inkColors[0];
  const isMulticolor = inkColors.length > 1;

  // Create sleek multicolor background
  const getBackgroundStyle = () => {
    if (isMulticolor && inkColors.length === 2) {
      return {
        background: `linear-gradient(90deg, ${inkColors[0]} 0%, ${inkColors[0]} 50%, ${inkColors[1]} 50%, ${inkColors[1]} 100%)`,
      };
    } else if (isMulticolor && inkColors.length > 2) {
      const gradientStops = inkColors
        .map((color, index) => {
          const percentage = (index / (inkColors.length - 1)) * 100;
          return `${color} ${percentage}%`;
        })
        .join(", ");
      return {
        background: `linear-gradient(90deg, ${gradientStops})`,
      };
    } else {
      return {
        backgroundColor: primaryColor,
      };
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: isMobile ? 1 : 1.5,
        borderRadius: 2,
        marginBottom: 0.5, // Reduced spacing between cards
        ...getBackgroundStyle(),
        color: "white",
        position: "relative",
        overflow: "hidden",
        // Keep the same length as requested
        width: "100%",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.1)",
          pointerEvents: "none",
        },
      }}
    >
      {/* Ink type icon */}
      <Box sx={{ mr: 1.5, position: "relative", zIndex: 1 }}>
        {isMulticolor ? (
          <Box sx={{ position: "relative" }}>
            {inkColors.map((color, index) => {
              const InkIcon = getInkIcon(
                Object.keys(INK_COLORS).find(
                  (key) => INK_COLORS[key as InkType] === color
                ) as InkType
              );
              return (
                <Box
                  key={index}
                  sx={{
                    position: "absolute",
                    top: index * 2,
                    left: index * 2,
                    opacity: 0.8,
                  }}
                >
                  <InkIcon size={isMobile ? 16 : 20} />
                </Box>
              );
            })}
          </Box>
        ) : (
          <Box sx={{ position: "relative", zIndex: 1 }}>
            {(() => {
              const inkType = Object.keys(INK_COLORS).find(
                (key) => INK_COLORS[key as InkType] === primaryColor
              ) as InkType;
              const InkIcon = getInkIcon(inkType);
              return <InkIcon size={isMobile ? 16 : 20} />;
            })()}
          </Box>
        )}
      </Box>

      {/* Card name only - removed ink cost and other details */}
      <Box sx={{ flex: 1, position: "relative", zIndex: 1, minWidth: 0 }}>
        <Typography
          variant={isMobile ? "body2" : "body1"}
          sx={{
            fontWeight: "medium",
            lineHeight: 1.2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {card.name}
        </Typography>
      </Box>

      {/* Quantity controls */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={0.5}
        sx={{ position: "relative", zIndex: 1 }}
      >
        <IconButton
          size="small"
          onClick={onDecrement}
          disabled={count <= 0}
          sx={{
            color: "white",
            backgroundColor: "rgba(0,0,0,0.2)",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.3)",
            },
            "&:disabled": {
              opacity: 0.5,
            },
          }}
        >
          <RemoveIcon fontSize="small" />
        </IconButton>

        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            minWidth: 30,
            textAlign: "center",
          }}
        >
          {count}/{maxCount}
        </Typography>

        <IconButton
          size="small"
          onClick={onIncrement}
          disabled={count >= maxCount}
          sx={{
            color: "white",
            backgroundColor: "rgba(0,0,0,0.2)",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.3)",
            },
            "&:disabled": {
              opacity: 0.5,
            },
          }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  );
}
