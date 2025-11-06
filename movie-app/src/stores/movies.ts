import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Movie } from '../types'
import { searchMovies } from '../lib/api' // ⬅️ use the mock API helper

const FAV_KEY = 'movieapp:favorites:v1'

export const useMovieStore = defineStore('movies', () => {
  // state
  const title = ref<string>('')            // current search query
  const page = ref<number>(1)              // current page
  const items = ref<Movie[]>([])           // movies on current page
  const totalPages = ref<number>(0)        // total pages from mock API
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  // favorites (persisted)
  const favorites = ref<Record<string, Movie>>({})
  try {
    const raw = localStorage.getItem(FAV_KEY)
    if (raw) favorites.value = JSON.parse(raw)
  } catch { /* ignore bad JSON */ }

  // getters
  const favoriteList = computed<Movie[]>(() => Object.values(favorites.value))
  const isFavorite = (id: string) => !!favorites.value[id]

  // actions
  function toggleFavorite(m: Movie) {
    favorites.value = favorites.value[m.imdbID]
      ? (() => { const n = { ...favorites.value }; delete n[m.imdbID]; return n })()
      : ({ ...favorites.value, [m.imdbID]: m })
    localStorage.setItem(FAV_KEY, JSON.stringify(favorites.value))
  }

  async function search(newTitle?: string, newPage?: number) {
    if (newTitle !== undefined) title.value = newTitle
    if (newPage !== undefined) page.value = newPage

    loading.value = true
    error.value = null
    try {
      // ⬇️ call HackerRank mock API (your api.ts maps Poster to a placeholder)
      const res = await searchMovies(title.value, page.value)
      items.value = res.items
      totalPages.value = res.totalPages
    } catch (e: any) {
      error.value = e?.message || 'Search failed'
      items.value = []
      totalPages.value = 0
    } finally {
      loading.value = false
    }
  }

  function next() { if (page.value < totalPages.value) void search(undefined, page.value + 1) }
  function prev() { if (page.value > 1) void search(undefined, page.value - 1) }

  function reset() {
    title.value = ''
    page.value = 1
    items.value = []
    totalPages.value = 0
    error.value = null
  }

  return { title, page, items, totalPages, loading, error, favoriteList, isFavorite, toggleFavorite, search, next, prev, reset }
})
