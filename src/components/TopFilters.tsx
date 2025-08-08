import React, { useCallback, useMemo } from "react";
import {
  Box,
  TextField,
  IconButton,
  Badge,
  Button,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useSearch } from "@/store/useSearch";
import { getInkIcon, type InkType } from "@/icons/inkIcons";

const INK_TYPES: InkType[] = [
  "Amber",
  "Amethyst",
  "Emerald",
  "Ruby",
  "Sapphire",
  "Steel",
];

export default function TopFilters() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Separate selectors to prevent unnecessary re-renders
  const query = useSearch((s) => s.query);
  const setQuery = useSearch((s) => s.setQuery);
  const filters = useSearch((s) => s.filters);
  const setFilters = useSearch((s) => s.setFilters);
  const activeFilterCount = useSearch((s) => {
    const { inks, types, inkable, cost } = s.filters;
    return (
      (inks?.length || 0) +
      (types?.length || 0) +
      (inkable !== "any" ? 1 : 0) +
      (cost[0] !== 1 || cost[1] !== 9 ? 1 : 0)
    );
  });

  const clearQuery = useCallback(() => {
    setQuery("");
  }, [setQuery]);

  const removeInk = useCallback(
    (ink: InkType) => {
      setFilters((prev) => ({
        ...prev,
        inks: prev.inks?.filter((i) => i !== ink) || [],
      }));
    },
    [setFilters]
  );

  const removeType = useCallback(
    (type: string) => {
      setFilters((prev) => ({
        ...prev,
        types: prev.types?.filter((t) => t !== type) || [],
      }));
    },
    [setFilters]
  );

  const removeInkable = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      inkable: "any",
    }));
  }, [setFilters]);

  const removeCost = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      cost: [1, 9],
    }));
  }, [setFilters]);

  const toggleInk = useCallback(
    (ink: InkType) => {
      setFilters((prev) => ({
        ...prev,
        inks: prev.inks?.includes(ink)
          ? prev.inks.filter((i) => i !== ink)
          : [...(prev.inks || []), ink],
      }));
    },
    [setFilters]
  );

  const toggleCost = useCallback(
    (costValue: number) => {
      setFilters((prev) => {
        const currentCost = prev.cost;
        if (costValue === 9) {
          // Toggle 9+ range
          if (currentCost[0] === 1 && currentCost[1] === 9) {
            return { ...prev, cost: [9, 9] };
          } else {
            return { ...prev, cost: [1, 9] };
          }
        } else {
          // Toggle specific cost
          if (currentCost[0] === costValue && currentCost[1] === costValue) {
            return { ...prev, cost: [1, 9] };
          } else {
            return { ...prev, cost: [costValue, costValue] };
          }
        }
      });
    },
    [setFilters]
  );

  // Memoized chips to prevent unnecessary re-renders
  const chips = useMemo(() => {
    const result = [];

    // Ink filters
    if (filters.inks?.length) {
      filters.inks.forEach((ink) => {
        result.push({
          key: `ink-${ink}`,
          label: ink,
          onDelete: () => removeInk(ink as InkType),
          color: "primary" as const,
        });
      });
    }

    // Type filters
    if (filters.types?.length) {
      filters.types.forEach((type) => {
        result.push({
          key: `type-${type}`,
          label: type,
          onDelete: () => removeType(type),
          color: "secondary" as const,
        });
      });
    }

    // Inkable filter
    if (filters.inkable !== "any") {
      result.push({
        key: "inkable",
        label: filters.inkable === "inkable" ? "Inkable" : "Uninkable",
        onDelete: removeInkable,
        color: "success" as const,
      });
    }

    // Cost filter
    if (filters.cost[0] !== 1 || filters.cost[1] !== 9) {
      result.push({
        key: "cost",
        label: `Cost ${filters.cost[0]}-${
          filters.cost[1] === 9 ? "9+" : filters.cost[1]
        }`,
        onDelete: removeCost,
        color: "warning" as const,
      });
    }

    return result;
  }, [filters, removeInk, removeType, removeInkable, removeCost]);

  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        backgroundColor: "background.paper",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* Search and Filters Row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        {/* Search Bar */}
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <TextField
            fullWidth
            placeholder="Search cards..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
              ),
              endAdornment: query && (
                <IconButton size="small" onClick={clearQuery}>
                  <ClearIcon />
                </IconButton>
              ),
              sx: {
                backgroundColor: "rgba(255,255,255,0.05)",
                borderRadius: 2,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.1)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.2)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
              },
            }}
          />
        </Box>

        {/* Filters Button */}
        <Badge badgeContent={activeFilterCount} color="error">
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            sx={{
              borderColor: "rgba(255,255,255,0.2)",
              color: "text.primary",
              "&:hover": {
                borderColor: "rgba(255,255,255,0.4)",
                backgroundColor: "rgba(255,255,255,0.05)",
              },
            }}
          >
            FILTERS
          </Button>
        </Badge>
      </Box>

      {/* Ink Color Filters */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle2"
          sx={{
            mb: 2,
            color: "text.secondary",
            fontWeight: "medium",
            fontSize: isMobile ? "0.875rem" : "1rem",
          }}
        >
          Colors
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: isMobile ? 1 : 2,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {INK_TYPES.map((ink) => {
            const InkIcon = getInkIcon(ink);
            const isSelected = (filters.inks || []).includes(ink);

            return (
              <Box
                key={ink}
                onClick={() => toggleInk(ink)}
                sx={{
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  transform: isSelected ? "scale(1.1)" : "scale(1)",
                  opacity: isSelected ? 1 : 0.7,
                  "&:hover": {
                    transform: "scale(1.15)",
                    opacity: 1,
                  },
                  filter: isSelected
                    ? "drop-shadow(0 0 8px rgba(255,255,255,0.3))"
                    : "none",
                }}
              >
                <InkIcon
                  size={isMobile ? 36 : 44}
                  className={isSelected ? "selected" : ""}
                />
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Cost Filters */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="subtitle2"
          sx={{
            mb: 2,
            color: "text.secondary",
            fontWeight: "medium",
            fontSize: isMobile ? "0.875rem" : "1rem",
          }}
        >
          Cost
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: isMobile ? 0.5 : 1,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((cost) => {
            const isSelected =
              filters.cost[0] === cost && filters.cost[1] === cost;
            const isInRange =
              filters.cost[0] <= cost && filters.cost[1] >= cost;
            const label = cost >= 9 ? "9+" : String(cost);

            return (
              <Button
                key={cost}
                variant={isSelected ? "contained" : "outlined"}
                size="small"
                onClick={() => toggleCost(cost)}
                sx={{
                  minWidth: isMobile ? 32 : 40,
                  height: isMobile ? 32 : 40,
                  borderRadius: "50%",
                  fontSize: isMobile ? "0.75rem" : "0.875rem",
                  fontWeight: "bold",
                  backgroundColor: isSelected
                    ? "primary.main"
                    : isInRange
                    ? "primary.light"
                    : "transparent",
                  borderColor: isSelected
                    ? "primary.main"
                    : "rgba(255,255,255,0.2)",
                  color: isSelected || isInRange ? "white" : "text.primary",
                  "&:hover": {
                    backgroundColor: isSelected
                      ? "primary.dark"
                      : "rgba(255,255,255,0.1)",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                {label}
              </Button>
            );
          })}
        </Box>
      </Box>

      {/* Active Filter Chips */}
      {chips.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {chips.map((chip) => (
              <Box
                key={chip.key}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  backgroundColor: `${chip.color}.main`,
                  color: "white",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  fontSize: "0.75rem",
                  fontWeight: "medium",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: `${chip.color}.dark`,
                    transform: "scale(1.05)",
                  },
                }}
                onClick={chip.onDelete}
              >
                {chip.label}
                <ClearIcon sx={{ ml: 0.5, fontSize: "0.875rem" }} />
              </Box>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
