# ReactJS Multi-Theme Calculator (Máy Tính Đa Giao Diện)

Dự án này là một ứng dụng máy tính đa tính năng được xây dựng bằng **ReactJS** và **Vite**. Ứng dụng cung cấp trải nghiệm giao diện tương tác cao với nhiều bộ theme khác nhau cùng khả năng trích xuất bảng màu thông minh từ ảnh nền do người dùng tự tải lên.

---

## 🌟 Các Tính Năng Nổi Bật

1. **9 Giao Diện Có Sẵn**: Tích hợp các bộ chủ đề độc đáo (Dark, Minimal, Cyber Neon, Glassmorphism, Neumorphic 3D, Retro Windows 95, Space Cosmic, Gaming RGB, Gumball Comic).
2. **Theme Tùy Chọn (Custom Image Theme)**:
   - Cho phép tải tệp tin ảnh từ thiết bị lên (`.jpg`, `.jpeg`, `.png`, `.webp`).
   - Tự động trích xuất bảng màu tương thích và áp dụng trực tiếp làm theme nền cho máy tính.
   - Hiển thị hiệu ứng loading chuyên nghiệp phân tích màu sắc và tự động tải lại trang để đồng bộ theme.
   - Hỗ trợ đổi ảnh nền nhanh chóng bằng micro-interaction đổi chữ khi hover qua nút Custom.
3. **Phản Hồi Âm Thanh (Sound Feedback)**: Hỗ trợ bật/tắt âm thanh click chuột khi tính toán.
4. **Hỗ Trợ Đầy Đủ Thiết Bị (Responsive Design)**: Thiết kế tối ưu hóa hiển thị trên cả điện thoại di động và máy tính để bàn (Desktop layout hỗ trợ chia cột màn hình kết quả riêng biệt).

---

## 📋 Yêu Cầu Hệ Thống

Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt:
- [Node.js](https://nodejs.org/) (Khuyến nghị phiên bản **18.x** trở lên)
- Trình quản lý gói hàng **npm** (được cài đặt sẵn cùng Node.js)

---

## ⚙️ Hướng Dẫn Cài Đặt và Khởi Chạy

Khi bạn sao chép (clone) mã nguồn dự án này từ GitHub về máy cá nhân, hãy thực hiện các bước sau để khởi chạy:

### Bước 1: Di chuyển vào thư mục dự án
Mở Command Prompt/PowerShell hoặc Terminal trên máy của bạn và di chuyển tới thư mục chứa code:
```bash
cd calculator
```

### Bước 2: Cài đặt các thư viện phụ thuộc (Dependencies)
Tải và cài đặt tất cả các gói package cần thiết được khai báo trong `package.json`:
```bash
npm install
```

### Bước 3: Khởi chạy dự án ở chế độ phát triển (Development Mode)
Chạy lệnh bên dưới để khởi động local server của Vite:
```bash
npm run dev
```
Sau khi khởi chạy thành công, Terminal sẽ hiển thị địa chỉ truy cập cục bộ (thông thường là `http://localhost:5173/`). Hãy mở trình duyệt và truy cập đường dẫn này để chạy ứng dụng.

---

## 🏗️ Lệnh Đóng Gói và Xem Thử

- **Đóng gói sản phẩm (Build cho Production)**:
  Nếu muốn tối ưu hóa mã nguồn và xuất ra các tệp HTML, CSS, JS tĩnh để triển khai (deploy) lên hosting (Vercel, Netlify...):
  ```bash
  npm run build
  ```
  Sản phẩm đóng gói sẽ nằm trong thư mục `/dist`.

- **Xem thử bản đóng gói (Preview Build)**:
  Để kiểm tra bản build chính thức ngay dưới máy cục bộ:
  ```bash
  npm run preview
  ```

- **Kiểm tra cú pháp (Lint Code)**:
  ```bash
  npm run lint
  ```

---

## 🛠️ Công Nghệ Sử Dụng

- **Core**: React 19 (Hooks, Context API, Reducer)
- **Bundler**: Vite 8 (Hot Module Replacement)
- **Styling**: Vanilla CSS (CSS Variables)
- **Linter**: ESLint
