import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const divisions = [
  "Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh"
];

const HeroSection = () => {
  const [lookingFor, setLookingFor] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [division, setDivision] = useState("");

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-primary-light opacity-60" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative container mx-auto px-4 pt-12 pb-20 text-center">
        {/* Islamic decoration */}
        <div className="text-4xl mb-4">☪</div>

        <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in">
          Largest Islamic{" "}
          <span className="gradient-text">Matrimony</span>
        </h1>
        <p className="text-muted-foreground text-lg mb-6 max-w-xl mx-auto animate-slide-up">
          It is now easy to find a religious life partner in your own area
        </p>

        {/* Hadith quote */}
        <div className="max-w-lg mx-auto bg-background/80 backdrop-blur rounded-xl border border-border p-4 mb-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <p className="text-sm text-muted-foreground italic">
            "When a person gets married he has completed half of his deen, so let him fear Allah with regard to the other half."
          </p>
          <p className="text-xs text-primary mt-1 font-medium">(Shu'ab al-Eemaan 5486)</p>
        </div>

        {/* Search bar */}
        <div className="max-w-2xl mx-auto bg-background rounded-2xl border border-border shadow-lg p-4 md:p-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="text-left">
              <label className="text-xs text-muted-foreground mb-1 block">I'm looking for</label>
              <Select value={lookingFor} onValueChange={setLookingFor}>
                <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="bride">Bride</SelectItem>
                  <SelectItem value="groom">Groom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-left">
              <label className="text-xs text-muted-foreground mb-1 block">Marital Status</label>
              <Select value={maritalStatus} onValueChange={setMaritalStatus}>
                <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="divorced">Divorced</SelectItem>
                  <SelectItem value="widow">Widow</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-left">
              <label className="text-xs text-muted-foreground mb-1 block">Permanent Address</label>
              <Select value={division} onValueChange={setDivision}>
                <SelectTrigger><SelectValue placeholder="Select an address" /></SelectTrigger>
                <SelectContent>
                  {divisions.map((d) => (
                    <SelectItem key={d} value={d.toLowerCase()}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Link to="/search" className="w-full">
                <Button className="w-full gradient-primary text-primary-foreground border-0 gap-2">
                  <Search className="h-4 w-4" /> Search Biodata
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 animate-slide-up" style={{ animationDelay: "0.6s" }}>
          <h3 className="text-xl md:text-2xl font-semibold mb-2">
            Create biodata in <span className="gradient-text">OrdhekDeen</span> completely free of cost
          </h3>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <Link to="/register">
              <Button size="lg" className="gradient-primary text-primary-foreground border-0 px-8 rounded-full">
                + Create your biodata
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="rounded-full px-8 gap-2">
              <span className="text-destructive">▶</span> How to create biodata
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
