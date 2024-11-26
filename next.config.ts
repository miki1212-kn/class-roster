import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
// next.config.js
module.exports = {
  experimental: {
    appDir: true, // appディレクトリのサポートを有効にする
    serverComponents: false, // サーバーサイドコンポーネントを無効化する（通常は無効にしない方が良い）
  },
};

export default nextConfig;
