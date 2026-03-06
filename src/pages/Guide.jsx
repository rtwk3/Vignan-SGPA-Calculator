import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { BookOpen, GraduationCap, Calculator } from "lucide-react";
import { motion } from "framer-motion";

export default function Guide() {
  const grades = [
    { range: "≥ 9.50", category: "Outstanding", grade: "O", points: 10 },
    { range: "≥ 8.50 to 9.49", category: "Excellent", grade: "S", points: 9 },
    { range: "≥ 7.00 to 8.49", category: "Very good", grade: "A", points: 8 },
    { range: "≥ 6.00 to 6.99", category: "Good", grade: "B", points: 7 },
    { range: "≥ 5.00 to 5.99", category: "Fair", grade: "C", points: 6 },
    { range: "≥ 4.00 to 4.99", category: "Marginal", grade: "M", points: 5 },
    { range: "Transitional Grade", category: "Repeat", grade: "R", points: 0 },
    { range: "Transitional Grade", category: "Incomplete", grade: "I", points: 0 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="max-w-4xl mx-auto space-y-12 pb-10"
    >
      <div className="text-center space-y-4 mb-8">
        <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-white/5 mb-2 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-xl">
          <BookOpen className="w-8 h-8 text-white/90" />
        </div>
        <h1 className="text-4xl sm:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 pb-2">
          Grading Information
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto font-medium">
          Official reference for relative grading range, categories, and grade formulas.
        </p>
      </div>

      <Card className="border-white/10 bg-black/60 shadow-2xl backdrop-blur-2xl rounded-[2rem] overflow-hidden ring-1 ring-white/10">
        <CardHeader className="border-b border-white/5 bg-white/5 px-6 py-5 sm:px-8 sm:py-6">
          <CardTitle className="text-2xl font-bold tracking-tight">Relative Grading Range</CardTitle>
          <CardDescription className="text-gray-400 mt-1">Standard mappings of percentages to letter grades and points.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-white/10">
                <TableHead className="w-[180px] sm:w-[250px] text-white font-bold px-6 h-14 uppercase tracking-widest text-xs">Relative Range (P)</TableHead>
                <TableHead className="text-white font-bold px-6 h-14 uppercase tracking-widest text-xs">Category</TableHead>
                <TableHead className="text-center text-white font-bold px-6 h-14 uppercase tracking-widest text-xs">Grade (G)</TableHead>
                <TableHead className="text-right text-emerald-400 font-bold px-6 h-14 uppercase tracking-widest text-xs">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grades.map((g, i) => (
                <TableRow key={g.grade + i} className="border-white/5 hover:bg-white/5 transition-colors group">
                  <TableCell className="font-semibold text-gray-300 px-6 py-4">{g.range}</TableCell>
                  <TableCell className="px-6 py-4 font-medium text-white/90">{g.category}</TableCell>
                  <TableCell className="text-center px-6 py-4">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 font-bold border border-white/10 text-lg shadow-inner group-hover:bg-white/20 transition-colors">
                      {g.grade}
                    </span>
                  </TableCell>
                  <TableCell className="text-right px-6 py-4 font-black text-xl text-emerald-400">
                    {g.points}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Mathematical Theory Section */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold tracking-tighter text-white/90 flex items-center gap-3">
          <Calculator className="w-8 h-8 text-gray-400" /> Grade Point Average
        </h2>
        <p className="text-gray-300 font-medium leading-relaxed text-lg">
          The Academic Performance of a student in every semester is indicated by the Semester
          Grade Point Average (SGPA) and finally by Cumulative Grade Point Average (CGPA).
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          <Card className="border-white/10 bg-white/5 backdrop-blur-xl rounded-[2rem]">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl"><GraduationCap className="text-emerald-400" /> 9.1 SGPA</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 font-medium mb-4">
                The Semester Grade Point Average (SGPA) shall be computed using the formula given below:
              </p>
              <div className="bg-black/40 p-5 rounded-2xl border border-white/5 shadow-[inset_0_2px_15px_rgba(0,0,0,0.5)] mb-4 overflow-x-auto flex justify-center py-8">
                <div className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-white tracking-widest whitespace-nowrap" style={{ fontFamily: "math, serif" }}>
                  <span>SGPA</span>
                  <span>=</span>
                  <div className="flex flex-col items-center justify-center">
                    <span className="border-b-2 border-white/50 pb-1 px-4">Σ ( C<sub className="text-sm">i</sub> × P<sub className="text-sm">i</sub> )</span>
                    <span className="pt-1 px-4">Σ C<sub className="text-sm">i</sub></span>
                  </div>
                </div>
              </div>
              <ul className="text-sm text-gray-400 space-y-3 font-medium">
                <li className="flex gap-3"><span className="text-white font-bold w-6">n</span> = number of courses successfully completed.</li>
                <li className="flex gap-3"><span className="text-white font-bold w-6">Pᵢ</span> = Grade points secured for the iᵗʰ course.</li>
                <li className="flex gap-3"><span className="text-white font-bold w-6">Cᵢ</span> = credits assigned to iᵗʰ course.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 backdrop-blur-xl rounded-[2rem]">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl"><GraduationCap className="text-cyan-400" /> 9.2 CGPA</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 font-medium mb-4">
                The Cumulative Grade Point Average (CGPA) shall be computed after successful completion of the programme:
              </p>
              <div className="bg-black/40 p-5 rounded-2xl border border-white/5 shadow-[inset_0_2px_15px_rgba(0,0,0,0.5)] mb-4 overflow-x-auto flex justify-center py-8">
                <div className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-white tracking-widest whitespace-nowrap" style={{ fontFamily: "math, serif" }}>
                  <span>CGPA</span>
                  <span>=</span>
                  <div className="flex flex-col items-center justify-center">
                    <span className="border-b-2 border-white/50 pb-1 px-4">Σ ( C<sub className="text-sm">j</sub> × P<sub className="text-sm">j</sub> )</span>
                    <span className="pt-1 px-4">Σ C<sub className="text-sm">j</sub></span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-400 font-medium leading-relaxed mb-4">
                The CGPA shall be expressed in different flavours to reflect B.Tech. of 160 credits, Honours of 180 credits, and Add-on provisions.
              </p>
              <ul className="text-sm text-gray-400 space-y-2 font-medium border-t border-white/10 pt-4">
                <li><span className="text-white font-bold mr-2">Σ Cⱼ = 160</span> for standard B.Tech.</li>
                <li><span className="text-white font-bold mr-2">Σ Cⱼ = 180</span> for B.Tech. with Honours/Minor.</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="mt-8 relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20 p-8 flex items-center gap-6"
        >
          <div className="w-3 h-full absolute left-0 top-0 bg-emerald-500"></div>
          <div>
            <h3 className="text-emerald-400 font-bold text-lg mb-2 tracking-widest uppercase">Percentage Conversion</h3>
            <p className="text-2xl font-black text-white tracking-tight">Percentage equivalence = (SGPA or CGPA) × 10</p>
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
}
