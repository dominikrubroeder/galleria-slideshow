'use client';

import React from 'react';
import { GalleryContextProvider } from './context/GalleryProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <GalleryContextProvider>{children}</GalleryContextProvider>;
}
