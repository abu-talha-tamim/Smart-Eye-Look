"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, ShieldCheck, Mail, ShieldAlert, Trash2, PlusCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

const UserManagement = () => {
  const { data: session }: any = useSession();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (res.ok) setUsers(data);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.role === "admin") {
      fetchUsers();
    }
  }, [session]);

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) {
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
        toast.success(`Role updated to ${newRole}`);
      }
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const deleteUser = async (userId: string) => {
    if (confirm("Are you sure you want to remove this user?")) {
      try {
        const res = await fetch(`/api/admin/users/${userId}`, { method: "DELETE" });
        if (res.ok) {
          setUsers(users.filter(u => u.id !== userId));
          toast.success("User removed");
        }
      } catch (error) {
        toast.error("Failed to delete user");
      }
    }
  };

  if (session?.user?.role !== "admin") {
    return (
      <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden bg-white p-12 text-center">
        <ShieldAlert className="h-12 w-12 text-amber-500 mx-auto mb-4" />
        <h2 className="text-xl font-black">Restricted Access</h2>
        <p className="text-sm text-slate-500 max-w-xs mx-auto mt-2">Only Super Admins can manage staff members and access rights.</p>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden bg-white">
      <div className="p-8 border-b border-slate-50 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            Team & Permissions
            <Badge variant="outline" className="rounded-full px-2 py-0 h-5 text-[10px] font-black border-slate-200 text-slate-400">
               {users.length} Total
            </Badge>
          </h2>
          <p className="text-xs text-slate-500 font-medium tracking-tight mt-1">Manage staff roles and platform access.</p>
        </div>
        <Button className="rounded-xl h-10 px-4 bg-navy hover:bg-navy/90 gap-2 font-bold text-xs uppercase tracking-wider">
           <PlusCircle className="h-4 w-4" /> New Member
        </Button>
      </div>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400">
                <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest">Team Member</th>
                <th className="text-left py-5 px-8 text-[10px] font-black uppercase tracking-widest">Role</th>
                <th className="text-right py-5 px-8 text-[10px] font-black uppercase tracking-widest">Access Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map((u) => (
                <tr key={u.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-5 px-8">
                    <div className="flex items-center gap-4">
                       <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-navy font-bold">
                         {u.name.charAt(0)}
                       </div>
                       <div>
                         <p className="text-sm font-black text-slate-900 mb-0.5">{u.name}</p>
                         <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                           <Mail className="h-3 w-3" /> {u.email}
                         </div>
                       </div>
                    </div>
                  </td>
                  <td className="py-5 px-8">
                    <Badge className={`rounded-lg px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest border-none ${
                        u.role === "admin" ? "bg-purple-100 text-purple-600" : 
                        u.role === "staff" ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500"
                    }`}>
                       {u.role}
                    </Badge>
                  </td>
                  <td className="py-5 px-8 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {u.role === "customer" && (
                        <Button 
                          onClick={() => updateUserRole(u.id, "staff")} 
                          variant="ghost" 
                          size="sm" 
                          className="h-9 px-3 text-blue-600 hover:bg-blue-50 rounded-xl font-bold text-xs"
                        >
                          <PlusCircle className="h-3 w-3 mr-1.5" /> Promote to Staff
                        </Button>
                      )}
                      
                      {u.role === "staff" && (
                         <Button 
                           onClick={() => updateUserRole(u.id, "admin")} 
                           variant="ghost" 
                           size="sm" 
                           className="h-9 px-3 text-purple-600 hover:bg-purple-50 rounded-xl font-bold text-xs"
                         >
                           <ShieldCheck className="h-3 w-3 mr-1.5" /> Make Admin
                         </Button>
                      )}

                      <Button 
                        onClick={() => deleteUser(u.id)}
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                        disabled={u.email === session?.user?.email}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
