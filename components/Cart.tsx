
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CartItem, Coupon } from '../types';

interface CartProps {
  cart: CartItem[];
  updateQuantity: (id: string, q: number) => void;
  removeFromCart: (id: string) => void;
  total: number;
  discount: number;
  finalTotal: number;
  activeCoupon: Coupon | null;
  setActiveCoupon: (c: Coupon | null) => void;
}

const Cart: React.FC<CartProps> = ({ 
  cart, updateQuantity, removeFromCart, total, discount, finalTotal, activeCoupon, setActiveCoupon 
}) => {
  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'HAKIM20') {
      setActiveCoupon({ code: 'HAKIM20', discount: 20 });
      alert('Coupon applied! 20% discount added.');
    } else {
      alert('Invalid coupon code');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="mb-6 inline-flex items-center justify-center w-24 h-24 bg-stone-100 rounded-full text-stone-300">
          <i className="fas fa-shopping-bag text-5xl"></i>
        </div>
        <h2 className="text-3xl font-bold mb-4">Your basket is empty</h2>
        <p className="text-stone-500 mb-8 max-w-md mx-auto">Start your healing journey by adding some of our natural remedies to your cart.</p>
        <Link to="/shop" className="bg-ayurveda-green text-white px-8 py-4 rounded-xl font-bold inline-block hover:bg-stone-800 transition">
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10">Your Shopping Basket</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map(item => (
            <div key={item.id} className="flex gap-6 bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
              <div className="w-24 h-24 flex-shrink-0">
                <img src={item.image} className="w-full h-full object-cover rounded-xl" alt={item.name} />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl">{item.name}</h3>
                  <button onClick={() => removeFromCart(item.id)} className="text-stone-400 hover:text-red-500">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
                <p className="text-sm text-stone-500 mb-4">{item.category}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3 bg-stone-50 px-3 py-1 rounded-lg">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-ayurveda-green font-bold">-</button>
                    <span className="font-bold w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-ayurveda-green font-bold">+</button>
                  </div>
                  <span className="text-xl font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}

          <div className="p-6 bg-stone-100 rounded-2xl flex flex-col sm:flex-row gap-4">
            <input 
              type="text" 
              placeholder="Enter coupon code (Try: HAKIM20)" 
              className="flex-grow px-4 py-3 rounded-xl focus:outline-none"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button 
              onClick={handleApplyCoupon}
              className="bg-ayurveda-green text-white px-8 py-3 rounded-xl font-bold"
            >
              Apply
            </button>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 h-fit space-y-6">
          <h3 className="text-2xl font-bold mb-4">Summary</h3>
          <div className="space-y-4 text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
            {activeCoupon && (
              <div className="flex justify-between text-green-600">
                <span>Discount ({activeCoupon.code})</span>
                <span className="font-bold">-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600 font-bold">Free</span>
            </div>
            <div className="border-t pt-4 flex justify-between text-xl font-bold text-stone-900">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
          <Link to="/checkout" className="block w-full bg-ayurveda-gold text-ayurveda-green py-4 rounded-xl font-bold text-center text-lg hover:bg-yellow-600 transition shadow-lg">
            Proceed to Checkout
          </Link>
          <div className="text-center">
            <p className="text-xs text-stone-400">Secure encrypted payment processing</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
