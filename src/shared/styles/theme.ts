export const theme = {
  colors: {
    primary: '#2563eb',
    secondary: '#4b5563',
    background: '#ffffff',
    text: '#1f2937',
    accent: '#3b82f6',
    error: '#ef4444',
    success: '#22c55e',
  },
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '1280px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    heading: {
      fontWeight: 700,
      lineHeight: 1.2,
    },
    body: {
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
} as const;
