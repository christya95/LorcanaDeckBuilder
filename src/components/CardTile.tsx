import { Card as CardType } from '../types';
import { Card, CardMedia, CardActions, IconButton, Chip, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface Props {
  card: CardType;
  count: number;
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
}

export default function CardTile({ card, count, onAdd, onRemove }: Props) {
  return (
    <Card sx={{ position: 'relative' }}>
      {card.image_url ? (
        <CardMedia component="img" image={card.image_url} alt={card.name} loading="lazy" />
      ) : (
        <CardMedia component="div" sx={{ height: 140, bgcolor: 'grey.800' }} />
      )}
      <CardActions sx={{ position: 'absolute', bottom: 0, right: 0 }}>
        <Stack direction="row" spacing={0.5} alignItems="center">
          {count > 0 && <Chip label={count} color="primary" size="small" />}
          <IconButton color="primary" size="small" onClick={() => onAdd(card.id)}>
            <AddIcon fontSize="small" />
          </IconButton>
          {count > 0 && (
            <IconButton color="primary" size="small" onClick={() => onRemove(card.id)}>
              <RemoveIcon fontSize="small" />
            </IconButton>
          )}
        </Stack>
      </CardActions>
    </Card>
  );
}
