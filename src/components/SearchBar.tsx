import { useStore } from '../store/useStore';

export default function SearchBar() {
  const query = useStore(s => s.query);
  const setQuery = (q: string) => useStore.setState({ query: q });
  return (
    <input
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="Search cards..."
      className="w-full p-2 rounded-2xl bg-white/10 glass"
    />
  );
}
