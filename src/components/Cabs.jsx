import { cabs } from '../data/cabs'
import CabCard from './CabCard'

function Cabs({ booking, updateBooking, onBook }) {
  const isFormFilled =
    booking.pickup && booking.drop && Number(booking.distance) > 0

  return (
    <section id="cabs" className="py-12 md:py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Choose your ride
        </h2>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cabs.map((cab) => (
            <CabCard
              key={cab.id}
              cab={cab}
              distance={Number(booking.distance)}
              selected={booking.cabId === cab.id}
              onSelect={() => updateBooking('cabId', cab.id)}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={onBook}
            disabled={!isFormFilled}
            className="w-full sm:w-auto bg-black text-yellow-400 font-bold px-10 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Confirm Booking
          </button>
          {!isFormFilled && (
            <p className="mt-3 text-sm text-gray-600">
              Fill pickup, drop and distance above to continue.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default Cabs