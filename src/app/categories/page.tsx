import Link from "next/link";

const categories = [
  { name: "Men's Glasses", image: "/assets/cat-mens.jpg", slug: "mens", desc: "Classic and modern frames for men" },
  { name: "Women's Glasses", image: "/assets/cat-womens.jpg", slug: "womens", desc: "Elegant and stylish frames for women" },
  { name: "Kids Glasses", image: "/assets/cat-kids.jpg", slug: "kids", desc: "Fun and durable frames for children" },
  { name: "Sunglasses", image: "/assets/cat-sunglasses.jpg", slug: "sunglasses", desc: "Premium sun protection and style" },
  { name: "Prescription Glasses", image: "/assets/cat-prescription.jpg", slug: "prescription", desc: "Custom lenses for clear vision" },
  { name: "Contact Lenses", image: "/assets/cat-contact-lenses.jpg", slug: "contact-lenses", desc: "Comfortable daily & monthly lenses" },
];

export default function CategoriesPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold text-foreground mb-2">All Categories</h1>
      <p className="text-muted-foreground mb-10">Browse our complete eyewear collection</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c) => (
          <Link key={c.slug} href={`/shop?category=${c.slug}`} className="group block">
            <div className="rounded-lg overflow-hidden border transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30">
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
}
