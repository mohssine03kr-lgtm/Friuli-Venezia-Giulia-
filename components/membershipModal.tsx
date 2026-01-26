
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Using local aliases with any type to bypass strict property check errors for framer-motion props
const MotionDiv = motion.div as any;

const MembershipModal: React.FC<MembershipModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <MotionDiv
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl glass rounded-[40px] border border-white/20 p-12 overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent"></div>
            
            <button onClick={onClose} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            <div className="text-center">
              <span className="text-[#C5A059] text-xs font-bold tracking-[0.4em] uppercase mb-6 block">The Inner Circle</span>
              <h2 className="text-4xl md:text-5xl text-white serif mb-8 italic font-light">Elegance is an <br/> <span className="font-bold not-italic">exclusive journey.</span></h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
                <div className="space-y-4">
                  <h4 className="text-[#C5A059] font-bold text-xs uppercase tracking-widest">Privileges</h4>
                  <ul className="text-white/60 text-sm space-y-3">
                    <li className="flex items-center gap-2"><span className="text-[#C5A059]">•</span> Priority Villa Bookings</li>
                    <li className="flex items-center gap-2"><span className="text-[#C5A059]">•</span> 24/7 Personal Concierge</li>
                    <li className="flex items-center gap-2"><span className="text-[#C5A059]">•</span> Private Vineyard Access</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[#C5A059] font-bold text-xs uppercase tracking-widest">Events</h4>
                  <ul className="text-white/60 text-sm space-y-3">
                    <li className="flex items-center gap-2"><span className="text-[#C5A059]">•</span> VIP Barcolana Hospitality</li>
                    <li className="flex items-center gap-2"><span className="text-[#C5A059]">•</span> Chef's Table Invitations</li>
                    <li className="flex items-center gap-2"><span className="text-[#C5A059]">•</span> Seasonal White Truffle Hunts</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col items-center gap-6">
                <button className="w-full py-4 bg-[#C5A059] text-[#002B2B] rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-[#C5A059]/20">
                  Request Invitation
                </button>
                <p className="text-white/30 text-[10px] uppercase tracking-tighter">Limited to 100 select members annually</p>
              </div>
            </div>
          </MotionDiv>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MembershipModal;
