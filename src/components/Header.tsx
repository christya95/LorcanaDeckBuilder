import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-midnight/50 backdrop-blur-xs text-stardust">
      <Link to="/" className="font-bold text-lg">Lorcana</Link>
      <nav className="space-x-4">
        <Link to="/cards" className="hover:text-aurora">Cards</Link>
        <Link to="/builder" className="hover:text-aurora">Builder</Link>
        <Link to="/decks" className="hover:text-aurora">My Decks</Link>
        <Link to="/about" className="hover:text-aurora">About</Link>
      </nav>
    </header>
  );
}
