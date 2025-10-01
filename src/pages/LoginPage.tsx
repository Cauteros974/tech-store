import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { use, useState } from 'react';

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [ firebaseError, setFirebaseError] = useState();

    const onSubmit = async ( data ) => {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            navigate('/');
        } catch(error) {
            setFirebaseError("Wrong Email or Password. Try again");
        }
    }
}