"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
        <Link href="/shop"><Button>Browse Products</Button></Link>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.product.id + item.lensType} className="flex gap-4 p-4 border rounded-lg bg-card">
              <img src={item.product.image} alt={item.product.name} className="w-24 h-24 rounded-md object-cover" loading="lazy" width={96} height={96} />
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{item.product.name}</h3>
                <p className="text-sm text-muted-foreground">Lens: {item.lensType}</p>
                <p className="text-lg font-bold text-primary mt-1">৳{item.product.price.toLocaleString()}</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button 
                  onClick={() => removeFromCart(item.product.id, item.lensType)}
                  className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.lensType, item.quantity - 1)}>
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.lensType, item.quantity + 1)}>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border rounded-lg bg-card h-fit">
          <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">৳{totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-success font-medium">Free</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-bold">
              <span>Total</span>
              <span className="text-primary">৳{totalPrice.toLocaleString()}</span>
            </div>
          </div>
          <Button className="w-full mb-3" size="lg" onClick={() => router.push("/checkout")}>Checkout</Button>
          <Button variant="outline" onClick={clearCart} className="w-full" size="sm">Clear Cart</Button>
        </div>
      </div>
    </div>
  );
}
