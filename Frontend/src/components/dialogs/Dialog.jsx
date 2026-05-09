function Dialog({ open, title, children, onClose }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#1c1830]/30 p-4 backdrop-blur-sm transition duration-200 ${
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className={`max-h-[min(88vh,720px)] w-full max-w-md overflow-y-auto rounded-[24px] border border-[#ece5f6] bg-white p-5 shadow-[0_30px_80px_rgba(38,24,87,0.18)] transition duration-200 sm:p-6 ${
          open ? 'translate-y-0 scale-100' : 'translate-y-2 scale-[0.98]'
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-[24px] font-semibold tracking-[-0.04em] text-[#17132e]">
              {title}
            </h3>
            <p className="mt-3 text-[16px] leading-7 text-[#736c89]">{children}</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f7f4ff] text-[22px] text-[#6f6787] transition hover:bg-[#eee7ff] hover:text-[#3f395a]"
          >
            ×
          </button>
        </div>
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-[12px] bg-[linear-gradient(90deg,#7340f6_0%,#9f63ff_100%)] px-5 py-3 text-[15px] font-medium text-white shadow-[0_14px_30px_rgba(125,85,255,0.24)] transition hover:-translate-y-0.5 active:translate-y-0"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dialog
