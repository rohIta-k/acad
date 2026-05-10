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
    <article className="rounded-[22px] border border-[#e8e2f3] bg-white/85 p-5 shadow-[0_16px_38px_rgba(84,60,148,0.08)] sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h2 className="text-[20px] font-semibold tracking-[-0.03em] text-[#322b4d] truncate">
            {item.title || 'Generated creative'}
          </h2>
          <p className="mt-1 text-[13px] text-[#7b7393]">{formatDateTime(item.createdAt)}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-[#d8ccf8] bg-[#f4efff] px-3 py-1 text-[12px] font-medium capitalize text-[#6f49cb] whitespace-nowrap">
            {item.format}
          </span>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f0e6ff] bg-white text-[#a89ec4] transition hover:border-[#e8daf7] hover:bg-[#faf8ff] hover:text-[#d99bc4] disabled:opacity-50"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {item.brandName ? (
        <p className="mt-3 text-[14px] text-[#655d7f]">Brand: {item.brandName}</p>
      ) : null}

      {item.prompt ? (
        <p className="mt-2 line-clamp-3 text-[14px] leading-6 text-[#5d5679]">{item.prompt}</p>
      ) : null}

      <div className="mt-4 rounded-[16px] border border-[#ece6f5] bg-[#faf8ff] p-3">
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
        <div className="relative z-10 mx-auto max-w-[1200px] rounded-[22px] border border-[#f0dbe6] bg-white/90 p-6 text-[#8b4461] shadow-[0_18px_42px_rgba(84,60,148,0.08)] sm:p-8">
          Sign in to access My Stuff.
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
              MY STUFF
            </p>
            <h1 className="mt-4 text-[clamp(2.1rem,6.4vw,3.2rem)] font-semibold tracking-[-0.05em] text-[#302949]">
              Previous Generations
            </h1>
            <p className="mt-2 max-w-[700px] text-[16px] leading-7 text-[#6e6788]">
              Every render you generate is automatically saved in Supabase and listed here.
            </p>
          </div>

          <button
            onClick={() => navigate('/create')}
            className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-[linear-gradient(90deg,#7340f6_0%,#e57ac5_100%)] px-5 py-3 text-[15px] font-medium text-white shadow-[0_14px_34px_rgba(125,85,255,0.26)]"
          >
            <Sparkles className="h-4 w-4" />
            Generate New
          </button>
        </header>

        {loading ? (
          <div className="mt-6 rounded-[14px] border border-[#ece4fa] bg-white/90 px-4 py-3 text-[14px] text-[#6f6790]">
            Loading saved generations...
          </div>
        ) : null}

        {error ? (
          <div className="mt-6 rounded-[14px] border border-[#f1c6d5] bg-[linear-gradient(180deg,rgba(255,245,248,0.96)_0%,rgba(255,250,252,0.98)_100%)] px-4 py-3 text-[14px] text-[#b15576] shadow-[0_12px_28px_rgba(187,84,122,0.08)]">
            {error}
          </div>
        ) : null}

        {!loading && !error && filteredGenerations.length > 0 ? (
          <>
            <div className="mt-8 flex items-center gap-3 rounded-[14px] border border-[#ece6f5] bg-white px-4 py-3 shadow-[0_10px_24px_rgba(89,68,148,0.06)]">
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
                className="rounded-[12px] border border-[#e5ddf4] bg-white px-4 py-2 text-[14px] text-[#5a5270] outline-none transition hover:border-[#d8cfe8]"
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
                className="rounded-[12px] border border-[#e5ddf4] bg-white px-4 py-2 text-[14px] text-[#5a5270] outline-none transition hover:border-[#d8cfe8]"
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
                className="rounded-[12px] border border-[#e5ddf4] bg-white px-4 py-2 text-[14px] text-[#5a5270] outline-none transition hover:border-[#d8cfe8]"
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
                  className="rounded-[12px] border border-[#e5ddf4] bg-white px-4 py-2 text-[14px] text-[#5a5270] transition hover:bg-[#faf8ff]"
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
                  className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#e5ddf4] bg-white text-[#5a5270] transition hover:border-[#d8cfe8] disabled:opacity-50"
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
                          ? 'bg-[linear-gradient(90deg,#7340f6_0%,#e57ac5_100%)] text-white'
                          : 'border border-[#e5ddf4] bg-white text-[#5a5270] hover:border-[#d8cfe8]'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#e5ddf4] bg-white text-[#5a5270] transition hover:border-[#d8cfe8] disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        ) : null}

        {!loading && filteredGenerations.length === 0 && !error ? (
          <section className="mt-8 rounded-[24px] border border-dashed border-[#d7c9f7] bg-[linear-gradient(180deg,rgba(255,255,255,0.88)_0%,rgba(247,243,255,0.88)_100%)] px-6 py-10 text-center shadow-[0_18px_44px_rgba(74,53,136,0.08)] sm:px-8 sm:py-14">
            <h2 className="text-[28px] font-medium tracking-[-0.04em] text-[#3a3357]">
              {searchPrompt || filterFormat || filterPlatform || filterBrand
                ? 'No generations match your filters'
                : 'Nothing saved yet'}
            </h2>
            <p className="mx-auto mt-3 max-w-[620px] text-[16px] leading-7 text-[#6d6686]">
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
