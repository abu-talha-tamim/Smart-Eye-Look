import { FileText, Search, Phone, Heart } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Create Biodata",
    description: "You can easily create a biodata on OrdhekDeen completely free of cost within some steps.",
  },
  {
    icon: Search,
    title: "Search Biodata",
    description: "You can easily search biodatas using many filters including age, upazila, profession, educational qualification.",
  },
  {
    icon: Phone,
    title: "Contact with guardians",
    description: "If someone likes your biodata or you like someone's biodata you can directly contact their parent.",
  },
  {
    icon: Heart,
    title: "Get married",
    description: "If you like the biodata and conversation, do your own inquiry & get married according to Sunnah.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          How <span className="gradient-text">OrdhekDeen</span> Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-primary-light flex items-center justify-center">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
