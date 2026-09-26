import React, { useState } from 'react';
import {
  FolderArchive,
  Upload,
  Trophy,
  FileText,
  Trash2,
  ExternalLink,
  Plus,
  X,
  CheckCircle2,
  Lock,
  Sparkles,
  Flame,
  Award,
  Code2,
  Rocket,
  Bot
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ViewVaultAchievements = () => {
  const {
    uploads,
    addUpload,
    deleteUpload,
    achievements,
    showToast,
    triggerCelebration
  } = useApp();

  const [activeTab, setActiveTab] = useState('vault'); // 'vault' or 'achievements'
  const [selectedType, setSelectedType] = useState('All');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('Resume');

  const uploadTypes = [
    'All',
    'PDFs',
    'Notes',
    'Screenshots',
    'Certificates',
    'Resume',
    'Project Resources'
  ];

  const filteredUploads = uploads.filter(u => {
    if (selectedType === 'All') return true;
    return u.type.toLowerCase() === selectedType.toLowerCase();
  });

  const getAchievementIcon = (iconName) => {
    switch (iconName) {
      case 'CheckCircle2': return <CheckCircle2 size={24} className="text-[#0EA5E9]" />;
      case 'Flame': return <Flame size={24} className="text-amber-500" />;
      case 'Award': return <Award size={24} className="text-purple-600" />;
      case 'Code2': return <Code2 size={24} className="text-emerald-600" />;
      case 'Rocket': return <Rocket size={24} className="text-blue-500" />;
      case 'Bot': return <Bot size={24} className="text-indigo-600" />;
      case 'Trophy': return <Trophy size={24} className="text-amber-400" />;
      default: return <Award size={24} className="text-[#0EA5E9]" />;
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast('Please provide a file or resource title', 'error');
      return;
    }

    addUpload({
      title: newTitle.trim(),
      type: newType,
      size: `${(Math.random() * 2 + 0.3).toFixed(1)} MB`,
      url: '#'
    });

    setNewTitle('');
    setIsUploadModalOpen(false);
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-sm border border-[#DCE9F6] shadow-[0_4px_20px_rgba(12,74,110,0.04)] flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD] flex items-center justify-center font-black">
              {activeTab === 'vault' ? <FolderArchive size={20} /> : <Trophy size={20} />}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {activeTab === 'vault' ? 'Resource Vault & Uploads' : 'Milestone Achievements & Badges'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-medium ml-0 sm:ml-11.5">
            {activeTab === 'vault'
              ? 'Store certificates, resumes, PDFs, notes, and assets with Cloudinary vault integration.'
              : 'Trophies and milestones unlocked on your Winter Arc journey.'}
          </p>
        </div>

        {/* Tab Toggle & Action Button */}
        <div className="flex items-center gap-3 self-stretch md:self-auto">
          <div className="flex p-1 rounded-2xl bg-[#EDF4FA] border border-[#DCE9F6]">
            <button
              onClick={() => setActiveTab('vault')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'vault'
                  ? 'bg-white text-slate-900 border border-[#BAE6FD] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Vault ({uploads.length})
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'achievements'
                  ? 'bg-white text-slate-900 border border-[#BAE6FD] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Badges ({unlockedCount}/{achievements.length})
            </button>
          </div>

          {activeTab === 'vault' && (
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="btn-primary-blue text-xs font-bold px-4 py-2 shrink-0 shadow-sm"
            >
              <Upload size={15} strokeWidth={2.8} />
              <span>Upload</span>
            </button>
          )}
        </div>
      </div>

      {/* =========================================================
          TAB 1: RESOURCE VAULT / FILE UPLOADS
          ========================================================= */}
      {activeTab === 'vault' && (
        <div className="flex flex-col gap-5">
          {/* Type Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {uploadTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                  selectedType === type
                    ? 'bg-gradient-to-r from-[#E0F2FE] to-[#F0F9FF] text-[#0F172A] border border-[#0EA5E9] shadow-xs font-black'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-[#DCE9F6] hover:border-[#BAE6FD]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Files Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUploads.map(file => (
              <div
                key={file.id}
                className="p-5 rounded-2xl bg-white/95 backdrop-blur-sm border border-[#DCE9F6] shadow-[0_2px_12px_rgba(12,74,110,0.03)] hover:shadow-md hover:border-[#BAE6FD] transition-all flex flex-col justify-between gap-4 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD] flex items-center justify-center shrink-0">
                    <FileText size={20} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {file.type}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900 break-words line-clamp-2">
                    {file.title}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium mt-1">
                    <span>{file.size}</span>
                    <span>•</span>
                    <span>{file.date}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={file.url}
                    onClick={(e) => {
                      e.preventDefault();
                      showToast(`Opening ${file.title}...`);
                    }}
                    className="text-xs font-bold text-[#0284C7] hover:underline flex items-center gap-1"
                  >
                    <ExternalLink size={13} />
                    <span>View File</span>
                  </a>

                  <button
                    onClick={() => deleteUpload(file.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete resource"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: ACHIEVEMENT TROPHIES
          ========================================================= */}
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between gap-5 ${
                ach.unlocked
                  ? 'bg-white/95 backdrop-blur-sm border border-[#DCE9F6] shadow-[0_4px_20px_rgba(12,74,110,0.04)]'
                  : 'bg-slate-50/70 border-dashed border-[#DCE9F6] opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  ach.unlocked ? 'bg-[#F0F9FF] border border-[#BAE6FD]' : 'bg-slate-200 text-slate-400'
                }`}>
                  {ach.unlocked ? getAchievementIcon(ach.icon) : <Lock size={20} />}
                </div>

                {ach.unlocked ? (
                  <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Unlocked
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Locked
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <h4 className="text-base font-black text-slate-900">{ach.title}</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {ach.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-400">
                  {ach.unlocked ? `Achieved: ${ach.unlockedAt}` : 'Milestone in progress'}
                </span>
                {ach.unlocked && (
                  <Sparkles size={14} className="text-amber-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="modal-backdrop-overlay">
          <div className="w-full max-w-md bg-white border border-[#DCE9F6] rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Upload size={18} className="text-[#0EA5E9]" />
                <h3 className="text-base font-black text-slate-900">Upload to Resource Vault</h3>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="flex flex-col gap-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Resource Title / File Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AWS_Solutions_Architect_Certificate.pdf"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Resource Category
                </label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 bg-white"
                >
                  <option value="Resume">Resume</option>
                  <option value="PDFs">PDFs</option>
                  <option value="Notes">Notes</option>
                  <option value="Screenshots">Screenshots</option>
                  <option value="Certificates">Certificates</option>
                  <option value="Project Resources">Project Resources</option>
                </select>
              </div>

              {/* Simulated Cloudinary Dropzone */}
              <div className="border-2 border-dashed border-[#DCE9F6] hover:border-[#0EA5E9] rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-[#F8FAFD]">
                <Upload size={22} className="text-[#0EA5E9]" />
                <span className="text-xs font-bold text-slate-700">Choose file or drag & drop</span>
                <span className="text-[10px] text-slate-400">PDF, PNG, JPG, JSON up to 10MB</span>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="btn-secondary-white px-4 py-2 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary-blue px-4 py-2 text-xs font-bold"
                >
                  <Upload size={15} strokeWidth={2.8} />
                  <span>Upload Resource</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
