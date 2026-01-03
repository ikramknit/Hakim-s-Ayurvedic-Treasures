
import React, { useState } from 'react';
import { Order, Product } from '../types.ts';
import { CATEGORIES } from '../data.ts';

interface AdminProps {
  orders: Order[];
  products: Product[];
  updateOrderStatus: (id: string, s: Order['status']) => void;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const Admin: React.FC<AdminProps> = ({ orders, products, updateOrderStatus, setProducts }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: CATEGORIES[1] || 'General',
    image: '',
    stock: 0,
    tags: [],
    isOnSale: false,
    oldPrice: 0
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const productToAdd: Product = {
      id: `PRD-${Date.now()}`,
      name: newProduct.name || 'New Remedy',
      description: newProduct.description || '',
      price: Number(newProduct.price) || 0,
      oldPrice: newProduct.isOnSale ? Number(newProduct.oldPrice) : undefined,
      category: newProduct.category || 'General',
      image: newProduct.image || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
      stock: Number(newProduct.stock) || 0,
      tags: newProduct.tags || [],
      isOnSale: !!newProduct.isOnSale
    };

    setProducts(prev => [productToAdd, ...prev]);
    setIsModalOpen(false);
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      category: CATEGORIES[1],
      image: '',
      stock: 0,
      tags: [],
      isOnSale: false,
      oldPrice: 0
    });
    alert('Product added to inventory!');
  };

  const deleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to remove this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
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
        <div className="bg-white rounded-2xl border border-stone-200 overflow-x-auto shadow-sm">
          <table className="w-full text-left min-w-[800px]">
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
                    <td className="px-6 py-4 font-bold">₹{order.total.toFixed(0)}</td>
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
             <h2 className="text-2xl font-bold">Manage Inventory ({products.length} Products)</h2>
             <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-ayurveda-green text-white px-6 py-3 rounded-xl font-bold hover:bg-stone-800 transition shadow-lg"
             >
               + Add New Product
             </button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(p => (
                <div key={p.id} className="bg-white p-6 rounded-2xl border border-stone-200 flex gap-4 relative group shadow-sm hover:shadow-md transition">
                  <img src={p.image} className="w-20 h-20 object-cover rounded-xl" alt={p.name} />
                  <div className="flex-grow">
                    <h3 className="font-bold text-stone-800 line-clamp-1">{p.name}</h3>
                    <p className="text-xs text-stone-400 font-medium uppercase tracking-wider">{p.category}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex flex-col">
                        <span className="font-bold text-ayurveda-green text-lg">₹{p.price}</span>
                        {p.isOnSale && <span className="text-xs text-red-500 line-through">₹{p.oldPrice}</span>}
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded font-bold ${p.stock < 10 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                        {p.stock} units
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteProduct(p.id)}
                    className="absolute top-2 right-2 p-2 text-stone-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              ))}
           </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-3xl w-full max-w-2xl relative shadow-2xl overflow-hidden">
            <div className="bg-ayurveda-green p-6 text-white flex justify-between items-center">
              <h3 className="text-2xl font-bold brand-font">New Ayurvedic Remedy</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/70 hover:text-white">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleAddProduct} className="p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">Remedy Name</label>
                  <input 
                    required
                    type="text"
                    className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-ayurveda-green outline-none"
                    placeholder="e.g., Pure Shilajit Resin"
                    value={newProduct.name}
                    onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">Health Category</label>
                  <select 
                    className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-ayurveda-green outline-none"
                    value={newProduct.category}
                    onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                  >
                    {CATEGORIES.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700">Description / Benefits</label>
                <textarea 
                  required
                  rows={3}
                  className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-ayurveda-green outline-none"
                  placeholder="Describe the healing properties of this herbal remedy..."
                  value={newProduct.description}
                  onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">Price (₹)</label>
                  <input 
                    required
                    type="number"
                    className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-ayurveda-green outline-none"
                    value={newProduct.price}
                    onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">Initial Stock</label>
                  <input 
                    required
                    type="number"
                    className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-ayurveda-green outline-none"
                    value={newProduct.stock}
                    onChange={e => setNewProduct({...newProduct, stock: Number(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">Image URL</label>
                  <input 
                    type="text"
                    className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-ayurveda-green outline-none"
                    placeholder="https://images.unsplash.com/..."
                    value={newProduct.image}
                    onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                  />
                </div>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox"
                    id="onSale"
                    className="w-5 h-5 rounded accent-ayurveda-green cursor-pointer"
                    checked={newProduct.isOnSale}
                    onChange={e => setNewProduct({...newProduct, isOnSale: e.target.checked})}
                  />
                  <label htmlFor="onSale" className="font-bold text-stone-700 cursor-pointer">Offer Active?</label>
                </div>
                {newProduct.isOnSale && (
                  <div className="space-y-2 animate-in slide-in-from-top-2 duration-200">
                    <label className="text-sm font-bold text-stone-600">MRP / Old Price (₹)</label>
                    <input 
                      type="number"
                      className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-ayurveda-green outline-none bg-white"
                      value={newProduct.oldPrice}
                      onChange={e => setNewProduct({...newProduct, oldPrice: Number(e.target.value)})}
                    />
                  </div>
                )}
              </div>

              <button type="submit" className="w-full bg-ayurveda-gold text-ayurveda-green py-4 rounded-2xl font-bold text-xl hover:bg-yellow-600 transition shadow-xl mt-4">
                Confirm & Add Remedy
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
