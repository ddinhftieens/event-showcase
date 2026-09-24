import { useState, useEffect } from 'react';
import { getEventById, getDefaultEvent } from './events';
import type { EventConfig } from './types/event';
import { resolveAssetUrl } from './utils/path';
import { HeroPoster } from './components/HeroPoster';
import { FloatingActions } from './components/FloatingActions';

// Helper to resolve event from current URL (path, search param, or hash)
function getEventFromLocation(): EventConfig {
  // 1. Check search param (?event=trungthu or ?e=trungthu)
  const params = new URLSearchParams(window.location.search);
  const paramEvent = params.get('event') || params.get('e') || params.get('id');
  if (paramEvent) {
    const match = getEventById(paramEvent);
    if (match) return match;
  }

  // 2. Check path name (/events/trungthu, /trungthu, etc., ignoring repo name if on gh-pages)
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  for (const part of pathParts) {
    if (part !== 'events' && part !== 'event-showcase') {
      const match = getEventById(part);
      if (match) return match;
    }
  }

  // 3. Check hash (#trungthu or #/trungthu)
  const hash = window.location.hash.replace(/^[#/]+/, '').trim();
  if (hash) {
    const match = getEventById(hash);
    if (match) return match;
  }

  return getDefaultEvent();
}

export default function App() {
  const [currentEvent, setCurrentEvent] = useState<EventConfig>(getEventFromLocation);

  // Sync document title and favicon
  useEffect(() => {
    document.title = `${currentEvent.title}`;

    // Update favicon
    const rawFavicon = currentEvent.favicon || 'favicon.svg';
    const faviconHref = resolveAssetUrl(rawFavicon);
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = faviconHref;
    if (rawFavicon.endsWith('.png')) {
      link.type = 'image/png';
    } else if (rawFavicon.endsWith('.svg')) {
      link.type = 'image/svg+xml';
    }
  }, [currentEvent]);

  // Sync event when user navigates (popstate or hashchange)
  useEffect(() => {
    const handleLocationChange = () => {
      const event = getEventFromLocation();
      setCurrentEvent(event);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  return (
    <div
      style={
        {
          '--primary': currentEvent.theme.primaryColor,
          '--accent': currentEvent.theme.accentColor,
          '--glowColor': currentEvent.theme.glowColor,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: '#000000',
        } as React.CSSProperties
      }
    >
      <HeroPoster event={currentEvent} />
      <FloatingActions event={currentEvent} />
    </div>
  );
}
