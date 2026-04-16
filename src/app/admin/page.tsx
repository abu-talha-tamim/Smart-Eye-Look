"use client";

import { useState, useEffect } from "react";
import { Product } from "@/data/products";
import AddProductModal from "@/components/AddProductModal";
import AdminProfile from "@/components/admin/AdminProfile";
import DashboardStats from "@/components/admin/DashboardStats";
import ProductManagement from "@/components/admin/ProductManagement";
import UserManagement from "@/components/admin/UserManagement";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, PackageSearch, Users2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function AdminPage() {
  const { data: session }: any = useSession();
  const [productList, setProductList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (Array.isArray(data)) {
          setProductList(data);
        }
      } catch (error) {
        toast.error("Failed to load collection");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async (newProduct: Product) => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();
      if (res.ok) {
        setProductList((prev) => [data, ...prev]);
        toast.success("Product published to boutique!");
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to add product");
    }
  };

  const handleUpdateProduct = async (updatedProduct: Product) => {
    try {
      const res = await fetch(`/api/products/${updatedProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
      const data = await res.json();
      if (res.ok) {
        setProductList((prev) => 
          prev.map((p) => p.id === updatedProduct.id ? data : p)
        );
        toast.success("Boutique inventory updated");
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast.error(error.message || "Update failed");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProductList((prev) => prev.filter((p) => p.id !== id));
        toast.success("Product removed from collection");
      } else {
        const data = await res.json();
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast.error(error.message || "Deletion failed");
    }
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20">
      <div className="bg-navy h-[340px] w-full absolute top-0 left-0" />
      
      <div className="container relative z-10 pt-12 md:pt-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
               <span className="bg-primary/20 text-primary-foreground text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                  {session?.user?.role || "Staff"} Access
               </span>
               <button 
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-white/40 hover:text-white flex items-center gap-1.5 text-xs font-bold transition-colors"
               >
                  <LogOut className="h-3.5 w-3.5" /> Sign Out
               </button>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Staff Command</h1>
            <p className="text-white/40 font-medium text-sm mt-1">Manage infrastructure & inventory at SmartEyeLook.</p>
          </div>
          <AddProductModal onAddProduct={handleAddProduct} />
        </div>

        <AdminProfile />
        <DashboardStats productListCount={productList.length} />
        
        <Tabs defaultValue="inventory" className="w-full mt-10">
          <TabsList className="bg-white/5 backdrop-blur-md p-1.5 rounded-2xl h-auto gap-2 mb-8 inline-flex border border-white/10">
            <TabsTrigger 
              value="inventory" 
              className="rounded-xl px-6 py-3 data-[state=active]:bg-white data-[state=active]:text-navy data-[state=active]:shadow-lg font-black text-[10px] uppercase tracking-widest gap-2"
            >
              <PackageSearch className="h-4 w-4" /> Inventory
            </TabsTrigger>
            <TabsTrigger 
              value="team" 
              disabled={session?.user?.role !== "admin"}
              className="rounded-xl px-6 py-3 data-[state=active]:bg-white data-[state=active]:text-navy data-[state=active]:shadow-lg font-black text-[10px] uppercase tracking-widest gap-2 disabled:opacity-30"
            >
              <Users2 className="h-4 w-4" /> Team Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {isLoading ? (
              <div className="py-20 flex justify-center">
                <div className="h-8 w-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              </div>
            ) : (
              <ProductManagement 
                products={productList} 
                onUpdateProduct={handleUpdateProduct} 
                onDeleteProduct={handleDeleteProduct} 
              />
            )}
          </TabsContent>

          <TabsContent value="team" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <UserManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
