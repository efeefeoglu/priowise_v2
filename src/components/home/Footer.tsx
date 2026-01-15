import { Linkedin, Twitter, Instagram } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 py-12 border-t border-gray-200/30">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="font-rubik font-bold text-2xl tracking-tight text-[#2d2d2d] mb-4 block">
              priowise
            </Link>
            <p className="text-[#6a6a6a] max-w-md">
              Strategic prioritization made simple.
              Align your teams and make decisions with confidence.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-[#2d2d2d] mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#6a6a6a] hover:text-[#f8b62d] transition-colors">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6a6a6a] hover:text-[#f8b62d] transition-colors">
                  Contact us
                </a>
              </li>
              <li>
                <Link href="/blog" className="text-[#6a6a6a] hover:text-[#f8b62d] transition-colors">
                  Insights Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[#2d2d2d] mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-[#6a6a6a] hover:text-[#f8b62d] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-[#6a6a6a] hover:text-[#f8b62d] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/data-processing-addendum" className="text-[#6a6a6a] hover:text-[#f8b62d] transition-colors">
                  Data Processing Addendum (DPA)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-200/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#6a6a6a]">
            Copyright © {currentYear} Priowise. All rights reserved.
          </p>

          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/60 border border-white/40 flex items-center justify-center hover:bg-[#f8b62d]/20 transition-colors"
            >
              <Linkedin className="w-5 h-5 text-[#2d2d2d]" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/60 border border-white/40 flex items-center justify-center hover:bg-[#f8b62d]/20 transition-colors"
            >
              <Twitter className="w-5 h-5 text-[#2d2d2d]" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/60 border border-white/40 flex items-center justify-center hover:bg-[#f8b62d]/20 transition-colors"
            >
              <Instagram className="w-5 h-5 text-[#2d2d2d]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
