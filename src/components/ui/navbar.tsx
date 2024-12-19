import { FC } from 'react';
import { Link, useLocation } from "react-router";
import { Button } from './button';

const Navbar: FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath);
  
  return (
    <nav className="fixed top-0 w-full bg-gray-800/20 backdrop-blur-sm border-b border-gray-700/30 z-50">
      <div className="container flex h-14 items-center justify-between py-8 px-14">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold text-blue-500 tracking-wider">
            <Link to="/">
              Templify
            </Link>
          </h1>
        </div>

        {currentPath !== '/home' && <Button className="w-32 py-6" variant="default">
        <Link to="/home">
                <p className='text-lg py-4 tracking-wider'> Try Now</p>
              </Link>
        </Button>}
      </div>
    </nav>
  );
};

export default Navbar;