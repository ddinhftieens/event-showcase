import { useState, useRef, useEffect } from 'react';
import type { EventConfig } from '../types/event';
import { resolveAssetUrl } from '../utils/path';
import styles from './FloatingActions.module.css';

interface FloatingMusicButtonProps {
  event: EventConfig;
}

export function FloatingActions({ event }: FloatingMusicButtonProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>('0:00');
  const [duration, setDuration] = useState<string>('0:00');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const songs = event.songs || [];
  const currentSong = songs[currentSongIndex];
  const audioSrc = resolveAssetUrl(currentSong?.src);

  // Reset state when event changes
  useEffect(() => {
    setCurrentSongIndex(0);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime('0:00');
    setDuration('0:00');
  }, [event.id]);

  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    if (isPlaying) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSongIndex, currentSong]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Tự động chuyển bài tiếp theo và lặp vô tận (loop playlist)
  const handleSongEnded = () => {
    if (songs.length === 0) return;
    const nextIdx = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIdx);
    setIsPlaying(true);
  };

  const playSong = (index: number) => {
    if (index === currentSongIndex) {
      togglePlay();
    } else {
      setCurrentSongIndex(index);
      setIsPlaying(true);
    }
  };

  const playNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (songs.length === 0) return;
    const nextIdx = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIdx);
    setIsPlaying(true);
  };

  const playPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (songs.length === 0) return;
    const prevIdx = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIdx);
    setIsPlaying(true);
  };

  const formatTime = (secs: number): string => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const cur = audioRef.current.currentTime;
    const dur = audioRef.current.duration;
    if (dur > 0) {
      setProgress((cur / dur) * 100);
      setCurrentTime(formatTime(cur));
      setDuration(formatTime(dur));
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = pct * (audioRef.current.duration || 0);
    audioRef.current.currentTime = newTime;
    setProgress(pct * 100);
  };

  if (songs.length === 0) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleSongEnded}
        onError={() => setIsPlaying(false)}
      />

      <aside
        className={styles.floatingWrapper}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Trình phát nhạc sự kiện"
      >
        {/* Playlist Popup Menu (Hiển thị khi hover) */}
        <div
          className={`${styles.playlistCard} ${isHovered ? styles.playlistCardOpen : ''}`}
          style={{
            boxShadow: `0 24px 60px rgba(0, 0, 0, 0.85), 0 0 40px ${event.theme.glowColor || 'rgba(245, 158, 11, 0.35)'}`,
          }}
        >
          {/* Card Header */}
          <div className={styles.playlistHeader}>
            <div className={styles.headerTitleRow}>
              <div className={styles.liveDot} style={{ backgroundColor: isPlaying ? '#22c55e' : '#94a3b8' }} />
              <div>
                <div className={styles.headerLabel}>DANH SÁCH BÀI HÁT</div>
                <div className={styles.songCountSub}>{songs.length} bài hát • {isPlaying ? 'Đang phát' : 'Tạm dừng'}</div>
              </div>
            </div>

            {/* Header Mini Controls */}
            <div className={styles.headerControls}>
              <button onClick={playPrev} className={styles.miniBtn} title="Bài trước" aria-label="Bài trước">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="11 19 2 12 11 5 11 19" />
                  <polygon points="22 19 13 12 22 5 22 19" />
                </svg>
              </button>

              <button
                onClick={togglePlay}
                className={styles.miniPlayBtn}
                style={{
                  background: `linear-gradient(135deg, ${event.theme.accentColor || '#fde047'} 0%, ${event.theme.primaryColor || '#f59e0b'} 100%)`,
                }}
                title={isPlaying ? 'Tạm dừng' : 'Phát'}
                aria-label={isPlaying ? 'Tạm dừng' : 'Phát'}
              >
                {isPlaying ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#0f0c08">
                    <rect x="6" y="4" width="4" height="16" rx="1.5" />
                    <rect x="14" y="4" width="4" height="16" rx="1.5" />
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#0f0c08" style={{ marginLeft: '1.5px' }}>
                    <polygon points="6 4 20 12 6 20 6 4" />
                  </svg>
                )}
              </button>

              <button onClick={playNext} className={styles.miniBtn} title="Bài tiếp" aria-label="Bài tiếp">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="13 19 22 12 13 5 13 19" />
                  <polygon points="2 19 11 12 2 5 2 19" />
                </svg>
              </button>
            </div>
          </div>

          {/* List of songs */}
          <div className={styles.songList}>
            {songs.map((song, idx) => {
              const isCurrent = idx === currentSongIndex;
              return (
                <div
                  key={song.id}
                  onClick={() => playSong(idx)}
                  className={`${styles.songItem} ${isCurrent ? styles.songItemActive : ''}`}
                  style={
                    isCurrent
                      ? {
                          borderColor: 'rgba(255, 255, 255, 0.18)',
                          background: `linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)`,
                        }
                      : {}
                  }
                >
                  <div className={styles.songItemLeft}>
                    <div
                      className={`${styles.itemIndexBox} ${isCurrent ? styles.indexActive : ''}`}
                      style={{
                        color: isCurrent ? (event.theme.accentColor || '#fde047') : '#64748b',
                      }}
                    >
                      {isCurrent && isPlaying ? (
                        <div className={styles.songItemWave}>
                          <span />
                          <span />
                          <span />
                        </div>
                      ) : (
                        <span>{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                      )}
                    </div>

                    <div className={styles.itemInfo}>
                      <div
                        className={styles.itemTitle}
                        style={{
                          color: isCurrent ? '#ffffff' : '#cbd5e1',
                          fontWeight: isCurrent ? '700' : '500',
                        }}
                      >
                        {song.title}
                      </div>
                      {song.artist && (
                        <div
                          className={styles.itemArtist}
                          style={{
                            color: isCurrent ? (event.theme.accentColor || '#fde047') : '#94a3b8',
                            opacity: isCurrent ? 0.9 : 0.7,
                          }}
                        >
                          {song.artist}
                        </div>
                      )}
                    </div>
                  </div>

                  <span className={styles.itemDuration}>{song.duration || '3:30'}</span>
                </div>
              );
            })}
          </div>

          {/* Now Playing Bar & Interactive Seek Track */}
          <div className={styles.cardFooter}>
            <div className={styles.nowPlayingTitle}>
              <span>{isPlaying ? 'Đang phát:' : 'Tạm dừng:'}</span>
              <strong>{currentSong?.title}</strong>
            </div>

            <div className={styles.trackContainer} onClick={handleSeek} role="slider" aria-valuenow={progress}>
              <div className={styles.trackBg}>
                <div
                  className={styles.trackFill}
                  style={{
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, ${event.theme.primaryColor || '#f59e0b'}, ${event.theme.accentColor || '#fde047'})`,
                  }}
                >
                  <div className={styles.trackKnob} style={{ backgroundColor: event.theme.accentColor || '#fde047' }} />
                </div>
              </div>
            </div>

            <div className={styles.timeInfoRow}>
              <span>{currentTime}</span>
              <span>{duration !== '0:00' ? duration : currentSong?.duration || '--:--'}</span>
            </div>
          </div>
        </div>

        {/* Main Floating Trigger (Đĩa than Vinyl trung tâm phát sóng âm) */}
        <button
          onClick={togglePlay}
          className={`${styles.circleBtn} ${isPlaying ? styles.spinningDisc : ''}`}
          style={{
            borderColor: isPlaying ? (event.theme.accentColor || '#fde047') : 'rgba(255, 255, 255, 0.25)',
            boxShadow: isPlaying
              ? `0 12px 40px rgba(0, 0, 0, 0.85), 0 0 35px ${event.theme.glowColor || 'rgba(245, 158, 11, 0.55)'}`
              : `0 10px 30px rgba(0, 0, 0, 0.7)`,
          }}
          title={isPlaying ? `Tạm dừng (${currentSong?.title})` : `Phát nhạc (${currentSong?.title})`}
          aria-label={isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc'}
        >
          {/* Vinyl Grooves texture */}
          <div className={styles.vinylGrooves} />

          {/* Center Soundwave & Play/Pause Display */}
          <div
            className={styles.centerBadge}
            style={{
              background: isPlaying
                ? `radial-gradient(circle, ${event.theme.primaryColor || '#f59e0b'} 0%, #1a1208 100%)`
                : `radial-gradient(circle, #2a2536 0%, #120e1a 100%)`,
              borderColor: event.theme.accentColor || '#fde047',
            }}
          >
            {isPlaying ? (
              /* Animated Audio Waves right in the center */
              <div className={styles.centerWaves}>
                <span style={{ backgroundColor: '#ffffff' }} />
                <span style={{ backgroundColor: '#ffffff' }} />
                <span style={{ backgroundColor: '#ffffff' }} />
                <span style={{ backgroundColor: '#ffffff' }} />
                <span style={{ backgroundColor: '#ffffff' }} />
              </div>
            ) : (
              /* Play triangle icon */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff" style={{ marginLeft: '2px' }}>
                <polygon points="6 4 20 12 6 20 6 4" />
              </svg>
            )}
          </div>
        </button>
      </aside>
    </>
  );
}
