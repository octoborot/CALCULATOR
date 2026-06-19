import { useState, useEffect, useCallback } from 'react';
import { ThemeContext } from './ThemeContext.js';
import { THEMES } from '../constants/themeConstants';
import { extractColorsFromImage, applyCustomStyles, clearCustomStyles } from '../utils/themeUtils';

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    const savedTheme = localStorage.getItem('calculator-theme');
    if (savedTheme === THEMES.CUSTOM) {
      const dataUrl = localStorage.getItem('calculator-custom-image');
      const paletteStr = localStorage.getItem('calculator-custom-palette');
      if (dataUrl && paletteStr) {
        return THEMES.CUSTOM;
      } else {
        return THEMES.DARK; // Fallback if no custom image stored
      }
    }
    return savedTheme || THEMES.DARK;
  });

  const applyCustomThemeImage = useCallback(async (dataUrl) => {
    const palette = await extractColorsFromImage(dataUrl);
    localStorage.setItem('calculator-custom-image', dataUrl);
    localStorage.setItem('calculator-custom-palette', JSON.stringify(palette));
    localStorage.setItem('calculator-theme', THEMES.CUSTOM);
    setThemeState(THEMES.CUSTOM);
  }, []);

  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('calculator-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);

    if (theme === THEMES.CUSTOM) {
      const dataUrl = localStorage.getItem('calculator-custom-image');
      const paletteStr = localStorage.getItem('calculator-custom-palette');
      if (dataUrl && paletteStr) {
        try {
          applyCustomStyles(dataUrl, JSON.parse(paletteStr));
        } catch (e) {
          console.error('Error applying custom theme:', e);
          clearCustomStyles();
        }
      }
    } else {
      clearCustomStyles();
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, applyCustomThemeImage }}>
      {children}
    </ThemeContext.Provider>
  );
};
