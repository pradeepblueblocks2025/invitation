export default function Header({ onToggleMute, isMuted, onShowCard, onShowLocation }) {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center">
      <div className="text-white text-xl font-bold">Sajjad & Shabnam</div>
      
      <nav className="flex items-center space-x-4">
        <button 
          onClick={onShowCard}
          className="text-white hover:text-opacity-80 transition-all"
        >
          Invitation
        </button>
        <button 
          onClick={onShowLocation}
          className="text-white hover:text-opacity-80 transition-all"
        >
          Location
        </button>
        <button 
          onClick={onToggleMute}
          className="text-white hover:text-opacity-80 transition-all"
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      </nav>
    </header>
  );
}