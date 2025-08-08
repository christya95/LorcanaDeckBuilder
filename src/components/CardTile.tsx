import { Card as CardType } from '../types';
import { Card as MUICard, CardContent, Typography, Chip, Box } from "@mui/material";

interface Props {
  card: CardType;
  onCardClick?: (card: CardType) => void;
}

export default function CardTile({ card, onCardClick }: Props) {
  return (
    <MUICard
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0,0,0,.35)",
        transition: "transform .15s ease",
        "&:hover": { transform: "translateY(-2px)" },
      }}
      onClick={()=>onCardClick?.(card)}
    >
      <Box sx={{ position:"relative", aspectRatio: "3 / 4", width:"100%" }}>
        <img
          src={card.image_url || (card as any).image || "/art/card-ph.svg"}
          alt={card.name}
          loading="lazy"
          width={360}
          height={480}
          style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
        />
        <Box sx={{ position:"absolute", bottom: 6, left: 6, display:"flex", gap: .5 }}>
          {!!card.ink_cost && <Chip size="small" label={card.ink_cost >= 9 ? "9+" : String(card.ink_cost)} />}
        </Box>
      </Box>
      <CardContent sx={{ py: 1.25 }}>
        <Typography variant="subtitle2" noWrap>{card.name}</Typography>
      </CardContent>
    </MUICard>
  );
}
