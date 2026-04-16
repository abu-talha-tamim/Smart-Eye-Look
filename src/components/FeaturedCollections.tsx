"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/data/products";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const FeaturedCollections = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (Array.isArray(data)) {
          setProducts(data.slice(0, 4)); // Show only 4 featured
        }
      } catch (error) {
        console.error("Failed to load featured collection");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return null;

  return (
    <section className="py-24 bg-[#fcfcfd] overflow-hidden">
      <div className="container px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
               <div className="h-px w-12 bg-primary" />
               <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Designer Series</span>
               <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-navy leading-none tracking-tight mb-4">Elite Selection</h2>
            <p className="text-slate-500 font-medium leading-relaxed max-w-sm">Hand-picked luxury eyewear curated for your unique optical signature.</p>
          </div>
          
          <Link href="/shop">
            <Button variant="ghost" className="group text-navy hover:text-primary gap-2 font-black uppercase text-[10px] tracking-widest px-0">
               Explore Full Boutique <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <div key={p.id} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
               <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
