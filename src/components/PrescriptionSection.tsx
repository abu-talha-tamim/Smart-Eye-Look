import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const PrescriptionSection = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast({
        title: "Prescription Uploaded",
        description: `Successfully uploaded ${file.name}. Our experts will review it soon!`,
      });
    }
  };

  return (
    <section className="bg-white py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/50 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-50" />
      
      <div className="container relative">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Professional Care</span>
          <h2 className="text-4xl md:text-5xl font-serif text-navy mb-6">Need a Prescription?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Upload your existing prescription or visit us for a professional eye exam. 
            We'll craft your perfect lenses with precision and care.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[600px] mb-16">
          {/* Left side: two horizontally stacked (side-by-side) images */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 h-[600px] lg:h-full">
            <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/20">
              <img 
                src="/assets/eye-exam.png" 
                alt="Eye Examination" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-lg font-bold">Expert Consultation</p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/20">
              <img 
                src="/assets/prescription-doc.png" 
                alt="Medical Prescription" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-lg font-bold">Precision Mapping</p>
              </div>
            </div>
          </div>

          {/* Right side: one vertical image */}
          <div className="lg:col-span-4 relative group overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/20 h-[600px] lg:h-full">
            <img 
              src="/assets/pediatric-exam.png" 
              alt="Pediatric Eye Care" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-500" />
            <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-lg font-bold">Family Eye Care</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*,.pdf"
            onChange={handleFileUpload}
          />
          <Button 
            size="lg" 
            onClick={() => fileInputRef.current?.click()}
            className="h-20 px-12 rounded-2xl bg-primary hover:bg-primary/95 text-xl font-bold shadow-2xl shadow-primary/30 transition-all hover:-translate-y-2 hover:shadow-primary/40 group active:scale-95"
          >
            Upload Prescription
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
          </Button>
          <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Accepted formats: JPG, PNG, PDF
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrescriptionSection;
