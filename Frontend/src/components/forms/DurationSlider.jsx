function DurationSlider({ value, onChange, disabled = false }) {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          type="range"
          min="5"
          max="30"
          step="1"
          disabled={disabled}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="range-slider h-2 w-full cursor-pointer appearance-none rounded-full bg-[linear-gradient(90deg,#7d47f3_0%,#e0d8f5_100%)]"
        />
        <div className="flex h-14 w-full items-center justify-center rounded-[12px] border border-[#ddd6ea] bg-white px-4 text-[22px] font-medium tracking-[-0.04em] text-[#5c5779] sm:min-w-[66px] sm:w-auto sm:text-[25px]">
          {value}s
        </div>
      </div>
    </>
  )
}

export default DurationSlider
