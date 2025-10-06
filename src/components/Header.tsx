import React from "react";
import { Menu, X } from "lucide-react";
import logoUrl from "../assets/1.svg";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Header({
  currentPage,
  onNavigate,
  mobileMenuOpen,
  setMobileMenuOpen,
}: HeaderProps) {
  const navItems = [
    { id: "home", label: "Home" },               // in-page
    { id: "providers", label: "For Providers" }, // full page
    { id: "about", label: "About" },             // full page
    { id: "contact", label: "Contact" },         // in-page
  ];

  const linkBase = "text-base font-medium transition-colors px-4 py-2 rounded-lg";
  const HEADER_OFFSET = 72;

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const goToSection = (sectionId: "home" | "contact" | "solutions" | "who") => {
    if (typeof window === "undefined") return;

    if (window.location.pathname !== "/") {
      // redirect back home and let browser handle hash scroll
      window.location.assign(`/#${sectionId}`);
    } else {
      scrollToSection(sectionId);
    }
  };

  const handleNavClick = (id: string) => {
    if (id === "about") {
      window.location.assign("/about");
      return;
    }
    if (id === "providers") {
      window.location.assign("/providers");
      return;
    }
    if (["home", "contact", "solutions", "who"].includes(id)) {
      goToSection(id as any);
      return;
    }
    onNavigate(id);
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white/90 backdrop-blur ring-1 ring-black/5 shadow-lg shadow-black/5 overflow-hidden">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <button
              onClick={() => handleNavClick("home")}
              className="flex h-16 items-center gap-3 cursor-pointer -mx-2 px-5"
              aria-label="Go home"
            >
              <img
                src={logoUrl}
                alt="AnyHealth"
                className="block h-12 scale-[1.5] mx-10 w-auto"
              />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={currentPage === item.id ? "page" : undefined}
                  className={`${linkBase} ${
                    currentPage === item.id
                      ? "text-[var(--ah-primary)]"
                      : "text-black/70 hover:text-black"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTAs */}
            <div className="hidden md:flex items-center gap-5 pr-5">
              <button
                onClick={() => handleNavClick("home")}
                className="
                  border border-emerald-500
                  px-4 py-2 text-sm font-semibold rounded-full 
                  bg-[#4F997F] hover:opacity-90 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg
                  active:scale-[.98]
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white
                "
              >
                Get started
              </button>

              <a
                href="https://calendly.com/anyhealth-sg/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  px-4 py-2 text-sm font-medium rounded-full
                  border border-[var(--ah-primary)]
                  bg-[var(--ah-primary)] text-slate
                  transition-all duration-200
                  hover:opacity-90 hover:shadow-lg
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ah-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-white
                  active:scale-[.98]
                "
              >
                Request demo
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-black/70 hover:text-black"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 bg-white">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleNavClick(item.id);
                      setMobileMenuOpen(false);
                    }}
                    aria-current={currentPage === item.id ? "page" : undefined}
                    className={`${linkBase} text-left ${
                      currentPage === item.id
                        ? "text-[var(--ah-primary)]"
                        : "text-black/70 hover:text-black"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}

                <div className="pt-3 border-t border-black/10 flex flex-col gap-3 px-3">
                  <a
                    href="mailto:contact@anyhealth.asia"
                    className="text-left text-sm text-black/70 hover:text-black transition-colors"
                  >
                    Contact
                  </a>
                  <a
                    href="https://calendly.com/anyhealth-sg/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-[var(--ah-primary)] hover:opacity-90 text-white text-sm font-medium rounded-full transition-colors w-fit"
                  >
                    Request demo
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
