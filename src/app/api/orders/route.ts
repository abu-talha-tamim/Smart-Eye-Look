import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Order from "@/lib/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    
    await dbConnect();

    const orderData = {
      ...body,
      user: session ? (session.user as any).id : null,
      totalAmount: body.items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0),
    };

    const order = await Order.create(orderData);

    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    console.error("❌ Order Creation Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    
    // Admins see all orders, users see only their own
    const query = (session.user as any).role === "admin" ? {} : { user: (session.user as any).id };
    const orders = await Order.find(query).sort({ createdAt: -1 }).populate("items.product");

    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
