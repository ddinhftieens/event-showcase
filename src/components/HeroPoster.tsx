import { useState, useRef } from 'react';
import type { EventConfig } from '../types/event';
import { resolveAssetUrl } from '../utils/path';
import styles from './HeroPoster.module.css';

interface HeroPosterProps {
  event: EventConfig;
}

export function HeroPoster({ event }: HeroPosterProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const rawSrc = imgError ? event.posterFallback : event.poster;
  const posterSrc = resolveAssetUrl(rawSrc);

  return (
    <div className={styles.fullPosterContainer}>
      <div className={styles.bgGlow} style={{ background: event.theme.bgGradient }} />

      <div className={styles.posterWrapper}>
        {!imgLoaded && (
          <div className={styles.loaderContainer}>
            {/* Ambient Background Aura */}
            <div
              className={styles.loaderGlow}
              style={{
                background: `radial-gradient(circle, ${event.theme.glowColor || 'rgba(245, 158, 11, 0.35)'} 0%, transparent 70%)`,
              }}
            />

            {/* Event Title & Shimmering Status */}
            <div className={styles.loaderTextGroup}>
              <h2 className={styles.loaderTitle}>{event.title}</h2>
              <div className={styles.shimmerLineWrapper}>
                <div
                  className={styles.shimmerLine}
                  style={{
                    background: `linear-gradient(90deg, transparent, ${event.theme.accentColor || '#fde047'}, transparent)`,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        <img
          ref={imgRef}
          src={posterSrc}
          alt={`Poster ${event.title}`}
          className={`${styles.fullPosterImg} ${imgLoaded ? styles.imgVisible : ''}`}
          onLoad={() => setImgLoaded(true)}
          onError={() => {
            if (!imgError && event.posterFallback) {
              setImgError(true);
            }
          }}
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  );
}
