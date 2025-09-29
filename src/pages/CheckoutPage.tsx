import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { useCartStore } from '../store/cartStore';
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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (items.length === 0) {
        alert("Your cart is empty!");
        navigate('/catalog');
        return;
    }

    const order = {
      customer: data,
      items: items,
      total: totalPrice,
      orderDate: new Date().toISOString(),
    };
    
    const pastOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([...pastOrders, order]));
    
    alert('Your order has been successfully placed!');
    clearCart();
    navigate('/');
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Placing an order</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-8 rounded-lg shadow-md">
        <div>
          <label className="block font-medium">Full name</label>
          <input {...register('name', { required: 'This field is required' })} className="w-full p-2 border rounded mt-1" />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input type="email" {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })} className="w-full p-2 border rounded mt-1" />
          {errors.email && <p className="text-red-500 text-sm mt-1">Please enter a valid email address.</p>}
        </div>
        <div>
          <label className="block font-medium">Delivery address</label>
          <input {...register('address', { required: 'This field is required' })} className="w-full p-2 border rounded mt-1" />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </div>
        <div>
          <label className="block font-medium">Telephone</label>
          <input type="tel" {...register('phone', { required: 'This field is required' })} className="w-full p-2 border rounded mt-1" />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 text-lg font-semibold">
            Confirm order on ${totalPrice.toFixed(2)}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;