import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Settings, LogOut, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminProfile = () => {
  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-6">
        <div className="relative">
          <Avatar className="h-20 w-20 border-4 border-slate-50 shadow-xl">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 h-5 w-5 bg-green-500 border-4 border-white rounded-full animate-pulse" />
        </div>
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Admin Master</h2>
            <Badge className="bg-blue-600 hover:bg-blue-700 font-black text-[10px] uppercase tracking-widest px-3">Super Admin</Badge>
          </div>
          <p className="text-sm text-slate-500 font-medium">admin@smarteyelook.com • Gulshan, Dhaka</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-slate-200 hover:bg-slate-50">
          <Bell className="h-5 w-5 text-slate-400" />
        </Button>
        <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-slate-200 hover:bg-slate-50">
          <Settings className="h-5 w-5 text-slate-400" />
        </Button>
        <Button variant="ghost" className="h-12 px-6 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 font-bold gap-2">
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </Button>
      </div>
    </div>
  );
};

export default AdminProfile;
