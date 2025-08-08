import { useEffect, useMemo, useState } from 'react';
import './App.css';

const DATA_URL = 'https://lorcanajson.org/files/current/en/allCards.json';

function App() {
  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState({});

  useEffect(() => {
    fetch(DATA_URL)
      .then(res => res.json())
      .then(data => setCards(data.cards || []))
      .catch(err => console.error('Failed to load card data', err));
  }, []);

  const addCard = (card) => {
    setDeck(prev => {
      const count = prev[card.id] || 0;
      return { ...prev, [card.id]: Math.min(count + 1, 4) };
    });
  };

  const removeCard = (card) => {
    setDeck(prev => {
      const count = prev[card.id] || 0;
      if (count <= 1) {
        const { [card.id]: _omit, ...rest } = prev;
        return rest;
      }
      return { ...prev, [card.id]: count - 1 };
    });
  };

  const deckList = useMemo(() => {
    return Object.entries(deck)
      .map(([id, count]) => {
        const card = cards.find(c => c.id === Number(id));
        if (!card) return '';
        return `${count} ${card.fullName} (${card.setCode}/${card.number})`;
      })
      .join('\n');
  }, [deck, cards]);

  const exportDeck = () => {
    navigator.clipboard.writeText(deckList);
    alert('Deck copied to clipboard for Inktable import');
  };

  return (
    <div className="container">
      <h1>Lorcana Deck Builder</h1>
      <div className="cards">
        {cards.map(card => (
          <div className="card" key={card.id}>
            {card.images?.thumbnail && (
              <img src={card.images.thumbnail} alt={card.fullName} />
            )}
            <div className="card-info">
              <span className="card-name">{card.fullName}</span>
              <button onClick={() => addCard(card)}>Add</button>
            </div>
          </div>
        ))}
      </div>
      <div className="deck">
        <h2>Your Deck</h2>
        <ul>
          {Object.entries(deck).map(([id, count]) => {
            const card = cards.find(c => c.id === Number(id));
            return (
              <li key={id}>
                {count}x {card?.fullName}
                <button onClick={() => removeCard(card)}>-</button>
              </li>
            );
          })}
        </ul>
        <button onClick={exportDeck}>Export Deck</button>
        <textarea readOnly value={deckList} rows={10} />
      </div>
    </div>
  );
}

export default App;
