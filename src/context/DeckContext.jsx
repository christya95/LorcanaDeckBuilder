import { createContext, useContext, useState } from 'react';

const DeckContext = createContext();

export const DeckProvider = ({ children }) => {
  const [deck, setDeck] = useState({});

  const addCard = (card) => {
    setDeck((prev) => {
      const count = prev[card.id] || 0;
      return { ...prev, [card.id]: Math.min(count + 1, 4) };
    });
  };

  const removeCard = (card) => {
    setDeck((prev) => {
      const count = prev[card.id] || 0;
      if (count <= 1) {
        const { [card.id]: _omit, ...rest } = prev;
        return rest;
      }
      return { ...prev, [card.id]: count - 1 };
    });
  };

  return (
    <DeckContext.Provider value={{ deck, addCard, removeCard }}>
      {children}
    </DeckContext.Provider>
  );
};

export const useDeck = () => useContext(DeckContext);
