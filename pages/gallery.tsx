
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateGalleryImage } from '../services/geminiService';

interface GeneratedImage {
  id: number;
  url: string;
  prompt: string;
}

const Gallery: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<"1:1" | "16:9" | "4:3">("1:1");

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    try {
      const imageUrl = await generateGalleryImage(prompt, aspectRatio);
      setImages(prev => [{
        id: Date.now(),
        url: imageUrl,
        prompt: prompt
      }, ...prev]);
      setPrompt('');
    } catch (error) {
      console.error("Image generation failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "A foggy morning over the vineyards of Cormons, oil painting style",
    "Piazza Unità d'Italia at night with luxury yachts in the harbor",
    "A minimalist Alpine villa in the Julian Alps during winter",
    "Aerial view of the Grado lagoon at sunset, cinematic lighting"
  ];

  return (
    <div className="pt-32 pb-24 px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-center">
          <span className="text-[#C5A059] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">The Digital Atelier</span>
          <h1 className="text-6xl text-white serif mb-6">Visualizing Paradise</h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Use our proprietary AI engine to manifest your dream FVG experience. Describe a scene, and our digital artisans will bring it to life.
          </p>
        </header>

        {/* Input Control Panel */}
        <section className="mb-24">
          <div className="glass p-10 rounded-[48px] border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold ml-4">Your Vision</label>
                <input 
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                  placeholder="e.g. A romantic dinner overlooking the Duino cliffs..."
                  className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 text-lg focus:outline-none focus:border-[#C5A059] transition-all text-white placeholder:text-white/20"
                />
              </div>

              <div className="w-full md:w-64 space-y-4">
                <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold ml-4">Aspect Ratio</label>
                <div className="flex gap-2">
                  {(["1:1", "16:9", "4:3"] as const).map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => setAspectRatio(ratio)}
                      className={`flex-1 py-4 rounded-3xl border text-xs font-bold transition-all ${
                        aspectRatio === ratio 
                          ? 'bg-[#C5A059] border-[#C5A059] text-[#002B2B]' 
                          : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-end">
                <button 
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="w-full md:w-auto px-12 py-5 bg-[#C5A059] text-[#002B2B] rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#C5A059]/20 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#002B2B]/20 border-t-[#002B2B] rounded-full animate-spin"></div>
                      Creating...
                    </>
                  ) : 'Manifest'}
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="text-white/20 text-[10px] uppercase font-bold self-center mr-2">Suggestions:</span>
              {suggestions.map((s, i) => (
                <button 
                  key={i}
                  onClick={() => setPrompt(s)}
                  className="px-4 py-2 bg-white/5 border border-white/5 rounded-full text-[10px] text-white/40 hover:text-[#C5A059] hover:border-[#C5A059]/30 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Masonry Grid */}
        <section>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            <AnimatePresence>
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`relative rounded-[32px] overflow-hidden glass border border-[#C5A059]/30 animate-pulse flex flex-col items-center justify-center min-h-[400px]`}
                >
                  <div className="text-[#C5A059] text-xs font-bold uppercase tracking-[0.3em] mb-4">Artisans at work</div>
                  <div className="text-white/20 italic text-sm text-center px-10">"The Alpine light is being captured..."</div>
                </motion.div>
              )}
              {images.map((img) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="break-inside-avoid relative group rounded-[40px] overflow-hidden shadow-2xl border border-white/5 bg-[#001F1F]"
                >
                  <img src={img.url} className="w-full h-auto object-cover transition-transform duration-[2s] group-hover:scale-110" alt={img.prompt} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002B2B] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                    <p className="text-white text-sm font-medium leading-relaxed italic mb-4">"{img.prompt}"</p>
                    <div className="flex gap-4">
                      <button className="text-[#C5A059] text-[10px] font-bold uppercase tracking-widest border-b border-[#C5A059]/30 hover:border-[#C5A059] transition-all">Save to Portfolio</button>
                      <button className="text-white/40 text-[10px] uppercase tracking-widest hover:text-white transition-all">Share</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {images.length === 0 && !isLoading && (
            <div className="text-center py-40 opacity-20">
              <svg className="w-24 h-24 mx-auto mb-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <p className="text-2xl serif">Your gallery awaits its first masterpiece.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Gallery;
