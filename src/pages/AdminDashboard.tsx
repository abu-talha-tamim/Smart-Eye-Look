import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products } from "@/data/products";
import { Package, Users, ShoppingCart, BarChart3, Plus, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Total Products", value: products.length, icon: Package },
  { label: "Total Orders", value: 24, icon: ShoppingCart },
  { label: "Customers", value: 156, icon: Users },
  { label: "Revenue", value: "৳45,200", icon: BarChart3 },
];

const AdminDashboard = () => (
  <div className="container py-10">
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your SmartEyeLook store</p>
      </div>
      <Button className="gap-2"><Plus className="h-4 w-4" /> Add Product</Button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      {stats.map((s) => (
        <div key={s.label} className="p-5 border rounded-lg bg-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">{s.label}</span>
            <s.icon className="h-5 w-5 text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">{s.value}</p>
        </div>
      ))}
    </div>

    <div className="border rounded-lg bg-card">
      <div className="p-5 border-b flex items-center justify-between">
        <h2 className="font-semibold text-foreground">Products</h2>
        <Input placeholder="Search products..." className="max-w-xs" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-secondary">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Product</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">SKU</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Price</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Category</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b last:border-0 hover:bg-secondary/50">
                <td className="p-4 flex items-center gap-3">
                  <img src={p.image} alt={p.name} className="w-10 h-10 rounded object-cover" width={40} height={40} />
                  <span className="text-sm font-medium text-foreground">{p.name}</span>
                </td>
                <td className="p-4 text-sm text-muted-foreground">{p.sku}</td>
                <td className="p-4 text-sm text-foreground font-medium">৳{p.price.toLocaleString()}</td>
                <td className="p-4 text-sm text-muted-foreground capitalize">{p.category}</td>
                <td className="p-4">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-success/10 text-success">In Stock</span>
                </td>
                <td className="p-4">
                  <div className="flex gap-1">
                    <Link to={`/product/${p.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
