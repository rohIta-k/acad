import { Play } from 'lucide-react'
import shoe from '../../assets/shoe.png'

function HeroRenderCard() {
  return (
    <div className="rounded-[28px] border border-[#e6e0f1] bg-white/75 p-0 shadow-[0_32px_80px_rgba(70,51,126,0.16)] backdrop-blur-xl">
      <div className="flex min-h-[56px] flex-wrap items-center justify-between gap-3 rounded-t-[28px] border-b border-[#ece7f4] px-4 py-3 sm:min-h-[64px] sm:px-5">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <div className="flex gap-2">
            <span className="h-3.5 w-3.5 rounded-full bg-[#ff5f56]" />
            <span className="h-3.5 w-3.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-3.5 w-3.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex min-w-0 items-center gap-2 text-[12px] text-[#48415d] sm:gap-3 sm:text-[16px]">
            <span className="h-3 w-3 rounded-full bg-[#7b4bf2]" />
            <span className="truncate font-mono tracking-[-0.04em]">
              Rendering: CyberMotion_Footwear_Film.mov
            </span>
          </div>
        </div>
        <div className="h-5 w-5 rounded-[5px] border border-[#d8d2e5]" />
      </div>

      <div className="relative overflow-hidden rounded-b-[28px]">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(57,37,119,0.06)_100%)]" />
        <div className="relative aspect-[2.08] overflow-hidden bg-[#15131f]">
  <img
    src={shoe}
    alt="Cyberpunk Shoe"
    className="absolute inset-0 h-full w-full object-cover"
  />

  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,18,0.06)_0%,rgba(0,0,0,0.18)_100%)]" />

  <div className="absolute left-4 top-4 rounded-[10px] bg-[#5e5a74]/72 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.08em] text-white backdrop-blur md:left-8 md:top-7 md:text-[14px]">
    SEQUENCE 04: NIGHT RUN
  </div>

  <div className="absolute right-4 top-4 rounded-[10px] bg-[#6a667f]/72 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.08em] text-white backdrop-blur md:right-8 md:top-7 md:text-[14px]">
    21:9 • CINEMATIC • HDR
  </div>

  <button className="absolute left-1/2 top-1/2 flex h-[78px] w-[78px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#1f1b2c]/72 text-white shadow-[0_18px_40px_rgba(16,10,34,0.42)] backdrop-blur transition hover:scale-[1.04]">
    <Play className="ml-1 h-8 w-8 fill-current" />
  </button>

  <div className="absolute bottom-5 left-5 right-5 md:bottom-7 md:left-8 md:right-8">
    <div className="mb-4 flex items-center justify-between text-white">
      <div className="flex items-center gap-5">
        <span className="text-[28px]">◰</span>
        <span className="text-[20px]">⏵</span>
        <span className="text-[24px]">◔</span>
      </div>

      <span className="font-mono text-[15px] tracking-[0.08em]">
        00:02:14:18
      </span>
    </div>

    <div className="h-[6px] rounded-full bg-white/20">
      <div className="relative h-full w-[72%] rounded-full bg-[linear-gradient(90deg,#7c49f3_0%,#ae74ff_42%,#d579f0_100%)]">
        <span className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#8f61ff] shadow-[0_0_0_4px_rgba(255,255,255,0.08)]" />
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  )
}

export default HeroRenderCard
