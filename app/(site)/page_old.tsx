// app/(site)/page.tsx
export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Hola 👋</h1>
      <p className="mt-2">
        Bienvenido. Prueba el <a className="underline" href="/blog">Blog</a> o
        la página de <a className="underline" href="/projects">Proyectos</a>.
      </p>

      <h1 className="text-3xl font-bold">Hola, Tailwind está vivo ✅</h1>
      <div className="mt-4 rounded-2xl p-6 bg-muted">
        Caja con bg-muted y bordes redondeados
      </div>
    </main>
  )
}
