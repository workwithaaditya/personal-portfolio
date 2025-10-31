'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
      <Toaster position="bottom-right" />
    </NextThemeProvider>
  );
}