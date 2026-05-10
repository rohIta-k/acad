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
          className="range-slider h-2 w-full cursor-pointer appearance-none rounded-full bg-[linear-gradient(90deg,#5f36e9_0%,#e26db8_100%)]"
        />

        <div className="flex h-14 w-full items-center justify-center rounded-[12px] border border-[#ebe7f2] bg-white px-4 text-[22px] font-medium tracking-[-0.04em] text-[#5c5779] shadow-[0_8px_18px_rgba(15,23,42,0.04)] sm:min-w-[66px] sm:w-auto sm:text-[25px]">
          {value}s
        </div>
      </div>
    </>
  )
}

export default DurationSlider