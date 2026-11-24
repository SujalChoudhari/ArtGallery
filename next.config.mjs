/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/for-sale",
        destination: "/available",
        permanent: true,
      },
      {
        source: "/shop",
        destination: "/available",
        permanent: true,
      },
    ];
  },
}

export default nextConfig
