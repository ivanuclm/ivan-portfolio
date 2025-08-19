// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import createMDX from "@next/mdx";

const withNextIntl = createNextIntlPlugin(); // buscará src/i18n/request.ts por defecto
const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: false, // como lo tenías
  },
  // (opcional) si usas páginas MD/MDX:
  // pageExtensions: ["ts", "tsx", "md", "mdx"],
};

// 👉 aplica ambos: primero MDX y luego next-intl
export default withNextIntl(withMDX(nextConfig));
