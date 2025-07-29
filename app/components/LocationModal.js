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
            <p className="text-gray-600 mb-4">Saturday, 16th August 2025</p>
            <p className="text-gray-600 mb-4">11 AM - 2 PM </p>
           {/* Google Maps Embed */}
          <div className="w-full aspect-video rounded-lg overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.5553288972637!2d76.1314046!3d10.3773947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7f5001cf98955%3A0x23b2a246fcb96978!2sRahi%20convention%20center!5e0!3m2!1sen!2sin!4v1753818465918!5m2!1sen!2sin" 
              width="100%" 
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
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