"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Smartphone, Truck, ShieldCheck, Mail, MapPin, User, ArrowLeft, PackageCheck } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlaceOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const orderDetails = {
      items: items.map(item => ({
        product: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        lens: item.lensType
      })),
      shippingAddress: {
        fullName: formData.get("full-name"),
        address: formData.get("address"),
        city: formData.get("city"),
        phone: formData.get("phone"),
      },
      paymentMethod: formData.get("payment-method"),
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });

      if (res.ok) {
        clearCart();
        toast.success("Order Placed Successfully!");
        router.push("/");
      } else {
        const data = await res.json();
        throw new Error(data.error || "Order failed");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f0f2f5] min-h-screen pb-20 pt-6">
      <div className="container max-w-4xl">
        <div className="mb-10 flex items-center justify-between">
           <button onClick={() => router.back()} className="text-navy flex items-center gap-2 text-xs font-bold hover:gap-3 transition-all">
              <ArrowLeft className="h-4 w-4" /> Back to Collection
           </button>
           <h1 className="text-2xl md:text-3xl font-black text-navy tracking-tight">Checkout</h1>
        </div>
        
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-12 lg:col-span-7 space-y-6">
            {/* Simple Contact / Shipping Card */}
            <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
              <div className="p-8 border-b border-slate-100 flex items-center gap-3">
                 <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                 </div>
                 <div>
                    <h2 className="text-lg font-black text-navy leading-none">Shipping Information</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Delivery details for your specs</p>
                 </div>
              </div>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="full-name" className="text-xs font-bold text-navy">Full Name</Label>
                  <Input id="full-name" name="full-name" placeholder="E.g. Tanvir Hamim" required className="h-12 rounded-xl" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs font-bold text-navy text-primary">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="01XXX XXXXXX" required className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-bold text-navy">Email (Optional)</Label>
                    <Input id="email" name="email" type="email" placeholder="tanvir@example.com" className="h-12 rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2 pt-2 border-t border-slate-50">
                  <Label htmlFor="address" className="text-xs font-bold text-navy">Full Address</Label>
                  <Input id="address" name="address" placeholder="House #, Road #, Area" required className="h-12 rounded-xl" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <Label htmlFor="city" className="text-xs font-bold text-navy">City</Label>
                      <Input id="city" name="city" placeholder="Dhaka" required className="h-12 rounded-xl" />
                   </div>
                   <div className="space-y-2">
                      <Label htmlFor="postal" className="text-xs font-bold text-navy">Postal Code</Label>
                      <Input id="postal" name="postal" placeholder="1212" className="h-12 rounded-xl" />
                   </div>
                </div>
              </CardContent>
            </Card>

            {/* Simple Payment Selection */}
            <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
              <div className="p-8 border-b border-slate-100 flex items-center gap-3">
                 <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center">
                    <Smartphone className="h-5 w-5 text-amber-600" />
                 </div>
                 <div>
                    <h2 className="text-lg font-black text-navy leading-none">Select Payment</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Pay with bKash, Nagad or Cash</p>
                 </div>
              </div>
              <CardContent className="p-8 bg-slate-50/50">
                 <RadioGroup defaultValue="bkash" name="payment-method" className="grid grid-cols-2 gap-4">
                    <Label
                      htmlFor="bkash"
                      className="cursor-pointer flex items-center gap-4 bg-white p-4 rounded-2xl border-2 border-transparent transition-all hover:bg-slate-50 hover:border-pink-200 [&:has([data-state=checked])]:border-pink-500 [&:has([data-state=checked])]:bg-pink-50"
                    >
                      <RadioGroupItem value="bkash" id="bkash" className="sr-only" />
                      <div className="h-12 w-12 rounded-xl bg-pink-100 flex items-center justify-center shrink-0">
                         <Smartphone className="h-6 w-6 text-pink-600" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-pink-600">bKash</p>
                        <p className="text-[10px] text-slate-400 font-bold">Fast & Secure</p>
                      </div>
                    </Label>

                    <Label
                      htmlFor="nagad"
                      className="cursor-pointer flex items-center gap-4 bg-white p-4 rounded-2xl border-2 border-transparent transition-all hover:bg-slate-50 hover:border-orange-200 [&:has([data-state=checked])]:border-orange-500 [&:has([data-state=checked])]:bg-orange-50"
                    >
                      <RadioGroupItem value="nagad" id="nagad" className="sr-only" />
                      <div className="h-12 w-12 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                         <Smartphone className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-orange-600">Nagad</p>
                        <p className="text-[10px] text-slate-400 font-bold">Safe Easy</p>
                      </div>
                    </Label>

                    <Label
                      htmlFor="cod"
                      className="col-span-2 cursor-pointer flex items-center gap-4 bg-white p-4 rounded-2xl border-2 border-transparent transition-all hover:bg-slate-50 hover:border-navy/20 [&:has([data-state=checked])]:border-navy [&:has([data-state=checked])]:bg-navy/5"
                    >
                      <RadioGroupItem value="cod" id="cod" className="sr-only" />
                      <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                         <Truck className="h-6 w-6 text-navy" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-navy">Cash on Delivery</p>
                        <p className="text-[10px] text-slate-400 font-bold">Pay when you receive the product</p>
                      </div>
                    </Label>
                 </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Right: Modern Summary */}
          <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-6">
             <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-navy text-white">
                <div className="p-8 border-b border-white/5 flex items-center gap-3">
                   <PackageCheck className="h-6 w-6 text-primary" />
                   <div>
                      <h2 className="text-lg font-black uppercase tracking-tight">Order Summary</h2>
                      <p className="text-xs text-white/40">Item checkout</p>
                   </div>
                </div>
                <CardContent className="p-8 space-y-6">
                   <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
                      {items.map((item) => (
                        <div key={`${item.product.id}-${item.lensType}`} className="flex justify-between items-center text-sm">
                           <div className="space-y-1">
                              <p className="font-extrabold">{item.product.name} ({item.quantity})</p>
                              <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">{item.lensType}</p>
                           </div>
                           <p className="font-bold">৳{(item.product.price * item.quantity).toLocaleString()}</p>
                        </div>
                      ))}
                      {items.length === 0 && <p className="text-sm text-white/20 text-center py-4">Wait! Your cart is empty.</p>}
                   </div>
                   
                   <div className="pt-6 border-t border-white/5 space-y-3">
                      <div className="flex justify-between text-xs font-bold text-white/40">
                         <span>Subtotal</span>
                         <span className="text-white">৳{totalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs font-bold text-white/40">
                         <span>Delivery Fee</span>
                         <span className="text-primary font-black uppercase tracking-widest text-[10px]">Free Shipping</span>
                      </div>
                      <Separator className="bg-white/5 my-4" />
                      <div className="flex justify-between items-center text-3xl font-black">
                         <span className="tracking-tighter">Total</span>
                         <span className="text-primary">৳{totalPrice.toLocaleString()}</span>
                      </div>
                   </div>

                   <Button 
                    type="submit" 
                    disabled={isSubmitting || items.length === 0}
                    className="w-full h-16 rounded-2xl bg-white text-navy hover:bg-white/90 font-black uppercase tracking-[0.2em] text-[11px] mt-4 active:scale-95 transition-all shadow-2xl"
                   >
                     {isSubmitting ? "Placing Order..." : "Confirm Purchase"}
                   </Button>
                   
                   <div className="flex items-center justify-center gap-2 text-[8px] text-white/20 uppercase tracking-[0.4em] font-black mt-2">
                     <ShieldCheck className="h-3 w-3" /> Secure Luxury Checkout
                   </div>
                </CardContent>
             </Card>

             <Card className="border-none shadow-sm rounded-3xl bg-amber-50/50 border border-amber-100 p-6">
                <div className="flex items-start gap-4">
                   <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                      <ShieldCheck className="h-6 w-6 text-amber-600" />
                   </div>
                   <div>
                      <h4 className="text-sm font-black text-amber-700 uppercase tracking-tight">Trust Guarantee</h4>
                      <p className="text-xs text-amber-600/70 font-medium leading-relaxed mt-1">SmartEyeLook provides 1-Year replacement warranty on all frames.</p>
                   </div>
                </div>
             </Card>
          </div>
        </form>
      </div>
    </div>
  );
}
