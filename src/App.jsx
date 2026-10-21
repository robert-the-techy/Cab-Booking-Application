import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BookingPopup from './components/BookingPopup'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Bookings from './pages/Bookings'
import About from './pages/About'
import NotFound from './pages/NotFound'

function App() {
  const [booking, setBooking] = useState({
    pickup: '',
    drop: '',
    distance: '',
    cabId: 'mini',
  })
  const [route, setRoute] = useState(null)
  const [showPopup, setShowPopup] = useState(false)

  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('bookingHistory')) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('bookingHistory', JSON.stringify(history))
  }, [history])

  const updateBooking = (field, value) => {
    setBooking({ ...booking, [field]: value })
  }

  const addBooking = (entry) => setHistory((prev) => [entry, ...prev])
  const clearHistory = () => setHistory([])

  return (
    <div>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              booking={booking}
              updateBooking={updateBooking}
              route={route}
              setRoute={setRoute}
              onBook={() => setShowPopup(true)}
            />
          }
        />
        <Route
          path="/bookings"
          element={<Bookings history={history} onClear={clearHistory} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />

      {showPopup && (
        <BookingPopup
          booking={booking}
          onClose={() => setShowPopup(false)}
          onBooked={addBooking}
        />
      )}
    </div>
  )
}

export default App