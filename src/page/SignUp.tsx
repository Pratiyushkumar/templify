import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import useSignup from '../hooks/useSignup';
// import GoogleButton from '../components/GoogleButton';
import Navbar from '../components/ui/navbar';

const SignUp = () => {
  const { formData, errorMessage, loading, handleChange, handleSubmit, } = useSignup();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="flex items-center justify-center px-4 pt-24">
        <div className="w-full max-w-md space-y-4 bg-gray-900/50 p-8 rounded-lg border border-gray-800">
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

              />
            </div>
            {errorMessage && (
              <p className="text-sm text-red-500 text-center">
                {errorMessage}
              </p>
            )}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 h-12"
              disabled={loading}
            >
              {loading ? <p className='md:text-lg tracking-wide '>Creating account</p> : <p className='md:text-lg tracking-wide '>Sign up</p>}
            </Button>
          </form>
          <div className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <button onClick={() => navigate("/signin")} className="text-blue-400 hover:text-blue-300">
              Sign in
            </button>
          </div>
          {/* <div className="relative flex justify-center capitalize text-base">
            <span className="bg-gray-900/50 px-2 text-gray-400">or</span>
          </div>
          <GoogleButton /> */}
        </div>
      </div>
    </div>
  );
};

export default SignUp;