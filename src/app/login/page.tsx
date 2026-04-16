"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success("Login successful!");
        router.push("/admin");
        router.refresh();
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-10">
      <div className="w-full max-w-md p-8 border rounded-[1.5rem] bg-card shadow-2xl shadow-navy/5">
        <div className="text-center mb-8">
          <Eye className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-black text-foreground tracking-tight">Staff Portal</h1>
          <p className="text-sm text-muted-foreground mt-2">Sign in to manage the boutique collection</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              name="email"
              type="email" 
              placeholder="admin@smarteyelook.com" 
              className="h-12 rounded-xl"
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              name="password"
              type="password" 
              placeholder="••••••••" 
              className="h-12 rounded-xl"
              required 
            />
          </div>
          <Button 
            type="submit" 
            className="w-full h-12 rounded-xl bg-navy hover:bg-navy/90 font-bold" 
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign In to Dashboard"}
          </Button>
        </form>

        <div className="mt-8 p-4 bg-muted/30 rounded-xl">
          <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest font-black">
            Secured by SmartEye Auth
          </p>
        </div>
      </div>
    </div>
  );
}
