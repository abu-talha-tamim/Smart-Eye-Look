"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ShoppingCart, Package, ChevronRight, CheckCircle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@/data/products";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
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
      <div className="container py-20 flex flex-col items-center">
        <div className="h-12 w-12 border-4 border-slate-100 border-t-primary rounded-full animate-spin mb-4" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Loading Eyewear Details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
        <Link href="/shop"><Button>Back to Shop</Button></Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedLens);
    toast.success(`${product.name} added to cart`);
    router.push("/checkout");
  };

  const handleOrderWhatsApp = () => {
    const msg = encodeURIComponent(`Hi, I want to order: ${product.name} (${selectedLens}) - ৳${product.price}`);
    window.open(`https://wa.me/8801234567890?text=${msg}`, "_blank");
  };

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy font-bold">{product.name}</span>
        </div>
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="w-fit gap-2 text-navy font-bold hover:bg-navy/5"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Collection
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="aspect-square rounded-lg overflow-hidden bg-secondary border mb-4">
            <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" width={512} height={512} />
          </div>
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${selectedImage === i ? "border-primary" : "border-border"}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" width={80} height={80} />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
          <p className="text-sm text-muted-foreground mb-4">SKU: {product.sku}</p>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-foreground">৳{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">৳{product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          {product.inStock && (
            <span className="inline-flex items-center gap-1 text-sm text-success font-medium border border-success/20 rounded-full px-3 py-1 mb-6">
              <CheckCircle className="h-4 w-4" /> In Stock
            </span>
          )}

          <p className="text-muted-foreground mb-8 leading-relaxed">{product.description}</p>

          {/* Lens Selection */}
          <div className="mb-8">
            <h3 className="font-semibold text-foreground mb-3">Select Lens Type</h3>
            <div className="flex flex-wrap gap-2">
              {product.lensOptions.map((lens) => (
                <Button
                  key={lens}
                  variant={selectedLens === lens ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLens(lens)}
                >
                  {lens}
                </Button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Button onClick={handleAddToCart} size="lg" className="flex-1 gap-2">
              <ShoppingCart className="h-5 w-5" /> Add to Cart
            </Button>
            <Button onClick={handleAddToCart} variant="secondary" size="lg" className="flex-1 gap-2 bg-foreground text-background hover:bg-foreground/90">
              <Package className="h-5 w-5" /> Order Now
            </Button>
          </div>

          <Button onClick={handleOrderWhatsApp} size="lg" className="w-full bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground gap-2">
            Order on WhatsApp
          </Button>

          {/* Included */}
          <div className="mt-10 p-6 bg-secondary rounded-lg">
            <h3 className="font-semibold text-foreground mb-4">What's Included</h3>
            <ul className="space-y-2">
              {product.included.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-success" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
