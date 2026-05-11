function DurationSlider({ value, onChange, disabled = false }) {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          type="range"
          min="4"
          max="8"
          step="2"
          disabled={disabled}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="range-slider h-2 w-full cursor-pointer appearance-none rounded-full bg-[#B8C2FF] hover:bg-[#C3C8FF]"
        />

        <div className="flex h-14 w-full items-center justify-center rounded-[12px] border border-[#2C2D3C] bg-[#1D1E29] px-4 text-[22px] font-medium tracking-[-0.04em] text-[#e2e2e8]  sm:min-w-[66px] sm:w-auto sm:text-[25px]">
          {value}s
        </div>
      </div>
    </>
  )
}

export default DurationSlider