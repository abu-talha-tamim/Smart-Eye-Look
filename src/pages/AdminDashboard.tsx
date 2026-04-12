import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, FileText, CheckCircle, AlertTriangle, BarChart3, Search } from "lucide-react";

const stats = [
  { label: "Total Users", value: "10,840", icon: Users, color: "text-primary" },
  { label: "Pending Approvals", value: "127", icon: FileText, color: "text-yellow-500" },
  { label: "Approved Profiles", value: "10,512", icon: CheckCircle, color: "text-green-500" },
  { label: "Reports", value: "23", icon: AlertTriangle, color: "text-destructive" },
];

const mockUsers = [
  { id: "ODM-30775", name: "Ahmed Khan", gender: "Male", district: "Dhaka", status: "Approved", date: "2026-04-01" },
  { id: "ODM-30776", name: "Fatima Akter", gender: "Female", district: "Chittagong", status: "Pending", date: "2026-04-05" },
  { id: "ODM-30777", name: "Rahim Uddin", gender: "Male", district: "Rajshahi", status: "Approved", date: "2026-04-03" },
  { id: "ODM-30778", name: "Mariam Begum", gender: "Female", district: "Sylhet", status: "Rejected", date: "2026-04-07" },
  { id: "ODM-30779", name: "Karim Sheikh", gender: "Male", district: "Khulna", status: "Pending", date: "2026-04-10" },
];

const AdminDashboard = () => {
  const [tab, setTab] = useState<"users" | "reports">("users");

  return (
    <main className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Admin <span className="gradient-text">Dashboard</span></h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center gap-3">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-4">
          <Button variant={tab === "users" ? "default" : "outline"} size="sm" onClick={() => setTab("users")} className={tab === "users" ? "gradient-primary text-primary-foreground border-0" : ""}>
            Manage Users
          </Button>
          <Button variant={tab === "reports" ? "default" : "outline"} size="sm" onClick={() => setTab("reports")} className={tab === "reports" ? "gradient-primary text-primary-foreground border-0" : ""}>
            Reports
          </Button>
        </div>

        {tab === "users" && (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by name or ID..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 font-medium text-muted-foreground">ID</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Name</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Gender</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">District</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="border-t border-border hover:bg-muted/30">
                      <td className="p-3 text-primary font-medium">{user.id}</td>
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.gender}</td>
                      <td className="p-3">{user.district}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          user.status === "Approved" ? "bg-green-100 text-green-700" :
                          user.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                          "bg-red-100 text-red-700"
                        }`}>{user.status}</span>
                      </td>
                      <td className="p-3 text-muted-foreground">{user.date}</td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" className="text-xs h-7">View</Button>
                          {user.status === "Pending" && (
                            <>
                              <Button size="sm" className="text-xs h-7 bg-green-500 hover:bg-green-600 text-primary-foreground">Approve</Button>
                              <Button size="sm" variant="destructive" className="text-xs h-7">Reject</Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "reports" && (
          <div className="bg-card rounded-xl border border-border p-8 text-center">
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Reports dashboard coming soon</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;
