import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Origine autorisée par le CORS de l'API CHECK en local : ne pas basculer en silence sur 5174
  server: {
    port: 5173,
    strictPort: true,
  },
});
