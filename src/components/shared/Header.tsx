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
        <div className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-extrabold text-primary">
                    Tech<span className="text-gray-800">Sphere</span>       
                </Link>

                
            </nav>
        </div>
    )
}