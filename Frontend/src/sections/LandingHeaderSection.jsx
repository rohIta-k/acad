import { useNavigate } from 'react-router-dom'
import BrandForgeLogo from '../components/shared/BrandForgeLogo'

function LandingHeaderSection() {
  const navigate = useNavigate()

  return (
    <header className="relative z-10 flex items-center justify-between py-2 sm:py-3 lg:py-4">
      <BrandForgeLogo onClick={() => navigate('/')} />
    </header>
  )
}

export default LandingHeaderSection
