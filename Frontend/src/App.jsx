import { AnimatePresence, motion } from 'framer-motion'
import { Routes, Route, useLocation, } from 'react-router-dom'

import HomePage from './pages/HomePage'
import SetupPage from './pages/SetupPage'
import CreatePage from './pages/CreatePage'
import BrandsPage from './pages/BrandsPage'

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.09,
        ease: 'easeOut',
      }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  )
}

function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="sync">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper> <HomePage /> </PageWrapper>} />
        <Route path="/brands" element={<PageWrapper> <BrandsPage /> </PageWrapper>} />
        <Route path="/brands/new" element={<PageWrapper> <SetupPage /></PageWrapper>} />
        <Route path="/brands/:brandId/edit" element={<PageWrapper> <SetupPage /></PageWrapper>} />
        <Route path="/setup" element={<PageWrapper> <SetupPage /></PageWrapper>} />
        <Route path="/create" element={<PageWrapper> <CreatePage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  )
}

export default App