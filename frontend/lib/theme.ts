import { createTheme, ThemeOptions } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') => {
  const isDark = mode === 'dark';
  
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#ED2100', // Sergipanidade Red
        contrastText: '#fff',
      },
      secondary: {
        main: isDark ? '#F1F5F9' : '#1E293B',
      },
      background: {
        default: isDark ? '#0F172A' : '#FDFCFB',
        paper: isDark ? '#1E293B' : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#F8FAFC' : '#0F172A',
        secondary: isDark ? '#94A3B8' : '#64748B',
      },
      divider: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
    },
    typography: {
      fontFamily: '"Outfit", "Inter", "Roboto", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '1.5rem',
        color: '#ED2100',
      },
      h2: {
        fontWeight: 600,
        fontSize: '1.25rem',
      },
      body1: {
        fontSize: '1rem',
      },
      body2: {
        fontSize: '0.875rem',
      },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 24,
            padding: '8px 20px',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none', // Remove the default overlay in dark mode
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  });
};

const theme = getTheme('light');
export default theme;
