import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import heroBanner from "@/assets/hero-banner.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
import catMens from "@/assets/cat-mens.jpg";
import catWomens from "@/assets/cat-womens.jpg";
import catKids from "@/assets/cat-kids.jpg";
import catBluecut from "@/assets/cat-bluecut.jpg";
import catPrescription from "@/assets/cat-prescription.jpg";
import catContactLenses from "@/assets/cat-contact-lenses.jpg";
import { ArrowRight, Shield, Truck, HeadphonesIcon } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import anime from "animejs";
import { useRef } from "react";

const heroSlides = [
  {
    image: heroBanner,
    headline: "See the World Clearly with SmartEyeLook",
    subtext: "Premium eyewear with custom prescription lenses. Style meets clarity.",
    cta: "Shop Now",
  },
  {
    image: heroSlide2,
    headline: "Discover Your Perfect Style",
    subtext: "Explore our curated collection of designer frames for every occasion.",
    cta: "Shop Now",
  },
  {
    image: heroSlide3,
    headline: "Protect Your Eyes, Enhance Your Look",
    subtext: "Blue cut lenses that shield your eyes while keeping you stylish.",
    cta: "Shop Now",
  },
];

const categories = [
  { name: "Men's Glasses", image: catMens, slug: "mens" },
  { name: "Women's Glasses", image: catWomens, slug: "womens" },
  { name: "Kids Glasses", image: catKids, slug: "kids" },
  { name: "Blue Cut Glasses", image: catBluecut, slug: "bluecut" },
  { name: "Prescription Glasses", image: catPrescription, slug: "prescription" },
  { name: "Contact Lenses", image: catContactLenses, slug: "contact-lenses" },
];

const features = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over ৳2000" },
  { icon: Shield, title: "1 Year Warranty", desc: "On all frames" },
  { icon: HeadphonesIcon, title: "24/7 Support", desc: "Expert assistance" },
];

const AnimatedHeadline = ({ text, isActive }: { text: string; isActive: boolean }) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const letters = text.split("");

  useEffect(() => {
    if (!containerRef.current || !isActive) return;
    
    // Reset opacity of letters before starting
    const letterEls = containerRef.current.querySelectorAll('.letter');
    anime.set(letterEls, { opacity: 0 });

    const timeline = anime.timeline({ loop: false })
      .add({
        targets: containerRef.current.querySelector('.line'),
        scaleY: [0, 1],
        opacity: [0.5, 1],
        easing: "easeOutExpo",
        duration: 900
      })
      .add({
        targets: containerRef.current.querySelector('.line'),
        translateX: [0, (containerRef.current.querySelector('.letters')?.getBoundingClientRect().width || 0) + 10],
        easing: "easeOutExpo",
        duration: 1200,
        delay: 200
      })
      .add({
        targets: letterEls,
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 800,
        offset: '-=1000',
        delay: (el, i) => 50 * (i + 1)
      })
      .add({
        targets: containerRef.current.querySelector('.line'),
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo"
      });

    return () => {
      timeline.pause();
    };
  }, [isActive, text]);

  return (
    <h1 
      ref={containerRef}
      className={`ml11 text-4xl md:text-6xl font-bold font-serif leading-tight mb-8 text-white min-h-[1.2em] drop-shadow-2xl ${!isActive && 'opacity-0'}`}
    >
      <span className="text-wrapper relative flex items-center pr-4">
        <span className="line line1"></span>
        <span className="letters flex flex-wrap">
          {letters.map((char, i) => (
            <span key={i} className="letter inline-block" style={{ opacity: 0 }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      </span>
    </h1>
  );
};

const Index = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => api?.scrollTo(index),
    [api]
  );

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <section className="relative">
        <Carousel
          setApi={setApi}
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
          className="w-full"
        >
          <CarouselContent>
            {heroSlides.map((slide, i) => (
              <CarouselItem key={i}>
                <div className="relative h-[600px] md:h-[800px] overflow-hidden">
                  <div className="absolute inset-0">
                    <img
                      src={slide.image}
                      alt={slide.headline}
                      className={`w-full h-full object-cover ${current === i ? "animate-ken-burns" : ""}`}
                      width={1920}
                      height={800}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/40 to-transparent" />
                  </div>
                  <div className="relative container h-full flex items-center text-navy-foreground">
                    <div className="max-w-2xl bg-black/10 backdrop-blur-[2px] p-8 md:p-12 rounded-[2.5rem] border border-white/10">
                      <AnimatedHeadline 
                        text={slide.headline} 
                        isActive={current === i} 
                      />
                      <p
                        key={`p-${current}`}
                        className={`text-lg md:text-xl text-white/90 font-medium mb-10 max-w-lg ${
                          current === i
                            ? "animate-slow-slide-right [animation-delay:800ms]"
                            : "opacity-0"
                        }`}
                      >
                        {slide.subtext}
                      </p>
                      <div
                        key={`b-${current}`}
                        className={current === i ? "animate-slow-slide-right [animation-delay:1200ms]" : "opacity-0"}
                      >
                        <Link to="/shop">
                          <Button size="lg" className="h-16 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-lg font-bold shadow-2xl shadow-primary/30 group">
                            <span className="flex items-center gap-3">
                              {slide.cta} 
                              <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                            </span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Nav arrows */}
          <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-background/30 backdrop-blur border-none text-navy-foreground hover:bg-background/50" />
          <CarouselNext className="right-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-background/30 backdrop-blur border-none text-navy-foreground hover:bg-background/50" />

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === i ? "w-8 bg-primary" : "w-2 bg-background/50"
                }`}
              />
            ))}
          </div>
        </Carousel>
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/shop?category=${c.slug}`}
              className="group text-center"
            >
              <div className="aspect-square rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-all duration-300 mx-auto w-36 md:w-40 group-hover:shadow-lg group-hover:shadow-primary/20">
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
      <section className="bg-secondary/30 relative overflow-hidden section-padding">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--accent)_0%,_transparent_70%)] opacity-[0.03] pointer-events-none" />
        
        <div className="container relative py-24 md:py-32">
          <div className="flex flex-col items-center text-center mb-16 md:mb-24">
            <span className="text-secondary-foreground/60 text-xs uppercase tracking-[0.4em] font-bold mb-4">Curated Selection</span>
            <h2 className="text-4xl md:text-6xl font-serif text-navy mb-6">Featured Collections</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            
            <Link to="/shop" className="mt-8 group">
              <span className="text-sm font-bold tracking-widest uppercase flex items-center gap-2 group-hover:gap-4 transition-all">
                Discover All <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-y-16">
            {products.slice(0, 8).map((p) => (
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
