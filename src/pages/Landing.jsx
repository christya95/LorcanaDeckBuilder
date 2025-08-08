import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-b from-purple-200 to-white p-4">
      <h1 className="text-4xl font-bold mb-6">Lorcana Deck Builder</h1>
      <p className="mb-8 max-w-xl">Browse the entire Lorcana card pool and build your own deck.</p>
      <Link to="/cards" className="px-6 py-3 bg-purple-600 text-white rounded shadow hover:bg-purple-700">Get Started</Link>
    </section>
  );
}
