import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// eslint-disable-next-line no-undef
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
