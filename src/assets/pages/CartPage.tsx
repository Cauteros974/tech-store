import { useCartStore } from "../../store/cartStore";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

const CartPage = () => {
    const { items, removeFromCart, updateQuantity } = useCartStore();
    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export default CartPage;