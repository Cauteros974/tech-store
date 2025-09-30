import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Product } from "../store/cartStore";
import { ProductCard } from "../components/products/ProductCard";
import { motion } from "framer-motion";

const CategoryPage = () => {
    const { categoryName } = useParams <{ categoryName: string }>();
    const [ products, setProducts ] = useState<Product[]>([]);
    const [ loading, setLoading] = useState(true);
};

export default  CategoryPage;
