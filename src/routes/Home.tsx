import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="text-center space-y-4 py-10">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl font-bold">
        Lorcana Builder
      </motion.h1>
      <p>Search cards and build decks.</p>
      <div className="space-x-4">
        <Link to="/cards" className="bg-gold text-midnight px-4 py-2 rounded-2xl">Browse Cards</Link>
        <Link to="/builder" className="bg-aurora text-midnight px-4 py-2 rounded-2xl">Build a Deck</Link>
      </div>
    </div>
  );
}
