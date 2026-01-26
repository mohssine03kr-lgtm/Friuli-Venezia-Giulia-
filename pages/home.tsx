
import React from 'react';
import { motion } from 'framer-motion';
import InteractiveMap from '../components/interactivemap';
import { Link } from 'react-router-dom';

// Using local aliases with any type to bypass strict property check errors for framer-motion props
const MotionDiv = motion.div as any;
const MotionSpan = motion.span as any;
const MotionH1 = motion.h1 as any;

const Home: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { 
      duration: 1.2, 
      ease: [0.22, 1, 0.36, 1]
    }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.3 }
  };

  return (
    <div className="pt-24 min-h-screen bg-[#002B2B]">
      {/* Hero Section */}
      <section className="px-8 py-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 grid-rows-2 gap-6 h-auto lg:h-[800px]">
          {/* Main Cinematic Tile */}
          <MotionDiv 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="lg:col-span-8 lg:row-span-2 relative min-h-[500px] rounded-[48px] overflow-hidden group shadow-2xl"
          >
            <div className="absolute inset-0 bg-black/30 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=2000" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110" 
              alt="Luxury Estate" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#002B2B] via-transparent to-black/20 opacity-90 z-20" />
            
            <div className="absolute top-12 left-12 z-30">
               <MotionSpan 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.8 }}
                 className="text-[#C5A059] text-xs font-bold tracking-[0.5em] uppercase bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10"
               >
                 Autumn Season 2025
               </MotionSpan>
            </div>

            <div className="absolute bottom-16 left-12 right-12 z-30">
              <MotionH1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
                className="text-6xl md:text-9xl text-white serif leading-[0.9] mb-8 tracking-tighter"
              >
                The Art of <br/> <span className="italic font-light opacity-80">Friulian</span> <br/> <span className="font-bold">Living.</span>
              </MotionH1>
              <MotionDiv 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex flex-wrap items-center gap-6"
              >
                 <Link to="/destinations" className="px-10 py-5 bg-[#C5A059] text-[#002B2B] rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-xl">
                   Explore Collection
                 </Link>
                 <div className="flex -space-x-4">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-2 border-[#002B2B] overflow-hidden bg-gray-800">
                        <img src={`https://i.pravatar.cc/150?u=${i+20}`} alt="Member" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    <div className="w-12 h-12 rounded-full border-2 border-[#002B2B] bg-[#001F1F] flex items-center justify-center text-[10px] text-[#C5A059] font-bold">
                      +4K
                    </div>
                 </div>
              </MotionDiv>
            </div>
          </MotionDiv>

          {/* Vineyard Secondary Tile - Wine Section Entry */}
          <MotionDiv 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1 }}
            className="lg:col-span-4 h-full rounded-[40px] overflow-hidden relative glass group border border-white/10 shadow-xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1506377247377-2a5b3b0ca3ef?auto=format&fit=crop&q=80&w=1200" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-110 opacity-60" 
              alt="Vineyards" 
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#002B2B]/80 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-12">
               <span className="text-[#C5A059] text-[10px] font-bold tracking-[0.3em] uppercase mb-3 block">Gastronomy & Wine</span>
               <h3 className="text-4xl text-white serif mb-4 leading-tight">Collio <br/> Gold Reserve</h3>
               <p className="text-white/50 text-sm max-w-[240px] leading-relaxed mb-6 italic">Discover "eleganza discreta" in every sip across our legacy estates.</p>
               <Link to="/gastronomy" className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-3 group/link">
                 Curated Tastings
                 <MotionDiv 
                   whileHover={{ x: 5 }}
                   className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover/link:bg-[#C5A059] group-hover/link:border-[#C5A059] transition-all"
                 >
                   <svg className="w-4 h-4 text-white group-hover/link:text-[#002B2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                 </MotionDiv>
               </Link>
            </div>
          </MotionDiv>

          {/* Interactive Map Tile */}
          <MotionDiv 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 1 }}
            className="lg:col-span-4 h-full rounded-[40px] overflow-hidden relative glass border border-white/10"
          >
            <InteractiveMap />
          </MotionDiv>
        </div>
      </section>

      {/* Philosophy Section with Enhanced Scroll Animation */}
      <section className="px-8 py-32 max-w-7xl mx-auto text-center overflow-hidden">
        <MotionDiv
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <span className="text-[#C5A059] text-xs font-bold tracking-[0.5em] uppercase mb-8 block">Regional Ethos</span>
          <h2 className="text-5xl md:text-8xl text-white serif mb-12 italic tracking-tight">
            Authenticity is the <span className="font-bold not-italic text-[#C5A059]">ultimate luxury.</span>
          </h2>
          <MotionDiv 
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px bg-[#C5A059] mx-auto mb-12" 
          />
          <p className="text-white/60 text-2xl max-w-4xl mx-auto leading-relaxed serif italic font-light px-4">
            "Trieste is the forgotten pearl of the Adriatic—a refuge where history meets the horizon. We celebrate the silent foggy mornings and the crisp, aristocratic bite of a vintage Vitovska."
          </p>
        </MotionDiv>
      </section>

      {/* Featured Grid with Staggered Entrance */}
      <section className="px-8 py-32 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <MotionDiv 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-2xl"
            >
              <span className="text-[#C5A059] text-xs font-bold tracking-[0.4em] uppercase mb-4 block">The Atlas</span>
              <h2 className="text-5xl md:text-7xl text-white serif leading-tight">Curated Regional Experiences</h2>
            </MotionDiv>
            <MotionDiv
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <Link to="/destinations" className="px-10 py-5 border border-[#C5A059]/30 text-[#C5A059] rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#C5A059] hover:text-[#002B2B] hover:border-[#C5A059] transition-all shadow-lg hover:shadow-[#C5A059]/10">
                View Entire Portfolio
              </Link>
            </MotionDiv>
          </div>

          <MotionDiv 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {[
              { title: 'Julian Alpine Chalets', img: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=1200', category: 'Mountain', desc: 'Snow-capped serenity in the jagged peaks of Tarvisio.' },
              { title: 'Adriatic Charters', img: 'https://images.unsplash.com/photo-1544433330-938b8e538118?auto=format&fit=crop&q=80&w=1200', category: 'Coastal', desc: 'Navigate the hidden inlets of Duino and the Gulf of Trieste.' },
              { title: 'Legacy Aging Cellars', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200', category: 'Gastronomy', desc: 'Private encounters with the masters of San Daniele and Cormons.' }
            ].map((item, i) => (
              <MotionDiv 
                key={i}
                initial={fadeInUp.initial}
                whileInView={fadeInUp.whileInView}
                viewport={fadeInUp.viewport}
                transition={fadeInUp.transition}
                whileHover={{ y: -20 }}
                className="group relative"
              >
                <div className="h-[600px] rounded-[48px] overflow-hidden relative shadow-2xl border border-white/5 bg-[#001F1F]">
                  <img src={item.img} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" alt={item.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002B2B] via-transparent to-transparent opacity-90" />
                  
                  <div className="absolute top-10 left-10">
                     <span className="px-5 py-2 bg-white/10 backdrop-blur-xl rounded-full text-[10px] text-white font-bold uppercase tracking-widest border border-white/20">
                       {item.category}
                     </span>
                  </div>

                  <div className="absolute bottom-12 left-12 right-12">
                    <h3 className="text-4xl text-white serif mb-4 leading-tight group-hover:text-[#C5A059] transition-colors">{item.title}</h3>
                    <p className="text-white/40 text-sm mb-8 line-clamp-2 leading-relaxed italic">"{item.desc}"</p>
                    <button className="text-[#C5A059] text-xs font-bold uppercase tracking-widest flex items-center gap-4 group/btn">
                      Explore Itinerary 
                      <MotionDiv className="w-12 h-[1px] bg-[#C5A059]/40 group-hover/btn:w-20 group-hover/btn:bg-[#C5A059] transition-all" />
                    </button>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </MotionDiv>
        </div>
      </section>
    </div>
  );
};

export default Home;
