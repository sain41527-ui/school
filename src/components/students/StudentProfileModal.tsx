import React, { useState } from 'react';
import { Student, StudentGradeSheet, FeeInvoice } from '../../types.ts';
import { 
  X, 
  Award, 
  Calendar, 
  CreditCard, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Printer, 
  ShieldCheck,
  FileText
} from 'lucide-react';

interface StudentProfileModalProps {
  student: Student;
  gradeSheet?: StudentGradeSheet;
  invoices: FeeInvoice[];
  onClose: () => void;
  onOpenReportCard: (student: Student) => void;
  onOpenIDCard: (student: Student) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  student,
  gradeSheet,
  invoices,
  onClose,
  onOpenReportCard,
  onOpenIDCard
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'academics' | 'fees'>('overview');

  const studentInvoices = invoices.filter(i => i.studentId === student.id);
  const totalDue = studentInvoices.reduce((acc, curr) => acc + (curr.amount - curr.paidAmount), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative border border-slate-200 my-8">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-slate-900 text-white flex items-center justify-center text-lg font-bold">
              {student.firstName[0]}{student.lastName[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">
                  {student.firstName} {student.lastName}
                </h2>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {student.status.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Roll #{student.rollNumber} · Admission: {student.admissionNo} · {student.grade} ({student.section})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action toolbar */}
        <div className="py-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100">
          {/* Segmented Tab buttons */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'overview' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Overview & Bio
            </button>
            <button
              onClick={() => setActiveTab('academics')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'academics' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Academic Record
            </button>
            <button
              onClick={() => setActiveTab('fees')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'fees' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Billing & Dues ({studentInvoices.length})
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenIDCard(student)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              ID Badge
            </button>
            <button
              onClick={() => onOpenReportCard(student)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
            >
              <Award className="w-3.5 h-3.5" />
              Official Report Card
            </button>
          </div>
        </div>

        {/* Tab 1: Overview & Bio */}
        {activeTab === 'overview' && (
          <div className="py-4 space-y-5">
            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Cumulative GPA</span>
                <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                  {student.gpa.toFixed(2)}
                </span>
                <span className="text-[10px] text-emerald-700 font-medium block mt-0.5">Scale 4.0</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Attendance Rate</span>
                <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                  {student.attendanceRate}%
                </span>
                <span className="text-[10px] text-emerald-700 font-medium block mt-0.5">Good Standing</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Outstanding Fee</span>
                <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                  ${totalDue.toLocaleString()}
                </span>
                <span className={`text-[10px] font-medium block mt-0.5 ${totalDue === 0 ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {totalDue === 0 ? 'Fully Paid' : 'Payment Due'}
                </span>
              </div>
            </div>

            {/* Demographics & Enrollment */}
            <div className="border border-slate-200 rounded-xl p-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Student Demographics & Registry
              </h4>
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs">
                <div>
                  <span className="text-slate-500">Date of Birth:</span>{' '}
                  <span className="font-medium text-slate-800 tabular-nums">{student.dob}</span>
                </div>
                <div>
                  <span className="text-slate-500">Gender:</span>{' '}
                  <span className="font-medium text-slate-800">{student.gender}</span>
                </div>
                <div>
                  <span className="text-slate-500">Blood Group:</span>{' '}
                  <span className="font-medium text-slate-800">{student.bloodGroup}</span>
                </div>
                <div>
                  <span className="text-slate-500">Enrollment Date:</span>{' '}
                  <span className="font-medium text-slate-800 tabular-nums">{student.enrollmentDate}</span>
                </div>
                <div>
                  <span className="text-slate-500">Institutional Email:</span>{' '}
                  <span className="font-medium text-slate-800">{student.email}</span>
                </div>
                <div>
                  <span className="text-slate-500">Student Phone:</span>{' '}
                  <span className="font-medium text-slate-800">{student.phone}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500">Home Address:</span>{' '}
                  <span className="font-medium text-slate-800">{student.address}</span>
                </div>
              </div>
            </div>

            {/* Guardian & Emergency Information */}
            <div className="border border-slate-200 rounded-xl p-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Primary Guardian & Emergency Contacts
              </h4>
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs">
                <div>
                  <span className="text-slate-500">Guardian Name:</span>{' '}
                  <span className="font-medium text-slate-800">{student.guardianName}</span>
                </div>
                <div>
                  <span className="text-slate-500">Relationship:</span>{' '}
                  <span className="font-medium text-slate-800">{student.guardianRelation}</span>
                </div>
                <div>
                  <span className="text-slate-500">Guardian Phone:</span>{' '}
                  <span className="font-medium text-slate-800">{student.guardianPhone}</span>
                </div>
                <div>
                  <span className="text-slate-500">Guardian Email:</span>{' '}
                  <span className="font-medium text-slate-800">{student.guardianEmail}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500">Designated Emergency Dispatch:</span>{' '}
                  <span className="font-medium text-red-700">{student.emergencyContact}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Academics */}
        {activeTab === 'academics' && (
          <div className="py-4 space-y-4">
            {gradeSheet ? (
              <div>
                <div className="flex items-center justify-between mb-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-900">Term 2 Examination Results</span>
                    <span className="text-slate-500 ml-2">Class Rank: #{gradeSheet.classRank} of {gradeSheet.totalStudentsInClass}</span>
                  </div>
                  <span className="font-bold font-mono text-slate-900">GPA: {gradeSheet.overallGpa.toFixed(2)}</span>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                        <th className="py-2.5 px-3">Subject</th>
                        <th className="py-2.5 px-3">Instructor</th>
                        <th className="py-2.5 px-3 text-center">Exam</th>
                        <th className="py-2.5 px-3 text-center">Coursework</th>
                        <th className="py-2.5 px-3 text-center">Total</th>
                        <th className="py-2.5 px-3 text-right">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {gradeSheet.subjects.map((sub, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-semibold text-slate-900">{sub.subject}</td>
                          <td className="py-2.5 px-3 text-slate-500">{sub.teacher}</td>
                          <td className="py-2.5 px-3 text-center font-mono tabular-nums">{sub.examScore}</td>
                          <td className="py-2.5 px-3 text-center font-mono tabular-nums">{sub.courseworkScore}</td>
                          <td className="py-2.5 px-3 text-center font-mono font-bold tabular-nums">{sub.totalScore}%</td>
                          <td className="py-2.5 px-3 text-right font-bold text-blue-700">{sub.letterGrade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-3 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                  <span className="font-semibold text-slate-800">Faculty Remarks:</span>{' '}
                  <span className="text-slate-600">{gradeSheet.conductRemarks}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-slate-500">
                No formal term examination recorded yet for this student.
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Fees */}
        {activeTab === 'fees' && (
          <div className="py-4 space-y-4">
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                    <th className="py-2.5 px-3">Invoice #</th>
                    <th className="py-2.5 px-3">Fee Description</th>
                    <th className="py-2.5 px-3">Due Date</th>
                    <th className="py-2.5 px-3 text-right">Total</th>
                    <th className="py-2.5 px-3 text-right">Paid</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {studentInvoices.length > 0 ? (
                    studentInvoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-mono text-slate-700">{inv.invoiceNo}</td>
                        <td className="py-2.5 px-3 font-medium text-slate-900">{inv.feeType}</td>
                        <td className="py-2.5 px-3 text-slate-500 font-mono tabular-nums">{inv.dueDate}</td>
                        <td className="py-2.5 px-3 text-right font-mono tabular-nums">${inv.amount}</td>
                        <td className="py-2.5 px-3 text-right font-mono tabular-nums">${inv.paidAmount}</td>
                        <td className="py-2.5 px-3 text-center">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                            inv.status === 'paid' ? 'bg-emerald-50 text-emerald-700' :
                            inv.status === 'partial' ? 'bg-amber-50 text-amber-700' :
                            inv.status === 'overdue' ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {inv.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-slate-400">
                        No outstanding or historical invoices found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
