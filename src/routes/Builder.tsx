import { useEffect } from 'react';
import CardGrid from '../components/CardGrid';
import SearchBar from '../components/SearchBar';
import FilterRail from '../components/Filters/FilterRail';
import DeckPanel from '../components/Deck/DeckPanel';
import { useStore } from '../store/useStore';

export default function Builder() {
  const load = useStore(s => s.load);
  const indexReady = useStore(s => s.indexReady);
  const query = useStore(s => s.query);
  const cards = useStore(s => s.cards);
  const filters = useStore(s => s.filters);
  const selectedDeckId = useStore(s => s.selectedDeckId) ?? 1;

  useEffect(() => { load(); }, [load]);

  const filtered = (() => {
    let result = query ? useStore.getState().search(query) : cards;
    if (filters.inks.length) result = result.filter(c => filters.inks.includes(c.ink));
    if (filters.rarities.length) result = result.filter(c => filters.rarities.includes(c.rarity));
    const [minCost, maxCost] = filters.cost;
    result = result.filter(c => c.ink_cost >= minCost && c.ink_cost <= maxCost);
    return result;
  })();

  return (
    <div className="flex gap-4 p-4">
      <div className="w-48"><FilterRail /></div>
      <div className="flex-1 space-y-4">
        <SearchBar />
        {indexReady ? <CardGrid cards={filtered} deckId={selectedDeckId} /> : <p>Loading...</p>}
      </div>
      <div className="w-64"><DeckPanel deckId={selectedDeckId} /></div>
    </div>
  );
}
