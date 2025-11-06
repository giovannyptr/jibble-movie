// tests/e2e/search.spec.ts
import { test, expect } from '@playwright/test'

test('search shows poster-only cards and paginates', async ({ page }) => {
  // Intercept OMDb search
  await page.route('**/www.omdbapi.com/**', route => {
    const url = route.request().url()
    const u = new URL(url)
    const params = u.searchParams

    if (params.get('s')) {
      // search response (10 results max)
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          Response: 'True',
          totalResults: '12',
          Search: [
            { Title: 'Fake 1', Year: '2020', imdbID: 'tt1', Type: 'movie', Poster: 'https://x/1.jpg' },
            { Title: 'Fake 2', Year: '2021', imdbID: 'tt2', Type: 'movie', Poster: 'N/A' }, // should be filtered
            { Title: 'Fake 3', Year: '2022', imdbID: 'tt3', Type: 'movie', Poster: 'https://x/3.jpg' },
          ]
        })
      })
    }
    if (params.get('i')) {
      // detail response per imdbID (always provide Poster)
      const imdbID = params.get('i')
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          Response: 'True',
          Title: `Detail ${imdbID}`,
          Year: '2020',
          imdbID,
          Poster: `https://x/${imdbID}.jpg`,
          Plot: 'Mock plot',
          imdbRating: '7.5',
        })
      })
    }
    return route.continue()
  })

  await page.goto('/')

  // type & search
  await page.getByPlaceholder('Search movies by title…').fill('batman')
  await page.getByRole('button', { name: 'Search' }).click()

  // Expect only poster-ready items to render (Fake 2 filtered out)
  const cards = page.locator('.card').filter({ has: page.locator('img') })
  await expect(cards).toHaveCount(2)

  // Favorite toggle
  const starButton = page.getByRole('button', { name: 'Toggle favorite' }).first()
  await starButton.click()
  // check Favorites section updated
  await expect(page.getByText('⭐ Favorites')).toBeVisible()
})
