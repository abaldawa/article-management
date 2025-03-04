import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api-service": {
        target: "http://localhost:3001", // Replace with your backend server URL
        changeOrigin: true,
      },
    },
  },
});
