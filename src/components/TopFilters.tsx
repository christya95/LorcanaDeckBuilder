import { Stack, TextField, ToggleButtonGroup, ToggleButton, Slider, Chip, IconButton, Tooltip } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearIcon from "@mui/icons-material/Clear";
import { useSearch } from "@/store/useSearch";

const INKS = ["Amber","Amethyst","Emerald","Ruby","Sapphire","Steel"] as const;

export default function TopFilters() {
  const { query, setQuery, filters, setFilters, clearFilters } = useSearch();
  const cost = filters.cost ?? [1, 9]; // inclusive; 9 means 9+

  const chips = [
    ...(filters.inks || []).map(i => ({
      label: i,
      onDelete: () => setFilters({ inks: (filters.inks || []).filter(x => x !== i) }),
    })),
    ...((cost[0] !== 1 || cost[1] !== 9)
      ? [{ label: `${cost[0]}-${cost[1] === 9 ? '9+' : cost[1]}`, onDelete: () => setFilters({ cost: [1, 9] }) }]
      : []),
  ];

  return (
    <Stack spacing={1} sx={{ mb: 2 }}>
      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
        <Tooltip title="Filters"><FilterAltIcon /></Tooltip>
        <TextField
          size="small"
          placeholder="Search cards…"
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          sx={{ minWidth: 260 }}
        />
        <ToggleButtonGroup
          value={filters.inks || []}
          onChange={(_, v)=>setFilters({ inks: v })}
          size="small"
        >
          {INKS.map(i=>(<ToggleButton key={i} value={i}>{i.toUpperCase()}</ToggleButton>))}
        </ToggleButtonGroup>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 220 }}>
          <Chip size="small" label="Cost" />
          <Slider
            size="small"
            min={1}
            max={9}
            value={cost}
            onChange={(_, v)=>setFilters({ cost: v as number[] })}
            valueLabelDisplay="auto"
            valueLabelFormat={(v)=> v===9 ? "9+" : v}
            marks={[{value:1,label:"1"},{value:3,label:"3"},{value:5,label:"5"},{value:7,label:"7"},{value:9,label:"9+"}]}
          />
        </Stack>
        <IconButton size="small" onClick={clearFilters}><ClearIcon/></IconButton>
      </Stack>
      {chips.length > 0 && (
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {chips.map(c => (
            <Chip key={c.label} label={c.label} onDelete={c.onDelete} size="small" />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
