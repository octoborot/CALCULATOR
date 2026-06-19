import { useState, useRef } from 'react';
import { useTheme } from '../hooks/useTheme';
import { THEMES } from '../constants/themeConstants';
import { rotateImage90Degrees } from '../utils/themeUtils';

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
  const [hasCustomImage, setHasCustomImage] = useState(() => {
    return !!localStorage.getItem('calculator-custom-image');
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);

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
    reader.onload = async (event) => {
      setIsAnalyzing(true);
      setIsOpen(false);
      try {
        // Wait at least 1.2s to make it feel premium, and perform extraction
        await Promise.all([
          applyCustomThemeImage(event.target.result),
          new Promise((resolve) => setTimeout(resolve, 1200))
        ]);
        setHasCustomImage(true);
        // Reload page to apply the latest theme
        window.location.reload();
      } catch (err) {
        console.error('Error analyzing image:', err);
        setIsAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCustomClick = (e) => {
    e.stopPropagation();
    if (activeTheme === THEMES.CUSTOM) {
      // If already custom theme, click should trigger file input to upload new image
      fileInputRef.current.click();
    } else {
      if (hasCustomImage) {
        // If has custom image but not currently active, activate it
        setTheme(THEMES.CUSTOM);
      } else {
        // Otherwise prompt upload
        fileInputRef.current.click();
      }
    }
  };

  const handleRotate = async (e) => {
    e.stopPropagation();
    const currentImg = localStorage.getItem('calculator-custom-image');
    if (!currentImg) return;
    
    setIsAnalyzing(true);
    try {
      const rotated = await rotateImage90Degrees(currentImg);
      await applyCustomThemeImage(rotated);
      window.location.reload();
    } catch (err) {
      console.error('Error rotating background image:', err);
      setIsAnalyzing(false);
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
    <>
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
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Outside Custom Theme Button */}
      <button
        className={`custom-theme-toggle ${activeTheme === THEMES.CUSTOM ? 'active' : ''}`}
        onClick={handleCustomClick}
        title={hasCustomImage ? "Nhấp để đổi ảnh hoặc kích hoạt theme Custom" : "Tải ảnh từ thiết bị lên"}
      >
        <span className="custom-theme-icon">🖼️</span>
        <span className="custom-theme-text">
          {activeTheme === THEMES.CUSTOM ? "Custom" : (hasCustomImage ? "Custom" : "Tải ảnh")}
        </span>
      </button>

      {/* Rotate Button (only shown when custom theme is active and has image) */}
      {activeTheme === THEMES.CUSTOM && hasCustomImage && (
        <button
          className="custom-theme-rotate"
          onClick={handleRotate}
          title="Xoay hình nền 90°"
          aria-label="Rotate Image"
        >
          🔄
        </button>
      )}

      {/* Screen loading overlay for color analysis */}
      {isAnalyzing && (
        <div className="theme-loading-overlay">
          <div className="theme-loading-content">
            <div className="theme-spinner"></div>
            <p>Đang phân tích màu sắc và thiết lập giao diện...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ThemeSwitcher;
