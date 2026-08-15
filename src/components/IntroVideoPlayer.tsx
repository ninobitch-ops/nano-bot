import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Sparkles, Volume2, VolumeX, CheckCircle, Video, Download } from 'lucide-react';
import { ProjectBrandAsset } from '../types';

interface IntroVideoPlayerProps {
  introVideo: NonNullable<ProjectBrandAsset['introVideo']>;
  projectName: string;
  onAddToProject?: () => void;
  isEmbeddedInProject?: boolean;
}

export const IntroVideoPlayer: React.FC<IntroVideoPlayerProps> = ({
  introVideo,
  projectName,
  onAddToProject,
  isEmbeddedInProject,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSceneIdx, setCurrentSceneIdx] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const totalScenes = introVideo.scenes.length || 1;
  const currentScene = introVideo.scenes[currentSceneIdx] || {
    text: introVideo.title,
    subtext: introVideo.tagline,
    visualIcon: 'Sparkles',
    duration: 4,
  };

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            // Move to next scene or loop
            setCurrentSceneIdx((curr) => {
              if (curr + 1 >= totalScenes) {
                setIsPlaying(false);
                return 0;
              }
              return curr + 1;
            });
            return 0;
          }
          return prev + 2.5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalScenes]);

  const handlePlayToggle = () => {
    if (!isPlaying && currentSceneIdx >= totalScenes - 1 && progress >= 95) {
      setCurrentSceneIdx(0);
      setProgress(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setCurrentSceneIdx(0);
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex flex-col">
      {/* Video Viewport / Canvas */}
      <div className={`relative aspect-[16/9] w-full bg-gradient-to-br ${introVideo.bgStyle || 'from-indigo-950 via-slate-950 to-black'} flex flex-col items-center justify-center p-6 text-center overflow-hidden select-none`}>
        {/* Animated Background Mesh & Glow */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-indigo-500 blur-3xl animate-pulse" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-pink-500 blur-3xl animate-pulse" />
        </div>

        {/* Scene Indicator Floating Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-xs font-mono text-indigo-300 font-bold flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5" />
            SCENE {currentSceneIdx + 1} / {totalScenes}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-[10px] font-mono border border-indigo-500/30">
            {introVideo.durationSeconds}s Commercial
          </span>
        </div>

        {/* Brand Stamp Watermark */}
        <div className="absolute top-4 right-4 text-right">
          <span className="text-[10px] font-mono text-slate-400 font-semibold tracking-wider">
            NINO GENERATED INTRO
          </span>
        </div>

        {/* Scene Visual & Kinetic Typography */}
        <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
          {/* Animated Icon Glow */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-pink-500 p-0.5 mb-4 shadow-xl shadow-indigo-500/30 animate-bounce">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-white">
              <Sparkles className="w-8 h-8 text-indigo-400" />
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2 drop-shadow-md">
            {currentScene.text}
          </h3>
          <p className="text-sm sm:text-base text-slate-300 font-medium max-w-md drop-shadow">
            {currentScene.subtext}
          </p>

          {/* Sound Wave Animation if playing */}
          {isPlaying && (
            <div className="flex items-center gap-1 mt-6">
              {[40, 70, 30, 90, 50, 80, 45, 65, 85, 35].map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-indigo-400 rounded-full animate-pulse"
                  style={{
                    height: `${(h * (progress % 50 + 50)) / 100}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Progress Bar overlay at bottom of canvas */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800/80">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-100 ease-linear"
            style={{ width: `${((currentSceneIdx * 100) + progress) / totalScenes}%` }}
          />
        </div>
      </div>

      {/* Control Bar & Sound Track Information */}
      <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            id="intro-video-play-btn"
            onClick={handlePlayToggle}
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md shadow-indigo-600/30"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
          </button>

          <button
            id="intro-video-restart-btn"
            onClick={handleRestart}
            title="Restart Video"
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? 'Unmute' : 'Mute'}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-indigo-400" />}
          </button>

          <div className="text-xs text-slate-400 truncate max-w-[200px]">
            <span className="block font-semibold text-slate-200 truncate">{introVideo.musicTrack}</span>
            <span className="text-[10px] text-slate-500">Programmatic Synthetic Audio</span>
          </div>
        </div>

        {/* Action: Add to Project Button */}
        {onAddToProject && (
          <button
            id="add-intro-video-to-project-btn"
            onClick={onAddToProject}
            className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              isEmbeddedInProject
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                : 'bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white shadow-lg shadow-indigo-600/20 border border-indigo-400/30'
            }`}
          >
            {isEmbeddedInProject ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Intro Video Added to App Splash</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Add Intro Video into Project</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
