# 🎬 Movie Listing App

A Vue 3 + TypeScript single-page app that lists movies from the OMDb API.
Users can search, paginate through results, and star movies to keep them in a persistent Favorites section.

## 🚀 Features

#### 🔍 Search movies by title

#### 📜 Paginated results (10 items / page)

#### ⭐ Star / unstar favorites (persisted in localStorage)

#### 🧠 Built with Vue 3 Composition API & Pinia

#### 💅 Styled with Sass

#### 💾 Data persistence with browser storage

#### 🧪 Fully testable — unit tests (Vitest) + E2E tests (Playwright)

#### ☁️ Ready for deployment on Netlify, Firebase Hosting, or Vercel

## 🛠️ Tech Stack
Layer	Tech
Framework	Vue 3 (Composition API)
Language	TypeScript
State Mgmt	Pinia
Styling	Sass
Testing	Vitest + Vue Testing Library 
Build Tool	Vite

## 📦 Installation
## Clone repo
---
git clone https://github.com/<your-username>/movie-app.git
cd movie-app
---

# Install deps
---
npm install
---

🧑‍💻 Development
---
# Run dev server
npm run dev
---

---
Visit → http://localhost:5173
---

## 🧪 Testing
Unit Tests (Vitest)
---
npm run test
---

### 🧰 Project Structure
---
src/
 ├── components/
 │   ├── MovieList.vue
 │   ├── MovieCard.vue
 │   ├── MovieSearch.vue
 │   └── Favorites.vue
 ├── stores/
 │   └── movies.ts
 ├── lib/
 │   └── api.ts
 ├── types.ts
 ├── App.vue
 └── main.ts
tests/
 ├── unit/
 │   ├── components/
 │   │   ├── MovieList.spec.ts
 │   │   └── MovieSearch.spec.ts
 │   └── stores/movies.spec.ts
 └── e2e/search.spec.ts
 ---

### 🧩 API

OMDb API (public key required):
https://www.omdbapi.com/?apikey=YOUR_KEY&s=guardians&page=1

Example response:

{
  "Title": "Guardians of the Galaxy Vol. 2",
  "Year": "2017",
  "Poster": "https://m.media-amazon.com/images/....jpg",
  "imdbID": "tt3896198"
}
