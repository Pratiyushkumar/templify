import { FC } from 'react';
import { Button } from './button';

const Navbar: FC = () => {
  return (
    <nav className="fixed top-0 mt-2 w-full bg-gray-800/20 backdrop-blur-sm border-b border-gray-700/30 z-50">
      <div className="container flex h-14 items-center justify-between p-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-white">Templify</h1>
        </div>
        
        <Button className="w-32" variant="default">
          Try now!
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;