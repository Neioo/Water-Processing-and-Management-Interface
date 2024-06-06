/** @type {import('next').NextConfig} */
const nextConfig = {
    // Add the redirects configuration here
    async redirects() {
      return [
        {
          source: '/', // Matches the root URL (localhost:3000)
          destination: '/LoginPage', // Redirects to /LoginPage
          permanent: true, // Sets a permanent redirect (308 status code)
        },
      ];
    },
  };
  
  export default nextConfig;
  