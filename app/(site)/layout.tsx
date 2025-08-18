// app/(site)/layout.tsx
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh max-w-5xl mx-auto px-4">
      <header className="py-6 text-sm flex items-center justify-between">
        <a href="/" className="font-semibold">Iván</a>
        <nav className="flex gap-4">
          <a href="/projects">Proyectos</a>
          <a href="/blog">Blog</a>
          <a href="/cv">CV</a>
          <a href="/playground">Playground</a>
          <a href="/contact">Contacto</a>
        </nav>
      </header>
      {children}
      <footer className="py-10 text-xs text-center text-gray-500">
        © {new Date().getFullYear()} Iván H.
      </footer>
    </div>
  )
}
