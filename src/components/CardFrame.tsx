import { motion } from 'framer-motion';
import type { Card } from '../types';
import { useStore } from '../store/useStore';
import Button from './ui/Button';

interface Props {
  card: Card;
  deckId?: number;
}

export default function CardFrame({ card, deckId }: Props) {
  const add = useStore(s => s.addCard);
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="bg-white/10 glass rounded-2xl p-2 shadow-soft flex flex-col">
      {card.image_url ? (
        <img src={card.image_url} alt={card.name} className="rounded-xl mb-2" loading="lazy" />
      ) : (
        <div className="h-40 bg-midnight rounded-xl" />
      )}
      <div className="flex items-center justify-between">
        <span className="font-semibold text-sm">{card.name}</span>
        {deckId !== undefined && (
          <Button size="sm" onClick={() => add(deckId, card.id)}>Add</Button>
        )}
      </div>
    </motion.div>
  );
}
