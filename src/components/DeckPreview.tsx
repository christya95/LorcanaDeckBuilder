import React, { useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  Stack,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useDecks } from "@/store/useDecks";
import { useStore } from "@/store/useStore";
import DeckRow from "./Deck/DeckRow";
import DeckPieChart, {
  generateInkColorData,
  generateInkableData,
  generateCardTypeData,
} from "./Deck/DeckPieChart";

/**
 * DeckPreview component displays the current deck with colorful card rows
 * and statistical pie charts showing deck composition
 */
export default function DeckPreview() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { selectedDeckId, deckLists, decks } = useDecks();
  const { cards, addCard, removeCard } = useStore();

  // Get current deck data
  const currentDeck = useMemo(() => {
    if (!selectedDeckId) return null;
    return decks.find((d) => d.id === selectedDeckId);
  }, [selectedDeckId, decks]);

  const deckList = useMemo(() => {
    if (!selectedDeckId) return {};
    return deckLists[selectedDeckId] || {};
  }, [selectedDeckId, deckLists]);

  // Get cards in deck with their counts
  const deckCards = useMemo(() => {
    return Object.entries(deckList)
      .map(([cardId, count]) => {
        const card = cards.find((c) => c.id === parseInt(cardId));
        return card ? { card, count: count as number } : null;
      })
      .filter(Boolean) as Array<{ card: any; count: number }>;
  }, [deckList, cards]);

  // Calculate deck statistics
  const totalCards = useMemo(() => {
    return deckCards.reduce((sum, { count }) => sum + count, 0);
  }, [deckCards]);

  const inkableCount = useMemo(() => {
    return deckCards.reduce((sum, { card, count }) => {
      return sum + (card.inkable !== false ? count : 0);
    }, 0);
  }, [deckCards]);

  const uninkableCount = useMemo(() => {
    return deckCards.reduce((sum, { card, count }) => {
      return sum + (card.inkable === false ? count : 0);
    }, 0);
  }, [deckCards]);

  // Generate pie chart data
  const inkColorData = useMemo(() => {
    const allCards = deckCards.flatMap(({ card, count }) =>
      Array(count).fill(card)
    );
    return generateInkColorData(allCards);
  }, [deckCards]);

  const inkableData = useMemo(() => {
    const allCards = deckCards.flatMap(({ card, count }) =>
      Array(count).fill(card)
    );
    return generateInkableData(allCards);
  }, [deckCards]);

  const cardTypeData = useMemo(() => {
    const allCards = deckCards.flatMap(({ card, count }) =>
      Array(count).fill(card)
    );
    return generateCardTypeData(allCards);
  }, [deckCards]);

  // Handle card quantity changes
  const handleIncrement = (cardId: number) => {
    if (selectedDeckId) {
      addCard(selectedDeckId, cardId);
    }
  };

  const handleDecrement = (cardId: number) => {
    if (selectedDeckId) {
      removeCard(selectedDeckId, cardId);
    }
  };

  if (!selectedDeckId || !currentDeck) {
    return (
      <Box
        sx={{
          p: 3,
          textAlign: "center",
          color: "text.secondary",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="body1">No deck selected</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "transparent",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
          backdropFilter: "blur(20px)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "white",
            textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            mb: 1,
          }}
        >
          {currentDeck.name}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "rgba(255,255,255,0.8)",
            textShadow: "0 1px 2px rgba(0,0,0,0.5)",
          }}
        >
          {totalCards} cards
        </Typography>
      </Box>

      {/* Inkable/Uninkable counters */}
      <Box
        sx={{
          p: 2,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.05)",
        }}
      >
        <Stack direction="row" spacing={1}>
          <Chip
            label={`Inkable ${inkableCount}`}
            size="small"
            sx={{
              backgroundColor: "#4CAF50",
              color: "white",
              fontWeight: "medium",
              boxShadow: "0 2px 8px rgba(76, 175, 80, 0.3)",
            }}
          />
          <Chip
            label={`Uninkable ${uninkableCount}`}
            size="small"
            sx={{
              backgroundColor: "#FF9800",
              color: "white",
              fontWeight: "medium",
              boxShadow: "0 2px 8px rgba(255, 152, 0, 0.3)",
            }}
          />
        </Stack>
      </Box>

      {/* Pie Charts */}
      <Box
        sx={{
          p: 2,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.03)",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {inkColorData.length > 0 && (
          <DeckPieChart
            title="Colors"
            data={inkColorData}
            size={isMobile ? 80 : 90}
          />
        )}

        {inkableData.some((d) => d.value > 0) && (
          <DeckPieChart
            title="Inkable"
            data={inkableData}
            size={isMobile ? 80 : 90}
          />
        )}

        {cardTypeData.length > 0 && (
          <DeckPieChart
            title="Card Types"
            data={cardTypeData}
            size={isMobile ? 80 : 90}
          />
        )}
      </Box>

      {/* Cards List with independent scrolling */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          p: 2,
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgba(255,255,255,0.05)",
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255,255,255,0.2)",
            borderRadius: "3px",
            "&:hover": {
              background: "rgba(255,255,255,0.3)",
            },
          },
        }}
      >
        {deckCards.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 6,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            <Typography variant="body1" sx={{ mb: 1 }}>
              No cards in deck
            </Typography>
            <Typography variant="body2">Click on cards to add them</Typography>
          </Box>
        ) : (
          <Stack spacing={1}>
            {deckCards.map(({ card, count }) => (
              <DeckRow
                key={card.id}
                card={card}
                count={count}
                maxCount={4}
                onIncrement={() => handleIncrement(card.id)}
                onDecrement={() => handleDecrement(card.id)}
                showPrice={false}
              />
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}
