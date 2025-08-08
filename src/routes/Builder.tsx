import { useEffect } from 'react';
import { Stack, Typography, List, ListItem, ListItemText, Chip, Box } from '@mui/material';
import { useStore } from '../store/useStore';
import { useDecks } from '../store/useDecks';
import DeckPreview from '../components/DeckPreview';

export default function Builder() {
  const load = useStore(s => s.load);
  const cards = useStore(s => s.cards);
  const { deckCards } = useDecks();

  useEffect(() => {
    load();
  }, [load]);

  const entries = Object.entries(deckCards).map(([id, count]) => {
    const card = cards.find(c => c.id === Number(id));
    return { card, count };
  });

  return (
    <Box display="flex" gap={2}">
      <Stack spacing={2} flex={1}>
        <Typography variant="h4">Deck Builder</Typography>
        <List>
          {entries.map(({ card, count }) => (
            <ListItem key={card?.id} secondaryAction={<Chip label={count} />}>
              <ListItemText primary={card?.name || 'Unknown card'} />
            </ListItem>
          ))}
          {entries.length === 0 && <Typography>No cards in deck.</Typography>}
        </List>
      </Stack>
      <DeckPreview />
    </Box>
  );
}
