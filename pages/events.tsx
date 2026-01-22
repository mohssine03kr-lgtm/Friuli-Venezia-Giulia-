
import React from 'react';
import { motion } from 'framer-motion';
import { EVENTS } from '../constants';

const Events: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="mb-24 text-center">
          <span className="text-[#C5A059] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Seasonal Calendar</span>
          <h1 className="text-6xl text-white serif mb-6">FVG Live</h1>
          <p className="text-white/50 text-lg">
            Exclusive access to the region's most prestigious cultural, maritime, and culinary events.
          </p>
        </header>

        <div className="relative border-l border-white/10 pl-12 space-y-24 ml-4">
          {EVENTS.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              {/* Timeline Point */}
              <div className="absolute -left-[54px] top-0 w-3 h-3 rounded-full bg-[#C5A059] shadow-[0_0_15px_rgba(197,160,89,0.5)]"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div>
                   <span className="text-[#C5A059] text-xs font-bold tracking-widest uppercase mb-2 block">{event.date}</span>
                   <h3 className="text-4xl text-white serif mb-4">{event.title}</h3>
                   <span className="px-3 py-1 bg-white/5 border border-white/10 text-white/60 text-[10px] uppercase rounded-full tracking-widest mb-6 inline-block">
                     {event.category}
                   </span>
                   <p className="text-white/60 text-base leading-relaxed mb-8">
                     {event.description}
                   </p>
                   <button className="flex items-center gap-2 text-[#C5A059] text-xs font-bold uppercase tracking-widest hover:gap-4 transition-all">
                     Request Private Access
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                   </button>
                </div>
                <div className="rounded-[32px] overflow-hidden aspect-video shadow-2xl border border-white/5">
                  <img src={event.image} className="w-full h-full object-cover" alt={event.title} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
