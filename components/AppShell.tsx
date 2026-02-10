'use client';

import { useFamily } from '@/components/providers/FamilyContext';
import { useNavigation } from '@/components/providers/AppProvider';
import { Screen } from '@/lib/types';

// Screens
import HomeScreen from '@/components/screens/HomeScreen';
import FridgeScreen from '@/components/screens/FridgeScreen';
import ArchiveScreen from '@/components/screens/ArchiveScreen';
import DiscoverScreen from '@/components/screens/DiscoverScreen';
import SwipePackScreen from '@/components/screens/SwipePackScreen';
import BrowsePackScreen from '@/components/screens/BrowsePackScreen';
import MyBoardScreen from '@/components/screens/MyBoardScreen';
import FamilyScreen from '@/components/screens/FamilyScreen';
import AddQuoteScreen from '@/components/screens/AddQuoteScreen';
import PickQuestionScreen from '@/components/screens/PickQuestionScreen';
import PassSpotlightScreen from '@/components/screens/PassSpotlightScreen';
import WisdomLibraryScreen from '@/components/screens/WisdomLibraryScreen';
import QuestLibraryScreen from '@/components/screens/QuestLibraryScreen';
import WeeklyQuestScreen from '@/components/screens/WeeklyQuestScreen';
import ExperimentScreen from '@/components/screens/ExperimentScreen';
import FamilyValuesScreen from '@/components/screens/FamilyValuesScreen';
import FamilyStoryScreen from '@/components/screens/FamilyStoryScreen';
import OnboardingScreen from '@/components/screens/OnboardingScreen';

// --- Bottom nav tabs ---
const TABS: { id: Screen; label: string; emoji: string }[] = [
  { id: 'home', label: 'Home', emoji: '🏠' },
  { id: 'fridge', label: 'Fridge', emoji: '🧲' },
  { id: 'discover', label: 'Discover', emoji: '🔍' },
  { id: 'my-board', label: 'My Board', emoji: '📋' },
  { id: 'family', label: 'Family', emoji: '👨‍👩‍👧‍👦' },
];

// Screens that show the bottom nav
const NAV_SCREENS: Screen[] = ['home', 'fridge', 'discover', 'my-board', 'family'];

// Screens with a back button (sub-screens)
const SUB_SCREENS: Partial<Record<Screen, { title: string; parent: Screen }>> = {
  'archive': { title: 'Archive', parent: 'fridge' },
  'add-quote': { title: 'Add Quote', parent: 'home' },
  'pick-question': { title: 'Pick Question', parent: 'home' },
  'pass-spotlight': { title: 'Pass Spotlight', parent: 'home' },
  'wisdom-library': { title: 'Family Wisdom', parent: 'discover' },
  'quest-library': { title: 'Quest Library', parent: 'discover' },
  'weekly-quest': { title: 'Weekly Quest', parent: 'home' },
  'experiment': { title: 'Experiments', parent: 'my-board' },
  'family-values': { title: 'Family Values', parent: 'family' },
  'family-story': { title: 'Family Story', parent: 'family' },
  'swipe-pack': { title: 'Pack', parent: 'discover' },
  'browse-pack': { title: 'Browse', parent: 'discover' },
};

function renderScreen(screen: Screen) {
  switch (screen) {
    case 'home': return <HomeScreen />;
    case 'fridge': return <FridgeScreen />;
    case 'archive': return <ArchiveScreen />;
    case 'discover': return <DiscoverScreen />;
    case 'swipe-pack': return <SwipePackScreen />;
    case 'browse-pack': return <BrowsePackScreen />;
    case 'my-board': return <MyBoardScreen />;
    case 'family': return <FamilyScreen />;
    case 'add-quote': return <AddQuoteScreen />;
    case 'pick-question': return <PickQuestionScreen />;
    case 'pass-spotlight': return <PassSpotlightScreen />;
    case 'wisdom-library': return <WisdomLibraryScreen />;
    case 'quest-library': return <QuestLibraryScreen />;
    case 'weekly-quest': return <WeeklyQuestScreen />;
    case 'experiment': return <ExperimentScreen />;
    case 'family-values': return <FamilyValuesScreen />;
    case 'family-story': return <FamilyStoryScreen />;
    case 'onboarding': return <OnboardingScreen />;
    default: return <HomeScreen />;
  }
}

export default function AppShell() {
  const { state: familyState } = useFamily();
  const { nav, navigateTo, goBack } = useNavigation();
  const { current: screen } = nav;

  // Show onboarding if not completed
  if (!familyState.onboarding.completed) {
    return <OnboardingScreen />;
  }

  const isNavScreen = NAV_SCREENS.includes(screen);
  const subScreen = SUB_SCREENS[screen];
  const showFAB = isNavScreen && screen !== 'add-quote';

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-warm-bg)]">
      {/* --- Header --- */}
      {subScreen ? (
        <header className="sticky top-0 z-40 bg-[var(--color-warm-bg)]/95 backdrop-blur-sm border-b border-stone-200/60">
          <div className="flex items-center h-12 px-4">
            <button
              onClick={goBack}
              className="flex items-center gap-1 text-stone-500 hover:text-stone-700 transition-colors tap-target"
            >
              <span className="text-lg">←</span>
              <span className="text-sm font-medium">Back</span>
            </button>
            <h1 className="flex-1 text-center text-base font-semibold text-stone-800 -ml-12">
              {subScreen.title}
            </h1>
          </div>
        </header>
      ) : (
        <header className="sticky top-0 z-40 bg-[var(--color-warm-bg)]/95 backdrop-blur-sm border-b border-stone-200/60">
          <div className="flex items-center justify-between h-12 px-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🧲</span>
              <h1 className="text-base font-bold text-stone-800">Family Fridge</h1>
            </div>
            {/* Member avatars */}
            <div className="flex -space-x-1.5">
              {familyState.members.slice(0, 5).map(m => (
                <button
                  key={m.id}
                  onClick={() => navigateTo('family')}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-sm border-2 border-[var(--color-warm-bg)] transition-transform hover:scale-110"
                  style={{ backgroundColor: `${m.color}20`, borderColor: m.color }}
                  title={m.name}
                >
                  {m.avatar}
                </button>
              ))}
            </div>
          </div>
        </header>
      )}

      {/* --- Screen content --- */}
      <main className={`flex-1 overflow-y-auto ${isNavScreen ? 'pb-24' : 'pb-6'}`}>
        <div
          key={screen}
          className="animate-float-in"
          style={{ animationDuration: '0.25s' }}
        >
          {renderScreen(screen)}
        </div>
      </main>

      {/* --- FAB: Quick quote capture --- */}
      {showFAB && (
        <button
          onClick={() => navigateTo('add-quote')}
          className="fixed z-50 bottom-20 right-4 w-14 h-14 rounded-full bg-amber-400 text-white shadow-lg shadow-amber-400/30 flex items-center justify-center text-2xl hover:bg-amber-500 active:scale-95 transition-all"
          aria-label="Add quote"
        >
          💬
        </button>
      )}

      {/* --- Bottom navigation --- */}
      {isNavScreen && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-stone-200/60 safe-area-bottom">
          <div className="flex items-stretch justify-around h-16 max-w-lg mx-auto">
            {TABS.map(tab => {
              const isActive = screen === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => navigateTo(tab.id, screen === tab.id ? undefined : 'left')}
                  className={`flex flex-col items-center justify-center gap-0.5 flex-1 transition-all tap-target ${
                    isActive
                      ? 'text-amber-600'
                      : 'text-stone-400 hover:text-stone-600'
                  }`}
                >
                  <span className={`text-xl transition-transform ${isActive ? 'scale-110' : ''}`}>
                    {tab.emoji}
                  </span>
                  <span className={`text-[10px] font-medium ${isActive ? 'font-semibold' : ''}`}>
                    {tab.label}
                  </span>
                  {isActive && (
                    <div className="absolute bottom-1 w-6 h-0.5 rounded-full bg-amber-400" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
