import { Drawer, Box, Stack, IconButton, Checkbox, FormControlLabel, Typography, ToggleButtonGroup, ToggleButton, Slider, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSearch } from "@/store/useSearch";
import { useStore } from "@/store/useStore";
import { InkAmber, InkAmethyst, InkEmerald, InkRuby, InkSapphire, InkSteel, InkwellIcon, InkwellCross } from "@/icons/lorcana";
import { useMemo } from "react";

const INK_ICONS: Record<string, any> = {
  Amber: InkAmber,
  Amethyst: InkAmethyst,
  Emerald: InkEmerald,
  Ruby: InkRuby,
  Sapphire: InkSapphire,
  Steel: InkSteel,
};

const TYPES = ["Character", "Action", "Item", "Song", "Location"];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function FilterDrawer({ open, onClose }: Props) {
  const { filters, setFilters, clearFilters } = useSearch();
  const cards = useStore(s => s.cards);
  const rarities = useMemo(() => Array.from(new Set(cards.map(c => c.rarity))).sort(), [cards]);
  const sets = useMemo(() => Array.from(new Set(cards.map(c => c.set))).sort(), [cards]);
  const cost = filters.cost ?? [1, 9];

  const toggle = (key: "inks"|"types"|"rarities"|"sets", value: string) => {
    const arr = filters[key] || [];
    const next = arr.includes(value) ? arr.filter((i: string) => i !== value) : [...arr, value];
    setFilters({ [key]: next } as any);
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose} transitionDuration={300}>
      <Box sx={{ width: 280, p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Filters</Typography>
          <IconButton size="small" onClick={clearFilters}>Clear</IconButton>
        </Stack>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>Colors</Typography>
            <Stack direction="row" spacing={1}>
              {Object.entries(INK_ICONS).map(([ink, Icon]) => (
                <IconButton key={ink} onClick={() => toggle("inks", ink)} color={filters.inks?.includes(ink) ? "primary" : "default"}>
                  <Icon />
                </IconButton>
              ))}
            </Stack>
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>Types</Typography>
            <Stack>
              {TYPES.map(t => (
                <FormControlLabel key={t} control={<Checkbox checked={filters.types?.includes(t)} onChange={() => toggle("types", t)} />} label={t} />
              ))}
            </Stack>
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>Inkwell</Typography>
            <ToggleButtonGroup exclusive size="small" value={filters.inkable} onChange={(_, v) => setFilters({ inkable: v || "any" })}>
              <ToggleButton value="inkable"><InkwellIcon /></ToggleButton>
              <ToggleButton value="uninkable"><InkwellCross /></ToggleButton>
              <ToggleButton value="any">Any</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>Cost</Typography>
            <Slider
              size="small"
              min={1}
              max={9}
              value={cost}
              onChange={(_, v) => setFilters({ cost: v as [number, number] })}
              valueLabelDisplay="auto"
              valueLabelFormat={(v)=> v===9 ? "9+" : v}
              marks={[1,2,3,4,5,6,7,8,9].map(v=>({ value:v, label: v===9?"9+":String(v)}))}
            />
          </Box>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>Rarity</AccordionSummary>
            <AccordionDetails>
              <Stack>
                {rarities.map(r => (
                  <FormControlLabel key={r} control={<Checkbox checked={filters.rarities?.includes(r)} onChange={() => toggle("rarities", r)} />} label={r} />
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>Set</AccordionSummary>
            <AccordionDetails>
              <Stack>
                {sets.map(s => (
                  <FormControlLabel key={s} control={<Checkbox checked={filters.sets?.includes(s)} onChange={() => toggle("sets", s)} />} label={s} />
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Box>
    </Drawer>
  );
}
