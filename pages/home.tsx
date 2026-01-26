import React from 'react';
import { motion } from 'framer-motion';
import InteractiveMap from '../components/interactivemap';
import { Link } from 'react-router-dom';

const MotionDiv = motion.div as any;
const MotionSpan = motion.span as any;
const MotionH1 = motion.h1 as any;

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#002B2B]">
      {/* Cinematic Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <MotionDiv 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover" 
            alt="Friulian Landscape" 
          />
        </MotionDiv>
        <div className="absolute inset-0 bg-gradient-to-b from-[#002B2B]/80 via-transparent to-[#002B2B]" />

        <div className="relative z-10 text-center px-8">
          <MotionSpan 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="block text-[#C5A059] text-xs font-bold tracking-[0.5em] uppercase mb-6"
          >
            Since 1924 • Northern Italy
          </MotionSpan>
          <MotionH1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2 }}
            className="text-7xl md:text-9xl text-white serif italic mb-8"
          >
            Sprezzatura <br/> <span className="not-italic font-bold">Friulana.</span>
          </MotionH1>
          <MotionDiv 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <Link 
              to="/destinations" 
              className="inline-block px-12 py-5 bg-[#C5A059] text-[#002B2B] rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105 shadow-xl"
            >
              Enter The Collection
            </Link>
          </MotionDiv>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <MotionDiv 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-[#C5A059] text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">The Philosophy</span>
            <h2 className="text-5xl text-white serif leading-tight mb-8 italic">
              Where the mountains <br/> <span className="not-italic text-[#C5A059]">meet the sea.</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-10 font-light">
              Friuli-Venezia Giulia is not just a region; it is a crossroads of civilizations. Our portal curates only the most authentic, luxurious, and exclusive experiences for the discerning traveler who values silence, history, and the perfect glass of Vitovska.
            </p>
            <div className="flex gap-12 border-t border-white/10 pt-10">
              <div>
                <div className="text-3xl text-white serif mb-1">48</div>
                <div className="text-[10px] text-[#C5A059] uppercase tracking-widest font-bold">Luxury Estates</div>
              </div>
              <div>
                <div className="text-3xl text-white serif mb-1">12</div>
                <div className="text-[10px] text-[#C5A059] uppercase tracking-widest font-bold">Michelin Partners</div>
              </div>
              <div>
                <div className="text-3xl text-white serif mb-1">∞</div>
                <div className="text-[10px] text-[#C5A059] uppercase tracking-widest font-bold">Memories</div>
              </div>
            </div>
          </MotionDiv>

          <MotionDiv 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <InteractiveMap />
          </MotionDiv>
        </div>
      </section>

      {/* Maps Integration Teaser Section */}
      <section className="py-24 px-8 bg-[#001F1F]">
        <div className="max-w-7xl mx-auto glass p-16 rounded-[48px] border border-[#C5A059]/20 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
                <span className="text-[#C5A059] text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">Live Intelligence</span>
                <h2 className="text-4xl text-white serif mb-6 italic">Discover what's <span className="not-italic text-[#C5A059]">unfolding nearby.</span></h2>
                <p className="text-white/50 text-base leading-relaxed mb-8 max-w-lg">
                    Our AI Concierge Alessandro is now powered by real-time Google Maps data. Locate the closest historical cafes, Michelin-star dining, and luxury boutiques with up-to-the-minute information.
                </p>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-[#C5A059] text-xs font-bold uppercase tracking-widest">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                        Live Locations
                    </div>
                    <div className="flex items-center gap-2 text-[#C5A059] text-xs font-bold uppercase tracking-widest">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                        Verified Reviews
                    </div>
                </div>
            </div>
            <div className="md:w-1/3 text-center">
                <button 
                  onClick={() => {
                      const orb = document.querySelector('button[aria-label="Alessandro - AI Concierge"]') as HTMLElement;
                      if (orb) orb.click();
                  }}
                  className="px-10 py-5 border border-[#C5A059] text-[#C5A059] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#002B2B] transition-all transform hover:scale-105 active:scale-95"
                >
                    Start Nearby Search
                </button>
            </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="py-32 px-8 bg-black/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-20">
            <div>
              <span className="text-[#C5A059] text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">Selected Itineraries</span>
              <h2 className="text-5xl text-white serif">Regional Jewels</h2>
            </div>
            <Link to="/destinations" className="text-[#C5A059] text-xs font-bold uppercase tracking-widest border-b border-[#C5A059]/30 pb-2 hover:border-[#C5A059] transition-all">
              See All Experiences
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                title: 'Collio Vineyards', 
                img: 'https://images.unsplash.com/photo-1506377247377-2a5b3b0ca3ef?auto=format&fit=crop&q=80&w=1200',
                desc: 'Private tastings in the golden hills of Cormons.'
              },
              { 
                title: 'Duino Cliffs', 
                img: 'https://images.unsplash.com/photo-1520175480921-4edfa0683001?auto=format&fit=crop&q=80&w=1200',
                desc: 'Panoramic stays overlooking the Rilke trail.'
              },
              { 
                title: 'Julian Alps', 
                img: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=1200',
                desc: 'Alpine seclusion in five-star mountain refuges.'
              }
            ].map((item, i) => (
              <MotionDiv 
                key={i}
                whileHover={{ y: -15 }}
                className="group relative h-[600px] rounded-[40px] overflow-hidden shadow-2xl"
              >
                <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002B2B] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-10 left-10 right-10">
                  <h3 className="text-3xl text-white serif mb-4">{item.title}</h3>
                  <p className="text-white/50 text-sm font-light leading-relaxed mb-6 italic">{item.desc}</p>
                  <button className="text-[#C5A059] text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 group-hover:gap-5 transition-all">
                    Discover More <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </button>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;