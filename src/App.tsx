import React, { useState, useEffect } from 'react';
import { 
  UserRole, 
  Student, 
  StaffMember, 
  AttendanceRecord, 
  FeeInvoice, 
  Notice, 
  TimetableSlot, 
  StudentGradeSheet 
} from './types.ts';
import { 
  INITIAL_STUDENTS, 
  INITIAL_STAFF, 
  INITIAL_TIMETABLE, 
  INITIAL_INVOICES, 
  INITIAL_NOTICES, 
  INITIAL_GRADE_SHEETS, 
  INITIAL_ATTENDANCE,
  loadStoredData,
  saveStoredData
} from './data/mockData.ts';

// Components
import { Header } from './components/layout/Header.tsx';
import { Sidebar } from './components/layout/Sidebar.tsx';
import { DashboardOverview } from './components/dashboard/DashboardOverview.tsx';
import { StudentsDirectory } from './components/students/StudentsDirectory.tsx';
import { StudentProfileModal } from './components/students/StudentProfileModal.tsx';
import { StudentIDCardModal } from './components/students/StudentIDCardModal.tsx';
import { AttendanceRegister } from './components/attendance/AttendanceRegister.tsx';
import { Gradebook } from './components/grades/Gradebook.tsx';
import { ReportCardModal } from './components/grades/ReportCardModal.tsx';
import { TimetableSchedule } from './components/timetable/TimetableSchedule.tsx';
import { FeeManagement } from './components/fees/FeeManagement.tsx';
import { FeeReceiptModal } from './components/fees/FeeReceiptModal.tsx';
import { StaffDirectory } from './components/staff/StaffDirectory.tsx';
import { NoticeBoard } from './components/notices/NoticeBoard.tsx';
import { SchoolSettings } from './components/settings/SchoolSettings.tsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentRole, setCurrentRole] = useState<UserRole>('admin');

  // Core Data States with localStorage persistence
  const [students, setStudents] = useState<Student[]>(() => 
    loadStoredData('students', INITIAL_STUDENTS)
  );
  const [staff, setStaff] = useState<StaffMember[]>(() => 
    loadStoredData('staff', INITIAL_STAFF)
  );
  const [attendance, setAttendance] = useState<AttendanceRecord>(() => 
    loadStoredData('attendance', INITIAL_ATTENDANCE)
  );
  const [timetable, setTimetable] = useState<TimetableSlot[]>(() => 
    loadStoredData('timetable', INITIAL_TIMETABLE)
  );
  const [invoices, setInvoices] = useState<FeeInvoice[]>(() => 
    loadStoredData('invoices', INITIAL_INVOICES)
  );
  const [notices, setNotices] = useState<Notice[]>(() => 
    loadStoredData('notices', INITIAL_NOTICES)
  );
  const [gradeSheets, setGradeSheets] = useState<Record<string, StudentGradeSheet>>(() => 
    loadStoredData('gradesheets', INITIAL_GRADE_SHEETS)
  );

  // Modal states
  const [selectedStudentForProfile, setSelectedStudentForProfile] = useState<Student | null>(null);
  const [selectedStudentForReport, setSelectedStudentForReport] = useState<Student | null>(null);
  const [selectedStudentForID, setSelectedStudentForID] = useState<Student | null>(null);
  const [selectedInvoiceForReceipt, setSelectedInvoiceForReceipt] = useState<FeeInvoice | null>(null);
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [postNoticeModalOpen, setPostNoticeModalOpen] = useState(false);

  // Synchronize state changes to localStorage
  useEffect(() => { saveStoredData('students', students); }, [students]);
  useEffect(() => { saveStoredData('staff', staff); }, [staff]);
  useEffect(() => { saveStoredData('attendance', attendance); }, [attendance]);
  useEffect(() => { saveStoredData('timetable', timetable); }, [timetable]);
  useEffect(() => { saveStoredData('invoices', invoices); }, [invoices]);
  useEffect(() => { saveStoredData('notices', notices); }, [notices]);
  useEffect(() => { saveStoredData('gradesheets', gradeSheets); }, [gradeSheets]);

  // Handlers
  const handleAddStudent = (newStudentData: Omit<Student, 'id' | 'admissionNo'>) => {
    const newId = `s_${Date.now()}`;
    const newAdm = `HA-2026-${String(students.length + 10).padStart(3, '0')}`;
    const newStudent: Student = {
      ...newStudentData,
      id: newId,
      admissionNo: newAdm
    };
    setStudents(prev => [newStudent, ...prev]);

    // Also scaffold an initial grade sheet
    const newSheet: StudentGradeSheet = {
      studentId: newId,
      term: 'Term 2 (Final)',
      academicYear: '2026-2027',
      overallGpa: newStudentData.gpa,
      classRank: students.length + 1,
      totalStudentsInClass: students.length + 1,
      attendancePercent: newStudentData.attendanceRate,
      conductRemarks: `${newStudentData.firstName} has adapted smoothly to cohort coursework. Displays dedicated academic focus.`,
      teacherSignatureDate: '2026-10-15',
      subjects: [
        { subject: 'Advanced Mathematics', teacher: 'Mrs. Rebecca Sterling', term: 'Term 2 (Final)', examScore: 88, courseworkScore: 90, totalScore: 89, letterGrade: 'A-', credits: 4, gradePoint: 3.7, remarks: 'Strong analytical progression' },
        { subject: 'Physics & Thermodynamics', teacher: 'Dr. Evelyn Vance', term: 'Term 2 (Final)', examScore: 86, courseworkScore: 88, totalScore: 87, letterGrade: 'B+', credits: 4, gradePoint: 3.5, remarks: 'Consistent laboratory diligence' },
        { subject: 'English Literature', teacher: 'Mr. David Morales', term: 'Term 2 (Final)', examScore: 92, courseworkScore: 94, totalScore: 93, letterGrade: 'A', credits: 3, gradePoint: 4.0, remarks: 'Insightful essay work' },
        { subject: 'Cellular Biology Lab', teacher: 'Dr. Sarah Al-Mansoor', term: 'Term 2 (Final)', examScore: 90, courseworkScore: 92, totalScore: 91, letterGrade: 'A', credits: 4, gradePoint: 3.9, remarks: 'Active engagement' }
      ]
    };
    setGradeSheets(prev => ({ ...prev, [newId]: newSheet }));
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    if (selectedStudentForProfile?.id === id) setSelectedStudentForProfile(null);
  };

  const handleSaveAttendance = (record: AttendanceRecord) => {
    setAttendance(record);
  };

  const handleUpdateGrade = (studentId: string, subject: string, examScore: number, courseworkScore: number) => {
    const total = Math.round((examScore * 0.6) + (courseworkScore * 0.4));
    let letter = 'B';
    let gpa = 3.0;
    if (total >= 95) { letter = 'A+'; gpa = 4.0; }
    else if (total >= 90) { letter = 'A'; gpa = 3.9; }
    else if (total >= 85) { letter = 'B+'; gpa = 3.5; }
    else if (total >= 80) { letter = 'B'; gpa = 3.0; }
    else if (total >= 70) { letter = 'C'; gpa = 2.0; }
    else { letter = 'F'; gpa = 0.0; }

    setGradeSheets(prev => {
      const current = prev[studentId] || {
        studentId,
        term: 'Term 2 (Final)',
        academicYear: '2026-2027',
        overallGpa: 3.8,
        classRank: 5,
        totalStudentsInClass: 29,
        attendancePercent: 96,
        conductRemarks: 'Committed academic learner.',
        teacherSignatureDate: '2026-10-15',
        subjects: []
      };

      const existingIndex = current.subjects.findIndex(s => s.subject === subject);
      let updatedSubjects = [...current.subjects];

      const updatedSub = {
        subject,
        teacher: 'Faculty Advisor',
        term: 'Term 2 (Final)' as const,
        examScore,
        courseworkScore,
        totalScore: total,
        letterGrade: letter,
        credits: 3,
        gradePoint: gpa,
        remarks: 'Performance reviewed'
      };

      if (existingIndex >= 0) {
        updatedSubjects[existingIndex] = updatedSub;
      } else {
        updatedSubjects.push(updatedSub);
      }

      const avgGpa = updatedSubjects.reduce((sum, s) => sum + s.gradePoint, 0) / updatedSubjects.length;

      return {
        ...prev,
        [studentId]: {
          ...current,
          subjects: updatedSubjects,
          overallGpa: Math.round(avgGpa * 100) / 100
        }
      };
    });
  };

  const handleAddTimetableSlot = (slot: Omit<TimetableSlot, 'id'>) => {
    const newSlot: TimetableSlot = {
      ...slot,
      id: `tt_${Date.now()}`
    };
    setTimetable(prev => [...prev, newSlot]);
  };

  const handleRecordPayment = (
    invoiceId: string, 
    amount: number, 
    method: 'Card' | 'Bank Transfer' | 'Cash' | 'Online Portal'
  ) => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id !== invoiceId) return inv;
      const newPaid = inv.paidAmount + amount;
      const newStatus = newPaid >= inv.amount ? 'paid' : 'partial';
      const newTx = {
        id: `tx_${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        amount,
        method,
        receiptNo: `REC-${Math.floor(10000 + Math.random() * 90000)}`
      };
      return {
        ...inv,
        paidAmount: newPaid,
        status: newStatus,
        transactions: [...inv.transactions, newTx]
      };
    }));
  };

  const handleAddInvoice = (newInv: Omit<FeeInvoice, 'id' | 'invoiceNo' | 'transactions'>) => {
    const invNumber = `INV-2026-${String(invoices.length + 90).padStart(3, '0')}`;
    const invoice: FeeInvoice = {
      ...newInv,
      id: `inv_${Date.now()}`,
      invoiceNo: invNumber,
      transactions: []
    };
    setInvoices(prev => [invoice, ...prev]);
  };

  const handleAddStaff = (member: Omit<StaffMember, 'id'>) => {
    const newMember: StaffMember = {
      ...member,
      id: `st_${Date.now()}`
    };
    setStaff(prev => [...prev, newMember]);
  };

  const handleDeleteStaff = (id: string) => {
    setStaff(prev => prev.filter(s => s.id !== id));
  };

  const handleAddNotice = (notice: Omit<Notice, 'id'>) => {
    const newNotice: Notice = {
      ...notice,
      id: `n_${Date.now()}`
    };
    setNotices(prev => [newNotice, ...prev]);
  };

  const handleDeleteNotice = (id: string) => {
    setNotices(prev => prev.filter(n => n.id !== id));
  };

  const handleResetData = () => {
    localStorage.clear();
    setStudents(INITIAL_STUDENTS);
    setStaff(INITIAL_STAFF);
    setAttendance(INITIAL_ATTENDANCE);
    setTimetable(INITIAL_TIMETABLE);
    setInvoices(INITIAL_INVOICES);
    setNotices(INITIAL_NOTICES);
    setGradeSheets(INITIAL_GRADE_SHEETS);
    alert('All demonstration school records restored to default.');
  };

  const handleQuickAction = (action: string) => {
    if (action === 'enroll_student') {
      setActiveTab('students');
      setEnrollModalOpen(true);
    } else if (action === 'post_notice') {
      setActiveTab('notices');
      setPostNoticeModalOpen(true);
    }
  };

  // Metrics for sidebar badges
  const unpaidCount = invoices.filter(i => i.status === 'pending' || i.status === 'overdue' || i.status === 'partial').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Institutional Top Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onQuickAction={handleQuickAction}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex max-w-[1720px] w-full mx-auto">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          currentRole={currentRole}
          studentCount={students.length}
          unpaidFeesCount={unpaidCount}
          noticeCount={notices.length}
        />

        {/* Content Viewport */}
        <main className="flex-1 p-6 md:p-8 min-w-0 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <DashboardOverview
              currentRole={currentRole}
              students={students}
              staff={staff}
              attendance={attendance}
              invoices={invoices}
              notices={notices}
              timetable={timetable}
              onNavigate={setActiveTab}
              onQuickAction={handleQuickAction}
              onSelectStudent={setSelectedStudentForProfile}
            />
          )}

          {activeTab === 'students' && (
            <StudentsDirectory
              students={students}
              onAddStudent={handleAddStudent}
              onDeleteStudent={handleDeleteStudent}
              onSelectStudent={setSelectedStudentForProfile}
              onOpenIDCard={setSelectedStudentForID}
              onOpenReportCard={setSelectedStudentForReport}
              currentRole={currentRole}
              enrollModalOpen={enrollModalOpen}
              setEnrollModalOpen={setEnrollModalOpen}
            />
          )}

          {activeTab === 'attendance' && (
            <AttendanceRegister
              students={students}
              attendance={attendance}
              onSaveAttendance={handleSaveAttendance}
              currentRole={currentRole}
            />
          )}

          {activeTab === 'grades' && (
            <Gradebook
              students={students}
              gradeSheets={gradeSheets}
              onOpenReportCard={setSelectedStudentForReport}
              onUpdateGrade={handleUpdateGrade}
              currentRole={currentRole}
            />
          )}

          {activeTab === 'timetable' && (
            <TimetableSchedule
              timetable={timetable}
              onAddSlot={handleAddTimetableSlot}
              currentRole={currentRole}
            />
          )}

          {activeTab === 'fees' && (
            <FeeManagement
              invoices={invoices}
              students={students}
              onRecordPayment={handleRecordPayment}
              onAddInvoice={handleAddInvoice}
              onViewReceipt={setSelectedInvoiceForReceipt}
              currentRole={currentRole}
            />
          )}

          {activeTab === 'staff' && (
            <StaffDirectory
              staff={staff}
              onAddStaff={handleAddStaff}
              onDeleteStaff={handleDeleteStaff}
              currentRole={currentRole}
            />
          )}

          {activeTab === 'notices' && (
            <NoticeBoard
              notices={notices}
              onAddNotice={handleAddNotice}
              onDeleteNotice={handleDeleteNotice}
              currentRole={currentRole}
              postModalOpen={postNoticeModalOpen}
              setPostModalOpen={setPostNoticeModalOpen}
            />
          )}

          {activeTab === 'settings' && (
            <SchoolSettings
              onResetData={handleResetData}
            />
          )}
        </main>
      </div>

      {/* Global Interactive Modals */}
      {selectedStudentForProfile && (
        <StudentProfileModal
          student={selectedStudentForProfile}
          gradeSheet={gradeSheets[selectedStudentForProfile.id]}
          invoices={invoices}
          onClose={() => setSelectedStudentForProfile(null)}
          onOpenReportCard={(s) => {
            setSelectedStudentForProfile(null);
            setSelectedStudentForReport(s);
          }}
          onOpenIDCard={(s) => {
            setSelectedStudentForProfile(null);
            setSelectedStudentForID(s);
          }}
        />
      )}

      {selectedStudentForID && (
        <StudentIDCardModal
          student={selectedStudentForID}
          onClose={() => setSelectedStudentForID(null)}
        />
      )}

      {selectedStudentForReport && (
        <ReportCardModal
          student={selectedStudentForReport}
          gradeSheet={gradeSheets[selectedStudentForReport.id] || {
            studentId: selectedStudentForReport.id,
            term: 'Term 2 (Final)',
            academicYear: '2026-2027',
            overallGpa: selectedStudentForReport.gpa,
            classRank: 4,
            totalStudentsInClass: 29,
            attendancePercent: selectedStudentForReport.attendanceRate,
            conductRemarks: `${selectedStudentForReport.firstName} displays admirable diligence, intellectual curiosity, and exemplary peer teamwork.`,
            teacherSignatureDate: '2026-10-15',
            subjects: [
              { subject: 'Advanced Mathematics', teacher: 'Mrs. Rebecca Sterling', term: 'Term 2 (Final)', examScore: 90, courseworkScore: 92, totalScore: 91, letterGrade: 'A', credits: 4, gradePoint: 3.9, remarks: 'High accuracy in theorem solving' },
              { subject: 'Physics & Thermodynamics', teacher: 'Dr. Evelyn Vance', term: 'Term 2 (Final)', examScore: 88, courseworkScore: 91, totalScore: 90, letterGrade: 'A', credits: 4, gradePoint: 3.8, remarks: 'Excellent lab technique' },
              { subject: 'English Literature', teacher: 'Mr. David Morales', term: 'Term 2 (Final)', examScore: 89, courseworkScore: 93, totalScore: 91, letterGrade: 'A', credits: 3, gradePoint: 3.9, remarks: 'Well argued critical compositions' },
              { subject: 'Cellular Biology Lab', teacher: 'Dr. Sarah Al-Mansoor', term: 'Term 2 (Final)', examScore: 94, courseworkScore: 95, totalScore: 94, letterGrade: 'A', credits: 4, gradePoint: 4.0, remarks: 'Superb observational records' }
            ]
          }}
          onClose={() => setSelectedStudentForReport(null)}
        />
      )}

      {selectedInvoiceForReceipt && (
        <FeeReceiptModal
          invoice={selectedInvoiceForReceipt}
          onClose={() => setSelectedInvoiceForReceipt(null)}
        />
      )}
    </div>
  );
}
