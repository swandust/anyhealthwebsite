import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import ClinicFeatures from './components/ClinicFeatures'
import MediRescue from './components/MediRescue'
import Analytics from './components/Analytics'
import Pricing from './components/Pricing'
import About from './components/About'
import CtaBanner from './components/CtaBanner'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ClinicPage from './pages/ClinicPage'
import AmbulancePage from './pages/AmbulancePage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import AdminPage from './pages/AdminPage'

function HomePage() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.12 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <main className="snap-main">
        <div id="hero" className="snap-section"><Hero /></div>
        <div id="services" className="snap-section"><Services /></div>
        <div id="features" className="snap-section"><ClinicFeatures /></div>
        <div id="medirescue" className="snap-section"><MediRescue /></div>
        <div id="analytics" className="snap-section"><Analytics /></div>
        <div id="pricing" className="snap-section"><Pricing /></div>
        <div id="about" className="snap-section"><About /></div>
        <div className="snap-section"><CtaBanner /></div>
        <div id="contact" className="snap-section"><Contact /></div>
        <div className="snap-section"><Footer /></div>
      </main>

    </>
  )
}

export default function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/clinic" element={<ClinicPage />} />
      <Route path="/ambulance" element={<AmbulancePage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:id" element={<BlogPostPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  )
}
