import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { QuizGame, QuizQuestion } from '../types/game';
import {
  playCorrectSound,
  playWrongSound,
  playVictoryFanfare,
  playClickSound,
  playSpecialSound,
  speakVietnamese
} from '../utils/audio';
import { Volume2, ArrowLeft, RotateCcw, Award, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

interface QuizGameViewProps {
  game: QuizGame;
  onExit: () => void;
  onRewardStar: () => void;
  soundEnabled: boolean;
}

export const QuizGameView: React.FC<QuizGameViewProps> = ({
  game,
  onExit,
  onRewardStar,
  soundEnabled
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showHint, setShowHint] = useState(false);
  const [focusedOptionIdx, setFocusedOptionIdx] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const currentQ: QuizQuestion = game.interactiveQuestions[currentIndex];

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

  // Keyboard navigation for Smart TV Remote (Arrow Left/Right/Up/Down, Enter, 1-3)
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
    if (answerState === 'correct') return; // already answered correctly

    setSelectedOption(option);
    const isCorrect = option === currentQ.correctAnswer;

    if (isCorrect) {
      // 1. NHÁY XANH KHI ĐÚNG
      setAnswerState('correct');
      if (soundEnabled) {
        if (currentQ.soundType) {
          playSpecialSound(currentQ.soundType);
        } else {
          playCorrectSound();
        }
      }

      // Confetti burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      speakVietnamese('Hoan hô bé! Bé giỏi quá, đáp án chính xác!');
      onRewardStar();
      setCorrectCount((prev) => prev + 1);

      // Advance after friendly delay
      setTimeout(() => {
        if (currentIndex < game.interactiveQuestions.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          setIsCompleted(true);
          if (soundEnabled) {
            playVictoryFanfare();
          }
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.5 }
          });
        }
      }, 1400);
    } else {
      // 2. NHÁY ĐỎ KHI SAI
      setAnswerState('wrong');
      if (soundEnabled) {
        playWrongSound();
      }
      speakVietnamese('Chưa đúng rồi! Bé thử chọn lại nhé!');
      setShowHint(true);

      // Reset after 1s so child can try again
      setTimeout(() => {
        setAnswerState('idle');
      }, 1100);
    }
  };

  const handleReadQuestion = () => {
    playClickSound();
    speakVietnamese(currentQ.question);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setCorrectCount(0);
    setIsCompleted(false);
    setSelectedOption(null);
    setAnswerState('idle');
    setShowHint(false);
  };

  // Celebration Screen on Game Completion
  if (isCompleted) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 text-center">
        <div className="bg-gradient-to-b from-amber-100 via-orange-50 to-white rounded-3xl p-8 sm:p-12 border-4 border-amber-300 shadow-2xl">
          <div className="text-7xl sm:text-8xl mb-4 animate-bounce">🏆</div>

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
    <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6">
      {/* Top Game Bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={onExit}
          className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-amber-50 text-amber-900 border-2 border-amber-300 rounded-2xl font-extrabold text-sm sm:text-base shadow-sm transition-all cursor-pointer tv-focus-ring"
        >
          <ArrowLeft className="w-5 h-5 text-amber-700" />
          <span>Về Kho Game</span>
        </button>

        {/* Progress Stars */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-white/90 border-2 border-amber-200 rounded-2xl shadow-sm">
          <span className="text-sm font-black text-slate-700 mr-2">
            Câu {currentIndex + 1} / {game.interactiveQuestions.length}
          </span>
          <div className="flex items-center gap-1">
            {game.interactiveQuestions.map((_, idx) => (
              <span
                key={idx}
                className={`text-lg transition-transform ${
                  idx < currentIndex
                    ? 'text-yellow-400 scale-110'
                    : idx === currentIndex
                    ? 'text-orange-500 animate-pulse'
                    : 'text-slate-300'
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Question Card - Giant visual for TV */}
      <div className="bg-gradient-to-b from-white via-amber-50/50 to-orange-50/40 rounded-3xl p-6 sm:p-10 border-4 border-amber-300 shadow-xl mb-6 text-center relative overflow-hidden">
        {/* Large Emoji Badge */}
        {currentQ.emoji && (
          <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4 bg-white rounded-3xl border-3 border-amber-300 shadow-md flex items-center justify-center text-5xl sm:text-6xl animate-float-slow">
            {currentQ.emoji}
          </div>
        )}

        {/* Question Text */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-snug mb-4">
          {currentQ.question}
        </h2>

        {/* Voice Read Button for 3-5yo kids */}
        <div className="flex justify-center mb-2">
          <button
            onClick={handleReadQuestion}
            className="px-5 py-2.5 bg-amber-200 hover:bg-amber-300 text-amber-950 font-black text-sm sm:text-base rounded-2xl border-2 border-amber-400 shadow-sm flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition-all tv-focus-ring"
          >
            <Volume2 className="w-5 h-5 text-amber-800" />
            <span>Nghe Cô Đọc Lại Câu Hỏi</span>
          </button>
        </div>

        {/* Hint Box if user got wrong */}
        {showHint && currentQ.hint && (
          <div className="mt-4 p-4 bg-amber-100/90 border-2 border-amber-400 rounded-2xl text-amber-950 font-extrabold text-base flex items-center justify-center gap-2 animate-bounce">
            <HelpCircle className="w-5 h-5 text-amber-700 shrink-0" />
            <span>Gợi ý cho bé: {currentQ.hint}</span>
          </div>
        )}
      </div>

      {/* Giant Answer Options - Smart TV Ergonomics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
        {currentQ.options.map((option, idx) => {
          const isSelected = selectedOption === option;
          const isCorrectChoice = option === currentQ.correctAnswer;

          let cardStyle =
            'bg-white hover:bg-amber-50/90 border-slate-300 hover:border-amber-400 text-slate-900 shadow-md hover:shadow-lg';

          if (isSelected) {
            if (answerState === 'correct') {
              // FLASH GREEN EFFECT (Nháy xanh khi đúng)
              cardStyle =
                'bg-emerald-500 border-emerald-600 text-white shadow-2xl shadow-emerald-400/60 scale-105 animate-flash-green';
            } else if (answerState === 'wrong') {
              // FLASH RED EFFECT (Nháy đỏ khi sai)
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
              className={`relative min-h-[90px] sm:min-h-[120px] p-5 rounded-3xl border-4 font-black text-xl sm:text-2xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${cardStyle} ${
                isFocused ? 'tv-focused' : ''
              } tv-focus-ring`}
            >
              {/* Option Number Tag for TV remote shortcut */}
              <span className="absolute top-3 left-4 text-xs font-black px-2 py-0.5 rounded-full bg-black/10">
                Phím {idx + 1}
              </span>

              <span className="text-center px-2">{option}</span>

              {/* Status Icons */}
              {isSelected && answerState === 'correct' && (
                <div className="flex items-center gap-1.5 text-sm font-black text-yellow-200 mt-1">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                  <span>Đúng rồi!</span>
                </div>
              )}

              {isSelected && answerState === 'wrong' && (
                <div className="flex items-center gap-1.5 text-sm font-black text-white mt-1">
                  <XCircle className="w-6 h-6 text-white" />
                  <span>Thử lại nhé!</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Smart TV Remote Navigation Reminder */}
      <div className="p-3 bg-white/70 rounded-2xl border border-amber-200 text-center text-xs sm:text-sm font-bold text-slate-600 shadow-xs">
        📺 <span className="font-extrabold text-amber-900">Mẹo Smart TV:</span> Dùng các phím mũi tên [← → ↑ ↓] để đổi đáp án, bấm [OK] để chọn, hoặc bấm trực tiếp các phím [1] [2] [3] trên điều khiển!
      </div>
    </div>
  );
};
