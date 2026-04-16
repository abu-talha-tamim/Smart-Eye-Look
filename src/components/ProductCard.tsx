"use client";

import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Eye, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} Added!`, {
      description: "Available in your cart.",
      style: { background: "#06152a", color: "white", border: "1px solid #1e2e4a" }
    });
  };

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-navy/5 group-hover:-translate-y-2">
        {/* Product Image Stack */}
        <div className="aspect-[4/5] relative overflow-hidden bg-slate-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Action Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/60 to-transparent">
             <Button 
               onClick={handleQuickAdd}
               className="w-full bg-white text-navy hover:bg-white/90 rounded-2xl h-12 font-black uppercase tracking-widest text-[10px] gap-2 shadow-2xl"
             >
               <ShoppingCart className="h-4 w-4" /> Quick Add
             </Button>
          </div>

          <div className="absolute top-4 left-4">
             <span className="bg-navy/80 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                Signature
             </span>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-6">
          <div className="flex items-center gap-1 mb-3">
             <div className="flex text-amber-500">
               {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-2.5 w-2.5 fill-current" />)}
             </div>
             <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest ml-1">5.0</span>
          </div>
          
          <h3 className="text-lg font-black text-navy leading-none mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">@smarteyelook elite</p>
          
          <div className="flex items-center justify-between pt-4 border-t border-slate-50">
             <div className="flex items-center gap-2">
                <span className="text-xl font-black text-navy tracking-tighter">৳{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                   <span className="text-xs text-slate-300 line-through font-bold italic">৳{product.originalPrice.toLocaleString()}</span>
                )}
             </div>
             <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Eye className="h-4 w-4" />
             </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
