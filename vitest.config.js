import { defineConfig } from "vite";

export default defineConfig({
  test: {
    // Vitest configuration options
    dir: "tests/unit",
    globals: true,
    environment: "jsdom",
  },
});
