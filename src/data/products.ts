import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  description: string;
  inStock: boolean;
  lensOptions: string[];
  included: string[];
  sku: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Round Frame",
    price: 1299,
    originalPrice: 1999,
    image: product1,
    images: [product1, product1, product1, product1],
    category: "mens",
    description: "Timeless round frame crafted with lightweight acetate for all-day comfort. Perfect for a sophisticated, intellectual look.",
    inStock: true,
    lensOptions: ["Single Vision", "Blue Cut", "Bifocal", "Progressive"],
    included: ["Premium Box", "Cleaning Kit", "Warranty Card", "Microfiber Cloth"],
    sku: "SEL001",
  },
  {
    id: "2",
    name: "Gold Aviator Frame",
    price: 1899,
    image: product2,
    images: [product2, product2, product2, product2],
    category: "mens",
    description: "Elegant gold aviator frame with adjustable nose pads. A classic style that never goes out of fashion.",
    inStock: true,
    lensOptions: ["Single Vision", "Blue Cut", "Bifocal", "Progressive"],
    included: ["Premium Box", "Cleaning Kit", "Warranty Card", "Microfiber Cloth"],
    sku: "SEL002",
  },
  {
    id: "3",
    name: "Tortoise Rectangle Frame",
    price: 1499,
    originalPrice: 2199,
    image: product3,
    images: [product3, product3, product3, product3],
    category: "womens",
    description: "Beautiful tortoiseshell pattern rectangle frame. Adds warmth and character to any outfit.",
    inStock: true,
    lensOptions: ["Single Vision", "Blue Cut", "Bifocal", "Progressive"],
    included: ["Premium Box", "Cleaning Kit", "Warranty Card", "Microfiber Cloth"],
    sku: "SEL003",
  },
  {
    id: "4",
    name: "Titanium Half-Rim Frame",
    price: 2499,
    image: product4,
    images: [product4, product4, product4, product4],
    category: "prescription",
    description: "Ultra-lightweight titanium half-rim frame for a barely-there feel. Ideal for all-day wear.",
    inStock: true,
    lensOptions: ["Single Vision", "Blue Cut", "Bifocal", "Progressive"],
    included: ["Premium Box", "Cleaning Kit", "Warranty Card", "Microfiber Cloth"],
    sku: "SEL004",
  },
  {
    id: "5",
    name: "Crystal Clear Frame",
    price: 999,
    image: product5,
    images: [product5, product5, product5, product5],
    category: "womens",
    description: "Minimalist transparent frame that goes with everything. Lightweight and comfortable for daily use.",
    inStock: true,
    lensOptions: ["Single Vision", "Blue Cut", "Bifocal", "Progressive"],
    included: ["Premium Box", "Cleaning Kit", "Warranty Card", "Microfiber Cloth"],
    sku: "SEL005",
  },
  {
    id: "6",
    name: "Electric Blue Square Frame",
    price: 1599,
    originalPrice: 2099,
    image: product6,
    images: [product6, product6, product6, product6],
    category: "bluecut",
    description: "Bold blue square frame with built-in blue light filtering. Perfect for screen-heavy lifestyles.",
    inStock: true,
    lensOptions: ["Single Vision", "Blue Cut", "Bifocal", "Progressive"],
    included: ["Premium Box", "Cleaning Kit", "Warranty Card", "Microfiber Cloth"],
    sku: "SEL006",
  },
];
