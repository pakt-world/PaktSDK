import { Options, defineConfig } from "tsup";

export default defineConfig((options: Options) => ({
  treeshake: true,
  splitting: true,
  entry: ["src/main.ts"],
  // format: ["esm"],
  dts: true,
  minify: true,
  external: ["@tanstack/react-query", "react"],
  ...options,
}));
