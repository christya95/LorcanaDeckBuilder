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
import SearchIcon from "@mui/icons-material/Search";
import { memo, useState, useCallback, useRef, useEffect } from "react";

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
  cardHeight = 336, // Adjusted to match card aspect ratio (1.4:1)
}: Props) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [showExpanded, setShowExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "50px", // Start loading 50px before the card is visible
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageLoading(false);
    setImageError(true);
  }, []);

  const imageUrl = card.image_url || (card as any).image || "/art/card-ph.svg";
  const fallbackUrl = "/art/card-ph.svg";

  const handleMagnifyClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setShowExpanded(true);
  }, []);

  const handleCardClick = useCallback(() => {
    onCardClick?.(card);
  }, [onCardClick, card]);

  return (
    <>
      <MUICard
        ref={containerRef}
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
          position: "relative",
          backgroundColor: "rgba(0,0,0,0.8)", // Dark background for card borders
        }}
        onClick={handleCardClick}
      >
        {/* Full height image - no card name section */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%", // Full height
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px", // Add padding to show card borders
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

          {/* Only load image when visible */}
          {isVisible && (
            <img
              ref={imageRef}
              src={imageError ? fallbackUrl : imageUrl}
              alt={card.name}
              loading="lazy"
              decoding="async"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain", // Changed from "cover" to "contain" to show full card
                display: "block",
                opacity: imageLoading ? 0 : 1,
                transition: "opacity 0.3s ease",
                borderRadius: "8px", // Rounded corners for the card image
              }}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}

          {/* Magnifying glass icon on top right */}
          <IconButton
            onClick={handleMagnifyClick}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              backgroundColor: "rgba(0,0,0,0.7)",
              color: "white",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.2)",
              width: 32,
              height: 32,
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.8)",
                transform: "scale(1.1)",
              },
              transition: "all 0.2s ease",
              zIndex: 2,
            }}
          >
            <SearchIcon sx={{ fontSize: 16 }} />
          </IconButton>
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
                backgroundColor: "rgba(0,0,0,0.8)", // Dark background for card borders
                padding: "12px", // Add padding to show card borders
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
                  objectFit: "contain", // Ensure full card is visible
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
