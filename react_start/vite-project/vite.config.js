import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

/* https://vitejs.dev/config/ */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@components", replacement: "/src/components" },
      { find: "@script", replacement: "/src/script" },
      { find: "@assets", replacement: "/src/assets" },
      { find: "@", replacement: "/src" },
    ],
  },
});