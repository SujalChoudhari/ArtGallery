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
        source: "/available",
        destination: "/sale",
        permanent: true,
      },
      {
        source: "/for-sale",
        destination: "/sale",
        permanent: true,
      },
      {
        source: "/shop",
        destination: "/sale",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
