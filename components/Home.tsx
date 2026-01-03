
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { Link } from 'react-router-dom';

interface HomeProps {
  products: Product[];
  addToCart: (p: Product) => void;
}

const Home: React.FC<HomeProps> = ({ products, addToCart }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const banners = [
    {
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2000&auto=format&fit=crop',
      title: 'Healing Nature, Delivered.',
      subtitle: 'Pure Ayurvedic solutions crafted by experienced Hakims for your wellbeing.'
    },
    {
      image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?q=80&w=2000&auto=format&fit=crop',
      title: 'Traditional Wisdom, Modern Purity',
      subtitle: 'Explore our curated range of medicinal herbs and holistic supplements.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const saleProducts = products.filter(p => p.isOnSale).slice(0, 4);

  return (
    <div className="space-y-16">
      {/* Banner Slider */}
      <section className="relative h-[600px] overflow-hidden">
        {banners.map((banner, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 flex items-center ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={banner.image} className="absolute inset-0 w-full h-full object-cover brightness-50" alt="" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
              <div className="max-w-2xl">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">{banner.title}</h1>
                <p className="text-xl md:text-2xl mb-10 opacity-90">{banner.subtitle}</p>
                <Link to="/shop" className="bg-ayurveda-gold text-ayurveda-green px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-600 transition">
                  Shop All Medicines
                </Link>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition ${idx === currentSlide ? 'bg-ayurveda-gold w-8' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { icon: 'fa-vial', title: 'Lab Tested', desc: 'Purity guaranteed' },
          { icon: 'fa-truck-fast', title: 'Free Delivery', desc: 'On orders over ₹999' },
          { icon: 'fa-user-md', title: 'Expert Hakim', desc: 'Traditional guidance' },
          { icon: 'fa-whatsapp', title: 'Support', desc: 'Direct WhatsApp help' }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-ayurveda-gold text-3xl mb-4">
              <i className={`fas ${item.icon}`}></i>
            </div>
            <h3 className="font-bold text-lg">{item.title}</h3>
            <p className="text-sm text-stone-500">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Sale Section */}
      <section className="bg-ayurveda-green py-16 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-ayurveda-gold font-bold tracking-widest uppercase text-sm">Limited Time Offers</span>
              <h2 className="text-4xl font-bold mt-2">Best Deals Today</h2>
            </div>
            <Link to="/shop" className="text-ayurveda-gold hover:underline font-medium">View all offers →</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {saleProducts.map(product => (
              <div key={product.id} className="bg-white text-stone-900 rounded-2xl overflow-hidden group shadow-xl">
                <div className="relative h-64 overflow-hidden">
                  <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={product.name} />
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter">
                    Save {Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100)}%
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-ayurveda-green">₹{product.price}</span>
                    <span className="text-stone-400 line-through text-sm">₹{product.oldPrice}</span>
                  </div>
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full bg-ayurveda-green text-white py-3 rounded-xl font-bold hover:bg-stone-800 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <h2 className="text-4xl font-bold text-center mb-12">Shop by Health Benefit</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {['Brain', 'Immunity', 'Stress', 'Digestion', 'Skin', 'Energy'].map((cat, i) => (
            <Link key={i} to={`/shop?category=${cat}`} className="group cursor-pointer">
              <div className="aspect-square bg-white rounded-2xl flex flex-col items-center justify-center border border-stone-100 shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition duration-300">
                <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-ayurveda-green group-hover:text-white transition">
                   <i className={`fas fa-${i === 0 ? 'brain' : i === 1 ? 'shield-alt' : i === 2 ? 'moon' : i === 3 ? 'apple-alt' : i === 4 ? 'smile-beam' : 'bolt'} text-2xl`}></i>
                </div>
                <span className="font-semibold">{cat}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
