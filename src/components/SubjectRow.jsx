import React, { useState } from "react";
import { Trash, Tag } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function SubjectRow({ subject, updateSubject, removeSubject, index }) {
  const [showName, setShowName] = useState(subject.name?.length > 0);
  
  // Convert inputs to numbers for logic evaluation strictly if they aren't empty
  const creditsVal = subject.credits === "" ? "" : Number(subject.credits);
  const pointsVal = subject.gradePoints === "" ? "" : Number(subject.gradePoints);

  const isCreditsWarning = creditsVal !== "" && (creditsVal < 1 || creditsVal > 4 || !Number.isInteger(creditsVal));
  const isPointsWarning = pointsVal !== "" && (pointsVal < 0 || pointsVal > 10);

  // Determine Letter Grade dynamically based on points
  const getGradeInfo = (val) => {
    if (val === "" || isPointsWarning) return null;
    const p = Number(val);
    if (p >= 9.5) return { letter: "O", color: "bg-green-500/20 text-green-400 border-green-500/30" };
    if (p >= 8.5) return { letter: "S", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" };
    if (p >= 7.0) return { letter: "A", color: "bg-teal-500/20 text-teal-400 border-teal-500/30" };
    if (p >= 6.0) return { letter: "B", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" };
    if (p >= 5.0) return { letter: "C", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" };
    if (p >= 4.0) return { letter: "M", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" };
    return { letter: "R", color: "bg-red-500/20 text-red-400 border-red-500/30" };
  };

  const gradeInfo = getGradeInfo(pointsVal);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
      transition={{ duration: 0.25, type: "spring", stiffness: 350, damping: 25 }}
      className="p-3 sm:p-4 mb-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group shadow-sm drop-shadow-md"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full">
        {/* Course Label or Optional Name */}
        <div className="flex-1 min-w-[120px] flex items-center h-12 sm:h-[72px] sm:pt-[22px]">
          {showName ? (
            <div className="relative w-full">
               <Input
                 autoFocus
                 placeholder="Subject Name (e.g., Mathematics)"
                 value={subject.name || ""}
                 onChange={(e) => updateSubject(subject.id, "name", e.target.value)}
                 className="w-full text-sm font-medium bg-black/40 border-white/10 focus-visible:ring-white/30 pr-8 h-12 rounded-xl"
               />
               <button 
                 onClick={() => { setShowName(false); updateSubject(subject.id, "name", ""); }}
                 className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 p-1"
                 title="Hide name"
               >
                 <Trash className="w-3.5 h-3.5" />
               </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-white/80 font-bold text-sm tracking-wide shrink-0">Course {index + 1}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowName(true)}
                className="h-8 px-3 text-xs text-white/40 hover:text-white bg-white/5 hover:bg-white/10 ml-2 rounded-full border border-white/5"
                title="Add optional course name"
              >
                <Tag className="w-3.5 h-3.5 mr-1.5" /> Name 
              </Button>
            </div>
          )}
        </div>

        {/* Dynamic Letter Grade Badge */}
        <div className="hidden sm:flex flex-col items-center justify-end w-12 shrink-0 h-[72px] pb-[6px]">
           <AnimatePresence>
             {gradeInfo && (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.5 }} 
                 animate={{ opacity: 1, scale: 1 }} 
                 exit={{ opacity: 0, scale: 0.5 }}
                 className={`w-11 h-11 flex items-center justify-center rounded-xl border font-black text-lg shadow-inner ${gradeInfo.color}`}
               >
                 {gradeInfo.letter}
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        {/* Inputs Group */}
        <div className="flex gap-3 sm:gap-4 justify-between sm:justify-end flex-none w-full sm:w-auto mt-4 sm:mt-0 items-end">
          
          {/* Mobile Only: Letter Grade Badge (shows inline with inputs on tiny screens) */}
          <div className="flex sm:hidden flex-col items-center justify-end w-10 shrink-0 h-[72px] pb-1">
             <AnimatePresence>
               {gradeInfo && (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
                   className={`w-11 h-11 flex items-center justify-center rounded-xl border font-black text-lg ${gradeInfo.color}`}
                 >
                   {gradeInfo.letter}
                 </motion.div>
               )}
             </AnimatePresence>
          </div>

          {/* Credits Input */}
          <div className="flex-1 sm:flex-none shrink-0 flex flex-col gap-2 items-center">
            <label className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-widest leading-none">Credits</label>
            <Input
              type="number"
              min="1"
              max="4"
              step="1"
              placeholder=""
              value={subject.credits}
              onChange={(e) => updateSubject(subject.id, "credits", e.target.value)}
              className={`text-center bg-black/40 font-bold text-xl sm:text-2xl h-12 sm:h-14 rounded-xl border-white/10 placeholder-transparent w-full ${isCreditsWarning ? 'border-red-500/80 focus-visible:ring-red-500/50 text-red-400' : ''}`}
            />
          </div>

          {/* Grade Points Input */}
          <div className="flex-1 sm:flex-none shrink-0 flex flex-col gap-2 items-center">
            <label className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-widest leading-none">Points</label>
            <Input
              type="number"
              min="0"
              max="10"
              step="0.1"
              placeholder=""
              value={subject.gradePoints}
              onChange={(e) => updateSubject(subject.id, "gradePoints", e.target.value)}
              className={`text-center bg-black/40 font-bold text-xl sm:text-2xl h-12 sm:h-14 rounded-xl border-white/10 placeholder-transparent w-full ${isPointsWarning ? 'border-red-500/80 focus-visible:ring-red-500/50 text-red-400' : ''}`}
            />
          </div>
          
          {/* Remove Button */}
          <div className="flex-shrink-0 flex items-center justify-center align-middle h-12 sm:h-14 pb-1 sm:pb-0">
            <Button
              variant="outline"
              size="icon"
              onClick={() => removeSubject(subject.id)}
              className="text-white/40 border-white/5 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 h-10 w-10 sm:h-12 sm:w-12 transition-all rounded-full bg-black/20 group/trash shadow-inner"
              title="Remove Course"
            >
              <Trash className="h-4.5 w-4.5 sm:h-5 sm:w-5 group-hover/trash:scale-110 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Validation Warnings */}
      {(isCreditsWarning || isPointsWarning) && (
        <div className="mt-3 mb-1 px-2 text-[11px] text-red-400 flex flex-wrap gap-4 w-full font-bold">
          {isCreditsWarning && <span>• Credits must be a whole number (1-4)</span>}
          {isPointsWarning && <span>• Points must be between 0.0 and 10.0</span>}
        </div>
      )}
    </motion.div>
  );
}
