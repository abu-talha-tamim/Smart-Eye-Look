import { useState } from "react";
import Link from "next/link";
import { Eye, Trash2, Edit3, Search, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/data/products";
import EditProductModal from "./EditProductModal";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ProductManagementProps {
  products: Product[];
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
}

const ProductManagement = ({ products, onUpdateProduct, onDeleteProduct }: ProductManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const confirmDelete = (id: string) => {
    onDeleteProduct(id);
    toast.success("Product removed from collection");
  };

  return (
    <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden bg-white">
      <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            Collection Management
            <Badge variant="outline" className="rounded-full px-2 py-0 h-5 text-[10px] font-black border-slate-200 text-slate-400">
              {filteredProducts.length} Results
            </Badge>
          </h2>
          <p className="text-xs text-slate-500 font-medium">Curate and refine your luxury inventory.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by ID or Name..."
              className="pl-11 h-12 bg-slate-50/50 border-none rounded-xl text-sm focus-visible:ring-blue-500/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl">
             <Button 
                variant={viewMode === "list" ? "white" : "ghost"} 
                size="icon" 
                onClick={() => setViewMode("list")}
                className={`h-10 w-10 rounded-lg ${viewMode === "list" ? "shadow-sm" : "hover:bg-slate-200"}`}
              >
               <List className="h-4 w-4" />
             </Button>
             <Button 
                variant={viewMode === "grid" ? "white" : "ghost"} 
                size="icon" 
                onClick={() => setViewMode("grid")}
                className={`h-10 w-10 rounded-lg ${viewMode === "grid" ? "shadow-sm" : "hover:bg-slate-200"}`}
              >
               <LayoutGrid className="h-4 w-4" />
             </Button>
          </div>
        </div>
      </div>

      <CardContent className="p-0">
        {viewMode === "list" ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400">
                  <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest">Product</th>
                  <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest">Pricing</th>
                  <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest">Category</th>
                  <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest">Status</th>
                  <th className="text-right py-5 px-8 text-[10px] font-black uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-5 px-8">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-2xl overflow-hidden shadow-sm border border-white">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 leading-none mb-1">{p.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 font-mono tracking-tighter uppercase">{p.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-8">
                      <div className="space-y-0.5">
                        <p className="text-sm font-black text-slate-900">৳{p.price.toLocaleString()}</p>
                        {p.originalPrice && (
                          <p className="text-[10px] text-slate-400 line-through">৳{p.originalPrice.toLocaleString()}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-5 px-8">
                      <Badge variant="secondary" className="bg-slate-100 text-slate-500 font-bold uppercase text-[9px] tracking-widest border-none">
                        {p.category}
                      </Badge>
                    </td>
                    <td className="py-5 px-8">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${p.inStock ? "bg-green-500" : "bg-red-400"}`} />
                        <span className={`text-[10px] font-black uppercase tracking-widest ${p.inStock ? "text-green-600" : "text-red-500"}`}>
                          {p.inStock ? "Live" : "Archived"}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 px-8 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/product/${p.id}`}>
                          <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        
                        <EditProductModal 
                          product={p} 
                          onUpdateProduct={onUpdateProduct} 
                          trigger={
                            <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl">
                              <Edit3 className="h-4 w-4" />
                            </Button>
                          }
                        />

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="rounded-[1.5rem] border-none">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-xl font-black">Archive this product?</AlertDialogTitle>
                              <AlertDialogDescription className="text-sm font-medium">
                                This action will remove the product from the public boutique. You can re-list it later from the vault.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="rounded-xl font-bold">Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => confirmDelete(p.id)}
                                className="bg-red-500 hover:bg-red-600 rounded-xl font-bold"
                              >
                                Delete Forever
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {filteredProducts.map((p) => (
               <Card key={p.id} className="border-none shadow-sm group overflow-hidden bg-slate-50/30 rounded-2xl relative">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute top-3 right-3">
                       <Badge className={p.inStock ? "bg-green-500" : "bg-red-500"}>{p.inStock ? "Live" : "Out"}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                     <p className="text-sm font-bold text-slate-900 truncate">{p.name}</p>
                     <p className="text-xs font-black text-blue-600 mt-1">৳{p.price.toLocaleString()}</p>
                     <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                        <Link href={`/product/${p.id}`} className="text-[10px] font-black uppercase text-slate-400 hover:text-navy">View</Link>
                        <div className="flex gap-2">
                           <EditProductModal 
                             product={p} 
                             onUpdateProduct={onUpdateProduct}
                             trigger={<button className="text-slate-400 hover:text-amber-500"><Edit3 className="h-3.5 w-3.5" /></button>}
                           />
                           <button onClick={() => confirmDelete(p.id)} className="text-slate-400 hover:text-red-500"><Trash2 className="h-3.5 w-3.5" /></button>
                        </div>
                     </div>
                  </CardContent>
               </Card>
             ))}
          </div>
        )}
        
        {filteredProducts.length === 0 && (
          <div className="py-32 flex flex-col items-center text-center">
            <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center mb-6">
              <Search className="h-8 w-8 text-slate-200" />
            </div>
            <h3 className="text-lg font-black text-slate-900">No treasures found</h3>
            <p className="text-sm font-medium text-slate-500 max-w-xs mt-2">Adjust your search or add a new piece to the collection.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductManagement;
