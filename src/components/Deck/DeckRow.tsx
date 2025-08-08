import type { Card } from '../../types';
import { useStore } from '../../store/useStore';

interface Props {
  card: Card;
  deckId: number;
  count: number;
}

export default function DeckRow({ card, deckId, count }: Props) {
  const add = useStore(s => s.addCard);
  const remove = useStore(s => s.removeCard);
  return (
    <div className="flex items-center justify-between py-1">
      <span>{card.name}</span>
      <div className="flex items-center gap-1">
        <button onClick={() => remove(deckId, card.id)} className="px-2">-</button>
        <span>{count}</span>
        <button onClick={() => add(deckId, card.id)} className="px-2">+</button>
      </div>
    </div>
  );
}
