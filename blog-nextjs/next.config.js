/** @type {import('next').NextConfig} */
const nextConfig = {

  experimental: {
    serverActions: true, logging: {
      level: "verbose"
    },
  }

}

module.exports = nextConfig
