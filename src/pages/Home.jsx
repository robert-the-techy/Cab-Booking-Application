import Hero from '../components/Hero'
import RouteMap from '../components/RouteMap'
import Cabs from '../components/Cabs'

function Home({ booking, updateBooking, route, setRoute, onBook }) {
  return (
    <>
      <Hero booking={booking} updateBooking={updateBooking} setRoute={setRoute} />

      {route && (
        <RouteMap route={route} pickup={booking.pickup} drop={booking.drop} />
      )}

      <Cabs booking={booking} updateBooking={updateBooking} onBook={onBook} />
    </>
  )
}

export default Home