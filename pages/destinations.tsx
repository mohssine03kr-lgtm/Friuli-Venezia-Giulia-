
import React from 'react';
import { motion } from 'framer-motion';
import { DESTINATIONS } from '../constants';

const Destinations: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-8 min-h-screen max-w-7xl mx-auto">
      <header className="mb-20">
        <span className="text-[#C5A059] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Portfolio</span>
        <h1 className="text-6xl text-white serif mb-6">Signature Stays</h1>
        <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
          From ancient castles turned boutique retreats to contemporary masterpieces of architecture, discover our handpicked collection of the finest accommodations in Friuli-Venezia Giulia.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {DESTINATIONS.map((dest, i) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col md:flex-row gap-8 items-center glass p-8 rounded-[32px] border border-white/10 group shadow-lg"
          >
            <div className="w-full md:w-1/2 aspect-square rounded-[24px] overflow-hidden">
              <img 
                src={dest.image} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt={dest.name} 
              />
            </div>
            <div className="w-full md:w-1/2">
              <span className="px-3 py-1 bg-[#C5A059]/10 text-[#C5A059] text-[10px] font-bold uppercase tracking-widest rounded-full mb-4 inline-block">
                {dest.category}
              </span>
              <h3 className="text-3xl text-white serif mb-2">{dest.name}</h3>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-6">{dest.location}</p>
              <p className="text-white/60 text-sm mb-8 leading-relaxed">{dest.description}</p>
              <button className="px-6 py-3 border border-white/20 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-[#002B2B] transition-all">
                Check Availability
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
