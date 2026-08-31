// Footer.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,

} from 'lucide-react';

import { FiLinkedin as Linkedin, FiTwitter as Twitter, FiInstagram as Instagram, FiYoutube as Youtube } from 'react-icons/fi';



const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row - 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="Logo"
                width={150}
                height={40}
                className="brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Transforming businesses through innovative IT solutions. We build scalable software that drives growth.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white text-sm transition-colors">Services</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white text-sm transition-colors">Blog</Link></li>
              <li><Link href="/career" className="text-gray-400 hover:text-white text-sm transition-colors">Career</Link></li>

              <li><Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Col 3: Our Services */}
          <div>
            <h3 className="text-white font-bold mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li><Link href="/services/web-development" className="text-gray-400 hover:text-white text-sm transition-colors">Web Development</Link></li>
              <li><Link href="/services/mobile-app" className="text-gray-400 hover:text-white text-sm transition-colors">Mobile App Development</Link></li>
              <li><Link href="/services/custom-software" className="text-gray-400 hover:text-white text-sm transition-colors">Custom Software</Link></li>
              <li><Link href="/services/it-consulting" className="text-gray-400 hover:text-white text-sm transition-colors">IT Consulting</Link></li>
              <li><Link href="/services/digital-marketing" className="text-gray-400 hover:text-white text-sm transition-colors">Digital Marketing</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <a href="mailto:info@sqrock.cloud" className="text-gray-400 hover:text-white text-sm transition-colors">
                  info@sqrock.cloud
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <a href="tel:+918619819400" className="text-gray-400 hover:text-white text-sm transition-colors">
                  +91 86198 19400
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Jaipur, Rajasthan, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row - Copyright & Legal */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 SQROCK IT Solutions. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-gray-600">|</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <span className="text-gray-600">|</span>
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;