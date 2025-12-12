import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            "module-resolver",
            {
              root: ["./src"],
              alias: {
                "~": "./src",
              },
            },
          ],
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "~": path.resolve(__dirname, "src"),
      // eslint-disable-next-line no-undef
      react: path.resolve(__dirname, "node_modules/react"),
      // eslint-disable-next-line no-undef
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
      // eslint-disable-next-line no-undef
      "react/jsx-runtime": path.resolve(
        __dirname,
        "node_modules/react/jsx-runtime"
      ),
    },
  },
  css: {
    modules: {
      generateScopedName: "[name]_[local]_[hash:base64:5]",
    },
  },
});
