"use client";
import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider } from 'next-themes';
export function Providers({ children }) {
  return <HeroUIProvider><ThemeProvider attribute="class">{children}</ThemeProvider></HeroUIProvider>;
}
