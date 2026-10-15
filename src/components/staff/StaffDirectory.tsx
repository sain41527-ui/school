import React, { useState } from 'react';
import { StaffMember, UserRole } from '../../types.ts';
import { 
  Briefcase, 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  GraduationCap, 
  BookOpen, 
  Trash2 
} from 'lucide-react';

interface StaffDirectoryProps {
  staff: StaffMember[];
  onAddStaff: (newStaff: Omit<StaffMember, 'id'>) => void;
  onDeleteStaff: (id: string) => void;
  currentRole: UserRole;
}

export const StaffDirectory: React.FC<StaffDirectoryProps> = ({
  staff,
  onAddStaff,
  onDeleteStaff,
  currentRole
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    employeeId: `FAC-${1000 + staff.length + 1}`,
    name: '',
    designation: 'Senior Faculty',
    department: 'STEM & Sciences' as StaffMember['department'],
    email: '',
    phone: '+1 (555) 234-0000',
    joinDate: '2026-09-01',
    qualification: 'M.Sc. in Subject Area',
    assignedClasses: ['Grade 10-A Science', 'Grade 11-Science Physics'],
    status: 'active' as 'active' | 'on_leave'
  });

  const filteredStaff = staff.filter(member => {
    const matchSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.designation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchDept = departmentFilter === 'all' || member.department === departmentFilter;

    return matchSearch && matchDept;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    onAddStaff({
      ...formData,
      email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, '.')}@horizon.edu`
    });

    setAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Faculty & Academic Staff Directory
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Institutional directory of educators, researchers, and department chairs
          </p>
        </div>

        {currentRole === 'admin' && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              Add Faculty Member
            </button>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by instructor, ID, or title..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none text-slate-700"
          >
            <option value="all">All Departments</option>
            <option value="STEM & Sciences">STEM & Sciences</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Humanities & Arts">Humanities & Arts</option>
            <option value="Languages">Languages</option>
            <option value="Administration">Institutional Administration</option>
          </select>
        </div>
      </div>

      {/* Staff Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStaff.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {member.name.split(' ').map(n => n[0]).slice(-2).join('')}
                </div>
                <div className="text-right">
                  <span className="font-mono text-[11px] text-slate-500 block">
                    {member.employeeId}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block mt-0.5">
                    {member.status === 'active' ? 'ACTIVE' : 'ON LEAVE'}
                  </span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-900">{member.name}</h3>
              <p className="text-xs text-blue-700 font-medium mb-1">{member.designation}</p>
              <p className="text-[11px] text-slate-500 mb-3">{member.department}</p>

              <div className="space-y-1.5 py-3 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-[11px] truncate">{member.qualification}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-[11px] font-mono truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-[11px] font-mono">{member.phone}</span>
                </div>
              </div>

              {/* Workload / Assigned Courses */}
              <div className="pt-2 border-t border-slate-100">
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Assigned Cohorts & Courses
                </div>
                <div className="flex flex-wrap gap-1">
                  {member.assignedClasses.map((cls, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] bg-slate-100 text-slate-700 rounded font-medium"
                    >
                      {cls}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {currentRole === 'admin' && (
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => {
                    if (confirm(`Remove faculty record for ${member.name}?`)) {
                      onDeleteStaff(member.id);
                    }
                  }}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded transition-colors"
                  title="Remove Faculty Member"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Staff Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Add Faculty / Staff Member
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Register educational instructor or administrative officer.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Julian Thorne"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Employee ID</label>
                  <input
                    type="text"
                    required
                    value={formData.employeeId}
                    onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  >
                    <option value="STEM & Sciences">STEM & Sciences</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Humanities & Arts">Humanities & Arts</option>
                    <option value="Languages">Languages</option>
                    <option value="Administration">Administration</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Academic Designation</label>
                <input
                  type="text"
                  required
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  placeholder="e.g. Associate Professor in Organic Chemistry"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Highest Qualification</label>
                <input
                  type="text"
                  required
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  placeholder="e.g. Ph.D. in Chemistry, Stanford"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@horizon.edu"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 shadow-xs"
                >
                  Save Faculty Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
