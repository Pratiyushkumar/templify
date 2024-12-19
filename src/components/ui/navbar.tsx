import { FC } from 'react';
import { Link, useLocation } from "react-router";
import { Button } from './button';

const Navbar: FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath);
  
  return (
    <nav className="fixed top-0 w-full bg-gray-800/20 backdrop-blur-sm border-b border-gray-700/30 z-50">
  <div className="container flex h-14 items-center  justify-center md:justify-between py-4 px-6 md:py-8 md:px-10 lg:px-14">
    <div className="flex  items-center gap-2">
      <h1 className=" text-2xl md:text-3xl lg:text-4xl text-center  font-bold text-blue-500 tracking-wider">
        <Link to="/">Templify</Link>
      </h1>
    </div>

    
    {/* Button displayed on larger screens */}
    <div className="hidden md:block">
      {currentPath !== "/home" && (
        <Button className="w-24 md:w-32 py-2 md:py-6" variant="default">
          <Link to="/home">
            <p className="text-sm md:text-lg py-1 md:py-4 tracking-wider">Try Now</p>
          </Link>
        </Button>
      )}
    </div>
  </div>
</nav>

  );
};

export default Navbar;