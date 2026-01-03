
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-400 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-ayurveda-gold p-2 rounded-full">
                <i className="fas fa-leaf text-stone-900"></i>
              </div>
              <span className="brand-font text-white text-2xl font-bold">HAKIM'S</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Bringing centuries of traditional Ayurvedic wisdom to your doorstep. Pure, potent, and ethically sourced remedies for the modern soul.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-ayurveda-gold"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="hover:text-ayurveda-gold"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-ayurveda-gold"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/shop" className="hover:text-white transition">Shop</Link></li>
              <li><Link to="/admin" className="hover:text-white transition">Admin Panel</Link></li>
              <li><Link to="/account" className="hover:text-white transition">Order Tracking</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Health Topics</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/shop?cat=Immunity" className="hover:text-white transition">Immunity Boosters</Link></li>
              <li><Link to="/shop?cat=Stress" className="hover:text-white transition">Sleep & Anxiety</Link></li>
              <li><Link to="/shop?cat=Digestion" className="hover:text-white transition">Digestive Care</Link></li>
              <li><Link to="/shop?cat=Brain" className="hover:text-white transition">Focus & Memory</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt mt-1"></i>
                <span>Old Spice Market, Block C<br/>New Delhi, India</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-phone"></i>
                <span>+91 987 654 3210</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fab fa-whatsapp"></i>
                <span>Chat with us on WhatsApp</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2024 Hakim's Ayurvedic Treasures. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
