import Button from './ui/Button';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-midnight/50 backdrop-blur-xs text-stardust">
      <Link to="/" className="font-bold text-lg">Lorcana</Link>
      <nav className="flex gap-2">
        <Button to="/cards" variant="ghost">Cards</Button>
        <Button to="/builder" variant="ghost">Builder</Button>
        <Button to="/decks" variant="ghost">My Decks</Button>
        <Button to="/about" variant="ghost">About</Button>
      </nav>
    </header>
  );
}
