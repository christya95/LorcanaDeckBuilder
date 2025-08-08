import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from './components/Header';
import Home from './routes/Home';
import Cards from './routes/Cards';
import CardDetails from './routes/CardDetails';
import Builder from './routes/Builder';
import Decks from './routes/Decks';
import About from './routes/About';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <div
          aria-hidden
          className="fixed inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: "url(/art/aurora-bg.svg)" }}
        />
        <Header />
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cards" element={<Cards />} />
            <Route path="/card/:id" element={<CardDetails />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="/decks" element={<Decks />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}
