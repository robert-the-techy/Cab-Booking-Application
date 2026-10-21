import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer id="contact" className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-yellow-400">QuickCab</h3>
          <p className="mt-3 text-gray-400">
            Safe, affordable and on-time cabs anywhere in the city.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-bold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
            <li><Link to="/bookings" className="hover:text-yellow-400">My Bookings</Link></li>
            <li><Link to="/about" className="hover:text-yellow-400">About</Link></li>
          </ul>
        </div>

        {/* Contact details */}
        <div>
          <h4 className="font-bold mb-3">Contact Us</h4>
          <ul className="space-y-2 text-gray-400">
            <li>📞 +91 98765 43210</li>
            <li>✉️ support@quickcab.com</li>
            <li>📍 Chennai, Tamil Nadu</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center text-gray-500 text-sm py-4">
        © {new Date().getFullYear()} QuickCab. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer