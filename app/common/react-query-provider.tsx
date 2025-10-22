"use client"
import React from 'react'; 
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import queryClient from './interface/react-query-client';

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Opcional: Ferramentas de desenvolvimento do React Query */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}