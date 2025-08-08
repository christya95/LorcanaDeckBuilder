import { Box, Chip, IconButton, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { useDecks } from '../store/useDecks';
import { useState } from 'react';
import SaveDeckDialog from './SaveDeckDialog';

  export default function DeckPreview() {
    const { selectedDeckId, deckCards, inc, dec, stats, saveDeck } = useDecks();
    const [open, setOpen] = useState(false);
    const rows = deckCards(selectedDeckId || undefined);
    const s = stats();
    const TYPE_ORDER = ['Character','Action','Item','Song','Location'];

    return (
      <Box sx={{ p: 2, width: 300 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <Typography variant="h6">Deck ({s.total})</Typography>
          <IconButton size="small" onClick={() => setOpen(true)}>
            <SaveOutlinedIcon />
          </IconButton>
        </Box>
        <Stack spacing={1} mb={2}>
          {rows.map(r => (
            <Stack key={r.cardId} direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" sx={{ flex: 1 }} noWrap>
                {r.snapshot.name}
              </Typography>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <IconButton size="small" onClick={() => dec(selectedDeckId!, Number(r.cardId))}>
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Chip label={r.count} size="small" />
                <IconButton size="small" onClick={() => inc(selectedDeckId!, r.snapshot)}>
                  <AddIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
          ))}
          {rows.length === 0 && <Typography variant="body2">No cards</Typography>}
        </Stack>
        <Stack direction="row" spacing={1} mb={2}>
          <Chip label={`Inkable ${s.inkable}`} color="primary" size="small" />
          <Chip label={`Uninkable ${s.uninkable}`} color="secondary" size="small" />
        </Stack>
        <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
          {TYPE_ORDER.map(t => (
            <Chip key={t} label={`${t} ${s.types[t] || 0}`} size="small" />
          ))}
        </Stack>
        <Box sx={{ height: 120 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={s.curve}>
              <XAxis dataKey="cost" ticks={["1","2","3","4","5","6","7","8","9+"]} />
              <YAxis allowDecimals={false} />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <SaveDeckDialog open={open} onClose={() => setOpen(false)} onSave={(name) => saveDeck(name)} />
      </Box>
    );
  }
