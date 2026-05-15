import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const config = {
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts"
  }
};

export default defineConfig(config);
