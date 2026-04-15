"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Smartphone, Truck, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, redirect back to shop (simulated here for robust flow)
  // In a real app, this would be an effect.
  
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Order placed successfully!", {
        description: "Checking out with SmartEyeLook is always a breeze.",
      });
      router.push("/");
    }, 2000);
  };

  return (
    <div className="bg-secondary/30 min-h-screen py-10 md:py-20">
      <div className="container max-w-6xl">
        <h1 className="text-4xl font-serif font-bold text-navy mb-8">Checkout</h1>
        
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-8">
            {/* Contact Information */}
            <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
              <CardHeader className="bg-white border-b border-slate-50">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" /> Contact Information
                </CardTitle>
                <CardDescription>We'll use this to keep you updated on your order.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input id="full-name" placeholder="John Doe" required className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" required className="h-12 rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+880 1XXX XXXXXX" required className="h-12 rounded-xl" />
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
              <CardHeader className="bg-white border-b border-slate-50">
                <CardTitle className="text-xl flex items-center gap-2">
                   < Truck className="h-5 w-5 text-primary" /> Delivery Address
                </CardTitle>
                <CardDescription>Where should we send your masterpiece?</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4 bg-white">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" placeholder="123 Luxury Lane" required className="h-12 rounded-xl" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Dhaka" required className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">Area / Thana</Label>
                    <Input id="area" placeholder="Gulshan" required className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postal">Postal Code</Label>
                    <Input id="postal" placeholder="1212" required className="h-12 rounded-xl" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
              <CardHeader className="bg-white border-b border-slate-50">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-primary" /> Payment Method
                </CardTitle>
                <CardDescription>Choose your preferred payment way.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 bg-white">
                <RadioGroup defaultValue="bkash" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Label
                    htmlFor="bkash"
                    className="flex flex-col items-center justify-between rounded-xl border-2 border-slate-100 bg-white p-4 hover:bg-slate-50 hover:border-primary/20 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5 cursor-pointer transition-all"
                  >
                    <RadioGroupItem value="bkash" id="bkash" className="sr-only" />
                    <div className="bg-pink-100 p-2 rounded-lg mb-2">
                       <Smartphone className="h-6 w-6 text-pink-600" />
                    </div>
                    <span className="font-bold text-sm">bKash</span>
                  </Label>
                  
                  <Label
                    htmlFor="nagad"
                    className="flex flex-col items-center justify-between rounded-xl border-2 border-slate-100 bg-white p-4 hover:bg-slate-50 hover:border-primary/20 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5 cursor-pointer transition-all"
                  >
                    <RadioGroupItem value="nagad" id="nagad" className="sr-only" />
                    <div className="bg-orange-100 p-2 rounded-lg mb-2">
                       <Smartphone className="h-6 w-6 text-orange-600" />
                    </div>
                    <span className="font-bold text-sm">Nagad</span>
                  </Label>

                  <Label
                    htmlFor="card"
                    className="flex flex-col items-center justify-between rounded-xl border-2 border-slate-100 bg-white p-4 hover:bg-slate-50 hover:border-primary/20 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5 cursor-pointer transition-all"
                  >
                    <RadioGroupItem value="card" id="card" className="sr-only" />
                    <div className="bg-blue-100 p-2 rounded-lg mb-2">
                       <CreditCard className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="font-bold text-sm">Card</span>
                  </Label>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar / Summary */}
          <div className="lg:col-span-4 sticky top-10">
            <Card className="border-none shadow-lg rounded-2xl overflow-hidden bg-navy text-white">
              <CardHeader>
                <CardTitle className="text-xl">Order Summary</CardTitle>
                <CardDescription className="text-white/60">Review your collection before shipping.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.lensType}`} className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="text-sm font-bold">{item.product.name}</p>
                        <p className="text-[10px] text-white/50 uppercase tracking-widest">{item.lensType}</p>
                      </div>
                      <p className="text-sm font-bold">৳{(item.product.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                  {items.length === 0 && (
                    <p className="text-xs text-white/30 italic text-center py-4">No items in selection</p>
                  )}
                </div>
                
                <Separator className="bg-white/10" />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Subtotal</span>
                    <span>৳{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Shipping</span>
                    <span className="text-green-400">FREE</span>
                  </div>
                  <Separator className="bg-white/10 my-4" />
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total</span>
                    <span className="text-primary">৳{totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting || items.length === 0}
                  className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-navy font-black text-sm uppercase tracking-widest active:scale-95 transition-all mt-4"
                >
                  {isSubmitting ? "Processing..." : "Confirm Collection"}
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-[10px] text-white/40 uppercase tracking-widest mt-4">
                  <ShieldCheck className="h-3 w-3" /> Secure Luxury Checkout
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}
