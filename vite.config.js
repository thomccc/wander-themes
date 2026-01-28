import { defineConfig } from 'vite'
import path from 'node:path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: path.resolve(__dirname, 'index.html'),
        styleTwo: path.resolve(__dirname, 'style-two.html'),
        styleThree: path.resolve(__dirname, 'style-three.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  plugins: [
    {
      name: 'pretty-multi-page-routes',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          const url = req.url?.split('?')[0];
          if (url === '/style-two') req.url = '/style-two.html';
          if (url === '/style-three') req.url = '/style-three.html';
          next();
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, _res, next) => {
          const url = req.url?.split('?')[0];
          if (url === '/style-two') req.url = '/style-two.html';
          if (url === '/style-three') req.url = '/style-three.html';
          next();
        });
      },
    },
  ],
})

