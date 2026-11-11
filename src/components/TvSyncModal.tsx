import React, { useState } from 'react';
import { getSyncLogs, resetGamesToDefault } from '../services/githubTvSync';
import { GithubSyncResult } from '../types/game';
import { Tv, GitBranch, RefreshCw, X, Check, ShieldCheck, Terminal, Trash2 } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface TvSyncModalProps {
  onClose: () => void;
  onResetDone: () => void;
}

export const TvSyncModal: React.FC<TvSyncModalProps> = ({ onClose, onResetDone }) => {
  const [logs] = useState<GithubSyncResult[]>(getSyncLogs());
  const [isResetting, setIsResetting] = useState(false);

  const handleReset = () => {
    if (confirm('Bé hoặc phụ huynh có muốn đặt lại danh sách trò chơi về mặc định không?')) {
      playClickSound();
      setIsResetting(true);
      resetGamesToDefault();
      setTimeout(() => {
        setIsResetting(false);
        onResetDone();
        onClose();
      }, 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border-4 border-sky-300 shadow-2xl p-6 sm:p-8 my-8 text-slate-900 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-sky-200 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center text-2xl shadow-md">
              <Tv className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Đồng Bộ Smart TV & GitHub
              </h2>
              <p className="text-xs font-bold text-sky-800">
                Trung tâm phát sóng và lưu trữ trò chơi mầm non Kid Game Hub
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* TV Pairing Box */}
        <div className="bg-gradient-to-r from-sky-50 to-indigo-50 rounded-2xl p-5 border-2 border-sky-200 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-black text-slate-900 text-sm">Trạng thái kết nối Smart TV</span>
            </div>
            <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
              Sẵn Sàng Phát Sóng
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-white p-3 rounded-xl border border-sky-100 shadow-xs">
              <div className="text-slate-500 font-bold mb-1">Mã Ghép Nối TV (PIN)</div>
              <div className="text-xl font-black text-sky-700 tracking-widest font-mono">
                KID-2026
              </div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-sky-100 shadow-xs">
              <div className="text-slate-500 font-bold mb-1">Giao thức truyền dữ liệu</div>
              <div className="text-sm font-black text-indigo-700">
                BroadcastChannel + WebHook
              </div>
            </div>
          </div>
        </div>

        {/* GitHub Repository Status */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-slate-700" />
              <span>Nhật Ký Cập Nhật GitHub & Smart TV:</span>
            </span>
            <span className="text-xs font-bold text-slate-500">{logs.length} bản ghi</span>
          </div>

          {logs.length === 0 ? (
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center text-xs font-bold text-slate-500">
              Chưa có bản commit mới nào từ Kiến Trúc Sư Game. Bấm "Tạo Game Mới" để tạo và gọi hàm <code className="text-amber-800">push_game_to_github</code>!
            </div>
          ) : (
            <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
              {logs.map((log, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-900 text-slate-200 rounded-xl text-xs font-mono border border-slate-800"
                >
                  <div className="flex items-center justify-between text-emerald-400 font-bold mb-1">
                    <span>Commit #{log.commitHash}</span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(log.timestamp).toLocaleTimeString('vi-VN')}
                    </span>
                  </div>
                  <div className="text-slate-300 truncate">{log.message}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reset Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
          <button
            onClick={handleReset}
            disabled={isResetting}
            className="w-full sm:w-auto px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Khôi Phục Game Mặc Định</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
