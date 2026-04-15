import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart`, {
      style: {
        background: 'hsla(var(--primary))',
        color: 'white',
        border: 'none',
      }
    });
  };

  return (
    <Link href={`/product/${product.id}`} className="group block relative perspective-1000">
      <div className="relative bg-white rounded-[2rem] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] group-hover:-translate-y-3 group-hover:rotate-x-2 group-hover:rotate-y-2 border border-black/5">
        {/* Product Image Wrapper */}
        <div className="relative aspect-[4/5] overflow-hidden bg-[#f9f9f9]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-115"
          />
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-navy text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                New
              </span>
            )}
            {product.discount && (
              <span className="bg-amber-400 text-navy text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Quick Add Overlay */}
          <div className="absolute inset-0 bg-navy/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
            <Button 
              onClick={handleAdd} 
              className="w-auto h-12 px-6 rounded-full bg-navy hover:bg-navy/90 text-white shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500 font-bold gap-2 scale-90 hover:scale-100"
            >
              <ShoppingCart className="h-4 w-4" /> 
              <span className="text-xs uppercase tracking-wider">Quick Add</span>
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5 md:p-6 text-center">
          <p className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-2">{product.category || 'Luxury Collection'}</p>
          <h3 className="font-serif text-lg md:text-xl text-navy group-hover:text-primary transition-colors duration-300 line-clamp-1 mb-3">
            {product.name}
          </h3>
          
          <div className="flex flex-col items-center gap-1">
            <span className="text-lg md:text-xl font-bold text-navy h-8">
              ৳{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs md:text-sm text-muted-foreground/60 line-through font-medium">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
