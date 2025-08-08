import { Card as CardType } from "../types";
import {
  Card as MUICard,
  CardContent,
  Typography,
  Chip,
  Box,
  Skeleton,
  Paper,
  Dialog,
  DialogContent,
  IconButton,
  Fade,
  Backdrop,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { memo, useState, useCallback } from "react";

interface Props {
  card: CardType;
  onCardClick?: (card: CardType) => void;
  cardWidth?: number;
  cardHeight?: number;
}

const CardTile = memo(function CardTile({
  card,
  onCardClick,
  cardWidth = 240,
  cardHeight = 320,
}: Props) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [showExpanded, setShowExpanded] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageLoading(false);
    setImageError(true);
  }, []);

  const imageUrl = card.image_url || (card as any).image || "/art/card-ph.svg";
  const fallbackUrl = "/art/card-ph.svg";

  return (
    <>
      <MUICard
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0,0,0,.35)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-4px) scale(1.02)",
            boxShadow: "0 16px 48px rgba(0,0,0,.4)",
          },
          cursor: onCardClick ? "pointer" : "default",
          width: cardWidth,
          height: cardHeight,
        }}
        onClick={() => onCardClick?.(card)}
      >
        {/* Full height image - no card name section */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%", // Full height
          }}
        >
          {imageLoading && (
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              animation="wave"
              sx={{
                backgroundColor: "rgba(255,255,255,0.1)",
                "&::after": {
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                },
              }}
            />
          )}
          <img
            src={imageError ? fallbackUrl : imageUrl}
            alt={card.name}
            loading="lazy"
            decoding="async"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              opacity: imageLoading ? 0 : 1,
              transition: "opacity 0.3s ease",
            }}
            onLoad={handleImageLoad}
            onError={handleImageError}
            onMouseEnter={() => setShowExpanded(true)}
            onMouseLeave={() => setShowExpanded(false)}
          />
        </Box>
      </MUICard>

      {/* Clean card expansion overlay - image only, no text */}
      <Backdrop
        open={showExpanded}
        sx={{
          zIndex: 9999,
          backgroundColor: "rgba(0,0,0,0.9)",
          backdropFilter: "blur(4px)",
        }}
        onMouseEnter={() => setShowExpanded(true)}
        onMouseLeave={() => setShowExpanded(false)}
      >
        <Fade in={showExpanded} timeout={200}>
          <Box
            sx={{
              position: "relative",
              maxWidth: "90vw",
              maxHeight: "90vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Close button */}
            <IconButton
              sx={{
                position: "absolute",
                top: -50,
                right: 0,
                zIndex: 1,
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "white",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.2)",
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s ease",
              }}
              onClick={() => setShowExpanded(false)}
            >
              <CloseIcon />
            </IconButton>

            {/* Card image only - no text description */}
            <Box
              sx={{
                position: "relative",
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                transform: "scale(1.1)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.15)",
                },
              }}
            >
              <img
                src={imageError ? fallbackUrl : imageUrl}
                alt={card.name}
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "600px",
                  maxHeight: "800px",
                  display: "block",
                  borderRadius: "8px",
                }}
              />
            </Box>
          </Box>
        </Fade>
      </Backdrop>
    </>
  );
});

export default CardTile;
