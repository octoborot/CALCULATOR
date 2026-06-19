// Extract dynamic color palette from base64 data URL using a tiny canvas
export const extractColorsFromImage = (dataUrl) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 30;
        canvas.height = 30;
        ctx.drawImage(img, 0, 0, 30, 30);

        const imgData = ctx.getImageData(0, 0, 30, 30).data;
        let rSum = 0, gSum = 0, bSum = 0;
        const colors = [];

        for (let i = 0; i < imgData.length; i += 4) {
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];

          rSum += r;
          gSum += g;
          bSum += b;

          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const sat = max - min;

          // Filter out grays/extreme light/darks for dominant vibrant colors
          if (sat > 40 && max > 40 && min < 215) {
            colors.push({ r, g, b, sat });
          }
        }

        const pixelCount = imgData.length / 4;
        const avgR = Math.round(rSum / pixelCount);
        const avgG = Math.round(gSum / pixelCount);
        const avgB = Math.round(bSum / pixelCount);
        const avgBrightness = (avgR * 299 + avgG * 587 + avgB * 114) / 1000;

        // Sort colors by saturation descending to get vivid accents
        colors.sort((a, b) => b.sat - a.sat);

        let primaryColor = 'rgb(91, 178, 241)'; // Gumball Blue default
        let secondaryColor = 'rgb(241, 112, 62)'; // Darwin Orange default

        if (colors.length > 0) {
          const p = colors[0];
          primaryColor = `rgb(${p.r}, ${p.g}, ${p.b})`;

          let foundDistinct = false;
          for (let i = 1; i < colors.length; i++) {
            const s = colors[i];
            // Euclidean distance in RGB space
            const dist = Math.sqrt(
              Math.pow(p.r - s.r, 2) +
              Math.pow(p.g - s.g, 2) +
              Math.pow(p.b - s.b, 2)
            );
            if (dist > 85) {
              secondaryColor = `rgb(${s.r}, ${s.g}, ${s.b})`;
              foundDistinct = true;
              break;
            }
          }
          if (!foundDistinct) {
            // Hue fallback inversion
            secondaryColor = `rgb(${255 - p.r}, ${255 - p.g}, ${255 - p.b})`;
          }
        }

        resolve({
          avgBrightness,
          primaryColor,
          secondaryColor,
          averageColor: `rgb(${avgR}, ${avgG}, ${avgB})`
        });
      } catch (e) {
        console.error('Error drawing image for color extraction:', e);
        resolve({
          avgBrightness: 150,
          primaryColor: 'rgb(91, 178, 241)',
          secondaryColor: 'rgb(241, 112, 62)',
          averageColor: 'rgb(200, 200, 200)'
        });
      }
    };
    img.onerror = () => {
      resolve({
        avgBrightness: 150,
        primaryColor: 'rgb(91, 178, 241)',
        secondaryColor: 'rgb(241, 112, 62)',
        averageColor: 'rgb(200, 200, 200)'
      });
    };
    img.src = dataUrl;
  });
};

export const applyCustomStyles = (dataUrl, palette) => {
  const root = document.documentElement;
  const isLightImage = palette.avgBrightness > 128;

  // Custom theme variables
  const styles = {
    '--app-bg': `url(${dataUrl}) no-repeat center center / cover`,
    '--calc-bg': isLightImage ? 'rgba(253, 251, 246, 0.5)' : 'rgba(26, 26, 30, 0.5)',
    '--calc-border': isLightImage ? '#000000' : '#ffffff',
    '--calc-shadow': isLightImage ? '8px 8px 0px #000000' : '8px 8px 0px #ffffff',
    '--display-bg': isLightImage ? '#ffffff' : '#121216',
    '--display-border': isLightImage ? '#000000' : '#ffffff',
    '--display-text-current': isLightImage ? '#000000' : '#ffffff',
    '--display-text-prev': isLightImage ? '#555555' : '#8e8e93',

    // Digits
    '--btn-digit-bg': isLightImage ? '#fdedc5' : '#26262d',
    '--btn-digit-text': isLightImage ? '#000000' : '#ffffff',
    '--btn-digit-border': isLightImage ? '2px solid #000000' : '2px solid #ffffff',
    '--btn-digit-shadow': isLightImage ? '3px 3px 0px #000000' : '3px 3px 0px #ffffff',
    '--btn-digit-hover': isLightImage ? '#fbe5aa' : '#33333e',
    '--btn-digit-active': isLightImage ? '#e5cb8e' : '#40404f',

    // Operators
    '--btn-operator-bg': palette.primaryColor,
    '--btn-operator-text': '#ffffff',
    '--btn-operator-border': isLightImage ? '2px solid #000000' : '2px solid #ffffff',
    '--btn-operator-shadow': isLightImage ? '3px 3px 0px #000000' : '3px 3px 0px #ffffff',
    '--btn-operator-hover': palette.primaryColor,
    '--btn-operator-active': palette.primaryColor,

    // Actions
    '--btn-action-bg': palette.secondaryColor,
    '--btn-action-text': '#ffffff',
    '--btn-action-border': isLightImage ? '2px solid #000000' : '2px solid #ffffff',
    '--btn-action-shadow': isLightImage ? '3px 3px 0px #000000' : '3px 3px 0px #ffffff',
    '--btn-action-hover': palette.secondaryColor,
    '--btn-action-active': palette.secondaryColor,

    // Switcher & Footer
    '--text-footer': isLightImage ? '#000000' : '#ffffff',
    '--theme-toggle-bg': isLightImage ? '#fdedc5' : '#26262d',
    '--theme-toggle-text': isLightImage ? '#000000' : '#ffffff',
    '--theme-toggle-hover': isLightImage ? '#fbe5aa' : '#33333e',
    '--card-radius': '24px',
    '--btn-radius': '16px'
  };

  Object.entries(styles).forEach(([prop, val]) => {
    root.style.setProperty(prop, val);
  });
};

export const clearCustomStyles = () => {
  const root = document.documentElement;
  const properties = [
    '--app-bg', '--calc-bg', '--calc-border', '--calc-shadow',
    '--display-bg', '--display-border', '--display-text-current', '--display-text-prev',
    '--btn-digit-bg', '--btn-digit-text', '--btn-digit-border', '--btn-digit-shadow', '--btn-digit-hover', '--btn-digit-active',
    '--btn-operator-bg', '--btn-operator-text', '--btn-operator-border', '--btn-operator-shadow', '--btn-operator-hover', '--btn-operator-active',
    '--btn-action-bg', '--btn-action-text', '--btn-action-border', '--btn-action-shadow', '--btn-action-hover', '--btn-action-active',
    '--text-footer', '--theme-toggle-bg', '--theme-toggle-text', '--theme-toggle-hover'
  ];
  properties.forEach(prop => root.style.removeProperty(prop));
};

// Rotate Base64 image 90 degrees clockwise
export const rotateImage90Degrees = (dataUrl) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Swap dimensions for 90-degree rotation
        canvas.width = img.height;
        canvas.height = img.width;

        // Translate context to center and rotate
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((90 * Math.PI) / 180);

        // Draw the image centered
        ctx.drawImage(img, -img.width / 2, -img.height / 2);

        // Export rotated image as JPEG base64 URL
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      } catch (e) {
        reject(e);
      }
    };
    img.onerror = (e) => reject(e);
    img.src = dataUrl;
  });
};
