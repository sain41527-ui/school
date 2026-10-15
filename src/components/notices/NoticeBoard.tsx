import React, { useState } from 'react';
import { Notice, UserRole } from '../../types.ts';
import { 
  Bell, 
  Search, 
  Plus, 
  Pin, 
  AlertCircle, 
  Calendar, 
  User, 
  Trash2,
  CheckCircle2
} from 'lucide-react';

interface NoticeBoardProps {
  notices: Notice[];
  onAddNotice: (notice: Omit<Notice, 'id'>) => void;
  onDeleteNotice: (id: string) => void;
  currentRole: UserRole;
  postModalOpen: boolean;
  setPostModalOpen: (open: boolean) => void;
}

export const NoticeBoard: React.FC<NoticeBoardProps> = ({
  notices,
  onAddNotice,
  onDeleteNotice,
  currentRole,
  postModalOpen,
  setPostModalOpen
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [audienceFilter, setAudienceFilter] = useState<'all' | 'teachers' | 'students' | 'parents'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [formData, setFormData] = useState({
    title: '',
    category: 'Academic' as Notice['category'],
    targetAudience: 'all' as Notice['targetAudience'],
    date: '2026-10-15',
    author: currentRole === 'admin' ? 'Office of the Principal' : 'Department Faculty',
    content: '',
    isPinned: false,
    priority: 'normal' as 'normal' | 'high' | 'urgent'
  });

  const filteredNotices = notices.filter(n => {
    const matchSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchAudience = audienceFilter === 'all' || n.targetAudience === 'all' || n.targetAudience === audienceFilter;
    const matchCategory = categoryFilter === 'all' || n.category === categoryFilter;

    return matchSearch && matchAudience && matchCategory;
  });

  // Sort pinned first
  const sortedNotices = [...filteredNotices].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    onAddNotice(formData);
    setPostModalOpen(false);
    setFormData({
      title: '',
      category: 'Academic',
      targetAudience: 'all',
      date: '2026-10-15',
      author: 'Office of Academic Affairs',
      content: '',
      isPinned: false,
      priority: 'normal'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Campus Bulletin & Institutional Notices
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Official announcements, academic calendars, and administrative circulars
          </p>
        </div>

        {currentRole === 'admin' && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPostModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              Publish Announcement
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
            placeholder="Search circulars, guidelines, keywords..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Segmented controls for audience */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs">
            <button
              onClick={() => setAudienceFilter('all')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                audienceFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Audiences
            </button>
            <button
              onClick={() => setAudienceFilter('students')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                audienceFilter === 'students' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Students
            </button>
            <button
              onClick={() => setAudienceFilter('teachers')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                audienceFilter === 'teachers' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Faculty
            </button>
            <button
              onClick={() => setAudienceFilter('parents')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                audienceFilter === 'parents' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Parents
            </button>
          </div>
        </div>
      </div>

      {/* Notices Feed */}
      <div className="space-y-4">
        {sortedNotices.length > 0 ? (
          sortedNotices.map((notice) => (
            <div
              key={notice.id}
              className={`bg-white rounded-xl border p-5 shadow-xs transition-all ${
                notice.isPinned ? 'border-amber-300 ring-1 ring-amber-100' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  {notice.isPinned && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      <Pin className="w-3 h-3 text-amber-600" />
                      PINNED CIRCULAR
                    </span>
                  )}
                  <span className="font-semibold text-slate-700">
                    {notice.category}
                  </span>
                  <span aria-hidden="true" className="text-slate-400">·</span>
                  <span className="text-slate-500">Audience: {notice.targetAudience.toUpperCase()}</span>
                  <span aria-hidden="true" className="text-slate-400">·</span>
                  <span className="font-mono text-slate-500 tabular-nums">{notice.date}</span>
                </div>

                {currentRole === 'admin' && (
                  <button
                    onClick={() => {
                      if (confirm('Delete this campus announcement?')) {
                        onDeleteNotice(notice.id);
                      }
                    }}
                    className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors"
                    title="Remove Notice"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <h2 className="text-base font-bold text-slate-900 mb-2">{notice.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line mb-3">
                {notice.content}
              </p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>Issued by: {notice.author}</span>
                </div>
                <span>Ref: NOT-{notice.id.toUpperCase()}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center bg-white rounded-xl border border-slate-200 text-slate-400">
            <Bell className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            <p className="text-sm font-medium">No notices found matching current filter.</p>
          </div>
        )}
      </div>

      {/* Post Notice Modal */}
      {postModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Publish Campus Announcement
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Disseminate information to students, teachers, or parents.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Circular Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Schedule for Mid-Term Laboratory Practicals"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  >
                    <option value="Academic">Academic</option>
                    <option value="Administrative">Administrative</option>
                    <option value="Event">Event</option>
                    <option value="Sports">Sports</option>
                    <option value="Holiday">Holiday</option>
                    <option value="Notice">General Notice</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Target Audience</label>
                  <select
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  >
                    <option value="all">All Stakeholders</option>
                    <option value="students">Students Only</option>
                    <option value="teachers">Teaching Faculty Only</option>
                    <option value="parents">Parents / Guardians Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Issued By / Department</label>
                <input
                  type="text"
                  required
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="e.g. Office of Student Affairs"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Announcement Body *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Provide clear details, deadlines, and contact coordinates..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isPinned"
                  checked={formData.isPinned}
                  onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                  className="rounded border-slate-300"
                />
                <label htmlFor="isPinned" className="text-slate-700 font-medium">
                  Pin to top of bulletin board
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setPostModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 shadow-xs"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
