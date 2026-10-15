import React from 'react';
import { Student } from '../../types.ts';
import { ASSETS } from '../../constants/assets.ts';
import { X, Printer, CheckCircle } from 'lucide-react';

interface StudentIDCardModalProps {
  student: Student;
  onClose: () => void;
}

export const StudentIDCardModal: React.FC<StudentIDCardModalProps> = ({ student, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-slate-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 no-print">
          <div>
            <h3 className="text-base font-bold text-slate-900">Student Identity Card</h3>
            <p className="text-xs text-slate-500">Official Institutional Credential</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Card Area */}
        <div className="my-6 flex justify-center printable-area">
          <div className="w-[340px] rounded-xl overflow-hidden border border-slate-300 shadow-md bg-white">
            {/* Header bar */}
            <div className="bg-slate-900 text-white p-3.5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white p-0.5 border border-amber-400 shrink-0">
                <img 
                  src={ASSETS.schoolCrest} 
                  alt="Crest" 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="leading-tight">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Horizon Academy
                </h4>
                <p className="text-[10px] text-slate-300">Office of Registrar & Student Affairs</p>
                <p className="text-[9px] text-slate-400">Valid: 2026–2027 Academic Year</p>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4 bg-gradient-to-b from-white to-slate-50">
              <div className="flex gap-3.5 items-start">
                <div className="w-24 h-28 rounded-lg bg-slate-200 border border-slate-300 flex flex-col items-center justify-center text-center p-2 shrink-0">
                  <div className="w-12 h-12 rounded-full bg-slate-300 flex items-center justify-center font-bold text-slate-600 text-sm mb-1">
                    {student.firstName[0]}{student.lastName[0]}
                  </div>
                  <span className="text-[9px] text-slate-500 font-medium">STUDENT PHOTO</span>
                </div>

                <div className="flex-1 space-y-1">
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    {student.firstName} {student.lastName}
                  </h3>
                  <div className="text-[11px] font-semibold text-blue-700">
                    {student.grade} - {student.section}
                  </div>

                  <div className="pt-1.5 space-y-0.5 text-[10px] text-slate-600">
                    <div>
                      <span className="text-slate-400">Roll No:</span>{' '}
                      <span className="font-mono font-semibold text-slate-800">#{student.rollNumber}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Admission:</span>{' '}
                      <span className="font-mono font-medium text-slate-800">{student.admissionNo}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Blood Group:</span>{' '}
                      <span className="font-medium text-slate-800">{student.bloodGroup}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">DOB:</span>{' '}
                      <span className="font-mono text-slate-800">{student.dob}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Barcode representation */}
              <div className="mt-4 pt-3 border-t border-slate-200 text-center">
                <div className="font-mono text-lg tracking-[0.25em] text-slate-800 font-bold select-none">
                  ||||| | ||| |||| | |||||| |||
                </div>
                <div className="text-[9px] font-mono text-slate-400 tracking-wider">
                  *{student.admissionNo}*
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-100 px-3 py-1.5 border-t border-slate-200 flex justify-between items-center text-[9px] text-slate-500">
              <span>Emergency: {student.emergencyContact}</span>
              <span className="font-semibold text-emerald-700">VERIFIED STATUS</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 no-print">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            Print ID Card
          </button>
        </div>
      </div>
    </div>
  );
};
