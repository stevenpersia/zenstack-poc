import { defineConfig } from "orval";

export default defineConfig({
  app: {
    input: "../docs-tutorial-express/openapi.json",
    output: {
      workspace: "./orval/app",
      target: "generated.ts",
      client: "react-query",
      mock: true,
      prettier: true,
      clean: true,
      mode: "split",
      baseUrl: "http://localhost:3000"
    }
  }
});
