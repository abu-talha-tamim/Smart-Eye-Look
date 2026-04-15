"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Truck, HeadphonesIcon } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import anime from "animejs";
import { useRef } from "react";
import TopCategories from "@/components/TopCategories";
import FeaturedCollections from "@/components/FeaturedCollections";
import PrescriptionSection from "@/components/PrescriptionSection";

// Hero section uses absolute paths for static assets from the /public folder

const heroSlides = [
  {
    image: "/assets/hero-banner.jpg", // Switch to absolute paths for stability in Next.js public/
    headline: "See the World Clearly with SmartEyeLook",
    subtext: "Premium eyewear with custom prescription lenses. Style meets clarity.",
    cta: "Shop Now",
  },
  {
    image: "/assets/hero-slide-2.jpg",
    headline: "Discover Your Perfect Style",
    subtext: "Explore our curated collection of designer frames for every occasion.",
    cta: "Shop Now",
  },
  {
    image: "/assets/hero-slide-3.jpg",
    headline: "Protect Your Eyes, Enhance Your Look",
    subtext: "Luxury sunglasses designed for optimal protection and refined style.",
    cta: "Shop Now",
  },
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

export default function Home() {
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
                        <Link href="/shop">
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

          <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-background/30 backdrop-blur border-none text-navy-foreground hover:bg-background/50" />
          <CarouselNext className="right-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-background/30 backdrop-blur border-none text-navy-foreground hover:bg-background/50" />

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

      <TopCategories />
      <FeaturedCollections />
      <PrescriptionSection />
    </div>
  );
}
