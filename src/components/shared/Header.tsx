import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { motion } from 'framer-motion';

const Header = () => {
    const items = useCartStore((state) => state.items);
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);

    return(
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to= "/" className="text-2xl font-bold text-gray-800">
                    Tech-Store
                </Link>

                <div className="flex items-center gap-6 text-lg">
                    <Link to="/" className="text-gray-600 hover:text-blue-500">Main</Link>
                    <Link to="/catalog" className="text-gray-600 hover:text-blue-500">Catalog</Link>
                </div>

                <Link to="/cart" className="relative">
                <ShoppingCart className="h-7 w-7 text-gray-600" />
                {totalItems > 0 && (
                    <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold"
                    >
                        {totalItems}
                    </motion.span>
                )}
                </Link>
            </nav>
        </header>
    )
};

export default  Header;