import catMens from "@/assets/cat-mens.jpg";
import catWomens from "@/assets/cat-womens.jpg";
import catKids from "@/assets/cat-kids.jpg";
import catBluecut from "@/assets/cat-bluecut.jpg";
import catPrescription from "@/assets/cat-prescription.jpg";
import { Link } from "react-router-dom";

const categories = [
  { name: "Men's Glasses", image: catMens, slug: "mens", desc: "Classic and modern frames for men" },
  { name: "Women's Glasses", image: catWomens, slug: "womens", desc: "Elegant and stylish frames for women" },
  { name: "Kids Glasses", image: catKids, slug: "kids", desc: "Fun and durable frames for children" },
  { name: "Blue Cut Glasses", image: catBluecut, slug: "bluecut", desc: "Protect your eyes from blue light" },
  { name: "Prescription Glasses", image: catPrescription, slug: "prescription", desc: "Custom lenses for clear vision" },
];

const Categories = () => (
  <div className="container py-10">
    <h1 className="text-3xl font-bold text-foreground mb-2">All Categories</h1>
    <p className="text-muted-foreground mb-10">Browse our complete eyewear collection</p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((c) => (
        <Link key={c.slug} to={`/shop?category=${c.slug}`} className="group block">
          <div className="rounded-lg overflow-hidden border transition-shadow hover:shadow-lg">
            <div className="aspect-video overflow-hidden bg-secondary">
              <img src={c.image} alt={c.name} loading="lazy" width={512} height={512} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{c.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{c.desc}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default Categories;
