import { ArrowRight, Sparkles } from 'lucide-react'
import { landingFeatures } from '../data/navigation'
import ConnectorLine from '../components/cards/ConnectorLine'
import FeatureCard from '../components/cards/FeatureCard'
import HeroRenderCard from '../components/media/HeroRenderCard'
import Pill from '../components/shared/Pill'

function LandingHeroSection({ navigate }) {
  return (
    <main className="relative z-10 flex flex-1 items-center py-4 sm:py-5 lg:py-6">
      <div className="grid w-full items-center gap-8 lg:grid-cols-[47%_53%] lg:gap-10 xl:grid-cols-[48%_52%] xl:gap-12">
        <section className="max-w-none pr-0 lg:pr-6 xl:pr-10">
          <Pill icon={Sparkles} className="mb-5 sm:mb-6">
            AI PRODUCTION V4.0
          </Pill>
          <h1 className="max-w-[720px] text-[clamp(3.6rem,8vw,6.4rem)] font-semibold leading-[0.9] tracking-[0.03em] text-[#111028]">
            Your brand.
            <br />
            <span className="bg-[linear-gradient(90deg,#8c5cff_0%,#f45a8f_100%)] bg-clip-text text-transparent">
              Any format.
            </span>
            <br />
            In seconds.
          </h1>
          <p className="mt-6 max-w-[620px] text-[18px] leading-[1.8] tracking-[-0.02em] text-[#777090] sm:text-[19px] lg:text-[20px]">
            The next-generation cinematic engine for product ads. Automate
            high-end visual storytelling across all digital platforms with
            AI-driven precision.
          </p>
          <button
            onClick={() => navigate('/setup')}
            className="mt-8 inline-flex items-center justify-center gap-3 rounded-[16px] bg-[linear-gradient(90deg,#7340f6_0%,#e57ac5_100%)] px-6 py-4 text-white shadow-[0_18px_42px_rgba(125,85,255,0.24)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(125,85,255,0.32)] active:translate-y-0 active:scale-[0.99]"
          >
            <div className="text-[20px] font-medium leading-none tracking-[0.05em]">
              Build your brand
            </div>

            <ArrowRight className="h-5 w-5" strokeWidth={2.2} />
          </button>
        </section>

        <section className="relative flex w-full items-center justify-center lg:justify-end">
          <div className="relative w-full max-w-[980px] xl:max-w-[1080px]">
            <div className="mx-auto w-full max-w-[960px] xl:max-w-[1040px]">
              <HeroRenderCard />
            </div>

            <div className="relative z-20 -mt-[2.5%] flex items-center justify-center px-2">
              <div className="flex w-full max-w-[960px] items-start justify-center gap-3 xl:max-w-[1040px]">
                {landingFeatures.map((feature, index) => (
                  <FragmentWithConnector
                    key={feature.label}
                    feature={feature}
                    showConnector={index < landingFeatures.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

function FragmentWithConnector({ feature, showConnector }) {
  const connectorColors = {
    STYLE: 'from-[#ad7cff] to-[#dbbf77]',
    ENGINE: 'from-[#dbbf77] to-[#7cc9f3]',
  }

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <div className="min-w-0 flex-1">
        <FeatureCard {...feature} />
      </div>

      {showConnector ? (
        <div className="hidden md:block">
          <ConnectorLine color={connectorColors[feature.label]} />
        </div>
      ) : null}
    </div>
  )
}

export default LandingHeroSection
