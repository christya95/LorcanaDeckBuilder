import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Cards from './routes/Cards';
import CardDetails from './routes/CardDetails';
import Builder from './routes/Builder';
import Decks from './routes/Decks';
import About from './routes/About';
import Header from './components/Header';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cards" element={<Cards />} />
            <Route path="/card/:id" element={<CardDetails />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="/decks" element={<Decks />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
