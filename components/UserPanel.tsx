
import React from 'react';
import { Order } from '../types';
import { Link } from 'react-router-dom';

interface UserPanelProps {
  orders: Order[];
}

const UserPanel: React.FC<UserPanelProps> = ({ orders }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 flex flex-col items-center">
            <div className="w-20 h-20 bg-ayurveda-gold text-ayurveda-green rounded-full flex items-center justify-center text-3xl font-bold mb-4">
              JD
            </div>
            <h3 className="font-bold text-xl">John Doe</h3>
            <p className="text-stone-400 text-sm">Loyal Seeker of Healing</p>
          </div>
          <nav className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            <button className="w-full text-left px-6 py-4 font-bold bg-stone-50 text-ayurveda-green border-l-4 border-ayurveda-green">Order History</button>
            <button className="w-full text-left px-6 py-4 font-medium hover:bg-stone-50 transition">My Profile</button>
            <button className="w-full text-left px-6 py-4 font-medium hover:bg-stone-50 transition">Address Book</button>
            <button className="w-full text-left px-6 py-4 font-medium hover:bg-stone-50 transition text-red-500">Logout</button>
          </nav>
        </aside>

        <div className="lg:col-span-3">
          <h2 className="text-3xl font-bold mb-8">My Orders</h2>
          {orders.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-stone-200 text-center">
              <i className="fas fa-history text-5xl text-stone-100 mb-4"></i>
              <p className="text-stone-500 mb-6">You haven't placed any orders yet.</p>
              <Link to="/shop" className="bg-ayurveda-green text-white px-8 py-3 rounded-xl font-bold">Start Shopping</Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map(order => (
                <div key={order.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
                  <div className="bg-stone-50 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex gap-8">
                      <div>
                        <div className="text-xs uppercase text-stone-400 font-bold mb-1">Date Placed</div>
                        <div className="font-medium">{order.date}</div>
                      </div>
                      <div>
                        <div className="text-xs uppercase text-stone-400 font-bold mb-1">Total Amount</div>
                        <div className="font-medium">${order.total.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-xs uppercase text-stone-400 font-bold mb-1">Order #</div>
                        <div className="font-medium">{order.id}</div>
                      </div>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {order.items.map(item => (
                        <div key={item.id} className="flex items-center gap-4">
                          <img src={item.image} className="w-12 h-12 object-cover rounded-lg" alt={item.name} />
                          <div className="flex-grow">
                            <h4 className="font-bold text-sm">{item.name}</h4>
                            <p className="text-xs text-stone-400">Qty: {item.quantity}</p>
                          </div>
                          <Link to="/shop" className="text-ayurveda-green text-sm font-bold hover:underline">Buy again</Link>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex justify-end">
                    <button className="text-stone-500 hover:text-stone-800 text-sm font-bold">Track Package</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
