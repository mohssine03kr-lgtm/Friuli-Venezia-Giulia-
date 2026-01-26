
import React from 'react';
import { motion } from 'framer-motion';

// Using local aliases with any type to bypass strict property check errors for framer-motion props
const MotionDiv = motion.div as any;

const InteractiveMap: React.FC = () => {
  const points = [
    { name: 'Trieste', x: '85%', y: '85%', color: '#C5A059' },
    { name: 'Udine', x: '65%', y: '55%', color: '#C5A059' },
    { name: 'Pordenone', x: '25%', y: '60%', color: '#C5A059' },
    { name: 'Gorizia', x: '80%', y: '65%', color: '#C5A059' },
    { name: 'Tarvisio', x: '80%', y: '15%', color: '#C5A059' },
  ];

  return (
    <div className="relative w-full aspect-square md:aspect-video rounded-[32px] overflow-hidden glass border border-white/10 group">
      <div className="absolute inset-0 bg-gradient-to-br from-[#002B2B] to-[#001F1F]"></div>
      
      {/* Decorative SVG Map Contour */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 800 500" fill="none">
        <path d="M150,100 Q400,50 650,100 T750,300 T600,450 T200,400 T100,250 Z" stroke="#C5A059" strokeWidth="1" strokeDasharray="5,5" />
      </svg>

      {/* Interactive Markers */}
      {points.map((p, i) => (
        <MotionDiv
          key={i}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: i * 0.1, type: 'spring' }}
          style={{ left: p.x, top: p.y }}
          className="absolute -translate-x-1/2 -translate-y-1/2 group/marker"
        >
          <div className="relative">
            <MotionDiv 
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-[#C5A059]/40 rounded-full blur-sm"
            />
            <div className="w-4 h-4 bg-[#C5A059] rounded-full border-2 border-[#002B2B] z-10 relative cursor-pointer" />
            
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full text-[10px] text-white whitespace-nowrap opacity-0 group-hover/marker:opacity-100 transition-opacity border border-white/10 uppercase tracking-tighter">
              {p.name}
            </div>
          </div>
        </MotionDiv>
      ))}

      <div className="absolute bottom-8 left-8">
        <h3 className="text-2xl font-bold text-white serif mb-2">Regional Insights</h3>
        <p className="text-white/40 text-sm max-w-xs">Explore the luxury hotspots of Friuli-Venezia Giulia. Click markers to discover tailored itineraries.</p>
        <button className="mt-6 flex items-center gap-2 text-[#C5A059] text-xs font-bold uppercase tracking-widest group">
          Open Full Atlas
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </button>
      </div>
    </div>
  );
};

export default InteractiveMap;
