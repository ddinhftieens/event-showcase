export interface SongItem {
  id: string;
  title: string;
  artist?: string;
  src: string;
  duration?: string;
}

export interface EventTheme {
  primaryColor: string;
  accentColor: string;
  bgGradient: string;
  cardBg?: string;
  tagBg?: string;
  glowColor?: string;
}

export interface EventConfig {
  id: string;             // slug dùng cho URL param / path: e.g. 'trungthu', 'damngo', 'tet'
  title: string;          // Tên sự kiện: e.g. "Tết Trung Thu"
  poster: string;         // Đường dẫn ảnh poster trong folder public
  posterFallback?: string;
  favicon?: string;       // Đường dẫn favicon riêng cho sự kiện
  theme: EventTheme;      // Bộ màu sắc
  songs: SongItem[];      // Danh sách bài hát MP3
}
