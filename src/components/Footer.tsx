import { Eye, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

const Footer = () => (
  <footer className="bg-navy text-navy-foreground">
    <div className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="text-white">
          <Link href="/" className="flex items-center gap-3 active:scale-95 transition-transform group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Eye className="h-8 w-8 text-white relative z-10 group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out" />
          </div>
          <div className="flex flex-col -gap-1">
            <h1 className="text-xl leading-none font-sans font-black tracking-tighter text-white flex items-baseline">
              SMART
              <span className="font-serif italic text-gray-100 ml-0.5 animate-pulse">Eye</span>
              <span className="font-sans font-light tracking-widest text-gray-100 text-[10px] ml-1 uppercase">Look</span>
            </h1>
            <span className="text-[7px] font-black uppercase tracking-[0.4em] text-gray-100/40 group-hover:text-primary transition-colors duration-500">Luxury Eyewear</span>
          </div>
        </Link>
          <p className="text-sm opacity-70 leading-relaxed mt-4">
            Premium eyewear with custom prescription lenses. See the world clearly with style and comfort.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[ "Shop", "About", "Contact", "Categories" ].map((l) => (
              <Link key={l} href={`/${l.toLowerCase()}`} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                {l}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Categories</h4>
          <div className="flex flex-col gap-2">
            {["Men's Glasses", "Women's Glasses", "Kids Glasses", "Sunglasses", "Prescription"].map((c) => (
              <Link key={c} href="/shop" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                {c}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm opacity-70">
              <Phone className="h-4 w-4" /> +880 1234-567890
            </div>
            <div className="flex items-center gap-2 text-sm opacity-70">
              <Mail className="h-4 w-4" /> info@smarteyelook.com
            </div>
            <div className="flex items-center gap-2 text-sm opacity-70">
              <MapPin className="h-4 w-4" /> Dhaka, Bangladesh
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10 mt-12 pt-8 text-center text-sm opacity-50">
        © 2026 SmartEyeLook. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
