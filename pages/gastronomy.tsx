
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCulinaryRecipe } from '../services/geminiService';

const Gastronomy: React.FC = () => {
  const [dish, setDish] = useState('');
  const [recipe, setRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dishes = [
    { name: 'Frico & Polenta', desc: 'The definitive Montasio cheese crisp' },
    { name: 'Cjarsons', desc: 'Legendary sweet & savory Carnic ravioli' },
    { name: 'Gubana', desc: 'Aristocratic nut-filled festive cake' },
    { name: 'Boretto alla Graisana', desc: 'Ancient fisherman\'s white vinegar stew' }
  ];

  const handleGetRecipe = async (dishName: string) => {
    setIsLoading(true);
    setRecipe('');
    setDish(dishName);
    try {
      const result = await getCulinaryRecipe(dishName);
      if (result) setRecipe(result);
    } catch (error) {
      setRecipe("An apology from the kitchen: we encountered a temporary delay. Please attempt to consult the chef once more.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-8 min-h-screen bg-[#002B2B]">
      <div className="max-w-7xl mx-auto">
        {/* Directly using motion components from the library to ensure proper scope and type discovery */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-24 text-center"
        >
          <span className="text-[#C5A059] text-xs font-bold tracking-[0.4em] uppercase mb-6 block">Gastronomy</span>
          <h1 className="text-6xl md:text-8xl text-white serif mb-8 leading-tight">Culinary <span className="italic">Excellence.</span></h1>
          <p className="text-white/50 text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Friuli-Venezia Giulia is the "culla dei sapori" where Alpine traditions meet Venetian refinement. Explore the secrets of our masters.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* AI Chef Selection Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 space-y-8"
          >
            <div className="glass p-10 rounded-[48px] border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/5 rounded-full blur-2xl -mr-16 -mt-16" />
              
              <div className="flex items-center gap-5 mb-10 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#C5A059] flex items-center justify-center text-[#002B2B] shadow-lg shadow-[#C5A059]/20">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path></svg>
                </div>
                <div>
                  <h3 className="text-white font-bold uppercase tracking-widest text-sm">Gourmet Assistant</h3>
                  <p className="text-[#C5A059] text-[10px] uppercase font-bold tracking-widest">Master of Dolce Vita</p>
                </div>
              </div>
              
              <p className="text-white/60 text-sm mb-10 leading-relaxed italic">
                "Plating is a conversation with history. Select a traditional delicacy to unveil its contemporary manifestation."
              </p>

              <div className="space-y-4">
                {dishes.map((d, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ x: 10 }}
                    onClick={() => handleGetRecipe(d.name)}
                    className={`w-full text-left p-6 rounded-[28px] border transition-all flex items-center justify-between group shadow-sm ${
                      dish === d.name ? 'bg-[#C5A059] border-[#C5A059] text-[#002B2B]' : 'bg-white/5 border-white/10 text-white hover:border-[#C5A059]/40'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold uppercase tracking-widest mb-1">{d.name}</div>
                      <div className={`text-[10px] uppercase tracking-tighter ${dish === d.name ? 'text-[#002B2B]/60' : 'text-white/30'}`}>{d.desc}</div>
                    </div>
                    <motion.svg 
                      animate={dish === d.name ? { x: 5 } : {}}
                      className={`w-5 h-5 ${dish === d.name ? 'text-[#002B2B]' : 'text-[#C5A059]'}`} 
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </motion.svg>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="glass p-8 rounded-[40px] border border-white/5 text-center">
               <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Recommended Pairing</p>
               <h4 className="text-white serif text-xl mt-3">Vintage Ribolla Gialla</h4>
               <p className="text-white/30 text-xs mt-2 italic">A crisp, aristocratic white from the Oslavia hills.</p>
            </div>
          </motion.div>

          {/* Dynamic Recipe Content Area */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 min-h-[700px] glass rounded-[56px] border border-white/10 p-16 shadow-2xl relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-[#002B2B]/60 backdrop-blur-xl z-10"
                >
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 border-2 border-[#C5A059]/20 border-t-[#C5A059] rounded-full mb-8"
                  />
                  <p className="text-[#C5A059] text-xs font-bold uppercase tracking-[0.4em] animate-pulse">Consulting the archives...</p>
                </motion.div>
              ) : recipe ? (
                <motion.div
                  key="recipe"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="prose prose-invert max-w-none"
                >
                  <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-10 gap-6">
                    <div>
                      <span className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">Signature Dish</span>
                      <h2 className="text-5xl m-0 text-white serif italic">{dish}</h2>
                    </div>
                    <div className="flex gap-4">
                      <button className="px-6 py-3 glass border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-[#C5A059] transition-all">Download PDF</button>
                      <button className="px-6 py-3 bg-[#C5A059] text-[#002B2B] rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all">Save to Vault</button>
                    </div>
                  </header>
                  <div className="whitespace-pre-wrap leading-[1.8] text-white/70 font-light text-lg">
                    {recipe}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center opacity-20"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <svg className="w-32 h-32 mb-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </motion.div>
                  <h3 className="text-3xl serif mb-4 italic">The Chef's Grimoire</h3>
                  <p className="text-sm uppercase tracking-widest font-bold max-w-sm mx-auto leading-relaxed">Select a tradition to reveal its aristocratic secrets and master the art of FVG plating.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Gastronomy;
