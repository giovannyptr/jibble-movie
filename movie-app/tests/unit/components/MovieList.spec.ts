// tests/unit/components/MovieList.spec.ts
import { shallowMount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import MovieList from '@/components/MovieList.vue'
import { useMovieStore } from '@/stores/movies'

describe('MovieList', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders cards when items exist', async () => {
    const store = useMovieStore()
    // prevent onMounted() from flipping loading or items
    vi.spyOn(store, 'search').mockResolvedValue()

    // mount with MovieCard stub so we can count stubs reliably
    const wrapper = shallowMount(MovieList, {
      global: { stubs: { MovieCard: true } }
    })

    // manually seed store items
    store.items = [
      { Title: 'Dune', Year: '2021', imdbID: 'tt1160419', Poster: 'x.jpg' } as any,
      { Title: 'Dune: Part Two', Year: '2024', imdbID: 'tt15239678', Poster: 'y.jpg' } as any
    ]
    await wrapper.vm.$nextTick()

    // count stubbed <movie-card-stub> nodes
    const cards = wrapper.findAll('movie-card-stub')
    expect(cards.length).toBe(2)
  })

  it('shows empty state if no items', async () => {
    const store = useMovieStore()
    vi.spyOn(store, 'search').mockResolvedValue()

    const wrapper = shallowMount(MovieList, {
      global: { stubs: { MovieCard: true } }
    })

    store.items = [] as any
    store.loading = false
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('No results with posters')
  })

  // tests/unit/components/MovieList.spec.ts (last test)
 it('pagination buttons call store.next/prev', async () => {
  const store = useMovieStore()
  vi.spyOn(store, 'search').mockResolvedValue()

  // enable both buttons
  store.page = 2 as any
  store.totalPages = 5 as any

  const nextSpy = vi.spyOn(store, 'next')
  const prevSpy = vi.spyOn(store, 'prev')

  const wrapper = shallowMount(MovieList, {
    global: { stubs: { MovieCard: true } }
  })

  // Select by position with CSS, not brittle indexes
  const prevBtn = wrapper.find('nav .button:first-of-type')
  const nextBtn = wrapper.find('nav .button:last-of-type')

  expect(prevBtn.exists()).toBe(true)
  expect(nextBtn.exists()).toBe(true)

  await nextBtn.trigger('click')
  await prevBtn.trigger('click')

  expect(nextSpy).toHaveBeenCalled()
  expect(prevSpy).toHaveBeenCalled()
})


})
