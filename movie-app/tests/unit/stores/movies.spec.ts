import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useMovieStore } from '@/stores/movies'

// mock only the functions we call
vi.mock('@/lib/api', () => ({
  omdbSearchWithDetails: vi.fn()
}))
import { omdbSearchWithDetails } from '@/lib/api'

const sampleItems = [
  { Title: 'Guardians of the Galaxy Vol. 2', Year: '2017', imdbID: 'tt3896198', Poster: 'https://x/1.jpg', imdbRating: '7.6', Plot: 'Space fam.' },
  { Title: 'Interstellar', Year: '2014', imdbID: 'tt0816692', Poster: 'https://x/2.jpg', imdbRating: '8.6', Plot: 'Time is a circle.' }
]

describe('movies store (OMDb-only)', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    // clean localStorage between tests
    localStorage.clear()
  })

  it('search populates items and pagination', async () => {
    ;(omdbSearchWithDetails as any).mockResolvedValueOnce({ items: sampleItems, totalPages: 5 })
    const s = useMovieStore()
    await s.search('guardians', 1)

    expect(s.items.length).toBe(2)
    expect(s.totalPages).toBe(5)
    expect(s.page).toBe(1)
    expect(s.error).toBeNull()
  })

  it('handles API failure gracefully', async () => {
    ;(omdbSearchWithDetails as any).mockRejectedValueOnce(new Error('Network down'))
    const s = useMovieStore()
    await s.search('batman', 1)

    expect(s.items.length).toBe(0)
    expect(s.totalPages).toBe(0)
    expect(s.error).toBe('Network down')
  })

  it('toggleFavorite persists to localStorage', async () => {
    const s = useMovieStore()
    const m = sampleItems[0]
    s.toggleFavorite(m)
    expect(s.isFavorite(m.imdbID)).toBe(true)

    // persisted
    const raw = localStorage.getItem('movieapp:favorites:v1')
    expect(raw).toContain(m.imdbID)

    // un-fav
    s.toggleFavorite(m)
    expect(s.isFavorite(m.imdbID)).toBe(false)
  })
})