import React, { useState } from 'react';
import { Game, QuizGame, MatchingPuzzleGame, GithubSyncResult } from '../types/game';
import { push_game_to_github } from '../services/githubTvSync';
import { playCorrectSound, playWrongSound, playClickSound } from '../utils/audio';
import {
  X,
  Send,
  GitCommit,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Tv,
  FileCode2,
  Copy,
  Check
} from 'lucide-react';

interface GameArchitectModalProps {
  onClose: () => void;
  onGameAdded: (game: Game) => void;
}

// Preset ideas ready to be generated and pushed
const PRESET_IDEAS: Game[] = [
  {
    id: 'game_hoa_co_thien_nhien',
    title: 'Ghép Đôi Hoa Cỏ & Thiên Nhiên',
    icon: '🌸',
    ageGroup: '3-5 tuổi',
    gameType: 'matching_puzzle',
    description: 'Bé khám phá hoa hồng, hoa sen, chú ong chăm chỉ và giọt sương mai!',
    puzzlePairs: [
      { id: 'p1', name: 'Bông Hoa Sen Hồng', symbol: '🪷', matchTarget: 'Hồ Nước Mát Lành', targetSymbol: '🌊', hint: 'Hoa sen thơm ngát nở trong đầm nước mát lành!' },
      { id: 'p2', name: 'Chú Ong Vàng Chăm Chỉ', symbol: '🐝', matchTarget: 'Mật Hoa Ngọt Ngào', targetSymbol: '🍯', hint: 'Chú ong bay lượn hút mật hoa về tổ!' },
      { id: 'p3', name: 'Cây Nấm Nhỏ Xinh', symbol: '🍄', matchTarget: 'Cơn Mưa Rào Rì Rào', targetSymbol: '🌧️', hint: 'Sau cơn mưa rào, nấm mọc lên rực rỡ!' },
      { id: 'p4', name: 'Bé Bướm Cánh Tiên', symbol: '🦋', matchTarget: 'Vườn Hoa Rực Rỡ', targetSymbol: '🌺', hint: 'Bướm xinh rập rờn bên những cánh hoa tươi!' },
      { id: 'p5', name: 'Cây Bồ Công Anh', symbol: '🌾', matchTarget: 'Làn Gió Nhẹ Bay', targetSymbol: '🍃', hint: 'Gió thổi cánh hoa bồ công anh bay xa!' },
      { id: 'p6', name: 'Mầm Cây Non Mướt', symbol: '🌱', matchTarget: 'Mặt Trời Tỏa Nắng', targetSymbol: '☀️', hint: 'Ánh nắng ấm áp giúp mầm non lớn nhanh!' }
    ]
  },
  {
    id: 'game_tap_dem_hoa_qua',
    title: 'Bé Tập Đếm & Nhận Biết Trái Cây',
    icon: '🍎',
    ageGroup: '3-5 tuổi',
    gameType: 'quiz',
    description: 'Bé vui học đếm từ 1 đến 5 và khám phá các loại quả ngon ngọt thơm mát!',
    interactiveQuestions: [
      {
        question: 'Quả gì có vỏ đỏ mọng, hạt li ti bên ngoài và ăn có vị chua ngọt?',
        options: ['Quả Dâu Tây', 'Quả Bơ Sáp', 'Củ Khoai Tây'],
        correctAnswer: 'Quả Dâu Tây',
        timeLimit: 15,
        hint: 'Quả dâu tây nhỏ xinh bé hay ăn cùng sữa chua!',
        soundType: 'bell',
        emoji: '🍓'
      },
      {
        question: 'Quả cam có hình tròn xoe, bé đếm xem trong hình có mấy quả cam nhé: 🍊 🍊 🍊 ?',
        options: ['3 Quả Cam', '1 Quả Cam', '5 Quả Cam'],
        correctAnswer: '3 Quả Cam',
        timeLimit: 15,
        hint: 'Bé cùng đếm: Một... Hai... Ba!',
        soundType: 'bell',
        emoji: '🍊'
      },
      {
        question: 'Quả gì vỏ xanh ruột đỏ, nhiều hạt đen, ăn vào mùa hè mát rượi?',
        options: ['Quả Dưa Hấu', 'Quả Chuối Tiêu', 'Quả Ớt Cay'],
        correctAnswer: 'Quả Dưa Hấu',
        timeLimit: 15,
        hint: 'Dưa hấu bổ ra từng miếng tam giác đỏ tươi ngọt mát!',
        soundType: 'bell',
        emoji: '🍉'
      },
      {
        question: 'Trái táo đỏ ngọt ngào: 🍎 🍎. Bé đếm xem có bao nhiêu trái táo đỏ?',
        options: ['2 Trái Táo', '4 Trái Táo', '1 Trái Táo'],
        correctAnswer: '2 Trái Táo',
        timeLimit: 15,
        hint: 'Bé đếm: Một trái táo, hai trái táo!',
        soundType: 'bell',
        emoji: '🍎'
      },
      {
        question: 'Quả gì mọc thành từng nải, khi chín màu vàng óng và chú khỉ rất thích?',
        options: ['Quả Chuối Chín', 'Quả Chanh Chua', 'Quả Dừa Xiêm'],
        correctAnswer: 'Quả Chuối Chín',
        timeLimit: 15,
        hint: 'Quả chuối ngọt mềm rất bổ dưỡng cho bé!',
        soundType: 'bell',
        emoji: '🍌'
      },
      {
        question: 'Bé đếm xem có mấy trái nho tím mọng nước nhé: 🍇',
        options: ['1 Chùm Nho', '3 Chùm Nho', '6 Chùm Nho'],
        correctAnswer: '1 Chùm Nho',
        timeLimit: 15,
        hint: 'Có duy nhất một chùm nho tròn xoe tím biếc!',
        soundType: 'bell',
        emoji: '🍇'
      }
    ]
  },
  {
    id: 'game_ghephinh_tim_me',
    title: 'Bé Tìm Mẹ Cho Thú Con',
    icon: '🐣',
    ageGroup: '3-5 tuổi',
    gameType: 'matching_puzzle',
    description: 'Bé hãy giúp các bạn thú con tìm lại mẹ yêu dấu của mình nhé!',
    puzzlePairs: [
      { id: 'p1', name: 'Bé Gà Con Lông Vàng', symbol: '🐥', matchTarget: 'Mẹ Gà Mái Đảm Đang', targetSymbol: '🐔', hint: 'Gà mái mẹ kêu cục ta cục tác dẫn đàn con đi kiếm mồi!' },
      { id: 'p2', name: 'Bé Vịt Con Lạch Bạch', symbol: '🦆', matchTarget: 'Mẹ Vịt Bầu Bơi Lội', targetSymbol: '🪿', hint: 'Vịt mẹ dạy các con bơi lội dưới ao xanh!' },
      { id: 'p3', name: 'Bé Mèo Con Xíu Xiu', symbol: '🐱', matchTarget: 'Mẹ Mèo Dịu Dàng', targetSymbol: '🐈', hint: 'Mèo mẹ âu yếm liếm láp cho mèo con ngủ ngoan!' },
      { id: 'p4', name: 'Bé Bê Con Ngơ Ngác', symbol: '🐮', matchTarget: 'Mẹ Bò Sữa Hiền Hòa', targetSymbol: '🐄', hint: 'Bê con theo mẹ bò ăn cỏ non trên đồng!' },
      { id: 'p5', name: 'Bé Cún Con Tung Tăng', symbol: '🐶', matchTarget: 'Mẹ Chó Vui Vẻ', targetSymbol: '🐕', hint: 'Cún mẹ vẫy đuôi bảo vệ đàn con đáng yêu!' },
      { id: 'p6', name: 'Bé Heo Con Mũm Mĩm', symbol: '🐷', matchTarget: 'Mẹ Heo Hồng Tròn Trịa', targetSymbol: '🐖', hint: 'Heo con bú mẹ no căng rồi lăn ra ngủ ngon!' }
    ]
  }
];

export const GameArchitectModal: React.FC<GameArchitectModalProps> = ({
  onClose,
  onGameAdded
}) => {
  const [selectedPresetIdx, setSelectedPresetIdx] = useState<number>(0);
  const [jsonText, setJsonText] = useState<string>(
    JSON.stringify(PRESET_IDEAS[0], null, 2)
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [syncResult, setSyncResult] = useState<GithubSyncResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSelectPreset = (idx: number) => {
    setSelectedPresetIdx(idx);
    setJsonText(JSON.stringify(PRESET_IDEAS[idx], null, 2));
    setErrorMessage(null);
    setSyncResult(null);
    playClickSound();
  };

  const handlePushToGithub = () => {
    try {
      setErrorMessage(null);
      const parsedGame: Game = JSON.parse(jsonText);

      // Call the mandatory system function push_game_to_github!
      const result = push_game_to_github(parsedGame);

      setSyncResult(result);
      playCorrectSound();
      onGameAdded(parsedGame);
    } catch (err: unknown) {
      playWrongSound();
      const msg = err instanceof Error ? err.message : 'JSON không đúng định dạng!';
      setErrorMessage(msg);
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl border-4 border-amber-300 shadow-2xl p-6 sm:p-8 my-8 text-slate-900 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-amber-200 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl shadow-md">
              📐
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Kiến Trúc Sư Thiết Kế Trò Chơi Mầm Non
              </h2>
              <p className="text-xs sm:text-sm font-bold text-amber-800">
                Tự động dựng cấu trúc dữ liệu JSON chuẩn và gọi <code className="bg-amber-100 px-1.5 py-0.5 rounded text-amber-900 font-mono">push_game_to_github</code> cập nhật Smart TV & GitHub!
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

        {/* Quick Presets Selection */}
        <div className="mb-6">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
            Chọn Ý Tưởng Trò Chơi Mẫu Chuẩn Cho Trẻ 3-5 Tuổi:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PRESET_IDEAS.map((preset, idx) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(idx)}
                className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  selectedPresetIdx === idx
                    ? 'bg-amber-50 border-amber-500 shadow-md ring-2 ring-amber-300'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-2xl mb-1">{preset.icon}</div>
                <div className="text-sm font-black text-slate-900 line-clamp-1">
                  {preset.title}
                </div>
                <div className="text-[11px] font-bold text-slate-500">
                  {preset.gameType === 'quiz' ? 'Đố Vui (6 câu)' : 'Ghép Hình (6 cặp)'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* JSON Editor Box */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <FileCode2 className="w-4 h-4 text-amber-600" />
              <span>Cấu Trúc newGame JSON (Tự động xác thực chuẩn):</span>
            </span>
            <button
              onClick={handleCopyJson}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 px-2 py-1 rounded bg-slate-100 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Đã sao chép' : 'Sao chép JSON'}</span>
            </button>
          </div>

          <textarea
            value={jsonText}
            onChange={(e) => {
              setJsonText(e.target.value);
              setErrorMessage(null);
              setSyncResult(null);
            }}
            rows={12}
            className="w-full font-mono text-xs p-4 rounded-2xl bg-slate-900 text-emerald-400 border-2 border-slate-700 focus:outline-none focus:border-amber-400 leading-relaxed resize-y"
            spellCheck={false}
          />

          {errorMessage && (
            <div className="mt-3 p-3 bg-rose-50 border-2 border-rose-300 rounded-xl text-rose-800 text-xs font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Live GitHub & Smart TV Push Result Notification */}
        {syncResult && (
          <div className="mb-6 p-4 bg-emerald-50 border-2 border-emerald-400 rounded-2xl text-emerald-950 shadow-sm animate-flash-green">
            <div className="flex items-center gap-2 font-black text-sm text-emerald-900 mb-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>{syncResult.message}</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-emerald-800 mt-2">
              <span className="flex items-center gap-1">
                <GitCommit className="w-4 h-4" />
                Commit: <code>{syncResult.commitHash}</code>
              </span>
              <span>Nhánh: <code>{syncResult.branch}</code></span>
              <span className="flex items-center gap-1">
                <Tv className="w-4 h-4" />
                Đã đồng bộ {syncResult.syncedTvCount} thiết bị Smart TV
              </span>
            </div>
          </div>
        )}

        {/* Mandatory Action Button: push_game_to_github */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-200">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 text-slate-700 hover:bg-slate-100 rounded-xl font-bold text-sm transition-colors cursor-pointer"
          >
            Đóng Lại
          </button>

          <button
            onClick={handlePushToGithub}
            className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 hover:from-orange-600 hover:to-emerald-600 text-white font-black text-base rounded-2xl shadow-lg hover:shadow-orange-400/40 hover:scale-102 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            <span>Gọi push_game_to_github (Cập Nhật Ngay)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
