"use client";

import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter 
} from "@/components/ui/sheet";
import { ShoppingCart, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const CartDrawer = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const router = useRouter();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-[#64748b] hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-300 active:scale-90 relative group">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-black shadow-lg shadow-primary/40 border-2 border-white group-hover:scale-110 transition-transform">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col border-l-0 shadow-2xl">
        <SheetHeader className="p-6 bg-navy text-white">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-black uppercase tracking-tight text-white flex items-center gap-3">
              <ShoppingBag className="h-6 w-6 text-primary" />
              Your Selection
            </SheetTitle>
            <Badge className="bg-primary/20 hover:bg-primary/30 text-primary border-none font-black text-[10px]">
              {totalItems} Items
            </Badge>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-hidden">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-10 text-center space-y-6">
              <div className="h-24 w-24 rounded-full bg-slate-50 flex items-center justify-center animate-bounce">
                <ShoppingCart className="h-10 w-10 text-slate-200" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Your bag is empty</h3>
                <p className="text-sm font-medium text-slate-400 mt-2 italic">Luxury awaits your discovery.</p>
              </div>
              <SheetTrigger asChild>
                <Button 
                  onClick={() => router.push("/shop")}
                  className="bg-navy hover:bg-navy/90 text-white font-black uppercase tracking-widest text-[10px] h-12 rounded-xl px-8 shadow-xl shadow-navy/10 group"
                >
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </SheetTrigger>
            </div>
          ) : (
            <ScrollArea className="h-full">
              <div className="p-6 space-y-6">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.lensType}`} className="flex gap-4 group">
                    <div className="h-24 w-20 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0 relative">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-black text-slate-900 leading-tight pr-4">{item.product.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.product.id, item.lensType)}
                            className="text-slate-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{item.lensType}</p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center bg-slate-100/50 rounded-xl p-1 border border-slate-100">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.lensType, item.quantity - 1)}
                            className="h-7 w-7 flex items-center justify-center text-slate-500 hover:text-navy transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-black text-slate-900">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.lensType, item.quantity + 1)}
                            className="h-7 w-7 flex items-center justify-center text-slate-500 hover:text-navy transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="text-sm font-black text-navy tracking-tight">৳{(item.product.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="p-6 bg-slate-50 border-t flex-col !flex-row sm:flex-col gap-4">
            <div className="w-full space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subtotal</span>
                <span className="text-lg font-black text-navy tracking-tight">৳{totalPrice.toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium italic">Shipping & taxes calculated at checkout.</p>
              
              <SheetTrigger asChild>
                <Button 
                  onClick={() => router.push("/checkout")}
                  className="w-full bg-primary hover:bg-primary/90 text-navy font-black uppercase tracking-widest text-[11px] h-14 rounded-2xl shadow-xl shadow-primary/20 active:scale-[0.98] transition-all"
                >
                  Proceed to Checkout
                </Button>
              </SheetTrigger>
              
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  onClick={() => router.push("/cart")}
                  className="w-full text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary hover:bg-transparent transition-colors py-2"
                >
                  View Full Details
                </Button>
              </SheetTrigger>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
