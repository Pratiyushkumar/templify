import { FC } from 'react';
import { Link } from "react-router";
import { Button } from './button';
import { useAuth } from '../../hooks/useAuth';

const Navbar: FC = () => {
  const { user, logoutUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <nav className="fixed top-0 w-full bg-gray-800/20 backdrop-blur-sm border-b border-gray-700/30 z-50">
      <div className="container flex h-14 items-center justify-between p-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-white">
            <Link to="/">
              Templify
            </Link>
          </h1>
        </div>

        {user ? (
          <Button
            className="w-32 bg-red-600 hover:bg-red-500"
            variant="default"
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <Button
            className="w-32 bg-blue-600 hover:bg-blue-500"
            variant="default"
          >
            Try now!
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;