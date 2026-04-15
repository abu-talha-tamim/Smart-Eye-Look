import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const FeaturedCollections = () => {
  return (
    <section className="bg-secondary/30 relative overflow-hidden section-padding">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--accent)_0%,_transparent_70%)] opacity-[0.03] pointer-events-none" />
      
      <div className="container relative py-24 md:py-32">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="text-secondary-foreground/60 text-xs uppercase tracking-[0.4em] font-bold mb-4">Curated Selection</span>
          <h2 className="text-4xl md:text-6xl font-serif text-navy mb-6">Featured Collections</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          
          <Link href="/shop" className="text-sm font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2 group hover:translate-x-2 transition-transform duration-300">
            Discover All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-y-16">
          {products.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
