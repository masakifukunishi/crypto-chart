import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    server: {
      proxy: {
        "/api": {
          target: `http://localhost:${process.env.VITE_SERVER_PORT}`,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    plugins: [react()],
  });
};
