function DurationSlider({ value, onChange }) {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          type="range"
          min="10"
          max="30"
          step="10"
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="range-slider h-2 w-full cursor-pointer appearance-none rounded-full bg-[linear-gradient(90deg,#7d47f3_0%,#e0d8f5_100%)]"
        />
        <div className="flex h-14 w-full items-center justify-center rounded-[12px] border border-[#ddd6ea] bg-white px-4 text-[22px] font-medium tracking-[-0.04em] text-[#5c5779] sm:min-w-[66px] sm:w-auto sm:text-[25px]">
          {value}s
        </div>
      </div>
      <div className="mt-3 flex justify-between text-[16px] text-[#625c7c]">
        <span>10s</span>
        <span>20s</span>
        <span>30s</span>
      </div>
    </>
  )
}

export default DurationSlider
