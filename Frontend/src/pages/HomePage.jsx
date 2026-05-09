import PageFrame from '../components/layout/PageFrame'
import LandingHeaderSection from '../sections/LandingHeaderSection'
import LandingBodySection from '../sections/LandingBodySection'

function HomePage({ navigate }) {
  return (
    <PageFrame className="px-4 py-4 sm:px-6 sm:py-5 lg:px-8 xl:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_22%,rgba(137,92,255,0.18),transparent_26%),radial-gradient(circle_at_77%_50%,rgba(246,95,161,0.12),transparent_28%),radial-gradient(circle_at_64%_18%,rgba(255,255,255,0.95),transparent_34%)]" />
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1460px] flex-col sm:min-h-[calc(100vh-2.5rem)]">
        <LandingHeaderSection />
        <LandingBodySection navigate={navigate} />
      </div>
    </PageFrame>
  )
}

export default HomePage
