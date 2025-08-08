import { useEffect } from 'react';
import { Stack, Typography, List, ListItem, ListItemText, Chip, Box } from '@mui/material';
import { useStore } from '../store/useStore';
import { useDecks } from '../store/useDecks';
import DeckPreview from '../components/DeckPreview';

export default function Builder() {
  const load = useStore(s => s.load);
  const { deckCards } = useDecks();

  useEffect(() => {
    load();
  }, [load]);

  const entries = deckCards();

  return (
    <Box display="flex" gap={2}>
      <Stack spacing={2} flex={1}>
        <Typography variant="h4">Deck Builder</Typography>
        <List>
          {entries.map(({ snapshot: card, count }) => (
            <ListItem key={card.id} secondaryAction={<Chip label={count} />}>
              <ListItemText primary={card.name} />
            </ListItem>
          ))}
          {entries.length === 0 && <Typography>No cards in deck.</Typography>}
        </List>
      </Stack>
      <DeckPreview />
    </Box>
  );
}
