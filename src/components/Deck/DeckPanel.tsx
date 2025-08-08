import { useStore } from '../../store/useStore';
import DeckRow from './DeckRow';
import Button from '../ui/Button';

export default function DeckPanel({ deckId }: { deckId: number }) {
  const cards = useStore(s => s.cards);
  const list = useStore(s => s.deckLists[deckId] || {});
  const exportDeck = useStore(s => s.exportDeck);
  const saveDeck = useStore(s => s.saveDeck);

  const handleSave = async () => {
    const name = prompt('Deck name', 'My Deck');
    if (name) await saveDeck(name);
  };

  return (
    <div className="glass rounded-2xl p-4 space-y-2">
      <h2 className="text-xl font-bold">Current Deck</h2>
      <div>
        {Object.entries(list).map(([id, count]) => {
          const card = cards.find(c => c.id === Number(id));
          if (!card) return null;
          return <DeckRow key={id} card={card} deckId={deckId} count={count as number} />;
        })}
      </div>
      <div className="flex gap-2">
        <Button onClick={() => { navigator.clipboard.writeText(exportDeck(deckId)); }} variant="secondary" size="sm">Export</Button>
        <Button onClick={handleSave} size="sm">Save</Button>
      </div>
    </div>
  );
}
