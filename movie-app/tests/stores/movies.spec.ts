import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useMovieStore } from '../../src/stores/movies'

// mock the real API helper (no alias)
vi.mock('../../src/lib/api', () => ({
  searchMovies: vi.fn()
}))
import { searchMovies } from '../../src/lib/api'

const sampleItems = [
  { Title: 'Inception', Year: '2010', imdbID: 'tt1375666' },
  { Title: 'Interstellar', Year: '2014', imdbID: 'tt0816692' }
]

describe('movies store (HackerRank API)', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    ;(searchMovies as unknown as vi.Mock).mockReset()
  })

  it('search populates items and pagination', async () => {
    ;(searchMovies as unknown as vi.Mock).mockResolvedValueOnce({
      items: sampleItems,
      totalPages: 5
    })

    const s = useMovieStore()
    await s.search('nolan', 1)

    expect(s.items.length).toBe(2)
    expect(s.totalPages).toBe(5)
    expect(s.page).toBe(1)
    expect(s.error).toBeNull()
  })

  it('handles API failure gracefully', async () => {
    ;(searchMovies as unknown as vi.Mock).mockRejectedValueOnce(new Error('Network down'))

    const s = useMovieStore()
    await s.search('batman', 1)

    expect(s.items.length).toBe(0)
    expect(s.totalPages).toBe(0)
    expect(s.error).toBe('Network down')
  })

  it('toggleFavorite persists to localStorage', async () => {
    const s = useMovieStore()
    const m = sampleItems[0] as any

    s.toggleFavorite(m)
    expect(s.isFavorite(m.imdbID)).toBe(true)

    const raw = localStorage.getItem('movieapp:favorites:v1')
    expect(raw).toContain(m.imdbID)

    s.toggleFavorite(m)
    expect(s.isFavorite(m.imdbID)).toBe(false)
  })
})
