import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Product } from "../store/cartStore";
import { ProductCard } from "../components/products/ProductCard";
import { motion } from "framer-motion";
import { set } from "react-hook-form";

const CategoryPage = () => {
    const { categoryName } = useParams <{ categoryName: string }>();
    const [ products, setProducts ] = useState<Product[]>([]);
    const [ loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get<Product[]>('/products.json')

                const filtered = data.filter(p => p.category === categoryName);
                setProducts(filtered);
            } catch (error) {
                console.log("Error for loading items: ", error);
            } finally{
                setLoading(false);
            }
        }
    })
};

export default  CategoryPage;