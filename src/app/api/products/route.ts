import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/lib/models/Product";

// GET: Fetch all products
export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Add a new product
export async function POST(req: Request) {
  try {
    const body = await req.json();
    await dbConnect();
    
    // We expect the image URL to already be uploaded (e.g., from Cloudinary on the client side or a secondary endpoint)
    const product = await Product.create(body);
    
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error("❌ API Error [POST /api/products]:", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
