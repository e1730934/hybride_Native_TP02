import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/hybride_Native_TP02/",
  plugins: [react()],
  publicDir: "public",
});
