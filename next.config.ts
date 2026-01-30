import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true, // 308 redirect (кешується браузером)
      },
    ];
  },
  reactStrictMode: false,
};

const withNextIntl = createNextIntlPlugin(
  './i18n/request.ts' // Шлях до вашого request config
);
 
export default withNextIntl(nextConfig);
