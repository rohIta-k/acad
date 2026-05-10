import { ArrowRight, Sparkles, PlayCircle, AppWindow, BrainCircuit, LayoutTemplate, Terminal, Cpu, CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import HeroRenderCard from '../components/media/HeroRenderCard'
import Pill from '../components/shared/Pill'

function LandingHeroSection() {
  const navigate = useNavigate()
  return (
    <main className="relative z-10 flex flex-1 flex-col py-4 sm:py-5 lg:py-6">
      <div className="grid w-full items-center gap-8 lg:grid-cols-[47%_53%] lg:gap-10 xl:grid-cols-[48%_52%] xl:gap-12 mt-12 mb-24">
        <section className="max-w-none pr-0 lg:pr-6 xl:pr-10">
          <Pill icon={Sparkles} className="mb-5 sm:mb-6 !bg-[#111219] !border-[#2C2D3C] !text-[#a1a1aa] shadow-none">
            V2.0 CINEMATIC ENGINE
          </Pill>
          <h1 className="max-w-[720px] text-[clamp(3rem,6vw,5.5rem)] font-bold leading-[1.05] tracking-[0.01em] text-white outfit-font">
            Create<br/>Cinematic AI<br/>
            <span className="bg-[linear-gradient(90deg,#C3C8FF_0%,#B4A1FF_100%)] bg-clip-text text-transparent">
              Advertisements
            </span><br/>
            in Minutes
          </h1>
          <p className="mt-6 max-w-[620px] text-[18px] leading-[1.8] tracking-[-0.01em] text-[#A1A1AA] sm:text-[19px] lg:text-[20px]">
            The world's first professional production studio powered by AI. Transform concepts into production-ready cinema assets with industrial-grade precision.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate('/brands')}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#B8C2FF] px-6 py-3.5 text-[#131318]  transition duration-300 hover:bg-[#4a67fe]"
            >
              <div className="text-[16px] font-medium leading-none">
                Launch Studio
              </div>
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </button>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#2C2D3C] bg-[#111219] px-6 py-3.5 text-[#e2e2e8] transition duration-300 hover:bg-[#252530]"
            >
              <div className="text-[16px] font-medium leading-none">
                Watch Showreel
              </div>
              <PlayCircle className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </section>

        <section className="relative flex w-full items-center justify-center pr-6 lg:justify-end lg:pr-10">
          <div className="relative w-full max-w-[980px] xl:max-w-[1080px]">
            <HeroRenderCard />
          </div>
        </section>
      </div>

      <div className="w-full max-w-[1040px] mx-auto mt-20 mb-20 flex flex-col items-center">
        <div className="text-[#a1a1aa] text-[12px] font-bold uppercase tracking-[0.2em] mb-4 font-mono">
          Production Pipeline
        </div>
        <h2 className="text-white text-[42px] font-bold tracking-tight mb-16 outfit-font text-center">
          Automated Creative<br/>Excellence
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 w-full">
          {/* Step 1 */}
          <div className="flex flex-col border-t-2 border-[#B8C2FF] pt-4">
            <div className="flex items-center gap-2 text-[#e2e2e8] font-bold text-[13px] tracking-[0.1em] mb-4 uppercase font-mono">
              <AppWindow className="h-4 w-4" /> BRAND SETUP
            </div>
            <p className="text-[#a1a1aa] text-[17px] leading-relaxed pr-8">
              Inject brand DNA, color tokens, and core identity assets.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col border-t-2 border-[#B8C2FF] pt-4">
            <div className="flex items-center gap-2 text-[#e2e2e8] font-bold text-[13px] tracking-[0.1em] mb-4 uppercase font-mono">
              <BrainCircuit className="h-4 w-4" /> CONCEPT
            </div>
            <p className="text-[#a1a1aa] text-[17px] leading-relaxed pr-8">
              AI-assisted brainstorming and narrative development.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col border-t-2 border-[#B8C2FF] pt-4">
            <div className="flex items-center gap-2 text-[#e2e2e8] font-bold text-[13px] tracking-[0.1em] mb-4 uppercase font-mono">
              <LayoutTemplate className="h-4 w-4" /> STORYBOARD
            </div>
            <p className="text-[#a1a1aa] text-[17px] leading-relaxed pr-8">
              Visual sequence generation with granular camera control.
            </p>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col border-t-2 border-[#B8C2FF] pt-4">
            <div className="flex items-center gap-2 text-[#e2e2e8] font-bold text-[13px] tracking-[0.1em] mb-4 uppercase font-mono">
              <Terminal className="h-4 w-4" /> PROMPT
            </div>
            <p className="text-[#a1a1aa] text-[17px] leading-relaxed pr-8">
              Technical prompt engineering for pixel-perfect results.
            </p>
          </div>

          {/* Step 5 */}
          <div className="flex flex-col border-t-2 border-[#B8C2FF] pt-4">
            <div className="flex items-center gap-2 text-[#e2e2e8] font-bold text-[13px] tracking-[0.1em] mb-4 uppercase font-mono">
              <Cpu className="h-4 w-4" /> GENERATION
            </div>
            <p className="text-[#a1a1aa] text-[17px] leading-relaxed pr-8">
              High-fidelity compute rendering of final cinematic frames.
            </p>
          </div>

          {/* Step 6 */}
          <div className="flex flex-col border-t-2 border-[#B8C2FF] pt-4">
            <div className="flex items-center gap-2 text-[#e2e2e8] font-bold text-[13px] tracking-[0.1em] mb-4 uppercase font-mono">
              <CheckCircle2 className="h-4 w-4" /> VALIDATION
            </div>
            <p className="text-[#a1a1aa] text-[17px] leading-relaxed pr-8">
              Quality checks and multi-platform format export.
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-auto py-8 flex flex-col items-center gap-6 text-[#a1a1aa] text-[13px]">
        <div className="flex items-center gap-2 font-mono tracking-widest text-[#e2e2e8] font-bold">
          <span className="text-[#B8C2FF] text-[20px] font-['Outfit'] tracking-normal">ACAD</span> CINEMATIC SYSTEMS
        </div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition">Showcase</a>
          <a href="#" className="hover:text-white transition">Documentation</a>
          <a href="#" className="hover:text-white transition">Terms of Service</a>
        </div>
        <div className="font-mono text-[11px] opacity-60 uppercase tracking-widest text-center mt-4">
          © 2024 ACAD Cinematic Systems. All<br/>Rights Reserved.
        </div>
      </footer>
    </main>
  )
}

export default LandingHeroSection
