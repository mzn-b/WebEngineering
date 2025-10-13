import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}/`
    : "/",
  server: { port: 5173 },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
