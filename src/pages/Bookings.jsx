import BookingHistory from '../components/BookingHistory'

function Bookings({ history, onClear }) {
  return (
    <div className="min-h-[60vh]">
      <BookingHistory history={history} onClear={onClear} />
    </div>
  )
}

export default Bookings