function SetupShell({ sidebar, children }) {
  return (
    <div className="relative z-10 grid min-h-screen lg:grid-cols-[minmax(250px,288px)_minmax(0,1fr)] xl:grid-cols-[288px_minmax(0,1fr)]">
      {sidebar}
      <main className="min-w-0 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">{children}</main>
    </div>
  )
}

export default SetupShell
