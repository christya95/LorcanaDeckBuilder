import { useStore } from '../../store/useStore';

export default function FilterRail() {
  const filters = useStore(s => s.filters);
  const setFilters = (f: any) => useStore.setState({ filters: { ...filters, ...f } });
  const toggleInk = (ink: string) => {
    const inks = filters.inks.includes(ink)
      ? filters.inks.filter(i => i !== ink)
      : [...filters.inks, ink];
    setFilters({ inks });
  };
  const inks = ['Ruby', 'Sapphire', 'Emerald'];
  return (
    <div className="space-y-2">
      <p className="font-semibold">Inks</p>
      <div className="flex flex-wrap gap-2">
        {inks.map(i => (
          <button
            key={i}
            onClick={() => toggleInk(i)}
            className={`px-2 py-1 rounded-full text-xs ${filters.inks.includes(i) ? 'bg-aurora text-midnight' : 'bg-white/10'}`}
          >
            {i}
          </button>
        ))}
      </div>
    </div>
  );
}
