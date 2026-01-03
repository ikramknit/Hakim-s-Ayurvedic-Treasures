
import React, { useState, useMemo } from 'react';
import { Product } from '../types';

interface ShopProps {
  products: Product[];
  addToCart: (p: Product) => void;
  categories: string[];
}

const Shop: React.FC<ShopProps> = ({ products, addToCart, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
      .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return 0; // default/newest
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition ${selectedCategory === cat ? 'bg-ayurveda-green text-white font-bold' : 'hover:bg-stone-100'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 bg-ayurveda-gold/10 rounded-2xl">
            <h4 className="font-bold text-ayurveda-green mb-2">Need Guidance?</h4>
            <p className="text-sm text-stone-600 mb-4">Chat with our AI Hakim for personalized recommendations.</p>
            <button className="text-ayurveda-green font-bold text-sm underline">Consult Hakim Now</button>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <div className="relative w-full sm:w-96">
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"></i>
              <input 
                type="text" 
                placeholder="Search medicines..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-ayurveda-green"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <select 
              className="px-4 py-3 rounded-xl border border-stone-200 focus:outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Sort by: Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white border border-stone-100 rounded-2xl overflow-hidden group hover:shadow-lg transition">
                <div className="relative h-64 overflow-hidden">
                  <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={product.name} />
                  {product.isOnSale && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">Sale</div>
                  )}
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold text-ayurveda-gold uppercase tracking-widest mb-1">{product.category}</div>
                  <h3 className="font-bold text-xl mb-2 line-clamp-1">{product.name}</h3>
                  <p className="text-stone-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-ayurveda-green">₹{product.price}</span>
                      {product.oldPrice && <span className="text-stone-400 line-through text-sm">₹{product.oldPrice}</span>}
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-ayurveda-green text-white w-10 h-10 rounded-lg flex items-center justify-center hover:bg-stone-800 transition"
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <i className="fas fa-box-open text-6xl text-stone-200 mb-4"></i>
              <h3 className="text-2xl font-bold text-stone-400">No products found</h3>
              <button onClick={() => {setSearchQuery(''); setSelectedCategory('All');}} className="text-ayurveda-green font-bold mt-2">Clear filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
