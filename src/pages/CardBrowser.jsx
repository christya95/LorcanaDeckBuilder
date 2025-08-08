import { useEffect, useMemo, useState } from 'react';
import { useDeck } from '../context/DeckContext';

const DATA_URL = 'https://lorcanajson.org/files/current/en/allCards.json';
const COLORS = ['Amber', 'Amethyst', 'Emerald', 'Ruby', 'Sapphire', 'Steel'];

export default function CardBrowser() {
  const [cards, setCards] = useState([]);
  const [query, setQuery] = useState('');
  const [color, setColor] = useState('');
  const { addCard } = useDeck();

  useEffect(() => {
    fetch(DATA_URL)
      .then((res) => res.json())
      .then((data) => setCards(data.cards || []))
      .catch((err) => console.error('Failed to load card data', err));
  }, []);

  const filtered = useMemo(() =>
    cards.filter((card) =>
      (!query || card.fullName.toLowerCase().includes(query.toLowerCase())) &&
      (!color || card.color === color)
    ),
  [cards, query, color]);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Browse Cards</h2>
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded w-full sm:w-64"
        />
        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="border p-2 rounded w-full sm:w-48"
        >
          <option value="">All Colors</option>
          {COLORS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((card) => (
          <div key={card.id} className="bg-white rounded shadow p-2 flex flex-col items-center">
            {card.images?.thumbnail && (
              <img src={card.images.thumbnail} alt={card.fullName} className="rounded mb-2" />
            )}
            <p className="text-sm font-semibold text-center mb-2">{card.fullName}</p>
            <button
              onClick={() => addCard(card)}
              className="px-2 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
            >
              Add to Deck
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
