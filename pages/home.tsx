
import React from 'react';
import { motion } from 'framer-motion';
import InteractiveMap from '../components/interactivemap';

const Home: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen">
      {/* Hero Section */}
      <section className="px-8 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Large Hero Tile */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 lg:row-span-2 relative h-[600px] rounded-[32px] overflow-hidden group shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=1200" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt="Luxury Estate" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#002B2B] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-12 left-12 right-12">
              <span className="text-[#C5A059] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Exclusively Friuli</span>
              <h1 className="text-5xl md:text-7xl text-white serif leading-tight mb-8">
                Italian Elegance <br/> <span className="italic font-light">Reimagined.</span>
              </h1>
              <div className="flex items-center gap-6">
                 <button className="px-8 py-4 bg-[#C5A059] text-[#002B2B] rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all">
                   Explore Collection
                 </button>
                 <div className="flex items-center gap-2 text-white/60 text-sm italic">
                    <span className="w-8 h-[1px] bg-white/30"></span>
                    Scroll for more
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Vineyard Tile */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 h-[290px] rounded-[32px] overflow-hidden relative glass group border border-white/10"
          >
            <img 
              src="https://images.unsplash.com/photo-1506377247377-2a5b3b0ca3ef?auto=format&fit=crop&q=80&w=800" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-50" 
              alt="Vineyards" 
            />
            <div className="absolute inset-0 flex flex-col justify-end p-10">
               <h3 className="text-3xl text-white serif mb-2">Collio Vineyard Retreats</h3>
               <p className="text-white/60 text-sm max-w-sm">Private escapes in the world's finest white wine territory.</p>
            </div>
          </motion.div>

          {/* Live Events Tile */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1 h-[290px] rounded-[32px] overflow-hidden relative bg-[#001F1F] border border-white/10 p-10 flex flex-col justify-between group"
          >
            <div className="flex justify-between items-start">
               <div className="text-[#C5A059] text-[10px] font-bold tracking-widest uppercase">Live from FVG</div>
               <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_red]"></div>
            </div>
            <div>
               <h3 className="text-xl text-white serif mb-1">FVG Live Updates</h3>
               <p className="text-white/40 text-xs mb-4">Real-time luxury events & seasonal harvests.</p>
               <div className="h-0.5 w-0 group-hover:w-full bg-[#C5A059] transition-all duration-500"></div>
            </div>
          </motion.div>

          {/* Interactive Map Tile */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1 h-[290px] rounded-[32px] overflow-hidden relative glass border border-white/10"
          >
            <InteractiveMap />
          </motion.div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="px-8 py-24 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-[#C5A059] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Selected Highlights</span>
              <h2 className="text-5xl text-white serif">Curated Experiences</h2>
            </div>
            <button className="text-white/40 text-xs uppercase tracking-widest hover:text-[#C5A059] transition-colors">View All Portfolios</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Alpine Chalets', img: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=800', desc: 'Snow-capped luxury in Tarvisio' },
              { title: 'Adriatic Charters', img: 'https://images.unsplash.com/photo-1544433330-938b8e538118?auto=format&fit=crop&q=80&w=800', desc: 'Sailing the hidden gulfs' },
              { title: 'Gastronomy Tours', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800', desc: 'Exclusive access to aging cellars' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="rounded-[32px] overflow-hidden group shadow-xl bg-[#001F1F] border border-white/10"
              >
                <div className="h-64 overflow-hidden relative">
                  <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title} />
                </div>
                <div className="p-8">
                  <h3 className="text-xl text-white serif mb-2">{item.title}</h3>
                  <p className="text-white/40 text-sm mb-6">{item.desc}</p>
                  <button className="text-[#C5A059] text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group">
                    Learn More 
                    <span className="w-4 h-[1px] bg-[#C5A059] transition-all group-hover:w-8"></span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
