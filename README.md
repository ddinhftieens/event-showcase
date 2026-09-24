# Event Showcase - Trình Chiếu Sự Kiện Ý Nghĩa

Dự án React + TypeScript + Vite hiển thị các sự kiện (Trung Thu, Dạm Ngõ, Tết,...) được tối ưu responsive cho Mobile & Desktop và hỗ trợ triển khai trực tiếp lên **GitHub Pages**.

---

## ✨ Tính Năng Chính
1. **Quản lý sự kiện theo từng thư mục riêng**: Mỗi sự kiện nằm trong một thư mục tại [src/events/](file:///d:/my/event/src/events/) (ví dụ `dam-ngo`, `trung-thu`, `tet`) giúp dễ dàng chỉnh sửa nội dung, thời gian, bài hát và danh sách ảnh.
2. **Ảnh Poster & Thông tin sự kiện**: Poster nổi bật kèm thông tin ngày dương lịch, âm lịch, địa điểm, trích dẫn.
3. **Bộ đếm ngược thời gian thực (Countdown)**: Tự động đếm ngày, giờ, phút, giây đến thời điểm diễn ra sự kiện (hoặc hiển thị trạng thái kỷ niệm nếu sự kiện đã qua).
4. **Trình phát nhạc (Music Player & Playlist)**: Nghe nhạc chủ đề tương ứng theo từng sự kiện với đầy đủ thanh tiến trình, bài trước/sau, danh sách bài hát.
5. **Album ảnh (Photo Gallery) & Lightbox**: Xem ảnh lưới đẹp mắt, click phóng to xem chi tiết, hỗ trợ vuốt chạm cảm ứng (swipe) trên điện thoại và phím mũi tên trên máy tính.
6. **Sẵn sàng cho GitHub Pages**: Cấu hình `base: './'` trong [vite.config.ts](file:///d:/my/event/vite.config.ts) giúp website chạy mượt mà trên cả domain gốc lẫn đường dẫn subfolder của GitHub Pages.

---

## 📁 Cấu Trúc Thư Mục

```
d:/my/event/
├── public/
│   ├── favicon.svg
│   └── events/                     # Nơi bạn đặt nhạc & ảnh thực tế
│       ├── dam-ngo/
│       │   ├── poster.jpg          # Ảnh poster
│       │   ├── audio/              # Nhạc mp3
│       │   └── photos/             # Album ảnh (1.jpg, 2.jpg...)
│       ├── trung-thu/
│       │   ├── poster.jpg
│       │   ├── audio/
│       │   └── photos/
│       └── tet/
│           ├── poster.jpg
│           ├── audio/
│           └── photos/
├── src/
│   ├── App.tsx                     # Ứng dụng chính & chuyển đổi sự kiện
│   ├── main.tsx
│   ├── types/
│   │   └── event.ts                # Định nghĩa kiểu dữ liệu sự kiện
│   ├── hooks/
│   │   └── useCountdown.ts         # Hook đếm ngược thời gian thực
│   ├── components/
│   │   ├── Navbar.tsx              # Thanh điều hướng chọn sự kiện
│   │   ├── HeroPoster.tsx          # Hiển thị poster & thông tin chính
│   │   ├── CountdownSection.tsx    # Khu vực đếm ngược thời gian
│   │   ├── MusicPlaylist.tsx       # Trình phát nhạc theo sự kiện
│   │   ├── PhotoGallery.tsx        # Album ảnh & Lightbox xem toàn màn hình
│   │   ├── FloatingActions.tsx     # Nút nổi nghe nhạc & cuộn lên đầu trang
│   │   └── Footer.tsx
│   ├── events/                     # Nơi cấu hình nội dung các sự kiện
│   │   ├── index.ts                # Registry tổng hợp sự kiện
│   │   ├── dam-ngo/config.ts       # Cấu hình sự kiện Dạm Ngõ
│   │   ├── trung-thu/config.ts     # Cấu hình sự kiện Trung Thu
│   │   └── tet/config.ts           # Cấu hình sự kiện Tết
│   └── styles/
│       └── globals.css             # Thiết kế giao diện & Theme hệ thống
├── index.html
├── package.json
└── vite.config.ts
```

---

## 🚀 Hướng Dẫn Sử Dụng

### 1. Chạy thử nghiệm trên máy (Local Dev)
```bash
npm run dev
```

### 2. Thêm file Nhạc & Ảnh của bạn vào `public/events/`
- Thư mục `public/events/dam-ngo/`: Thêm `poster.jpg`, các bài nhạc vào `audio/`, và các file ảnh vào `photos/`.
- Thư mục `public/events/trung-thu/`: Tương tự cho Trung Thu.
- Thư mục `public/events/tet/`: Tương tự cho Tết.
*(Nếu chưa có file thực tế, giao diện tự động sử dụng ảnh demo chất lượng cao để xem trước)*.

### 3. Thêm một sự kiện mới
1. Tạo thư mục cấu hình mới, ví dụ: `src/events/sinh-nhat/config.ts`.
2. Khai báo tiêu đề, ngày diễn ra, danh sách bài hát, album ảnh và màu sắc theme.
3. Thêm sự kiện đó vào mảng `ALL_EVENTS` trong [src/events/index.ts](file:///d:/my/event/src/events/index.ts).

### 4. Build để đưa lên GitHub Pages
```bash
npm run build
```
Toàn bộ mã nguồn đóng gói sẵn sàng xuất ra thư mục `dist/` để bạn đưa lên nhánh `gh-pages` hoặc thư mục cấu hình GitHub Pages của repository.
