/** @type {import('next').NextConfig} */
const rewrites = () => {
  return [
    {
      source: '/api/:path*',
      destination: `http://localhost:31411/api/:path*`
    }
  ]
};
const nextConfig = {
    experimental: {
      missingSuspenseWithCSRBailout: false,
    },
    rewrites,
    output: 'export',
};

export default nextConfig;
