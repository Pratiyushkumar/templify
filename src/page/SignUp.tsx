import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import Navbar from '../components/ui/navbar';
import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

const SignUp = () => {
  const { registerUser, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    // Client-side validation
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      await registerUser(name, email, password);
      setErrorMessage(''); // Clear error messages on success
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
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
            <Input
              className="bg-gray-800/50 border-gray-700"
              placeholder="Name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              className="bg-gray-800/50 border-gray-700"
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              className="bg-gray-800/50 border-gray-700"
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Input
              className="bg-gray-800/50 border-gray-700"
              placeholder="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errorMessage && (
              <p className="text-sm text-red-500 text-center">
                {errorMessage}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>
          <div className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-400 hover:text-blue-300">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;