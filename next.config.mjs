/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile `three` (and its examples/jsm postprocessing modules) as
  // first-party so Next bundles them cleanly for the client-only WebGL canvas.
  transpilePackages: ["three"],
};

export default nextConfig;
