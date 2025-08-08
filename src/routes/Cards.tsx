import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Drawer,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardTile from '../components/CardTile';
import { useStore } from '../store/useStore';
import { useDecks } from '../store/useDecks';

export default function Cards() {
  const load = useStore(s => s.load);
  const cards = useStore(s => s.cards);
  const filters = useStore(s => s.filters);
  const setFilters = useStore(s => s.setFilters);
  const { addCard, removeCard, countInSelectedDeck, selectedDeckId } = useDecks();
  const indexReady = useStore(s => s.indexReady);
  const query = useStore(s => s.query);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    load();
  }, [load]);

  const availableInks = useMemo(() => Array.from(new Set(cards.map(c => c.ink))).sort(), [cards]);

  const filtered = useMemo(() => {
    let result = cards;
    if (filters.inks.length) result = result.filter(c => filters.inks.includes(c.ink));
    if (query) result = useStore.getState().search(query);
    return result;
  }, [cards, filters, query]);

  const handleInkChange = (_: any, value: string[]) => {
    setFilters({ ...filters, inks: value });
  };
  const handleCostChange = (_: any, value: number | number[]) => {
    const v = value as number[];
    setFilters({ ...filters, cost: v as [number, number] });
  };

  const appliedChips = [
    ...filters.inks.map(ink => ({ label: ink, onDelete: () => handleInkChange(null, filters.inks.filter(i => i !== ink)) })),
  ];

  return (
    <Box>
      <Stack direction="row" spacing={1} mb={2} alignItems="center">
        <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
          <FilterListIcon />
        </IconButton>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {appliedChips.map(chip => (
            <Chip key={chip.label} label={chip.label} onDelete={chip.onDelete} />
          ))}
        </Stack>
      </Stack>
      {indexReady ? (
        <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 6 }} spacing={2}>
          {filtered.map(card => (
            <CardTile
              key={card.id}
              card={card}
              count={countInSelectedDeck(card.id)}
              onAdd={() => selectedDeckId && addCard(selectedDeckId, card.id)}
              onRemove={() => selectedDeckId && removeCard(selectedDeckId, card.id)}
            />
          ))}
        </Masonry>
      ) : (
        <Typography>Loading...</Typography>
      )}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>Inks</AccordionSummary>
            <AccordionDetails>
              <ToggleButtonGroup value={filters.inks} onChange={handleInkChange} size="small">
                {availableInks.map(ink => (
                  <ToggleButton value={ink} key={ink}>
                    {ink}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>Cost</AccordionSummary>
            <AccordionDetails>
              <Slider value={filters.cost} onChange={handleCostChange} valueLabelDisplay="auto" max={10} min={0} />
            </AccordionDetails>
          </Accordion>
        </Box>
      </Drawer>
    </Box>
  );
}
