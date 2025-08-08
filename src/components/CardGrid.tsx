import CardFrame from './CardFrame';
import type { Card } from '../types';

interface Props {
  cards: Card[];
  deckId?: number;
}

export default function CardGrid({ cards, deckId }: Props) {
  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
      {cards.map(c => (
        <CardFrame card={c} key={c.id} deckId={deckId} />
      ))}
    </div>
  );
}
