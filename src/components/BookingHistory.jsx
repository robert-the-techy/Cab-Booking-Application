function BookingHistory({ history, onClear }) {
  return (
    <section id="history" className="py-12 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-4xl font-bold">My bookings</h2>
          {history.length > 0 && (
            <button
              onClick={onClear}
              className="text-red-600 font-semibold hover:underline"
            >
              Clear all
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <p className="mt-8 text-gray-500 text-center">
            No bookings yet. Your confirmed rides will appear here.
          </p>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {history.map((b) => (
              <div key={b.id} className="border rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="font-bold">{b.id}</span>
                  <span className="text-xs text-gray-500">{b.date}</span>
                </div>

                <p className="mt-3 text-gray-800">
                  <span className="text-green-600">●</span> {b.pickup}
                </p>
                <p className="text-gray-800">
                  <span className="text-red-600">●</span> {b.drop}
                </p>

                <div className="mt-3 flex flex-wrap justify-between text-sm text-gray-600 gap-2">
                  <span>{b.cabType} · {b.distance} km</span>
                  <span>Driver: {b.driverName}</span>
                </div>
                <p className="mt-2 text-lg font-bold">₹{b.fare}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default BookingHistory