import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import macrosPlugin from "vite-plugin-babel-macros";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://DmitryDoroshko.github.io/demetra-iteam/",
  plugins: [react(), macrosPlugin()],
})
