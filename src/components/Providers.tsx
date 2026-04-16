"use client";

import { CartProvider } from "@/context/CartContext";
import { SessionProvider } from "next-auth/react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <TooltipProvider>
        <CartProvider>
          {children}
          <Toaster />
          <Sonner />
        </CartProvider>
      </TooltipProvider>
    </SessionProvider>
  );
}
