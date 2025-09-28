import { useCartStore } from "../../store/cartStore";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

const CartPage = () => {
    const { items, removeFromCart, updateQuantity } = useCartStore();
    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

    if (items.length === 0) {
        return(
            <div className="text-center py-20">
                <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
                <Link to = '/catalog' className="text-blue-500 hover:underline text-lg">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return(
        <div>
            <h1 className="text-3xl font-bold md-6">Your Cart</h1>
            <div className="space-y-4">
                {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg flex-wrap">
                    <div className="flex items-center gap-4">
                      <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      <div>
                        <h2 className="font-semibold text-lg">{item.name}</h2>
                        <p className="text-gray-600">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-4 sm:mt-0">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-16 p-2 border rounded text-center"
                      />
                      <p className="font-semibold w-24 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
        </div>
    )
};

export default CartPage;