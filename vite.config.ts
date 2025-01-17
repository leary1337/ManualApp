import basicSsl from '@vitejs/plugin-basic-ssl';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), basicSsl()],
  build: {
    outDir: './docs'
  },
  server: {
    https: false
  },
  base: './'
});
