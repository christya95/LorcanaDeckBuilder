import { Stack, TextField, Chip, IconButton } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearIcon from "@mui/icons-material/Clear";
import { useSearch } from "@/store/useSearch";
import FilterDrawer from "./FilterDrawer";
import { useState, useMemo, useCallback } from "react";
import { shallow } from "zustand/shallow";

export default function TopFilters() {
  const [query, setQuery, filters, setFilters, clearFilters] = useSearch(
    s => [s.query, s.setQuery, s.filters, s.setFilters, s.clearFilters],
    shallow
  );
  const [open, setOpen] = useState(false);
  const cost = filters.cost ?? [1, 9];

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    [setQuery]
  );

  const chips = useMemo(() => {
    const chipList: Array<{ label: string; onDelete: () => void }> = [];
    (filters.inks || []).forEach(i => {
      chipList.push({
        label: i,
        onDelete: () => setFilters({ inks: (filters.inks || []).filter(x => x !== i) }),
      });
    });
    (filters.types || []).forEach(t => {
      chipList.push({
        label: t,
        onDelete: () => setFilters({ types: (filters.types || []).filter(x => x !== t) }),
      });
    });
    if (filters.inkable && filters.inkable !== 'any') {
      chipList.push({
        label: filters.inkable === 'inkable' ? 'Inkable' : 'Uninkable',
        onDelete: () => setFilters({ inkable: 'any' }),
      });
    }
    if (cost[0] !== 1 || cost[1] !== 9) {
      chipList.push({
        label: `${cost[0]}-${cost[1] === 9 ? '9+' : cost[1]}`,
        onDelete: () => setFilters({ cost: [1, 9] }),
      });
    }
    return chipList;
  }, [filters]);

  return (
    <>
      {open && <FilterDrawer open={open} onClose={() => setOpen(false)} />}
      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" sx={{ mb: 2 }}>
        <IconButton onClick={() => setOpen(true)} size="small"><FilterAltIcon /></IconButton>
        <TextField
          size="small"
          placeholder="Search cards…"
          value={query}
          onChange={handleChange}
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
