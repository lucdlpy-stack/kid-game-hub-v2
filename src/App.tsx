/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Game, QuizGame, MatchingPuzzleGame } from './types/game';
import { getAllGames } from './services/githubTvSync';
import { recordBadgeProgress } from './services/badgeService';
import { Sidebar } from './components/Sidebar';
import { HeroBanner } from './components/HeroBanner';
import { GameCard } from './components/GameCard';
import { QuizGameView } from './components/QuizGameView';
import { MatchingPuzzleView } from './components/MatchingPuzzleView';
import { CameraBubbleGameView } from './components/CameraBubbleGameView';
import { CameraFacesGameView } from './components/CameraFacesGameView';
import { CameraStarsGameView } from './components/CameraStarsGameView';
import { CameraTransformGameView } from './components/CameraTransformGameView';
import { ArcheryGameView } from './components/ArcheryGameView';
import { ObstacleRunnerGameView } from './components/ObstacleRunnerGameView';
import { PetRacerGameView } from './components/PetRacerGameView';
import { MusicPianoView } from './components/MusicPianoView';
import { ActionWheelView } from './components/ActionWheelView';
import { TvRemoteOverlay } from './components/TvRemoteOverlay';
import { GameArchitectModal } from './components/GameArchitectModal';
import { TvSyncModal } from './components/TvSyncModal';
import { AiDinoChatModal } from './components/AiDinoChatModal';
import { BadgesModal } from './components/BadgesModal';
import { toggleBgm, playClickSound } from './utils/audio';
import { MonitorPlay, Sparkles } from 'lucide-react';

export default function App() {
  const [games, setGames] = useState<Game[]>(() => getAllGames());
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'camera' | 'quiz' | 'matching_puzzle' | 'dynamic'>('all');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [bgmActive, setBgmActive] = useState<boolean>(false);
  const [hdmiMode, setHdmiMode] = useState<boolean>(false);
  const [starsCount, setStarsCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('kid_stars_count');
      return saved ? parseInt(saved, 10) : 5;
    } catch {
      return 5;
    }
  });

  // TV remote navigation state
  const [focusedCardIdx, setFocusedCardIdx] = useState<number>(0);
  const [showTvRemote, setShowTvRemote] = useState<boolean>(false);

  // Modals
  const [showArchitectModal, setShowArchitectModal] = useState<boolean>(false);
  const [showTvSyncModal, setShowTvSyncModal] = useState<boolean>(false);
  const [showAiDinoModal, setShowAiDinoModal] = useState<boolean>(false);
  const [showBadgesModal, setShowBadgesModal] = useState<boolean>(false);

  // Listen for games pushed via push_game_to_github or BroadcastChannel
  useEffect(() => {
    const handleSync = () => {
      setGames(getAllGames());
    };

    window.addEventListener('kid-game-hub-updated', handleSync);
    return () => window.removeEventListener('kid-game-hub-updated', handleSync);
  }, []);

  // Save stars & record badge progress for stars collector
  const handleRewardStar = () => {
    setStarsCount((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem('kid_stars_count', next.toString());
      } catch {
        // Ignore storage errors
      }
      recordBadgeProgress('stars', 1);
      return next;
    });
  };

  const handleToggleBgm = () => {
    const isPlaying = toggleBgm();
    setBgmActive(isPlaying);
  };

  const filteredGames = games.filter((g) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'camera') {
      return ['camera_transform', 'camera_ar', 'camera_faces', 'camera_stars'].includes(g.gameType);
    }
    if (activeFilter === 'dynamic') {
      return ['archery_fun', 'obstacle_runner', 'pet_racer', 'music_piano', 'action_wheel'].includes(g.gameType);
    }
    return g.gameType === activeFilter;
  });

  // Handle Smart TV keyboard navigation when on hub screen
  useEffect(() => {
    if (activeGame !== null || showArchitectModal || showTvSyncModal || showAiDinoModal || showBadgesModal) return;

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
  }, [activeGame, filteredGames, focusedCardIdx, showArchitectModal, showTvSyncModal, showAiDinoModal, showBadgesModal]);

  // TV Remote software callbacks
  const handleRemoteNavigate = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (activeGame) return;
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

  // Render game view based on gameType
  const renderGameView = () => {
    if (!activeGame) return null;

    switch (activeGame.gameType) {
      case 'camera_transform':
        return (
          <CameraTransformGameView
            onExit={() => setActiveGame(null)}
            onRewardStar={handleRewardStar}
            soundEnabled={soundEnabled}
          />
        );
      case 'camera_ar':
        return (
          <CameraBubbleGameView
            onExit={() => setActiveGame(null)}
            onRewardStar={handleRewardStar}
            soundEnabled={soundEnabled}
          />
        );
      case 'camera_faces':
        return (
          <CameraFacesGameView
            onExit={() => setActiveGame(null)}
            onRewardStar={handleRewardStar}
            soundEnabled={soundEnabled}
          />
        );
      case 'camera_stars':
        return (
          <CameraStarsGameView
            onExit={() => setActiveGame(null)}
            onRewardStar={handleRewardStar}
            soundEnabled={soundEnabled}
          />
        );
      case 'archery_fun':
        return (
          <ArcheryGameView
            onExit={() => setActiveGame(null)}
            onRewardStar={handleRewardStar}
            soundEnabled={soundEnabled}
          />
        );
      case 'obstacle_runner':
        return (
          <ObstacleRunnerGameView
            onExit={() => setActiveGame(null)}
            onRewardStar={handleRewardStar}
            soundEnabled={soundEnabled}
          />
        );
      case 'pet_racer':
        return (
          <PetRacerGameView
            onExit={() => setActiveGame(null)}
            onRewardStar={handleRewardStar}
            soundEnabled={soundEnabled}
          />
        );
      case 'music_piano':
        return (
          <MusicPianoView
            onExit={() => setActiveGame(null)}
            onRewardStar={handleRewardStar}
            soundEnabled={soundEnabled}
          />
        );
      case 'action_wheel':
        return (
          <ActionWheelView
            onExit={() => setActiveGame(null)}
            onRewardStar={handleRewardStar}
            soundEnabled={soundEnabled}
          />
        );
      case 'quiz':
        return (
          <QuizGameView
            game={activeGame as QuizGame}
            onExit={() => setActiveGame(null)}
            onRewardStar={handleRewardStar}
            soundEnabled={soundEnabled}
          />
        );
      case 'matching_puzzle':
      default:
        return (
          <MatchingPuzzleView
            game={activeGame as MatchingPuzzleGame}
            onExit={() => setActiveGame(null)}
            onRewardStar={handleRewardStar}
            soundEnabled={soundEnabled}
          />
        );
    }
  };

  return (
    <div
      className={`min-h-screen flex bg-[#FFFBEB] text-slate-900 transition-all ${
        hdmiMode ? 'text-lg' : ''
      }`}
    >
      {/* 1. FIXED VERTICAL SIDEBAR ON THE LEFT */}
      <Sidebar
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        bgmActive={bgmActive}
        onToggleBgm={handleToggleBgm}
        onOpenArchitect={() => setShowArchitectModal(true)}
        onOpenSync={() => setShowTvSyncModal(true)}
        onOpenAiDino={() => setShowAiDinoModal(true)}
        onOpenBadges={() => setShowBadgesModal(true)}
        activeFilter={activeFilter}
        onChangeFilter={(f) => {
          playClickSound();
          setActiveFilter(f);
          setFocusedCardIdx(0);
        }}
        isGameActive={activeGame !== null}
        onBackToHub={() => setActiveGame(null)}
        starsCount={starsCount}
        hdmiMode={hdmiMode}
        onToggleHdmiMode={() => {
          playClickSound();
          setHdmiMode((prev) => !prev);
        }}
      />

      {/* 2. MAIN CONTENT AREA (Offset by sidebar width on desktop lg:pl-80) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-80">
        {/* HDMI TV Connection Status Notification Banner */}
        {hdmiMode && (
          <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-sky-700 text-white px-4 py-2.5 shadow-md flex items-center justify-between gap-3 text-xs sm:text-sm font-black sticky top-0 z-30">
            <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <MonitorPlay className="w-5 h-5 text-yellow-300 animate-pulse" />
                <span>
                  Đang bật chế độ chiếu máy tính sang TV qua HDMI: Tối ưu 60FPS mượt mà, chống cắt viền màn hình và phóng to nút bấm!
                </span>
              </div>
              <button
                onClick={() => setHdmiMode(false)}
                className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold cursor-pointer whitespace-nowrap"
              >
                Tắt HDMI
              </button>
            </div>
          </div>
        )}

        {/* Main Body */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-5 sm:py-8 pt-16 lg:pt-8">
          {activeGame ? (
            renderGameView()
          ) : (
            // Main Kid Game Hub Screen
            <div>
              {/* Mascot & Welcome Banner - Mascot avatar opens Badges Modal */}
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
                onOpenBadges={() => setShowBadgesModal(true)}
              />

              {/* Section Heading & Quick AI trigger */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <span>Kho Trò Chơi Mầm Non (Ages 3-5)</span>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-1 rounded-full">
                      {filteredGames.length} trò chơi
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm font-bold text-slate-600">
                    Bấm vào ảnh đại diện bé để xem Bảng Huy Hiệu Thành Tựu Nhỏ 🏆!
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowBadgesModal(true)}
                    className="px-3.5 py-2 bg-yellow-100 hover:bg-yellow-200 border-2 border-yellow-400 text-yellow-950 font-black text-xs sm:text-sm rounded-2xl shadow-sm transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
                  >
                    <span>🏆</span>
                    <span>Huy Hiệu Của Bé</span>
                  </button>

                  <button
                    onClick={() => setShowAiDinoModal(true)}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-xs sm:text-sm rounded-2xl shadow-sm hover:scale-105 transition-transform cursor-pointer flex items-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
                    <span>Dino Tạo Game (AI)</span>
                  </button>
                </div>
              </div>

              {/* Grid of Game Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-7">
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

        {/* 3. Footer (NO COPYRIGHT IN BOTTOM RIGHT AS REQUESTED) */}
        <footer className="mt-12 bg-white border-t-2 border-amber-200 py-5 px-6 text-xs font-bold text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2 text-amber-900">
              <span>🌟</span>
              <span className="font-extrabold">Kid Game Hub</span>
              <span>·</span>
              <span>Ứng dụng giáo dục mầm non tương tác cao, kết nối Smart TV & HDMI</span>
            </div>
            <div className="text-slate-500 text-[11px]">
              Tối ưu hóa 60FPS · Hệ thống Thành Tựu Nhỏ (Badges) · Âm thanh sống động
            </div>
          </div>
        </footer>
      </div>

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

      {showAiDinoModal && (
        <AiDinoChatModal
          onClose={() => setShowAiDinoModal(false)}
          onGameCreated={(newGame) => {
            setGames(getAllGames());
            setActiveGame(newGame);
            setShowAiDinoModal(false);
          }}
        />
      )}

      {showBadgesModal && (
        <BadgesModal
          onClose={() => setShowBadgesModal(false)}
          starsCount={starsCount}
        />
      )}
    </div>
  );
}
