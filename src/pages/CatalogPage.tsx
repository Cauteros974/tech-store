import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import type { Product } from '../store/cartStore';
import { useCartStore } from '../store/cartStore';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductCard = ({ product }: { product: Product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      <Link to={`/product/${product.id}`} className="flex-grow">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold truncate">{product.name}</h3>
          <p className="text-gray-500">{product.category}</p>
          <p className="text-xl font-bold mt-2">${product.price.toFixed(2)}</p>
        </div>
      </Link>
      <div className="p-4 pt-0 mt-auto">
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold"
        >
          Add to cart
        </button>
      </div>
    </motion.div>
  );
};

const CatalogPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('Все');
  const [sortOrder, setSortOrder] = useState('price-asc');

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get<Product[]>('/products.json');
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter((p) => category === 'Все' || p.category === category)
      .sort((a, b) => {
        if (sortOrder === 'price-asc') return a.price - b.price;
        if (sortOrder === 'price-desc') return b.price - a.price;
        return 0;
      });
  }, [products, searchTerm, category, sortOrder]);

  const categories = useMemo(
    () => ['Все', ...new Set(products.map((p) => p.category))],
    [products]
  );

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2">
        Product Catalog
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
        <input
          type="text"
          placeholder="Search by name..."
          className="p-2 border rounded w-full"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border rounded w-full"
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          className="p-2 border rounded w-full"
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="price-asc">Price: ascending</option>
          <option value="price-desc">Price: descending</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAndSortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;