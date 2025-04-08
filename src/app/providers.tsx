'use client';

import { CartProvider } from '@/shared/context/CartContext';
import { GlobalStyles } from '@/shared/styles/GlobalStyles';
import { theme } from '@/shared/styles/theme';
import { ThemeProvider } from 'styled-components';
import StyledComponentsRegistry from '@/lib/registry';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <CartProvider>
          <GlobalStyles />
          {children}
        </CartProvider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
