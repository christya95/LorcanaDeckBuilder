import { Drawer, Box, Stack, Typography, ToggleButtonGroup, ToggleButton, Slider, Checkbox, FormGroup, FormControlLabel, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSearch } from '@/store/useSearch';
import { InkAmber, InkAmethyst, InkEmerald, InkRuby, InkSapphire, InkSteel, InkwellIcon, InkwellCross } from '@/icons/lorcana';

const INKS = [
  { key: 'Amber', Icon: InkAmber },
  { key: 'Amethyst', Icon: InkAmethyst },
  { key: 'Emerald', Icon: InkEmerald },
  { key: 'Ruby', Icon: InkRuby },
  { key: 'Sapphire', Icon: InkSapphire },
  { key: 'Steel', Icon: InkSteel },
];

const TYPES = ['Character', 'Action', 'Item', 'Song', 'Location'];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function FilterDrawer({ open, onClose }: Props) {
  const { filters, setFilters } = useSearch();
  const cost = filters.cost || [1, 9];

  const toggleInk = (ink: string) => {
    const inks = filters.inks || [];
    const next = inks.includes(ink) ? inks.filter(i => i !== ink) : [...inks, ink];
    setFilters({ inks: next });
  };

  const toggleType = (type: string) => {
    const types = filters.types || [];
    const next = types.includes(type) ? types.filter(t => t !== type) : [...types, type];
    setFilters({ types: next });
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose} transitionDuration={300}>
      <Box sx={{ width: 260, p: 2 }} role="presentation">
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle1" gutterBottom>Colors</Typography>
            <Stack direction="row" spacing={1}>
              {INKS.map(({ key, Icon }) => (
                <Box key={key} onClick={() => toggleInk(key)} sx={{ cursor: 'pointer', opacity: filters.inks?.includes(key) ? 1 : 0.3 }}>
                  <Icon />
                </Box>
              ))}
            </Stack>
          </Box>
          <Box>
            <Typography variant="subtitle1" gutterBottom>Types</Typography>
            <FormGroup>
              {TYPES.map(t => (
                <FormControlLabel key={t} control={<Checkbox checked={filters.types?.includes(t) || false} onChange={() => toggleType(t)} />} label={t} />
              ))}
            </FormGroup>
          </Box>
          <Box>
            <Typography variant="subtitle1" gutterBottom>Inkwell</Typography>
            <ToggleButtonGroup
              size="small"
              exclusive
              value={filters.inkable}
              onChange={(_, v) => setFilters({ inkable: v || 'any' })}
            >
              <ToggleButton value="inkable"><InkwellIcon /></ToggleButton>
              <ToggleButton value="uninkable"><InkwellCross /></ToggleButton>
              <ToggleButton value="any">Any</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box>
            <Typography variant="subtitle1" gutterBottom>Cost</Typography>
            <Slider
              min={1}
              max={9}
              value={cost}
              onChange={(_, v) => setFilters({ cost: v as number[] })}
              valueLabelDisplay="auto"
              valueLabelFormat={(v) => (v === 9 ? '9+' : v)}
              marks={Array.from({ length: 9 }, (_, i) => ({ value: i + 1, label: i === 8 ? '9+' : String(i + 1) }))}
            />
          </Box>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>Rarity</AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">Not implemented</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>Set</AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">Not implemented</Typography>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Box>
    </Drawer>
  );
}
