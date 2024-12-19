import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import Navbar from '../components/ui/navbar';
import { Link } from 'react-router';

const SignUp = () => {
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
          <div className="space-y-4">
            <Input
              className="bg-gray-800/50 border-gray-700"
              placeholder="Name"
              type="text"
            />
            <Input
              className="bg-gray-800/50 border-gray-700"
              placeholder="Email"
              type="email"
            />
            <Input
              className="bg-gray-800/50 border-gray-700"
              placeholder="Password"
              type="password"
            />
            <Input
              className="bg-gray-800/50 border-gray-700"
              placeholder="Confirm Password"
              type="password"
            />
            <Button className="w-full">Sign Up</Button>
          </div>
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