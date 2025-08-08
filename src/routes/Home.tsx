import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

export default function Home() {
  return (
    <div className="relative overflow-hidden py-20 flex flex-col items-center text-center space-y-6">
      <motion.span
        className="absolute top-1/4 left-2/3 w-2 h-2 rounded-full bg-white opacity-10"
        animate={{ y: [-8, 8] }}
        transition={{ duration: 14, repeat: Infinity, repeatType: 'reverse' }}
      />
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold"
      >
        Lorcana Builder
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-md"
      >
        Search every card and craft your dream deck.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex gap-4"
      >
        <Button to="/cards">Browse Cards</Button>
        <Button to="/builder" variant="secondary">Build a Deck</Button>
      </motion.div>
    </div>
  );
}
