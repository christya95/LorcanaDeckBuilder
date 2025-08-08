import type { Card } from '../types';
import CardTile from './CardTile';
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

interface Props {
  cards: Card[];
  onCardClick?: (card: Card) => void;
}

const TILE_W = 240;
const TILE_H = (240 * 4) / 3 + 56; // 3:4 art + title
const GAP = 20;

export default function CardGrid({ cards, onCardClick }: Props) {
  const Cell = ({ columnIndex, rowIndex, style, data }: GridChildComponentProps) => {
    const { cards, columnCount, onCardClick } = data as any;
    const index = rowIndex * columnCount + columnIndex;
    if (index >= cards.length) return null;
    const card = cards[index];
    const cellStyle: React.CSSProperties = {
      ...style,
      left: (style.left as number) + GAP,
      top: (style.top as number) + GAP,
      width: TILE_W,
      height: TILE_H,
    };
    return (
      <div style={cellStyle}>
        <CardTile card={card} onCardClick={onCardClick} />
      </div>
    );
  };

  return (
    <AutoSizer>
      {({ width, height }) => {
        const columnCount = Math.max(1, Math.floor((width + GAP) / (TILE_W + GAP)));
        const rowCount = Math.ceil(cards.length / columnCount);
        return (
          <Grid
            columnCount={columnCount}
            columnWidth={TILE_W + GAP}
            height={height}
            rowCount={rowCount}
            rowHeight={TILE_H + GAP}
            width={width}
            itemData={{ cards, columnCount, onCardClick }}
          >
            {Cell}
          </Grid>
        );
      }}
    </AutoSizer>
  );
}
