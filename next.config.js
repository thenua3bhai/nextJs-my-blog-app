/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        port: "",
        pathname: "photo/2015/06/02/12/59/book-794978_960_720.jpg",
      },
    ],
  },
};

module.exports = nextConfig;
