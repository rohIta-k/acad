import { ChevronLeft, ChevronRight, Layers3, Search, Sparkles, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageFrame from '../components/layout/PageFrame'
import { useBrandStorage } from '../hooks/useBrandStorage'
import { useGenerationStorage } from '../hooks/useGenerationStorage'

function formatDateTime(isoDate) {
  if (!isoDate) return 'Saved recently'

  const value = new Date(isoDate)
  if (Number.isNaN(value.getTime())) return 'Saved recently'

  return value.toLocaleString()
}

function getPreviewUrl(item) {
  return item.videoUrl || item.imageUrl || item.outputUrl || ''
}

function GenerationCard({ item, onDelete }) {
  const previewUrl = getPreviewUrl(item)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (window.confirm('Delete this generation?')) {
      setIsDeleting(true)
      try {
        await onDelete(item.id)
      } catch (err) {
        alert('Failed to delete: ' + err.message)
        setIsDeleting(false)
      }
    }
  }

  return (
    <article className="rounded-[22px] border border-[#2C2D3C] bg-[#111219] p-5  sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h2 className="text-[20px] font-semibold tracking-[-0.03em] text-[#e2e2e8] truncate">
            {item.title || 'Generated creative'}
          </h2>
          <p className="mt-1 text-[13px] text-[#a1a1aa]">{formatDateTime(item.createdAt)}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-[#2C2D3C] bg-[#131318] px-3 py-1 text-[12px] font-medium capitalize text-[#B8C2FF] whitespace-nowrap">
            {item.format}
          </span>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2C2D3C] bg-[#1D1E29] text-[#a1a1aa] transition hover:border-[#4f46e5] hover:bg-[#111219] hover:text-[#e2e2e8] disabled:opacity-50"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {item.brandName ? (
        <p className="mt-3 text-[14px] text-[#a1a1aa]">Brand: {item.brandName}</p>
      ) : null}

      {item.prompt ? (
        <p className="mt-2 line-clamp-3 text-[14px] leading-6 text-[#a1a1aa]">{item.prompt}</p>
      ) : null}

      <div className="mt-4 rounded-[16px] border border-[#2C2D3C] bg-[#131318] p-3">
        {previewUrl ? (
          item.format === 'video' ? (
            <video src={previewUrl} controls className="w-full rounded-[12px]" />
          ) : (
            <img
              src={previewUrl}
              alt={item.title || 'Generated output'}
              className="w-full rounded-[12px] object-cover"
            />
          )
        ) : (
          <p className="text-[13px] text-[#8d86a6]">No media preview available.</p>
        )}
      </div>
    </article>
  )
}

function MyStuffPage() {
  const navigate = useNavigate()
  const { user } = useBrandStorage()
  const {
    paginatedGenerations,
    loading,
    error,
    removeGeneration,
    searchPrompt,
    handleSearchChange,
    filterFormat,
    handleFormatChange,
    filterPlatform,
    handlePlatformChange,
    filterBrand,
    handleBrandChange,
    filterOptions,
    currentPage,
    setCurrentPage,
    totalPages,
    filteredGenerations,
  } = useGenerationStorage(user)

  if (!user) {
    return (
      <PageFrame className="p-4 sm:p-6 lg:p-8">
        <div className="relative z-10 mx-auto max-w-[1200px] rounded-[22px] border border-[#2C2D3C] bg-[#111219] p-6 text-[#e2e2e8]  sm:p-8">
          Sign in to access My Stuff.
        </div>
      </PageFrame>
    )
  }

  return (
    <PageFrame className="p-4 sm:p-6 lg:p-8">
      <div className="pointer-events-none absolute inset-0" />
      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#2C2D3C] bg-[#131318] px-4 py-2 text-[12px] font-medium tracking-[0.06em] text-[#B8C2FF]">
              <Layers3 className="h-4 w-4" />
              MY STUFF
            </p>
            <h1 className="mt-4 text-[clamp(2.1rem,6.4vw,3.2rem)] font-semibold tracking-[-0.05em] text-[#e2e2e8]">
              Previous Generations
            </h1>
            <p className="mt-2 max-w-[700px] text-[16px] leading-7 text-[#a1a1aa]">
              Every render you generate is automatically saved in Supabase and listed here.
            </p>
          </div>

          <button
            onClick={() => navigate('/create')}
            className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-[#B8C2FF] px-5 py-3 text-[15px] font-medium text-[#131318] transition hover:bg-[#C3C8FF]"
          >
            <Sparkles className="h-4 w-4" />
            Generate New
          </button>
        </header>

        {loading ? (
          <div className="mt-6 rounded-[14px] border border-[#2C2D3C] bg-[#111219] px-4 py-3 text-[14px] text-[#a1a1aa]">
            Loading saved generations...
          </div>
        ) : null}

        {error ? (
          <div className="mt-6 rounded-[14px] border border-[#2C2D3C] bg-[#111219] px-4 py-3 text-[14px] text-[#b15576] ">
            {error}
          </div>
        ) : null}

        {!loading && !error && filteredGenerations.length > 0 ? (
          <>
            <div className="mt-8 flex items-center gap-3 rounded-[14px] border border-[#2C2D3C] bg-[#1D1E29] px-4 py-3 ">
              <Search className="h-5 w-5 text-[#a89ec4]" />
              <input
                type="text"
                placeholder="Search by prompt..."
                value={searchPrompt}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="flex-1 border-0 bg-transparent text-[15px] text-[#4a4560] placeholder-[#9b92b1] outline-none"
              />
              {searchPrompt && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="text-[#a89ec4] transition hover:text-[#7a6fa3]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="mt-5 flex flex-wrap gap-3">
              <select
                value={filterFormat}
                onChange={(e) => handleFormatChange(e.target.value)}
                className="rounded-[12px] border border-[#2C2D3C] bg-[#1D1E29] px-4 py-2 text-[14px] text-[#e2e2e8] outline-none transition hover:border-[#4f46e5]"
              >
                <option value="">All Formats</option>
                {filterOptions.formats.map((fmt) => (
                  <option key={fmt} value={fmt}>
                    {fmt.charAt(0).toUpperCase() + fmt.slice(1)}
                  </option>
                ))}
              </select>

              <select
                value={filterPlatform}
                onChange={(e) => handlePlatformChange(e.target.value)}
                className="rounded-[12px] border border-[#2C2D3C] bg-[#1D1E29] px-4 py-2 text-[14px] text-[#e2e2e8] outline-none transition hover:border-[#4f46e5]"
              >
                <option value="">All Platforms</option>
                {filterOptions.platforms.map((plat) => (
                  <option key={plat} value={plat}>
                    {plat.replace(/_/g, ' ').charAt(0).toUpperCase() + plat.slice(1).replace(/_/g, ' ')}
                  </option>
                ))}
              </select>

              <select
                value={filterBrand}
                onChange={(e) => handleBrandChange(e.target.value)}
                className="rounded-[12px] border border-[#2C2D3C] bg-[#1D1E29] px-4 py-2 text-[14px] text-[#e2e2e8] outline-none transition hover:border-[#4f46e5]"
              >
                <option value="">All Brands</option>
                {filterOptions.brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>

              {(searchPrompt || filterFormat || filterPlatform || filterBrand) && (
                <button
                  onClick={() => {
                    handleSearchChange('')
                    handleFormatChange('')
                    handlePlatformChange('')
                    handleBrandChange('')
                  }}
                  className="rounded-[12px] border border-[#2C2D3C] bg-[#1D1E29] px-4 py-2 text-[14px] text-[#e2e2e8] transition hover:bg-[#111219]"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Results Count */}
            <div className="mt-4 text-[14px] text-[#7a7393]">
              Showing {(currentPage - 1) * 6 + 1} to {Math.min(currentPage * 6, filteredGenerations.length)} of{' '}
              {filteredGenerations.length} generation{filteredGenerations.length !== 1 ? 's' : ''}
            </div>

            {/* Generation Cards Grid */}
            <section className="mt-6 grid gap-5 md:grid-cols-2">
              {paginatedGenerations.map((item) => (
                <GenerationCard key={item.id} item={item} onDelete={removeGeneration} />
              ))}
            </section>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-3">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#2C2D3C] bg-[#1D1E29] text-[#e2e2e8] transition hover:border-[#4f46e5] disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`flex h-10 w-10 items-center justify-center rounded-[10px] text-[14px] font-medium transition ${
                        page === currentPage
                          ? 'bg-[#B8C2FF] text-[#131318] hover:bg-[#C3C8FF]'
                          : 'border border-[#2C2D3C] bg-[#1D1E29] text-[#e2e2e8] hover:border-[#4f46e5]'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#2C2D3C] bg-[#1D1E29] text-[#e2e2e8] transition hover:border-[#4f46e5] disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        ) : null}

        {!loading && filteredGenerations.length === 0 && !error ? (
          <section className="mt-8 rounded-[24px] border border-dashed border-[#2C2D3C] bg-[#111219] px-6 py-10 text-center  sm:px-8 sm:py-14">
            <h2 className="text-[28px] font-medium tracking-[-0.04em] text-[#e2e2e8]">
              {searchPrompt || filterFormat || filterPlatform || filterBrand
                ? 'No generations match your filters'
                : 'Nothing saved yet'}
            </h2>
            <p className="mx-auto mt-3 max-w-[620px] text-[16px] leading-7 text-[#a1a1aa]">
              {searchPrompt || filterFormat || filterPlatform || filterBrand
                ? 'Try adjusting your search or filters.'
                : 'Once you generate media from the Create page, it will appear here.'}
            </p>
          </section>
        ) : null}
      </div>
    </PageFrame>
  )
}

export default MyStuffPage
