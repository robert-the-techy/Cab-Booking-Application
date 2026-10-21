import { useState } from 'react'
import { geocode } from '../utils/geocode'

function Hero({ booking, updateBooking, setRoute }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const findRoute = async () => {
    if (!booking.pickup || !booking.drop) {
      setError('Enter pickup and drop first')
      return
    }

    setLoading(true)
    setError('')

    try {
      const from = await geocode(booking.pickup)
      const to = await geocode(booking.drop)

      const url = `https://router.project-osrm.org/route/v1/driving/${from.lon},${from.lat};${to.lon},${to.lat}?overview=full&geometries=geojson`
      const res = await fetch(url)
      const data = await res.json()

      if (data.code !== 'Ok') {
        throw new Error('No driving route found')
      }

      const best = data.routes[0]

      // meters -> km with 1 decimal
      updateBooking('distance', (best.distance / 1000).toFixed(1))

      setRoute({
        from: [Number(from.lat), Number(from.lon)],
        to: [Number(to.lat), Number(to.lon)],
        // OSRM gives [lon, lat], Leaflet needs [lat, lon], so we swap
        points: best.geometry.coordinates.map(([lon, lat]) => [lat, lon]),
      })
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    document.getElementById('cabs').scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="bg-yellow-400 py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-black">
            Book your ride in seconds
          </h2>
          <p className="mt-4 text-lg text-gray-800">
            Safe, affordable and on-time cabs anywhere in the city.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-lg space-y-4"
        >
          <input
            type="text"
            placeholder="Pickup (e.g. Chennai Central)"
            value={booking.pickup}
            onChange={(e) => updateBooking('pickup', e.target.value)}
            className="w-full border rounded-lg p-3"
            required
          />
          <input
            type="text"
            placeholder="Drop (e.g. Marina Beach, Chennai)"
            value={booking.drop}
            onChange={(e) => updateBooking('drop', e.target.value)}
            className="w-full border rounded-lg p-3"
            required
          />

          <button
            type="button"
            onClick={findRoute}
            disabled={loading}
            className="w-full border-2 border-black font-bold p-3 rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            {loading ? 'Finding route...' : '📍 Find route & distance'}
          </button>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <input
            type="number"
            min="1"
            step="0.1"
            placeholder="Distance in km (auto-filled)"
            value={booking.distance}
            onChange={(e) => updateBooking('distance', e.target.value)}
            className="w-full border rounded-lg p-3"
            required
          />
          <select
            value={booking.cabId}
            onChange={(e) => updateBooking('cabId', e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="mini">Mini</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
          </select>
          <button
            type="submit"
            className="w-full bg-black text-yellow-400 font-bold p-3 rounded-lg hover:bg-gray-800"
          >
            See Fares
          </button>
        </form>
      </div>
    </section>
  )
}

export default Hero