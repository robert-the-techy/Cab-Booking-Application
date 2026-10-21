function About() {
  return (
    <section className="min-h-[60vh] py-12 md:py-16 bg-gray-100">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-4xl font-bold">About QuickCab</h2>
        <p className="mt-4 text-gray-700">
          QuickCab is a demo cab booking app built with React and Tailwind CSS.
          It finds your route, calculates the fare, assigns a driver and keeps
          your booking history.
        </p>
        <p className="mt-6 text-gray-700">📞 +91 98765 43210</p>
        <p className="text-gray-700">✉️ support@quickcab.com</p>
      </div>
    </section>
  )
}

export default About