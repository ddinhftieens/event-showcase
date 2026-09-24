# Hướng dẫn quản lý sự kiện trong `src/events/`

Mỗi sự kiện được tổ chức trong 1 thư mục riêng biệt giúp bạn dễ dàng chỉnh sửa hoặc bổ sung sự kiện mới.

## Cấu trúc thư mục hiện tại:
```
src/events/
├── index.ts               # Registry tổng hợp tất cả sự kiện
├── dam-ngo/
│   └── config.ts          # Cấu hình sự kiện Lễ Dạm Ngõ
├── trung-thu/
│   └── config.ts          # Cấu hình sự kiện Tết Trung Thu
└── tet/
    └── config.ts          # Cấu hình sự kiện Tết Nguyên Đán
```

## Cách thêm 1 sự kiện mới:
1. Tạo thư mục mới trong `src/events/` (ví dụ: `src/events/sinh-nhat/config.ts`).
2. Định nghĩa cấu hình sự kiện theo mẫu `EventConfig`:
   - `id`: Tên định danh (slug) dùng trong URL (ví dụ: `'sinh-nhat'`)
   - `title`: Tên hiển thị (ví dụ: `'Tiệc Sinh Nhật'`)
   - `date`: Thời gian diễn ra (`'2026-10-20T18:00:00'`)
   - `poster`: Đường dẫn ảnh poster trong `public/events/sinh-nhat/poster.jpg`
   - `songs`: Danh sách bài hát tương ứng
   - `photos`: Danh sách album ảnh
   - `theme`: Bộ màu sắc (primaryColor, accentColor, glowColor...)
3. Mở [src/events/index.ts](file:///d:/my/event/src/events/index.ts) và thêm sự kiện mới vào mảng `ALL_EVENTS`.
