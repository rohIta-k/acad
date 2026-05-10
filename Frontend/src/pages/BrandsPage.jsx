import { ArrowRight, Brush, FolderOpen, Layers3, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PageFrame from '../components/layout/PageFrame'
import { useBrandStorage } from '../hooks/useBrandStorage'

function formatDate(isoDate) {
  if (!isoDate) return 'Recently updated'

  const value = new Date(isoDate)
  if (Number.isNaN(value.getTime())) return 'Recently updated'

  return `Updated ${value.toLocaleDateString()}`
}

function BrandCard({ brand, isActive, onUseBrand, onEditBrand }) {
  return (
    <article className="rounded-[22px] border border-[#e8e2f3] bg-white/85 p-5 shadow-[0_16px_38px_rgba(84,60,148,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(84,60,148,0.13)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[24px] font-semibold tracking-[-0.035em] text-[#312a4d]">
            {brand.brandName || 'Untitled Brand'}
          </h2>
          <p className="mt-1 text-[14px] text-[#7b7393]">{formatDate(brand.updatedAt)}</p>
        </div>
        {isActive ? (
          <span className="rounded-full border border-[#d8ccf8] bg-[#f4efff] px-3 py-1 text-[12px] font-medium text-[#6f49cb]">
            Active
          </span>
        ) : null}
      </div>

      <p className="mt-4 min-h-12 text-[15px] leading-7 text-[#645d7d]">
        {brand.tagline || 'No tagline yet'}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {(brand.audience || []).slice(0, 4).map((item) => (
          <span
            key={item}
            className="rounded-full border border-[#e4ddf4] bg-[#f9f7ff] px-3 py-1 text-[12px] text-[#665f83]"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          onClick={onUseBrand}
          className="inline-flex items-center gap-2 rounded-[12px] bg-[linear-gradient(90deg,#7340f6_0%,#e57ac5_100%)] px-4 py-2.5 text-[14px] font-medium text-white shadow-[0_12px_28px_rgba(125,85,255,0.25)]"
        >
          Use for Ad Generation
          <ArrowRight className="h-4 w-4" />
        </button>
        <button
          onClick={onEditBrand}
          className="inline-flex items-center gap-2 rounded-[12px] border border-[#e5def3] bg-white px-4 py-2.5 text-[14px] font-medium text-[#4e4768]"
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
  const { user, brands, activeBrandId, setActiveBrand, loading, error } = useBrandStorage()

  if (loading) {
    return (
      <PageFrame className="p-4 sm:p-6 lg:p-8">
        <div className="relative z-10 mx-auto max-w-[1200px] rounded-[22px] border border-[#e8e2f3] bg-white/90 p-6 text-[#625b7a] shadow-[0_18px_42px_rgba(84,60,148,0.08)] sm:p-8">
          Loading your brands...
        </div>
      </PageFrame>
    )
  }

  if (!user) {
    return (
      <PageFrame className="p-4 sm:p-6 lg:p-8">
        <div className="relative z-10 mx-auto max-w-[1200px] rounded-[22px] border border-[#f0dbe6] bg-white/90 p-6 text-[#8b4461] shadow-[0_18px_42px_rgba(84,60,148,0.08)] sm:p-8">
          Sign in to create and manage your brands.
        </div>
      </PageFrame>
    )
  }

  return (
    <PageFrame className="p-4 sm:p-6 lg:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(130,88,246,0.14),transparent_26%),radial-gradient(circle_at_84%_14%,rgba(255,255,255,0.94),transparent_30%),radial-gradient(circle_at_76%_82%,rgba(244,120,183,0.12),transparent_32%)]" />
      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#dfd3fb] bg-[#f5f0ff] px-4 py-2 text-[12px] font-medium tracking-[0.06em] text-[#6b49c4]">
              <Layers3 className="h-4 w-4" />
              BRANDS SECTION
            </p>
            <h1 className="mt-4 text-[clamp(2.1rem,6.4vw,3.2rem)] font-semibold tracking-[-0.05em] text-[#302949]">
              Your Brand Library
            </h1>
            <p className="mt-2 max-w-[700px] text-[16px] leading-7 text-[#6e6788]">
              Every brand is securely stored in the database under your account. Pick one and generate ads instantly.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/my-stuff')}
              className="inline-flex items-center justify-center gap-2 rounded-[14px] border border-[#e4daf8] bg-white px-5 py-3 text-[15px] font-medium text-[#544b77] shadow-[0_14px_34px_rgba(125,85,255,0.12)]"
            >
              <FolderOpen className="h-4 w-4" />
              My Stuff
            </button>
            <button
              onClick={() => navigate('/brands/new')}
              className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-[linear-gradient(90deg,#7340f6_0%,#e57ac5_100%)] px-5 py-3 text-[15px] font-medium text-white shadow-[0_14px_34px_rgba(125,85,255,0.26)]"
            >
              <Plus className="h-4 w-4" />
              Create Brand
            </button>
          </div>
        </header>

        {error ? (
          <div className="mt-6 rounded-[14px] border border-[#f1c6d5] bg-[linear-gradient(180deg,rgba(255,245,248,0.96)_0%,rgba(255,250,252,0.98)_100%)] px-4 py-3 text-[14px] text-[#b15576] shadow-[0_12px_28px_rgba(187,84,122,0.08)]">
            {error}
          </div>
        ) : null}

        {brands.length === 0 ? (
          <section className="mt-8 rounded-[24px] border border-dashed border-[#d7c9f7] bg-[linear-gradient(180deg,rgba(255,255,255,0.88)_0%,rgba(247,243,255,0.88)_100%)] px-6 py-10 text-center shadow-[0_18px_44px_rgba(74,53,136,0.08)] sm:px-8 sm:py-14">
            <h2 className="text-[28px] font-medium tracking-[-0.04em] text-[#3a3357]">
              No brands yet
            </h2>
            <p className="mx-auto mt-3 max-w-[620px] text-[16px] leading-7 text-[#6d6686]">
              Create your first brand with name, logo, colors, tagline, and audience details. It will be available every time you log in.
            </p>
            <button
              onClick={() => navigate('/brands/new')}
              className="mt-6 inline-flex items-center gap-2 rounded-[12px] bg-[linear-gradient(90deg,#7340f6_0%,#e57ac5_100%)] px-5 py-3 text-[15px] font-medium text-white"
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
                isActive={activeBrandId === brand.id}
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
