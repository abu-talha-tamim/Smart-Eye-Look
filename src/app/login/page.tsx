"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(isSignup ? "Account created! Please log in." : "Login successful!");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-10">
      <div className="w-full max-w-md p-8 border rounded-lg bg-card">
        <div className="text-center mb-8">
          <Eye className="h-10 w-10 text-primary mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-foreground">{isSignup ? "Create Account" : "Welcome Back"}</h1>
          <p className="text-sm text-muted-foreground mt-1">{isSignup ? "Join SmartEyeLook today" : "Sign in to your account"}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" required />
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" required />
          </div>
          <Button type="submit" className="w-full" size="lg">{isSignup ? "Sign Up" : "Sign In"}</Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => setIsSignup(!isSignup)} className="text-primary font-medium hover:underline">
            {isSignup ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
