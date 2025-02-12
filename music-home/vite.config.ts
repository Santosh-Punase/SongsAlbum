import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig(() => {
  const API_URL = `${process.env.LIBRARY_API_URL ?? 'http://localhost:5173'}`;

  return {
    plugins: [
      react(),
      federation({
        name: "musicHome",
        remotes: {
          musicLibrary: `${API_URL}/assets/remoteEntry.js`,
        },
        shared: ["react", "react-dom"],
      }),
    ],
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
  }
});
