
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatWithConcierge } from '../services/geminiService';
import { ChatMessage } from '../types';

const ConciergeOrb: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithConcierge(input, messages);
      if (response) {
        setMessages(prev => [...prev, { role: 'model', content: response }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "I apologize, my connection to the portal is weak. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[350px] h-[500px] glass rounded-[32px] overflow-hidden flex flex-col shadow-2xl border border-white/20"
          >
            <div className="p-6 bg-[#C5A059]/10 border-b border-white/10 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#C5A059] flex items-center justify-center text-[#002B2B]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
              </div>
              <div>
                <h3 className="text-[#C5A059] font-bold text-sm tracking-widest uppercase">Concierge</h3>
                <p className="text-white/40 text-[10px] uppercase">Always Online</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-white/50 text-sm mt-10">
                  Welcome to the FVG Luxury Portal. <br/> How may I assist you today?
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    m.role === 'user' 
                      ? 'bg-[#C5A059] text-[#002B2B] rounded-tr-none' 
                      : 'bg-white/10 text-white rounded-tl-none border border-white/5'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                   <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none animate-pulse text-white/50 text-xs italic">
                     Typing...
                   </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask our concierge..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#C5A059]"
              />
              <button 
                onClick={handleSendMessage}
                className="w-10 h-10 bg-[#C5A059] rounded-full flex items-center justify-center text-[#002B2B] transition-transform hover:scale-110"
              >
                <svg className="w-5 h-5 rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "30% 60% 70% 40% / 50% 60% 30% 60%", "60% 40% 30% 70% / 50% 30% 70% 40%"],
          background: ["radial-gradient(circle at 30% 30%, #C5A059 0%, #002B2B 100%)", "radial-gradient(circle at 70% 70%, #C5A059 0%, #002B2B 100%)", "radial-gradient(circle at 30% 30%, #C5A059 0%, #002B2B 100%)"]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "mirror"
        }}
        className="w-16 h-16 shadow-2xl flex items-center justify-center text-white border border-[#C5A059]/50 overflow-hidden relative"
      >
        <span className="sr-only">AI Concierge</span>
        <svg className="w-8 h-8 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
      </motion.button>
    </div>
  );
};

export default ConciergeOrb;
