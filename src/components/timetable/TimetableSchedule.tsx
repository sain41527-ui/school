import React, { useState } from 'react';
import { TimetableSlot, UserRole } from '../../types.ts';
import { Clock, Calendar, Plus, MapPin, User, BookOpen } from 'lucide-react';

interface TimetableScheduleProps {
  timetable: TimetableSlot[];
  onAddSlot: (slot: Omit<TimetableSlot, 'id'>) => void;
  currentRole: UserRole;
}

export const TimetableSchedule: React.FC<TimetableScheduleProps> = ({
  timetable,
  onAddSlot,
  currentRole
}) => {
  const [selectedGrade, setSelectedGrade] = useState('Grade 10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [addModalOpen, setAddModalOpen] = useState(false);

  // New slot form state
  const [newSlot, setNewSlot] = useState({
    day: 'Monday' as 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday',
    period: 1,
    timeRange: '08:30 - 09:20',
    subject: 'Advanced Mathematics',
    teacherName: 'Mrs. Rebecca Sterling',
    room: 'Room 304',
    grade: 'Grade 10',
    section: 'A'
  });

  const days: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday')[] = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
  ];

  const periods = [1, 2, 3, 4, 5, 6, 7];

  const filteredSlots = timetable.filter(
    s => s.grade === selectedGrade && (selectedSection === 'all' || s.section === selectedSection)
  );

  const getSlot = (day: string, period: number) => {
    return filteredSlots.find(s => s.day === day && s.period === period);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddSlot(newSlot);
    setAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Institutional Master Timetable
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Weekly academic schedule, room allocations, and period rotations
          </p>
        </div>

        <div className="flex items-center gap-3">
          {currentRole === 'admin' && (
            <button
              onClick={() => setAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              Add Class Period
            </button>
          )}
        </div>
      </div>

      {/* Grade Selector */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-700">Filter Schedule:</span>
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

        <div className="text-slate-500 text-[11px]">
          Classes run daily from 08:30 to 15:30 with 45-min instructional periods.
        </div>
      </div>

      {/* Timetable Grid View */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-3 px-3 w-28 border-r border-slate-200 text-center">Day / Time</th>
                {periods.map((p) => (
                  <th key={p} className="py-3 px-3 min-w-[150px] border-r border-slate-200 text-center">
                    <div>Period {p}</div>
                    <span className="text-[10px] font-normal text-slate-400 font-mono">
                      {p === 1 && '08:30 - 09:20'}
                      {p === 2 && '09:25 - 10:15'}
                      {p === 3 && '10:30 - 11:20'}
                      {p === 4 && '11:25 - 12:15'}
                      {p === 5 && '13:00 - 13:50'}
                      {p === 6 && '13:55 - 14:45'}
                      {p === 7 && '14:50 - 15:30'}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {days.map((day) => (
                <tr key={day} className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-bold text-slate-800 bg-slate-50/70 border-r border-slate-200 text-center">
                    {day}
                  </td>
                  {periods.map((p) => {
                    const slot = getSlot(day, p);
                    return (
                      <td key={p} className="py-2.5 px-2.5 border-r border-slate-200 align-top">
                        {slot ? (
                          <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 transition-all shadow-2xs">
                            <h4 className="font-bold text-slate-900 line-clamp-1 leading-snug">
                              {slot.subject}
                            </h4>
                            <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                              <User className="w-3 h-3 shrink-0" />
                              <span className="truncate">{slot.teacherName}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-blue-700 font-medium mt-1">
                              <MapPin className="w-3 h-3 shrink-0" />
                              <span>{slot.room}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="h-16 rounded-lg border border-dashed border-slate-200 flex items-center justify-center text-[10px] text-slate-400">
                            Study Recess
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Slot Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Add Timetable Period
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Schedule an instructional period for {selectedGrade} ({selectedSection}).
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Day of Week</label>
                <select
                  value={newSlot.day}
                  onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                >
                  {days.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Period #</label>
                  <select
                    value={newSlot.period}
                    onChange={(e) => setNewSlot({ ...newSlot, period: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  >
                    {periods.map(p => <option key={p} value={p}>Period {p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Time Range</label>
                  <input
                    type="text"
                    value={newSlot.timeRange}
                    onChange={(e) => setNewSlot({ ...newSlot, timeRange: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={newSlot.subject}
                  onChange={(e) => setNewSlot({ ...newSlot, subject: e.target.value })}
                  placeholder="e.g. World History & Civilizations"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Faculty Teacher</label>
                  <input
                    type="text"
                    required
                    value={newSlot.teacherName}
                    onChange={(e) => setNewSlot({ ...newSlot, teacherName: e.target.value })}
                    placeholder="e.g. Prof. Marcus Chen"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Room / Lab</label>
                  <input
                    type="text"
                    required
                    value={newSlot.room}
                    onChange={(e) => setNewSlot({ ...newSlot, room: e.target.value })}
                    placeholder="e.g. Room 304"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
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
                  Save Period
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
