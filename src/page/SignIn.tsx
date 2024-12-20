import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/ui/navbar';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import toast from 'react-hot-toast';

const SignIn = () => {
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

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md space-y-6 bg-gray-900/50 p-8 rounded-lg border border-gray-800">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-wider text-white">
              Welcome back!
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                className="bg-gray-800/50 border-gray-700 text-white"
                placeholder="Email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                aria-label="Email"
              />
              {emailError && <div className="text-red-500 text-sm">{emailError}</div>}
            </div>
            <div className="space-y-2">
              <Input
                className="bg-gray-800/50 border-gray-700 text-white"
                placeholder="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                aria-label="Password"
              />
              {passwordError && <div className="text-red-500 text-sm">{passwordError}</div>}
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 h-12"
              disabled={!email || !password}
            >
              <p className='text-base md:text-lg tracking-wider text-white'>Sign in</p>
            </Button>
          </form>
          <div className="text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-400 hover:text-blue-300">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;