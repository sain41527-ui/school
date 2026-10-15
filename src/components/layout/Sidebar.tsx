import React from 'react';
import { UserRole } from '../../types.ts';
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  Award, 
  Clock, 
  CreditCard, 
  Briefcase, 
  Bell, 
  Settings,
  BookOpen,
  ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentRole: UserRole;
  studentCount: number;
  unpaidFeesCount: number;
  noticeCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  currentRole,
  studentCount,
  unpaidFeesCount,
  noticeCount
}) => {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Overview & Analytics',
      icon: LayoutDashboard,
      allowedRoles: ['admin', 'teacher', 'student', 'parent']
    },
    {
      id: 'students',
      label: currentRole === 'student' ? 'My Student Profile' : currentRole === 'parent' ? 'Child Records' : 'Students Directory',
      icon: Users,
      badge: currentRole === 'admin' || currentRole === 'teacher' ? studentCount : undefined,
      allowedRoles: ['admin', 'teacher', 'student', 'parent']
    },
    {
      id: 'attendance',
      label: currentRole === 'student' || currentRole === 'parent' ? 'Attendance History' : 'Daily Roll Call',
      icon: CalendarCheck,
      allowedRoles: ['admin', 'teacher', 'student', 'parent']
    },
    {
      id: 'grades',
      label: currentRole === 'student' || currentRole === 'parent' ? 'Report Card & Marks' : 'Examinations & Grades',
      icon: Award,
      allowedRoles: ['admin', 'teacher', 'student', 'parent']
    },
    {
      id: 'timetable',
      label: 'Class Schedule',
      icon: Clock,
      allowedRoles: ['admin', 'teacher', 'student', 'parent']
    },
    {
      id: 'fees',
      label: currentRole === 'student' || currentRole === 'parent' ? 'Fee Billing & Dues' : 'Tuition & Accounts',
      icon: CreditCard,
      badge: unpaidFeesCount > 0 ? unpaidFeesCount : undefined,
      allowedRoles: ['admin', 'parent', 'student']
    },
    {
      id: 'staff',
      label: 'Faculty & Directory',
      icon: Briefcase,
      allowedRoles: ['admin', 'teacher']
    },
    {
      id: 'notices',
      label: 'Notice Board',
      icon: Bell,
      badge: noticeCount,
      allowedRoles: ['admin', 'teacher', 'student', 'parent']
    },
    {
      id: 'settings',
      label: 'Institution Settings',
      icon: Settings,
      allowedRoles: ['admin']
    }
  ];

  const visibleItems = navItems.filter(item => item.allowedRoles.includes(currentRole));

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200 min-h-[calc(100vh-61px)] flex flex-col justify-between py-5">
      <div className="px-3 space-y-1">
        <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
          Academic Management
        </div>

        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors text-left ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-md tabular-nums ${
                    isActive
                      ? 'bg-slate-800 text-slate-200'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Institutional info footer */}
      <div className="px-4 pt-4 border-t border-slate-200">
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-slate-700 shrink-0" />
            <span className="text-xs font-semibold text-slate-800">Horizon SIS v2.8</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Campus Network Status: Active
          </p>
          <div className="mt-2 text-[10px] text-slate-400">
            Current Term: Fall Semester 2026
          </div>
        </div>
      </div>
    </aside>
  );
};
