import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
const useSignin = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { user, loginUser } = useAuth();
  
    useEffect(() => {
      const isInitialLoad = !email && !password;
      if (user && isInitialLoad) {
        navigate('/home');
      }
    }, [user, navigate, email, password]);
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setEmailError('');
      setPasswordError('');
  
      if (!email) {
        setEmailError('Email is required');
        toast.error('Email is required');
        return;
      }
      if (!password) {
        setPasswordError('Password is required');
        toast.error('Password is required');
        return;
      }
  
      const toastId = toast.loading('wait...');
      try {
        await loginUser({ email, password });
        toast.success('Welcome Back 🎊')
        navigate('/home');
      } catch (error: unknown) {
        if (error instanceof Error) {
          setPasswordError(error.message);
          toast.error(error.message);
        } else {
          setPasswordError('An error occurred during sign in');
          toast.error('An error occurred during sign in')
        }
      }finally{
        toast.dismiss(toastId);
      }
    };
  
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      if (emailError) {setEmailError(''); toast.error(emailError)}
    };
  
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      if (passwordError) setPasswordError('');
    };

    return {handleSubmit, handleEmailChange, handlePasswordChange, email, password, emailError, passwordError}
}

export default useSignin;