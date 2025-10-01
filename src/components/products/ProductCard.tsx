import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { type Product, useCartStore } from "../../store/cartStore";
import styles from './ProductCard.module.css';
interface ProductCardProps {
    product: Product;
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

const ProductCard = ({ product }: ProductCardProps) => {
    const addToCart = useCartStore(state => state.addToCart);


    return(
        <motion.div
            variants={itemVariants}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group flex flex-col"
        >
            <Link to={`/product/${product.id}`} className="block flex-grow">
                <div className="overflow-hidden relative">
                    <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded">{product.name}</span>
                </div>
                <div className="p-4">
                    <h3 className="font-bold text-lg truncate mt-1 text-gray-800">{product.name}</h3>
                    <p className="text-2xl font-extrabold mt-2 text-gray-900">${product.price.toFixed(2)}</p>
                </div>
            </Link>
            <div className="p-4 pt-0 mt-auto">
                <button 
                    onClick={() => addToCart(product)}
                    className="w-full bg-primary text-white font-bold py-2.5 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Add to Cart
                </button>
            </div>
        </motion.div>
    );
};

export default ProductCard;