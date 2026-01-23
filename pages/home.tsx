
import React from 'react';
import { motion } from 'framer-motion';
import InteractiveMap from '../components/interactivemap';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen">
      {/* Hero Section */}
      <section className="px-8 py-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 grid-rows-2 gap-6 h-auto lg:h-[800px]">
          {/* Main Cinematic Tile */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 lg:row-span-2 relative min-h-[500px] rounded-[48px] overflow-hidden group shadow-2xl"
          >
            <div className="absolute inset-0 bg-black/20 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=2000" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
              alt="Luxury Estate" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#002B2B] via-transparent to-black/20 opacity-90 z-20" />
            
            <div className="absolute top-12 left-12 z-30">
               <span className="text-[#C5A059] text-xs font-bold tracking-[0.5em] uppercase bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                 Autumn Season 2025
               </span>
            </div>

            <div className="absolute bottom-16 left-12 right-12 z-30">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-6xl md:text-9xl text-white serif leading-[0.9] mb-8 tracking-tighter"
              >
                The Art of <br/> <span className="italic font-light opacity-80">Friulian</span> <br/> <span className="font-bold">Living.</span>
              </motion.h1>
              <div className="flex flex-wrap items-center gap-6">
                 <Link to="/destinations" className="px-10 py-5 bg-[#C5A059] text-[#002B2B] rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-xl">
                   Discover The Collection
                 </Link>
                 <div className="flex -space-x-4">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-2 border-[#002B2B] overflow-hidden bg-gray-800">
                        <img src={`https://i.pravatar.cc/150?u=${i+10}`} alt="Member" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    <div className="w-12 h-12 rounded-full border-2 border-[#002B2B] bg-[#001F1F] flex items-center justify-center text-[10px] text-[#C5A059] font-bold">
                      +4K
                    </div>
                 </div>
                 <p className="text-white/40 text-xs uppercase tracking-widest font-medium">Trusted by global travelers</p>
              </div>
            </div>
          </motion.div>

          {/* Vineyard Secondary Tile */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 h-full rounded-[40px] overflow-hidden relative glass group border border-white/10"
          >
            <img 
              src="https://images.unsplash.com/photo-1506377247377-2a5b3b0ca3ef?auto=format&fit=crop&q=80&w=1200" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-60" 
              alt="Vineyards" 
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#002B2B]/80 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-12">
               <span className="text-[#C5A059] text-[10px] font-bold tracking-[0.3em] uppercase mb-3">Enology</span>
               <h3 className="text-4xl text-white serif mb-4 leading-tight">Collio <br/> Gold Reserve</h3>
               <p className="text-white/50 text-sm max-w-[240px] leading-relaxed mb-6">Private cellar tastings and vineyard estate stays in the heart of white wine country.</p>
               <Link to="/gastronomy" className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-3 group/link">
                 Book Tasting
                 <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover/link:bg-[#C5A059] group-hover/link:border-[#C5A059] transition-all">
                   <svg className="w-4 h-4 text-white group-hover/link:text-[#002B2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                 </div>
               </Link>
            </div>
          </motion.div>

          {/* Interactive Map/Insights Tile */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-4 h-full rounded-[40px] overflow-hidden relative glass border border-white/10"
          >
            <InteractiveMap />
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="px-8 py-32 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-[#C5A059] text-xs font-bold tracking-[0.5em] uppercase mb-8 block">Our Philosophy</span>
          <h2 className="text-5xl md:text-7xl text-white serif mb-12 italic">Authenticity is the <span className="font-bold not-italic">ultimate luxury.</span></h2>
          <div className="h-px w-24 bg-[#C5A059] mx-auto mb-12" />
          <p className="text-white/60 text-xl max-w-3xl mx-auto leading-relaxed serif italic">
            "In the borderlands between the Alps and the Adriatic, we find a luxury that doesn't shout. It is the silence of a foggy morning in Cormons, the crisp bite of a Malvasia, and the timeless stones of Trieste."
          </p>
        </motion.div>
      </section>

      {/* Featured Grid */}
      <section className="px-8 py-32 bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-[#C5A059] text-xs font-bold tracking-[0.4em] uppercase mb-4 block">The Selection</span>
              <h2 className="text-5xl md:text-6xl text-white serif leading-tight">Curated Regional Experiences</h2>
            </div>
            <Link to="/destinations" className="px-8 py-4 border border-white/10 text-white/60 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#C5A059] hover:text-[#002B2B] hover:border-[#C5A059] transition-all">
              View Entire Atlas
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'Julian Alpine Chalets', img: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=1200', category: 'Mountain', desc: 'Snow-capped serenity in the jagged peaks of Tarvisio.' },
              { title: 'Adriatic Charters', img: 'https://images.unsplash.com/photo-1544433330-938b8e538118?auto=format&fit=crop&q=80&w=1200', category: 'Coastal', desc: 'Navigate the hidden inlets of Duino and the Gulf of Trieste.' },
              { title: 'Legacy Aging Cellars', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200', category: 'Gastronomy', desc: 'Private encounters with the masters of San Daniele and Cormons.' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -15 }}
                className="group relative"
              >
                <div className="h-[500px] rounded-[40px] overflow-hidden relative shadow-2xl border border-white/5">
                  <img src={item.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={item.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002B2B] via-transparent to-transparent opacity-90" />
                  
                  <div className="absolute top-8 left-8">
                     <span className="px-4 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] text-white font-bold uppercase tracking-widest border border-white/10">
                       {item.category}
                     </span>
                  </div>

                  <div className="absolute bottom-10 left-10 right-10">
                    <h3 className="text-3xl text-white serif mb-3 leading-tight group-hover:text-[#C5A059] transition-colors">{item.title}</h3>
                    <p className="text-white/40 text-sm mb-6 line-clamp-2 leading-relaxed">{item.desc}</p>
                    <button className="text-[#C5A059] text-[10px] font-bold uppercase tracking-widest flex items-center gap-3">
                      View Itinerary 
                      <div className="w-10 h-[1px] bg-[#C5A059]/30 transition-all group-hover:w-16 group-hover:bg-[#C5A059]"></div>
                    </button>
                  </div>
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
