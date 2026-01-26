import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatWithConcierge } from '../services/geminiService';
import { ChatMessage } from '../types';

interface Source {
  title: string;
  uri: string;
  type?: 'search' | 'maps';
}

interface ExtendedChatMessage extends ChatMessage {
  sources?: Source[];
}

const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

const ConciergeOrb: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ExtendedChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | undefined>(undefined);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        }
      );
    }

    // Listener for programmatic concierge opening
    const handleOpenEvent = (e: any) => {
      setIsOpen(true);
      if (e.detail?.message) {
        handleSendMessage(e.detail.message);
      }
    };
    window.addEventListener('open-concierge', handleOpenEvent);
    return () => window.removeEventListener('open-concierge', handleOpenEvent);
  }, []);

  const handleSendMessage = async (msgOverride?: string) => {
    const textToSend = msgOverride || input;
    if (!textToSend.trim() || isLoading) return;
    
    const userMsg: ExtendedChatMessage = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    if (!msgOverride) setInput('');
    setIsLoading(true);

    try {
      const result = await chatWithConcierge(textToSend, userLocation);
      if (result) {
        setMessages(prev => [...prev, { 
          role: 'model', 
          content: result.text, 
          sources: result.sources 
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "My apologies, I've lost connection to the archive. Please try again, signore." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-24 right-0 w-[350px] md:w-[480px] h-[700px] glass rounded-[48px] overflow-hidden flex flex-col shadow-2xl border border-white/20"
          >
            <div className="p-8 bg-[#C5A059]/10 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#C5A059] flex items-center justify-center text-[#002B2B] shadow-xl">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                </div>
                <div>
                  <h3 className="text-[#C5A059] font-bold text-sm tracking-widest uppercase">Alessandro</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Maps Grounding Active</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8">
              {messages.length === 0 && (
                <div className="text-center text-white/50 text-sm mt-12 space-y-6">
                  <p className="serif italic text-2xl text-white">"Come posso aiutarla?"</p>
                  <p className="text-[10px] uppercase tracking-[0.3em] leading-loose max-w-xs mx-auto">
                    I am at your service to navigate the historical splendor of our region.
                  </p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] p-6 rounded-[32px] text-sm leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-[#C5A059] text-[#002B2B] rounded-tr-none font-medium' 
                      : 'bg-white/[0.03] text-white/90 rounded-tl-none border border-white/10 shadow-sm'
                  }`}>
                    {m.content}
                    
                    {m.sources && m.sources.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-[9px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">Grounding Sources</p>
                            <span className="flex items-center gap-1.5 text-[8px] uppercase tracking-widest text-white/30 font-bold bg-white/5 px-2 py-1 rounded-full">
                                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                                Maps Verified
                            </span>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {m.sources.map((source, idx) => (
                            <a 
                              key={idx} 
                              href={source.uri} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="group/link flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/5 hover:border-[#C5A059]/40 hover:bg-[#C5A059]/5 transition-all"
                            >
                              <div className="flex items-center gap-3 overflow-hidden">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${source.type === 'maps' ? 'bg-[#C5A059]/20 text-[#C5A059]' : 'bg-white/10 text-white/60'}`}>
                                  {source.type === 'maps' ? (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A2 2 0 013 15.483V6.304a2 2 0 011.236-1.873l6-2.667a2 2 0 011.528 0l6 2.667A2 2 0 0119 6.304v9.179a2 2 0 01-1.236 1.873L12.316 20a2 2 0 01-1.632 0z"></path></svg>
                                  ) : (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3"></path></svg>
                                  )}
                                </div>
                                <span className="text-[11px] font-medium truncate group-hover/link:text-[#C5A059] transition-colors">{source.title}</span>
                              </div>
                              <svg className="w-3 h-3 text-white/20 group-hover/link:text-[#C5A059] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                   <div className="bg-white/5 border border-white/10 p-5 rounded-[28px] rounded-tl-none flex items-center gap-2">
                     <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                     <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></span>
                     <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></span>
                   </div>
                </div>
              )}
            </div>

            <div className="p-8 border-t border-white/10 bg-white/[0.02]">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask Alessandro about a destination..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-8 py-5 text-sm focus:outline-none focus:border-[#C5A059] transition-all placeholder:text-white/20 text-white"
                />
                <button 
                  onClick={() => handleSendMessage()}
                  disabled={isLoading}
                  className="w-16 h-16 bg-[#C5A059] rounded-2xl flex items-center justify-center text-[#002B2B] transition-all hover:scale-105 shadow-xl shadow-[#C5A059]/10 active:scale-95 disabled:opacity-50"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
              </div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>

      <MotionButton
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-20 h-20 shadow-[0_0_50px_rgba(197,160,89,0.3)] flex items-center justify-center text-white border border-[#C5A059]/50 overflow-hidden relative bg-[#002B2B] rounded-full group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#C5A059] to-transparent opacity-0 group-hover:opacity-20 transition-opacity"></div>
        <svg className="w-10 h-10 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-7v5"></path>
        </svg>
      </MotionButton>
    </div>
  );
};

export default ConciergeOrb;