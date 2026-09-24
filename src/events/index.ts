import { trungThuEvent } from './trung-thu/config';
import type { EventConfig } from '../types/event';

export const ALL_EVENTS: EventConfig[] = [
  trungThuEvent,
];

export function getEventById(id: string): EventConfig | undefined {
  const normalized = id.toLowerCase().replace(/[^a-z0-9]/g, '');
  return ALL_EVENTS.find((e) => e.id.toLowerCase().replace(/[^a-z0-9]/g, '') === normalized || e.id === id);
}

export function getDefaultEvent(): EventConfig {
  return ALL_EVENTS[0];
}
