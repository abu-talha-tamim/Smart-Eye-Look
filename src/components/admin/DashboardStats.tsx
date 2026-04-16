"use client";

import { useEffect, useState } from "react";
import { Package, Users, ShoppingCart, BarChart3, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsData {
  revenue: number;
  monthlyRevenue: number;
  totalOrders: number;
  totalProducts: number;
  lowStockCount: number;
}

const DashboardStats = ({ productListCount }: { productListCount: number }) => {
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        const stats = await res.json();
        if (res.ok) setData(stats);
      } catch (error) {
        console.error("Failed to fetch dashboard stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [productListCount]);

  const stats = [
    { label: "Boutique Items", value: data?.totalProducts || productListCount, icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Orders", value: data?.totalOrders || 0, icon: ShoppingCart, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Revenue", value: `৳${data?.revenue.toLocaleString() || 0}`, icon: BarChart3, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Sales (30d)", value: `৳${data?.monthlyRevenue.toLocaleString() || 0}`, icon: BarChart3, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((s) => (
        <Card key={s.label} className="border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-[2rem] overflow-hidden group bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-4 rounded-2xl ${s.bg} ${s.color} transition-transform group-hover:rotate-6 duration-300 shadow-sm`}>
                <s.icon className="h-6 w-6" />
              </div>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin text-slate-200" />
              ) : (
                <span className="text-[10px] font-black uppercase tracking-widest text-[#64748b]">Live Analytics</span>
              )}
            </div>
            <div>
              <p className="text-3xl font-black text-[#1e293b] mb-1 tracking-tighter transition-all group-hover:translate-x-1">
                {s.value}
              </p>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{s.label}</h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
