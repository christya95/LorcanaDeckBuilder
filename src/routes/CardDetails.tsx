import { useParams } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function CardDetails() {
  const { id } = useParams();
  const card = useStore(s => s.cards.find(c => c.id === Number(id)));
  if (!card) return <p className="p-4">Card not found.</p>;
  return (
    <div className="p-4 space-y-4">
      {card.image_url && <img src={card.image_url} alt={card.name} className="max-w-sm rounded-2xl" />}
      <h2 className="text-2xl font-bold">{card.name}</h2>
      {card.subtitle && <p className="italic">{card.subtitle}</p>}
      <p>{card.text}</p>
      <p className="text-sm">Set: {card.set} • Illustrator: {card.illustrator}</p>
    </div>
  );
}
