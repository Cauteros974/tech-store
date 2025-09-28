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
            </nav>
        </header>
    )
};

export default  Header;