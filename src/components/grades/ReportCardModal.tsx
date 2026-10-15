import React from 'react';
import { Student, StudentGradeSheet } from '../../types.ts';
import { ASSETS } from '../../constants/assets.ts';
import { X, Printer, CheckCircle, Award } from 'lucide-react';

interface ReportCardModalProps {
  student: Student;
  gradeSheet: StudentGradeSheet;
  onClose: () => void;
}

export const ReportCardModal: React.FC<ReportCardModalProps> = ({
  student,
  gradeSheet,
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative border border-slate-200 my-8">
        {/* Top Modal Controls (No print) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 no-print">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Official Academic Transcript & Report Card
            </h3>
            <p className="text-xs text-slate-500">
              Certified Student Performance Evaluation Record
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
            >
              <Printer className="w-4 h-4" />
              Print Official Report
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Document */}
        <div className="p-8 my-4 bg-white border border-slate-200 rounded-xl printable-area">
          {/* Institution Header */}
          <div className="flex items-center justify-between pb-6 border-b-2 border-slate-900">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-300 bg-slate-900 shrink-0">
                <img
                  src={ASSETS.schoolCrest}
                  alt="School Crest"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 uppercase">
                  Horizon Academy of Excellence
                </h1>
                <p className="text-xs font-semibold text-slate-600">
                  Office of the Academic Dean & Registrar
                </p>
                <p className="text-[11px] text-slate-500">
                  Accredited by International Baccalaureate & National Secondary Collegiate Board
                </p>
              </div>
            </div>

            <div className="text-right text-xs">
              <div className="font-bold text-slate-900 uppercase">Official Transcript</div>
              <div className="text-slate-500 font-mono">Doc ID: REP-2026-{student.rollNumber}</div>
              <div className="text-slate-500">Issue Date: {gradeSheet.teacherSignatureDate}</div>
            </div>
          </div>

          {/* Student Dossier Matrix */}
          <div className="my-6 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-semibold">Student Name</span>
              <span className="font-bold text-slate-900 text-sm">
                {student.firstName} {student.lastName}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-semibold">Student Roll #</span>
              <span className="font-mono font-bold text-slate-900">#{student.rollNumber}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-semibold">Class / Section</span>
              <span className="font-semibold text-slate-800">{student.grade} - {student.section}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-semibold">Academic Session</span>
              <span className="font-medium text-slate-800">{gradeSheet.academicYear} · {gradeSheet.term}</span>
            </div>
          </div>

          {/* Course Grades Table */}
          <div className="overflow-hidden border border-slate-200 rounded-lg mb-6">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-2.5 px-3">Subject / Coursework</th>
                  <th className="py-2.5 px-3">Faculty Instructor</th>
                  <th className="py-2.5 px-3 text-center">Exam (100)</th>
                  <th className="py-2.5 px-3 text-center">Coursework (100)</th>
                  <th className="py-2.5 px-3 text-center">Total %</th>
                  <th className="py-2.5 px-3 text-center">Grade</th>
                  <th className="py-2.5 px-3 text-right">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {gradeSheet.subjects.map((sub, i) => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">
                      {sub.subject}
                      <span className="block text-[10px] font-normal text-slate-500">{sub.remarks}</span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">{sub.teacher}</td>
                    <td className="py-2.5 px-3 text-center font-mono tabular-nums">{sub.examScore}</td>
                    <td className="py-2.5 px-3 text-center font-mono tabular-nums">{sub.courseworkScore}</td>
                    <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-900 tabular-nums">
                      {sub.totalScore}%
                    </td>
                    <td className="py-2.5 px-3 text-center font-bold text-slate-900">
                      {sub.letterGrade}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-semibold tabular-nums text-slate-900">
                      {sub.gradePoint.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Metric Strip */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 text-center">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Cumulative GPA</span>
              <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                {gradeSheet.overallGpa.toFixed(2)}
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">Dean's Honor List</span>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 text-center">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Class Cohort Rank</span>
              <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                #{gradeSheet.classRank}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                of {gradeSheet.totalStudentsInClass} enrolled students
              </span>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 text-center">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Session Attendance</span>
              <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                {gradeSheet.attendancePercent}%
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">Satisfactory</span>
            </div>
          </div>

          {/* Qualitative Advisory Remarks */}
          <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 mb-8 text-xs leading-relaxed">
            <span className="font-bold text-slate-900 uppercase tracking-wide block mb-1">
              Faculty Advisory & Citizenship Assessment:
            </span>
            <p className="text-slate-700 italic">
              "{gradeSheet.conductRemarks}"
            </p>
          </div>

          {/* Signatures & Seal Certification */}
          <div className="grid grid-cols-3 gap-8 pt-6 border-t-2 border-slate-300 text-xs">
            <div className="text-center">
              <div className="h-10 border-b border-slate-400 mb-1 flex items-end justify-center font-serif italic text-slate-700 text-sm">
                Mrs. Rebecca Sterling
              </div>
              <span className="font-semibold text-slate-800">Class Faculty Advisor</span>
              <span className="block text-[10px] text-slate-500">Department of Mathematics</span>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-slate-400 flex items-center justify-center text-[9px] text-slate-400 uppercase font-semibold text-center leading-tight">
                Institutional Seal
              </div>
              <span className="text-[10px] text-slate-400 mt-1">Verified Credential</span>
            </div>

            <div className="text-center">
              <div className="h-10 border-b border-slate-400 mb-1 flex items-end justify-center font-serif italic text-slate-700 text-sm">
                Dr. Eleanor Vance-Ross
              </div>
              <span className="font-semibold text-slate-800">Dean of Academic Affairs</span>
              <span className="block text-[10px] text-slate-500">Horizon Academy</span>
            </div>
          </div>
        </div>

        {/* Footer controls (No print) */}
        <div className="flex justify-end pt-3 border-t border-slate-100 no-print">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};
