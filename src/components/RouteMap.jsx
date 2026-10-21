import { useEffect } from 'react'
import { MapContainer, TileLayer, CircleMarker, Polyline, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// Zooms the map so the whole route is visible
function FitBounds({ points }) {
  const map = useMap()

  useEffect(() => {
    map.fitBounds(points, { padding: [30, 30] })
  }, [points, map])

  return null
}

function RouteMap({ route, pickup, drop }) {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center">Your route</h2>

        {/* relative z-0 keeps the map below the navbar and popup */}
        <div className="relative z-0 mt-6 h-72 md:h-96 w-full rounded-xl overflow-hidden shadow-md">
          <MapContainer center={route.from} zoom={13} className="h-full w-full">
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Polyline positions={route.points} pathOptions={{ color: 'black', weight: 5 }} />

            <CircleMarker center={route.from} radius={10} pathOptions={{ color: 'green', fillOpacity: 1 }}>
              <Popup>Pickup: {pickup}</Popup>
            </CircleMarker>

            <CircleMarker center={route.to} radius={10} pathOptions={{ color: 'red', fillOpacity: 1 }}>
              <Popup>Drop: {drop}</Popup>
            </CircleMarker>

            <FitBounds points={route.points} />
          </MapContainer>
        </div>
      </div>
    </section>
  )
}

export default RouteMap