import PageFrame from '../components/layout/PageFrame'
import LandingHeaderSection from '../sections/LandingHeaderSection'
import LandingBodySection from '../sections/LandingBodySection'

function HomePage() {
  return (
    <PageFrame className="px-4 py-4 sm:px-6 sm:py-5 lg:px-8 xl:px-10">
      <div className="pointer-events-none absolute inset-0" />
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1460px] flex-col sm:min-h-[calc(100vh-2.5rem)]">
        <LandingHeaderSection />
        <LandingBodySection />
      </div>
    </PageFrame>
  )
}

export default HomePage
