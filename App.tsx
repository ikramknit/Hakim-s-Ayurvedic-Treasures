
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Product, CartItem, Order, Coupon } from './types.ts';
import { INITIAL_PRODUCTS, CATEGORIES } from './data.ts';
import Home from './components/Home.tsx';
import Shop from './components/Shop.tsx';
import Cart from './components/Cart.tsx';
import Checkout from './components/Checkout.tsx';
import Admin from './components/Admin.tsx';
import UserPanel from './components/UserPanel.tsx';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import AIAssistant from './components/AIAssistant.tsx';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('hakim_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('hakim_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, q: number) => {
    if (q <= 0) return removeFromCart(id);
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: q } : item));
  };

  const clearCart = () => setCart([]);

  const placeOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    setUserOrders(prev => [order, ...prev]);
    clearCart();
    setActiveCoupon(null);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    setUserOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = activeCoupon ? total * (activeCoupon.discount / 100) : 0;
  const finalTotal = total - discount;

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen relative">
        <Navbar cartCount={cart.reduce((a, b) => a + b.quantity, 0)} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home products={products} addToCart={addToCart} />} />
            <Route path="/shop" element={<Shop products={products} addToCart={addToCart} categories={CATEGORIES} />} />
            <Route path="/cart" element={
              <Cart 
                cart={cart} 
                updateQuantity={updateQuantity} 
                removeFromCart={removeFromCart} 
                total={total}
                discount={discount}
                finalTotal={finalTotal}
                activeCoupon={activeCoupon}
                setActiveCoupon={setActiveCoupon}
              />
            } />
            <Route path="/checkout" element={
              <Checkout 
                cart={cart} 
                total={finalTotal} 
                placeOrder={placeOrder} 
              />
            } />
            <Route path="/admin" element={
              <Admin 
                orders={orders} 
                products={products} 
                updateOrderStatus={updateOrderStatus}
                setProducts={setProducts}
              />
            } />
            <Route path="/account" element={<UserPanel orders={userOrders} />} />
          </Routes>
        </main>

        <AIAssistant products={products} />
        <Footer />
        
        <a 
          href="https://wa.me/1234567890?text=Hello Hakim, I am interested in your Ayurvedic products." 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-transform hover:scale-110"
          title="Chat with Hakim on WhatsApp"
        >
          <i className="fab fa-whatsapp text-3xl"></i>
        </a>
      </div>
    </HashRouter>
  );
};

export default App;
