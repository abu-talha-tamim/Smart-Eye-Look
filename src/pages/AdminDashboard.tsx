import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products as initialProducts, Product } from "@/data/products";
import { Package, Users, ShoppingCart, BarChart3, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import AddProductModal from "@/components/AddProductModal";

const AdminDashboard = () => {
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddProduct = (newProduct: Product) => {
    setProductList((prev) => [newProduct, ...prev]);
  };

  const filteredProducts = productList.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: "Total Products", value: productList.length, icon: Package },
    { label: "Total Orders", value: 24, icon: ShoppingCart },
    { label: "Customers", value: 156, icon: Users },
    { label: "Revenue", value: "৳45,200", icon: BarChart3 },
  ];

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your SmartEyeLook store</p>
        </div>
        <AddProductModal onAddProduct={handleAddProduct} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="p-5 border rounded-lg bg-card transition-all hover:shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className="h-5 w-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="border rounded-lg bg-card overflow-hidden shadow-sm">
        <div className="p-5 border-b flex items-center justify-between bg-white">
          <h2 className="font-semibold text-foreground">Products</h2>
          <Input
            placeholder="Search products..."
            className="max-w-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-secondary/50">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Product</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">SKU</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Price</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Category</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="w-10 h-10 rounded-md object-cover ring-1 ring-border" width={40} height={40} />
                    <span className="text-sm font-medium text-foreground">{p.name}</span>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground font-mono">{p.sku}</td>
                  <td className="p-4 text-sm text-foreground font-medium">৳{p.price.toLocaleString()}</td>
                  <td className="p-4 text-sm text-muted-foreground capitalize">{p.category}</td>
                  <td className="p-4">
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full ${
                      p.inStock 
                        ? "bg-green-100 text-green-700" 
                        : "bg-red-100 text-red-700"
                    }`}>
                      {p.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <Link to={`/product/${p.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary transition-colors">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-muted-foreground">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
