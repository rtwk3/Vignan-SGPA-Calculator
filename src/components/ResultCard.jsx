import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Save, Check } from "lucide-react";

export default function ResultCard({ sgpa, onSaveHistory }) {
  const [saved, setSaved] = useState(false);
  let feedback = "";
  let feedbackColor = "text-white";

  if (sgpa >= 9.5) {
    feedback = "Outstanding! (O)";
    feedbackColor = "text-green-400";
  } else if (sgpa >= 8.5) {
    feedback = "Excellent! (S)";
    feedbackColor = "text-emerald-400";
  } else if (sgpa >= 7.0) {
    feedback = "Very Good (A)";
    feedbackColor = "text-teal-400";
  } else if (sgpa >= 6.0) {
    feedback = "Good (B)";
    feedbackColor = "text-cyan-400";
  } else if (sgpa >= 5.0) {
    feedback = "Fair (C)";
    feedbackColor = "text-blue-400";
  } else if (sgpa >= 4.0) {
    feedback = "Marginal (M)";
    feedbackColor = "text-yellow-400";
  } else if (sgpa > 0) {
    feedback = "Keep pushing, needs improvement.";
    feedbackColor = "text-orange-400";
  }

  const percentage = (sgpa * 10).toFixed(2);

  useEffect(() => {
    // Reset saved state if SGPA changes
    setSaved(false);
    
    // Fire confetti for S and O grades
    if (sgpa >= 8.5) {
      const duration = 800; // Snappier, shorter burst
      const end = Date.now() + duration;

      const frame = () => {
        confetti({ 
          particleCount: 4, 
          angle: 60, 
          spread: 55, 
          origin: { x: 0 }, 
          colors: ['#ffffff', '#a8a8a8', '#4b4b4b'] 
        });
        confetti({ 
          particleCount: 4, 
          angle: 120, 
          spread: 55, 
          origin: { x: 1 }, 
          colors: ['#ffffff', '#a8a8a8', '#4b4b4b'] 
        });

        if (Date.now() < end) requestAnimationFrame(frame);
      };
      
      frame();
    }
  }, [sgpa]);

  const handleSaveClick = () => {
    setSaved(true);
    onSaveHistory(sgpa, percentage);
  };

  return (
    <motion.div
      layout
      initial={{ scale: 0.9, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="relative mt-8"
    >
      <div className={`absolute inset-0 blur-2xl rounded-3xl opacity-50 ${sgpa >= 8.5 ? 'bg-green-500/20' : 'bg-white/5'}`}></div>
      <Card className="relative border-white/20 bg-black/60 shadow-2xl backdrop-blur-2xl text-center pt-10 pb-8 rounded-3xl overflow-hidden ring-1 ring-white/10">
        
        {/* Subtle glowing sparks background effect */}
        {sgpa >= 8.5 && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.1)_0,transparent_70%)] pointer-events-none"></div>
        )}

        <CardContent className="relative z-10 flex flex-col items-center">
          <p className="text-gray-400 text-sm mb-3 uppercase tracking-[0.2em] font-bold">Your SGPA</p>
          <motion.h2 
            className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-2 drop-shadow-sm tracking-tighter"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {sgpa > 0 ? sgpa.toFixed(2) : "0.00"}
          </motion.h2>
          
          {sgpa > 0 && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 font-semibold mb-5 group hover:bg-white/10 transition-colors"
            >
              Percentage Equivalence: <span className="text-white ml-2 text-lg group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">{percentage}%</span>
            </motion.div>
          )}

          {feedback && (
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`font-bold text-xl tracking-wide ${feedbackColor} drop-shadow-md mb-8`}
            >
              {sgpa >= 8.5 ? "🎉" : ""} {feedback}
            </motion.p>
          )}

          <AnimatePresence mode="wait">
            {!saved ? (
              <motion.div key="saveBtn" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}>
                <Button variant="glass" onClick={handleSaveClick} className="gap-2 rounded-full px-6 h-12 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] border-white/20">
                  <Save className="w-4 h-4" /> <span className="font-semibold">Save to History</span>
                </Button>
              </motion.div>
            ) : (
              <motion.div key="savedBtn" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2 px-6 h-12 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 font-bold backdrop-blur-md">
                <Check className="w-5 h-5" /> Saved
              </motion.div>
            )}
          </AnimatePresence>

        </CardContent>
      </Card>
    </motion.div>
  );
}
