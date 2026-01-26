import React from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

const CATEGORIES = [
  {
    title: "Historical Cafès",
    description: "The soul of Trieste. These are not just bars, but monuments to coffee culture.",
    items: [
      { name: "Caffè degli Specchi", desc: "The 'living room' of Trieste in Piazza Unità. Founded 1839.", location: "Piazza Unità d'Italia, 7, Trieste" },
      { name: "Caffè Tommaseo", desc: "The oldest café in Trieste (1830). Elegant Belgian mirrors.", location: "Piazza Tommaseo, 4/c, Trieste" },
      { name: "Caffè San Marco", desc: "Iconic literary café with a Secessionist style bookstore.", location: "Via Cesare Battisti, 18, Trieste" }
    ]
  },
  {
    title: "Fine Dining",
    description: "Excellence where tradition meets innovation and design.",
    items: [
      { name: "L'Argine a Vencò", desc: "Chef Antonia Klugmann's Michelin star magic in the Collio vineyards.", location: "Località Vencò, Dolegna del Collio" },
      { name: "Harry's Piccolo", desc: "2 Michelin stars at Grand Hotel Duchi d'Aosta. Absolute refinement.", location: "Piazza Unità d'Italia, 2, Trieste" },
      { name: "Agli Amici dal 1887", desc: "Historical Udine landmark for modern Friulian cuisine.", location: "Via Via Noide, 34, Udine" }
    ]
  },
  {
    title: "Luxury Shopping",
    description: "From international designer brands to elegant boutique streets.",
    items: [
      { name: "Palmanova Designer Outlet", desc: "Open-air village with top international brands at elite prices.", location: "Aiello del Friuli" },
      { name: "Via San Nicolò", desc: "The elegant shopping heart of Trieste. Boutique fashion and jewelry.", location: "Trieste Centro" },
      { name: "TIARE Shopping", desc: "Modern and vast complex featuring exclusive retail experiences.", location: "Villesse" }
    ]
  }
];

const Discovery: React.FC = () => {
  const openConcierge = (query: string) => {
    window.dispatchEvent(new CustomEvent('open-concierge', { detail: { message: `Alessandro, tell me about ${query}. Is it open now and what are the reviews?` } }));
  };

  return (
    <div className="pt-32 pb-24 px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-24">
          <span className="text-[#C5A059] text-xs font-bold tracking-[0.5em] uppercase mb-6 block">Elite Selection</span>
          <h1 className="text-6xl md:text-8xl text-white serif mb-8">Alessandro’s <br/><span className="italic font-light">Curated Favorites.</span></h1>
          <p className="text-white/50 text-xl max-w-2xl font-light leading-relaxed">
            A guide to the finest historical establishments and modern luxuries of Friuli-Venezia Giulia, verified for the discerning traveler.
          </p>
        </header>

        <div className="space-y-32">
          {CATEGORIES.map((cat, idx) => (
            <section key={idx}>
              <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-white/10 pb-8">
                <h2 className="text-4xl text-white serif italic">{cat.title}</h2>
                <p className="text-white/40 text-sm mt-4 md:mt-0 font-light">{cat.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {cat.items.map((item, i) => (
                  <MotionDiv
                    key={i}
                    whileHover={{ y: -10 }}
                    className="glass p-8 rounded-[40px] border border-white/5 flex flex-col justify-between group h-full"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-[#C5A059]/10 flex items-center justify-center text-[#C5A059] mb-8 group-hover:bg-[#C5A059] group-hover:text-[#002B2B] transition-all">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        </svg>
                      </div>
                      <h3 className="text-2xl text-white serif mb-4">{item.name}</h3>
                      <p className="text-white/50 text-sm font-light leading-relaxed mb-6">{item.desc}</p>
                    </div>
                    
                    <div className="mt-auto">
                      <p className="text-[10px] text-white/30 uppercase tracking-widest mb-6 font-bold">{item.location}</p>
                      <button 
                        onClick={() => openConcierge(item.name)}
                        className="w-full py-4 border border-[#C5A059]/30 text-[#C5A059] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#002B2B] transition-all"
                      >
                        Consult Alessandro
                      </button>
                    </div>
                  </MotionDiv>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discovery;