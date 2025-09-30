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
        };
        fetchProducts();
    }, [categoryName]);

    if(loading) {
        return <div className="text-center py-10">Loading goods...</div>
    }

    const containerVariants = {
        hidden: { opacity: 0},
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.07},
        },
    };

    return(
        
    )
};

export default  CategoryPage;