
import React, { useState, useRef, useEffect } from 'react';
import { getAIHakimResponse } from '../services/geminiService.ts';
import { Product } from '../types.ts';

interface AIAssistantProps {
  products: Product[];
}

const AIAssistant: React.FC<AIAssistantProps> = ({ products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'hakim', text: string}[]>([
    { role: 'hakim', text: 'Welcome, seeker of wellness. I am Hakim-ul-Hukama. Describe your ailment or wellness goals, and I shall guide you to the right remedy.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    
    setIsTyping(true);
    const hakimReply = await getAIHakimResponse(userMsg, products);
    setIsTyping(false);
    
    setMessages(prev => [...prev, { role: 'hakim', text: hakimReply }]);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-50 bg-ayurveda-green text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-stone-800 transition-transform hover:scale-110"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-magic'} text-2xl`}></i>
      </button>

      {isOpen && (
        <div className="fixed bottom-40 right-6 z-50 w-[350px] md:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-stone-100">
          <div className="bg-ayurveda-green text-white p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-ayurveda-gold rounded-full flex items-center justify-center">
               <i className="fas fa-user-md text-ayurveda-green text-xl"></i>
            </div>
            <div>
              <h3 className="font-bold brand-font text-lg">AI Hakim</h3>
              <p className="text-xs text-stone-300">Online & Sage Advice</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 bg-stone-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                  m.role === 'user' 
                  ? 'bg-ayurveda-gold text-ayurveda-green font-medium' 
                  : 'bg-white border border-stone-200 text-stone-700 shadow-sm leading-relaxed'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl border border-stone-200 flex gap-1">
                  <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-stone-100 bg-white">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Ask Hakim..."
                className="flex-grow px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-ayurveda-green"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                className="bg-ayurveda-green text-white w-12 h-12 rounded-xl flex items-center justify-center"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
