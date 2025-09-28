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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (items.length === 0) {
        alert("Ваша корзина пуста!");
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
      <h1 className="text-3xl font-bold mb-6">Оформление заказа</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-8 rounded-lg shadow-md">
        <div>
          <label className="block font-medium">ФИО</label>
          <input {...register('name', { required: 'Это поле обязательно' })} className="w-full p-2 border rounded mt-1" />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input type="email" {...register('email', { required: 'Email обязателен', pattern: /^\S+@\S+$/i })} className="w-full p-2 border rounded mt-1" />
          {errors.email && <p className="text-red-500 text-sm mt-1">Введите корректный email</p>}
        </div>
        <div>
          <label className="block font-medium">Адрес доставки</label>
          <input {...register('address', { required: 'Это поле обязательно' })} className="w-full p-2 border rounded mt-1" />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </div>
        <div>
          <label className="block font-medium">Телефон</label>
          <input type="tel" {...register('phone', { required: 'Это поле обязательно' })} className="w-full p-2 border rounded mt-1" />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 text-lg font-semibold">
          Подтвердить заказ на ${totalPrice.toFixed(2)}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;