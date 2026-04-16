"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Plus, 
  Trash2, 
  RefreshCcw, 
  ImageIcon, 
  Box, 
  Sparkles,
  ArrowLeft,
  ShieldCheckIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
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

const PREDEFINED_ACCESSORIES = [
  { name: "Cleaner Spray", price: 120 },
  { name: "Standard Box", price: 150 },
  { name: "Test Kit", price: 200 },
  { name: "Fabric Case", price: 180 },
  { name: "Premium Box", price: 350 },
];

const AddProductModal = ({ onAddProduct }: AddProductModalProps) => {
  const [open, setOpen] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [relatedItems, setRelatedItems] = useState<{name: string, price: number}[]>([]);

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

  const generateSKU = () => {
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
    const sku = `SEL-${random}`;
    form.setValue("sku", sku);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setIsUploading(true);
      const newUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);
        try {
          const res = await fetch("/api/upload", { method: "POST", body: formData });
          const data = await res.json();
          if (res.ok) newUrls.push(data.url);
        } catch (error) {
          toast.error(`Upload failed for ${files[i].name}`);
        }
      }
      setPreviews((prev) => [...prev, ...newUrls]);
      setIsUploading(false);
      toast.success("Assets synchronized");
    }
  };

  const addRelatedItem = (item: { name: string, price: number }) => {
    console.log("Adding item:", item);
    setRelatedItems(prev => [...prev, { ...item, id: Date.now() }]);
    toast.success(`${item.name} Added to Collection`);
  };

  const removeRelatedItem = (index: number) => {
    console.log("Removing item at index:", index);
    setRelatedItems(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (values: ProductFormValues) => {
    if (previews.length === 0) {
      toast.error("Showcase items required");
      return;
    }

    const productData = {
      ...values,
      image: previews[0],
      images: previews,
      inStock: values.status === "in-stock",
      lensOptions: ["Single Vision", "Sunglasses", "Bifocal", "Progressive"],
      relatedItems
    };

    onAddProduct(productData as any);
    setOpen(false);
    form.reset();
    setPreviews([]);
    setRelatedItems([]);
  };

  useEffect(() => {
    if (open && !form.getValues("sku")) generateSKU();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="relative p-[2px] overflow-hidden rounded-2xl group cursor-pointer transition-all duration-500 hover:scale-105 active:scale-95 shadow-xl hover:shadow-primary/20">
          <div className="absolute top-1/2 left-1/2 h-[250%] w-[250%] bg-[conic-gradient(#d4af37_0deg,#d4af37_40deg,transparent_60deg,transparent_360deg)] animate-spin-border z-0" />
          <Button className="relative z-10 w-full h-14 px-8 bg-navy text-white rounded-2xl border-none font-black uppercase tracking-widest text-[11px] gap-3">
            <Plus className="h-5 w-5 group-hover:rotate-180 transition-transform duration-700 text-primary" /> 
            <span>Add New Product</span>
          </Button>
        </div>
      </DialogTrigger>
      
      <DialogContent className="max-w-[1200px] w-[95vw] p-0 overflow-hidden border-none shadow-2xl rounded-[1.5rem] bg-[#f8f9fa] max-h-[92vh] flex flex-col">
        <DialogHeader className="sr-only">
          <DialogTitle>Product Inventory Portal</DialogTitle>
          <DialogDescription>Create and publish new boutique optical items.</DialogDescription>
        </DialogHeader>

        <div className="bg-white px-8 py-5 border-b flex flex-col md:flex-row justify-between items-center gap-4 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="rounded-lg border border-slate-200">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-bold text-slate-900 tracking-tighter">New Collection Entry</h2>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-red-500 border border-red-50 h-10 px-4 rounded-xl" onClick={() => form.reset()}>Clear</Button>
            <Button onClick={form.handleSubmit(onSubmit)} disabled={isUploading} className="bg-blue-600 hover:bg-blue-700 text-white font-black h-10 px-8 rounded-xl shadow-lg transition-all">
              {isUploading ? "Syncing..." : "Publish"}
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 space-y-6">
                <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white p-6">
                   <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      <div className="md:col-span-12 lg:col-span-7 aspect-square relative rounded-xl overflow-hidden bg-slate-50 border border-slate-100 group">
                        {previews[0] ? <img src={previews[0]} className="w-full h-full object-cover" /> : <div className="h-full flex items-center justify-center text-slate-300"><ImageIcon className="h-10 w-10" /></div>}
                      </div>
                      <div className="md:col-span-12 lg:col-span-5 grid grid-cols-2 gap-2">
                        {previews.slice(1, 4).map((url, i) => (
                           <div key={i} className="aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                             <img src={url} className="w-full h-full object-cover" />
                           </div>
                        ))}
                        <label className="aspect-square rounded-xl border-2 border-dashed border-blue-100 bg-blue-50/20 flex items-center justify-center cursor-pointer hover:bg-blue-50">
                           <Plus className="h-5 w-5 text-blue-500" />
                           <input type="file" multiple className="hidden" onChange={handleImageUpload} />
                        </label>
                      </div>
                   </div>
                </Card>

                <Card className="border-none shadow-sm rounded-2xl bg-white p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-black uppercase text-navy tracking-widest">Related Items</h3>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button 
                              type="button"
                              variant="outline" 
                              size="sm" 
                              className="h-9 px-3 border-blue-100 bg-blue-50/50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all font-bold text-[10px] uppercase tracking-widest gap-2"
                            >
                              <Plus className="h-3.5 w-3.5" />
                              Add Accessory
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-56 p-2 rounded-2xl shadow-2xl border-slate-100 bg-white" align="end" side="bottom">
                             <div className="p-2 mb-1">
                               <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Select Item</p>
                             </div>
                             <div className="grid grid-cols-1 gap-1">
                                {PREDEFINED_ACCESSORIES.map((item) => (
                                   <button
                                     key={item.name}
                                     type="button"
                                     onClick={(e) => {
                                       e.preventDefault();
                                       addRelatedItem(item);
                                     }}
                                     className="w-full text-left px-4 py-3 text-[11px] font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all flex items-center justify-between group"
                                   >
                                     {item.name}
                                     <span className="text-[10px] bg-slate-100 group-hover:bg-blue-100 px-2 py-0.5 rounded-full">৳{item.price}</span>
                                   </button>
                                ))}
                             </div>
                          </PopoverContent>
                        </Popover>
                  </div>
                  <div className="space-y-3">
                    {relatedItems.map((item, i) => (
                       <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <span className="text-xs font-bold">{item.name}</span>
                          <div className="flex items-center gap-3">
                             <span className="text-xs font-black">৳{item.price}</span>
                             <button type="button" onClick={() => removeRelatedItem(i)}><Trash2 className="h-3.5 w-3.5 text-slate-300 hover:text-red-500" /></button>
                          </div>
                       </div>
                    ))}
                  </div>
                </Card>
              </div>

              <div className="lg:col-span-7">
                <Card className="border-none shadow-sm rounded-2xl bg-white p-8">
                  <Tabs defaultValue="general" className="w-full">
                    <TabsList className="bg-slate-50 rounded-xl mb-8 p-1">
                      <TabsTrigger value="general" className="rounded-lg text-[10px] font-black uppercase tracking-widest px-8">General</TabsTrigger>
                      <TabsTrigger value="advanced" className="rounded-lg text-[10px] font-black uppercase tracking-widest px-8">Advanced</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="general" className="space-y-6">
                       <FormField control={form.control} name="name" render={({ field }) => (
                         <FormItem><FormLabel className="text-[10px] font-black uppercase tracking-widest">Name</FormLabel><FormControl><Input placeholder="Boutique Frame X" className="h-12 rounded-xl" {...field} /></FormControl><FormMessage /></FormItem>
                       )} />
                       <div className="grid grid-cols-2 gap-4">
                         <FormField control={form.control} name="price" render={({ field }) => (
                           <FormItem><FormLabel className="text-[10px] font-black uppercase tracking-widest">Base Price (৳)</FormLabel><FormControl><Input type="number" className="h-12 rounded-xl" {...field} /></FormControl></FormItem>
                         )} />
                         <FormField control={form.control} name="category" render={({ field }) => (
                           <FormItem><FormLabel className="text-[10px] font-black uppercase tracking-widest">Category</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger className="h-12 rounded-xl text-xs font-bold"><SelectValue placeholder="Select Category" /></SelectTrigger></FormControl><SelectContent className="rounded-xl"><SelectItem value="mens" className="text-xs font-bold">Men's Glasses</SelectItem><SelectItem value="womens" className="text-xs font-bold">Women's Glasses</SelectItem><SelectItem value="sunglasses" className="text-xs font-bold">Sunglasses</SelectItem><SelectItem value="kids" className="text-xs font-bold">Kids Eyewear</SelectItem><SelectItem value="prescription" className="text-xs font-bold">Prescription / Vision Power</SelectItem><SelectItem value="contact-lenses" className="text-xs font-bold">Contact Lenses</SelectItem></SelectContent></Select></FormItem>
                         )} />
                       </div>
                       <FormField control={form.control} name="description" render={({ field }) => (
                         <FormItem><FormLabel className="text-[10px] font-black uppercase tracking-widest">Story / Detail</FormLabel><FormControl><Textarea className="min-h-[100px] rounded-xl p-4" {...field} /></FormControl></FormItem>
                       )} />
                    </TabsContent>

                    <TabsContent value="advanced" className="space-y-6">
                       <FormField control={form.control} name="sku" render={({ field }) => (
                         <FormItem><FormLabel className="text-[10px] font-black uppercase tracking-widest">Global SKU</FormLabel><FormControl><Input className="h-12 rounded-xl font-mono" readOnly {...field} /></FormControl></FormItem>
                       )} />
                       <FormField control={form.control} name="included" render={({ field }) => (
                         <FormItem><FormLabel className="text-[10px] font-black uppercase tracking-widest">What's Inside</FormLabel><div className="grid grid-cols-2 gap-2">{["Premium Box", "Cleaning Kit", "Microfiber Cloth"].map(item => (
                            <div key={item} onClick={() => { const val = field.value || []; field.onChange(val.includes(item) ? val.filter(v => v !== item) : [...val, item]) }} className={cn("p-4 rounded-xl cursor-pointer border-2 transition-all text-[10px] font-black uppercase", field.value?.includes(item) ? "bg-blue-50 border-blue-500 text-blue-600" : "bg-slate-50 border-transparent text-slate-400")}>{item}</div>
                         ))}</div></FormItem>
                       )} />
                    </TabsContent>
                  </Tabs>
                </Card>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
