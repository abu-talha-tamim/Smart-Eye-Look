"use client";

import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { Button } from "@/components/ui/button";

const categoryLabels: Record<string, string> = {
  all: "All",
  mens: "Men's",
  womens: "Women's",
  kids: "Kids",
  sunglasses: "Sunglasses",
  prescription: "Prescription",
};

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("category") || "all";
  const [category, setCategory] = useState(initialCat);

  const filtered = category === "all" ? products : products.filter((p) => p.category === category);

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold text-foreground mb-2">Shop Eyewear</h1>
      <p className="text-muted-foreground mb-8">Find your perfect pair</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {Object.entries(categoryLabels).map(([key, label]) => (
          <Button
            key={key}
            variant={category === key ? "default" : "outline"}
            size="sm"
            onClick={() => setCategory(key)}
          >
            {label}
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-center py-20">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={<div className="container py-20 text-center">Loading collection...</div>}>
      <ShopContent />
    </Suspense>
  );
}
