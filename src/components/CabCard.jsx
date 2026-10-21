import { calculateFare } from '../utils/calculateFare'

function CabCard({ cab, distance, selected, onSelect }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-md p-6 text-center transition border-2 ${
        selected ? 'border-yellow-400 shadow-xl' : 'border-transparent'
      }`}
    >
      <div className="text-6xl">{cab.icon}</div>
      <h3 className="mt-4 text-xl font-bold">{cab.type}</h3>
      <p className="text-gray-600 mt-1">{cab.description}</p>

      <div className="mt-4 flex justify-center gap-6 text-sm text-gray-700">
        <span>👥 {cab.seats} seats</span>
        <span>₹{cab.ratePerKm}/km</span>
      </div>

      {/* Show fare only when the user has entered a distance */}
      {distance > 0 && (
        <p className="mt-4 text-lg font-bold">
          Estimated fare: ₹{calculateFare(distance, cab.ratePerKm)}
        </p>
      )}

      <button
        onClick={onSelect}
        className={`mt-5 w-full font-bold py-2 rounded-lg ${
          selected
            ? 'bg-black text-yellow-400'
            : 'bg-yellow-400 hover:bg-yellow-500'
        }`}
      >
        {selected ? 'Selected ✓' : 'Select'}
      </button>
    </div>
  )
}

export default CabCard