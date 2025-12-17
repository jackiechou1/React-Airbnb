import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import trackAgain from "@/assets/music/again-no-copyright-music-402159.mp3";
import trackSoft from "@/assets/music/no-copyright-music-soft-background-380073.mp3";
import trackAgainAlt from "@/assets/music/again-no-copyright-music-402159 (1).mp3";

const MusicContext = createContext(null);

const PLAYLIST = [
  trackSoft,
  trackAgain,
  trackAgainAlt,
];

export function MusicProvider({ children }) {
  const audioRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "auto";
    audio.volume = 0.5;
    audioRef.current = audio;

    const handleEnded = () => {
      setIndex((i) => {
        if (i < PLAYLIST.length - 1) return i + 1;
        setEnabled(false);
        setIsPlaying(false);
        return 0;
      });
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.pause();
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = PLAYLIST[index] || "";
    if (enabled) {
      audio.play().catch(() => {
        setIsPlaying(false);
        setEnabled(false);
      });
    } else {
      audio.pause();
    }
  }, [enabled, index]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return false;
    try {
      if (enabled) {
        setEnabled(false);
        setIsPlaying(false);
        audio.pause();
        return false;
      }
      setEnabled(true);
      if (!audio.src) audio.src = PLAYLIST[index] || "";
      await audio.play();
      setIsPlaying(true);
      return true;
    } catch (_) {
      setEnabled(false);
      setIsPlaying(false);
      return false;
    }
  };

  const value = useMemo(() => ({ isPlaying, toggle }), [isPlaying]);
  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
}
