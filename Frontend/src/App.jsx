function App() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),_transparent_35%),linear-gradient(180deg,_#08111f_0%,_#050814_100%)] text-zinc-100">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-16 lg:px-10">
        <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200 backdrop-blur">
          RunWay API Hackathon
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-7">
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Build bold ideas faster.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl">
              Ship your hackathon concept with a clean, focused starting point.
              No starter noise, no setup clutter, just a landing page ready for
              your actual product.
            </p>

            <div className="flex flex-wrap gap-3">
              <button className="rounded-xl border border-cyan-300/30 bg-cyan-300/15 px-6 py-3 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/25">
                Start Building
              </button>
              <button className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-zinc-100 transition hover:bg-white/10">
                View Features
              </button>
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-zinc-950/40 backdrop-blur-xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Why this starter
            </p>

            <div className="space-y-3 text-sm text-zinc-200">
              <div className="rounded-xl border border-white/10 bg-zinc-950/45 px-4 py-3">
                Lean structure, easy to extend
              </div>
              <div className="rounded-xl border border-white/10 bg-zinc-950/45 px-4 py-3">
                Tailwind-first responsive layout
              </div>
              <div className="rounded-xl border border-white/10 bg-zinc-950/45 px-4 py-3">
                Ready for API integration
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default App
