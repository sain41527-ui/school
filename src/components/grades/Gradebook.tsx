import React, { useState } from 'react';
import { Student, StudentGradeSheet, UserRole } from '../../types.ts';
import { 
  Award, 
  Search, 
  Plus, 
  Save, 
  FileText, 
  CheckCircle2,
  TrendingUp,
  Percent
} from 'lucide-react';

interface GradebookProps {
  students: Student[];
  gradeSheets: Record<string, StudentGradeSheet>;
  onOpenReportCard: (student: Student) => void;
  onUpdateGrade: (studentId: string, subject: string, examScore: number, courseworkScore: number) => void;
  currentRole: UserRole;
}

export const Gradebook: React.FC<GradebookProps> = ({
  students,
  gradeSheets,
  onOpenReportCard,
  onUpdateGrade,
  currentRole
}) => {
  const [selectedGrade, setSelectedGrade] = useState('Grade 10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [selectedSubject, setSelectedSubject] = useState('Advanced Mathematics');
  const [selectedTerm, setSelectedTerm] = useState('Term 2 (Final)');
  const [editingScores, setEditingScores] = useState<Record<string, { exam: number; coursework: number }>>({});
  const [saveToast, setSaveToast] = useState(false);

  const cohort = students.filter(
    s => s.grade === selectedGrade && (selectedSection === 'all' || s.section === selectedSection)
  );

  const getScoreData = (studentId: string) => {
    if (editingScores[studentId]) {
      return editingScores[studentId];
    }
    const sheet = gradeSheets[studentId];
    const sub = sheet?.subjects.find(s => s.subject === selectedSubject);
    return {
      exam: sub ? sub.examScore : 85,
      coursework: sub ? sub.courseworkScore : 90
    };
  };

  const calculateGrade = (total: number) => {
    if (total >= 95) return { letter: 'A+', gpa: 4.0 };
    if (total >= 90) return { letter: 'A', gpa: 3.9 };
    if (total >= 85) return { letter: 'B+', gpa: 3.5 };
    if (total >= 80) return { letter: 'B', gpa: 3.0 };
    if (total >= 70) return { letter: 'C', gpa: 2.0 };
    return { letter: 'F', gpa: 0.0 };
  };

  const handleScoreChange = (studentId: string, field: 'exam' | 'coursework', value: number) => {
    const clamped = Math.max(0, Math.min(100, isNaN(value) ? 0 : value));
    const current = getScoreData(studentId);
    setEditingScores(prev => ({
      ...prev,
      [studentId]: {
        ...current,
        [field]: clamped
      }
    }));
  };

  const handleSaveGrades = () => {
    Object.entries(editingScores).forEach(([studentId, scores]) => {
      onUpdateGrade(studentId, selectedSubject, scores.exam, scores.coursework);
    });
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Faculty Gradebook & Assessment Ledger
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Institutional score entries, GPA calculations, and transcript generation
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveGrades}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
          >
            <Save className="w-4 h-4" />
            Save Grade Entries
          </button>
        </div>
      </div>

      {saveToast && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Grades for {selectedSubject} have been updated across official transcripts.</span>
        </div>
      )}

      {/* Selectors */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 font-medium focus:bg-white focus:outline-none"
            >
              <option value="Advanced Mathematics">Advanced Mathematics (Sterling)</option>
              <option value="Physics & Thermodynamics">Physics & Thermodynamics (Vance)</option>
              <option value="English Literature">English Literature (Morales)</option>
              <option value="Cellular Biology Lab">Cellular Biology Lab (Al-Mansoor)</option>
              <option value="Computer Science & Logic">Computer Science & Logic (Vance)</option>
              <option value="World History & Civilizations">World History & Civilizations (Chen)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">Grade</label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-none"
            >
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 11">Grade 11</option>
              <option value="Grade 12">Grade 12</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">Section</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-none"
            >
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="Science">Science Focus</option>
              <option value="AP">Advanced Placement</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">Evaluation Term</label>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-none"
            >
              <option value="Term 1">Term 1 (Midterm)</option>
              <option value="Term 2 (Final)">Term 2 (Final Examinations)</option>
            </select>
          </div>
        </div>

        <div className="text-xs text-slate-500">
          Grading Scale: <span className="font-semibold text-slate-800">4.0 Scale</span> (A+: 95+, A: 90+, B: 80+)
        </div>
      </div>

      {/* Grade Matrix Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Roll #</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4 text-center">Exam Mark (100)</th>
                <th className="py-3 px-4 text-center">Coursework (100)</th>
                <th className="py-3 px-4 text-center">Total Score</th>
                <th className="py-3 px-4 text-center">Letter Grade</th>
                <th className="py-3 px-4 text-center">Grade Point</th>
                <th className="py-3 px-4 text-right">Official Document</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cohort.length > 0 ? (
                cohort.map((student) => {
                  const scores = getScoreData(student.id);
                  const total = Math.round((scores.exam * 0.6) + (scores.coursework * 0.4));
                  const gradeInfo = calculateGrade(total);

                  return (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-mono font-medium text-slate-700 tabular-nums">
                        #{student.rollNumber}
                      </td>

                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {student.firstName} {student.lastName}
                        <div className="text-[10px] text-slate-400 font-mono font-normal">
                          {student.admissionNo}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-center">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={scores.exam}
                          onChange={(e) => handleScoreChange(student.id, 'exam', parseInt(e.target.value))}
                          className="w-16 px-2 py-1 text-center font-mono rounded border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 tabular-nums"
                        />
                      </td>

                      <td className="py-3 px-4 text-center">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={scores.coursework}
                          onChange={(e) => handleScoreChange(student.id, 'coursework', parseInt(e.target.value))}
                          className="w-16 px-2 py-1 text-center font-mono rounded border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 tabular-nums"
                        />
                      </td>

                      <td className="py-3 px-4 text-center font-mono font-bold text-slate-900 tabular-nums">
                        {total}%
                      </td>

                      <td className="py-3 px-4 text-center font-bold text-blue-700">
                        {gradeInfo.letter}
                      </td>

                      <td className="py-3 px-4 text-center font-mono font-medium text-slate-800 tabular-nums">
                        {gradeInfo.gpa.toFixed(1)}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => onOpenReportCard(student)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-slate-100 hover:bg-slate-900 hover:text-white transition-colors"
                        >
                          <Award className="w-3.5 h-3.5" />
                          Generate Report Card
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No students currently enrolled in this grade section.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
