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
}