import React, { useState } from 'react';
import { ASSETS } from '../../constants/assets.ts';
import { 
  Building, 
  Award, 
  Calendar, 
  CheckCircle2, 
  RefreshCw, 
  ShieldCheck, 
  Save 
} from 'lucide-react';

interface SchoolSettingsProps {
  onResetData: () => void;
}

export const SchoolSettings: React.FC<SchoolSettingsProps> = ({ onResetData }) => {
  const [schoolName, setSchoolName] = useState('Horizon Academy of Excellence');
  const [establishedYear, setEstablishedYear] = useState('1878');
  const [principalName, setPrincipalName] = useState('Dr. Eleanor Vance-Ross');
  const [academicYear, setAcademicYear] = useState('2026-2027');
  const [currentTerm, setCurrentTerm] = useState('Term 2 (Final)');
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Institution Configuration & Governance
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Academic calendar cycles, school identity parameters, and grading standards
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
        >
          <Save className="w-4 h-4" />
          Save Configurations
        </button>
      </div>

      {savedToast && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Institutional configurations updated successfully.</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* School Profile */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4 text-xs">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 bg-slate-900 shrink-0">
              <img
                src={ASSETS.schoolCrest}
                alt="Crest"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Institutional Identity</h3>
              <p className="text-slate-500 text-[11px]">Primary branding for transcripts and receipts</p>
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Official School Name</label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Year Founded</label>
              <input
                type="text"
                value={establishedYear}
                onChange={(e) => setEstablishedYear(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Tax / Registration ID</label>
              <input
                type="text"
                defaultValue="HA-991204-EDU"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Head of School / Dean</label>
            <input
              type="text"
              value={principalName}
              onChange={(e) => setPrincipalName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Campus Physical Address</label>
            <input
              type="text"
              defaultValue="742 University Avenue, Academic Quadrangle, Springfield"
              className="w-full px-3 py-2 rounded-lg border border-slate-200"
            />
          </div>
        </div>

        {/* Academic Calendar & Standards */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4 text-xs">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Academic Calendar & Session</h3>
              <p className="text-slate-500 text-[11px]">Active term and examination cycles</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Academic Year</label>
              <input
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Active Term</label>
              <select
                value={currentTerm}
                onChange={(e) => setCurrentTerm(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200"
              >
                <option value="Term 1 (Midterm)">Term 1 (Fall Midterm)</option>
                <option value="Term 2 (Final)">Term 2 (Spring Finals)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Grading Model</label>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <div className="flex justify-between font-mono text-[11px]">
                <span>A+ (Distinction):</span>
                <span>95% – 100% (4.0 GPA)</span>
              </div>
              <div className="flex justify-between font-mono text-[11px]">
                <span>A (Merit):</span>
                <span>90% – 94% (3.9 GPA)</span>
              </div>
              <div className="flex justify-between font-mono text-[11px]">
                <span>B+ (Commendable):</span>
                <span>85% – 89% (3.5 GPA)</span>
              </div>
              <div className="flex justify-between font-mono text-[11px]">
                <span>B (Satisfactory):</span>
                <span>80% – 84% (3.0 GPA)</span>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Factory Reset Section */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900">Reset Local Demonstration Data</h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Restore original student rosters, attendance roll, timetable, and billing ledger to factory state.
          </p>
        </div>

        <button
          onClick={() => {
            if (confirm('Reset all demo student records, attendance, and grades to initial values?')) {
              onResetData();
            }
          }}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset Demo Data
        </button>
      </div>
    </div>
  );
};
