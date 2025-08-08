import { useDeck } from '../context/DeckContext';
import { useEffect, useState, useMemo } from 'react';

const DATA_URL = 'https://lorcanajson.org/files/current/en/allCards.json';

export default function DeckBuilder() {
  const { deck, removeCard } = useDeck();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch(DATA_URL)
      .then((res) => res.json())
      .then((data) => setCards(data.cards || []));
  }, []);

  const deckEntries = Object.entries(deck);

  const deckList = useMemo(() =>
    deckEntries
      .map(([id, count]) => {
        const card = cards.find((c) => c.id === Number(id));
        if (!card) return '';
        return `${count} ${card.fullName} (${card.setCode}/${card.number})`;
      })
      .join('\n'),
    [deckEntries, cards]
  );

  const exportDeck = () => {
    navigator.clipboard.writeText(deckList);
    alert('Deck copied to clipboard');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Your Deck</h2>
      {deckEntries.length === 0 ? (
        <p>No cards yet. Add some from the Cards page.</p>
      ) : (
        <>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {deckEntries.map(([id, count]) => {
              const card = cards.find((c) => c.id === Number(id));
              if (!card) return null;
              return (
                <li key={id} className="bg-white rounded shadow p-2 flex flex-col items-center">
                  {card.images?.thumbnail && (
                    <img src={card.images.thumbnail} alt={card.fullName} className="rounded mb-2" />
                  )}
                  <p className="text-sm text-center mb-1">{count}x {card.fullName}</p>
                  <button
                    onClick={() => removeCard(card)}
                    className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="mt-6">
            <button
              onClick={exportDeck}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Copy Deck List
            </button>
            <textarea
              readOnly
              value={deckList}
              className="mt-2 w-full border rounded p-2"
              rows={8}
            />
          </div>
        </>
      )}
    </div>
  );
}
