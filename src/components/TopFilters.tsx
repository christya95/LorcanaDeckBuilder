import { Stack, TextField, Chip, IconButton, Tooltip, Box } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import { useSearch, useSearchIndex } from "@/store/useSearch";
import FilterDrawer from "./FilterDrawer";

export default function TopFilters() {
  useSearchIndex();
  const { query, setQuery, filters, setFilters, clearFilters } = useSearch();
  const [open, setOpen] = useState(false);
  const cost = filters.cost ?? [1,9];
  const chips = [
    ...(filters.inks || []).map(i => ({
      label: i,
      onDelete: () => setFilters({ inks: (filters.inks || []).filter(x => x !== i) }),
    })),
    ...(filters.types || []).map(t => ({
      label: t,
      onDelete: () => setFilters({ types: (filters.types || []).filter(x => x !== t) }),
    })),
    ...(filters.inkable !== 'any' ? [{ label: filters.inkable === 'inkable' ? 'Inkable' : 'Uninkable', onDelete: () => setFilters({ inkable: 'any' }) }] : []),
    ...((cost[0] !== 1 || cost[1] !== 9)
      ? [{ label: `${cost[0]}-${cost[1] === 9 ? '9+' : cost[1]}`, onDelete: () => setFilters({ cost: [1, 9] }) }]
      : []),
  ];

  return (
    <>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
        <Tooltip title="Filters">
          <IconButton size="small" onClick={() => setOpen(true)}>
            <FilterAltIcon />
          </IconButton>
        </Tooltip>
        <TextField
          size="small"
          placeholder="Search cards…"
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          sx={{ flexGrow: 1, maxWidth: { md: 300, xs: '100%' } }}
        />
        <IconButton size="small" onClick={clearFilters}><ClearIcon fontSize="small"/></IconButton>
        {chips.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {chips.map(c => (
              <Chip key={c.label} label={c.label} onDelete={c.onDelete} size="small" />
            ))}
          </Box>
        )}
      </Stack>
      <FilterDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
