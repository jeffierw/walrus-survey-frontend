/** @type {import('next').NextConfig} */
const rewrites = () => {
  return [
    {
      source: '/api/:path*',
      destination: `http://localhost:31411/api/:path*`
    },
    {
      source: '/walrus/:path*',
      destination: `https://aggregator-devnet.walrus.space/v1/:path*`
    }
  ]
};
const nextConfig = {
    experimental: {
      missingSuspenseWithCSRBailout: false,
    },
    rewrites,
};

export default nextConfig;
