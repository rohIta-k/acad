function ConnectorLine({ color }) {
  return (
    <div className="hidden w-[22px] items-center md:flex">
      <div
        className={`h-[2px] flex-1 rounded-full bg-gradient-to-r ${color}`}
      />

      <span className="ml-[2px] h-2 w-2 rounded-full bg-[#b895ff]" />
    </div>
  )
}

export default ConnectorLine
