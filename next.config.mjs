/** @type {import('next').NextConfig} */
const nextConfig = {
  esLint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
};

export default nextConfig;
