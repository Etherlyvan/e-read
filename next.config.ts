
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "osyctefnefoaztbb.public.blob.vercel-storage.com"
      },

    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '200mb',
    },
  },
}


console.log('Next.js Config:', nextConfig);
module.exports = nextConfig;
