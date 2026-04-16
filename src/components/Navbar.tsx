"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Menu, X, Eye, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import CartDrawer from "./CartDrawer";
import { useSession } from "next-auth/react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const pathname = usePathname();
  const { data: session }: any = useSession();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 active:scale-95 transition-transform group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Eye className="h-8 w-8 text-primary relative z-10 group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out" />
          </div>
          <div className="flex flex-col -gap-1">
            <h1 className="text-xl leading-none font-sans font-black tracking-tighter text-navy flex items-baseline">
              SMART
              <span className="font-serif italic text-primary ml-0.5 animate-pulse">Eye</span>
              <span className="font-sans font-light tracking-widest text-[#64748b] text-[10px] ml-1 uppercase">Look</span>
            </h1>
            <span className="text-[7px] font-black uppercase tracking-[0.4em] text-primary/40 group-hover:text-primary transition-colors duration-500">Luxury Eyewear</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 group ${
                pathname === l.href ? "text-primary" : "text-[#1e293b]/70 hover:text-primary"
              }`}
            >
              {l.label}
              <span className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-1 bg-primary rounded-full transition-all duration-300 ${
                pathname === l.href ? "w-4" : "w-0 group-hover:w-6 opacity-0 group-hover:opacity-100"
              }`} />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          {session ? (
            <Link href="/admin">
              <Button variant="ghost" className="hidden md:flex gap-2 text-navy hover:text-primary font-black text-[10px] uppercase tracking-widest">
                <ShieldCheck className="h-4 w-4" /> Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="ghost" size="icon" className="text-[#64748b] hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-300 active:scale-90">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}
          
          <CartDrawer />
          <div className="w-px h-6 bg-slate-200 mx-2 hidden md:block" />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-muted-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6 text-primary" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-white animate-in slide-in-from-top-4 duration-300 shadow-2xl overflow-hidden rounded-b-3xl">
          <nav className="p-8 flex flex-col gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className={`text-lg font-bold font-serif transition-all flex items-center justify-between group ${
                  pathname === l.href ? "text-primary ml-4" : "text-[#1e293b]/70"
                }`}
              >
                <span>{l.label}</span>
                {pathname === l.href && (
                  <div className="h-2 w-2 rounded-full bg-primary shadow-lg shadow-primary/50" />
                )}
                {pathname !== l.href && (
                  <Eye className="h-4 w-4 opacity-0 group-hover:opacity-40 transition-opacity" />
                )}
              </Link>
            ))}

            {session && (
              <Link href="/admin" onClick={() => setMobileOpen(false)}>
                <Button className="w-full bg-navy text-white font-black uppercase tracking-widest text-[10px] h-12 rounded-xl mb-4 gap-2">
                  <ShieldCheck className="h-4 w-4" /> Admin Dashboard
                </Button>
              </Link>
            )}

            <div className="pt-6 border-t border-slate-100">
               <Link href="/shop" onClick={() => setMobileOpen(false)}>
                <Button className="w-full bg-primary text-white font-black uppercase tracking-widest text-[10px] h-12 rounded-xl shadow-xl shadow-primary/20">
                  Explore Collection
                </Button>
               </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
