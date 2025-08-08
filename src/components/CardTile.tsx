import { Card as CardType } from '../types';
import { Card, CardMedia, CardActions, IconButton, Chip, Stack } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDecks } from '../store/useDecks';

interface Props {
  card: CardType;
  count: number;
}

export default function CardTile({ card, count }: Props) {
  const { addToSelectedOrPrompt, dec, selectedDeckId } = useDecks();
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedDeckId) dec(selectedDeckId, card.id);
  };
  const src = card.image_url || (card as any).image || '/art/card-ph.svg';
  return (
    <Card sx={{ position: 'relative', cursor: 'pointer' }} onClick={() => addToSelectedOrPrompt(card)}>
      <CardMedia component="img" image={src} alt={card.name} loading="lazy" width={300} height={420} />
      {count > 0 && (
        <CardActions sx={{ position: 'absolute', bottom: 0, right: 0 }}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Chip label={count} color="primary" size="small" />
            <IconButton color="primary" size="small" onClick={handleRemove}>
              <RemoveIcon fontSize="small" />
            </IconButton>
          </Stack>
        </CardActions>
      )}
    </Card>
  );
}
