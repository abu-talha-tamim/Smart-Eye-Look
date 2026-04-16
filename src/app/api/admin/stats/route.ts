import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !["admin", "staff"].includes((session.user as any).role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    // 1. Calculate Total Revenue & Total Orders
    const orders = await Order.find({ paymentStatus: "paid" });
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);
    const totalOrders = await Order.countDocuments();

    // 2. Calculate Inventory Status
    const totalProducts = await Product.countDocuments();
    const lowStockProducts = await Product.countDocuments({ inStock: false });

    // 3. Monthly Stats (Simple Calculation)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentOrders = await Order.find({ 
      createdAt: { $gte: thirtyDaysAgo },
      paymentStatus: "paid" 
    });
    const monthlyRevenue = recentOrders.reduce((acc, order) => acc + order.totalAmount, 0);

    // 4. Notifications (Low stock and recent orders)
    const notifications = [
      ...(lowStockProducts > 0 ? [{
        type: "stock",
        title: "Low Inventory Warning",
        message: `${lowStockProducts} products are currently out of stock.`,
        time: "Just now"
      }] : []),
      ...recentOrders.slice(0, 3).map(o => ({
        type: "order",
        title: "New Transaction",
        message: `Order #${o._id.toString().slice(-6)} received - ৳${o.totalAmount}`,
        time: "Today"
      }))
    ];

    return NextResponse.json({
      revenue: totalRevenue,
      monthlyRevenue,
      totalOrders,
      totalProducts,
      lowStockCount: lowStockProducts,
      notifications
    });
  } catch (error: any) {
    console.error("❌ Stats API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
