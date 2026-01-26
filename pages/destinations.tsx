
import React from 'react';
import { motion } from 'framer-motion';
import { DESTINATIONS } from '../constants';

const MotionDiv = motion.div as any;

const Destinations: React.FC = () => {
  const openConcierge = (dest: string) => {
    window.dispatchEvent(new CustomEvent('open-concierge', { 
      detail: { message: `Alessandro, I am interested in visiting ${dest}. Can you suggest a luxury itinerary for 3 days?` } 
    }));
  };

  return (
    <div className="pt-32 pb-24 px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <span className="text-[#C5A059] text-xs font-bold tracking-[0.4em] uppercase mb-4 block">The Selection</span>
          <h1 className="text-6xl text-white serif mb-6 italic">Signature <span className="not-italic font-bold">Destinations.</span></h1>
          <p className="text-white/40 text-lg max-w-2xl leading-relaxed font-light">
            From the Hapsburg echoes of Trieste to the hidden lagoons of Grado, explore the refined tapestry of Northern Italy.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {DESTINATIONS.map((dest, i) => (
            <MotionDiv
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group flex flex-col glass rounded-[40px] overflow-hidden border border-white/5 shadow-2xl h-full"
            >
              <div className="relative h-[400px] overflow-hidden">
                <img 
                  src={dest.image} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  alt={dest.name} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002B2B] via-transparent to-transparent opacity-60" />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-black/40 backdrop-blur-md text-[#C5A059] text-[10px] font-bold uppercase tracking-widest rounded-full border border-[#C5A059]/30">
                    {dest.category}
                  </span>
                </div>
              </div>
              
              <div className="p-10 flex flex-col flex-1">
                <p className="text-[#C5A059] text-[10px] uppercase tracking-widest font-bold mb-2">{dest.location}</p>
                <h3 className="text-3xl text-white serif mb-4">{dest.name}</h3>
                <p className="text-white/50 text-sm mb-10 leading-relaxed font-light flex-1">
                  {dest.description}
                </p>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => openConcierge(dest.name)}
                    className="flex-1 px-6 py-4 bg-[#C5A059] text-[#002B2B] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all transform active:scale-95"
                  >
                    Details
                  </button>
                  <button className="px-6 py-4 border border-white/10 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                    Map
                  </button>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
