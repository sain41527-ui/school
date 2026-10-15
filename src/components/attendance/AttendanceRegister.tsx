import React, { useState } from 'react';
import { Student, AttendanceRecord, AttendanceStatus, UserRole } from '../../types.ts';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  HelpCircle, 
  Save, 
  Calendar, 
  Download,
  AlertCircle
} from 'lucide-react';

interface AttendanceRegisterProps {
  students: Student[];
  attendance: AttendanceRecord;
  onSaveAttendance: (record: AttendanceRecord) => void;
  currentRole: UserRole;
}

export const AttendanceRegister: React.FC<AttendanceRegisterProps> = ({
  students,
  attendance,
  onSaveAttendance,
  currentRole
}) => {
  const [selectedDate, setSelectedDate] = useState(attendance.date || '2026-10-15');
  const [selectedGrade, setSelectedGrade] = useState('Grade 10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [currentRecords, setCurrentRecords] = useState<Record<string, AttendanceStatus>>({ ...attendance.records });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const classStudents = students.filter(
    s => s.grade === selectedGrade && (selectedSection === 'all' || s.section === selectedSection)
  );

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setCurrentRecords(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleMarkAll = (status: AttendanceStatus) => {
    const updated: Record<string, AttendanceStatus> = {};
    classStudents.forEach(s => {
      updated[s.id] = status;
    });
    setCurrentRecords(prev => ({
      ...prev,
      ...updated
    }));
  };

  const handleSave = () => {
    const newRecord: AttendanceRecord = {
      id: `att-${selectedDate}-${selectedGrade}-${selectedSection}`,
      date: selectedDate,
      grade: selectedGrade,
      section: selectedSection,
      records: currentRecords,
      recordedBy: currentRole === 'teacher' ? 'Mrs. Rebecca Sterling' : 'Institutional Registrar',
      updatedAt: new Date().toISOString()
    };
    onSaveAttendance(newRecord);
    setToastMessage(`Attendance record for ${selectedGrade} (${selectedSection}) saved successfully.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Stats calculation
  const totalInCohort = classStudents.length;
  let presentCount = 0;
  let lateCount = 0;
  let absentCount = 0;
  let excusedCount = 0;

  classStudents.forEach(s => {
    const status = currentRecords[s.id] || 'present';
    if (status === 'present') presentCount++;
    else if (status === 'late') lateCount++;
    else if (status === 'absent') absentCount++;
    else if (status === 'excused') excusedCount++;
  });

  const attendancePercent = totalInCohort > 0 
    ? Math.round(((presentCount + lateCount) / totalInCohort) * 100) 
    : 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Daily Roll Call & Attendance Register
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time biometric & faculty classroom verification · Fall Term 2026
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
          >
            <Save className="w-4 h-4" />
            Commit & Save Register
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Selector & Filter Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">Session Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 font-mono focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">Grade Level</label>
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
        </div>

        {/* Quick bulk actions */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 text-[11px]">Batch Fill:</span>
          <button
            type="button"
            onClick={() => handleMarkAll('present')}
            className="px-3 py-1.5 rounded-md bg-emerald-50 text-emerald-800 font-medium hover:bg-emerald-100 transition-colors border border-emerald-200"
          >
            All Present
          </button>
          <button
            type="button"
            onClick={() => handleMarkAll('absent')}
            className="px-3 py-1.5 rounded-md bg-red-50 text-red-800 font-medium hover:bg-red-100 transition-colors border border-red-200"
          >
            All Absent
          </button>
        </div>
      </div>

      {/* Cohort Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-center shadow-xs">
          <span className="text-[11px] text-slate-500 block">Class Attendance</span>
          <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">
            {attendancePercent}%
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Cohort Effective</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-center shadow-xs">
          <span className="text-[11px] text-emerald-700 block font-medium">Present</span>
          <span className="text-xl font-bold font-mono text-emerald-700 tabular-nums">
            {presentCount}
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Verified on time</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-center shadow-xs">
          <span className="text-[11px] text-amber-700 block font-medium">Late Arrival</span>
          <span className="text-xl font-bold font-mono text-amber-700 tabular-nums">
            {lateCount}
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Tardy slip logged</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-center shadow-xs">
          <span className="text-[11px] text-red-700 block font-medium">Unexcused Absent</span>
          <span className="text-xl font-bold font-mono text-red-700 tabular-nums">
            {absentCount}
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Guardian notified</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-center shadow-xs col-span-2 sm:col-span-1">
          <span className="text-[11px] text-blue-700 block font-medium">Medical / Excused</span>
          <span className="text-xl font-bold font-mono text-blue-700 tabular-nums">
            {excusedCount}
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Documented</span>
        </div>
      </div>

      {/* Roster Roll Call List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Roll #</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Historical Rate</th>
                <th className="py-3 px-4 text-center">Status for {selectedDate}</th>
                <th className="py-3 px-4 text-right">Contact Dispatch</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {classStudents.length > 0 ? (
                classStudents.map((student) => {
                  const currentStatus = currentRecords[student.id] || 'present';
                  return (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-mono font-medium text-slate-700 tabular-nums">
                        #{student.rollNumber}
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">
                          {student.firstName} {student.lastName}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {student.admissionNo}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-mono font-medium text-slate-700 tabular-nums">
                          {student.attendanceRate}%
                        </span>
                      </td>

                      {/* Interactive Segmented Selector for Status */}
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleStatusChange(student.id, 'present')}
                            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                              currentStatus === 'present'
                                ? 'bg-emerald-700 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            Present
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(student.id, 'late')}
                            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                              currentStatus === 'late'
                                ? 'bg-amber-600 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            Late
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(student.id, 'absent')}
                            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                              currentStatus === 'absent'
                                ? 'bg-red-700 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            Absent
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(student.id, 'excused')}
                            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                              currentStatus === 'excused'
                                ? 'bg-blue-700 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            Excused
                          </button>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <span className="text-[11px] text-slate-500 font-mono">
                          {student.guardianPhone}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    No students currently assigned to {selectedGrade} ({selectedSection}).
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
