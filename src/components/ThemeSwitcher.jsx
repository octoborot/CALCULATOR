import React, { useState, useRef, useEffect } from 'react';
import { useTheme, THEMES } from '../context/ThemeContext';

const themesList = [
  { id: THEMES.DARK, name: 'Dark', icon: '🌙', desc: 'Modern & Sleek' },
  { id: THEMES.MINIMAL, name: 'Minimal', icon: '⚪', desc: 'Clean contrast' },
  { id: THEMES.NEON, name: 'Neon', icon: '⚡', desc: 'Cyberpunk Glow' },
  { id: THEMES.GLASS, name: 'Glass', icon: '❄️', desc: 'Frosted Glass' },
  { id: THEMES.NEUMORPHIC, name: 'Neumorphic', icon: '🧊', desc: 'Soft 3D curves' },
  { id: THEMES.RETRO, name: 'Retro', icon: '📻', desc: 'Win 95 Classic' },
  { id: THEMES.SPACE, name: 'Space', icon: '🌌', desc: 'Deep Cosmic' },
  { id: THEMES.GAMING, name: 'Gaming', icon: '🎮', desc: 'Chroma RGB LED' },
  { id: THEMES.GUMBALL, name: 'Gumball', icon: '🐱', desc: 'Cartoon Crossing' },
];

const ThemeSwitcher = () => {
  const { theme: activeTheme, setTheme, applyCustomThemeImage } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [hasCustomImage, setHasCustomImage] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const customImg = localStorage.getItem('calculator-custom-image');
    setHasCustomImage(!!customImg);
  }, [activeTheme]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Support JPG, JPEG, PNG, WEBP
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Vui lòng chọn ảnh định dạng .jpg, .jpeg, .png hoặc .webp!');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      applyCustomThemeImage(event.target.result);
      setHasCustomImage(true);
      setIsOpen(false);
    };
    reader.readAsDataURL(file);
  };

  const triggerUpload = (e) => {
    e.stopPropagation(); // Avoid triggering parent button handlers
    fileInputRef.current.click();
  };

  const selectCustomTheme = () => {
    if (hasCustomImage) {
      setTheme(THEMES.CUSTOM);
      setIsOpen(false);
    } else {
      fileInputRef.current.click();
    }
  };

  const getActiveThemeName = () => {
    if (activeTheme === THEMES.CUSTOM) return 'Custom';
    return themesList.find(t => t.id === activeTheme)?.name || 'Dark';
  };

  const getActiveThemeIcon = () => {
    if (activeTheme === THEMES.CUSTOM) return '🖼️';
    return themesList.find(t => t.id === activeTheme)?.icon || '🌙';
  };

  return (
    <div className="theme-switcher-container">
      <button 
        className="theme-switcher-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Switch Theme"
      >
        <span className="active-theme-icon">
          {getActiveThemeIcon()}
        </span>
        <span className="active-theme-name">
          Theme: {getActiveThemeName()}
        </span>
        <span className={`toggle-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {/* Hidden input for custom image uploads */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".jpg,.jpeg,.png,.webp"
        style={{ display: 'none' }}
      />

      {isOpen && (
        <div className="theme-dropdown-overlay" onClick={() => setIsOpen(false)}>
          <div className="theme-dropdown-panel" onClick={(e) => e.stopPropagation()}>
            <div className="theme-dropdown-header">
              <h3>Select Giao Diện</h3>
              <button className="close-dropdown-btn" onClick={() => setIsOpen(false)}>×</button>
            </div>
            
            <div className="theme-grid">
              {themesList.map((t) => (
                <button
                  key={t.id}
                  className={`theme-option-card ${t.id} ${activeTheme === t.id ? 'active' : ''}`}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                >
                  <div className="theme-preview-indicator">
                    <span className="theme-preview-dot"></span>
                  </div>
                  <div className="theme-option-info">
                    <div className="theme-option-name">
                      {t.icon} {t.name}
                    </div>
                    <div className="theme-option-desc">{t.desc}</div>
                  </div>
                </button>
              ))}

              {/* Dynamic Custom Theme Card */}
              <button
                className={`theme-option-card custom ${activeTheme === THEMES.CUSTOM ? 'active' : ''}`}
                onClick={selectCustomTheme}
              >
                <div className="theme-preview-indicator">
                  <span className="theme-preview-dot" style={{ background: 'var(--btn-operator-bg, #ff9f0a)' }}></span>
                </div>
                <div className="theme-option-info" style={{ width: '100%' }}>
                  <div className="theme-option-name" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>🖼️ Custom</span>
                    {hasCustomImage && (
                      <span className="upload-link" onClick={triggerUpload} title="Tải ảnh khác lên">
                        🔄 Đổi ảnh
                      </span>
                    )}
                  </div>
                  <div className="theme-option-desc">
                    {hasCustomImage ? 'Nhấp chọn hoặc đổi ảnh mới' : 'Tải ảnh (.jpg, .png) của bạn lên'}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
