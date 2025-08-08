import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  useMediaQuery,
  CircularProgress,
  Container,
  useTheme,
} from "@mui/material";
import { SearchFilters } from "@/features/search/components/SearchFilters";
import CardGrid from "@/components/CardGrid";
import DeckPreview from "@/components/DeckPreview";
import { useStore } from "@/store/useStore";
import { useDecks } from "@/store/useDecks";
import { useSearch, useSearchInit } from "@/store/useSearch";

export default function Builder() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const load = useStore((s) => s.load);
  const indexReady = useStore((s) => s.indexReady);
  const loading = useStore((s) => s.loading);
  const { addToSelectedOrPrompt } = useDecks();
  useSearchInit();

  // Search state
  const query = useSearch((s) => s.query);
  const setQuery = useSearch((s) => s.setQuery);
  const filters = useSearch((s) => s.filters);
  const setFilters = useSearch((s) => s.setFilters);
  const results = useSearch((s) => s.results);

  const [open, setOpen] = useState(false);
  const showDeck = useMediaQuery("(min-width:900px)");

  useEffect(() => {
    load();
  }, [load]);

  return (
    <Box sx={{ height: "100vh", backgroundColor: "background.default" }}>
      {/* Fixed filter bar (shifted up under global header) */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "background.paper",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <SearchFilters
          searchQuery={query}
          filters={filters}
          onSearchChange={setQuery}
          onFiltersChange={setFilters}
        />
      </Box>

      {/* Main content area with independent scrolling */}
      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 140px)", // Subtract filter height (global header handled outside)
          overflow: "hidden", // Prevent body scroll
        }}
      >
        {/* Left side: Card grid with independent scroll */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            overflow: "hidden",
            background:
              "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", // Distinct card gallery background
          }}
        >
          {/* Results count - fixed */}
          <Box
            sx={{
              px: { xs: 1, sm: 2, md: 3 },
              py: 2,
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              backgroundColor: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              flexShrink: 0,
            }}
          >
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              color="text.primary"
            >
              {results.length} cards
            </Typography>
            {results.length > 0 && !isMobile && (
              <Typography variant="body2" color="text.secondary">
                Click on cards to add them to your deck
              </Typography>
            )}
          </Box>

          {/* Scrollable card grid container */}
          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              px: { xs: 1, sm: 2, md: 3 },
              py: 2,
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: "rgba(255,255,255,0.05)",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "rgba(255,255,255,0.2)",
                borderRadius: "4px",
                "&:hover": {
                  background: "rgba(255,255,255,0.3)",
                },
              },
            }}
          >
            {loading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight={400}
              >
                <Box textAlign="center">
                  <CircularProgress size={48} sx={{ mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    Loading cards...
                  </Typography>
                </Box>
              </Box>
            ) : indexReady ? (
              <CardGrid cards={results} onCardClick={addToSelectedOrPrompt} />
            ) : (
              <Typography>Initializing...</Typography>
            )}
          </Box>
        </Box>

        {/* Right side: Fixed deck preview panel */}
        {showDeck && (
          <Box
            sx={{
              width: { md: 380, lg: 420, xl: 460 },
              flexShrink: 0,
              height: "100%",
              display: { xs: "none", md: "block" },
              overflow: "hidden",
              borderRadius: 0,
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              background:
                "linear-gradient(135deg, #2d1b69 0%, #11998e 50%, #38ef7d 100%)", // Distinct deck builder background
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <DeckPreview />
          </Box>
        )}
      </Box>

      {/* Mobile deck dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
        {open && <DeckPreview />}
      </Dialog>
    </Box>
  );
}
