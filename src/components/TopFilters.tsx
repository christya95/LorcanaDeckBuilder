import { Stack, TextField, Chip, IconButton } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearIcon from "@mui/icons-material/Clear";
import { useSearch, useSearchInit } from "@/store/useSearch";
import FilterDrawer from "./FilterDrawer";
import { useState } from "react";

export default function TopFilters() {
  useSearchInit();
  const { query, setQuery, filters, setFilters, clearFilters } = useSearch();
  const [open, setOpen] = useState(false);
  const cost = filters.cost ?? [1, 9];

  const chips = [
    ...(filters.inks || []).map(i => ({
      label: i,
      onDelete: () => setFilters({ inks: (filters.inks || []).filter(x => x !== i) }),
    })),
    ...(filters.types || []).map(t => ({
      label: t,
      onDelete: () => setFilters({ types: (filters.types || []).filter(x => x !== t) }),
    })),
    ...(filters.inkable && filters.inkable !== 'any'
      ? [{ label: filters.inkable === 'inkable' ? 'Inkable' : 'Uninkable', onDelete: () => setFilters({ inkable: 'any' }) }]
      : []),
    ...((cost[0] !== 1 || cost[1] !== 9)
      ? [{ label: `${cost[0]}-${cost[1] === 9 ? '9+' : cost[1]}`, onDelete: () => setFilters({ cost: [1, 9] }) }]
      : []),
  ];

  return (
    <>
      <FilterDrawer open={open} onClose={() => setOpen(false)} />
      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" sx={{ mb: 2 }}>
        <IconButton onClick={() => setOpen(true)} size="small"><FilterAltIcon /></IconButton>
        <TextField
          size="small"
          placeholder="Search cards…"
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          sx={{ flex: { xs: '1 0 100%', md: '0 0 260px' } }}
        />
        {chips.map(c => (
          <Chip key={c.label} label={c.label} onDelete={c.onDelete} size="small" />
        ))}
        {chips.length > 0 && (
          <IconButton size="small" onClick={clearFilters}><ClearIcon fontSize="small" /></IconButton>
        )}
      </Stack>
    </>
  );
}
