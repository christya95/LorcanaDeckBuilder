import type { Card } from "../types";
import CardTile from "./CardTile";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { useMemo } from "react";

interface Props {
  cards: Card[];
  onCardClick?: (card: Card) => void;
}

export default function CardGrid({ cards, onCardClick }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));

  // Bigger cards with minimal spacing
  const cardConfig = useMemo(() => {
    if (isMobile) {
      return {
        width: 160,
        height: 224,
        gap: 4,
        minColumns: 2,
      };
    } else if (isTablet) {
      return {
        width: 180,
        height: 252,
        gap: 6,
        minColumns: 3,
      };
    } else if (isLargeScreen) {
      return {
        width: 200,
        height: 280,
        gap: 8,
        minColumns: 5,
      };
    } else {
      return {
        width: 190,
        height: 266,
        gap: 7,
        minColumns: 4,
      };
    }
  }, [isMobile, isTablet, isLargeScreen]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fill, minmax(${cardConfig.width}px, 1fr))`,
        gap: cardConfig.gap,
        padding: 0.5,
        width: "100%",
        justifyContent: "center",
        minHeight: "100vh",
        "& > *": {
          justifySelf: "center",
          width: "100%",
          maxWidth: cardConfig.width,
        },
      }}
    >
      {cards.map((card) => (
        <CardTile
          key={card.id}
          card={card}
          onCardClick={onCardClick}
          cardWidth={cardConfig.width}
          cardHeight={cardConfig.height}
        />
      ))}
    </Box>
  );
}
