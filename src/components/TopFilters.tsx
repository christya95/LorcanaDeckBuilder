import React, { useCallback, useMemo } from "react";
import {
  Box,
  TextField,
  IconButton,
  Chip,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
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
    const result: Array<{
      key: string;
      label: string;
      onDelete: () => void;
      color: "primary" | "secondary" | "success" | "warning" | "error";
    }> = [];

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
        p: isMobile ? 1.5 : 2,
        backgroundColor: "background.paper",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* Search Bar */}
      <Box sx={{ mb: 2 }}>
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
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "rgba(255,255,255,0.05)",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.08)",
              },
              "&.Mui-focused": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            },
          }}
        />
      </Box>

      {/* Compact Filter Sections */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {/* Ink Color Filters */}
        <Box>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              mb: 0.5,
              display: "block",
              fontWeight: "medium",
            }}
          >
            Colors
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: isMobile ? 0.5 : 1,
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
                    size={isMobile ? 28 : 32}
                    className={isSelected ? "selected" : ""}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Cost Filters */}
        <Box>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              mb: 0.5,
              display: "block",
              fontWeight: "medium",
            }}
          >
            Cost
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: isMobile ? 0.25 : 0.5,
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
                <Box
                  key={cost}
                  onClick={() => toggleCost(cost)}
                  sx={{
                    width: isMobile ? 28 : 32,
                    height: isMobile ? 28 : 32,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: isMobile ? "0.7rem" : "0.8rem",
                    fontWeight: "bold",
                    backgroundColor: isSelected
                      ? "primary.main"
                      : isInRange
                      ? "primary.light"
                      : "transparent",
                    border: "1px solid",
                    borderColor: isSelected
                      ? "primary.main"
                      : "rgba(255,255,255,0.2)",
                    color: isSelected || isInRange ? "white" : "text.primary",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: isSelected
                        ? "primary.dark"
                        : "rgba(255,255,255,0.1)",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  {label}
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Active Filter Chips */}
        {chips.length > 0 && (
          <Box sx={{ mt: 1 }}>
            <Box
              sx={{
                display: "flex",
                gap: 0.5,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {chips.map((chip) => (
                <Chip
                  key={chip.key}
                  label={chip.label}
                  onDelete={chip.onDelete}
                  color={chip.color}
                  size="small"
                  sx={{
                    fontSize: "0.7rem",
                    height: 24,
                    "& .MuiChip-deleteIcon": {
                      fontSize: "0.8rem",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
