import { defineConfig } from "umi";
import path from "path";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
  ],
  npmClient: 'pnpm',
  alias: {
    'vtk.js': path.resolve(__dirname), // 指向 src 同级目录的 Sources
  },
  chainWebpack(memo) {
    memo.module
        .rule('worker')
        .test(/\.worker\.js$/)
        .use('worker-loader')
        .loader('worker-loader');
  },
});
