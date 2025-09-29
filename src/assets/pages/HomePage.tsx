import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = () => (
    <div className="text-center flex flex-col items-center justify-center min-h-[60vh]">
        <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-extrabold text-gray-800"
        >
            Welcome to<span className="text-primary">TechSphere</span>
        </motion.h1>

        <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
        >
            Your world of cutting-edge technology. Discover the best TVs, laptops, and computers.
        </motion.p>
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
        >
            <Link to="/category/Laptop" className="bg-primary text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-600 transition-colors">
            Go to catalog
            </Link>
        </motion.div>
    </div>
);

export default HomePage;