import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/navbar';
import Footer from './components/footer';
import ConciergeOrb from './components/conciergeorb';
import EliteChatbot from './components/chatbot';
import Home from './pages/home';
import Discovery from './pages/discovery';
import Destinations from './pages/destinations';
import Gastronomy from './pages/gastronomy';
import Gallery from './pages/gallery';
import Events from './pages/events';

// Using local aliases with any type to bypass strict property check errors for framer-motion props
const MotionDiv = motion.div as any;

// Wrapper for page transitions
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <MotionDiv
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {children}
      </MotionDiv>
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
            <Route path="/discovery" element={<PageWrapper><Discovery /></PageWrapper>} />
            <Route path="/destinations" element={<PageWrapper><Destinations /></PageWrapper>} />
            <Route path="/gastronomy" element={<PageWrapper><Gastronomy /></PageWrapper>} />
            <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
            <Route path="/events" element={<PageWrapper><Events /></PageWrapper>} />
          </Routes>
        </main>

        <Footer />
        <ConciergeOrb />
        <EliteChatbot />
      </div>
    </Router>
  );
};

export default App;