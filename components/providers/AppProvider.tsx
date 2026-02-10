'use client';

import { ReactNode, createContext, useContext, useState, useCallback } from 'react';
import { FamilyProvider } from './FamilyContext';
import { FridgeProvider } from './FridgeContext';
import { RitualProvider } from './RitualContext';
import { QuestProvider } from './QuestContext';
import { ExperimentProvider } from './ExperimentContext';
import { Screen, NavigationState, PackType } from '@/lib/types';

interface NavigationContextValue {
  nav: NavigationState;
  navigateTo: (screen: Screen, direction?: 'left' | 'right') => void;
  goBack: () => void;
  // Pack browsing state
  activePack: { type: PackType; id: string; name: string; emoji: string; color: string; items: Array<{ id: string; text?: string; title?: string; description?: string; source?: string; attribution?: string; duration?: string; minAge?: number }> } | null;
  setActivePack: (pack: { type: PackType; id: string; name: string; emoji: string; color: string; items: Array<{ id: string; text?: string; title?: string; description?: string; source?: string; attribution?: string; duration?: string; minAge?: number }> } | null) => void;
  browseMode: boolean;
  setBrowseMode: (v: boolean) => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

function NavigationProvider({ children }: { children: ReactNode }) {
  const [nav, setNav] = useState<NavigationState>({ current: 'home', previous: 'home', direction: 'left' });
  const [activePack, setActivePack] = useState<NavigationContextValue['activePack']>(null);
  const [browseMode, setBrowseMode] = useState(false);

  const navigateTo = useCallback((screen: Screen, direction: 'left' | 'right' = 'left') => {
    setNav(prev => ({ current: screen, previous: prev.current, direction }));
  }, []);

  const goBack = useCallback(() => {
    setNav(prev => ({ current: prev.previous, previous: prev.current, direction: 'right' }));
  }, []);

  return (
    <NavigationContext.Provider value={{ nav, navigateTo, goBack, activePack, setActivePack, browseMode, setBrowseMode }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider');
  return ctx;
}

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <FamilyProvider>
      <FridgeProvider>
        <RitualProvider>
          <QuestProvider>
            <ExperimentProvider>
              <NavigationProvider>
                {children}
              </NavigationProvider>
            </ExperimentProvider>
          </QuestProvider>
        </RitualProvider>
      </FridgeProvider>
    </FamilyProvider>
  );
}
