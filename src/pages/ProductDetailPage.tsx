import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Product, useCartStore } from "../../store/cartStore";
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
    const { id } = useParams<{ id: string}>();
    const [ product, setProduct] = useState<ProductWithDetails | null>(null);
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
        return <div className="text-center py-20">Загрузка...</div>;
    }

    if (!product) {
        <div className="text-center py-20">
            <h2 className="text-2xl font-bold">Product not found</h2>
            <Link to="/" className="text-primary hover:underline mt-4 inline-block">
                Return to the main page
            </Link>
        </div>
    }
};

export default ProductDetailPage;