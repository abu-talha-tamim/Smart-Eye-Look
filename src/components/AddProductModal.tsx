import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Plus, 
  X, 
  Upload, 
  Trash2, 
  RefreshCcw, 
  ImageIcon, 
  Tag, 
  DollarSign, 
  Layers, 
  Box, 
  Sparkles,
  Percent,
  FileText,
  AlertCircle,
  PackageCheck,
  ShieldCheck,
  SprayCan,
  Ghost
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Product } from "@/data/products";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  sku: z.string().min(3, "SKU is required"),
  price: z.coerce.number().min(1, "Price is required"),
  hasDiscount: z.boolean().default(false),
  discountPrice: z.coerce.number().optional(),
  category: z.string().min(1, "Please select a category"),
  brand: z.string().min(1, "Please select a brand"),
  stock: z.coerce.number().min(0, "Stock must be 0 or more"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  status: z.enum(["in-stock", "out-of-stock"]),
  included: z.array(z.string()).default([]),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface AddProductModalProps {
  onAddProduct: (product: Product) => void;
}

const AddProductModal = ({ onAddProduct }: AddProductModalProps) => {
  const [open, setOpen] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      sku: "",
      price: 0,
      hasDiscount: false,
      discountPrice: undefined,
      category: "",
      brand: "",
      stock: 0,
      description: "",
      status: "in-stock",
      included: ["Premium Box", "Cleaning Kit", "Microfiber Cloth"],
    },
  });

  const hasDiscount = form.watch("hasDiscount");

  const generateSKU = () => {
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
    const sku = `SEL-${random}`;
    form.setValue("sku", sku);
    toast.info(`SKU Generated: ${sku}`);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPreviews: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const url = URL.createObjectURL(files[i]);
        newPreviews.push(url);
      }
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (values: ProductFormValues) => {
    const newProduct: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: values.name,
      price: values.hasDiscount && values.discountPrice ? values.discountPrice : values.price,
      originalPrice: values.hasDiscount ? values.price : undefined,
      image: previews[0] || "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=200&h=200",
      images: previews.length > 0 ? previews : ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=200&h=200"],
      category: values.category,
      description: values.description,
      inStock: values.status === "in-stock",
      sku: values.sku,
      lensOptions: ["Single Vision", "Blue Cut", "Bifocal", "Progressive"],
      included: values.included,
    };

    onAddProduct(newProduct);
    toast.success("Product published successfully!");
    setOpen(false);
    form.reset();
    setPreviews([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/20 transition-all active:scale-95 group px-6">
          <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform" /> 
          <span className="font-bold">Add Product</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl w-[95vw] lg:w-full p-0 overflow-hidden border-none shadow-2xl rounded-[2rem] bg-white max-h-[90vh] overflow-y-auto scrollbar-hide">
        {/* Header */}
        <div className="bg-navy p-6 md:p-10 text-white flex flex-col md:flex-row justify-between items-center overflow-hidden relative gap-6">
          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight mb-2 flex items-center justify-center md:justify-start gap-3">
              <Sparkles className="h-8 w-8 text-primary animate-pulse" /> 
              <span>Create Masterpiece</span>
            </h2>
            <p className="text-white/60 font-medium text-[10px] md:text-xs italic uppercase tracking-[0.2em]">
              SmartEyeLook Luxury Inventory
            </p>
          </div>
          <div className="hidden md:block absolute -right-10 -top-10 opacity-5">
            <Box className="h-64 w-64 rotate-12" />
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] uppercase font-black tracking-widest">Admin Session</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
              
              {/* Left Column: Details */}
              <div className="lg:col-span-7 space-y-10">
                
                <section className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-1 bg-primary rounded-full" />
                    <h3 className="text-2xl font-bold font-serif tracking-tight">Vibe & Identity</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground/70 flex items-center gap-2">
                            <Tag className="h-3.5 w-3.5 text-primary" /> Product Full Name
                          </FormLabel>
                          <FormControl>
                            <div className="group relative">
                              <Input 
                                placeholder="e.g Titanium Half-Rim" 
                                className="h-16 px-6 bg-secondary/20 border-2 border-transparent focus-visible:border-primary/20 focus-visible:ring-0 focus-visible:bg-white text-xl font-semibold transition-all rounded-2xl shadow-sm"
                                {...field} 
                              />
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity">
                                <Sparkles className="h-5 w-5 text-primary/40" />
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground/70 flex items-center gap-2">
                              <Layers className="h-3.5 w-3.5 text-primary" /> Experience Category
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-16 px-6 bg-secondary/20 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl transition-all text-lg font-medium">
                                  <SelectValue placeholder="Select one" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="border-none shadow-2xl rounded-2xl">
                                <SelectItem value="mens" className="py-3">Men's Boutique</SelectItem>
                                <SelectItem value="womens" className="py-3">Women's Collection</SelectItem>
                                <SelectItem value="kids" className="py-3">Junior Fashion</SelectItem>
                                <SelectItem value="bluecut" className="py-3">Digital Protective</SelectItem>
                                <SelectItem value="prescription" className="py-3">Luxury Lenses</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="brand"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground/70 flex items-center gap-2">
                              <Sparkles className="h-3.5 w-3.5 text-primary" /> Luxury Brand
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-16 px-6 bg-secondary/20 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl transition-all text-lg font-medium">
                                  <SelectValue placeholder="Select one" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="border-none shadow-2xl rounded-2xl">
                                <SelectItem value="rayban" className="py-3">Ray-Ban</SelectItem>
                                <SelectItem value="oakley" className="py-3">Oakley</SelectItem>
                                <SelectItem value="gucci" className="py-3">Gucci</SelectItem>
                                <SelectItem value="smart-eye" className="py-3">SmartEye Signature</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </section>

                <section className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-1 bg-primary rounded-full" />
                    <h3 className="text-2xl font-bold font-serif tracking-tight">Pricing & Availability</h3>
                  </div>

                  <div className="bg-gradient-to-br from-secondary/10 to-secondary/30 p-1 md:p-8 rounded-[2rem] space-y-8 border border-secondary/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground/70">MSRP (৳)</FormLabel>
                            <FormControl>
                              <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 font-serif text-2xl text-muted-foreground/40 font-bold group-focus-within:text-primary transition-colors">৳</div>
                                <Input type="number" className="h-16 pl-14 bg-white border-2 border-transparent focus-visible:border-primary/20 focus-visible:ring-0 text-2xl font-serif font-black shadow-sm rounded-2xl" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground/70">Reserved Stock</FormLabel>
                            <FormControl>
                              <div className="relative group">
                                <Box className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                                <Input type="number" className="h-16 pl-16 bg-white border-2 border-transparent focus-visible:border-primary/20 focus-visible:ring-0 text-xl font-bold shadow-sm rounded-2xl" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="pt-6 border-t border-dashed border-muted-foreground/20">
                      <FormField
                        control={form.control}
                        name="hasDiscount"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-[1.5rem] bg-navy/5 p-6 border-2 border-transparent transition-all group hover:bg-navy/10">
                            <div className="space-y-1">
                              <FormLabel className="text-lg font-bold text-navy flex items-center gap-2">
                                <Percent className="h-5 w-5 text-primary" /> Seasonal Offer
                              </FormLabel>
                              <FormDescription className="text-xs font-medium text-muted-foreground">
                                Override standard pricing with a special boutique label
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-primary h-7 w-12"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      {hasDiscount && (
                        <div className="mt-6 animate-in fade-in slide-in-from-top-4 duration-500">
                          <FormField
                            control={form.control}
                            name="discountPrice"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel className="text-[11px] font-black uppercase tracking-[0.15em] text-primary">Limited Value Price (৳)</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-serif font-black text-primary">৳</div>
                                    <Input type="number" className="h-20 pl-16 bg-primary/5 border-2 border-primary/20 text-3xl font-serif font-black text-primary rounded-[1.5rem] shadow-inner focus-visible:ring-0" {...field} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                {/* What's Included Section */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-1 bg-primary rounded-full" />
                    <h3 className="text-2xl font-bold font-serif tracking-tight">Full Presentation</h3>
                  </div>

                  <FormField
                    control={form.control}
                    name="included"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground/70">Luxury Extras Included</FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { name: "Premium Box", icon: Box, color: "bg-amber-500/10 text-amber-600" },
                            { name: "Cleaning Kit", icon: SprayCan, color: "bg-blue-500/10 text-blue-600" },
                            { name: "Warranty Card", icon: ShieldCheck, color: "bg-emerald-500/10 text-emerald-600" },
                            { name: "Microfiber Cloth", icon: Sparkles, color: "bg-purple-500/10 text-purple-600" }
                          ].map((item) => (
                            <div 
                              key={item.name}
                              onClick={() => {
                                const current = field.value || [];
                                const updated = current.includes(item.name)
                                  ? current.filter(v => v !== item.name)
                                  : [...current, item.name];
                                field.onChange(updated);
                              }}
                              className={cn(
                                "flex items-center gap-4 p-5 rounded-2xl cursor-pointer border-2 transition-all duration-300",
                                field.value?.includes(item.name) 
                                  ? "bg-white border-primary shadow-lg scale-[1.02] ring-4 ring-primary/5" 
                                  : "bg-secondary/20 border-transparent hover:border-secondary/50 grayscale opacity-60 hover:grayscale-0 hover:opacity-100"
                              )}
                            >
                              <div className={cn("p-2.5 rounded-xl", item.color)}>
                                <item.icon className="h-6 w-6" />
                              </div>
                              <span className="font-bold text-sm tracking-tight">{item.name}</span>
                              {field.value?.includes(item.name) && (
                                <PackageCheck className="h-5 w-5 text-primary ml-auto" />
                              )}
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>
              </div>

              {/* Right Column: Media & Meta */}
              <div className="lg:col-span-5 space-y-10">
                
                <section className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold font-serif flex items-center gap-3 tracking-tight">
                      <ImageIcon className="h-6 w-6 text-primary" /> Visual Portfolio
                    </h3>
                    <div className="px-3 py-1 bg-primary/10 rounded-full">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                        {previews.length} Perspectives
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {previews.map((url, i) => (
                      <div key={i} className="group relative aspect-square rounded-[1.5rem] overflow-hidden shadow-xl ring-2 ring-white">
                        <img src={url} alt="Preview" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => removeImage(i)}
                            className="rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 shadow-2xl"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <label className="flex flex-col items-center justify-center aspect-square rounded-[1.5rem] border-2 border-dashed border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 cursor-pointer transition-all duration-500 group relative overflow-hidden">
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform mb-4 border border-primary/10">
                          <Upload className="h-7 w-7 text-primary" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Add Frames</span>
                      </div>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br from-primary to-transparent" />
                      <input type="file" multiple className="hidden" onChange={handleImageUpload} accept="image/*" />
                    </label>
                  </div>
                </section>

                <section className="space-y-10 pt-4">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground/70 flex items-center gap-2">
                          <FileText className="h-3.5 w-3.5 text-primary" /> Product Narrative
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Craft a compelling story for this luxury accessory..." 
                            className="min-h-[220px] bg-secondary/20 border-2 border-transparent focus-visible:border-primary/20 focus-visible:bg-white resize-none p-6 text-lg leading-relaxed rounded-[1.5rem] transition-all shadow-sm"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-secondary/10 p-6 rounded-[2rem] border border-secondary/50">
                    <FormField
                      control={form.control}
                      name="sku"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Registry ID</FormLabel>
                          <FormControl>
                            <div className="flex gap-2">
                              <Input className="h-14 bg-white border-2 border-transparent focus-visible:border-primary/20 font-mono text-center text-sm rounded-xl tracking-tighter" readOnly {...field} />
                              <Button type="button" variant="ghost" size="icon" onClick={generateSKU} className="h-14 w-14 bg-white rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm border border-secondary/50">
                                <RefreshCcw className="h-5 w-5" />
                              </Button>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Collection Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-14 bg-white border-2 border-transparent focus:border-primary/20 text-xs font-black uppercase tracking-widest rounded-xl shadow-sm border border-secondary/50">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="border-none shadow-2xl rounded-2xl">
                              <SelectItem value="in-stock" className="text-xs font-bold py-3">Public / Available</SelectItem>
                              <SelectItem value="out-of-stock" className="text-xs font-bold py-3">Private / Archive</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                </section>

              </div>
            </div>

            <div className="mt-16 pt-10 border-t border-dashed flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-4 text-muted-foreground bg-secondary/20 px-6 py-3 rounded-full border border-secondary/50">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Auto-Registry Active</span>
                </div>
              </div>
              <div className="flex items-center gap-6 w-full md:w-auto">
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="font-black flex-1 md:flex-none tracking-[0.2em] text-[10px] uppercase h-16 hover:text-primary transition-colors px-8"
                  onClick={() => setOpen(false)}
                >
                  Save Workspace
                </Button>
                <Button 
                  type="submit" 
                  className="bg-navy hover:bg-navy/90 text-white shadow-2xl shadow-navy/20 h-16 px-16 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex-1 md:flex-none active:scale-95 transition-all group overflow-hidden relative"
                >
                  <span className="relative z-10">Debut Collection</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
