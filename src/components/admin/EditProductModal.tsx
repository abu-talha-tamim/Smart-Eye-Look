"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Trash2, 
  RefreshCcw, 
  ImageIcon, 
  FileText,
  ArrowLeft,
  Plus,
  Box,
  ShieldCheckIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
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
  discountPrice: z.coerce.number().optional(),
  category: z.string().min(1, "Please select a category"),
  brand: z.string().min(1, "Please select a brand"),
  stock: z.coerce.number().min(0, "Stock must be 0 or more"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  status: z.enum(["in-stock", "out-of-stock"]),
  included: z.array(z.string()).default([]),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface EditProductModalProps {
  product: Product;
  onUpdateProduct: (product: Product) => void;
  trigger?: React.ReactNode;
}

const EditProductModal = ({ product, onUpdateProduct, trigger }: EditProductModalProps) => {
  const [open, setOpen] = useState(false);
  const [previews, setPreviews] = useState<string[]>(product.images || [product.image]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      sku: product.sku,
      price: product.price,
      discountPrice: product.originalPrice ? product.price : undefined,
      category: product.category,
      brand: "smart-eye", // Mock default
      stock: 50, // Mock default
      description: product.description,
      status: product.inStock ? "in-stock" : "out-of-stock",
      included: product.included,
    },
  });

  const generateSKU = () => {
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
    const sku = `SEL-${random}`;
    form.setValue("sku", sku);
    toast.info(`SKU Re-generated: ${sku}`);
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
    const updatedProduct: Product = {
      ...product,
      name: values.name,
      price: values.discountPrice || values.price,
      originalPrice: values.discountPrice ? values.price : undefined,
      image: previews[0],
      images: previews,
      category: values.category,
      description: values.description,
      inStock: values.status === "in-stock",
      sku: values.sku,
      included: values.included,
    };

    onUpdateProduct(updatedProduct);
    toast.success("Product updated successfully!");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Edit</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-[1200px] w-[95vw] p-0 overflow-hidden border-none shadow-2xl rounded-[1.5rem] bg-[#f8f9fa] max-h-[92vh] flex flex-col">
        {/* Header */}
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
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Edit Product</h2>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                SKU: {product.sku} • ID: {product.id}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={form.handleSubmit(onSubmit)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 px-8 rounded-lg shadow-sm active:scale-95 transition-all"
            >
              Update Product
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          <Form {...form}>
            <form id="edit-product-form" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Same layout as AddProductModal for consistency */}
                <div className="lg:col-span-5 space-y-6">
                  <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
                    <CardContent className="p-6">
                       <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-12 lg:col-span-7 aspect-square relative rounded-xl overflow-hidden bg-slate-50 border border-slate-100 group">
                          {previews[0] && <img src={previews[0]} alt="Cover" className="w-full h-full object-cover" />}
                        </div>
                        <div className="md:col-span-12 lg:col-span-5 grid grid-cols-2 gap-4">
                          {[1, 2, 3].map((idx) => (
                            <div key={idx} className="aspect-square relative rounded-xl overflow-hidden bg-slate-50 border border-slate-100 group">
                              {previews[idx] ? (
                                <>
                                  <img src={previews[idx]} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                                  <button type="button" onClick={() => removeImage(idx)} className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </>
                              ) : (
                                <div className="w-full h-full border-2 border-dashed border-slate-200 rounded-xl" />
                              )}
                            </div>
                          ))}
                          <label className="aspect-square rounded-xl border-2 border-dashed border-blue-200 bg-blue-50/30 flex flex-center items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors">
                             <Plus className="h-5 w-5 text-blue-500" />
                             <input type="file" multiple className="hidden" onChange={handleImageUpload} accept="image/*" />
                          </label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-sm rounded-2xl">
                    <CardContent className="p-6">
                      <h3 className="text-sm font-bold text-slate-900 mb-2">Visibility</h3>
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-700">{field.value === "in-stock" ? "Visible" : "Hidden"}</span>
                            <Switch checked={field.value === "in-stock"} onCheckedChange={(checked) => field.onChange(checked ? "in-stock" : "out-of-stock")} />
                          </div>
                        )}
                      />
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-7">
                  <Card className="border-none shadow-sm rounded-2xl overflow-hidden min-h-full bg-white">
                    <CardContent className="p-10">
                      <Tabs defaultValue="general" className="w-full">
                        <TabsList className="w-full bg-slate-50 p-1 mb-8 h-12 rounded-xl grid grid-cols-2">
                          <TabsTrigger value="general" className="rounded-lg data-[state=active]:bg-white font-bold text-xs uppercase tracking-widest">General</TabsTrigger>
                          <TabsTrigger value="advanced" className="rounded-lg data-[state=active]:bg-white font-bold text-xs uppercase tracking-widest">Advanced</TabsTrigger>
                        </TabsList>

                        <TabsContent value="general" className="space-y-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Product Name</FormLabel>
                                <FormControl><Input className="h-12 rounded-xl" {...field} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="brand"
                              render={({ field }) => (
                                <FormItem className="space-y-2">
                                  <FormLabel className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Brand</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger className="h-12 rounded-xl"><SelectValue /></SelectTrigger></FormControl>
                                    <SelectContent className="rounded-xl">
                                      <SelectItem value="rayban">Ray-Ban</SelectItem>
                                      <SelectItem value="oakley">Oakley</SelectItem>
                                      <SelectItem value="smart-eye">SmartEye</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="category"
                              render={({ field }) => (
                                <FormItem className="space-y-2">
                                  <FormLabel className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Category</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger className="h-12 rounded-xl"><SelectValue /></SelectTrigger></FormControl>
                                    <SelectContent className="rounded-xl">
                                      <SelectItem value="mens">Men's Glasses</SelectItem>
                                      <SelectItem value="womens">Women's Glasses</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="price"
                              render={({ field }) => (
                                <FormItem className="space-y-2">
                                  <FormLabel className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Price (BDT)</FormLabel>
                                  <FormControl><Input type="number" className="h-12 rounded-xl" {...field} /></FormControl>
                                </FormItem>
                              )}
                            />
                             <FormField
                              control={form.control}
                              name="discountPrice"
                              render={({ field }) => (
                                <FormItem className="space-y-2">
                                  <FormLabel className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Discount %</FormLabel>
                                  <FormControl><Input type="number" className="h-12 rounded-xl" {...field} /></FormControl>
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
                                <FormControl><Textarea className="min-h-[120px] rounded-xl p-4" {...field} /></FormControl>
                              </FormItem>
                            )}
                          />
                        </TabsContent>

                        <TabsContent value="advanced" className="space-y-8">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <FormField
                               control={form.control}
                               name="sku"
                               render={({ field }) => (
                                 <FormItem className="space-y-2">
                                   <FormLabel className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">SKU</FormLabel>
                                   <div className="flex gap-2">
                                     <Input className="h-12 rounded-xl" readOnly {...field} />
                                     <Button type="button" onClick={generateSKU} variant="outline" size="icon" className="h-12 w-12 rounded-xl"><RefreshCcw className="h-4 w-4" /></Button>
                                   </div>
                                 </FormItem>
                               )}
                             />
                             <FormField
                               control={form.control}
                               name="stock"
                               render={({ field }) => (
                                 <FormItem className="space-y-2">
                                   <FormLabel className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Stock</FormLabel>
                                   <Input type="number" className="h-12 rounded-xl" {...field} />
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
                                          const updated = current.includes(item) ? current.filter(v => v !== item) : [...current, item];
                                          field.onChange(updated);
                                        }}
                                        className={cn( "flex items-center justify-between p-4 rounded-xl cursor-pointer border-2 transition-all text-xs font-bold", field.value?.includes(item) ? "bg-blue-50/50 border-blue-200 text-blue-600" : "bg-slate-50 border-transparent text-slate-400" )}
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

export default EditProductModal;
