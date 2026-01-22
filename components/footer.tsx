
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#001F1F] text-white py-16 px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold text-[#C5A059] serif mb-4">FVG Luxury Portal</h2>
          <p className="text-white/60 max-w-sm leading-relaxed">
            Curating the finest experiences in the Northeast of Italy. From the Dolomites to the Adriatic, discover a land of hidden treasures.
          </p>
        </div>
        <div>
          <h3 className="text-[#C5A059] uppercase tracking-widest text-sm font-bold mb-6">Explore</h3>
          <ul className="space-y-4 text-white/70">
            <li><a href="#" className="hover:text-white transition-colors">Villas</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Vineyards</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Experiences</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Yachting</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-[#C5A059] uppercase tracking-widest text-sm font-bold mb-6">Connect</h3>
          <ul className="space-y-4 text-white/70">
            <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/40 uppercase tracking-widest">
        <p>&copy; 2025 FVG Luxury Portal. All rights reserved.</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
