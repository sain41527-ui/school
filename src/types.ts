export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

export interface Student {
  id: string;
  rollNumber: string;
  admissionNo: string;
  firstName: string;
  lastName: string;
  grade: string;
  section: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  email: string;
  phone: string;
  address: string;
  guardianName: string;
  guardianRelation: string;
  guardianPhone: string;
  guardianEmail: string;
  enrollmentDate: string;
  status: 'active' | 'leave' | 'transferred';
  attendanceRate: number;
  gpa: number;
  avatarUrl?: string;
  emergencyContact: string;
}

export interface StaffMember {
  id: string;
  employeeId: string;
  name: string;
  designation: string;
  department: 'STEM & Sciences' | 'Humanities & Arts' | 'Languages' | 'Mathematics' | 'Physical Education' | 'Administration';
  email: string;
  phone: string;
  joinDate: string;
  qualification: string;
  assignedClasses: string[];
  status: 'active' | 'on_leave';
  avatarUrl?: string;
}

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export interface AttendanceRecord {
  id: string;
  date: string; // YYYY-MM-DD
  grade: string;
  section: string;
  records: Record<string, AttendanceStatus>; // studentId -> status
  recordedBy: string;
  updatedAt: string;
}

export interface SubjectGrade {
  subject: string;
  teacher: string;
  term: 'Term 1' | 'Midterm' | 'Term 2 (Final)';
  examScore: number; // e.g. 88
  courseworkScore: number; // e.g. 92
  totalScore: number; // 0-100
  letterGrade: string; // A+, A, B, etc.
  credits: number;
  gradePoint: number;
  remarks: string;
}

export interface StudentGradeSheet {
  studentId: string;
  term: 'Term 1' | 'Midterm' | 'Term 2 (Final)';
  academicYear: string;
  subjects: SubjectGrade[];
  overallGpa: number;
  classRank: number;
  totalStudentsInClass: number;
  attendancePercent: number;
  conductRemarks: string;
  teacherSignatureDate: string;
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  period: number;
  timeRange: string;
  subject: string;
  teacherName: string;
  room: string;
  grade: string;
  section: string;
}

export interface PaymentTransaction {
  id: string;
  date: string;
  amount: number;
  method: 'Card' | 'Bank Transfer' | 'Cash' | 'Online Portal';
  receiptNo: string;
  note?: string;
}

export interface FeeInvoice {
  id: string;
  invoiceNo: string;
  studentId: string;
  studentName: string;
  grade: string;
  section: string;
  feeType: 'Tuition Fee' | 'Laboratory & Tech' | 'Transportation' | 'Annual Facilities' | 'Sports & Activities';
  amount: number;
  paidAmount: number;
  dueDate: string;
  issueDate: string;
  status: 'paid' | 'partial' | 'pending' | 'overdue';
  transactions: PaymentTransaction[];
}

export interface Notice {
  id: string;
  title: string;
  category: 'Academic' | 'Sports' | 'Administrative' | 'Notice' | 'Event' | 'Holiday';
  targetAudience: 'all' | 'teachers' | 'students' | 'parents';
  date: string;
  author: string;
  content: string;
  isPinned: boolean;
  priority: 'normal' | 'high' | 'urgent';
}

export interface AcademicClass {
  id: string;
  name: string;
  grade: string;
  section: string;
  classTeacher: string;
  roomNumber: string;
  studentCount: number;
  capacity: number;
}
