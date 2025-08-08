import { useStore } from '../store/useStore';
import Button from '../components/ui/Button';

export default function Decks() {
  const decks = useStore(s => s.decks);
  return (
    <div className="p-4 space-y-2">
      <h2 className="text-2xl font-bold">My Decks</h2>
      <ul className="space-y-1">
        {decks.map(d => (
          <li key={d.id} className="glass rounded p-2 flex justify-between">
              <span>{d.name}</span>
              <Button to={`/builder?id=${d.id}`} size="sm" variant="secondary">Open</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
