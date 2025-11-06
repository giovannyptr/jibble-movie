import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Checker from 'vite-plugin-checker'

export default defineConfig({
  plugins: [vue(), Checker({ typescript: true })],
})
