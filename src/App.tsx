/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Game, QuizGame, MatchingPuzzleGame } from './types/game';
import { getAllGames } from './services/githubTvSync';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { GameCard } from './components/GameCard';
import { QuizGameView } from './components/QuizGameView';
import { MatchingPuzzleView } from './components/MatchingPuzzleView';
import { TvRemoteOverlay } from './components/TvRemoteOverlay';
import { GameArchitectModal } from './components/GameArchitectModal';
import { TvSyncModal } from './components/TvSyncModal';
import { toggleBgm, playClickSound } from './utils/audio';

export default function App() {
  const [games, setGames] = useState<Game[]>(() => getAllGames());
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'quiz' | 'matching_puzzle'>('all');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [bgmActive, setBgmActive] = useState<boolean>(false);
  const [starsCount, setStarsCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('kid_stars_count');
      return saved ? parseInt(saved, 10) : 3;
    } catch {
      return 3;
    }
  });

  // TV remote navigation state
  const [focusedCardIdx, setFocusedCardIdx] = useState<number>(0);
  const [showTvRemote, setShowTvRemote] = useState<boolean>(false);

  // Modals
  const [showArchitectModal, setShowArchitectModal] = useState<boolean>(false);
  const [showTvSyncModal, setShowTvSyncModal] = useState<boolean>(false);

  // Listen for games pushed via push_game_to_github or BroadcastChannel
  useEffect(() => {
    const handleSync = () => {
      setGames(getAllGames());
    };

    window.addEventListener('kid-game-hub-updated', handleSync);
    return () => window.removeEventListener('kid-game-hub-updated', handleSync);
  }, []);

  // Save stars
  const handleRewardStar = () => {
    setStarsCount((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem('kid_stars_count', next.toString());
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  };

  const handleToggleBgm = () => {
    const isPlaying = toggleBgm();
    setBgmActive(isPlaying);
  };

  const filteredGames = games.filter((g) => {
    if (activeFilter === 'all') return true;
    return g.gameType === activeFilter;
  });

  // Handle Smart TV keyboard navigation when on hub screen
  useEffect(() => {
    if (activeGame !== null || showArchitectModal || showTvSyncModal) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (filteredGames.length === 0) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setFocusedCardIdx((prev) => (prev + 1) % filteredGames.length);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setFocusedCardIdx((prev) => (prev - 1 + filteredGames.length) % filteredGames.length);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedCardIdx((prev) => Math.min(prev + 2, filteredGames.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedCardIdx((prev) => Math.max(prev - 2, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredGames[focusedCardIdx]) {
          setActiveGame(filteredGames[focusedCardIdx]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeGame, filteredGames, focusedCardIdx, showArchitectModal, showTvSyncModal]);

  // TV Remote software callbacks
  const handleRemoteNavigate = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (activeGame) return; // active game handles its own navigation
    if (filteredGames.length === 0) return;

    if (direction === 'right') {
      setFocusedCardIdx((prev) => (prev + 1) % filteredGames.length);
    } else if (direction === 'left') {
      setFocusedCardIdx((prev) => (prev - 1 + filteredGames.length) % filteredGames.length);
    } else if (direction === 'down') {
      setFocusedCardIdx((prev) => Math.min(prev + 2, filteredGames.length - 1));
    } else if (direction === 'up') {
      setFocusedCardIdx((prev) => Math.max(prev - 2, 0));
    }
  };

  const handleRemoteConfirm = () => {
    if (!activeGame && filteredGames[focusedCardIdx]) {
      setActiveGame(filteredGames[focusedCardIdx]);
    }
  };

  const handleRemoteBack = () => {
    if (activeGame) {
      setActiveGame(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBEB] text-slate-900">
      {/* 1. Header (Top Bar Contract) */}
      <Header
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        bgmActive={bgmActive}
        onToggleBgm={handleToggleBgm}
        onOpenArchitect={() => setShowArchitectModal(true)}
        onOpenSync={() => setShowTvSyncModal(true)}
        activeFilter={activeFilter}
        onChangeFilter={(f) => {
          playClickSound();
          setActiveFilter(f);
          setFocusedCardIdx(0);
        }}
        isGameActive={activeGame !== null}
        onBackToHub={() => setActiveGame(null)}
        starsCount={starsCount}
      />

      {/* 2. Main Body Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeGame ? (
          // Active Game Screen
          activeGame.gameType === 'quiz' ? (
            <QuizGameView
              game={activeGame as QuizGame}
              onExit={() => setActiveGame(null)}
              onRewardStar={handleRewardStar}
              soundEnabled={soundEnabled}
            />
          ) : (
            <MatchingPuzzleView
              game={activeGame as MatchingPuzzleGame}
              onExit={() => setActiveGame(null)}
              onRewardStar={handleRewardStar}
              soundEnabled={soundEnabled}
            />
          )
        ) : (
          // Main Kid Game Hub Screen
          <div>
            {/* Mascot & Welcome Banner */}
            <HeroBanner
              totalGames={games.length}
              totalStars={starsCount}
              onQuickStart={() => {
                if (filteredGames.length > 0) {
                  setActiveGame(filteredGames[0]);
                }
              }}
              tvRemoteVisible={showTvRemote}
              onToggleTvRemote={() => setShowTvRemote((prev) => !prev)}
            />

            {/* Filter Tabs for Mobile / Tablet */}
            <div className="flex md:hidden items-center justify-center gap-1.5 p-1 bg-amber-100 rounded-2xl border border-amber-300 mb-6">
              <button
                onClick={() => {
                  playClickSound();
                  setActiveFilter('all');
                }}
                className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${
                  activeFilter === 'all'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-amber-900'
                }`}
              >
                Tất Cả
              </button>
              <button
                onClick={() => {
                  playClickSound();
                  setActiveFilter('quiz');
                }}
                className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${
                  activeFilter === 'quiz'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-amber-900'
                }`}
              >
                Đố Vui
              </button>
              <button
                onClick={() => {
                  playClickSound();
                  setActiveFilter('matching_puzzle');
                }}
                className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${
                  activeFilter === 'matching_puzzle'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-amber-900'
                }`}
              >
                Ghép Hình
              </button>
            </div>

            {/* Section Heading */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Kho Trò Chơi Cho Bé (Ages 3-5)
                </h2>
                <p className="text-xs sm:text-sm font-bold text-slate-600">
                  Chọn trò chơi để bắt đầu khám phá âm thanh, câu đố và hình ảnh kỳ thú!
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-100/80 px-3 py-1.5 rounded-xl border border-amber-300">
                <span>📺 Phím điều hướng TV:</span>
                <span className="font-mono bg-white px-1.5 py-0.5 rounded shadow-2xs">← → ↑ ↓ [OK]</span>
              </div>
            </div>

            {/* Grid of Game Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredGames.map((game, idx) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onSelect={(g) => setActiveGame(g)}
                  isFocused={focusedCardIdx === idx}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* 3. Footer */}
      <footer className="mt-12 bg-white border-t-2 border-amber-200 py-6 px-4 text-center text-xs font-bold text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-amber-900">
            <span>🌟</span>
            <span className="font-extrabold">Kid Game Hub</span>
            <span>·</span>
            <span>Thiết kế riêng cho mầm non & Smart TV 4K/FullHD</span>
          </div>
          <div className="text-slate-500">
            Bản quyền © 2026 Kid Game Hub · Chuẩn giáo dục mầm non 3-5 tuổi
          </div>
        </div>
      </footer>

      {/* 4. On-Screen Smart TV Remote Overlay */}
      {showTvRemote && (
        <TvRemoteOverlay
          onClose={() => setShowTvRemote(false)}
          onNavigate={handleRemoteNavigate}
          onConfirm={handleRemoteConfirm}
          onBack={handleRemoteBack}
          onToggleSound={() => setSoundEnabled((prev) => !prev)}
        />
      )}

      {/* 5. Modals */}
      {showArchitectModal && (
        <GameArchitectModal
          onClose={() => setShowArchitectModal(false)}
          onGameAdded={(newGame) => {
            setGames(getAllGames());
            setActiveGame(newGame);
            setShowArchitectModal(false);
          }}
        />
      )}

      {showTvSyncModal && (
        <TvSyncModal
          onClose={() => setShowTvSyncModal(false)}
          onResetDone={() => setGames(getAllGames())}
        />
      )}
    </div>
  );
}
