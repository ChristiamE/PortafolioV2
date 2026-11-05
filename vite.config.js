import { defineConfig } from 'vite';
import purgecss from '@fullhuman/postcss-purgecss';

export default defineConfig({
  base: '/portafolio/',
  css: {
    postcss: {
      plugins: [
        purgecss({
          content: ['./index.html', './src/**/*.ts'],
          safelist: ['menu-abierto', 'activo', 'visible', 'copiado', 'avatar-respaldo']
        })
      ]
    }
  },
  build: { minify: true, cssMinify: true }
});