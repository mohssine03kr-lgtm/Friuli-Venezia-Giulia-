
import React from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

const ATTRACTIONS = [
  {
    name: "Miramare Castle",
    city: "Trieste",
    desc: "The Archduke's dream on the cliffs. A white limestone castle jutting into the blue Adriatic, surrounded by botanical gardens.",
    image: "https://images.unsplash.com/photo-1520175480921-4edfa0683001?auto=format&fit=crop&q=80&w=1200",
    link: "Castello di Miramare"
  },
  {
    name: "Basilica of Aquileia",
    city: "Aquileia",
    desc: "A UNESCO heritage site featuring the largest early Christian floor mosaic in the Western world. A journey back to the Roman Empire.",
    image: "https://images.unsplash.com/photo-1544013587-4142a461b4fa?auto=format&fit=crop&q=80&w=1200",
    link: "Basilica di Aquileia"
  },
  {
    name: "Loggia del Lionello",
    city: "Udine",
    desc: "The heart of Udine. A stunning Venetian Gothic loggia made of pink and white marble, echoing the Piazza San Marco.",
    image: "https://images.unsplash.com/photo-1541811655610-184568600c24?auto=format&fit=crop&q=80&w=1200",
    link: "Loggia del Lionello Udine"
  }
];

const Discovery: React.FC = () => {
  const openConcierge = (query: string) => {
    window.dispatchEvent(new CustomEvent('open-concierge', { 
      detail: { message: `Alessandro, tell me more about ${query}. I want to know about opening hours and the best time of day to visit.` } 
    }));
  };

  return (
    <div className="pt-32 pb-24 px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-24 text-center">
          <span className="text-[#C5A059] text-xs font-bold tracking-[0.5em] uppercase mb-6 block">Curated Discovery</span>
          <h1 className="text-6xl md:text-8xl text-white serif mb-8 italic">The Hidden <span className="not-italic font-bold text-[#C5A059]">Treasures.</span></h1>
          <p className="text-white/40 text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Beyond the famous vistas lie centuries of history. We have curated the region's most profound architectural and cultural landmarks.
          </p>
        </header>

        <div className="space-y-40">
          {ATTRACTIONS.map((attr, idx) => (
            <MotionDiv 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-20 items-center`}
            >
              <div className="w-full lg:w-1/2 group relative">
                <div className="absolute -inset-4 border border-[#C5A059]/20 rounded-[60px] translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700" />
                <div className="relative h-[600px] rounded-[50px] overflow-hidden shadow-2xl">
                  <img src={attr.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={attr.name} />
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <span className="text-[#C5A059] text-xs font-bold tracking-[0.4em] uppercase mb-6 block">{attr.city}</span>
                <h2 className="text-5xl text-white serif mb-8">{attr.name}</h2>
                <p className="text-white/60 text-lg leading-relaxed mb-12 font-light">
                  {attr.desc}
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <button 
                    onClick={() => openConcierge(attr.link)}
                    className="px-12 py-5 bg-[#C5A059] text-[#002B2B] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-[#C5A059]/20"
                  >
                    Inquire for Private Tour
                  </button>
                  <button className="px-12 py-5 border border-white/10 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                    Virtual Atlas
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

export default Discovery;
