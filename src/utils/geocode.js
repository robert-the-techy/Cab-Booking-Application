// Converts a place name to coordinates using Nominatim
export async function geocode(place) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(place)}`
  const res = await fetch(url)
  const data = await res.json()

  if (data.length === 0) {
    throw new Error(`Could not find "${place}"`)
  }

  return { lat: data[0].lat, lon: data[0].lon }
}