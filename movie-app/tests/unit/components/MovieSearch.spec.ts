// tests/MovieSearch.spec.ts
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import MovieSearch from '@/components/MovieSearch.vue'
import { useMovieStore } from '@/stores/movies'

describe('MovieSearch', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('calls store.search with query and page=1 on submit', async () => {
    const wrapper = mount(MovieSearch)
    const store = useMovieStore()
    const spy = vi.spyOn(store, 'search').mockResolvedValue()

    await wrapper.find('input').setValue('dune')
    await wrapper.find('form').trigger('submit.prevent')

    expect(spy).toHaveBeenCalledWith('dune', 1)
  })
})
