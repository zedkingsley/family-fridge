'use client';

import { AppProvider } from '@/components/providers/AppProvider';
import AppShell from '@/components/AppShell';

export default function Page() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
