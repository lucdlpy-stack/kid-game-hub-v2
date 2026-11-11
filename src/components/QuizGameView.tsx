import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { QuizGame, QuizQuestion } from '../types/game';
import { recordBadgeProgress } from '../services/badgeService';
import {
  playCorrectSound,
  playWrongSound,
  playVictoryFanfare,
  playClickSound,
  playSpecialSound,
  speakVietnamese
} from '../utils/audio';
import { Volume2, ArrowLeft, RotateCcw, Award, CheckCircle2, XCircle, HelpCircle, Sparkles } from 'lucide-react';

interface QuizGameViewProps {
  game: QuizGame;
  onExit: () => void;
  onRewardStar: () => void;
  soundEnabled: boolean;
}

function getFallbackEmoji(optionText: string, idx: number): string {
  const lower = optionText.toLowerCase();
  if (lower.includes('chó') || lower.includes('cún')) return '🐶';
  if (lower.includes('mèo')) return '🐱';
  if (lower.includes('gà')) return '🐓';
  if (lower.includes('voi')) return '🐘';
  if (lower.includes('thỏ')) return '🐰';
  if (lower.includes('sư tử')) return '🦁';
  if (lower.includes('hươu')) return '🦒';
  if (lower.includes('vịt')) return '🦆';
  if (lower.includes('cứu hỏa')) return '🚒';
  if (lower.includes('cứu thương')) return '🚑';
  if (lower.includes('máy bay')) return '✈️';
  if (lower.includes('đạp')) return '🚲';
  if (lower.includes('tàu')) return '🚂';
  if (lower.includes('buýt')) return '🚌';
  if (lower.includes('đèn') || lower.includes('dừng')) return '🛑';
  if (lower.includes('đỏ')) return '🔴';
  if (lower.includes('xanh')) return '🟢';
  if (lower.includes('tròn')) return '🟡';
  if (lower.includes('vuông')) return '🟩';
  if (lower.includes('tam giác')) return '🔺';
  if (lower.includes('dưa hấu')) return '🍉';
  if (lower.includes('chuối')) return '🍌';
  if (lower.includes('cam')) return '🍊';
  if (lower.includes('dâu')) return '🍓';
  if (lower.includes('táo')) return '🍎';
  if (lower.includes('nho')) return '🍇';
  if (lower.includes('cá')) return '🐟';
  const defaults = ['🌟', '🎯', '🎈', '🎨'];
  return defaults[idx % defaults.length];
}

// Fisher-Yates Shuffle helper function
function shuffleQuestions<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const QuizGameView: React.FC<QuizGameViewProps> = ({
  game,
  onExit,
  onRewardStar,
  soundEnabled
}) => {
  // Randomize questions for each player session so no two plays are identical
  const [questions, setQuestions] = useState<QuizQuestion[]>(() =>
    shuffleQuestions(game.interactiveQuestions)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showHint, setShowHint] = useState(false);
  const [focusedOptionIdx, setFocusedOptionIdx] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const currentQ: QuizQuestion = questions[currentIndex] || questions[0];

  // Auto-speak question when question changes
  useEffect(() => {
    setSelectedOption(null);
    setAnswerState('idle');
    setShowHint(false);
    setFocusedOptionIdx(0);

    if (soundEnabled && currentQ) {
      speakVietnamese(currentQ.question);
    }
  }, [currentIndex, currentQ, soundEnabled]);

  // Keyboard navigation for Smart TV Remote
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCompleted) {
        if (e.key === 'Enter') {
          handleRestart();
        } else if (e.key === 'Escape') {
          onExit();
        }
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedOptionIdx((prev) => (prev + 1) % currentQ.options.length);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedOptionIdx((prev) => (prev - 1 + currentQ.options.length) % currentQ.options.length);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (currentQ.options[focusedOptionIdx]) {
          handleOptionSelect(currentQ.options[focusedOptionIdx]);
        }
      } else if (e.key === 'Escape' || e.key === 'Backspace') {
        e.preventDefault();
        onExit();
      } else if (e.key === '1' && currentQ.options[0]) {
        handleOptionSelect(currentQ.options[0]);
      } else if (e.key === '2' && currentQ.options[1]) {
        handleOptionSelect(currentQ.options[1]);
      } else if (e.key === '3' && currentQ.options[2]) {
        handleOptionSelect(currentQ.options[2]);
      } else if (e.key === '4' && currentQ.options[3]) {
        handleOptionSelect(currentQ.options[3]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQ, focusedOptionIdx, isCompleted, onExit]);

  const handleOptionSelect = (option: string) => {
    if (answerState === 'correct') return;

    setSelectedOption(option);
    const isCorrect = option === currentQ.correctAnswer;

    if (isCorrect) {
      setAnswerState('correct');
      if (soundEnabled) {
        if (currentQ.soundType) {
          playSpecialSound(currentQ.soundType);
        } else {
          playCorrectSound();
        }
      }

      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 }
      });

      speakVietnamese(`Đúng rồi! Hoan hô bé! Bé chọn ${option} thật chính xác!`);
      onRewardStar();
      setCorrectCount((prev) => prev + 1);

      // Record badge progress for Quiz Genius!
      recordBadgeProgress('quiz', 1);

      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          setIsCompleted(true);
          if (soundEnabled) {
            playVictoryFanfare();
          }
          confetti({
            particleCount: 160,
            spread: 100,
            origin: { y: 0.5 }
          });
        }
      }, 1400);
    } else {
      setAnswerState('wrong');
      if (soundEnabled) {
        playWrongSound();
      }
      speakVietnamese('Chưa đúng rồi! Bé thử chọn lại nhé!');
      setShowHint(true);

      setTimeout(() => {
        setAnswerState('idle');
      }, 1000);
    }
  };

  const handleReadQuestion = () => {
    playClickSound();
    speakVietnamese(currentQ.question);
  };

  const handleRestart = () => {
    setQuestions(shuffleQuestions(game.interactiveQuestions));
    setCurrentIndex(0);
    setCorrectCount(0);
    setIsCompleted(false);
    setSelectedOption(null);
    setAnswerState('idle');
    setShowHint(false);
  };

  if (isCompleted) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 text-center">
        <div className="bg-gradient-to-b from-amber-100 via-orange-50 to-white rounded-3xl p-8 sm:p-12 border-4 border-amber-300 shadow-2xl">
          <div className="text-7xl sm:text-8xl mb-4 animate-bounce">🏆⭐</div>

          <h2 className="text-3xl sm:text-5xl font-black text-amber-950 mb-3 tracking-tight">
            Chúc Mừng Bé Xuất Sắc!
          </h2>

          <p className="text-lg sm:text-xl font-bold text-slate-700 mb-6">
            Bé đã hoàn thành trò chơi <span className="text-orange-600 font-black">{game.title}</span>!
          </p>

          <div className="inline-flex items-center gap-3 px-6 py-3 bg-yellow-200 border-2 border-yellow-400 rounded-2xl mb-8 shadow-sm">
            <span className="text-3xl">⭐</span>
            <span className="text-xl sm:text-2xl font-black text-yellow-950">
              Bé nhận được {correctCount} Ngôi Sao May Mắn!
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-xl rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 tv-focus-ring"
            >
              <RotateCcw className="w-6 h-6" />
              <span>Chơi Lại Trò Này</span>
            </button>

            <button
              onClick={onExit}
              className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-black text-xl rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 tv-focus-ring"
            >
              <ArrowLeft className="w-6 h-6" />
              <span>Chọn Trò Chơi Khác</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-3 px-2 sm:px-4">
      {/* Top Game Bar */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <button
          onClick={onExit}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-amber-50 text-amber-900 border-2 border-amber-300 rounded-2xl font-black text-sm sm:text-base shadow-sm transition-all cursor-pointer tv-focus-ring"
        >
          <ArrowLeft className="w-5 h-5 text-amber-700" />
          <span>Về Kho Game</span>
        </button>

        {/* Progress Stars */}
        <div className="flex items-center gap-2 px-4 py-2 bg-white/95 border-2 border-amber-200 rounded-2xl shadow-sm">
          <span className="text-sm font-black text-slate-700 mr-2">
            Câu {currentIndex + 1} / {game.interactiveQuestions.length}
          </span>
          <div className="flex items-center gap-1">
            {game.interactiveQuestions.map((_, idx) => (
              <span
                key={idx}
                className={`text-xl transition-transform ${
                  idx < currentIndex
                    ? 'text-yellow-400 scale-110'
                    : idx === currentIndex
                    ? 'text-orange-500 animate-pulse text-2xl'
                    : 'text-slate-300'
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-gradient-to-b from-white via-amber-50/60 to-orange-50/50 rounded-3xl p-5 sm:p-8 border-4 border-amber-300 shadow-xl mb-6 text-center relative overflow-hidden">
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-tr from-amber-200 to-orange-200 rounded-3xl border-3 border-amber-400 shadow-md flex items-center justify-center text-5xl sm:text-6xl animate-bounce">
            {currentQ.emoji || '❓'}
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-snug mb-3">
          {currentQ.question}
        </h2>

        <div className="flex justify-center mb-1">
          <button
            onClick={handleReadQuestion}
            className="px-5 py-2.5 bg-amber-200 hover:bg-amber-300 text-amber-950 font-black text-sm sm:text-base rounded-2xl border-2 border-amber-400 shadow-sm flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition-all tv-focus-ring"
          >
            <Volume2 className="w-5 h-5 text-amber-800" />
            <span>Bé Bấm Để Nghe Cô Đọc Lại</span>
          </button>
        </div>

        {showHint && currentQ.hint && (
          <div className="mt-3 p-3 bg-amber-100 border-2 border-amber-400 rounded-2xl text-amber-950 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 animate-bounce">
            <HelpCircle className="w-5 h-5 text-amber-700 shrink-0" />
            <span>Gợi ý cho bé: {currentQ.hint}</span>
          </div>
        )}
      </div>

      {/* Answer options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
        {currentQ.options.map((option, idx) => {
          const isSelected = selectedOption === option;
          const visualEmoji = currentQ.optionEmojis?.[idx] || getFallbackEmoji(option, idx);

          let cardStyle =
            'bg-white hover:bg-amber-50 border-slate-300 hover:border-amber-400 text-slate-900 shadow-md hover:shadow-xl';

          if (isSelected) {
            if (answerState === 'correct') {
              cardStyle =
                'bg-emerald-500 border-emerald-600 text-white shadow-2xl shadow-emerald-400/60 scale-105 animate-flash-green';
            } else if (answerState === 'wrong') {
              cardStyle =
                'bg-rose-500 border-rose-600 text-white shadow-2xl shadow-rose-400/60 animate-shake';
            }
          }

          const isFocused = focusedOptionIdx === idx;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleOptionSelect(option)}
              className={`relative min-h-[140px] sm:min-h-[180px] p-5 rounded-3xl border-4 font-black flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${cardStyle} ${
                isFocused ? 'tv-focused' : ''
              } tv-focus-ring`}
            >
              <span className="absolute top-3 left-4 text-[11px] font-black px-2.5 py-0.5 rounded-full bg-black/10">
                Phím {idx + 1}
              </span>

              <div className="text-5xl sm:text-6xl my-1 animate-pulse-subtle filter drop-shadow">
                {visualEmoji}
              </div>

              <span className="text-lg sm:text-xl text-center px-2 font-black leading-tight">
                {option}
              </span>

              {isSelected && answerState === 'correct' && (
                <div className="flex items-center gap-1.5 text-sm font-black text-yellow-200 mt-1 animate-bounce">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                  <span>Chính xác! ⭐</span>
                </div>
              )}

              {isSelected && answerState === 'wrong' && (
                <div className="flex items-center gap-1.5 text-sm font-black text-white mt-1">
                  <XCircle className="w-6 h-6 text-white" />
                  <span>Bé thử lại nhé!</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="p-3 bg-white/80 rounded-2xl border border-amber-200 text-center text-xs sm:text-sm font-bold text-slate-600 shadow-xs">
        📺 <span className="font-extrabold text-amber-900">Mẹo Smart TV / HDMI:</span> Dùng các phím mũi tên [← →] hoặc bấm số [1] [2] [3] trên điều khiển để chọn đáp án tương ứng với hình ảnh!
      </div>
    </div>
  );
};
