import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Venues from './pages/Venues.jsx'
import Events from './pages/Events.jsx'
import Community from './pages/Community.jsx'
import Placeholder from './pages/Placeholder.jsx'

function currentPath() {
  return window.location.pathname.replace(/\/$/, '') || '/'
}

export default function App() {
  const path = currentPath()
  if (path === '/venues') return <Venues />
  const pages = {
    '/': <Home />,
    '/events': <Events />,
    '/community': <Community />,
    '/sign-in': <Placeholder kind="sign-in" />,
    '/get-started': <Placeholder kind="get-started" />,
    '/list-venue': <Placeholder kind="list-venue" />,
  }
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header path={path} />
      <main id="main-content">{pages[path] || <Placeholder kind="not-found" />}</main>
      <Footer />
    </>
  )
}
