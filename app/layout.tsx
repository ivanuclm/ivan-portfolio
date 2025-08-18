// app/layout.tsx
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Iván | Portfolio",
  description: "Portfolio y blog técnico de Iván Hernández"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  )
}
