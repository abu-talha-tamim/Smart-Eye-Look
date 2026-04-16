"use client";

import { useRef } from "react";
import { ArrowRight, FileUp, Glasses, HeartPulse, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PrescriptionSection = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.success("Eye Report Received", {
        description: `Verified ${file.name} for precision crafting.`,
        style: { background: "#06152a", color: "white", border: "1px solid #1e2e4a" }
      });
    }
  };

  return (
    <section className="bg-white py-24 relative overflow-hidden">
      <div className="container max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Visual Showcase - ALIGNED LEFT */}
          <div className="relative group order-first">
             <div className="absolute -inset-4 bg-primary/5 rounded-[3.5rem] blur-2xl group-hover:bg-primary/10 transition-colors duration-700" />
             <div className="relative aspect-[16/10] sm:aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 bg-[#06152a]">
                <img 
                   src="/assets/prescription-doc.png" 
                   alt="Boutique Optical Care" 
                   className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                   <div className="flex items-center gap-2 mb-3 text-orange-500 font-black uppercase text-[10px] tracking-[0.3em]">
                      <Sparkles className="h-4 w-4" /> Specialized Care
                   </div>
                   <h4 className="text-2xl font-black text-navy leading-tight tracking-tight">World-Class Lens Precision</h4>
                </div>
             </div>
          </div>

          {/* Service Detail - ALIGNED RIGHT */}
          <div className="flex flex-col">
            <div className="mb-10">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-6 block">Vision Health Command</span>
              <h2 className="text-5xl md:text-6xl font-black text-navy leading-[1.1] tracking-tighter mb-8">Vision Power & Care</h2>
              <div className="space-y-6">
                 <div className="flex items-start gap-4 p-8 rounded-[2rem] bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-2xl hover:shadow-navy/5">
                    <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center text-navy shrink-0 shadow-lg border border-slate-50">
                       <Glasses className="h-7 w-7" />
                    </div>
                    <div>
                       <h4 className="font-extrabold text-navy text-xl mb-1 tracking-tight">Standard Lens Pairing</h4>
                       <p className="text-sm text-slate-500 font-medium leading-relaxed">Choose your frame and we'll expertly pair it with our high-definition lenses.</p>
                    </div>
                 </div>
                 
                 <div className="flex items-start gap-4 p-8 rounded-[2rem] bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-2xl hover:shadow-navy/5">
                    <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center text-navy shrink-0 shadow-lg border border-slate-50">
                       <HeartPulse className="h-7 w-7 text-orange-500" />
                    </div>
                    <div>
                       <h4 className="font-extrabold text-navy text-xl mb-1 tracking-tight">Doctor's Prescription</h4>
                       <p className="text-sm text-slate-500 font-medium leading-relaxed">Simply upload your eye report or "Choshmar Prescription" for precise mapping.</p>
                    </div>
                 </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*,.pdf"
                onChange={handleFileUpload}
              />
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto h-16 px-12 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-black uppercase tracking-[0.2em] text-[11px] gap-4 shadow-2xl shadow-orange-500/20 transition-all active:scale-95 group"
              >
                 Upload Eye Report 🔥
              </Button>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-3">
                 <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-xl shadow-emerald-500/50 animate-pulse" />
                 Optical Desk Active
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrescriptionSection;
