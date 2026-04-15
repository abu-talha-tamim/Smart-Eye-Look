"use client";

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
  Ghost,
  ArrowLeft,
  ChevronDown,
  LayoutGrid,
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
      lensOptions: ["Single Vision", "Sunglasses", "Bifocal", "Progressive"],
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
        <Button className="gap-2 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/20 transition-all active:scale-95 group px-6 h-12 rounded-xl">
          <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform" /> 
          <span className="font-bold">Add New Product</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[1200px] w-[95vw] p-0 overflow-hidden border-none shadow-2xl rounded-[1.5rem] bg-[#f8f9fa] max-h-[92vh] flex flex-col">
        {/* Modern Dashboard Header */}
        <div className="bg-white px-8 py-5 border-b flex flex-col md:flex-row justify-between items-center gap-4 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="rounded-lg border border-slate-200 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="space-y-0.5">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Add New Product</h2>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                Last Update {new Date().toLocaleDateString('en-GB')} at {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 border border-red-100 hover:bg-red-50 rounded-lg h-10 w-10"
              onClick={() => form.reset()}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="border-slate-200 text-slate-700 font-bold h-10 px-6 rounded-lg hover:bg-slate-50"
              onClick={() => {
                toast.success("Draft saved successfully!");
                setOpen(false);
              }}
            >
              Save Draft
            </Button>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 px-8 rounded-lg shadow-sm active:scale-95 transition-all"
            >
              Publish
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          <Form {...form}>
            <form id="product-form" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column - Assets & Info */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Image Gallery Control */}
                  <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        {/* Main Preview */}
                        <div className="md:col-span-12 lg:col-span-7 aspect-square relative rounded-xl overflow-hidden bg-slate-50 border border-slate-100 group">
                          {previews[0] ? (
                            <img src={previews[0]} alt="Cover" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-3">
                              <ImageIcon className="h-12 w-12 opacity-20" />
                              <span className="text-xs font-bold uppercase tracking-widest opacity-40">Main Visual</span>
                            </div>
                          )}
                          <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full border border-white shadow-sm">
                            <span className="text-[10px] font-black uppercase text-slate-600 tracking-wider">Cover</span>
                          </div>
                        </div>

                        {/* Thumbs Grid */}
                        <div className="md:col-span-12 lg:col-span-5 grid grid-cols-2 gap-4 h-full">
                          {/* Image slots 2-4 */}
                          {[1, 2, 3].map((idx) => (
                            <div key={idx} className="aspect-square relative rounded-xl overflow-hidden bg-slate-50 border border-slate-100 group">
                              {previews[idx] ? (
                                <>
                                  <img src={previews[idx]} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button type="button" onClick={() => removeImage(idx)} className="text-white hover:text-red-400">
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <div className="w-full h-full border-2 border-dashed border-slate-200 rounded-xl" />
                              )}
                            </div>
                          ))}
                          {/* Add Button */}
                          <label className="aspect-square rounded-xl border-2 border-dashed border-blue-200 bg-blue-50/30 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors group">
                             <Plus className="h-5 w-5 text-blue-500 group-hover:scale-110 transition-transform" />
                             <input type="file" multiple className="hidden" onChange={handleImageUpload} accept="image/*" />
                          </label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Visibility Card */}
                  <Card className="border-none shadow-sm rounded-2xl">
                    <CardContent className="p-6">
                      <h3 className="text-sm font-bold text-slate-900 mb-2">Visibility</h3>
                      <p className="text-[11px] text-slate-500 mb-6">You can change the visibility of this product for customers</p>
                      
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                              {field.value === "in-stock" ? "Visible" : "Hidden"}
                            </span>
                            <Switch
                              checked={field.value === "in-stock"}
                              onCheckedChange={(checked) => field.onChange(checked ? "in-stock" : "out-of-stock")}
                              className="data-[state=checked]:bg-blue-500"
                            />
                          </div>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* Related Items Card */}
                  <Card className="border-none shadow-sm rounded-2xl">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-slate-900">Related Items</h3>
                        <Button variant="ghost" size="icon" className="h-8 w-8 border border-slate-100 rounded-lg">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-[10px] text-slate-500 mb-6">Add related items to this product</p>
                      
                      <div className="space-y-4">
                         {[
                           { name: "Premium Lens Kit", price: 28 },
                           { name: "Travel Storage Case", price: 18 },
                           { name: "Microfiber Bundle", price: 20 }
                         ].map((item, i) => (
                           <div key={i} className="flex items-center gap-4 group">
                             <div className="h-12 w-12 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
                               <Box className="h-5 w-5 text-slate-300" />
                             </div>
                             <div className="flex-1 space-y-0.5">
                               <p className="text-[11px] font-bold text-slate-800 tracking-tight">{item.name}</p>
                               <p className="text-[10px] font-medium text-slate-500">$ {item.price}</p>
                             </div>
                             <button type="button" className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-400 hover:text-red-500">
                               <Trash2 className="h-3.5 w-3.5" />
                             </button>
                           </div>
                         ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Preview Card */}
                  <Card className="border-none shadow-sm rounded-2xl">
                    <CardContent className="p-6">
                      <h3 className="text-sm font-bold text-slate-900 mb-2">Preview</h3>
                      <p className="text-[11px] text-slate-500 mb-6">Want to see how your product will look like?</p>
                      <Button variant="outline" className="w-full border-slate-200 text-slate-700 font-black h-12 rounded-xl text-[10px] uppercase tracking-widest">
                        Preview
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - Product Details */}
                <div className="lg:col-span-7">
                  <Card className="border-none shadow-sm rounded-2xl overflow-hidden min-h-full bg-white">
                    <CardContent className="p-10">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h3 className="text-lg font-bold text-navy tracking-tight">Product Details</h3>
                          <p className="text-xs text-slate-500 font-medium">Key info to describe and display your product.</p>
                        </div>
                        <div className="px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
                          <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Status: Draft</span>
                        </div>
                      </div>

                      <Tabs defaultValue="general" className="w-full">
                        <TabsList className="w-full bg-slate-50 p-1 mb-8 h-12 rounded-xl grid grid-cols-2">
                          <TabsTrigger value="general" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold text-xs uppercase tracking-widest">General</TabsTrigger>
                          <TabsTrigger value="advanced" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold text-xs uppercase tracking-widest">Advanced</TabsTrigger>
                        </TabsList>

                        <TabsContent value="general" className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Product Name <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. Titanium Half-Rim Glasses" className="h-12 bg-white border-slate-200 focus-visible:ring-blue-500/20 text-sm font-medium rounded-xl" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="status"
                              render={({ field }) => (
                                <FormItem className="space-y-2">
                                  <FormLabel className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Inventory Status <span className="text-red-500">*</span></FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="h-12 bg-white border-slate-200 rounded-xl text-sm font-medium focus:ring-blue-500/20">
                                        <SelectValue placeholder="Choose product status" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="rounded-xl border-slate-200">
                                      <SelectItem value="in-stock">Available / Active</SelectItem>
                                      <SelectItem value="out-of-stock">Unavailable / Archive</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="brand"
                              render={({ field }) => (
                                <FormItem className="space-y-2">
                                  <FormLabel className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Brand <span className="text-red-500">*</span></FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="h-12 bg-white border-slate-200 rounded-xl text-sm font-medium focus:ring-blue-500/20">
                                        <SelectValue placeholder="Select the brand name" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="rounded-xl border-slate-200">
                                      <SelectItem value="rayban">Ray-Ban</SelectItem>
                                      <SelectItem value="oakley">Oakley</SelectItem>
                                      <SelectItem value="gucci">Gucci</SelectItem>
                                      <SelectItem value="smart-eye">SmartEye</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="category"
                              render={({ field }) => (
                                <FormItem className="space-y-2">
                                  <FormLabel className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Category <span className="text-red-500">*</span></FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="h-12 bg-white border-slate-200 rounded-xl text-sm font-medium focus:ring-blue-500/20">
                                        <SelectValue placeholder="Select main category" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="rounded-xl border-slate-200">
                                      <SelectItem value="mens">Men's Glasses</SelectItem>
                                      <SelectItem value="womens">Women's Glasses</SelectItem>
                                      <SelectItem value="kids">Kids Glasses</SelectItem>
                                      <SelectItem value="sunglasses">Sunglasses</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                            <div className="space-y-2">
                               <label className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Subcategory</label>
                               <Select defaultValue="prescription">
                                  <SelectTrigger className="h-12 bg-white border-slate-200 rounded-xl text-sm font-medium focus:ring-blue-500/20">
                                    <SelectValue placeholder="Select subcategory" />
                                  </SelectTrigger>
                                  <SelectContent className="rounded-xl border-slate-200">
                                    <SelectItem value="prescription">Prescription</SelectItem>
                                    <SelectItem value="fashion">Fashion/Style</SelectItem>
                                    <SelectItem value="sport">Sport Perform</SelectItem>
                                  </SelectContent>
                               </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="price"
                              render={({ field }) => (
                                <FormItem className="space-y-2">
                                  <FormLabel className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Price <span className="text-red-500">*</span></FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Input type="number" placeholder="e.g. 29.99" className="h-12 bg-white border-slate-200 rounded-xl text-sm font-medium pr-16" {...field} />
                                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest">BDT</div>
                                    </div>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="discountPrice"
                              render={({ field }) => (
                                <FormItem className="space-y-2">
                                  <FormLabel className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Discount</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Input type="number" placeholder="e.g. 15" className="h-12 bg-white border-slate-200 rounded-xl text-sm font-medium pr-10" {...field} />
                                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 opacity-60">%</div>
                                    </div>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Description</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Write a short description highlighting key benefits and features" 
                                    className="min-h-[120px] bg-white border-slate-200 rounded-xl text-sm font-medium p-6 resize-none"
                                    {...field} 
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </TabsContent>

                        <TabsContent value="advanced" className="space-y-8 animate-in fade-in slide-in-from-left-2 duration-300">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <FormField
                               control={form.control}
                               name="sku"
                               render={({ field }) => (
                                 <FormItem className="space-y-2">
                                   <FormLabel className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Global SKU</FormLabel>
                                   <FormControl>
                                     <div className="flex gap-2">
                                       <Input className="h-12 bg-white border-slate-200 rounded-xl font-mono text-xs font-bold" readOnly {...field} />
                                       <Button type="button" onClick={generateSKU} variant="outline" size="icon" className="h-12 w-12 rounded-xl border-slate-200 hover:bg-slate-50">
                                         <RefreshCcw className="h-4 w-4 text-slate-400" />
                                       </Button>
                                     </div>
                                   </FormControl>
                                 </FormItem>
                               )}
                             />
                             <FormField
                               control={form.control}
                               name="stock"
                               render={({ field }) => (
                                 <FormItem className="space-y-2">
                                   <FormLabel className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Stock Units</FormLabel>
                                   <FormControl>
                                     <div className="relative">
                                       <Input type="number" className="h-12 bg-white border-slate-200 rounded-xl text-sm font-medium pr-10" {...field} />
                                       <Box className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                                     </div>
                                   </FormControl>
                                 </FormItem>
                               )}
                             />
                           </div>

                           <FormField
                              control={form.control}
                              name="included"
                              render={({ field }) => (
                                <FormItem className="space-y-4">
                                  <FormLabel className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Included Extras</FormLabel>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {["Premium Box", "Cleaning Kit", "Microfiber Cloth", "Warranty Card"].map((item) => (
                                      <div 
                                        key={item}
                                        onClick={() => {
                                          const current = field.value || [];
                                          const updated = current.includes(item)
                                            ? current.filter(v => v !== item)
                                            : [...current, item];
                                          field.onChange(updated);
                                        }}
                                        className={cn(
                                          "flex items-center justify-between p-4 rounded-xl cursor-pointer border-2 transition-all text-xs font-bold",
                                          field.value?.includes(item) 
                                            ? "bg-blue-50/50 border-blue-200 text-blue-600" 
                                            : "bg-slate-50 border-transparent text-slate-400 hover:bg-slate-100"
                                        )}
                                      >
                                        {item}
                                        {field.value?.includes(item) && <ShieldCheckIcon className="h-4 w-4 text-blue-500" />}
                                      </div>
                                    ))}
                                  </div>
                                </FormItem>
                              )}
                            />
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
