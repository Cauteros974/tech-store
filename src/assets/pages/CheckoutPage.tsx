import { useForm, SubmitHandler } from 'react-hook-form';
import { useCartStore } from '../../store/cartStore';
import { useNavigate } from 'react-router-dom';

type FormValues = {
    name: string;
    address: string;
    phone: string;
    email: string;
};

const CheckoutPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const { items, clearCart } = useCartStore();
    const navigate = useNavigate();

    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

    const onSubmit: SubmitHandler<FormValues> = ( data ) {
        if(items.length === 0) {
            alert("Your cart is empty");
            navigate('/catalog');
            return;
        };

        const order  = {
            customer: data,
            items: items, 
            total: totalPrice,
            orderDate: new Date().toISOString(),
        };

        const pastOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        localStorage.setItem('orders', JSON.stringify([...pastOrders, order]));
        
        alert('Your order has been successfully placed!');
        clearCart()
        navigate('/');
    };
};

export default CheckoutPage;