import type { Card } from '../types';
import CardTile from './CardTile';
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

interface Props {
  cards: Card[];
  counts: (id: number) => number;
}

const CARD_W = 180;
const CARD_H = 260;

export default function CardGrid({ cards, counts }: Props) {
  const Cell = ({ columnIndex, rowIndex, style, data }: GridChildComponentProps) => {
    const { cards, columnCount } = data;
    const index = rowIndex * columnCount + columnIndex;
    if (index >= cards.length) return null;
    const card = cards[index];
    return (
      <div style={style} className="p-2">
        <CardTile card={card} count={counts(card.id)} />
      </div>
    );
  };

  return (
    <AutoSizer>
      {({ width, height }) => {
        const columnCount = Math.max(1, Math.floor(width / CARD_W));
        const rowCount = Math.ceil(cards.length / columnCount);
        return (
          <Grid
            columnCount={columnCount}
            columnWidth={CARD_W}
            height={height}
            rowCount={rowCount}
            rowHeight={CARD_H}
            width={width}
            itemData={{ cards, columnCount }}
          >
            {Cell}
          </Grid>
        );
      }}
    </AutoSizer>
  );
}
