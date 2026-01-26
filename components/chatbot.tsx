import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { askEliteGuide, askFastGuide } from '../services/geminiService';
import { ChatMessage } from '../types';

const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

const EliteChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useThinking, setUseThinking] = useState(false);
  const [useFast, setUseFast] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isLoading]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg: ChatMessage = { role: 'user', content: input };
    const currentHistory = [...messages];
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      let result;
      if (useFast) {
        result = await askFastGuide(input);
      } else {
        result = await askEliteGuide(input, currentHistory, useThinking);
      }
      setMessages(prev => [...prev, { role: 'model', content: result }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "My sincere apologies. I am currently unavailable to guide you. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-24 left-0 w-[350px] md:w-[450px] h-[600px] glass rounded-[40px] overflow-hidden flex flex-col shadow-2xl border border-white/20"
          >
            {/* Header */}
            <div className="p-8 bg-[#C5A059]/10 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#C5A059] flex items-center justify-center text-[#C5A059] shadow-lg bg-black/20">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#C5A059] font-bold text-sm tracking-widest uppercase">The Elite Guide</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-white/40 text-[9px] uppercase tracking-widest">{useFast ? 'Fast Mode Lite' : 'Gemini Pro'}</span>
                    {useThinking && !useFast && <span className="text-[8px] bg-[#C5A059]/20 text-[#C5A059] px-2 py-0.5 rounded-full border border-[#C5A059]/30 font-bold uppercase tracking-tighter animate-pulse">Deep Reasoning</span>}
                    {useFast && <span className="text-[8px] bg-amber-400/20 text-amber-400 px-2 py-0.5 rounded-full border border-amber-400/30 font-bold uppercase tracking-tighter">Ultra Low Latency</span>}
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 bg-black/10">
              {messages.length === 0 && (
                <div className="text-center text-white/50 text-sm mt-10 space-y-4">
                  <p className="serif italic text-xl text-white">"La Dolce Vita awaits."</p>
                  <p className="text-[10px] uppercase tracking-[0.3em] leading-relaxed max-w-[200px] mx-auto">
                    {useFast ? 'Swiftly navigating the finest experiences.' : 'Ask me about the finest experiences across Italy.'}
                  </p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-5 rounded-[28px] text-sm leading-relaxed shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-[#C5A059] text-[#002B2B] rounded-tr-none font-medium' 
                      : 'bg-white/5 text-white/90 rounded-tl-none border border-white/10'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                   <div className="bg-white/5 border border-white/10 p-5 rounded-[28px] rounded-tl-none flex flex-col gap-3">
                     <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 ${useFast ? 'bg-amber-400' : 'bg-[#C5A059]'} rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></span>
                        <span className={`w-1.5 h-1.5 ${useFast ? 'bg-amber-400' : 'bg-[#C5A059]'} rounded-full animate-bounce`} style={{ animationDelay: '200ms' }}></span>
                        <span className={`w-1.5 h-1.5 ${useFast ? 'bg-amber-400' : 'bg-[#C5A059]'} rounded-full animate-bounce`} style={{ animationDelay: '400ms' }}></span>
                     </div>
                     {!useFast && useThinking && (
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#C5A059]/60 font-bold italic animate-pulse">
                          The Guide is reflecting deeply...
                        </p>
                     )}
                     {useFast && (
                        <p className="text-[9px] uppercase tracking-[0.2em] text-amber-400/60 font-bold italic">
                          Instant delivery...
                        </p>
                     )}
                   </div>
                </div>
              )}
            </div>

            {/* Controls Area */}
            <div className="px-8 py-3 border-t border-white/5 bg-black/30 flex items-center justify-between gap-4">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="sr-only" 
                    checked={useFast} 
                    onChange={() => {
                      setUseFast(!useFast);
                      if (!useFast) setUseThinking(false);
                    }}
                  />
                  <div className={`w-8 h-4 rounded-full border transition-all ${useFast ? 'bg-amber-400 border-amber-400' : 'bg-white/5 border-white/20'}`}></div>
                  <div className={`absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white transition-all ${useFast ? 'left-4.5' : 'left-1'}`}></div>
                </div>
                <span className={`text-[8px] uppercase tracking-widest font-bold transition-colors ${useFast ? 'text-amber-400' : 'text-white/30 group-hover:text-white/50'}`}>
                  Swift Mode
                </span>
              </label>

              <label className={`flex items-center gap-2 cursor-pointer group ${useFast ? 'opacity-20 pointer-events-none' : ''}`}>
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="sr-only" 
                    checked={useThinking} 
                    onChange={() => setUseThinking(!useThinking)}
                    disabled={useFast}
                  />
                  <div className={`w-8 h-4 rounded-full border transition-all ${useThinking ? 'bg-[#C5A059] border-[#C5A059]' : 'bg-white/5 border-white/20'}`}></div>
                  <div className={`absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white transition-all ${useThinking ? 'left-4.5' : 'left-1'}`}></div>
                </div>
                <span className={`text-[8px] uppercase tracking-widest font-bold transition-colors ${useThinking ? 'text-[#C5A059]' : 'text-white/30 group-hover:text-white/50'}`}>
                  Deep Insight
                </span>
              </label>
            </div>

            {/* Input Area */}
            <div className="p-8 border-t border-white/10 bg-black/20">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={useFast ? "Rapid inquiry..." : (useThinking ? "Ponder a complex journey..." : "Tell me about Venice...")}
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 text-sm focus:outline-none focus:border-[#C5A059] transition-all text-white placeholder:text-white/20"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className={`w-12 h-12 ${useFast ? 'bg-amber-400' : 'bg-[#C5A059]'} rounded-full flex items-center justify-center text-[#002B2B] transition-all hover:scale-105 active:scale-95 disabled:opacity-50 shadow-lg shadow-[#C5A059]/20`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
              </div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>

      <MotionButton
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-16 h-16 shadow-[0_0_30px_rgba(197,160,89,0.2)] flex items-center justify-center text-white border border-[#C5A059]/50 overflow-hidden relative bg-[#002B2B] rounded-full group"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#C5A059]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <svg className="w-8 h-8 text-[#C5A059] drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </MotionButton>
    </div>
  );
};

export default EliteChatbot;