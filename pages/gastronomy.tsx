import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCulinaryRecipe } from '../services/geminiService';

const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

const Gastronomy: React.FC = () => {
  const [dish, setDish] = useState('');
  const [recipe, setRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dishes = [
    { name: 'Frico & Polenta', desc: 'Montasio cheese & mountain tradition' },
    { name: 'Cjarsons', desc: 'Sweet-savory ravioli of Carnia' },
    { name: 'Gubana', desc: 'Festive nut-filled pastry' },
    { name: 'Boretto alla Graisana', desc: 'Ancient fisherman\'s stew' }
  ];

  const handleGetRecipe = async (dishName: string) => {
    setIsLoading(true);
    setRecipe('');
    setDish(dishName);
    try {
      const result = await getCulinaryRecipe(dishName);
      if (result) setRecipe(result);
    } catch (error) {
      setRecipe("My apologies. The chef is momentarily unavailable. Please try again soon.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-24 text-center">
          <span className="text-[#C5A059] text-xs font-bold tracking-[0.5em] uppercase mb-6 block">The Culinary Table</span>
          <h1 className="text-6xl md:text-8xl text-white serif mb-8 italic">L'Arte della <span className="not-italic font-bold">Cucina.</span></h1>
          <p className="text-white/50 text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Friulian gastronomy is a dialogue between the forest and the sea. Experience the aristocratic legacy of our regional ingredients.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Side Menu */}
          <MotionDiv 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="glass p-10 rounded-[40px] border border-white/10">
              <h3 className="text-[#C5A059] text-[10px] font-bold uppercase tracking-widest mb-10">Signature Traditions</h3>
              <div className="space-y-4">
                {dishes.map((d, i) => (
                  <MotionButton
                    key={i}
                    whileHover={{ x: 5 }}
                    onClick={() => handleGetRecipe(d.name)}
                    className={`w-full text-left p-6 rounded-[24px] border transition-all flex items-center justify-between group ${
                      dish === d.name ? 'bg-[#C5A059] border-[#C5A059] text-[#002B2B]' : 'bg-white/5 border-white/10 text-white hover:border-[#C5A059]/40'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold uppercase tracking-widest mb-1">{d.name}</div>
                      <div className={`text-[10px] uppercase tracking-tighter ${dish === d.name ? 'text-[#002B2B]/60' : 'text-white/30'}`}>{d.desc}</div>
                    </div>
                    <svg className={`w-4 h-4 ${dish === d.name ? 'text-[#002B2B]' : 'text-[#C5A059]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </MotionButton>
                ))}
              </div>
            </div>
            
            <div className="p-8 text-center opacity-40">
              <p className="text-[10px] uppercase tracking-widest text-white italic">"Quality is the only rule in the Friulian kitchen."</p>
            </div>
          </MotionDiv>

          {/* AI Chef Area */}
          <MotionDiv 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 min-h-[600px] glass rounded-[50px] p-12 relative overflow-hidden flex flex-col items-center justify-center border border-white/5 shadow-2xl"
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <MotionDiv
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-6"
                >
                  <div className="w-16 h-16 border-2 border-[#C5A059]/20 border-t-[#C5A059] rounded-full animate-spin"></div>
                  <p className="text-[#C5A059] text-xs font-bold uppercase tracking-[0.3em]">Preparing the Grimoire...</p>
                </MotionDiv>
              ) : recipe ? (
                <MotionDiv
                  key="recipe"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full prose prose-invert max-w-none"
                >
                  <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-8">
                    <h2 className="text-4xl text-white serif italic m-0">{dish}</h2>
                    <span className="text-[10px] text-[#C5A059] font-bold uppercase tracking-widest px-4 py-2 border border-[#C5A059]/30 rounded-full">Chef's Secret</span>
                  </div>
                  <div className="text-white/70 leading-relaxed font-light text-lg whitespace-pre-wrap">
                    {recipe}
                  </div>
                </MotionDiv>
              ) : (
                <div className="text-center opacity-20">
                  <svg className="w-24 h-24 mx-auto mb-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  <p className="text-2xl serif italic">Select a delicacy to unveil its secrets.</p>
                </div>
              )}
            </AnimatePresence>
          </MotionDiv>
        </div>
      </div>
    </div>
  );
};

export default Gastronomy;