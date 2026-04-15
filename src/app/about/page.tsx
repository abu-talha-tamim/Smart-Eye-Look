import { Eye, Shield, Heart, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold text-foreground mb-2">About SmartEyeLook</h1>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        We believe everyone deserves clear vision with stylish, affordable eyewear. Our mission is to make premium prescription glasses accessible to all.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {[
          { icon: Eye, title: "Crystal Clear Vision", desc: "Precision-crafted lenses for perfect clarity" },
          { icon: Shield, title: "Quality Guaranteed", desc: "1-year warranty on all frames and lenses" },
          { icon: Heart, title: "Customer First", desc: "Dedicated support for every customer" },
          { icon: Award, title: "Premium Materials", desc: "Only the finest materials for lasting comfort" },
        ].map((v) => (
          <div key={v.title} className="p-6 border rounded-lg bg-card text-center">
            <v.icon className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">{v.title}</h3>
            <p className="text-sm text-muted-foreground">{v.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-secondary rounded-lg p-10 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">Our Story</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Founded in 2024, SmartEyeLook was born from a simple idea: premium eyewear shouldn't come with a premium price tag.
          We work directly with top manufacturers to bring you the best frames and lenses at prices that make sense.
          Every pair of glasses we sell comes with a complete package — premium case, cleaning kit, and warranty — because we believe in delivering value, not just a product.
        </p>
      </div>
    </div>
  );
}
