import { useAppRouter } from './hooks/useAppRouter'
import CreatePage from './pages/CreatePage'
import HomePage from './pages/HomePage'
import SetupPage from './pages/SetupPage'

function App() {
  const { path, navigate } = useAppRouter()

  if (path === '/setup') {
    return <SetupPage navigate={navigate} />
  }

  if (path === '/create') {
    return <CreatePage navigate={navigate} />
  }

  return <HomePage navigate={navigate} />
}

export default App
