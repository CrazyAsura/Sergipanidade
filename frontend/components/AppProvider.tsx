'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { store, persistor } from '@/lib/store';
import { getTheme } from '@/lib/theme';

interface AppProviderProps {
  children: ReactNode;
}

function MuiThemeWrapper({ children }: { children: ReactNode }) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Wait until mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentMode = (resolvedTheme || theme) === 'dark' ? 'dark' : 'light';
  const muiTheme = getTheme(currentMode);

  if (!mounted) {
    return (
      <MuiThemeProvider theme={getTheme('light')}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    );
  }

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <MuiThemeWrapper>
            {children}
          </MuiThemeWrapper>
        </NextThemesProvider>
      </PersistGate>
    </Provider>
  );
}
