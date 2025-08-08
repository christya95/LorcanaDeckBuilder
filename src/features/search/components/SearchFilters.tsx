/**
 * Search Filters Component
 * Provides search input and filter controls for card browsing
 */

import React, { useCallback, useMemo } from "react";
import { Box, TextField, IconButton, Chip, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import { InkIconSelector } from "../../../shared/components/InkIcon";
import { useResponsive } from "../../../shared/hooks/useResponsive";
import { INK_TYPE_LIST, InkType } from "../../../shared/constants/inkTypes";
import {
  CARD_COST_OPTIONS,
  CARD_CONSTANTS,
} from "../../../shared/constants/cardConstants";
import {
  UI_CONSTANTS,
  THEME_COLORS,
} from "../../../shared/constants/uiConstants";
import { CardFilters } from "../../../shared/types/card";

interface SearchFiltersProps {
  /** Current search query */
  searchQuery: string;

  /** Current filter state */
  filters: CardFilters;

  /** Search query change handler */
  onSearchChange: (query: string) => void;

  /** Filter change handler */
  onFiltersChange: (filters: CardFilters) => void;
}

/**
 * Cost filter button component
 */
const CostFilterButton: React.FC<{
  cost: number;
  isSelected: boolean;
  isInRange: boolean;
  onClick: () => void;
  isMobile: boolean;
}> = ({ cost, isSelected, isInRange, onClick, isMobile }) => {
  const label =
    cost >= CARD_CONSTANTS.MAX_COST
      ? `${CARD_CONSTANTS.MAX_COST}+`
      : String(cost);
  const size = isMobile ? 28 : 32;

  return (
    <Box
      onClick={onClick}
      sx={{
        width: size,
        height: size,
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
        borderColor: isSelected ? "primary.main" : THEME_COLORS.BORDER.MEDIUM,
        color: isSelected || isInRange ? "white" : "text.primary",
        transition: UI_CONSTANTS.TRANSITIONS.FAST,
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
};

/**
 * Active filter chip component
 */
const ActiveFilterChip: React.FC<{
  label: string;
  onDelete: () => void;
  color: "primary" | "secondary" | "success" | "warning" | "error";
}> = ({ label, onDelete, color }) => (
  <Chip
    label={label}
    onDelete={onDelete}
    color={color}
    size="small"
    sx={{
      fontSize: "0.7rem",
      height: 24,
      "& .MuiChip-deleteIcon": {
        fontSize: "0.8rem",
      },
    }}
  />
);

/**
 * Main search filters component
 */
export const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchQuery,
  filters,
  onSearchChange,
  onFiltersChange,
}) => {
  const { isMobile } = useResponsive();

  // Filter toggle handlers
  const handleInkToggle = useCallback(
    (inkType: InkType) => {
      onFiltersChange({
        ...filters,
        inks: filters.inks?.includes(inkType)
          ? filters.inks.filter((ink) => ink !== inkType)
          : [...(filters.inks || []), inkType],
      });
    },
    [filters, onFiltersChange]
  );

  const handleCostToggle = useCallback(
    (costValue: number) => {
      onFiltersChange({
        ...filters,
        cost:
          costValue === CARD_CONSTANTS.MAX_COST
            ? filters.cost[0] === 1 &&
              filters.cost[1] === CARD_CONSTANTS.MAX_COST
              ? [CARD_CONSTANTS.MAX_COST, CARD_CONSTANTS.MAX_COST]
              : CARD_CONSTANTS.DEFAULT_COST_RANGE
            : filters.cost[0] === costValue && filters.cost[1] === costValue
            ? CARD_CONSTANTS.DEFAULT_COST_RANGE
            : [costValue, costValue],
      });
    },
    [filters, onFiltersChange]
  );

  const handleFilterRemove = useCallback(
    (filterType: keyof CardFilters, value?: any) => {
      switch (filterType) {
        case "inks":
          onFiltersChange({
            ...filters,
            inks: filters.inks?.filter((ink) => ink !== value) || [],
          });
          break;
        case "types":
          onFiltersChange({
            ...filters,
            types: filters.types?.filter((type) => type !== value) || [],
          });
          break;
        case "inkable":
          onFiltersChange({
            ...filters,
            inkable: "any",
          });
          break;
        case "cost":
          onFiltersChange({
            ...filters,
            cost: CARD_CONSTANTS.DEFAULT_COST_RANGE,
          });
          break;
      }
    },
    [filters, onFiltersChange]
  );

  // Active filter chips
  const activeFilterChips = useMemo(() => {
    const chips: Array<{
      key: string;
      label: string;
      onDelete: () => void;
      color: "primary" | "secondary" | "success" | "warning" | "error";
    }> = [];

    // Ink filters
    if (filters.inks?.length) {
      filters.inks.forEach((ink) => {
        chips.push({
          key: `ink-${ink}`,
          label: ink,
          onDelete: () => handleFilterRemove("inks", ink),
          color: "primary",
        });
      });
    }

    // Type filters
    if (filters.types?.length) {
      filters.types.forEach((type) => {
        chips.push({
          key: `type-${type}`,
          label: type,
          onDelete: () => handleFilterRemove("types", type),
          color: "secondary",
        });
      });
    }

    // Inkable filter
    if (filters.inkable !== "any") {
      chips.push({
        key: "inkable",
        label: filters.inkable === "inkable" ? "Inkable" : "Uninkable",
        onDelete: () => handleFilterRemove("inkable"),
        color: "success",
      });
    }

    // Cost filter
    if (filters.cost[0] !== 1 || filters.cost[1] !== CARD_CONSTANTS.MAX_COST) {
      chips.push({
        key: "cost",
        label: `Cost ${filters.cost[0]}-${
          filters.cost[1] === CARD_CONSTANTS.MAX_COST
            ? `${CARD_CONSTANTS.MAX_COST}+`
            : filters.cost[1]
        }`,
        onDelete: () => handleFilterRemove("cost"),
        color: "warning",
      });
    }

    return chips;
  }, [filters, handleFilterRemove]);

  return (
    <Box
      sx={{
        p: isMobile ? UI_CONSTANTS.SPACING.MD : UI_CONSTANTS.SPACING.LG,
        backgroundColor: "background.paper",
        borderBottom: `1px solid ${THEME_COLORS.BORDER.LIGHT}`,
      }}
    >
      {/* Search Bar */}
      <Box sx={{ mb: UI_CONSTANTS.SPACING.LG }}>
        <TextField
          fullWidth
          placeholder="Search cards..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
            ),
            endAdornment: searchQuery && (
              <IconButton size="small" onClick={() => onSearchChange("")}>
                <ClearIcon />
              </IconButton>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: UI_CONSTANTS.BORDER_RADIUS.MD,
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

      {/* Filter Sections */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: UI_CONSTANTS.SPACING.MD,
        }}
      >
        {/* Ink Color Filters */}
        <Box>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              mb: UI_CONSTANTS.SPACING.XS,
              display: "block",
              fontWeight: "medium",
            }}
          >
            Colors
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: isMobile ? UI_CONSTANTS.SPACING.XS : UI_CONSTANTS.SPACING.SM,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {INK_TYPE_LIST.map((inkType) => (
              <InkIconSelector
                key={inkType}
                inkType={inkType}
                isSelected={(filters.inks || []).includes(inkType)}
                onToggle={handleInkToggle}
                size={isMobile ? 28 : 32}
              />
            ))}
          </Box>
        </Box>

        {/* Cost Filters */}
        <Box>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              mb: UI_CONSTANTS.SPACING.XS,
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
            {CARD_COST_OPTIONS.map((cost) => (
              <CostFilterButton
                key={cost}
                cost={cost}
                isSelected={
                  filters.cost[0] === cost && filters.cost[1] === cost
                }
                isInRange={filters.cost[0] <= cost && filters.cost[1] >= cost}
                onClick={() => handleCostToggle(cost)}
                isMobile={isMobile}
              />
            ))}
          </Box>
        </Box>

        {/* Active Filter Chips */}
        {activeFilterChips.length > 0 && (
          <Box sx={{ mt: UI_CONSTANTS.SPACING.SM }}>
            <Box
              sx={{
                display: "flex",
                gap: UI_CONSTANTS.SPACING.XS,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {activeFilterChips.map((chip) => (
                <ActiveFilterChip
                  key={chip.key}
                  label={chip.label}
                  onDelete={chip.onDelete}
                  color={chip.color}
                />
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
