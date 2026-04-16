import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import path from "path";

// Load env from .env.local
dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is missing");
  process.exit(1);
}

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: { type: String, select: false },
  role: String,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const adminEmail = "smart012@gmail.com";
  const existing = await User.findOne({ email: adminEmail });

  if (existing) {
    console.log("Admin user already exists");
  } else {
    const hashedPassword = await bcrypt.hash("smarteye1", 12);
    await User.create({
      name: "Super Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });
    console.log("✅ Admin user seeded successfully");
  }

  process.exit(0);
}

seed().catch(console.error);
