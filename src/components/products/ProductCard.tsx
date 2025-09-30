import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Product, useCartStore } from "../../store/cartStore";

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
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group flex flex-col">
            variant = {itemVariants}
        </motion.div>
    )
}