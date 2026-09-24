import type { EventConfig } from '../../types/event';

export const trungThuEvent: EventConfig = {
  id: 'trung-thu',
  title: 'Tết Trung Thu',
  poster: 'events/trungthu/image/trung_thu_1.png',
  posterFallback: 'events/trungthu/image/trung_thu_1.png',
  favicon: 'events/trungthu/favicon/trungthu.png',
  theme: {
    primaryColor: '#f59e0b',
    accentColor: '#fde047',
    bgGradient: 'radial-gradient(ellipse at 50% 50%, #362208 0%, #171109 60%, #080706 100%)',
    glowColor: 'rgba(245, 158, 11, 0.45)',
  },
  songs: [
    {
      id: 'tt-1',
      title: 'Chiếc Đèn Ông Sao',
      artist: 'Phạm Tuyên',
      src: 'events/trungthu/mp3/chiec_den_ong_sao.mp3',
      duration: '3:20',
    },
    {
      id: 'tt-2',
      title: 'Rước Đèn Tháng Tám',
      artist: 'Đức Quỳnh',
      src: 'events/trungthu/mp3/ruoc_den_thang_tam.mp3',
      duration: '3:05',
    },
    {
      id: 'tt-3',
      title: 'Đêm Trung Thu',
      artist: 'Thiếu Nhi',
      src: 'events/trungthu/mp3/dem_trung_thu.mp3',
      duration: '3:45',
    },
  ],
};
