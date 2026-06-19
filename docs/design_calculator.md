# 🧮 React Calculator App

Ứng dụng Calculator được xây dựng bằng **ReactJS + Vite**, tập trung vào trải nghiệm người dùng với giao diện đẹp, responsive và hỗ trợ nhiều chủ đề (Theme System).

---

# 📌 Tổng quan

## Công nghệ sử dụng

* ReactJS
* Vite
* Tailwind CSS hoặc CSS Modules
* useReducer + Custom Hooks

## Mục tiêu

* Giao diện sạch và hiện đại.
* Responsive trên Mobile và Desktop.
* Cấu trúc mã nguồn rõ ràng, dễ mở rộng.
* Hỗ trợ nhiều giao diện (Theme System).
* Tách biệt phần UI và Logic theo Design Pattern.

---

# 🏗 Kiến trúc dự án

Ứng dụng áp dụng:

* Container / Presentational Pattern
* Custom Hooks Pattern

## Cấu trúc thư mục

```text
src
├── components
│   ├── common
│   │   ├── Button.jsx
│   │   ├── Display.jsx
│   │   └── Keypad.jsx
│   │
│   └── calculator
│       └── Calculator.jsx
│
├── hooks
│   └── useCalculator.js
│
├── reducers
│   ├── calculatorReducer.js
│   └── calculatorActions.js
│
├── App.jsx
└── main.jsx
```

---

# 🧩 Components

## Calculator.jsx

Container Component (Smart Component)

Chịu trách nhiệm:

* Gọi custom hook.
* Quản lý state.
* Kết nối toàn bộ UI.

---

## Display.jsx

Presentational Component

Hiển thị:

* currentOperand
* previousOperand
* operation

---

## Keypad.jsx

Presentational Component

Chứa toàn bộ bàn phím máy tính.

---

## Button.jsx

Component tái sử dụng.

Props:

* label
* onClick
* color
* span

---

# ⚙ State Management

Sử dụng `useReducer()` để quản lý trạng thái.

```javascript
{
    currentOperand,
    previousOperand,
    operation
}
```

## Actions

* ADD_DIGIT
* CHOOSE_OPERATION
* CLEAR
* DELETE_DIGIT
* EVALUATE

Logic được đóng gói trong:

```text
useCalculator()
```

---

# 🎨 UI/UX

## Công nghệ

* Tailwind CSS
* CSS Modules
* CSS Grid

## Layout

```css
grid-template-columns: repeat(4, 1fr);
```

Các nút lớn:

* AC
* =

sử dụng:

```css
grid-column: span 2;
```

---

# 📱 Responsive

## Mobile

* Chiếm gần toàn màn hình.
* Nút lớn dễ thao tác.

## Desktop

* max-width: 350px - 400px
* Shadow
* Hover effect

---

# 🌈 Theme System

Ngoài Dark Mode truyền thống, ứng dụng hỗ trợ nhiều chủ đề khác nhau.

## Các theme

### Minimal

Phong cách đơn giản.

### Dark

Giao diện tối hiện đại.

### Neon

Phong cách Cyberpunk.

### Glassmorphism

Hiệu ứng kính mờ.

### Neumorphism

Thiết kế nổi khối mềm.

### Retro

Phong cách cổ điển.

### Space

Chủ đề vũ trụ.

### Gaming

RGB và hiệu ứng phát sáng.

---

# 📂 Mở rộng cấu trúc

```text
src
├── themes
│   ├── darkTheme.js
│   ├── neonTheme.js
│   ├── glassTheme.js
│   ├── retroTheme.js
│   └── spaceTheme.js
│
├── context
│   └── ThemeContext.jsx
│
├── components
│   ├── ThemeSwitcher.jsx
│   ├── Calculator.jsx
│   ├── Display.jsx
│   └── Button.jsx
```

---

# 💾 Lưu cấu hình người dùng

Sử dụng LocalStorage:

```javascript
localStorage.setItem("theme", "neon");
```

Khôi phục khi mở lại:

```javascript
localStorage.getItem("theme");
```

---

# 🚀 Định hướng mở rộng

Kiến trúc tương lai:

```text
Calculator App
│
├── Core Calculator Engine
│
├── Theme Engine
│     ├── Dark
│     ├── Neon
│     ├── Glass
│     ├── Retro
│     └── Space
│
├── Responsive Engine
│
├── Animation Engine
│
└── Persistence Layer
      (LocalStorage)
```

---

# 📅 Roadmap

### 1. Khởi tạo dự án

```bash
npm create vite@latest
```

Cài đặt Tailwind CSS.

---

### 2. Xây dựng UI tĩnh

Mock dữ liệu và thiết kế giao diện.

---

### 3. Viết Reducer

Tách logic tính toán để dễ Unit Test.

---

### 4. Kết nối Components

Truyền state và dispatch.

---

### 5. Hoàn thiện

* Hover effect
* Active effect
* Animation
* Xử lý edge cases

---

# ✨ Điểm nổi bật

* Responsive trên Mobile và Desktop.
* Hỗ trợ nhiều Theme.
* Tách biệt UI và Logic.
* Dễ mở rộng.
* Tập trung vào trải nghiệm người dùng.
* Kiến trúc rõ ràng theo Design Pattern.
