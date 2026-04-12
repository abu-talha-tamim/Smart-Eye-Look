import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="bg-card rounded-lg border overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="aspect-square overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={512}
            height={512}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-foreground text-sm">{product.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-bold text-primary">৳{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">৳{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <Button onClick={handleAdd} className="w-full mt-3 gap-2" size="sm">
            <ShoppingCart className="h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
