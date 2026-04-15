import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this product."],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    sku: {
      type: String,
      required: [true, "Please provide a SKU."],
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please provide a price."],
    },
    originalPrice: {
      type: Number,
    },
    image: {
      type: String,
      required: [true, "Please provide an image URL."],
    },
    images: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      required: [true, "Please select a category."],
      enum: ["mens", "womens", "kids", "sunglasses", "prescription", "contact-lenses"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description."],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    lensOptions: {
      type: [String],
      default: ["Single Vision", "Sunglasses", "Bifocal", "Progressive"],
    },
    included: {
      type: [String],
      default: ["Premium Box", "Cleaning Kit", "Warranty Card", "Microfiber Cloth"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Check if the model exists before creating a new one to prevent errors on hot-reloading
export default models.Product || model("Product", ProductSchema);
