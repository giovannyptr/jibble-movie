import { shallowMount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import MovieList from '@/components/MovieList.vue'
import { useMovieStore } from '@/stores/movies'

describe('MovieList (vertical list)', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('renders cards when items exist', async () => {
    const store = useMovieStore()
    vi.spyOn(store, 'search').mockResolvedValue()

    const wrapper = shallowMount(MovieList, {
      global: { stubs: { MovieCard: true } }
    })

    store.items = [
      { Title: 'Inception', Year: '2010', imdbID: 'tt1375666' } as any,
      { Title: 'Interstellar', Year: '2014', imdbID: 'tt0816692' } as any
    ]
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.movie-list').exists()).toBe(true)
    expect(wrapper.findAll('movie-card-stub').length).toBe(2)
  })

  it('shows empty state if no items', async () => {
    const store = useMovieStore()
    vi.spyOn(store, 'search').mockResolvedValue()

    const wrapper = shallowMount(MovieList, {
      global: { stubs: { MovieCard: true } }
    })

    store.items = []
    store.loading = false
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('No results')
  })

  it('pagination buttons call store.next/prev', async () => {
    const store = useMovieStore()
    vi.spyOn(store, 'search').mockResolvedValue()
    store.page = 2 as any
    store.totalPages = 5 as any

    const nextSpy = vi.spyOn(store, 'next')
    const prevSpy = vi.spyOn(store, 'prev')

    const wrapper = shallowMount(MovieList, {
      global: { stubs: { MovieCard: true } }
    })

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
