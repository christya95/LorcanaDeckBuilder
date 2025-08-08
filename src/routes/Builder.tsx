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
import CollectionsIcon from "@mui/icons-material/Collections";
import TopFilters from "@/components/TopFilters";
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
  const results = useSearch((s) => s.results);
  const [open, setOpen] = useState(false);
  const showDeck = useMediaQuery("(min-width:900px)");

  useEffect(() => {
    load();
  }, [load]);

  return (
    <Box sx={{ height: "100vh", backgroundColor: "background.default" }}>
      {/* Fixed filter bar at top */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "background.paper",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <TopFilters />
      </Box>

      {/* Main content area with independent scrolling */}
      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 200px)", // Subtract filter height
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
          }}
        >
          {/* Results count - fixed */}
          <Box
            sx={{
              px: { xs: 1, sm: 2, md: 3 },
              py: 2,
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              backgroundColor: "background.paper",
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
                "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <DeckPreview />
          </Box>
        )}
      </Box>

      {/* Mobile deck button */}
      <IconButton
        color="primary"
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          display: { xs: "inline-flex", md: "none" },
          backgroundColor: "primary.main",
          color: "white",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          "&:hover": {
            backgroundColor: "primary.dark",
          },
        }}
      >
        <CollectionsIcon />
      </IconButton>

      {/* Mobile deck dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
        {open && <DeckPreview />}
      </Dialog>
    </Box>
  );
}
