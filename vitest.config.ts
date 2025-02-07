import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html', 'clover', 'json'],
      reportsDirectory: './coverage',
      include: ['src/**/*.ts*'], 
      exclude: ['node_modules', 'redis','__tests__', 'src/types/*'],
    },
    globals: true,
    environment: "jsdom",
    setupFiles: ['./vitest/setup.ts'],
    include: ['__tests__/**/*.{test,spec}.{js,ts,jsx,tsx}'], // Include test files in __tests__ folder
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});