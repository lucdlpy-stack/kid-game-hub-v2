import React, { useState, useRef, useEffect } from 'react';
import { LeaderboardEntry, getLeaderboard, addLeaderboardEntry } from '../services/leaderboardService';
import { Trophy, Camera, RefreshCw, X, Award, Star, CheckCircle, Sparkles, UserCheck } from 'lucide-react';
import { playCorrectPopSound } from '../utils/audio';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  latestScore?: number;
  latestStars?: number;
  gameTitle?: string;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  latestScore = 500,
  latestStars = 15,
  gameTitle = 'Thế giới trò chơi'
}) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [kidName, setKidName] = useState('');
  const [snapshotImage, setSnapshotImage] = useState<string | null>(null);
  const [selectedEmojiAvatar, setSelectedEmojiAvatar] = useState('🚀');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const EMOJI_OPTIONS = ['🚀', '🌸', '🐱', '🏎️', '🦖', '🦁', '👑', '🦸', '🐼', '🦄'];

  useEffect(() => {
    if (isOpen) {
      setEntries(getLeaderboard());
      setSubmitted(false);
      setSnapshotImage(null);
    } else {
      stopCamera();
    }
  }, [isOpen]);

  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn('Camera error or permission denied:', err);
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = 240;
    canvas.height = 240;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, 240, 240);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setSnapshotImage(dataUrl);
      playCorrectPopSound();
      stopCamera();
    }
  };

  const handleSubmitScore = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = kidName.trim() || 'Bé Siêu Nhí';
    const finalAvatar = snapshotImage || selectedEmojiAvatar;

    addLeaderboardEntry({
      name: finalName,
      avatarUrl: finalAvatar,
      score: latestScore,
      stars: latestStars,
      gameTitle: gameTitle,
      badgeTitle: 'Vô Địch Mầm Non ⭐',
      isCustomSnapshot: !!snapshotImage
    });

    setEntries(getLeaderboard());
    setSubmitted(true);
    playCorrectPopSound();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border-4 border-amber-300 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 p-4 sm:p-5 text-white flex items-center justify-between border-b-4 border-amber-300">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl shadow-md">
              🏆
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-amber-950">
                Bảng Xếp Hạng Siêu Nhí 🌟
              </h2>
              <p className="text-xs font-bold text-amber-900">
                Chụp ảnh bé & vinh danh bé yêu trên màn hình Smart TV
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-amber-950 flex items-center justify-center font-black cursor-pointer transition-transform active:scale-90"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Section 1: Take Photo & Add Score Form */}
          {!submitted ? (
            <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-amber-950 text-base sm:text-lg flex items-center gap-2">
                  <Camera className="w-5 h-5 text-amber-600" />
                  <span>Chụp Ảnh Bé Vừa Chơi Xong:</span>
                </h3>
                <span className="text-xs font-black bg-amber-200 text-amber-900 px-2.5 py-1 rounded-full">
                  Score: {latestScore} pts ⭐ {latestStars}
                </span>
              </div>

              {/* Photo Snapshot Box */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-4 border-amber-400 bg-slate-900 shadow-md flex items-center justify-center shrink-0">
                  {isCameraActive ? (
                    <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                  ) : snapshotImage ? (
                    <img src={snapshotImage} alt="Bé snapshot" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-2 text-white">
                      <span className="text-4xl block mb-1">{selectedEmojiAvatar}</span>
                      <span className="text-[10px] text-amber-200">Bấm nút bên cạnh để mở camera!</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 flex-1 w-full text-center sm:text-left">
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                    {!isCameraActive ? (
                      <button
                        type="button"
                        onClick={startCamera}
                        className="py-2 px-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Camera className="w-4 h-4" />
                        <span>Mở Camera Chụp Ảnh</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={capturePhoto}
                        className="py-2 px-4 bg-rose-500 hover:bg-rose-600 text-white font-black text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer animate-pulse"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Tách Tách! Chụp Ảnh</span>
                      </button>
                    )}

                    {snapshotImage && (
                      <button
                        type="button"
                        onClick={() => {
                          setSnapshotImage(null);
                          startCamera();
                        }}
                        className="py-2 px-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-black text-xs rounded-xl flex items-center gap-1 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Chụp Lại</span>
                      </button>
                    )}
                  </div>

                  {/* Fallback Emoji Avatars */}
                  <div className="pt-1">
                    <span className="text-[11px] font-bold text-amber-800 block mb-1">
                      Hoặc chọn ảnh biểu tượng dễ thương:
                    </span>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-1.5">
                      {EMOJI_OPTIONS.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => {
                            setSnapshotImage(null);
                            setSelectedEmojiAvatar(emoji);
                          }}
                          className={`w-8 h-8 rounded-full text-lg flex items-center justify-center cursor-pointer transition-transform ${
                            !snapshotImage && selectedEmojiAvatar === emoji
                              ? 'bg-amber-400 scale-110 shadow-md ring-2 ring-amber-500'
                              : 'bg-white hover:bg-amber-100'
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Kid Name Input & Submit Button */}
              <form onSubmit={handleSubmitScore} className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-black text-amber-900 mb-1">Tên Của Bé:</label>
                  <input
                    type="text"
                    value={kidName}
                    onChange={(e) => setKidName(e.target.value)}
                    placeholder="Ví dụ: Bé Suboi, Bé Bún, Bé Miu..."
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-amber-300 font-bold text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Đưa Ảnh & Kết Quả Vào Bảng Xếp Hạng ✨</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-2xl text-center text-emerald-900 font-black text-sm flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span>Đã thêm hình ảnh bé vào Bảng Xếp Hạng thành công! 🎉</span>
            </div>
          )}

          {/* Section 2: Hall of Fame Table */}
          <div className="space-y-3">
            <h3 className="font-black text-amber-950 text-base flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              <span>Top Siêu Nhí Xuất Sắc:</span>
            </h3>

            <div className="space-y-2">
              {entries.map((item, index) => {
                const rankBadge =
                  index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`;
                const isTop3 = index < 3;

                return (
                  <div
                    key={item.id}
                    className={`p-3 rounded-2xl flex items-center justify-between gap-3 border transition-all ${
                      isTop3
                        ? 'bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 border-amber-300 shadow-sm'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Rank Number */}
                      <div className="w-8 h-8 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center font-black text-sm shadow-xs shrink-0">
                        {rankBadge}
                      </div>

                      {/* Photo Snapshot or Emoji Avatar */}
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-amber-100 border-2 border-amber-300 flex items-center justify-center shrink-0">
                        {item.avatarUrl.startsWith('data:image') ? (
                          <img src={item.avatarUrl} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-2xl">{item.avatarUrl}</span>
                        )}
                      </div>

                      {/* Name & Game details */}
                      <div>
                        <div className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
                          <span>{item.name}</span>
                          {item.badgeTitle && (
                            <span className="text-[10px] font-bold bg-yellow-200 text-yellow-900 px-2 py-0.5 rounded-full hidden sm:inline-block">
                              {item.badgeTitle}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] font-bold text-slate-500">
                          {item.gameTitle} • {item.date}
                        </div>
                      </div>
                    </div>

                    {/* Stars & Score */}
                    <div className="text-right shrink-0">
                      <div className="font-black text-amber-900 text-sm sm:text-lg">{item.score} pts</div>
                      <div className="text-xs font-bold text-yellow-600 flex items-center justify-end gap-0.5">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-500" />
                        <span>{item.stars} sao</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
