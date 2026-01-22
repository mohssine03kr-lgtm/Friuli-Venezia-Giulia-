
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/navbar';
import Footer from './components/footer';
import ConciergeOrb from './components/conciergeorb';
import Home from './pages/home';
import Destinations from './pages/destinations';
import Gastronomy from './pages/gastronomy';
import Events from './pages/events';

// Wrapper for page transitions
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="relative min-h-screen bg-[#002B2B]">
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/destinations" element={<PageWrapper><Destinations /></PageWrapper>} />
            <Route path="/gastronomy" element={<PageWrapper><Gastronomy /></PageWrapper>} />
            <Route path="/events" element={<PageWrapper><Events /></PageWrapper>} />
          </Routes>
        </main>

        <Footer />
        <ConciergeOrb />
      </div>
    </Router>
  );
};

export default App;
