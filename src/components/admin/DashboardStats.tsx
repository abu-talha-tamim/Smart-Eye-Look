import { Package, Users, ShoppingCart, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatProps {
  productListCount: number;
}

const DashboardStats = ({ productListCount }: StatProps) => {
  const stats = [
    { label: "Total Products", value: productListCount, icon: Package, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Total Orders", value: 24, icon: ShoppingCart, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Customers", value: 156, icon: Users, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Revenue", value: "৳45,200", icon: BarChart3, color: "text-purple-500", bg: "bg-purple-50" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((s) => (
        <Card key={s.label} className="border-none shadow-sm hover:shadow-md transition-all duration-300 rounded-[1.5rem] overflow-hidden group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${s.bg} ${s.color} transition-transform group-hover:scale-110 duration-300`}>
                <s.icon className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Monthly Stats</span>
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900 mb-1">{s.value}</p>
              <h3 className="text-sm font-bold text-slate-500">{s.label}</h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
