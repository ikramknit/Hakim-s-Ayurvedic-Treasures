
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-ayurveda-green text-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-ayurveda-gold p-2 rounded-full">
                <i className="fas fa-leaf text-ayurveda-green text-xl"></i>
              </div>
              <span className="brand-font text-2xl font-bold tracking-tight">HAKIM'S TREASURES</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8 font-medium">
            <Link to="/" className="hover:text-ayurveda-gold transition">Home</Link>
            <Link to="/shop" className="hover:text-ayurveda-gold transition">Shop</Link>
            <Link to="/admin" className="hover:text-ayurveda-gold transition">Admin</Link>
            <Link to="/account" className="hover:text-ayurveda-gold transition">My Orders</Link>
            <Link to="/cart" className="relative p-2 hover:text-ayurveda-gold transition">
              <i className="fas fa-shopping-cart text-xl"></i>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-ayurveda-gold text-ayurveda-green text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative p-2">
              <i className="fas fa-shopping-cart text-xl"></i>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-ayurveda-gold text-ayurveda-green text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-ayurveda-green pb-4 px-4 space-y-2">
          <Link to="/" className="block py-2" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/shop" className="block py-2" onClick={() => setIsOpen(false)}>Shop</Link>
          <Link to="/admin" className="block py-2" onClick={() => setIsOpen(false)}>Admin</Link>
          <Link to="/account" className="block py-2" onClick={() => setIsOpen(false)}>Account</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
