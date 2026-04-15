"use client";

import { useState } from "react";
import { products as initialProducts, Product } from "@/data/products";
import AddProductModal from "@/components/AddProductModal";
import AdminProfile from "@/components/admin/AdminProfile";
import DashboardStats from "@/components/admin/DashboardStats";
import ProductManagement from "@/components/admin/ProductManagement";

export default function AdminPage() {
  const [productList, setProductList] = useState<Product[]>(initialProducts);

  const handleAddProduct = (newProduct: Product) => {
    setProductList((prev) => [newProduct, ...prev]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProductList((prev) => 
      prev.map((p) => p.id === updatedProduct.id ? updatedProduct : p)
    );
  };

  const handleDeleteProduct = (id: string) => {
    setProductList((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20">
      {/* Header with Background Accent */}
      <div className="bg-navy h-[300px] w-full absolute top-0 left-0" />
      
      <div className="container relative z-10 pt-12 md:pt-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight mb-2">Inventory Control</h1>
            <p className="text-white/60 font-medium">Boutique Management & Analytics</p>
          </div>
          <AddProductModal onAddProduct={handleAddProduct} />
        </div>

        {/* Modular Components */}
        <AdminProfile />
        <DashboardStats productListCount={productList.length} />
        <ProductManagement 
          products={productList} 
          onUpdateProduct={handleUpdateProduct} 
          onDeleteProduct={handleDeleteProduct} 
        />
      </div>
    </div>
  );
}
