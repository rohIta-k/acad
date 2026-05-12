import { ArrowLeft, ArrowRight, Brush, FolderOpen, Layers3, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PageFrame from '../components/layout/PageFrame'
import { useBrandStorage } from '../hooks/useBrandStorage'

function formatDate(isoDate) {
  if (!isoDate) return 'Recently updated'

  const value = new Date(isoDate)
  if (Number.isNaN(value.getTime())) return 'Recently updated'

  return `Updated ${value.toLocaleDateString()}`
}

function BrandCard({ brand, onUseBrand, onEditBrand }) {
  return (
    <article className="rounded-[22px] border border-[#2C2D3C] bg-[#111219] p-5  transition hover:-translate-y-0.5 hover: sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[24px] font-semibold tracking-[-0.035em] text-[#e2e2e8]">
            {brand.brandName || 'Untitled Brand'}
          </h2>
          <p className="mt-1 text-[14px] text-[#a1a1aa]">{formatDate(brand.updatedAt)}</p>
        </div>
      </div>

      <p className="mt-4 min-h-12 text-[15px] leading-7 text-[#a1a1aa]">
        {brand.tagline || 'No tagline yet'}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {(brand.audience || []).slice(0, 4).map((item) => (
          <span
            key={item}
            className="rounded-full border border-[#2C2D3C] bg-[#1D1E29] px-3 py-1 text-[12px] text-[#a1a1aa]"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          onClick={onUseBrand}
          className="inline-flex items-center gap-2 rounded-[12px] bg-[#B8C2FF] px-4 py-2.5 text-[14px] font-medium text-[#131318] transition hover:bg-[#C3C8FF]"
        >
          Use for Ad Generation
          <ArrowRight className="h-4 w-4" />
        </button>
        <button
          onClick={onEditBrand}
          className="inline-flex items-center gap-2 rounded-[12px] border border-[#2C2D3C] bg-[#1D1E29] px-4 py-2.5 text-[14px] font-medium text-[#e2e2e8]"
        >
          <Brush className="h-4 w-4" />
          Edit
        </button>
      </div>
    </article>
  )
}

function BrandsPage() {
  const navigate = useNavigate()
  const { user, brands, setActiveBrand, loading, error } = useBrandStorage()

  const BackButton = () => (
    <button
      onClick={() => navigate('/')}
      className="group inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#B8C2FF] text-[#131318] transition-all duration-200 hover:scale-[1.03] hover:bg-[#C3C8FF] active:scale-[0.98]"
      aria-label="Back to home"
    >
      <ArrowLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-0.5" strokeWidth={2.5} />
    </button>
  )

  if (loading) {
    return (
      <PageFrame className="p-4 sm:p-6 lg:p-8">
        <div className="relative z-10 mx-auto w-full max-w-[1200px]">
          <div className="flex w-full justify-start">
            <BackButton />
          </div>
          <div className="mt-4 rounded-[22px] border border-[#2C2D3C] bg-[#111219] p-6 text-[#625b7a] sm:p-8">
            Loading your brands...
          </div>
        </div>
      </PageFrame>
    )
  }

  if (!user) {
    return (
      <PageFrame className="p-4 sm:p-6 lg:p-8">
        <div className="relative z-10 mx-auto w-full max-w-[1200px]">
          <div className="flex w-full justify-start">
            <BackButton />
          </div>
          <div className="mt-4 rounded-[22px] border border-[#2C2D3C] bg-[#111219] p-6 text-[#e2e2e8] sm:p-8">
            Sign in to create and manage your brands.
          </div>
        </div>
      </PageFrame>
    )
  }

  return (
    <PageFrame className="p-4 sm:p-6 lg:p-8">
      <div className="pointer-events-none absolute inset-0" />
      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <header className="flex flex-col gap-5">
          <div className="flex w-full items-start justify-between gap-4">
            <BackButton />
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/my-stuff')}
                className="inline-flex items-center justify-center gap-2 rounded-[14px] border border-[#2C2D3C] bg-[#111219] px-5 py-3 text-[15px] font-medium text-[#e2e2e8] transition hover:border-[#B8C2FF] hover:bg-[#1D1E29]"
              >
                <FolderOpen className="h-4 w-4" />
                My Stuff
              </button>
              <button
                onClick={() => navigate('/brands/new')}
                className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-[#B8C2FF] px-5 py-3 text-[15px] font-medium text-[#131318] transition hover:bg-[#C3C8FF]"
              >
                <Plus className="h-4 w-4" />
                Create Brand
              </button>
            </div>
          </div>

          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#2C2D3C] bg-[#1D1E29] px-4 py-2 text-[12px] font-medium tracking-[0.06em] text-[#e2e2e8]">
              <Layers3 className="h-4 w-4" />
              BRANDS SECTION
            </p>
            <h1 className="mt-4 text-[clamp(2.1rem,6.4vw,3.2rem)] font-semibold tracking-[-0.05em] text-[#e2e2e8]">
              Your Brand Library
            </h1>
            <p className="mt-2 max-w-[700px] text-[16px] leading-7 text-[#a1a1aa]">
              Every brand is securely stored in the database under your account. Pick one and generate ads instantly.
            </p>
          </div>
        </header>

        {error ? (
          <div className="mt-6 rounded-[14px] border border-[#2C2D3C] bg-[#111219] px-4 py-3 text-[14px] text-[#b15576] ">
            {error}
          </div>
        ) : null}

        {brands.length === 0 ? (
          <section className="mt-8 rounded-[24px] border border-dashed border-[#2C2D3C] bg-[#111219] px-6 py-10 text-center  sm:px-8 sm:py-14">
            <h2 className="text-[28px] font-medium tracking-[-0.04em] text-[#e2e2e8]">
              No brands yet
            </h2>
            <p className="mx-auto mt-3 max-w-[620px] text-[16px] leading-7 text-[#a1a1aa]">
              Create your first brand with name, logo, colors, tagline, and audience details. It will be available every time you log in.
            </p>
            <button
              onClick={() => navigate('/brands/new')}
              className="mt-6 inline-flex items-center gap-2 rounded-[12px] bg-[#B8C2FF] px-6 py-3 text-[15px] font-medium text-[#131318]"
            >
              <Plus className="h-4 w-4" />
              Create Your First Brand
            </button>
          </section>
        ) : (
          <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {brands.map((brand) => (
              <BrandCard
                key={brand.id}
                brand={brand}
                onUseBrand={() => {
                  setActiveBrand(brand.id)
                  navigate('/create')
                }}
                onEditBrand={() => navigate(`/brands/${brand.id}/edit`)}
              />
            ))}
          </section>
        )}
      </div>
    </PageFrame>
  )
}

export default BrandsPage
