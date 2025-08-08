import { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  useMediaQuery,
} from "@mui/material";
import CollectionsIcon from "@mui/icons-material/Collections";
import TopFilters from "@/components/TopFilters";
import CardGrid from "@/components/CardGrid";
import DeckPreview from "@/components/DeckPreview";
import { useStore } from "@/store/useStore";
import { useDecks } from "@/store/useDecks";
import { useSearch, useSearchInit } from "@/store/useSearch";

export default function Builder() {
  const load = useStore((s) => s.load);
  const indexReady = useStore((s) => s.indexReady);
  const { addToSelectedOrPrompt } = useDecks();
  useSearchInit();
  const getResults = useSearch((s) => s.results);
  const results = useMemo(() => getResults(), [getResults]);
  const [open, setOpen] = useState(false);
  const showDeck = useMediaQuery("(min-width:900px)");

  useEffect(() => {
    load();
  }, [load]);

  return (
    <Box>
      <TopFilters />
      <Box display="flex" gap={2}>
        <Box flex={1} minHeight={600}>
          {indexReady ? (
            <CardGrid cards={results} onCardClick={addToSelectedOrPrompt} />
          ) : (
            <Typography>Loading...</Typography>
          )}
        </Box>
        {showDeck && (
          <Box sx={{ position: "sticky", top: 0 }}>
            <DeckPreview />
          </Box>
        )}
      </Box>
      <IconButton
        color="primary"
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          display: { xs: "inline-flex", md: "none" },
        }}
      >
        <CollectionsIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
        {open && <DeckPreview />}
      </Dialog>
    </Box>
  );
}
