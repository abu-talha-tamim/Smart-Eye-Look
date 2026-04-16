"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Settings, LogOut, Bell, Package, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

const AdminProfile = () => {
  const { data: session }: any = useSession();
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        const stats = await res.json();
        if (res.ok) setNotifications(stats.notifications || []);
      } catch (error) {
        console.error("Failed to load notifications");
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-50 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 px-10">
      <div className="flex items-center gap-6">
        <div className="relative">
          <Avatar className="h-20 w-20 border-4 border-slate-50 shadow-2xl">
            <AvatarImage src={`https://ui-avatars.com/api/?name=${session?.user?.name || "Admin"}&background=06152a&color=fff`} />
            <AvatarFallback>{session?.user?.name?.charAt(0) || "A"}</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-1 right-1 h-5 w-5 bg-emerald-500 border-4 border-white rounded-full animate-pulse" />
        </div>
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <h2 className="text-2xl font-black text-[#1e293b] tracking-tighter">{session?.user?.name || "Admin Master"}</h2>
            <Badge className="bg-navy hover:bg-navy/90 font-black text-[9px] uppercase tracking-widest px-3 py-0.5 border-none">
               {session?.user?.role || "Staff"}
            </Badge>
          </div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{session?.user?.email} • SmartEye Boutique</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Notifications Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-slate-100 hover:bg-slate-50 relative">
              <Bell className="h-6 w-6 text-slate-400" />
              {notifications.length > 0 && (
                <span className="absolute top-3 right-3 h-3 w-3 bg-red-500 border-2 border-white rounded-full" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 rounded-[2rem] p-6 shadow-2xl border-slate-100" align="end">
            <div className="flex items-center justify-between mb-4 px-2">
              <h4 className="font-black text-sm uppercase tracking-widest text-navy">System Alerts</h4>
              <Badge variant="outline" className="rounded-full text-[9px] font-black">{notifications.length}</Badge>
            </div>
            <Separator className="mb-4" />
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
              {notifications.length === 0 ? (
                <p className="text-center text-xs text-slate-400 py-6 font-bold uppercase tracking-widest">No New Alerts</p>
              ) : (
                notifications.map((n, i) => (
                  <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all cursor-default group">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${n.type === 'stock' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                      {n.type === 'stock' ? <Package className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-900 group-hover:text-navy transition-colors">{n.title}</p>
                      <p className="text-[10px] text-slate-500 font-medium inline-block truncate w-40">{n.message}</p>
                      <p className="text-[8px] text-slate-300 font-black uppercase mt-1 tracking-widest">{n.time}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>

        <Button 
          variant="outline" 
          size="icon" 
          className="h-14 w-14 rounded-2xl border-slate-100 hover:bg-slate-50"
          onClick={() => toast.info("Settings panel is under maintenance.")}
        >
          <Settings className="h-6 w-6 text-slate-400" />
        </Button>
        <Button 
          variant="ghost" 
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="h-14 px-8 rounded-2xl text-red-500 hover:bg-red-50 hover:text-red-600 font-black uppercase text-[10px] tracking-widest gap-3 transition-all active:scale-95"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </Button>
      </div>
    </div>
  );
};

export default AdminProfile;
