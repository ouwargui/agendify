'use client';

import {ThemeProvider as NextThemeProvider} from 'next-themes';
import type {ThemeProviderProps} from 'next-themes/dist/types';

export function ThemeProvider({children, ...props}: ThemeProviderProps) {
  return (
    <NextThemeProvider
      {...props}
      storageKey="@agendify:theme"
      themes={['light', 'dark', 'system']}
    >
      {children}
    </NextThemeProvider>
  );
}
