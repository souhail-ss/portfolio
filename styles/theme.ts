export const theme = {
  colors: {
    // Primary palette - Black & Orange
    primary: '#FF6B00',
    primaryLight: '#FF8533',
    primaryDark: '#CC5500',
    secondary: '#FF8C00',
    accent: '#FFA500',

    // Backgrounds - Deep black
    background: '#0A0A0A',
    backgroundLight: '#141414',
    surface: '#1A1A1A',
    surfaceLight: '#242424',

    // Text hierarchy
    text: '#FFFFFF',
    textSecondary: '#A3A3A3',
    textMuted: '#666666',

    // Borders
    border: '#2A2A2A',
    borderLight: '#3A3A3A',

    // Status
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',

    // Gradients
    gradient: 'linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%)',
    gradientPrimary: 'linear-gradient(135deg, #FF6B00 0%, #FFA500 100%)',
    gradientSubtle: 'linear-gradient(135deg, rgba(255, 107, 0, 0.1) 0%, rgba(255, 140, 0, 0.05) 100%)',
    gradientDark: 'linear-gradient(180deg, #0A0A0A 0%, #141414 100%)',
    gradientGlow: 'radial-gradient(circle, rgba(255, 107, 0, 0.2) 0%, transparent 70%)',
  },
  fonts: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
    display: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    '4xl': '2.5rem',
    '5xl': '3.5rem',
    '6xl': '4.5rem',
    '7xl': '6rem',
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem',
    '6xl': '12rem',
  },
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.5)',
    md: '0 4px 6px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 25px rgba(0, 0, 0, 0.5)',
    xl: '0 20px 50px rgba(0, 0, 0, 0.6)',
    glow: '0 0 40px rgba(255, 107, 0, 0.3)',
    glowStrong: '0 0 60px rgba(255, 107, 0, 0.5)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: '500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  zIndices: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    modal: 1200,
    popover: 1300,
    toast: 1400,
    tooltip: 1500,
  },
};

export type Theme = typeof theme;
