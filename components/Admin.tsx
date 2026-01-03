
import React, { useState } from 'react';
import { Order, Product } from '../types';

interface AdminProps {
  orders: Order[];
  products: Product[];
  updateOrderStatus: (id: string, s: Order['status']) => void;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const Admin: React.FC<AdminProps> = ({ orders, products, updateOrderStatus, setProducts }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-2 bg-stone-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-2 rounded-lg font-bold transition ${activeTab === 'orders' ? 'bg-white shadow-sm text-ayurveda-green' : 'text-stone-500'}`}
          >
            Orders
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-6 py-2 rounded-lg font-bold transition ${activeTab === 'products' ? 'bg-white shadow-sm text-ayurveda-green' : 'text-stone-500'}`}
          >
            Inventory
          </button>
        </div>
      </div>

      {activeTab === 'orders' ? (
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-stone-50 text-stone-500 text-sm uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-stone-400">No orders placed yet.</td>
                </tr>
              ) : (
                orders.map(order => (
                  <tr key={order.id} className="hover:bg-stone-50 transition">
                    <td className="px-6 py-4 font-bold">{order.id}</td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-bold">{order.customerName}</div>
                        <div className="text-xs text-stone-400">{order.address}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4 text-stone-500">{order.date}</td>
                    <td className="px-6 py-4">
                      <select 
                        value={order.status} 
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                        className="bg-white border rounded p-1 text-sm focus:outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="space-y-6">
           <div className="flex justify-between items-center">
             <h2 className="text-2xl font-bold">Manage Inventory</h2>
             <button className="bg-ayurveda-green text-white px-4 py-2 rounded-lg font-bold">+ Add Product</button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(p => (
                <div key={p.id} className="bg-white p-6 rounded-2xl border border-stone-200 flex gap-4">
                  <img src={p.image} className="w-20 h-20 object-cover rounded-xl" alt={p.name} />
                  <div className="flex-grow">
                    <h3 className="font-bold">{p.name}</h3>
                    <p className="text-sm text-stone-400">{p.category}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold text-ayurveda-green">${p.price}</span>
                      <span className={`text-xs px-2 py-0.5 rounded font-bold ${p.stock < 10 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                        {p.stock} in stock
                      </span>
                    </div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
