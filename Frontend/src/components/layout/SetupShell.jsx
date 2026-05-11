function SetupShell({ children }) {
  return (
    <div className="relative z-10 min-h-screen">
      <main className="min-w-0 px-4 py-3 sm:px-6 sm:py-4 lg:px-10 xl:px-12">{children}</main>
    </div>
  )
}

export default SetupShell
