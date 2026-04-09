import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import heroBanner from "@/assets/hero-banner.jpg";
import catMens from "@/assets/cat-mens.jpg";
import catWomens from "@/assets/cat-womens.jpg";
import catKids from "@/assets/cat-kids.jpg";
import catBluecut from "@/assets/cat-bluecut.jpg";
import catPrescription from "@/assets/cat-prescription.jpg";
import { ArrowRight, Shield, Truck, HeadphonesIcon } from "lucide-react";

const categories = [
  { name: "Men's Glasses", image: catMens, slug: "mens" },
  { name: "Women's Glasses", image: catWomens, slug: "womens" },
  { name: "Kids Glasses", image: catKids, slug: "kids" },
  { name: "Blue Cut Glasses", image: catBluecut, slug: "bluecut" },
  { name: "Prescription Glasses", image: catPrescription, slug: "prescription" },
];

const features = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over ৳2000" },
  { icon: Shield, title: "1 Year Warranty", desc: "On all frames" },
  { icon: HeadphonesIcon, title: "24/7 Support", desc: "Expert assistance" },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBanner} alt="Premium eyewear" className="w-full h-full object-cover" width={1920} height={800} />
          <div className="absolute inset-0 bg-navy/60" />
        </div>
        <div className="relative container py-32 md:py-44 text-navy-foreground">
          <div className="max-w-xl animate-slide-up">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              See the World Clearly with SmartEyeLook
            </h1>
            <p className="text-lg md:text-xl opacity-80 mb-8">
              Premium eyewear with custom prescription lenses. Style meets clarity.
            </p>
            <Link to="/shop">
              <Button size="lg" className="gap-2 text-base px-8">
                Shop Now <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="border-b bg-secondary">
        <div className="container py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="flex items-center gap-3">
                <f.icon className="h-8 w-8 text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm text-foreground">{f.title}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Categories */}
      <section className="container py-16 md:py-24">
        <h2 className="text-3xl font-bold text-foreground mb-2">Top Categories</h2>
        <p className="text-muted-foreground mb-10">Find the perfect eyewear for every need</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/shop?category=${c.slug}`}
              className="group text-center"
            >
              <div className="aspect-square rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors mx-auto w-36 md:w-44">
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <p className="mt-3 text-sm font-medium text-foreground group-hover:text-primary transition-colors">{c.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-secondary">
        <div className="container py-16 md:py-24">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Our bestselling eyewear collection</p>
            </div>
            <Link to="/shop">
              <Button variant="outline" className="gap-2">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 6).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary">
        <div className="container py-16 text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need a Prescription?</h2>
          <p className="text-lg opacity-80 mb-8 max-w-lg mx-auto">
            Upload your prescription or enter it manually — we'll craft your perfect lenses.
          </p>
          <Link to="/shop">
            <Button size="lg" variant="secondary" className="gap-2 text-base">
              Browse Prescription Glasses <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
