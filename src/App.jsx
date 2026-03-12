import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
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

  const orgSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AnyHealth",
    "url": "https://anyhealth.asia",
    "logo": "https://anyhealth.asia/brand%20assets/3.png",
    "email": "contact@anyhealth.asia",
    "description": "WhatsApp-native clinic automation and ambulance dispatch platform for Southeast Asia.",
    "areaServed": ["MY", "SG"],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "MY",
      "addressRegion": "Selangor"
    },
    "sameAs": [
      "https://www.instagram.com/anyhealthglobal/",
      "https://www.facebook.com/profile.php?id=61582629562230"
    ]
  })

  return (
    <>
      <Helmet>
        <title>AnyHealth — WhatsApp-Native Clinic & Ambulance Automation | Southeast Asia</title>
        <meta name="description" content="AnyHealth automates clinic bookings, reminders, and ambulance dispatch via WhatsApp — no app downloads needed. Serving GPs, TCM clinics, and emergency services across Malaysia and Singapore." />
        <link rel="canonical" href="https://anyhealth.asia/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://anyhealth.asia/" />
        <meta property="og:title" content="AnyHealth — WhatsApp-Native Clinic & Ambulance Automation" />
        <meta property="og:description" content="Automate clinic bookings, cut no-shows by 15%, and dispatch ambulances in 30 seconds — all through WhatsApp." />
        <meta property="og:image" content="https://anyhealth.asia/brand%20assets/Anyhealth%20logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AnyHealth — WhatsApp-Native Clinic & Ambulance Automation" />
        <meta name="twitter:description" content="Automate clinic bookings, cut no-shows by 15%, and dispatch ambulances in 30 seconds — all through WhatsApp." />
        <meta name="twitter:image" content="https://anyhealth.asia/brand%20assets/Anyhealth%20logo.png" />
        <script type="application/ld+json">{orgSchema}</script>
      </Helmet>
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
