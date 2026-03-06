import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Calculator from "./pages/Calculator";
import Guide from "./pages/Guide";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
        {/* Background ambient lighting */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8 sm:py-12 relative z-10">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Calculator />} />
              <Route path="/guide" element={<Guide />} />
            </Routes>
          </AnimatePresence>
        </main>
        
        <footer className="py-6 text-center text-sm text-gray-500 border-t border-white/5 relative z-10 bg-black/20 backdrop-blur-md">
          <p>Built for Vignan students. Calculates SGPA based on standard 10-point scale.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
