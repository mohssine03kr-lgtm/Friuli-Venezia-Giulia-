
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateGalleryImage } from '../services/geminiService';

interface GeneratedImage {
  id: number;
  url: string;
  prompt: string;
  size: string;
}

// Fixed declaration conflict for 'aistudio' on window object by removing local interface
// and relying on the pre-configured environment-provided definition.

// Using local aliases with any type to bypass strict property check errors for framer-motion props
const MotionDiv = motion.div as any;

const Gallery: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<"1:1" | "16:9" | "4:3">("1:1");
  const [imageSize, setImageSize] = useState<"1K" | "2K" | "4K">("1K");
  const [hasKey, setHasKey] = useState<boolean | null>(null);

  useEffect(() => {
    checkApiKey();
  }, []);

  const checkApiKey = async () => {
    try {
      // Using type casting to access global aistudio to avoid strict type mismatch errors
      const selected = await (window as any).aistudio.hasSelectedApiKey();
      setHasKey(selected);
    } catch (e) {
      setHasKey(false);
    }
  };

  const handleSelectKey = async () => {
    // Using type casting to access global aistudio to avoid strict type mismatch errors
    await (window as any).aistudio.openSelectKey();
    setHasKey(true); // Assume success per instructions
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    try {
      const imageUrl = await generateGalleryImage(prompt, aspectRatio, imageSize);
      setImages(prev => [{
        id: Date.now(),
        url: imageUrl,
        prompt: prompt,
        size: imageSize
      }, ...prev]);
      setPrompt('');
    } catch (error: any) {
      console.error("Image generation failed", error);
      // Handle "Requested entity was not found" error by prompting for key re-selection
      if (error?.message?.includes("Requested entity was not found")) {
        handleSelectKey();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "Castello di Miramare overlooking the blue Adriatic at twilight",
    "Gilded interior of a historical Trieste café with soft espresso steam",
    "Sun-drenched vineyards of Collio during the golden hour harvest",
    "A minimalist luxury villa in the Julian Alps surrounded by snow"
  ];

  if (hasKey === false) {
    return (
      <div className="pt-48 pb-24 px-8 min-h-screen flex items-center justify-center text-center">
        <div className="max-w-md glass p-12 rounded-[48px] border border-[#C5A059]/30">
          <div className="w-16 h-16 bg-[#C5A059]/10 rounded-2xl flex items-center justify-center text-[#C5A059] mx-auto mb-8">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
          </div>
          <h2 className="text-3xl text-white serif mb-4">Elite Access Required</h2>
          <p className="text-white/50 text-sm mb-10 leading-relaxed uppercase tracking-widest font-light">
            High-fidelity visualization (2K/4K) requires a personal API key from a paid project.
          </p>
          <button 
            onClick={handleSelectKey}
            className="w-full py-4 bg-[#C5A059] text-[#002B2B] rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#C5A059]/20"
          >
            Connect Paid API Key
          </button>
          <a 
            href="https://ai.google.dev/gemini-api/docs/billing" 
            target="_blank" 
            className="block mt-6 text-[#C5A059] text-[10px] uppercase font-bold tracking-widest hover:underline"
          >
            Learn about Billing
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-center">
          <span className="text-[#C5A059] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">The Digital Atelier</span>
          <h1 className="text-6xl text-white serif mb-6">Manifesting <span className="italic font-light">Grandeur.</span></h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-light">
            Experience the pinnacle of AI visualization. Describe your dream FVG landscape and generate high-fidelity 2K or 4K masterpieces.
          </p>
        </header>

        {/* Input Control Panel */}
        <section className="mb-24">
          <div className="glass p-10 rounded-[48px] border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            
            <div className="relative z-10 flex flex-col gap-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-4">
                  <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold ml-4">The Visionary Prompt</label>
                  <input 
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    placeholder="Describe an aristocratic FVG scene..."
                    className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 text-lg focus:outline-none focus:border-[#C5A059] transition-all text-white placeholder:text-white/20"
                  />
                </div>

                <div className="w-full md:w-48 space-y-4">
                  <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold ml-4">Format</label>
                  <div className="flex gap-2">
                    {(["1:1", "16:9", "4:3"] as const).map((ratio) => (
                      <button
                        key={ratio}
                        onClick={() => setAspectRatio(ratio)}
                        className={`flex-1 py-4 rounded-3xl border text-[10px] font-bold transition-all ${
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

                <div className="w-full md:w-64 space-y-4">
                  <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold ml-4">Resolution</label>
                  <div className="flex gap-2">
                    {(["1K", "2K", "4K"] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => setImageSize(size)}
                        className={`flex-1 py-4 rounded-3xl border text-[10px] font-bold transition-all ${
                          imageSize === size 
                            ? 'bg-[#C5A059] border-[#C5A059] text-[#002B2B]' 
                            : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-8 gap-6">
                <div className="flex flex-wrap gap-3">
                  <span className="text-white/20 text-[10px] uppercase font-bold self-center mr-2">Cues:</span>
                  {suggestions.map((s, i) => (
                    <button 
                      key={i}
                      onClick={() => setPrompt(s)}
                      className="px-4 py-2 bg-white/5 border border-white/5 rounded-full text-[10px] text-white/40 hover:text-[#C5A059] hover:border-[#C5A059]/30 transition-all"
                    >
                      {s.split(' ').slice(0, 3).join(' ')}...
                    </button>
                  ))}
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="w-full md:w-auto px-16 py-5 bg-[#C5A059] text-[#002B2B] rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#C5A059]/30 flex items-center justify-center gap-4 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#002B2B]/20 border-t-[#002B2B] rounded-full animate-spin"></div>
                      Rendering {imageSize}
                    </>
                  ) : 'Manifest Visualization'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Generated Works */}
        <section>
          <div className="columns-1 md:columns-2 gap-12 space-y-12">
            <AnimatePresence>
              {isLoading && (
                <MotionDiv 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`relative rounded-[48px] overflow-hidden glass border border-[#C5A059]/30 animate-pulse flex flex-col items-center justify-center min-h-[500px]`}
                >
                  <div className="w-16 h-16 border-b-2 border-[#C5A059] rounded-full animate-spin mb-8"></div>
                  <div className="text-[#C5A059] text-xs font-bold uppercase tracking-[0.4em] mb-4">Mastering the {imageSize} Canvas</div>
                  <div className="text-white/20 italic text-sm text-center px-12 leading-loose">
                    "Capturing the play of light on Venetian stone and Alpine fog..."
                  </div>
                </MotionDiv>
              )}
              {images.map((img) => (
                <MotionDiv
                  key={img.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="break-inside-avoid relative group rounded-[56px] overflow-hidden shadow-2xl border border-white/5 bg-[#001F1F]"
                >
                  <img src={img.url} className="w-full h-auto object-cover transition-transform duration-[3s] group-hover:scale-105" alt={img.prompt} />
                  <div className="absolute top-8 right-8">
                    <span className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-[10px] text-[#C5A059] font-bold border border-[#C5A059]/30">
                      {img.size} MASTERPIECE
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002B2B] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-12">
                    <p className="text-white text-lg serif leading-relaxed italic mb-8">"{img.prompt}"</p>
                    <div className="flex gap-6 border-t border-white/10 pt-8">
                      <button className="text-[#C5A059] text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-all">
                        Vault Asset <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                      </button>
                      <button className="text-white/40 text-xs uppercase tracking-widest hover:text-white transition-all">Export High-Res</button>
                    </div>
                  </div>
                </MotionDiv>
              ))}
            </AnimatePresence>
          </div>
          
          {images.length === 0 && !isLoading && (
            <div className="text-center py-48 opacity-10">
              <svg className="w-32 h-32 mx-auto mb-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <h2 className="text-4xl serif italic mb-4">The Atelier is Empty</h2>
              <p className="text-sm uppercase tracking-[0.5em] font-bold">Dream it. Manifest it.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Gallery;
