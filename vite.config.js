import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  base: `/wallet/`,
  plugins: [react()],
  css: {
    modules: true,
    postcss: {
      plugins: [
        autoprefixer(), // Apply autoprefixer
      ],
    },
  },
});
