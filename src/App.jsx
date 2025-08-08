import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Landing from './pages/Landing';
import CardBrowser from './pages/CardBrowser';
import DeckBuilder from './pages/DeckBuilder';
import { DeckProvider } from './context/DeckContext';

function App() {
  return (
    <DeckProvider>
      <Router>
        <nav className="bg-gray-800 text-white p-4 flex gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/cards" className="hover:underline">Cards</Link>
          <Link to="/deck" className="hover:underline">Deck</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/cards" element={<CardBrowser />} />
          <Route path="/deck" element={<DeckBuilder />} />
        </Routes>
      </Router>
    </DeckProvider>
  );
}

export default App;
