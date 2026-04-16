"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ChevronLeft, Plus, Minus, CheckCircle, ShieldCheck, ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedLens, setSelectedLens] = useState("Single Vision");
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (res.ok) {
          setProduct(data);
        }
      } catch (error) {
        console.error("Failed to fetch product details", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#06152a] flex flex-col items-center justify-center">
        <div className="h-10 w-10 border-4 border-white/5 border-t-primary rounded-full animate-spin mb-4" />
      </div>
    );
  }

  if (!product) return null;

  const handleAddToCart = () => {
    // Add items based on selected quantity
    for (let i = 0; i < quantity; i++) {
        addToCart(product, selectedLens);
    }
    
    toast.info("Redirecting to Checkout...");
    
    // Explicitly push to checkout
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-[#06152a] text-white selection:bg-primary/20">
      <div className="container max-w-5xl py-12">
        {/* Simple Navigation */}
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-white/30 hover:text-white transition-colors text-[9px] font-black uppercase tracking-[0.3em] mb-12"
        >
          <ChevronLeft className="h-4 w-4" /> Go Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: Product Image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-white shadow-2xl">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-cover" 
              />
              <Badge className="absolute top-6 left-6 bg-navy text-white px-4 py-1.5 rounded-xl border-none text-[8px] font-black uppercase tracking-widest shadow-xl">
                 New Arrival
              </Badge>
            </div>
            
            <div className="flex gap-3 mt-6">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? "border-primary scale-105" : "border-transparent opacity-30 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Concise Details */}
          <div className="lg:col-span-6 flex flex-col pt-4">
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 text-white">{product.name}</h1>
              <div className="flex items-center gap-4">
                 <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-3 w-3 fill-current" />)}
                 </div>
                 <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Premium Collection</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-8">
               <span className="text-4xl font-black text-white tracking-tighter">৳{product.price.toLocaleString()}</span>
               {product.originalPrice && (
                 <span className="text-lg text-white/10 line-through font-bold">৳{product.originalPrice.toLocaleString()}</span>
               )}
            </div>

            <p className="text-sm text-white/50 leading-relaxed font-medium mb-10 max-w-md">
              {product.description}
            </p>

            {/* Compact Lens Selector - Aligned Left */}
            <div className="mb-10">
              <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em] mb-4 text-left">Lens Options</h3>
              <div className="flex flex-wrap gap-2 justify-start">
                {product.lensOptions.map(lens => (
                  <button 
                    key={lens}
                    onClick={() => setSelectedLens(lens)}
                    className={`py-2 px-4 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                      selectedLens === lens 
                      ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                      : "bg-white/5 text-white/50 border-white/5 hover:bg-white/10"
                    }`}
                  >
                    {lens}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Actions */}
            <div className="space-y-6 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between">
                 <div className="flex items-center bg-white/5 rounded-xl p-1 border border-white/5">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-9 w-9 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-10 text-center font-black text-xs">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-9 w-9 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-black text-primary tracking-tighter">Total: ৳{(product.price * quantity).toLocaleString()}</p>
                 </div>
              </div>

              <Button 
                onClick={handleAddToCart}
                className="w-full h-14 rounded-2xl bg-white text-navy hover:bg-white/90 font-black uppercase tracking-[0.2em] text-[10px] gap-3 active:scale-95 shadow-2xl"
              >
                <ShoppingCart className="h-4 w-4" /> Buy Now 
              </Button>
            </div>

            {/* Feature List Restored & Enlarged */}
            <div className="mt-10 space-y-3">
               <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-4">What's Included</h3>
               <div className="grid grid-cols-2 gap-y-3">
                 {product.included.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-[11px] font-black text-white/50 uppercase tracking-widest">
                       <ShieldCheck className="h-4 w-4 text-primary" /> {item}
                    </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
