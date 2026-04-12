import { FileText, Search, Phone, Heart, CheckCircle } from "lucide-react";

const steps = [
  { icon: FileText, title: "Step 1: Register", desc: "Create an account with your email and password." },
  { icon: FileText, title: "Step 2: Create Biodata", desc: "Fill in all the required information in the biodata form including personal, family, education, and religious details." },
  { icon: Search, title: "Step 3: Search Profiles", desc: "Use filters to find suitable matches based on age, location, education, and practicing level." },
  { icon: Heart, title: "Step 4: Send Interest", desc: "If you find a suitable profile, send an interest request. The other person will be notified." },
  { icon: Phone, title: "Step 5: Connect", desc: "Once both parties accept the interest, contact information will be shared for guardian-level communication." },
  { icon: CheckCircle, title: "Step 6: Get Married", desc: "After due inquiry and conversation, proceed with marriage according to Islamic Sunnah." },
];

const Guide = () => {
  return (
    <main className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">How to Use <span className="gradient-text">OrdhekDeen</span></h1>
        <p className="text-muted-foreground text-center text-sm mb-10">A step-by-step guide to finding your life partner</p>

        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={i} className="bg-card rounded-xl border border-border p-5 flex gap-4 items-start hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full gradient-primary-light flex items-center justify-center flex-shrink-0">
                <step.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{step.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Guide;
