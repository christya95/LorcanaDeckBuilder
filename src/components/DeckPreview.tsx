import { Box, Chip, IconButton, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { useDecks } from '../store/useDecks';
import { useState } from 'react';
import SaveDeckDialog from './SaveDeckDialog';

const SECTIONS = ['Character', 'Action', 'Item', 'Song', 'Location'];

export default function DeckPreview() {
  const { selectedDeckId, deckCards, inc, dec, stats, saveDeck } = useDecks();
  const [open, setOpen] = useState(false);
  const rows = deckCards(selectedDeckId || undefined);
  const s = stats();

  const groups: Record<string, typeof rows> = {} as any;
  SECTIONS.forEach(t => (groups[t] = []));
  for (const r of rows) {
    const type = r.snapshot.type?.split('/')[0] || 'Other';
    if (groups[type]) groups[type].push(r);
  }

  return (
    <Box sx={{ p: 2, width: 300 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <Typography variant="h6">Deck ({s.total})</Typography>
        <IconButton size="small" onClick={() => setOpen(true)}>
          <SaveOutlinedIcon />
        </IconButton>
      </Box>
      <Stack spacing={2} mb={2}>
        {SECTIONS.map(type => {
          const list = groups[type];
          if (!list || list.length === 0) return null;
          const total = list.reduce((sum, r) => sum + r.count, 0);
          return (
            <Box key={type}>
              <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                <Typography variant="subtitle2">{type}</Typography>
                <Chip size="small" label={total} />
              </Stack>
              <Stack spacing={0.5}>
                {list.map(r => (
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
              </Stack>
            </Box>
          );
        })}
      </Stack>
      <Stack direction="row" spacing={1} mb={2}>
        <Chip label={`Inkable ${s.inkable}`} color="primary" size="small" />
        <Chip label={`Uninkable ${s.uninkable}`} color="secondary" size="small" />
      </Stack>
      <Box sx={{ height: 120 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={s.curve}>
            <XAxis dataKey="cost" tickLine={false} />
            <YAxis allowDecimals={false} tickLine={false} />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
      <SaveDeckDialog open={open} onClose={() => setOpen(false)} onSave={(name) => saveDeck(name)} />
    </Box>
  );
}
