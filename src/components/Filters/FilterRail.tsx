import { useStore } from '../../store/useStore';

export default function FilterRail() {
  const filters = useStore(s => s.filters);
  const setFilters = (f: any) => useStore.setState({ filters: { ...filters, ...f } });

  const toggle = (key: 'inks' | 'rarities', value: string) => {
    const current = filters[key];
    const next = current.includes(value)
      ? current.filter((v: string) => v !== value)
      : [...current, value];
    setFilters({ [key]: next });
  };

  const inks = ['Ruby', 'Sapphire', 'Emerald'];
  const rarities = ['Common', 'Uncommon', 'Rare', 'Legendary'];

  const setCost = (index: 0 | 1, value: number) => {
    const cost: [number, number] = [...filters.cost];
    cost[index] = value;
    setFilters({ cost });
  };

  return (
    <div className="space-y-4 text-sm">
      <div className="space-y-2">
        <p className="font-semibold">Inks</p>
        <div className="flex flex-wrap gap-2">
          {inks.map(i => (
            <button
              key={i}
              onClick={() => toggle('inks', i)}
              className={`px-2 py-1 rounded-full text-xs ${filters.inks.includes(i) ? 'bg-aurora text-midnight' : 'bg-white/10'}`}
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="font-semibold">Rarity</p>
        <div className="flex flex-wrap gap-2">
          {rarities.map(r => (
            <button
              key={r}
              onClick={() => toggle('rarities', r)}
              className={`px-2 py-1 rounded-full text-xs ${filters.rarities.includes(r) ? 'bg-aurora text-midnight' : 'bg-white/10'}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="font-semibold">Cost</p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            max={10}
            value={filters.cost[0]}
            onChange={e => setCost(0, Number(e.target.value))}
            className="w-14 rounded bg-white/10 p-1 text-center"
          />
          <span>-</span>
          <input
            type="number"
            min={0}
            max={10}
            value={filters.cost[1]}
            onChange={e => setCost(1, Number(e.target.value))}
            className="w-14 rounded bg-white/10 p-1 text-center"
          />
        </div>
      </div>
    </div>
  );
}
