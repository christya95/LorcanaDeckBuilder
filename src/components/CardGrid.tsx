import type { Card } from "../types";
import CardTile from "./CardTile";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { useMemo, useCallback } from "react";
import { CARD_DISPLAY_CONFIG } from "../shared/constants/cardConstants";

interface Props {
  cards: Card[];
  onCardClick?: (card: Card) => void;
}

export default function CardGrid({ cards, onCardClick }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));

  // Responsive card configuration with proper aspect ratio
  const cardConfig = useMemo(() => {
    if (isMobile) {
      return CARD_DISPLAY_CONFIG.GRID.MOBILE;
    } else if (isTablet) {
      return CARD_DISPLAY_CONFIG.GRID.TABLET;
    } else if (isLargeScreen) {
      return CARD_DISPLAY_CONFIG.GRID.LARGE_SCREEN;
    } else {
      return CARD_DISPLAY_CONFIG.GRID.DESKTOP;
    }
  }, [isMobile, isTablet, isLargeScreen]);

  // Memoized card click handler
  const handleCardClick = useCallback(
    (card: Card) => {
      onCardClick?.(card);
    },
    [onCardClick]
  );

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fill, minmax(${cardConfig.CARD_WIDTH}px, 1fr))`,
        gap: cardConfig.GAP,
        padding: 0.5,
        width: "100%",
        justifyContent: "center",
        minHeight: "100vh",
        // Performance optimizations
        willChange: "transform",
        transform: "translateZ(0)", // Force hardware acceleration
        "& > *": {
          justifySelf: "center",
          width: "100%",
          maxWidth: cardConfig.CARD_WIDTH,
          // Optimize individual card rendering
          willChange: "transform",
          transform: "translateZ(0)",
        },
      }}
    >
      {cards.map((card) => (
        <CardTile
          key={card.id}
          card={card}
          onCardClick={handleCardClick}
          cardWidth={cardConfig.CARD_WIDTH}
          cardHeight={cardConfig.CARD_HEIGHT}
        />
      ))}
    </Box>
  );
}
