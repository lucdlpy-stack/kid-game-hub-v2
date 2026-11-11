import React, { useState } from 'react';
import { X, Send, Sparkles, Volume2, Bot, Play, CheckCircle2 } from 'lucide-react';
import { push_game_to_github } from '../services/githubTvSync';
import { Game } from '../types/game';
import { playClickSound, playCorrectSound, speakVietnamese } from '../utils/audio';

interface AiDinoChatModalProps {
  onClose: () => void;
  onGameCreated: (game: Game) => void;
}

export const AiDinoChatModal: React.FC<AiDinoChatModalProps> = ({
  onClose,
  onGameCreated
}) => {
  const [messages, setMessages] = useState<
    { sender: 'dino' | 'kid'; text: string; time: string }[]
  >([
    {
      sender: 'dino',
      text: 'Chào bé yêu! Mình là Bạn Khủng Long Dino Thông Thái 🦖✨! Bé muốn hỏi Dino chuyện gì, hay muốn Dino sáng tạo trò chơi mới nào tặng bé?',
      time: 'Vừa xong'
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatingGame, setGeneratingGame] = useState(false);

  const quickQuestions = [
    'Dino ơi, con gì to nhất dưới biển?',
    'Mặt trời buổi sáng đi đâu hả Dino?',
    'Dino có thích ăn dưa hấu không?',
    'Tạo trò chơi Siêu Nhân cho bé!',
    'Tạo trò chơi Khủng Long & Núi Lửa!'
  ];

  const handleSendMessage = async (msgText?: string) => {
    const textToSend = msgText || inputPrompt;
    if (!textToSend.trim() || loading) return;

    playClickSound();
    const userMsg = textToSend.trim();
    setInputPrompt('');
    setMessages((prev) => [
      ...prev,
      { sender: 'kid', text: userMsg, time: 'Vừa xong' }
    ]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/dino-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      const reply = data.reply || 'Dino rất yêu bé! Bé học thật ngoan và chơi thật vui nhé!';

      setMessages((prev) => [
        ...prev,
        { sender: 'dino', text: reply, time: 'Vừa xong' }
      ]);
      speakVietnamese(reply);
    } catch {
      const fallback = 'Dino chào bé! Bé thật thông minh và đáng yêu, chúng mình cùng chơi thật vui nhé! 🦖⭐';
      setMessages((prev) => [
        ...prev,
        { sender: 'dino', text: fallback, time: 'Vừa xong' }
      ]);
      speakVietnamese(fallback);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAiGame = async (topic: string) => {
    playClickSound();
    setGeneratingGame(true);
    speakVietnamese(`Dino đang dùng trí tuệ AI sáng tạo trò chơi về ${topic} cho bé đây! Chờ Dino một tí nhé!`);

    try {
      const res = await fetch('/api/ai/generate-game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, gameType: 'quiz' })
      });
      const data = await res.json();
      if (data.game) {
        // Automatically invoke push_game_to_github!
        push_game_to_github(data.game);
        playCorrectSound();
        speakVietnamese(`Xong rồi bé ơi! Dino đã tạo xong trò chơi ${data.game.title} và gửi lên Smart TV rồi!`);
        onGameCreated(data.game);
        onClose();
      }
    } catch (e) {
      console.warn('AI generate error', e);
    } finally {
      setGeneratingGame(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border-4 border-amber-400 shadow-2xl p-5 sm:p-7 text-slate-900 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-200 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-500 text-white flex items-center justify-center text-3xl shadow-md animate-bounce">
              🦖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-amber-950">
                  Bạn Khủng Long Dino Trí Tuệ AI
                </h3>
                <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Gemini AI
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500">
                Người bạn thân thiết trò chuyện & sáng tạo trò chơi tức thì cho bé
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto space-y-3 p-3 bg-amber-50/60 rounded-2xl border border-amber-200 mb-3 min-h-[200px]">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${m.sender === 'kid' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'dino' && (
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-lg shrink-0">
                  🦖
                </div>
              )}
              <div
                className={`max-w-[80%] p-3.5 rounded-2xl text-sm font-black leading-relaxed shadow-xs ${
                  m.sender === 'kid'
                    ? 'bg-amber-500 text-white rounded-tr-none'
                    : 'bg-white border-2 border-emerald-300 text-slate-800 rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs font-black text-emerald-800">
              <span className="animate-spin text-base">✨</span>
              <span>Dino đang suy nghĩ câu trả lời cho bé...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="mb-3">
          <div className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1.5">
            Gợi ý bé nói cùng Dino:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (q.startsWith('Tạo trò chơi')) {
                    const topic = q.replace('Tạo trò chơi ', '').replace(' cho bé!', '');
                    handleGenerateAiGame(topic);
                  } else {
                    handleSendMessage(q);
                  }
                }}
                className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs rounded-xl border border-amber-300 transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* AI Auto Game Generator CTA */}
        <div className="p-3 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl border-2 border-emerald-300 mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-700 animate-spin" />
            <div className="text-xs font-black text-emerald-950">
              Muốn game mới toanh? Bấm để Dino tạo trò chơi AI & gửi thẳng lên Smart TV!
            </div>
          </div>
          <button
            onClick={() => handleGenerateAiGame('Đại dương và cá heo kỳ diệu')}
            disabled={generatingGame}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-95"
          >
            {generatingGame ? 'Đang tạo...' : 'Tạo Game Mới Ngay'}
          </button>
        </div>

        {/* Chat Input Field */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder="Nhập câu hỏi hoặc nói chuyện cùng bạn Dino..."
            className="flex-1 px-4 py-3 rounded-2xl border-2 border-slate-300 focus:outline-none focus:border-amber-500 font-bold text-sm bg-white"
          />
          <button
            onClick={() => handleSendMessage()}
            className="p-3 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-black shadow-md cursor-pointer active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
