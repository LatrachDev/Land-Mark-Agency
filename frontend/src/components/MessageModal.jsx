// MessageModal.jsx
export default function MessageModal({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-lg bg-black/80 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-xl relative">
        <button 
          onClick={onClose} 
          className="absolute top-2 cursor-pointer right-4 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">{message.full_name}</h2>
        
        <p className="text-sm text-gray-500 mb-1">
          <strong>Email:</strong> {message.email}
        </p>
        <p className="text-sm text-gray-500 mb-1">
          <strong>Téléphone:</strong> {message.phone_number || '-'}
        </p>
        <p className="text-sm text-gray-500 mb-1">
          <strong>Entreprise:</strong> {message.company_name || '-'}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          <strong>Date:</strong> {new Date(message.created_at).toLocaleString()}
        </p>

        {Array.isArray(message.interests) && message.interests.length > 0 && (
          <div className="my-4">
            <h4 className="font-semibold text-sm text-gray-700 uppercase mb-2">Intérêts :</h4>
            <div className="flex flex-wrap gap-2">
              {message.interests.map((interest, index) => (
                <span
                  key={index}
                  className="inline-block bg-[#445EF2] text-white text-xs font-medium px-2 py-1 rounded"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}


        <hr className="mb-4" />

        <p className="text-gray-800 whitespace-pre-wrap">{message.message}</p>
      </div>
    </div>
  );
}
