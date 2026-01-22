
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCulinaryRecipe } from '../services/geminiService';

const Gastronomy: React.FC = () => {
  const [dish, setDish] = useState('');
  const [recipe, setRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dishes = [
    { name: 'Frico & Polenta', desc: 'Montasio cheese & potato crisp' },
    { name: 'Cjarsons', desc: 'Sweet & savory Carnic ravioli' },
    { name: 'Gubana', desc: 'Rich nut-filled dessert from Cividale' },
    { name: 'Boretto alla Graisana', desc: 'Authentic fish stew from Grado' }
  ];

  const handleGetRecipe = async (dishName: string) => {
    setIsLoading(true);
    setRecipe('');
    setDish(dishName);
    try {
      const result = await getCulinaryRecipe(dishName);
      if (result) setRecipe(result);
    } catch (error) {
      setRecipe("An error occurred while consulting the chef. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-center">
          <span className="text-[#C5A059] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Gastronomy</span>
          <h1 className="text-6xl text-white serif mb-6">Culinary Masterpieces</h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            A cross-cultural melting pot of Latin, Slavic, and Germanic flavors. Consult our Michelin-trained AI chef for regional secrets.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* AI Chef Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass p-8 rounded-[32px] border border-white/10 shadow-xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#C5A059] flex items-center justify-center text-[#002B2B]">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path></svg>
                </div>
                <div>
                  <h3 className="text-white font-bold uppercase tracking-widest text-sm">Culinary AI Assistant</h3>
                  <p className="text-[#C5A059] text-[10px] uppercase">Gourmet Specialist</p>
                </div>
              </div>
              
              <p className="text-white/60 text-sm mb-8 leading-relaxed">
                Select a traditional delicacy to receive a high-end recipe with wine pairings.
              </p>

              <div className="space-y-3">
                {dishes.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => handleGetRecipe(d.name)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                      dish === d.name ? 'bg-[#C5A059] border-[#C5A059] text-[#002B2B]' : 'bg-white/5 border-white/10 text-white hover:border-[#C5A059]/50'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold uppercase tracking-tighter">{d.name}</div>
                      <div className={`text-[10px] ${dish === d.name ? 'text-[#002B2B]/60' : 'text-white/40'}`}>{d.desc}</div>
                    </div>
                    <svg className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${dish === d.name ? 'text-[#002B2B]' : 'text-[#C5A059]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recipe Content Area */}
          <div className="lg:col-span-8 min-h-[600px] glass rounded-[32px] border border-white/10 p-12 shadow-2xl relative overflow-hidden">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-[#002B2B]/40 backdrop-blur-sm z-10"
                >
                  <div className="w-16 h-16 border-4 border-[#C5A059]/20 border-t-[#C5A059] rounded-full animate-spin mb-6"></div>
                  <p className="text-[#C5A059] text-xs font-bold uppercase tracking-widest">Consulting the Chef...</p>
                </motion.div>
              ) : recipe ? (
                <motion.div
                  key="recipe"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="prose prose-invert max-w-none prose-headings:serif prose-headings:text-[#C5A059] prose-p:text-white/70 prose-li:text-white/70"
                >
                  <div className="mb-12 flex justify-between items-center border-b border-white/10 pb-6">
                    <h2 className="text-4xl m-0">{dish}</h2>
                    <button className="text-xs text-white/40 uppercase hover:text-white flex items-center gap-2">
                       <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
                       Save Recipe
                    </button>
                  </div>
                  <div className="whitespace-pre-wrap leading-relaxed text-sm">
                    {recipe}
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-30">
                  <svg className="w-24 h-24 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                  <p className="text-2xl serif">Our culinary archives are ready.</p>
                  <p className="text-sm mt-2 uppercase tracking-widest">Select a dish to begin your gastronomic journey.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gastronomy;
