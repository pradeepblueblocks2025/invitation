export default function InvitationCardModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
      <div className="relative bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <img 
          src="/assets/images/card.jpeg" 
          alt="Wedding Invitation Card" 
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}