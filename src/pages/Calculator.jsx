import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Plus, Calculator as CalculatorIcon, History, Clock, Trash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SubjectRow from "../components/SubjectRow";
import ResultCard from "../components/ResultCard";

export default function Calculator() {
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem("vsgpa_current_subjects");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return [
      { id: 1, name: "", credits: "", gradePoints: "" },
      { id: 2, name: "", credits: "", gradePoints: "" },
    ];
  });
  const [sgpa, setSgpa] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("vsgpa_history");
    if (saved) {
      try { setHistory(JSON.parse(saved)); } catch (e) { }
    }
  }, []);

  const addSubject = () => {
    setSubjects([
      ...subjects,
      { id: Date.now(), name: "", credits: "", gradePoints: "" },
    ]);
  };

  const removeSubject = (id) => {
    setSubjects(subjects.filter((sub) => sub.id !== id));
  };

  const updateSubject = (id, field, value) => {
    setSubjects(
      subjects.map((sub) => (sub.id === id ? { ...sub, [field]: value } : sub))
    );
  };

  useEffect(() => {
    let totalCredits = 0;
    let totalGradePoints = 0;

    subjects.forEach((sub) => {
      const credits = Number(sub.credits);
      const gp = Number(sub.gradePoints);

      // Require valid numbers and range bounds
      const isValidCredit = sub.credits !== "" && Number.isInteger(credits) && credits >= 1 && credits <= 4;
      const isValidPoints = sub.gradePoints !== "" && gp >= 0 && gp <= 10;

      if (isValidCredit && isValidPoints) {
        totalCredits += credits;
        totalGradePoints += credits * gp;
      }
    });

    if (totalCredits > 0) {
      setSgpa(totalGradePoints / totalCredits);
    } else {
      setSgpa(0);
    }
    
    // Auto-save current subjects input to local storage
    localStorage.setItem("vsgpa_current_subjects", JSON.stringify(subjects));
  }, [subjects]);

  const hasInvalidInput = subjects.some((sub) => {
    const cred = Number(sub.credits);
    const pts = Number(sub.gradePoints);
    const badCredit = sub.credits !== "" && (!Number.isInteger(cred) || cred < 1 || cred > 4);
    const badPoints = sub.gradePoints !== "" && (pts < 0 || pts > 10);
    return badCredit || badPoints;
  });

  const isMissingData = subjects.some((sub) => sub.credits === "" || sub.gradePoints === "");

  const handleSaveHistory = (calculatedSgpa, percentage) => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      sgpa: calculatedSgpa.toFixed(2),
      percentage: percentage,
      courses: subjects.filter(s => s.credits !== "" && s.gradePoints !== "").length
    };
    
    // Keep max 10 entries
    const updated = [newEntry, ...history].slice(0, 10);
    setHistory(updated);
    localStorage.setItem("vsgpa_history", JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("vsgpa_history");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="max-w-4xl mx-auto space-y-6 sm:space-y-10"
    >
      <div className="text-center space-y-4 mb-4 sm:mb-8">
        <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-white/5 mb-2 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-xl group hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all">
          <CalculatorIcon className="w-8 h-8 text-white/90 group-hover:scale-110 transition-transform" />
        </div>
        <h1 className="text-4xl sm:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 pb-2 px-2">
          Calculate Your SGPA
        </h1>
        <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto font-medium">
          Add your courses to instantly calculate your Semester Grade Point Average.
        </p>
      </div>

      <Card className="border-white/10 bg-black/60 shadow-2xl shadow-black/50 backdrop-blur-2xl rounded-[2rem] overflow-hidden ring-1 ring-white/10">
        <CardHeader className="border-b border-white/5 bg-white/5 px-6 py-5 sm:px-8 sm:py-6 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight">Courses</CardTitle>
              <CardDescription className="text-gray-400 mt-1">Enter whole credits (1-4) and decimal points (0-10).</CardDescription>
            </div>
            {/* Desktop Only Add Button */}
            <Button variant="glass" onClick={addSubject} className="hidden sm:flex gap-2 shrink-0 rounded-full h-12 px-6 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-white/15 border-white/20 transition-all">
              <Plus className="w-5 h-5" />
              <span className="font-semibold text-sm">Add Course</span>
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 sm:p-8 relative z-10">
          <div className="space-y-1">
            <AnimatePresence mode="popLayout">
              {subjects.map((subject, index) => (
                <SubjectRow
                  key={subject.id}
                  index={index}
                  subject={subject}
                  updateSubject={updateSubject}
                  removeSubject={removeSubject}
                />
              ))}
            </AnimatePresence>
          </div>

          {subjects.length > 0 && (
            <div className="flex sm:hidden justify-center mt-6">
              <Button variant="glass" onClick={addSubject} className="gap-2 rounded-full h-14 px-8 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:bg-white/15 border-white/20 w-full transition-all">
                <Plus className="w-5 h-5" />
                <span className="font-bold text-base tracking-wide">Add Course</span>
              </Button>
            </div>
          )}

          {subjects.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-16 px-4 bg-white/5 rounded-3xl border border-dashed border-white/20 mt-4 mx-2"
            >
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                <CalculatorIcon className="w-8 h-8 text-white/40" />
              </div>
              <p className="text-gray-300 font-medium text-lg mb-6">No courses added yet.</p>
              <Button variant="glass" onClick={addSubject} className="gap-2 rounded-full h-12 px-8">
                <Plus className="w-5 h-5" /> <span className="font-semibold">Add your first course</span>
              </Button>
            </motion.div>
          )}

          <AnimatePresence>
            {(hasInvalidInput || isMissingData) && subjects.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-bold text-center shadow-inner overflow-hidden flex items-center justify-center"
              >
                ⚠️ Please fill all credits and points accurately to calculate SGPA.
              </motion.div>
            )}
          </AnimatePresence>

        </CardContent>
      </Card>

      {sgpa > 0 && !hasInvalidInput && !isMissingData && (
         <div className="pb-4">
           <ResultCard sgpa={sgpa} onSaveHistory={handleSaveHistory} />
         </div>
      )}

      {/* History Section */}
      <AnimatePresence>
        {history.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="pb-12 pt-8"
          >
            <div className="flex items-center justify-between mb-6 px-2">
              <h3 className="text-2xl font-bold flex items-center gap-3 text-white/90">
                <History className="w-6 h-6 text-emerald-400" /> Past Calculations
              </h3>
              <Button variant="ghost" size="sm" onClick={clearHistory} className="text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-full px-4 text-xs font-bold tracking-widest uppercase">
                <Trash className="w-3.5 h-3.5 mr-2" /> Clear All
              </Button>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {history.map(item => (
                  <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}>
                    <Card className="bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all rounded-2xl overflow-hidden hover:border-white/20 group">
                      <CardContent className="p-5 flex items-center justify-between relative">
                         {item.sgpa >= 8.5 && (
                           <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-green-500/20 to-transparent pointer-events-none rounded-bl-3xl"></div>
                         )}
                         <div className="flex flex-col gap-1">
                           <p className="text-3xl font-black text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] transition-all tracking-tighter">
                             {item.sgpa}
                           </p>
                           <p className="text-emerald-400 font-bold text-sm tracking-wide">{item.percentage}%</p>
                         </div>
                         <div className="text-right flex flex-col items-end gap-1.5 mt-1">
                           <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-gray-300 border border-white/5 tracking-wider">
                             {item.courses} COURSES
                           </div>
                           <p className="text-xs font-medium text-gray-500 flex items-center gap-1.5 mt-1">
                             <Clock className="w-3.5 h-3.5"/> {item.date}
                           </p>
                         </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </motion.div>
  );
}
