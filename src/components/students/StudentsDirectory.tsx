import React, { useState, useMemo } from 'react';
import { Student, UserRole } from '../../types.ts';
import { 
  Search, 
  Filter, 
  Plus, 
  FileText, 
  Award, 
  Eye, 
  Trash2, 
  Check, 
  AlertCircle 
} from 'lucide-react';

interface StudentsDirectoryProps {
  students: Student[];
  onAddStudent: (newStudent: Omit<Student, 'id' | 'admissionNo'>) => void;
  onDeleteStudent: (id: string) => void;
  onSelectStudent: (student: Student) => void;
  onOpenIDCard: (student: Student) => void;
  onOpenReportCard: (student: Student) => void;
  currentRole: UserRole;
  enrollModalOpen: boolean;
  setEnrollModalOpen: (open: boolean) => void;
}

export const StudentsDirectory: React.FC<StudentsDirectoryProps> = ({
  students,
  onAddStudent,
  onDeleteStudent,
  onSelectStudent,
  onOpenIDCard,
  onOpenReportCard,
  currentRole,
  enrollModalOpen,
  setEnrollModalOpen
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // New Student Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    rollNumber: '',
    grade: 'Grade 10',
    section: 'A',
    dob: '2010-05-15',
    gender: 'Female' as 'Male' | 'Female' | 'Other',
    bloodGroup: 'O+',
    email: '',
    phone: '+1 (555) 000-0000',
    address: 'Springfield, CA',
    guardianName: '',
    guardianRelation: 'Parent',
    guardianPhone: '+1 (555) 000-0000',
    guardianEmail: '',
    enrollmentDate: '2026-09-01',
    status: 'active' as 'active' | 'leave' | 'transferred',
    attendanceRate: 98.0,
    gpa: 3.80,
    emergencyContact: '+1 (555) 000-0000'
  });

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchSearch = 
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.admissionNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.guardianName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchGrade = selectedGrade === 'all' || `${s.grade} - ${s.section}` === selectedGrade || s.grade === selectedGrade;
      const matchStatus = selectedStatus === 'all' || s.status === selectedStatus;

      return matchSearch && matchGrade && matchStatus;
    });
  }, [students, searchQuery, selectedGrade, selectedStatus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.rollNumber) {
      alert('Please fill all required student details');
      return;
    }

    onAddStudent({
      ...formData,
      email: formData.email || `${formData.firstName.toLowerCase()}.${formData.lastName.toLowerCase()}@horizon.edu`,
      guardianEmail: formData.guardianEmail || `${formData.guardianName.toLowerCase().replace(/\s+/g, '.')}@horizonparent.net`
    });

    setEnrollModalOpen(false);
    // Reset
    setFormData({
      firstName: '',
      lastName: '',
      rollNumber: '',
      grade: 'Grade 10',
      section: 'A',
      dob: '2010-05-15',
      gender: 'Female',
      bloodGroup: 'O+',
      email: '',
      phone: '+1 (555) 000-0000',
      address: 'Springfield, CA',
      guardianName: '',
      guardianRelation: 'Parent',
      guardianPhone: '+1 (555) 000-0000',
      guardianEmail: '',
      enrollmentDate: '2026-09-01',
      status: 'active',
      attendanceRate: 98.0,
      gpa: 3.80,
      emergencyContact: '+1 (555) 000-0000'
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner and Filter Control */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Student Academic Registry
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Institutional roster · {students.length} Total Enrolled · Academic Year 2026–2027
          </p>
        </div>

        <div className="flex items-center gap-3">
          {currentRole === 'admin' && (
            <button
              onClick={() => setEnrollModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              Enroll Student
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student, roll #, or guardian..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none text-slate-700"
          >
            <option value="all">All Grades & Sections</option>
            <option value="Grade 9">Grade 9 (All)</option>
            <option value="Grade 10">Grade 10 (All)</option>
            <option value="Grade 10 - A">Grade 10 - Section A</option>
            <option value="Grade 11">Grade 11 - Science</option>
            <option value="Grade 12">Grade 12 - AP</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none text-slate-700"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Standing</option>
            <option value="leave">On Leave</option>
            <option value="transferred">Transferred</option>
          </select>
        </div>
      </div>

      {/* Student Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Roll #</th>
                <th className="py-3 px-4">Student & Admission</th>
                <th className="py-3 px-4">Class</th>
                <th className="py-3 px-4">Guardian Details</th>
                <th className="py-3 px-4 text-center">Attendance</th>
                <th className="py-3 px-4 text-right">Cumulative GPA</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-slate-700 tabular-nums">
                      #{student.rollNumber}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {student.firstName[0]}{student.lastName[0]}
                        </div>
                        <div>
                          <button
                            onClick={() => onSelectStudent(student)}
                            className="font-semibold text-slate-900 hover:text-blue-600 transition-colors text-left"
                          >
                            {student.firstName} {student.lastName}
                          </button>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {student.admissionNo} · {student.gender}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-800">{student.grade}</span>
                      <span className="text-slate-400 block text-[11px]">Section {student.section}</span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-800">{student.guardianName}</div>
                      <div className="text-[10px] text-slate-400">{student.guardianPhone}</div>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className="font-semibold text-slate-900 tabular-nums">
                        {student.attendanceRate}%
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 tabular-nums">
                      {student.gpa.toFixed(2)}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onSelectStudent(student)}
                          title="View Complete File"
                          className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onOpenIDCard(student)}
                          title="Print Student ID Card"
                          className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onOpenReportCard(student)}
                          title="View Official Report Card"
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                        >
                          <Award className="w-4 h-4" />
                        </button>
                        {currentRole === 'admin' && (
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to remove ${student.firstName} ${student.lastName}?`)) {
                                onDeleteStudent(student.id);
                              }
                            }}
                            title="Remove Student Record"
                            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <p className="text-sm font-medium">No students match your criteria.</p>
                    <p className="text-xs text-slate-400 mt-1">Try clearing search filters or add a new enrollment.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enroll Student Modal */}
      {enrollModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl relative border border-slate-200 my-8">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Enroll New Student
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter official student identification and guardian information.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="e.g. Liam"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="e.g. Brennan"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Roll Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.rollNumber}
                    onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                    placeholder="e.g. 108"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Grade Level</label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  >
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Section</label>
                  <select
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  >
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="Science">Science Focus</option>
                    <option value="AP">Advanced Placement</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Blood Group</label>
                  <input
                    type="text"
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    placeholder="e.g. O+, A-, B+"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div className="col-span-2 pt-2 border-t border-slate-100">
                  <h4 className="font-bold text-slate-800 mb-2">Guardian Contact Information</h4>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Guardian Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.guardianName}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                    placeholder="e.g. Michael Brennan"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Guardian Phone *</label>
                  <input
                    type="text"
                    required
                    value={formData.guardianPhone}
                    onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block font-medium text-slate-700 mb-1">Residential Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Street address, city, state"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEnrollModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
                >
                  Complete Enrollment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
