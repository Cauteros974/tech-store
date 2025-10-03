import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { type Product, useCartStore } from "../store/cartStore";

const ProductCard = ({ product }: { product: Product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      <Link to={`/product/${product.id}`} className="flex-grow">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold truncate">{product.name}</h3>
          <p className="text-gray-500">{product.category}</p>
          <p className="text-xl font-bold mt-2">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
      <div className="p-4 pt-0 mt-auto">
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors font-semibold"
        >
          Add to cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
