import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from './components/Header';
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
            <Route path="/" element={<Builder />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="/card/:id" element={<CardDetails />} />
            <Route path="/decks" element={<Decks />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}
