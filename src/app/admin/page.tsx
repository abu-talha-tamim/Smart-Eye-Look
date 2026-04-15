"use client";

import { useState, useEffect } from "react";
import { Product } from "@/data/products";
import AddProductModal from "@/components/AddProductModal";
import AdminProfile from "@/components/admin/AdminProfile";
import DashboardStats from "@/components/admin/DashboardStats";
import ProductManagement from "@/components/admin/ProductManagement";
import { toast } from "sonner";

export default function AdminPage() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch products on load
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
      <div className="bg-navy h-[300px] w-full absolute top-0 left-0" />
      
      <div className="container relative z-10 pt-12 md:pt-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight mb-2">Inventory Control</h1>
            <p className="text-white/60 font-medium">Boutique Management & Analytics</p>
          </div>
          <AddProductModal onAddProduct={handleAddProduct} />
        </div>

        <AdminProfile />
        <DashboardStats productListCount={productList.length} />
        
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
      </div>
    </div>
  );
}
