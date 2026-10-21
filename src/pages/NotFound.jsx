import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-5xl font-bold">404</h2>
      <p className="mt-3 text-gray-600">This page does not exist.</p>
      <Link
        to="/"
        className="mt-6 bg-yellow-400 font-bold px-6 py-3 rounded-lg hover:bg-yellow-500"
      >
        Go to Home
      </Link>
    </section>
  )
}

export default NotFound