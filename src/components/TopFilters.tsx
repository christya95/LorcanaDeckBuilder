import { Stack, TextField, Chip, IconButton } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearIcon from "@mui/icons-material/Clear";
import { useSearch } from "@/store/useSearch";
import FilterDrawer from "./FilterDrawer";
import { useState, useMemo, useCallback } from "react";
import type { Filters } from "@/types";

export default function TopFilters() {
  const query = useSearch((s) => s.query);
  const setQuery = useSearch((s) => s.setQuery);
  const filters = useSearch((s) => s.filters);
  const setFilters = useSearch((s) => s.setFilters);
  const clearFilters = useSearch((s) => s.clearFilters);

  const [open, setOpen] = useState(false);
  const cost = filters.cost ?? [1, 9];

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    [setQuery]
  );

  // Use functional approach to avoid dependencies on changing filter values
  const removeInk = useCallback(
    (ink: string) => {
      setFilters((currentFilters: Filters) => ({
        inks: (currentFilters.inks || []).filter((x: string) => x !== ink),
      }));
    },
    [setFilters]
  );

  const removeType = useCallback(
    (type: string) => {
      setFilters((currentFilters: Filters) => ({
        types: (currentFilters.types || []).filter((x: string) => x !== type),
      }));
    },
    [setFilters]
  );

  const removeInkable = useCallback(() => {
    setFilters({ inkable: "any" });
  }, [setFilters]);

  const removeCost = useCallback(() => {
    setFilters({ cost: [1, 9] });
  }, [setFilters]);

  const chips = useMemo(() => {
    const chipList: Array<{ label: string; onDelete: () => void }> = [];

    (filters.inks || []).forEach((i: string) => {
      chipList.push({
        label: i,
        onDelete: () => removeInk(i),
      });
    });

    (filters.types || []).forEach((t: string) => {
      chipList.push({
        label: t,
        onDelete: () => removeType(t),
      });
    });

    if (filters.inkable && filters.inkable !== "any") {
      chipList.push({
        label: filters.inkable === "inkable" ? "Inkable" : "Uninkable",
        onDelete: removeInkable,
      });
    }

    if (cost[0] !== 1 || cost[1] !== 9) {
      chipList.push({
        label: `${cost[0]}-${cost[1] === 9 ? "9+" : cost[1]}`,
        onDelete: removeCost,
      });
    }

    return chipList;
  }, [
    filters.inks,
    filters.types,
    filters.inkable,
    cost,
    removeInk,
    removeType,
    removeInkable,
    removeCost,
  ]);

  return (
    <>
      {open && <FilterDrawer open={open} onClose={() => setOpen(false)} />}
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        flexWrap="wrap"
        sx={{ mb: 2 }}
      >
        <IconButton onClick={() => setOpen(true)} size="small">
          <FilterAltIcon />
        </IconButton>
        <TextField
          size="small"
          placeholder="Search cards…"
          value={query}
          onChange={handleChange}
          sx={{ flex: { xs: "1 0 100%", md: "0 0 260px" } }}
        />
        {chips.map((c) => (
          <Chip
            key={c.label}
            label={c.label}
            onDelete={c.onDelete}
            size="small"
          />
        ))}
        {chips.length > 0 && (
          <IconButton size="small" onClick={clearFilters}>
            <ClearIcon fontSize="small" />
          </IconButton>
        )}
      </Stack>
    </>
  );
}
