
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import MembershipModal from './membershipModal';

// Using local aliases with any type to bypass strict property check errors for framer-motion props
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Gastronomy', path: '/gastronomy' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Events', path: '/events' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 glass backdrop-blur-lg border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-[#C5A059] serif">
            FVG <span className="text-white font-light text-lg tracking-widest uppercase ml-2">Luxury Portal</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative text-sm font-medium tracking-widest uppercase transition-colors hover:text-[#C5A059] ${
                location.pathname === link.path ? 'text-[#C5A059]' : 'text-white'
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <MotionDiv
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C5A059]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        <MotionButton 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 border border-[#C5A059] text-[#C5A059] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#002B2B] transition-all shadow-lg shadow-transparent hover:shadow-[#C5A059]/20"
        >
          Membership
        </MotionButton>
      </nav>
      <MembershipModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;
