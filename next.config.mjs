/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/triagem",
        destination: "/solicitar",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
