import type { NextConfig } from "next"
import createMDX from "@next/mdx"

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: false,
  },
}

export default withMDX(nextConfig)
