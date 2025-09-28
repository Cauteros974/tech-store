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
    const { register, handleSubmit, formState: { errors,} } = useForm<FormValues>();
    const {items, clearCart} = useCartStore();
    const navigate = useNavigate();
};

export default CheckoutPage;