
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem, Order } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  total: number;
  placeOrder: (o: Order) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, total, placeOrder }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    phone: '',
    payment: 'card'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 100000)}`,
      items: [...cart],
      total,
      status: 'pending',
      customerName: formData.name,
      address: `${formData.address}, ${formData.city}`,
      date: new Date().toLocaleDateString(),
      paymentMethod: formData.payment
    };
    
    placeOrder(newOrder);
    alert('Order placed successfully! Redirecting to your account.');
    navigate('/account');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-bold mb-8">Shipping Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2">Full Name</label>
                <input 
                  required
                  className="w-full p-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-ayurveda-green"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Email Address</label>
                <input 
                  required
                  type="email"
                  className="w-full p-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-ayurveda-green"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Delivery Address</label>
              <input 
                required
                className="w-full p-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-ayurveda-green"
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2">City</label>
                <input 
                  required
                  className="w-full p-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-ayurveda-green"
                  value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Phone</label>
                <input 
                  required
                  className="w-full p-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-ayurveda-green"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="pt-8">
              <h3 className="text-xl font-bold mb-4">Payment Method</h3>
              <div className="space-y-4">
                {['Credit/Debit Card', 'WhatsApp Order (Cash on Delivery)'].map(method => (
                  <label key={method} className="flex items-center gap-4 p-4 border border-stone-200 rounded-xl cursor-pointer hover:bg-stone-50">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={formData.payment === (method.includes('WhatsApp') ? 'whatsapp' : 'card')}
                      onChange={() => setFormData({...formData, payment: method.includes('WhatsApp') ? 'whatsapp' : 'card'})}
                    />
                    <span className="font-bold">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="w-full bg-ayurveda-green text-white py-5 rounded-xl font-bold text-xl hover:bg-stone-800 transition shadow-xl">
              Pay ${total.toFixed(2)} & Place Order
            </button>
          </form>
        </div>

        <div className="bg-stone-100 p-8 rounded-3xl h-fit">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-4 mb-8">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name} <span className="text-stone-400 text-sm">x{item.quantity}</span></span>
                <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-stone-200 pt-4 flex justify-between text-2xl font-bold">
            <span>Total Payable</span>
            <span className="text-ayurveda-green">${total.toFixed(2)}</span>
          </div>
          <div className="mt-8 p-4 bg-white rounded-2xl flex items-center gap-4">
            <i className="fas fa-shield-alt text-2xl text-green-500"></i>
            <div>
              <p className="font-bold text-sm">Safe & Secure Payments</p>
              <p className="text-xs text-stone-400">Your data is protected with 256-bit encryption.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
