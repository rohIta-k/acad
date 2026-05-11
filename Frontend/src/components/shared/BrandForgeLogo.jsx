import { Clapperboard } from 'lucide-react'

function BrandForgeLogo({ onClick, className = '', ariaLabel = 'Go to home' }) {
  const isClickable = typeof onClick === 'function'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`flex items-center gap-2 leading-none text-[#B8C2FF] ${isClickable ? 'cursor-pointer transition hover:opacity-90' : 'cursor-default'} ${className}`}
    >
      <Clapperboard className="h-8 w-8 shrink-0 select-none" strokeWidth={2} />
      <div className="text-[28px] tracking-[0.02em] text-white flex items-center font-bold font-['Outfit']">
        ACAD
      </div>
    </button>
  )
}

export default BrandForgeLogo