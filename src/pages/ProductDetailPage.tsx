import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { type Product, useCartStore } from "../store/cartStore";
import { Star, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

interface Review {
    author: string;
    rating: number;
    text: string;
}

interface ProductWithDetails extends Product {
    specifications: Record<string, string>;
    reviews?: Review[];
}

const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<ProductWithDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const addToCart = useCartStore((state) => state.addToCart);
  
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get<ProductWithDetails[]>('/products.json');
          const foundProduct = data.find((p) => p.id === parseInt(id || ''));
          setProduct(foundProduct || null);
        } catch (error) {
          console.error("Error when loading goods:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }, [id]);
  
    if (loading) {
      return <div className="text-center py-20">Loading...</div>;
    }
  
    if (!product) {
      return (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Product not found</h2>
          <Link to="/" className="text-primary hover:underline mt-4 inline-block">
            Return to the main page
          </Link>
        </div>
      );
    }
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white p-6 md:p-8 rounded-lg shadow-lg">
          <div className="flex justify-center items-start">
            <img src={product.imageUrl} alt={product.name} className="w-full max-w-md rounded-lg" />
          </div>
          
          <div className="flex flex-col">
            <span className="font-semibold text-primary">{product.category}</span>
            <h1 className="text-3xl md:text-4xl font-extrabold my-2">{product.name}</h1>
            <p className="text-gray-600 text-md mb-4">{product.description}</p>
            <div className="text-4xl font-bold text-gray-900 my-4">${product.price.toFixed(2)}</div>
            <button
              onClick={() => addToCart(product)}
              className="w-full max-w-xs bg-primary text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center text-lg font-semibold"
            >
              <ShoppingCart className="mr-2" />
              Add to cart
            </button>
          </div>
        </div>
        
        <div className="mt-12 bg-white p-6 md:p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold border-b pb-2 mb-4">Characteristics</h2>
          <ul className="space-y-3">
            {Object.entries(product.specifications).map(([key, value]) => (
              <li key={key} className="flex flex-col sm:flex-row justify-between py-2 rounded odd:bg-gray-50 px-2">
                <span className="font-semibold text-gray-600">{key}</span>
                <span className="text-gray-900 text-left sm:text-right">{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    );
  };
  
export default ProductDetailPage;