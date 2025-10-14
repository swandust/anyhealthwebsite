import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import ServicesPage from "./components/ServicesPage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";

const HEADER_OFFSET = 0;
const isBrowser = typeof window !== "undefined";

function getPath(): "/about" | "/providers" | "/" {
  if (!isBrowser) return "/";
  const p = window.location.pathname.toLowerCase();
  if (p === "/about") return "/about";
  if (p === "/providers") return "/providers";
  return "/";
}

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const path = getPath();

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);

    // Dedicated pages
    if (page === "about") {
      window.location.assign("/about");
      return;
    }
    if (page === "providers") {
      window.location.assign("/providers");
      return;
    }

    // One-page sections
    const map: Record<string, string> = {
      home: "home",
      solutions: "solutions",
      who: "who",
      contact: "contact",
      // legacy aliases
      demo: "solutions",
      services: "who",
      workflow: "who",
    };

    const sectionId = map[page] ?? page;
    scrollToId(sectionId);

    // Update URL hash
    if (isBrowser) {
      window.history.pushState(null, "", `/#${sectionId}`);
    }
  };

  // Auto-scroll on initial load if URL has a hash (e.g. /#contact)
  useEffect(() => {
    if (!isBrowser) return;
    // Prevent restoring previous scroll position
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        scrollToId(hash);
        setCurrentPage(hash);
      }, 50); // wait until DOM is ready
      } else {
      // No hash → force top-of-page
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, []);

  // Standalone: /about
  if (path === "/about") {
    return (
      <div>
        <Header
          currentPage="about"
          onNavigate={handleNavigate}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <main>
          <section>
            <AboutPage />
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // Standalone: /providers
  if (path === "/providers") {
    return (
      <div className="min-h-screen bg-white">
        <Header
          currentPage="providers"
          onNavigate={handleNavigate}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <main>
          <section id="learnmore" className="scroll-mt-24">
            <ServicesPage />
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // Home (one-pager)
  return (
    <div className="min-h-screen bg-white">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main>
        <section id="home" className="scroll-mt-24">
          <HomePage onNavigate={handleNavigate} />
        </section>


        <section id="contact" className="scroll-mt-24">
          <ContactPage />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
