import { 
  Student, 
  StaffMember, 
  AcademicClass, 
  TimetableSlot, 
  FeeInvoice, 
  Notice, 
  AttendanceRecord,
  StudentGradeSheet
} from '../types.ts';

export const INITIAL_CLASSES: AcademicClass[] = [
  { id: 'c1', name: 'Grade 9 - Section A', grade: 'Grade 9', section: 'A', classTeacher: 'Dr. Evelyn Vance', roomNumber: 'Room 201', studentCount: 28, capacity: 30 },
  { id: 'c2', name: 'Grade 9 - Section B', grade: 'Grade 9', section: 'B', classTeacher: 'Mr. David Morales', roomNumber: 'Room 202', studentCount: 26, capacity: 30 },
  { id: 'c3', name: 'Grade 10 - Section A', grade: 'Grade 10', section: 'A', classTeacher: 'Mrs. Rebecca Sterling', roomNumber: 'Room 304', studentCount: 29, capacity: 30 },
  { id: 'c4', name: 'Grade 10 - Section B', grade: 'Grade 10', section: 'B', classTeacher: 'Mr. Anthony Brooks', roomNumber: 'Room 305', studentCount: 27, capacity: 30 },
  { id: 'c5', name: 'Grade 11 - Science', grade: 'Grade 11', section: 'Science', classTeacher: 'Dr. Sarah Al-Mansoor', roomNumber: 'Lab Complex 1', studentCount: 25, capacity: 28 },
  { id: 'c6', name: 'Grade 12 - Advanced', grade: 'Grade 12', section: 'AP', classTeacher: 'Prof. Marcus Chen', roomNumber: 'Auditorium Hall B', studentCount: 24, capacity: 26 },
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 's1',
    rollNumber: '101',
    admissionNo: 'HA-2024-001',
    firstName: 'Aaliyah',
    lastName: 'Patel',
    grade: 'Grade 10',
    section: 'A',
    dob: '2010-04-12',
    gender: 'Female',
    bloodGroup: 'O+',
    email: 'aaliyah.patel@horizon.edu',
    phone: '+1 (555) 349-8120',
    address: '428 Elmcrest Blvd, Suite 4B, Springfield',
    guardianName: 'Vikram Patel',
    guardianRelation: 'Father',
    guardianPhone: '+1 (555) 912-3401',
    guardianEmail: 'vikram.patel@horizonparent.net',
    enrollmentDate: '2023-09-01',
    status: 'active',
    attendanceRate: 97.4,
    gpa: 3.92,
    emergencyContact: '+1 (555) 912-3402'
  },
  {
    id: 's2',
    rollNumber: '102',
    admissionNo: 'HA-2024-002',
    firstName: 'Julian',
    lastName: 'Kowalski',
    grade: 'Grade 10',
    section: 'A',
    dob: '2010-08-25',
    gender: 'Male',
    bloodGroup: 'A+',
    email: 'julian.kowalski@horizon.edu',
    phone: '+1 (555) 482-1923',
    address: '15 Maple Grove Way, Springfield',
    guardianName: 'Anna Kowalski',
    guardianRelation: 'Mother',
    guardianPhone: '+1 (555) 882-9012',
    guardianEmail: 'anna.kowalski@horizonparent.net',
    enrollmentDate: '2023-09-01',
    status: 'active',
    attendanceRate: 94.8,
    gpa: 3.75,
    emergencyContact: '+1 (555) 882-9013'
  },
  {
    id: 's3',
    rollNumber: '103',
    admissionNo: 'HA-2024-003',
    firstName: 'Maya',
    lastName: 'Lin-Harrison',
    grade: 'Grade 10',
    section: 'A',
    dob: '2010-01-19',
    gender: 'Female',
    bloodGroup: 'B+',
    email: 'maya.lin@horizon.edu',
    phone: '+1 (555) 201-9482',
    address: '88 Meadowlark Terr, Springfield',
    guardianName: 'David Harrison',
    guardianRelation: 'Father',
    guardianPhone: '+1 (555) 732-4411',
    guardianEmail: 'david.harrison@horizonparent.net',
    enrollmentDate: '2023-09-01',
    status: 'active',
    attendanceRate: 98.2,
    gpa: 4.00,
    emergencyContact: '+1 (555) 732-4412'
  },
  {
    id: 's4',
    rollNumber: '104',
    admissionNo: 'HA-2024-004',
    firstName: 'Lucas',
    lastName: 'Silva',
    grade: 'Grade 10',
    section: 'A',
    dob: '2009-11-04',
    gender: 'Male',
    bloodGroup: 'AB-',
    email: 'lucas.silva@horizon.edu',
    phone: '+1 (555) 512-8874',
    address: '304 Riverdale Ave, Springfield',
    guardianName: 'Elena Silva',
    guardianRelation: 'Mother',
    guardianPhone: '+1 (555) 604-3329',
    guardianEmail: 'elena.silva@horizonparent.net',
    enrollmentDate: '2023-09-01',
    status: 'active',
    attendanceRate: 89.6,
    gpa: 3.24,
    emergencyContact: '+1 (555) 604-3330'
  },
  {
    id: 's5',
    rollNumber: '105',
    admissionNo: 'HA-2024-005',
    firstName: 'Zara',
    lastName: 'Okonkwo',
    grade: 'Grade 10',
    section: 'A',
    dob: '2010-03-30',
    gender: 'Female',
    bloodGroup: 'O-',
    email: 'zara.okonkwo@horizon.edu',
    phone: '+1 (555) 749-3312',
    address: '112 Birchwood Court, Springfield',
    guardianName: 'Chidi Okonkwo',
    guardianRelation: 'Father',
    guardianPhone: '+1 (555) 492-8810',
    guardianEmail: 'chidi.okonkwo@horizonparent.net',
    enrollmentDate: '2023-09-01',
    status: 'active',
    attendanceRate: 96.0,
    gpa: 3.88,
    emergencyContact: '+1 (555) 492-8811'
  },
  {
    id: 's6',
    rollNumber: '201',
    admissionNo: 'HA-2023-045',
    firstName: 'Benjamin',
    lastName: 'Hayes',
    grade: 'Grade 11',
    section: 'Science',
    dob: '2009-06-14',
    gender: 'Male',
    bloodGroup: 'A-',
    email: 'benjamin.hayes@horizon.edu',
    phone: '+1 (555) 902-1481',
    address: '502 Highland Heights, Springfield',
    guardianName: 'Rachel Hayes',
    guardianRelation: 'Mother',
    guardianPhone: '+1 (555) 301-7782',
    guardianEmail: 'rachel.hayes@horizonparent.net',
    enrollmentDate: '2022-09-01',
    status: 'active',
    attendanceRate: 93.5,
    gpa: 3.65,
    emergencyContact: '+1 (555) 301-7783'
  },
  {
    id: 's7',
    rollNumber: '301',
    admissionNo: 'HA-2022-019',
    firstName: 'Sofia',
    lastName: 'Reyes',
    grade: 'Grade 12',
    section: 'AP',
    dob: '2008-09-17',
    gender: 'Female',
    bloodGroup: 'B-',
    email: 'sofia.reyes@horizon.edu',
    phone: '+1 (555) 662-8190',
    address: '22 Orchard Park Lane, Springfield',
    guardianName: 'Carlos Reyes',
    guardianRelation: 'Father',
    guardianPhone: '+1 (555) 819-2041',
    guardianEmail: 'carlos.reyes@horizonparent.net',
    enrollmentDate: '2021-09-01',
    status: 'active',
    attendanceRate: 99.1,
    gpa: 3.98,
    emergencyContact: '+1 (555) 819-2042'
  },
  {
    id: 's8',
    rollNumber: '111',
    admissionNo: 'HA-2025-012',
    firstName: 'Liam',
    lastName: 'Brennan',
    grade: 'Grade 9',
    section: 'A',
    dob: '2011-02-08',
    gender: 'Male',
    bloodGroup: 'O+',
    email: 'liam.brennan@horizon.edu',
    phone: '+1 (555) 431-7722',
    address: '94 Aspen Meadow Blvd, Springfield',
    guardianName: 'Sean Brennan',
    guardianRelation: 'Father',
    guardianPhone: '+1 (555) 612-4091',
    guardianEmail: 'sean.brennan@horizonparent.net',
    enrollmentDate: '2024-09-01',
    status: 'active',
    attendanceRate: 91.2,
    gpa: 3.42,
    emergencyContact: '+1 (555) 612-4092'
  }
];

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'st1',
    employeeId: 'FAC-1001',
    name: 'Dr. Evelyn Vance',
    designation: 'Head of STEM & Physics Lead',
    department: 'STEM & Sciences',
    email: 'evelyn.vance@horizon.edu',
    phone: '+1 (555) 234-9001',
    joinDate: '2018-08-15',
    qualification: 'Ph.D. in Applied Physics, MIT',
    assignedClasses: ['Grade 10-A Physics', 'Grade 11-Science Physics', 'Grade 12-AP Mechanics'],
    status: 'active'
  },
  {
    id: 'st2',
    employeeId: 'FAC-1002',
    name: 'Mrs. Rebecca Sterling',
    designation: 'Senior Faculty in Pure Mathematics',
    department: 'Mathematics',
    email: 'rebecca.sterling@horizon.edu',
    phone: '+1 (555) 234-9002',
    joinDate: '2019-01-10',
    qualification: 'M.Sc. in Pure Mathematics, Oxford',
    assignedClasses: ['Grade 10-A Calculus Prep', 'Grade 10-B Algebra II', 'Grade 12-AP Statistics'],
    status: 'active'
  },
  {
    id: 'st3',
    employeeId: 'FAC-1003',
    name: 'Prof. Marcus Chen',
    designation: 'Chair of World History & Social Studies',
    department: 'Humanities & Arts',
    email: 'marcus.chen@horizon.edu',
    phone: '+1 (555) 234-9003',
    joinDate: '2016-09-01',
    qualification: 'Ph.D. in Global Historiography, Yale',
    assignedClasses: ['Grade 10-A World History', 'Grade 11-Modern Civics', 'Grade 12-AP History'],
    status: 'active'
  },
  {
    id: 'st4',
    employeeId: 'FAC-1004',
    name: 'Dr. Sarah Al-Mansoor',
    designation: 'Biochemistry & Molecular Biology Specialist',
    department: 'STEM & Sciences',
    email: 'sarah.almansoor@horizon.edu',
    phone: '+1 (555) 234-9004',
    joinDate: '2020-08-20',
    qualification: 'Ph.D. in Molecular Biology, Johns Hopkins',
    assignedClasses: ['Grade 10-A Biology', 'Grade 11-Science Chemistry'],
    status: 'active'
  },
  {
    id: 'st5',
    employeeId: 'FAC-1005',
    name: 'Mr. David Morales',
    designation: 'English Literature & Rhetoric Director',
    department: 'Languages',
    email: 'david.morales@horizon.edu',
    phone: '+1 (555) 234-9005',
    joinDate: '2021-08-15',
    qualification: 'M.A. in Comparative Literature, Columbia',
    assignedClasses: ['Grade 9-B English', 'Grade 10-A English Lit', 'Grade 11-Essay Writing'],
    status: 'active'
  },
  {
    id: 'st6',
    employeeId: 'ADM-001',
    name: 'Eleanor Vance-Ross',
    designation: 'Dean of Academic Affairs & Admissions',
    department: 'Administration',
    email: 'dean.office@horizon.edu',
    phone: '+1 (555) 234-9900',
    joinDate: '2015-06-01',
    qualification: 'Ed.D. in Educational Leadership, Harvard',
    assignedClasses: ['Institutional Governance'],
    status: 'active'
  }
];

export const INITIAL_TIMETABLE: TimetableSlot[] = [
  // Monday
  { id: 'tt1', day: 'Monday', period: 1, timeRange: '08:30 - 09:20', subject: 'Advanced Mathematics', teacherName: 'Mrs. Rebecca Sterling', room: 'Room 304', grade: 'Grade 10', section: 'A' },
  { id: 'tt2', day: 'Monday', period: 2, timeRange: '09:25 - 10:15', subject: 'Physics & Thermodynamics', teacherName: 'Dr. Evelyn Vance', room: 'Lab 2', grade: 'Grade 10', section: 'A' },
  { id: 'tt3', day: 'Monday', period: 3, timeRange: '10:30 - 11:20', subject: 'English Literature', teacherName: 'Mr. David Morales', room: 'Room 201', grade: 'Grade 10', section: 'A' },
  { id: 'tt4', day: 'Monday', period: 4, timeRange: '11:25 - 12:15', subject: 'World History & Civilizations', teacherName: 'Prof. Marcus Chen', room: 'Room 304', grade: 'Grade 10', section: 'A' },
  { id: 'tt5', day: 'Monday', period: 5, timeRange: '13:00 - 13:50', subject: 'Cellular Biology Lab', teacherName: 'Dr. Sarah Al-Mansoor', room: 'BioLab A', grade: 'Grade 10', section: 'A' },
  { id: 'tt6', day: 'Monday', period: 6, timeRange: '13:55 - 14:45', subject: 'Computer Science & Logic', teacherName: 'Dr. Evelyn Vance', room: 'Tech Lab 1', grade: 'Grade 10', section: 'A' },
  { id: 'tt7', day: 'Monday', period: 7, timeRange: '14:50 - 15:30', subject: 'Physical Conditioning', teacherName: 'Coach J. Miller', room: 'Gymnasium', grade: 'Grade 10', section: 'A' },

  // Tuesday
  { id: 'tt8', day: 'Tuesday', period: 1, timeRange: '08:30 - 09:20', subject: 'Cellular Biology Lab', teacherName: 'Dr. Sarah Al-Mansoor', room: 'BioLab A', grade: 'Grade 10', section: 'A' },
  { id: 'tt9', day: 'Tuesday', period: 2, timeRange: '09:25 - 10:15', subject: 'Advanced Mathematics', teacherName: 'Mrs. Rebecca Sterling', room: 'Room 304', grade: 'Grade 10', section: 'A' },
  { id: 'tt10', day: 'Tuesday', period: 3, timeRange: '10:30 - 11:20', subject: 'World History & Civilizations', teacherName: 'Prof. Marcus Chen', room: 'Room 304', grade: 'Grade 10', section: 'A' },
  { id: 'tt11', day: 'Tuesday', period: 4, timeRange: '11:25 - 12:15', subject: 'Physics & Thermodynamics', teacherName: 'Dr. Evelyn Vance', room: 'Lab 2', grade: 'Grade 10', section: 'A' },
  { id: 'tt12', day: 'Tuesday', period: 5, timeRange: '13:00 - 13:50', subject: 'English Literature', teacherName: 'Mr. David Morales', room: 'Room 201', grade: 'Grade 10', section: 'A' },
  { id: 'tt13', day: 'Tuesday', period: 6, timeRange: '13:55 - 14:45', subject: 'Academic Study & Mentorship', teacherName: 'Mrs. Rebecca Sterling', room: 'Library Annex', grade: 'Grade 10', section: 'A' },

  // Wednesday
  { id: 'tt14', day: 'Wednesday', period: 1, timeRange: '08:30 - 09:20', subject: 'Physics & Thermodynamics', teacherName: 'Dr. Evelyn Vance', room: 'Lab 2', grade: 'Grade 10', section: 'A' },
  { id: 'tt15', day: 'Wednesday', period: 2, timeRange: '09:25 - 10:15', subject: 'Computer Science & Logic', teacherName: 'Dr. Evelyn Vance', room: 'Tech Lab 1', grade: 'Grade 10', section: 'A' },
  { id: 'tt16', day: 'Wednesday', period: 3, timeRange: '10:30 - 11:20', subject: 'Advanced Mathematics', teacherName: 'Mrs. Rebecca Sterling', room: 'Room 304', grade: 'Grade 10', section: 'A' },
  { id: 'tt17', day: 'Wednesday', period: 4, timeRange: '11:25 - 12:15', subject: 'French / World Language', teacherName: 'Mme. Dupont', room: 'Room 108', grade: 'Grade 10', section: 'A' },
  { id: 'tt18', day: 'Wednesday', period: 5, timeRange: '13:00 - 13:50', subject: 'World History & Civilizations', teacherName: 'Prof. Marcus Chen', room: 'Room 304', grade: 'Grade 10', section: 'A' },

  // Thursday
  { id: 'tt19', day: 'Thursday', period: 1, timeRange: '08:30 - 09:20', subject: 'English Literature', teacherName: 'Mr. David Morales', room: 'Room 201', grade: 'Grade 10', section: 'A' },
  { id: 'tt20', day: 'Thursday', period: 2, timeRange: '09:25 - 10:15', subject: 'Advanced Mathematics', teacherName: 'Mrs. Rebecca Sterling', room: 'Room 304', grade: 'Grade 10', section: 'A' },
  { id: 'tt21', day: 'Thursday', period: 3, timeRange: '10:30 - 11:20', subject: 'Cellular Biology Lab', teacherName: 'Dr. Sarah Al-Mansoor', room: 'BioLab A', grade: 'Grade 10', section: 'A' },
  { id: 'tt22', day: 'Thursday', period: 4, timeRange: '11:25 - 12:15', subject: 'Physical Conditioning', teacherName: 'Coach J. Miller', room: 'Field Track', grade: 'Grade 10', section: 'A' },
  { id: 'tt23', day: 'Thursday', period: 5, timeRange: '13:00 - 13:50', subject: 'Robotics & Maker Workshop', teacherName: 'Dr. Evelyn Vance', room: 'Innovation Hub', grade: 'Grade 10', section: 'A' },

  // Friday
  { id: 'tt24', day: 'Friday', period: 1, timeRange: '08:30 - 09:20', subject: 'Computer Science & Logic', teacherName: 'Dr. Evelyn Vance', room: 'Tech Lab 1', grade: 'Grade 10', section: 'A' },
  { id: 'tt25', day: 'Friday', period: 2, timeRange: '09:25 - 10:15', subject: 'Physics & Thermodynamics', teacherName: 'Dr. Evelyn Vance', room: 'Lab 2', grade: 'Grade 10', section: 'A' },
  { id: 'tt26', day: 'Friday', period: 3, timeRange: '10:30 - 11:20', subject: 'English Literature', teacherName: 'Mr. David Morales', room: 'Room 201', grade: 'Grade 10', section: 'A' },
  { id: 'tt27', day: 'Friday', period: 4, timeRange: '11:25 - 12:15', subject: 'Advanced Mathematics', teacherName: 'Mrs. Rebecca Sterling', room: 'Room 304', grade: 'Grade 10', section: 'A' },
  { id: 'tt28', day: 'Friday', period: 5, timeRange: '13:00 - 13:50', subject: 'All-School Assembly & Debate', teacherName: 'Prof. Marcus Chen', room: 'Main Auditorium', grade: 'Grade 10', section: 'A' }
];

export const INITIAL_INVOICES: FeeInvoice[] = [
  {
    id: 'inv1',
    invoiceNo: 'INV-2026-081',
    studentId: 's1',
    studentName: 'Aaliyah Patel',
    grade: 'Grade 10',
    section: 'A',
    feeType: 'Tuition Fee',
    amount: 3200,
    paidAmount: 3200,
    dueDate: '2026-10-10',
    issueDate: '2026-09-01',
    status: 'paid',
    transactions: [
      { id: 'tx1', date: '2026-09-28', amount: 3200, method: 'Online Portal', receiptNo: 'REC-99410' }
    ]
  },
  {
    id: 'inv2',
    invoiceNo: 'INV-2026-082',
    studentId: 's2',
    studentName: 'Julian Kowalski',
    grade: 'Grade 10',
    section: 'A',
    feeType: 'Tuition Fee',
    amount: 3200,
    paidAmount: 1600,
    dueDate: '2026-10-30',
    issueDate: '2026-09-01',
    status: 'partial',
    transactions: [
      { id: 'tx2', date: '2026-09-15', amount: 1600, method: 'Bank Transfer', receiptNo: 'REC-99201' }
    ]
  },
  {
    id: 'inv3',
    invoiceNo: 'INV-2026-083',
    studentId: 's3',
    studentName: 'Maya Lin-Harrison',
    grade: 'Grade 10',
    section: 'A',
    feeType: 'Laboratory & Tech',
    amount: 650,
    paidAmount: 650,
    dueDate: '2026-10-15',
    issueDate: '2026-09-10',
    status: 'paid',
    transactions: [
      { id: 'tx3', date: '2026-10-02', amount: 650, method: 'Card', receiptNo: 'REC-99522' }
    ]
  },
  {
    id: 'inv4',
    invoiceNo: 'INV-2026-084',
    studentId: 's4',
    studentName: 'Lucas Silva',
    grade: 'Grade 10',
    section: 'A',
    feeType: 'Tuition Fee',
    amount: 3200,
    paidAmount: 0,
    dueDate: '2026-10-01',
    issueDate: '2026-09-01',
    status: 'overdue',
    transactions: []
  },
  {
    id: 'inv5',
    invoiceNo: 'INV-2026-085',
    studentId: 's5',
    studentName: 'Zara Okonkwo',
    grade: 'Grade 10',
    section: 'A',
    feeType: 'Transportation',
    amount: 480,
    paidAmount: 480,
    dueDate: '2026-10-20',
    issueDate: '2026-09-15',
    status: 'paid',
    transactions: [
      { id: 'tx4', date: '2026-10-05', amount: 480, method: 'Online Portal', receiptNo: 'REC-99604' }
    ]
  },
  {
    id: 'inv6',
    invoiceNo: 'INV-2026-086',
    studentId: 's6',
    studentName: 'Benjamin Hayes',
    grade: 'Grade 11',
    section: 'Science',
    feeType: 'Tuition Fee',
    amount: 3450,
    paidAmount: 0,
    dueDate: '2026-10-25',
    issueDate: '2026-09-01',
    status: 'pending',
    transactions: []
  },
  {
    id: 'inv7',
    invoiceNo: 'INV-2026-087',
    studentId: 's7',
    studentName: 'Sofia Reyes',
    grade: 'Grade 12',
    section: 'AP',
    feeType: 'Tuition Fee',
    amount: 3600,
    paidAmount: 3600,
    dueDate: '2026-10-05',
    issueDate: '2026-09-01',
    status: 'paid',
    transactions: [
      { id: 'tx5', date: '2026-09-20', amount: 3600, method: 'Bank Transfer', receiptNo: 'REC-99119' }
    ]
  }
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'n1',
    title: 'Mid-Term Examinations Schedule & Proctoring Guidelines',
    category: 'Academic',
    targetAudience: 'all',
    date: '2026-10-12',
    author: 'Office of Academic Affairs',
    content: 'The official schedule for the Fall Mid-Term examinations has been ratified. Examinations commence on Monday, October 26th. Students are reminded that scientific calculators are permitted only in designated STEM assessments.',
    isPinned: true,
    priority: 'high'
  },
  {
    id: 'n2',
    title: 'Annual Science Fair & Innovation Exposition 2026',
    category: 'Event',
    targetAudience: 'all',
    date: '2026-10-14',
    author: 'STEM Department',
    content: 'Project submission abstracts are open through November 5th. All students enrolled in Grade 9-12 are invited to present original laboratory models or computational algorithms.',
    isPinned: true,
    priority: 'normal'
  },
  {
    id: 'n3',
    title: 'Parent-Teacher Consultative Conference (Term 1)',
    category: 'Administrative',
    targetAudience: 'parents',
    date: '2026-10-09',
    author: 'Principal Office',
    content: 'Individual conferences with faculty advisors will take place on Friday, October 30th from 09:00 to 16:30. Parents can reserve 15-minute consultations through this portal.',
    isPinned: false,
    priority: 'normal'
  },
  {
    id: 'n4',
    title: 'Varsity Soccer & Track Regional Championship Finals',
    category: 'Sports',
    targetAudience: 'students',
    date: '2026-10-07',
    author: 'Athletics Department',
    content: 'Congratulations to the Horizon Hawks Varsity Boys and Girls teams for qualifying for the state divisionals this weekend at St. Andrews Complex.',
    isPinned: false,
    priority: 'normal'
  }
];

export const INITIAL_GRADE_SHEETS: Record<string, StudentGradeSheet> = {
  's1': {
    studentId: 's1',
    term: 'Term 2 (Final)',
    academicYear: '2026-2027',
    overallGpa: 3.92,
    classRank: 2,
    totalStudentsInClass: 29,
    attendancePercent: 97.4,
    conductRemarks: 'Aaliyah demonstrates exemplary scholarly discipline and intellectual vigor. Actively contributes in analytical class discussions and peer study circles.',
    teacherSignatureDate: '2026-10-14',
    subjects: [
      { subject: 'Advanced Mathematics', teacher: 'Mrs. Rebecca Sterling', term: 'Term 2 (Final)', examScore: 94, courseworkScore: 96, totalScore: 95, letterGrade: 'A+', credits: 4, gradePoint: 4.0, remarks: 'Flawless proofs and algebraic synthesis' },
      { subject: 'Physics & Thermodynamics', teacher: 'Dr. Evelyn Vance', term: 'Term 2 (Final)', examScore: 90, courseworkScore: 92, totalScore: 91, letterGrade: 'A', credits: 4, gradePoint: 3.9, remarks: 'Exceptional experimental accuracy' },
      { subject: 'English Literature', teacher: 'Mr. David Morales', term: 'Term 2 (Final)', examScore: 88, courseworkScore: 93, totalScore: 90, letterGrade: 'A', credits: 3, gradePoint: 3.8, remarks: 'Nuanced comparative essays' },
      { subject: 'World History & Civilizations', teacher: 'Prof. Marcus Chen', term: 'Term 2 (Final)', examScore: 92, courseworkScore: 90, totalScore: 91, letterGrade: 'A', credits: 3, gradePoint: 3.9, remarks: 'Thorough historiographical analysis' },
      { subject: 'Cellular Biology Lab', teacher: 'Dr. Sarah Al-Mansoor', term: 'Term 2 (Final)', examScore: 96, courseworkScore: 95, totalScore: 96, letterGrade: 'A+', credits: 4, gradePoint: 4.0, remarks: 'High proficiency in microscopy and lab data' },
      { subject: 'Computer Science & Logic', teacher: 'Dr. Evelyn Vance', term: 'Term 2 (Final)', examScore: 98, courseworkScore: 99, totalScore: 98, letterGrade: 'A+', credits: 3, gradePoint: 4.0, remarks: 'Demonstrates outstanding algorithmic creativity' }
    ]
  },
  's2': {
    studentId: 's2',
    term: 'Term 2 (Final)',
    academicYear: '2026-2027',
    overallGpa: 3.75,
    classRank: 6,
    totalStudentsInClass: 29,
    attendancePercent: 94.8,
    conductRemarks: 'Julian is an inquisitive student with particular strengths in physics problem-solving and collaboration.',
    teacherSignatureDate: '2026-10-14',
    subjects: [
      { subject: 'Advanced Mathematics', teacher: 'Mrs. Rebecca Sterling', term: 'Term 2 (Final)', examScore: 84, courseworkScore: 88, totalScore: 86, letterGrade: 'B+', credits: 4, gradePoint: 3.5, remarks: 'Solid foundational command' },
      { subject: 'Physics & Thermodynamics', teacher: 'Dr. Evelyn Vance', term: 'Term 2 (Final)', examScore: 93, courseworkScore: 94, totalScore: 93, letterGrade: 'A', credits: 4, gradePoint: 4.0, remarks: 'Insightful intuition for classical mechanics' },
      { subject: 'English Literature', teacher: 'Mr. David Morales', term: 'Term 2 (Final)', examScore: 82, courseworkScore: 85, totalScore: 83, letterGrade: 'B', credits: 3, gradePoint: 3.3, remarks: 'Good critical reading; focus on argument structure' },
      { subject: 'World History & Civilizations', teacher: 'Prof. Marcus Chen', term: 'Term 2 (Final)', examScore: 87, courseworkScore: 90, totalScore: 88, letterGrade: 'A-', credits: 3, gradePoint: 3.7, remarks: 'Strong source citations' },
      { subject: 'Cellular Biology Lab', teacher: 'Dr. Sarah Al-Mansoor', term: 'Term 2 (Final)', examScore: 89, courseworkScore: 91, totalScore: 90, letterGrade: 'A', credits: 4, gradePoint: 3.8, remarks: 'Accurate notebook records' },
      { subject: 'Computer Science & Logic', teacher: 'Dr. Evelyn Vance', term: 'Term 2 (Final)', examScore: 92, courseworkScore: 94, totalScore: 93, letterGrade: 'A', credits: 3, gradePoint: 4.0, remarks: 'Quick learner with modern data structures' }
    ]
  },
  's3': {
    studentId: 's3',
    term: 'Term 2 (Final)',
    academicYear: '2026-2027',
    overallGpa: 4.00,
    classRank: 1,
    totalStudentsInClass: 29,
    attendancePercent: 98.2,
    conductRemarks: 'Maya leads the class with consistent academic distinction, intellectual rigor, and humble mentorship of classmates.',
    teacherSignatureDate: '2026-10-14',
    subjects: [
      { subject: 'Advanced Mathematics', teacher: 'Mrs. Rebecca Sterling', term: 'Term 2 (Final)', examScore: 99, courseworkScore: 98, totalScore: 99, letterGrade: 'A+', credits: 4, gradePoint: 4.0, remarks: 'Top score in cohort' },
      { subject: 'Physics & Thermodynamics', teacher: 'Dr. Evelyn Vance', term: 'Term 2 (Final)', examScore: 97, courseworkScore: 98, totalScore: 97, letterGrade: 'A+', credits: 4, gradePoint: 4.0, remarks: 'Superb mathematical physics' },
      { subject: 'English Literature', teacher: 'Mr. David Morales', term: 'Term 2 (Final)', examScore: 95, courseworkScore: 97, totalScore: 96, letterGrade: 'A+', credits: 3, gradePoint: 4.0, remarks: 'Profound stylistic eloquence' },
      { subject: 'World History & Civilizations', teacher: 'Prof. Marcus Chen', term: 'Term 2 (Final)', examScore: 96, courseworkScore: 96, totalScore: 96, letterGrade: 'A+', credits: 3, gradePoint: 4.0, remarks: 'Comprehensive historical synthesis' },
      { subject: 'Cellular Biology Lab', teacher: 'Dr. Sarah Al-Mansoor', term: 'Term 2 (Final)', examScore: 98, courseworkScore: 99, totalScore: 98, letterGrade: 'A+', credits: 4, gradePoint: 4.0, remarks: 'Exemplary scientific reporting' },
      { subject: 'Computer Science & Logic', teacher: 'Dr. Evelyn Vance', term: 'Term 2 (Final)', examScore: 100, courseworkScore: 100, totalScore: 100, letterGrade: 'A+', credits: 3, gradePoint: 4.0, remarks: 'Perfect score on systems project' }
    ]
  }
};

export const INITIAL_ATTENDANCE: AttendanceRecord = {
  id: 'att-today',
  date: '2026-10-15',
  grade: 'Grade 10',
  section: 'A',
  recordedBy: 'Mrs. Rebecca Sterling',
  updatedAt: '2026-10-15T08:45:00Z',
  records: {
    's1': 'present',
    's2': 'present',
    's3': 'present',
    's4': 'late',
    's5': 'present',
    's8': 'present'
  }
};

// Storage keys
const STORAGE_PREFIX = 'horizon_sms_';

export function loadStoredData<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

export function saveStoredData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
  } catch (e) {
    console.error('Storage error:', e);
  }
}
