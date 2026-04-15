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
    image: "/assets/product-1.jpg",
    images: ["/assets/product-1.jpg", "/assets/product-1.jpg", "/assets/product-1.jpg", "/assets/product-1.jpg"],
    category: "mens",
    description: "Timeless round frame crafted with lightweight acetate for all-day comfort. Perfect for a sophisticated, intellectual look.",
    inStock: true,
    lensOptions: ["Single Vision", "Sunglasses", "Bifocal", "Progressive"],
    included: ["Premium Box", "Cleaning Kit", "Warranty Card", "Microfiber Cloth"],
    sku: "SEL001",
  },
  {
    id: "2",
    name: "Gold Aviator Frame",
    price: 1899,
    image: "/assets/product-2.jpg",
    images: ["/assets/product-2.jpg", "/assets/product-2.jpg", "/assets/product-2.jpg", "/assets/product-2.jpg"],
    category: "mens",
    description: "Elegant gold aviator frame with adjustable nose pads. A classic style that never goes out of fashion.",
    inStock: true,
    lensOptions: ["Single Vision", "Sunglasses", "Bifocal", "Progressive"],
    included: ["Premium Box", "Cleaning Kit", "Warranty Card", "Microfiber Cloth"],
    sku: "SEL002",
  },
  {
    id: "3",
    name: "Tortoise Rectangle Frame",
    price: 1499,
    originalPrice: 2199,
    image: "/assets/product-3.jpg",
    images: ["/assets/product-3.jpg", "/assets/product-3.jpg", "/assets/product-3.jpg", "/assets/product-3.jpg"],
    category: "womens",
    description: "Beautiful tortoiseshell pattern rectangle frame. Adds warmth and character to any outfit.",
    inStock: true,
    lensOptions: ["Single Vision", "Sunglasses", "Bifocal", "Progressive"],
    included: ["Premium Box", "Cleaning Kit", "Warranty Card", "Microfiber Cloth"],
    sku: "SEL003",
  },
  {
    id: "4",
    name: "Titanium Half-Rim Frame",
    price: 2499,
    image: "/assets/product-4.jpg",
    images: ["/assets/product-4.jpg", "/assets/product-4.jpg", "/assets/product-4.jpg", "/assets/product-4.jpg"],
    category: "prescription",
    description: "Ultra-lightweight titanium half-rim frame for a barely-there feel. Ideal for all-day wear.",
    inStock: true,
    lensOptions: ["Single Vision", "Sunglasses", "Bifocal", "Progressive"],
    included: ["Premium Box", "Cleaning Kit", "Warranty Card", "Microfiber Cloth"],
    sku: "SEL004",
  },
  {
    id: "5",
    name: "Crystal Clear Frame",
    price: 999,
    image: "/assets/product-5.jpg",
    images: ["/assets/product-5.jpg", "/assets/product-5.jpg", "/assets/product-5.jpg", "/assets/product-5.jpg"],
    category: "womens",
    description: "Minimalist transparent frame that goes with everything. Lightweight and comfortable for daily use.",
    inStock: true,
    lensOptions: ["Single Vision", "Sunglasses", "Bifocal", "Progressive"],
    included: ["Premium Box", "Cleaning Kit", "Warranty Card", "Microfiber Cloth"],
    sku: "SEL005",
  },
  {
    id: "6",
    name: "Ocean Tinted Sunglasses",
    price: 1599,
    originalPrice: 2099,
    image: "/assets/product-6.jpg",
    images: ["/assets/product-6.jpg", "/assets/product-6.jpg", "/assets/product-6.jpg", "/assets/product-6.jpg"],
    category: "sunglasses",
    description: "Bold square frame with premium UV protection. Perfect for screen-heavy lifestyles and sun-soaked days.",
    inStock: true,
    lensOptions: ["Single Vision", "Sunglasses", "Bifocal", "Progressive"],
    included: ["Premium Box", "Cleaning Kit", "Warranty Card", "Microfiber Cloth"],
    sku: "SEL006",
  },
];
