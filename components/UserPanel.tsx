
import React from 'react';
import { Order } from '../types';
import { Link } from 'react-router-dom';

interface UserPanelProps {
  orders: Order[];
  onLogout: () => void;
}

const UserPanel: React.FC<UserPanelProps> = ({ orders, onLogout }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 flex flex-col items-center shadow-sm">
            <div className="w-20 h-20 bg-ayurveda-gold text-ayurveda-green rounded-full flex items-center justify-center text-3xl font-bold mb-4 shadow-inner">
              JD
            </div>
            <h3 className="font-bold text-xl">John Doe</h3>
            <p className="text-stone-400 text-sm">user@example.com</p>
            <div className="mt-4 px-3 py-1 bg-ayurveda-green/10 text-ayurveda-green text-[10px] font-bold rounded-full uppercase tracking-widest">
              Premium Member
            </div>
          </div>
          <nav className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
            <button className="w-full text-left px-6 py-4 font-bold bg-stone-50 text-ayurveda-green border-l-4 border-ayurveda-green">Order History</button>
            <button className="w-full text-left px-6 py-4 font-medium hover:bg-stone-50 transition border-b border-stone-50">My Profile</button>
            <button className="w-full text-left px-6 py-4 font-medium hover:bg-stone-50 transition border-b border-stone-50">Address Book</button>
            <button 
              onClick={onLogout}
              className="w-full text-left px-6 py-4 font-bold hover:bg-red-50 transition text-red-500 flex items-center gap-2"
            >
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </nav>
          
          <div className="p-6 bg-ayurveda-green rounded-2xl text-white">
            <h4 className="font-bold mb-2">Need Help?</h4>
            <p className="text-xs opacity-80 mb-4">Our Hakims are available for consultation.</p>
            <a href="https://wa.me/1234567890" target="_blank" className="text-xs font-bold text-ayurveda-gold underline">WhatsApp Us Now</a>
          </div>
        </aside>

        <div className="lg:col-span-3">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold">My Healing Journey</h2>
            <p className="text-stone-400 text-sm font-medium">{orders.length} Orders Placed</p>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white p-16 rounded-2xl border border-stone-200 text-center shadow-sm">
              <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-200">
                <i className="fas fa-box-open text-4xl"></i>
              </div>
              <h3 className="text-xl font-bold text-stone-700 mb-2">No orders yet</h3>
              <p className="text-stone-500 mb-8 max-w-xs mx-auto">Explore our natural remedies and start your path to wellness today.</p>
              <Link to="/shop" className="bg-ayurveda-green text-white px-10 py-4 rounded-xl font-bold hover:bg-stone-800 transition shadow-lg inline-block">
                Go to Shop
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map(order => (
                <div key={order.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:border-ayurveda-gold/30 transition">
                  <div className="bg-stone-50 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-stone-100">
                    <div className="flex flex-wrap gap-8">
                      <div>
                        <div className="text-[10px] uppercase text-stone-400 font-bold mb-1">Date</div>
                        <div className="font-bold text-sm">{order.date}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase text-stone-400 font-bold mb-1">Total Amount</div>
                        <div className="font-bold text-sm text-ayurveda-green">₹{order.total.toFixed(0)}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase text-stone-400 font-bold mb-1">ID</div>
                        <div className="font-mono text-xs text-stone-600">{order.id}</div>
                      </div>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="space-y-5">
                      {order.items.map(item => (
                        <div key={item.id} className="flex items-center gap-5">
                          <img src={item.image} className="w-14 h-14 object-cover rounded-xl shadow-sm" alt={item.name} />
                          <div className="flex-grow">
                            <h4 className="font-bold text-sm text-stone-800">{item.name}</h4>
                            <p className="text-xs text-stone-400 font-medium">Qty: {item.quantity} • ₹{item.price}</p>
                          </div>
                          <Link to="/shop" className="bg-stone-50 px-4 py-2 rounded-lg text-ayurveda-green text-xs font-bold hover:bg-ayurveda-green hover:text-white transition">
                            Re-order
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-stone-50/50 border-t border-stone-50 flex justify-between items-center">
                    <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Paid via {order.paymentMethod}</span>
                    <button className="text-ayurveda-green hover:text-stone-800 text-xs font-bold flex items-center gap-2">
                      <i className="fas fa-map-marker-alt"></i> Track Package
                    </button>
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
