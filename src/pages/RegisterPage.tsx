import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useState } from 'react';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState('');

  const onSubmit = async (data) => {
    try {
      await createUserWithEmailAndPassword (auth, data.email, data.password);
      navigate('/');
    } catch (error) {
      setFirebaseError("Invalid email or password. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">LogIn in TechSphere</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium">Email</label>
            <input type="email" {...register('email', { required: true })} className="w-full p-2 border rounded mt-1" />
          </div>
          <div>
            <label className="block font-medium">Password</label>
            <input type="password" {...register('password', { required: true })} className="w-full p-2 border rounded mt-1" />
          </div>
          {firebaseError && <p className="text-red-500 text-sm">{firebaseError}</p>}
          <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-blue-600">
            LogIn
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
            Don't have an account? <Link to="/register" className="text-primary hover:underline">Registration</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;