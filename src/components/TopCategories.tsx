import Link from "next/link";

const categories = [
  { name: "Men's Glasses", image: "/assets/cat-mens.jpg", slug: "mens" },
  { name: "Women's Glasses", image: "/assets/cat-womens.jpg", slug: "womens" },
  { name: "Kids Glasses", image: "/assets/cat-kids.jpg", slug: "kids" },
  { name: "Sunglasses", image: "/assets/cat-sunglasses.jpg", slug: "sunglasses" },
  { name: "Prescription Glasses", image: "/assets/cat-prescription.jpg", slug: "prescription" },
  { name: "Contact Lenses", image: "/assets/cat-contact-lenses.jpg", slug: "contact-lenses" },
];

const TopCategories = () => {
  return (
    <section className="container py-16 md:py-24">
      <h2 className="text-3xl font-bold text-foreground mb-2">Top Categories</h2>
      <p className="text-muted-foreground mb-10">Find the perfect eyewear for every need</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/shop?category=${c.slug}`}
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
  );
};

export default TopCategories;
