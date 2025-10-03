import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../../firebase';
import styles from '../shared/Header.module.css';

const Header = () => {
  const { user } = useAuthStore();
  const { items } = useCartStore();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: 'Televisions', path: '/category/Televisions' },
    { name: 'Laptops', path: '/category/Laptops' },
    { name: 'Computers', path: '/category/Computers' },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-primary">
          Tech<span className="text-gray-800">Sphere</span>
        </Link>

        <div className={styles.desktopMenu}>
          <NavLink to="/category/Laptops" className={({isActive}) => isActive ? styles.activeLink : styles.navLink}>Laptops</NavLink>
          <NavLink to="/category/Computers" className={({isActive}) => isActive ? styles.activeLink : styles.navLink}>Computers</NavLink>
        </div>
        
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
          
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <div className="relative group">
                <button className="p-2 hover:bg-gray-100 rounded-full"><User /></button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="block px-4 py-2 text-sm text-gray-700">{user.email}</span>
                  <button onClick={() => auth.signOut()} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Выйти</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm">
                LogIn
              </Link>
            )}
          </div>
          
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden z-50 p-2">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="flex flex-col items-center gap-4 py-4">
              {navLinks.map((link) => (
                <NavLink key={link.name} to={link.path} onClick={() => setMobileMenuOpen(false)} className="text-gray-700 font-medium">{link.name}</NavLink>
              ))}
              <hr className="w-1/2 my-2"/>
              {user ? (
                 <button onClick={() => auth.signOut()} className="text-gray-700 font-medium">LogOut</button>
              ) : (
                 <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="bg-primary text-white px-6 py-2 rounded-lg font-semibold">LogIn</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;