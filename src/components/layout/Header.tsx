import React from 'react';
import { UserRole } from '../../types.ts';
import { ASSETS } from '../../constants/assets.ts';
import { 
  GraduationCap, 
  UserCheck, 
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onQuickAction: (action: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  activeTab,
  onTabChange,
  onQuickAction
}) => {
  const [roleMenuOpen, setRoleMenuOpen] = React.useState(false);

  const roleLabels: Record<UserRole, { title: string; subtitle: string; name: string }> = {
    admin: { title: 'Administrator', subtitle: 'Executive Office', name: 'Dr. Eleanor Vance-Ross' },
    teacher: { title: 'Faculty / Teacher', subtitle: 'STEM Dept Head', name: 'Mrs. Rebecca Sterling' },
    student: { title: 'Student', subtitle: 'Grade 10-A', name: 'Aaliyah Patel' },
    parent: { title: 'Parent Portal', subtitle: 'Guardian', name: 'Vikram Patel' },
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between gap-8">
      {/* Zone 1: Single text element brand wordmark */}
      <div 
        onClick={() => onTabChange('dashboard')} 
        className="flex items-center gap-3 cursor-pointer shrink-0 select-none"
      >
        <div className="w-9 h-9 rounded-lg overflow-hidden border border-slate-200 bg-slate-900 flex items-center justify-center shrink-0 shadow-sm">
          <img 
            src={ASSETS.schoolCrest} 
            alt="Horizon Academy Crest" 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap">
            Horizon Academy
          </span>
          <span className="text-[11px] text-slate-500 whitespace-nowrap">
            Academic Year 2026–2027 · Term 2
          </span>
        </div>
      </div>

      {/* Zone 2: Concise single-line navigation links */}
      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
        <button
          onClick={() => onTabChange('dashboard')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 ${
            activeTab === 'dashboard' ? 'text-slate-900 font-semibold border-b-2 border-slate-900' : ''
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => onTabChange('students')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 ${
            activeTab === 'students' ? 'text-slate-900 font-semibold border-b-2 border-slate-900' : ''
          }`}
        >
          Students
        </button>
        <button
          onClick={() => onTabChange('attendance')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 ${
            activeTab === 'attendance' ? 'text-slate-900 font-semibold border-b-2 border-slate-900' : ''
          }`}
        >
          Attendance
        </button>
        <button
          onClick={() => onTabChange('grades')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 ${
            activeTab === 'grades' ? 'text-slate-900 font-semibold border-b-2 border-slate-900' : ''
          }`}
        >
          Gradebook
        </button>
        <button
          onClick={() => onTabChange('fees')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 ${
            activeTab === 'fees' ? 'text-slate-900 font-semibold border-b-2 border-slate-900' : ''
          }`}
        >
          Tuition & Fees
        </button>
      </nav>

      {/* Zone 3: 1 primary action or user role switcher */}
      <div className="flex items-center gap-3 shrink-0 relative">
        <div className="relative">
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
            title="Switch User View Role"
          >
            <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-semibold">
              {currentRole === 'admin' ? 'AD' : currentRole === 'teacher' ? 'TC' : currentRole === 'student' ? 'ST' : 'PA'}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-900 whitespace-nowrap">
                {roleLabels[currentRole].name}
              </span>
              <span className="text-[10px] text-slate-500 whitespace-nowrap">
                Role: {roleLabels[currentRole].title}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 ml-0.5" />
          </button>

          {roleMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50">
              <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Switch Portal Perspective
              </div>
              {(['admin', 'teacher', 'student', 'parent'] as UserRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    onRoleChange(role);
                    setRoleMenuOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left flex items-start gap-2.5 hover:bg-slate-50 transition-colors ${
                    currentRole === role ? 'bg-slate-50 font-medium' : ''
                  }`}
                >
                  <div className="w-6 h-6 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700 shrink-0 mt-0.5">
                    {role[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs text-slate-900 font-medium">{roleLabels[role].title}</div>
                    <div className="text-[11px] text-slate-500">{roleLabels[role].name} ({roleLabels[role].subtitle})</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {currentRole === 'admin' && (
          <button
            onClick={() => onQuickAction('enroll_student')}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            + Enroll Student
          </button>
        )}
      </div>
    </header>
  );
};
