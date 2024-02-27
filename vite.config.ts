import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//import svgrPlugin from 'vite-plugin-svgr'
import svgr from '@svgr/rollup'

export default defineConfig({
  plugins: [react(), svgr()],
})
