// src/lib/api.ts

export async function searchMovies(title: string, page = 1) {
  const res = await fetch(
    `https://jsonmock.hackerrank.com/api/movies/search/?Title=${encodeURIComponent(title)}&page=${page}`
  )

  if (!res.ok) throw new Error('Failed to fetch data')

  const data = await res.json()

  // Map response into your internal format
  const items = (data.data || []).map((m: any) => ({
    Title: m.Title,
    Year: m.Year,
    imdbID: m.imdbID,
    Poster: `https://placehold.co/300x450?text=${encodeURIComponent(m.Title)}` // placeholder image
  }))

  return {
    items,
    totalPages: data.total_pages || 0
  }
}
