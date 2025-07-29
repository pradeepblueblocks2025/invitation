export default function LocationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const venueLocation = "RAHI Convention Centre, Edamuttam, Pulichode";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueLocation)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
      <div className="relative bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        
        <div className="p-6">
          <h2 className="text-2xl text-gray-600 font-bold mb-4">Wedding Venue</h2>
          
          <div className="mb-6">
            <img 
              src="/assets/images/rahi-convention-centre.jpg" 
              alt="RAHI Convention Centre" 
              className="w-full h-auto rounded-lg mb-4"
            />
            <p className="text-lg mb-2 text-gray-600">RAHI Convention Centre</p>
            <p className="text-gray-600 mb-4">Edamuttam, Pulichode</p>
          </div>
          
          <div className="flex flex-col space-y-3">
            <a 
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-center transition-all"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}