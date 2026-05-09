import brandForgeLogo from '../../assets/brandforge-logo.svg'

function BrandForgeLogo() {
  return (
    <div className="flex items-center gap-3 leading-none">
      <img
        src={brandForgeLogo}
        alt="BrandForge logo"
        className="h-16 w-16 shrink-0 select-none"
      />

      <div className="text-[38px] tracking-[-0.05em] text-[#0f0d27] flex items-center">
        <span className="font-extrabold">Brand</span>
        <span className="font-normal">Forge</span>
      </div>
    </div>
  )
}

export default BrandForgeLogo