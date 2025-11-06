import axios from 'axios'
import type { OmdbSearchResponse, OmdbSearchItem, OmdbDetail } from '../types'

const KEY = import.meta.env.VITE_OMDB_API_KEY
const omdb = axios.create({ baseURL: 'https://www.omdbapi.com/', timeout: 10000 })

function hasPoster(p?: string): boolean {
  return !!p && p !== 'N/A'
}

export async function omdbSearch(title: string, page: number) {
  const t = title.trim() || 'batman' // seed query so first page isn't empty
  const { data } = await omdb.get<OmdbSearchResponse>('', {
    params: { s: t, page, apikey: KEY, type: 'movie' }
  })

  if (data.Response !== 'True') {
    return { items: [] as OmdbSearchItem[], totalPages: 0 }
  }

  const totalResults = Number(data.totalResults || '0')
  const totalPages = Math.ceil(totalResults / 10)
  const items = (data.Search || []).filter(x => hasPoster(x.Poster)) // keep only with posters
  return { items, totalPages }
}

export async function omdbDetail(imdbID: string): Promise<OmdbDetail | null> {
  try {
    const { data } = await omdb.get('', { params: { i: imdbID, apikey: KEY, plot: 'short' } })
    return data?.Response === 'True' ? (data as OmdbDetail) : null
  } catch {
    return null
  }
}

export async function omdbSearchWithDetails(title: string, page: number) {
  const { items, totalPages } = await omdbSearch(title, page)
  const details = await Promise.all(items.map(x => omdbDetail(x.imdbID)))
  // filter nulls (failed lookups)
  const full = (details.filter(Boolean) as OmdbDetail[])
    // double-check poster present (detail may say N/A even if search had one)
    .filter(d => hasPoster(d.Poster))
  // OMDb already paginates 10/page, and we filtered by poster — keep at most 10
  return { items: full.slice(0, 10), totalPages }
}
