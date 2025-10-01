import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const handleLogin = async ( data ) => {
    try {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        navigate('/');
    } catch( error ){
        console.log("Login Error", error);
    }
};