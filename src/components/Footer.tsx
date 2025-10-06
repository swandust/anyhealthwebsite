import logo from "../assets/4.svg";
import { Mail, Phone, MapPin, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="AnyHealth Logo" className="w-10 h-10" />
              <div>
                <h3 className="text-xl font-bold text-white">AnyHealth</h3>
                <p className="text-sm text-white/60">Virtual Hospital Experience</p>
              </div>
            </div>
            <p className="text-white/70 mb-6 max-w-md">
              Revolutionizing healthcare through digital innovation. Connect with healthcare providers,
              manage your health records, and access medical services from anywhere.
            </p>
            <div className="flex space-x-4">
              {/* Facebook (placeholder) */}
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/anyhealth-global-21a1a7388/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/#home" className="text-white/70 hover:text-white transition-colors">
                  Home Portal
                </a>
              </li>
              <li>
                <a href="/providers" className="text-white/70 hover:text-white transition-colors">
                  GP Clinic
                </a>
              </li>
              <li>
                <a href="/providers" className="text-white/70 hover:text-white transition-colors">
                  Specialists
                </a>
              </li>
              <li>
                <a href="/providers" className="text-white/70 hover:text-white transition-colors">
                  Hospital Services
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#4E9A82]" />
                <a
                  href="mailto:contact@anyhealth.asia"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  contact@anyhealth.asia
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#4E9A82]" />
                <span className="text-white/70">24/7 Support Available</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#4E9A82]" />
                <span className="text-white/70">Global Healthcare Network</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">© 2025 AnyHEALTH. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
