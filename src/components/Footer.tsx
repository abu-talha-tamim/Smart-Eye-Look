import { Eye, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-navy text-navy-foreground">
    <div className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Eye className="h-6 w-6" />
            <span className="text-lg font-bold font-serif">SmartEyeLook</span>
          </div>
          <p className="text-sm opacity-70 leading-relaxed">
            Premium eyewear with custom prescription lenses. See the world clearly with style and comfort.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {["Shop", "About", "Contact", "Categories"].map((l) => (
              <Link key={l} to={`/${l.toLowerCase()}`} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                {l}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Categories</h4>
          <div className="flex flex-col gap-2">
            {["Men's Glasses", "Women's Glasses", "Kids Glasses", "Blue Cut", "Prescription"].map((c) => (
              <Link key={c} to="/shop" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
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
