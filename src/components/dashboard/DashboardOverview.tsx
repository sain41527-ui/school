import React from 'react';
import { 
  Student, 
  StaffMember, 
  AttendanceRecord, 
  FeeInvoice, 
  Notice, 
  TimetableSlot, 
  UserRole 
} from '../../types.ts';
import { ASSETS } from '../../constants/assets.ts';
import { 
  Users, 
  UserCheck, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Calendar, 
  Award, 
  PlusCircle, 
  CheckCircle2, 
  FileText, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

interface DashboardOverviewProps {
  currentRole: UserRole;
  students: Student[];
  staff: StaffMember[];
  attendance: AttendanceRecord;
  invoices: FeeInvoice[];
  notices: Notice[];
  timetable: TimetableSlot[];
  onNavigate: (tab: string) => void;
  onQuickAction: (action: string) => void;
  onSelectStudent: (student: Student) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  currentRole,
  students,
  staff,
  attendance,
  invoices,
  notices,
  timetable,
  onNavigate,
  onQuickAction,
  onSelectStudent
}) => {
  // Compute analytics
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'active').length;
  const totalStaff = staff.length;
  
  // Attendance calculation
  const attRecords = Object.values(attendance.records);
  const presentCount = attRecords.filter(r => r === 'present' || r === 'late').length;
  const attendanceRate = attRecords.length > 0 
    ? Math.round((presentCount / attRecords.length) * 1000) / 10 
    : 96.4;

  // Fee metrics
  const totalBilled = invoices.reduce((acc, curr) => acc + curr.amount, 0);
  const totalCollected = invoices.reduce((acc, curr) => acc + curr.paidAmount, 0);
  const collectionRate = totalBilled > 0 ? Math.round((totalCollected / totalBilled) * 100) : 0;
  const pendingInvoices = invoices.filter(i => i.status === 'pending' || i.status === 'overdue' || i.status === 'partial');

  // Filter today's timetable for Monday/Tuesday or current day
  const todayClasses = timetable.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Campus Hero Card */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 text-white min-h-[180px] flex flex-col justify-end p-6 md:p-8">
        <img
          src={ASSETS.campusExterior}
          alt="Horizon Academy Campus"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
            <span>Official Portal</span>
            <span aria-hidden="true">·</span>
            <span>Horizon Academy of Excellence</span>
            <span aria-hidden="true">·</span>
            <span>Established 1878</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
            {currentRole === 'admin' && 'Executive Institutional Dashboard'}
            {currentRole === 'teacher' && 'Faculty Workspace & Class Monitor'}
            {currentRole === 'student' && 'Welcome back, Aaliyah Patel'}
            {currentRole === 'parent' && 'Parent Advisory & Student Portal'}
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            {currentRole === 'admin' && 'Real-time overview of student enrollment, daily academic attendance, faculty workloads, and financial reconciliation for Fall Term 2026.'}
            {currentRole === 'teacher' && 'Manage class roll-calls, grade entry, syllabus progression, and parental advisory communication.'}
            {currentRole === 'student' && 'Grade 10-A · Honor Roll Candidate · Cumulative GPA: 3.92 · View your classes, exams, and attendance.'}
            {currentRole === 'parent' && 'Review Aaliyah Patel\'s academic performance, term tuition records, and campus bulletins.'}
          </p>
        </div>
      </div>

      {/* Primary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Enrolled</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
              {totalStudents.toLocaleString()}
            </span>
            <span className="text-xs text-slate-500">students</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
            <span className="text-emerald-700 font-medium">{activeStudents} active</span>
            <span>·</span>
            <span>6 grade levels</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Teaching Faculty</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
              {totalStaff}
            </span>
            <span className="text-xs text-slate-500">instructors</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
            <span>Student-to-Teacher Ratio:</span>
            <span className="font-semibold text-slate-700">14:1</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Today's Attendance</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
              {attendanceRate}%
            </span>
            <span className="text-xs text-slate-500">recorded</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
            <span>{presentCount} in attendance today</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Fee Collection</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
              ${(totalCollected / 1000).toFixed(1)}k
            </span>
            <span className="text-xs text-slate-500 font-medium text-emerald-700">
              ({collectionRate}% rate)
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
            <span>${((totalBilled - totalCollected) / 1000).toFixed(1)}k outstanding</span>
          </div>
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <div className="text-xs font-semibold text-slate-700 mb-3 uppercase tracking-wider">
          Quick Operations & Workflows
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {currentRole === 'admin' && (
            <button
              onClick={() => onQuickAction('enroll_student')}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Enroll New Student
            </button>
          )}

          <button
            onClick={() => onNavigate('attendance')}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Take Daily Roll Call
          </button>

          <button
            onClick={() => onNavigate('grades')}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
          >
            <Award className="w-3.5 h-3.5 text-blue-600" />
            Generate Report Cards
          </button>

          <button
            onClick={() => onNavigate('timetable')}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
          >
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            View Master Timetable
          </button>

          <button
            onClick={() => onNavigate('fees')}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
          >
            <DollarSign className="w-3.5 h-3.5 text-amber-600" />
            Record Fee Payment
          </button>

          {currentRole === 'admin' && (
            <button
              onClick={() => onQuickAction('post_notice')}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-purple-600" />
              Post Campus Notice
            </button>
          )}
        </div>
      </div>

      {/* 2-Column Split: Today's Schedule & Academic Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Classes / Schedule */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Today's Class Schedule</h2>
              <p className="text-xs text-slate-500">Grade 10 - Section A · Period Rotations</p>
            </div>
            <button
              onClick={() => onNavigate('timetable')}
              className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              Full Timetable <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {todayClasses.map((item, index) => (
              <div 
                key={item.id} 
                className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-700 tabular-nums">
                    P{item.period}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{item.subject}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{item.teacherName}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.room}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-700 tabular-nums block">
                    {item.timeRange}
                  </span>
                  <span className="text-[11px] text-emerald-600 font-medium">
                    {index === 1 ? 'In Progress' : index < 1 ? 'Completed' : 'Upcoming'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Column: Campus Notices */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Announcements</h2>
                <p className="text-xs text-slate-500">Institutional Bulletins</p>
              </div>
              <button
                onClick={() => onNavigate('notices')}
                className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                All Notices <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {notices.slice(0, 3).map((notice) => (
                <div key={notice.id} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-semibold text-slate-700">
                      {notice.category}
                    </span>
                    <span className="text-[10px] text-slate-500 tabular-nums">{notice.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{notice.title}</h4>
                  <p className="text-[11px] text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                    {notice.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Next Faculty Meeting</span>
            <span className="font-semibold text-slate-800 tabular-nums">Oct 20, 16:00</span>
          </div>
        </div>
      </div>

      {/* Featured Students Table Snapshot */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Student Cohort (Grade 10-A)</h2>
            <p className="text-xs text-slate-500">Class Advisor: Mrs. Rebecca Sterling</p>
          </div>
          <button
            onClick={() => onNavigate('students')}
            className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            View All Students ({students.length}) <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-2.5 px-3">Roll #</th>
                <th className="py-2.5 px-3">Student Name</th>
                <th className="py-2.5 px-3">Grade & Section</th>
                <th className="py-2.5 px-3">Attendance Rate</th>
                <th className="py-2.5 px-3 text-right">Term GPA</th>
                <th className="py-2.5 px-3 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.slice(0, 5).map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-medium text-slate-600 tabular-nums">
                    #{student.rollNumber}
                  </td>
                  <td className="py-2.5 px-3">
                    <button 
                      onClick={() => onSelectStudent(student)}
                      className="font-medium text-slate-900 hover:text-blue-600 text-left transition-colors"
                    >
                      {student.firstName} {student.lastName}
                    </button>
                    <div className="text-[10px] text-slate-400">{student.admissionNo}</div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    {student.grade} - {student.section}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="font-semibold text-slate-800 tabular-nums">
                      {student.attendanceRate}%
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-semibold text-slate-900 tabular-nums">
                    {student.gpa.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => onSelectStudent(student)}
                      className="text-[11px] font-medium text-slate-700 hover:text-slate-900 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                      Profile & Marks
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
