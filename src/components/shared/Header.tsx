import { useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Menu, X, User } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useCartStore } from "../../store/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from '../../firebase';

const Header = () => {
    const { user } = useAuthStore();
    const { items } = useCartStore();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    const NavLink = [
        {name: "Televisions", path: "/category/Televisions"},
        {name: "Laptops", path: "/category/Laptops"},
        {name: "Computers", path: "/category/Computers"},
    ];

    return(
        <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-extrabold text-primary">Tech<span className="text-gray-800">Sphere</span></Link>

                <div className="hidden md:flex items-center gap-6 text-md font-medium">
                    {navLinks.map((link) => (
                        <NavLink key={link.name} to={link.path} className={({ isActive }) => 
                            `pb-1 border-b-2 ${isActive ? 'border-primary text-primary' : 'border-transparent text-gray-600 hover:text-primary'}`
                        }>
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full">
                        <ShoppingCart className="text-gray-700" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">{totalItems}</span>
                            )}
                    </Link>
                </div>
            </nav>
        </header>
           
    );
};

export default  Header;