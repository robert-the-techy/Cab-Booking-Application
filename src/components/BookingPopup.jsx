import { useState, useEffect } from 'react'
import { cabs } from '../data/cabs'
import { drivers } from '../data/drivers'
import { calculateFare } from '../utils/calculateFare'
import RideTracker from './RideTracker'

function BookingPopup({ booking, onClose, onBooked }) {
  const [status, setStatus] = useState('summary') // summary | searching | assigned
  const [bookingId, setBookingId] = useState(null)
  const [driver, setDriver] = useState(null)
  const [otp, setOtp] = useState(null)

  const cab = cabs.find((c) => c.id === booking.cabId)
  const fare = calculateFare(Number(booking.distance), cab.ratePerKm)

  const handleConfirm = () => {
    setBookingId('CB' + Math.floor(1000 + Math.random() * 9000))
    setStatus('searching')
  }

    // When a driver gets assigned, save the booking to history
  useEffect(() => {
    if (status !== 'assigned') return

    onBooked({
      id: bookingId,
      pickup: booking.pickup,
      drop: booking.drop,
      distance: booking.distance,
      cabType: cab.type,
      fare,
      driverName: driver.name,
      date: new Date().toLocaleString('en-IN'),
    })
  }, [status])

  // Runs whenever status changes. Only does work while searching.
  useEffect(() => {
    if (status !== 'searching') return

    const timer = setTimeout(() => {
      const matching = drivers.filter((d) => d.cabId === booking.cabId)
      setDriver(matching[Math.floor(Math.random() * matching.length)])
      setOtp(Math.floor(1000 + Math.random() * 9000))
      setStatus('assigned')
    }, 3000)

    // Cleanup: cancels the timer if the popup closes early
    return () => clearTimeout(timer)
  }, [status, booking.cabId])

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        {/* STAGE 1: summary */}
        {status === 'summary' && (
          <>
            <h3 className="text-2xl font-bold text-center">Confirm your ride</h3>

            <div className="mt-6 space-y-3 text-gray-800">
              <div className="flex justify-between">
                <span className="text-gray-500">Pickup</span>
                <span className="font-semibold text-right">{booking.pickup}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Drop</span>
                <span className="font-semibold text-right">{booking.drop}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Cab</span>
                <span className="font-semibold">{cab.icon} {cab.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Distance</span>
                <span className="font-semibold">{booking.distance} km</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg">
                <span className="font-bold">Total fare</span>
                <span className="font-bold">₹{fare}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={onClose}
                className="w-1/2 border border-gray-400 py-2 rounded-lg font-semibold hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="w-1/2 bg-black text-yellow-400 py-2 rounded-lg font-bold hover:bg-gray-800"
              >
                Confirm
              </button>
            </div>
          </>
        )}

        {/* STAGE 2: searching */}
        {status === 'searching' && (
          <div className="text-center py-6">
            <div className="mx-auto w-14 h-14 border-4 border-gray-200 border-t-yellow-400 rounded-full animate-spin"></div>
            <h3 className="mt-6 text-xl font-bold">Finding your driver...</h3>
            <p className="mt-2 text-gray-600">
              Booking ID: <span className="font-semibold">{bookingId}</span>
            </p>
            <button
              onClick={onClose}
              className="mt-6 text-red-600 font-semibold hover:underline"
            >
              Cancel ride
            </button>
          </div>
        )}

        {/* STAGE 3: driver assigned */}
        {status === 'assigned' && (
          <div>
            <div className="text-center">
              <div className="text-5xl">✅</div>
              <h3 className="mt-2 text-2xl font-bold">Driver assigned!</h3>
              <p className="text-gray-600">Booking ID: {bookingId}</p>
            </div>

            {/* Driver card */}
            <div className="mt-6 flex items-center gap-4 bg-gray-100 rounded-lg p-4">
              <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center text-2xl font-bold">
                {driver.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg">{driver.name}</p>
                <p className="text-sm text-gray-600">
                  ⭐ {driver.rating} · {driver.trips} trips
                </p>
              </div>
              <a
                href={`tel:${driver.phone}`}
                className="bg-black text-yellow-400 px-3 py-2 rounded-lg font-bold"
              >
                📞
              </a>
            </div>

            {/* Live ride tracker */}
            <RideTracker />

            {/* Car details */}
            <div className="mt-4 space-y-2 text-gray-800">
              <div className="flex justify-between">
                <span className="text-gray-500">Car</span>
                <span className="font-semibold">{driver.carModel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Number</span>
                <span className="font-semibold">{driver.carNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Fare</span>
                <span className="font-semibold">₹{fare}</span>
              </div>
            </div>

            {/* Ride OTP */}
            <div className="mt-4 bg-yellow-100 border border-yellow-400 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-700">Share this OTP with the driver to start the ride</p>
              <p className="text-3xl font-bold tracking-widest">{otp}</p>
            </div>

            <button
              onClick={onClose}
              className="mt-6 w-full bg-yellow-400 py-2 rounded-lg font-bold hover:bg-yellow-500"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingPopup