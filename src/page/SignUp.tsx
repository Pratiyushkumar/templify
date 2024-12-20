import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const { registerUser, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous errors

    const { name, email, password, confirmPassword } = formData;

    // Client-side validation
    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      return;
    }

    try {
      await registerUser(name, email, password);
      navigate('/home');
      // Registration successful - the AuthContext will handle the redirect/state update
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md space-y-6 bg-gray-900/50 p-8 rounded-lg border border-gray-800">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tighter text-white">
              Create an account
            </h1>
            <p className="text-sm text-gray-400">
              Enter your details to get started
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Input
                className="bg-gray-800/50 border-gray-700 text-white"
                placeholder="Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Input
                className="bg-gray-800/50 border-gray-700 text-white"
                placeholder="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Input
                className="bg-gray-800/50 border-gray-700 text-white"
                placeholder="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Input
                className="bg-gray-800/50 border-gray-700 text-white"
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            {errorMessage && (
              <p className="text-sm text-red-500 text-center">
                {errorMessage}
              </p>
            )}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>
          <div className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <button onClick={() => console.log('Navigate to signin')} className="text-blue-400 hover:text-blue-300">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;