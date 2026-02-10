'use client';

import { useState, useEffect } from 'react';
import { MAGNETS, PILLAR_CONFIG, Pillar } from '@/lib/magnets';

type Screen = 'home' | 'fridge' | 'my-board' | 'family' | 'add-quote' | 'pick-question' | 'pass-spotlight' | 'wisdom' | 'archive';
type FridgeStatus = 'personal' | 'rotation' | 'pinned' | 'archived';

interface FamilyMember {
  id: string;
  name: string;
  avatar: string;
  color: string;
  age: number;
}

interface FridgeItem {
  id: string;
  type: 'quote' | 'wisdom' | 'photo' | 'note';
  content: string;
  saidBy?: string;
  source?: string;
  pillar?: Pillar;
  capturedBy: string;
  emoji?: '😂' | '🥹' | '🤔' | '💡' | '❤️';
  createdAt: Date;
  status: FridgeStatus;
}

interface SpotlightPass {
  from: string;
  to: string;
  reason: string;
  passedAt: Date;
}

const FAMILY: FamilyMember[] = [
  { id: 'dad', name: 'Dad', avatar: '👨', color: '#3B82F6', age: 38 },
  { id: 'mom', name: 'Mom', avatar: '👩', color: '#8B5CF6', age: 36 },
  { id: 'wyatt', name: 'Wyatt', avatar: '👦', color: '#F59E0B', age: 8 },
  { id: 'eleanor', name: 'Eleanor', avatar: '👧', color: '#EC4899', age: 5 },
];

const QUESTIONS = [
  // Fun questions
  { id: '1', text: 'What made you laugh today?', category: 'fun', minAge: 3 },
  { id: '2', text: 'If you could have any superpower, what would it be?', category: 'fun', minAge: 3 },
  { id: '3', text: 'Would you rather fly or be invisible?', category: 'fun', minAge: 4 },
  { id: '4', text: 'If you could be any animal for a day, which would you choose?', category: 'fun', minAge: 4 },
  // Gratitude
  { id: '5', text: 'What are you grateful for today?', category: 'gratitude', minAge: 4 },
  { id: '6', text: 'Who made you feel good today?', category: 'gratitude', minAge: 4 },
  { id: '7', text: 'What was the best part of your day?', category: 'gratitude', minAge: 3 },
  // Deep
  { id: '8', text: 'What was the hardest part of your day?', category: 'deep', minAge: 6 },
  { id: '9', text: 'What\'s something you\'re worried about?', category: 'deep', minAge: 6 },
  { id: '10', text: 'If you could change one thing about today, what would it be?', category: 'deep', minAge: 7 },
  // Goals/Learning
  { id: '11', text: 'What\'s something new you learned recently?', category: 'learn', minAge: 5 },
  { id: '12', text: 'What\'s a goal you\'re working towards?', category: 'goals', minAge: 8 },
  { id: '13', text: 'What do you want to get better at?', category: 'goals', minAge: 6 },
  // Identity
  { id: '14', text: 'What makes our family special?', category: 'identity', minAge: 5 },
  { id: '15', text: 'What\'s something you love about yourself?', category: 'identity', minAge: 5 },
];

const INITIAL_ITEMS: FridgeItem[] = [
  // Pinned items (max 3 per person)
  { id: '1', type: 'wisdom', content: 'Know yourself, love yourself, be true to yourself.', source: 'Grandmother', pillar: 'identity', capturedBy: 'dad', status: 'pinned', createdAt: new Date('2026-02-01') },
  { id: '2', type: 'quote', content: "If fish could walk they'd probably be rude about it", saidBy: 'wyatt', capturedBy: 'dad', emoji: '😂', status: 'pinned', createdAt: new Date('2026-02-08') },
  { id: '10', type: 'wisdom', content: 'Those who say yes are rewarded by adventures.', pillar: 'delight', source: 'Family wisdom', capturedBy: 'mom', status: 'pinned', createdAt: new Date('2026-01-15') },
  // Rotation items (up to 5 per person)
  { id: '3', type: 'quote', content: "I think love is when you share your last cookie even when you're still hungry", saidBy: 'eleanor', capturedBy: 'mom', emoji: '🥹', status: 'rotation', createdAt: new Date('2026-02-05') },
  { id: '4', type: 'wisdom', content: 'Effort is your birthright; outcome is not.', pillar: 'effort', source: 'Philosophy magnet', capturedBy: 'mom', status: 'rotation', createdAt: new Date('2026-02-03') },
  { id: '5', type: 'note', content: "I've been thinking about what it means to be brave", capturedBy: 'wyatt', status: 'rotation', createdAt: new Date('2026-02-07') },
  { id: '11', type: 'quote', content: "Dad, the moon is following us again!", saidBy: 'eleanor', capturedBy: 'dad', emoji: '🤔', status: 'rotation', createdAt: new Date('2026-02-02') },
  // Personal items (unlimited)
  { id: '6', type: 'quote', content: "Why does the moon follow us in the car?", saidBy: 'eleanor', capturedBy: 'dad', emoji: '🤔', status: 'personal', createdAt: new Date('2026-02-09') },
  { id: '7', type: 'wisdom', content: 'Mistakes are gifts. They show you something true.', pillar: 'effort', source: 'Modern wisdom', capturedBy: 'dad', status: 'personal', createdAt: new Date('2026-02-04') },
  { id: '8', type: 'quote', content: "I'm not tired, my eyes are just resting", saidBy: 'wyatt', capturedBy: 'mom', emoji: '😂', status: 'personal', createdAt: new Date('2026-02-06') },
  // Archived items
  { id: '9', type: 'quote', content: "Vegetables are just plants pretending to be food", saidBy: 'wyatt', capturedBy: 'dad', emoji: '😂', status: 'archived', createdAt: new Date('2026-01-20') },
];

const SPOTLIGHT_HISTORY: SpotlightPass[] = [
  { from: 'mom', to: 'wyatt', reason: 'For being such a great helper with Eleanor this week', passedAt: new Date('2026-02-06') },
  { from: 'dad', to: 'mom', reason: 'For making everyone laugh at dinner', passedAt: new Date('2026-02-01') },
  { from: 'wyatt', to: 'dad', reason: 'For teaching me to ride my bike', passedAt: new Date('2026-01-25') },
];

export default function Home() {
  const [screen, setScreen] = useState<Screen>('home');
  const [prevScreen, setPrevScreen] = useState<Screen>('home');
  const [items, setItems] = useState<FridgeItem[]>(INITIAL_ITEMS);
  const [spotlightHolder, setSpotlightHolder] = useState('wyatt');
  const [spotlightDay, setSpotlightDay] = useState(4);
  const [spotlightHistory, setSpotlightHistory] = useState(SPOTLIGHT_HISTORY);
  const [tonightsQuestion, setTonightsQuestion] = useState<string | null>("What made you laugh today?");
  const [questionPicker, setQuestionPicker] = useState('eleanor');
  const [questionPickedBy, setQuestionPickedBy] = useState('dad');
  const [discussed, setDiscussed] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');
  
  // Add quote state
  const [quoteText, setQuoteText] = useState('');
  const [quoteSaidBy, setQuoteSaidBy] = useState('');
  const [quoteEmoji, setQuoteEmoji] = useState<'😂' | '🥹' | '🤔' | '💡' | '❤️'>('😂');
  
  // Pass spotlight state
  const [passTo, setPassTo] = useState('');
  const [passReason, setPassReason] = useState('');

  // Screen transition
  const navigateTo = (newScreen: Screen, direction: 'left' | 'right' = 'left') => {
    setSlideDirection(direction);
    setPrevScreen(screen);
    setScreen(newScreen);
  };

  const getMember = (id: string) => FAMILY.find(m => m.id === id);
  const pinnedItems = items.filter(i => i.status === 'pinned');
  const rotationItems = items.filter(i => i.status === 'rotation');
  const personalItems = items.filter(i => i.status === 'personal');
  const archivedItems = items.filter(i => i.status === 'archived');

  const handleAddQuote = () => {
    if (!quoteText.trim() || !quoteSaidBy) return;
    const newItem: FridgeItem = {
      id: `quote-${Date.now()}`,
      type: 'quote',
      content: quoteText,
      saidBy: quoteSaidBy,
      capturedBy: 'dad',
      emoji: quoteEmoji,
      status: 'personal',
      createdAt: new Date(),
    };
    setItems([newItem, ...items]);
    setQuoteText('');
    setQuoteSaidBy('');
    navigateTo('my-board');
  };

  const handleAddWisdom = (magnet: typeof MAGNETS[0]) => {
    const newItem: FridgeItem = {
      id: `wisdom-${Date.now()}`,
      type: 'wisdom',
      content: magnet.text,
      source: magnet.source || 'Philosophy magnet',
      pillar: magnet.pillar,
      capturedBy: 'dad',
      status: 'personal',
      createdAt: new Date(),
    };
    setItems([newItem, ...items]);
  };

  const handlePromote = (id: string, newStatus: FridgeStatus) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  const handlePassSpotlight = () => {
    if (!passTo || !passReason.trim()) return;
    const newPass: SpotlightPass = {
      from: spotlightHolder,
      to: passTo,
      reason: passReason,
      passedAt: new Date(),
    };
    setSpotlightHistory([newPass, ...spotlightHistory]);
    setSpotlightHolder(passTo);
    setSpotlightDay(1);
    setPassTo('');
    setPassReason('');
    navigateTo('home', 'right');
  };

  const handlePickQuestion = (q: string) => {
    setTonightsQuestion(q);
    setQuestionPickedBy(questionPicker);
    setDiscussed(false);
    navigateTo('home', 'right');
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-gradient-to-b from-[#FEF7ED] to-[#FFF8F0] relative overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-b from-[#FEF7ED] to-[#FEF7ED]/95 backdrop-blur-sm border-b border-amber-100/50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧲</span>
            <span className="font-bold text-amber-900 tracking-tight">Family Fridge</span>
          </div>
          <div className="flex gap-0.5">
            {FAMILY.map(m => (
              <div 
                key={m.id} 
                className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
                style={{ backgroundColor: `${m.color}20` }}
              >
                {m.avatar}
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="pb-32 transition-all duration-300 ease-out">
        {screen === 'home' && (
          <HomeScreen 
            questionPicker={getMember(questionPicker)!}
            tonightsQuestion={tonightsQuestion}
            questionPickedBy={getMember(questionPickedBy)!}
            discussed={discussed}
            onDiscussed={() => setDiscussed(true)}
            spotlightHolder={getMember(spotlightHolder)!}
            spotlightDay={spotlightDay}
            onPickQuestion={() => navigateTo('pick-question')}
            onPassSpotlight={() => navigateTo('pass-spotlight')}
            pinnedItems={pinnedItems.slice(0, 4)}
            rotationItems={rotationItems.slice(0, 2)}
            getMember={getMember}
            onGoToFridge={() => navigateTo('fridge')}
            onGoToWisdom={() => navigateTo('wisdom')}
          />
        )}

        {screen === 'fridge' && (
          <FridgeScreen
            pinnedItems={pinnedItems}
            rotationItems={rotationItems}
            getMember={getMember}
            onBack={() => navigateTo('home', 'right')}
            onArchive={() => navigateTo('archive')}
          />
        )}

        {screen === 'archive' && (
          <ArchiveScreen
            items={[...items].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())}
            getMember={getMember}
            onPromote={handlePromote}
            onBack={() => navigateTo('fridge', 'right')}
          />
        )}

        {screen === 'my-board' && (
          <MyBoardScreen
            items={items.filter(i => i.capturedBy === 'dad')}
            getMember={getMember}
            onPromote={handlePromote}
            onBack={() => navigateTo('home', 'right')}
          />
        )}

        {screen === 'family' && (
          <FamilyScreen
            family={FAMILY}
            items={items}
            spotlightHistory={spotlightHistory}
            getMember={getMember}
            onBack={() => navigateTo('home', 'right')}
          />
        )}

        {screen === 'add-quote' && (
          <AddQuoteScreen
            text={quoteText}
            setText={setQuoteText}
            saidBy={quoteSaidBy}
            setSaidBy={setQuoteSaidBy}
            emoji={quoteEmoji}
            setEmoji={setQuoteEmoji}
            family={FAMILY}
            onSubmit={handleAddQuote}
            onBack={() => navigateTo(prevScreen, 'right')}
          />
        )}

        {screen === 'pick-question' && (
          <PickQuestionScreen
            questions={QUESTIONS}
            picker={getMember(questionPicker)!}
            onPick={handlePickQuestion}
            onBack={() => navigateTo('home', 'right')}
          />
        )}

        {screen === 'pass-spotlight' && (
          <PassSpotlightScreen
            currentHolder={getMember(spotlightHolder)!}
            family={FAMILY.filter(m => m.id !== spotlightHolder)}
            passTo={passTo}
            setPassTo={setPassTo}
            reason={passReason}
            setReason={setPassReason}
            onPass={handlePassSpotlight}
            onBack={() => navigateTo('home', 'right')}
          />
        )}

        {screen === 'wisdom' && (
          <WisdomLibraryScreen
            magnets={MAGNETS}
            addedIds={items.filter(i => i.type === 'wisdom').map(i => i.content)}
            onAdd={handleAddWisdom}
            onBack={() => navigateTo('home', 'right')}
          />
        )}
      </main>

      {/* FAB */}
      {['home', 'fridge', 'my-board', 'archive'].includes(screen) && (
        <button 
          onClick={() => navigateTo('add-quote')}
          className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-white text-2xl shadow-lg shadow-amber-500/30 flex items-center justify-center hover:scale-105 transition-transform active:scale-95 z-40"
        >
          💬
        </button>
      )}

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-amber-100/50 max-w-md mx-auto z-50">
        <div className="flex justify-around py-2">
          {[
            { icon: '🏠', label: 'Home', screen: 'home' as Screen },
            { icon: '🧲', label: 'Fridge', screen: 'fridge' as Screen },
            { icon: '📋', label: 'My Board', screen: 'my-board' as Screen },
            { icon: '👨‍👩‍👧‍👦', label: 'Family', screen: 'family' as Screen },
          ].map(nav => (
            <button
              key={nav.screen}
              onClick={() => navigateTo(nav.screen, screen === 'home' ? 'left' : 'right')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                screen === nav.screen || (nav.screen === 'fridge' && screen === 'archive')
                  ? 'bg-amber-100 text-amber-900' 
                  : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <span className="text-xl">{nav.icon}</span>
              <span className="text-xs font-medium">{nav.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

// HOME SCREEN
function HomeScreen({ 
  questionPicker, tonightsQuestion, questionPickedBy, discussed, onDiscussed,
  spotlightHolder, spotlightDay, onPickQuestion, onPassSpotlight,
  pinnedItems, rotationItems, getMember, onGoToFridge, onGoToWisdom
}: {
  questionPicker: FamilyMember;
  tonightsQuestion: string | null;
  questionPickedBy: FamilyMember;
  discussed: boolean;
  onDiscussed: () => void;
  spotlightHolder: FamilyMember;
  spotlightDay: number;
  onPickQuestion: () => void;
  onPassSpotlight: () => void;
  pinnedItems: FridgeItem[];
  rotationItems: FridgeItem[];
  getMember: (id: string) => FamilyMember | undefined;
  onGoToFridge: () => void;
  onGoToWisdom: () => void;
}) {
  const needsPick = !tonightsQuestion;
  
  return (
    <div className="p-4 space-y-4">
      {/* Question Section */}
      {needsPick ? (
        <button 
          onClick={onPickQuestion}
          className="w-full bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border-2 border-dashed border-amber-300 text-left hover:border-amber-400 hover:bg-amber-50 transition-all group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              {questionPicker.avatar}
            </div>
            <div>
              <span className="font-bold text-amber-900">{questionPicker.name}'s Turn!</span>
              <p className="text-amber-700 text-sm">Pick tonight's dinner question</p>
            </div>
          </div>
          <p className="text-amber-600 text-sm font-medium flex items-center gap-1 mt-3">
            Tap to choose <span className="group-hover:translate-x-1 transition-transform">→</span>
          </p>
        </button>
      ) : (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
          <div className="flex items-start justify-between mb-3">
            <span className="text-2xl">💬</span>
            <span className="text-xs text-stone-400 flex items-center gap-1">
              Picked by <span>{questionPickedBy.avatar}</span> {questionPickedBy.name}
            </span>
          </div>
          <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-2">Tonight's Question</h2>
          <p className="text-stone-800 text-xl font-medium leading-relaxed">"{tonightsQuestion}"</p>
          {!discussed ? (
            <button 
              onClick={onDiscussed}
              className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold hover:from-emerald-600 hover:to-green-600 transition-all active:scale-[0.98] shadow-sm"
            >
              ✓ We talked about it!
            </button>
          ) : (
            <div className="mt-4 py-3 text-center text-emerald-600 font-semibold bg-emerald-50 rounded-xl">
              ✓ Discussed tonight!
            </div>
          )}
        </div>
      )}

      {/* Spotlight */}
      <button 
        onClick={onPassSpotlight}
        className="w-full bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-4 border border-yellow-200/80 flex items-center gap-4 hover:border-yellow-300 hover:shadow-sm transition-all group"
      >
        <div className="relative">
          <span className="text-4xl">⭐</span>
          <span className="absolute -bottom-1 -right-1 text-lg">{spotlightHolder.avatar}</span>
        </div>
        <div className="flex-1 text-left">
          <p className="font-bold text-amber-900">{spotlightHolder.name} has the Spotlight</p>
          <p className="text-amber-700 text-sm">Day {spotlightDay} • Pass it when ready</p>
        </div>
        <span className="text-amber-400 group-hover:translate-x-1 transition-transform">→</span>
      </button>

      {/* Fridge Preview */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-stone-800 flex items-center gap-2">
            <span>🧲</span> On the Fridge
          </h2>
          <button onClick={onGoToFridge} className="text-amber-600 text-sm font-medium hover:text-amber-700 transition-colors">
            See all →
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {pinnedItems.map(item => {
            const member = item.saidBy ? getMember(item.saidBy) : getMember(item.capturedBy);
            return (
              <div 
                key={item.id}
                className="bg-white rounded-xl p-3 shadow-sm border-l-4 hover:shadow-md transition-shadow"
                style={{ borderLeftColor: member?.color || '#ccc' }}
              >
                {item.emoji && <span className="text-lg">{item.emoji}</span>}
                {item.pillar && <span className="text-lg">{PILLAR_CONFIG[item.pillar].emoji}</span>}
                <p className="text-stone-800 text-sm line-clamp-2 mt-1 leading-snug">
                  {item.type === 'quote' ? `"${item.content}"` : item.content}
                </p>
                <p className="text-xs text-stone-400 mt-2">
                  {item.saidBy ? `— ${getMember(item.saidBy)?.name}` : item.source}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2">
        <button 
          onClick={onGoToWisdom}
          className="bg-white rounded-xl p-4 border border-stone-100 hover:border-purple-200 hover:bg-purple-50/50 transition-all text-left group"
        >
          <span className="text-2xl">📚</span>
          <p className="font-semibold text-stone-800 mt-2">Wisdom Library</p>
          <p className="text-xs text-stone-500">Browse 60 philosophy magnets</p>
        </button>
        <button 
          onClick={onGoToFridge}
          className="bg-white rounded-xl p-4 border border-stone-100 hover:border-amber-200 hover:bg-amber-50/50 transition-all text-left group"
        >
          <span className="text-2xl">📸</span>
          <p className="font-semibold text-stone-800 mt-2">Add Photo</p>
          <p className="text-xs text-stone-500">Coming soon</p>
        </button>
      </div>
    </div>
  );
}

// FRIDGE SCREEN
function FridgeScreen({ pinnedItems, rotationItems, getMember, onBack, onArchive }: {
  pinnedItems: FridgeItem[];
  rotationItems: FridgeItem[];
  getMember: (id: string) => FamilyMember | undefined;
  onBack: () => void;
  onArchive: () => void;
}) {
  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-stone-500 hover:text-stone-700 transition-colors flex items-center gap-1">
          <span>←</span> Back
        </button>
        <button onClick={onArchive} className="text-purple-600 text-sm font-medium hover:text-purple-700">
          📦 Archive
        </button>
      </div>
      
      {/* Pinned Section */}
      <div>
        <h2 className="font-bold text-stone-800 mb-3 flex items-center gap-2">
          📌 Pinned
          <span className="text-xs font-normal text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
            {pinnedItems.length} items
          </span>
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {pinnedItems.map(item => {
            const member = item.saidBy ? getMember(item.saidBy) : getMember(item.capturedBy);
            return (
              <div 
                key={item.id}
                className="bg-white rounded-xl p-4 shadow-sm border-2 hover:shadow-md transition-all"
                style={{ borderColor: member?.color || '#e5e5e5' }}
              >
                <div className="flex items-start justify-between mb-2">
                  {item.emoji && <span className="text-xl">{item.emoji}</span>}
                  {item.pillar && <span className="text-xl">{PILLAR_CONFIG[item.pillar].emoji}</span>}
                  <span className="text-sm">{member?.avatar}</span>
                </div>
                <p className="text-stone-800 text-sm leading-snug">
                  {item.type === 'quote' ? `"${item.content}"` : item.content}
                </p>
                <p className="text-xs text-stone-400 mt-2">
                  {item.saidBy ? `— ${getMember(item.saidBy)?.name}` : item.source}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rotation Section */}
      <div>
        <h2 className="font-bold text-stone-800 mb-3 flex items-center gap-2">
          🔄 Rotation
          <span className="text-xs font-normal text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
            {rotationItems.length} items
          </span>
        </h2>
        <div className="space-y-2">
          {rotationItems.map(item => {
            const member = item.saidBy ? getMember(item.saidBy) : getMember(item.capturedBy);
            return (
              <div 
                key={item.id}
                className="bg-white rounded-xl p-4 shadow-sm border-l-4 flex items-start gap-3 hover:shadow-md transition-all"
                style={{ borderLeftColor: member?.color || '#ccc' }}
              >
                <span className="text-xl">{item.emoji || item.pillar ? PILLAR_CONFIG[item.pillar!]?.emoji : '✨'}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-stone-800 text-sm leading-snug">
                    {item.type === 'quote' ? `"${item.content}"` : item.content}
                  </p>
                  <p className="text-xs text-stone-400 mt-1">
                    {item.saidBy ? `— ${getMember(item.saidBy)?.name}` : item.source}
                  </p>
                </div>
                <span className="text-lg shrink-0">{member?.avatar}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ARCHIVE SCREEN
function ArchiveScreen({ items, getMember, onPromote, onBack }: {
  items: FridgeItem[];
  getMember: (id: string) => FamilyMember | undefined;
  onPromote: (id: string, status: FridgeStatus) => void;
  onBack: () => void;
}) {
  const [filter, setFilter] = useState<'all' | 'quote' | 'wisdom' | 'note'>('all');
  const [personFilter, setPersonFilter] = useState<string | null>(null);
  
  const filteredItems = items.filter(item => {
    if (filter !== 'all' && item.type !== filter) return false;
    if (personFilter && item.saidBy !== personFilter && item.capturedBy !== personFilter) return false;
    return true;
  });

  return (
    <div className="p-4 space-y-4">
      <button onClick={onBack} className="text-stone-500 hover:text-stone-700 transition-colors flex items-center gap-1">
        <span>←</span> Back to Fridge
      </button>
      
      <div>
        <h1 className="text-xl font-bold text-stone-800 flex items-center gap-2">
          📦 Archive
        </h1>
        <p className="text-stone-500 text-sm">Everything captured, searchable</p>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All' },
            { id: 'quote', label: '💬 Quotes' },
            { id: 'wisdom', label: '📚 Wisdom' },
            { id: 'note', label: '📝 Notes' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as typeof filter)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                filter === f.id 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-white text-stone-600 hover:bg-stone-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {[{ id: null, avatar: '👨‍👩‍👧‍👦' }, ...FAMILY.map(f => ({ id: f.id, avatar: f.avatar }))].map(f => (
            <button
              key={f.id || 'all'}
              onClick={() => setPersonFilter(f.id)}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
                personFilter === f.id 
                  ? 'bg-purple-100 ring-2 ring-purple-400' 
                  : 'bg-white hover:bg-stone-50'
              }`}
            >
              {f.avatar}
            </button>
          ))}
        </div>
      </div>

      {/* Items */}
      <div className="space-y-2">
        {filteredItems.map(item => {
          const member = item.saidBy ? getMember(item.saidBy) : getMember(item.capturedBy);
          const statusColors = {
            pinned: 'bg-amber-100 text-amber-800',
            rotation: 'bg-blue-100 text-blue-800',
            personal: 'bg-stone-100 text-stone-600',
            archived: 'bg-purple-100 text-purple-800',
          };
          return (
            <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="text-xl shrink-0">
                  {item.emoji || (item.pillar ? PILLAR_CONFIG[item.pillar].emoji : '✨')}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-stone-800 leading-snug">
                    {item.type === 'quote' ? `"${item.content}"` : item.content}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-stone-400">
                    {member && <span>{member.avatar} {item.saidBy ? getMember(item.saidBy)?.name : 'captured'}</span>}
                    <span>•</span>
                    <span>{item.createdAt.toLocaleDateString()}</span>
                    <span className={`px-2 py-0.5 rounded-full ${statusColors[item.status]}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
              {item.status !== 'pinned' && (
                <div className="flex gap-2 mt-3">
                  {item.status !== 'rotation' && (
                    <button 
                      onClick={() => onPromote(item.id, 'rotation')}
                      className="flex-1 py-2 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium hover:bg-blue-100 transition-colors"
                    >
                      🔄 Add to Rotation
                    </button>
                  )}
                  <button 
                    onClick={() => onPromote(item.id, 'pinned')}
                    className="flex-1 py-2 rounded-lg bg-amber-50 text-amber-700 text-sm font-medium hover:bg-amber-100 transition-colors"
                  >
                    📌 Pin
                  </button>
                </div>
              )}
            </div>
          );
        })}
        {filteredItems.length === 0 && (
          <div className="text-center py-8 text-stone-400">
            No items match your filters
          </div>
        )}
      </div>
    </div>
  );
}

// MY BOARD SCREEN  
function MyBoardScreen({ items, getMember, onPromote, onBack }: {
  items: FridgeItem[];
  getMember: (id: string) => FamilyMember | undefined;
  onPromote: (id: string, status: FridgeStatus) => void;
  onBack: () => void;
}) {
  const sortedItems = [...items].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  
  return (
    <div className="p-4 space-y-4">
      <button onClick={onBack} className="text-stone-500 hover:text-stone-700 transition-colors flex items-center gap-1">
        <span>←</span> Back
      </button>
      
      <div>
        <h1 className="text-xl font-bold text-stone-800">📋 My Board</h1>
        <p className="text-stone-500 text-sm">Everything you've captured ({items.length} items)</p>
      </div>

      <div className="space-y-3">
        {sortedItems.map(item => {
          const member = item.saidBy ? getMember(item.saidBy) : null;
          const statusBadge = {
            pinned: { icon: '📌', label: 'Pinned', class: 'bg-amber-100 text-amber-800' },
            rotation: { icon: '🔄', label: 'Rotation', class: 'bg-blue-100 text-blue-800' },
            personal: { icon: '📋', label: 'Personal', class: 'bg-stone-100 text-stone-600' },
            archived: { icon: '📦', label: 'Archived', class: 'bg-purple-100 text-purple-800' },
          }[item.status];
          
          return (
            <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="text-xl shrink-0">
                  {item.emoji || (item.pillar ? PILLAR_CONFIG[item.pillar].emoji : '✨')}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-stone-800 leading-snug">
                    {item.type === 'quote' ? `"${item.content}"` : item.content}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    {member && (
                      <span className="text-xs text-stone-400">— {member.avatar} {member.name}</span>
                    )}
                    {item.source && (
                      <span className="text-xs text-stone-400">— {item.source}</span>
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusBadge.class}`}>
                      {statusBadge.icon} {statusBadge.label}
                    </span>
                  </div>
                </div>
              </div>
              {item.status !== 'pinned' && (
                <div className="flex gap-2 mt-3">
                  {item.status === 'personal' && (
                    <button 
                      onClick={() => onPromote(item.id, 'rotation')}
                      className="flex-1 py-2 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium hover:bg-blue-100 transition-colors"
                    >
                      🔄 Add to Rotation
                    </button>
                  )}
                  <button 
                    onClick={() => onPromote(item.id, 'pinned')}
                    className="flex-1 py-2 rounded-lg bg-amber-100 text-amber-800 text-sm font-medium hover:bg-amber-200 transition-colors"
                  >
                    📌 Pin It
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// FAMILY SCREEN
function FamilyScreen({ family, items, spotlightHistory, getMember, onBack }: {
  family: FamilyMember[];
  items: FridgeItem[];
  spotlightHistory: SpotlightPass[];
  getMember: (id: string) => FamilyMember | undefined;
  onBack: () => void;
}) {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const memberItems = selectedMember 
    ? items.filter(i => i.saidBy === selectedMember || (i.capturedBy === selectedMember && !i.saidBy))
    : [];

  return (
    <div className="p-4 space-y-6">
      <button onClick={onBack} className="text-stone-500 hover:text-stone-700 transition-colors flex items-center gap-1">
        <span>←</span> Back
      </button>
      
      <h1 className="text-xl font-bold text-stone-800">👨‍👩‍👧‍👦 Family</h1>

      {/* Member Selector */}
      <div className="flex gap-3">
        {family.map(member => {
          const memberCount = items.filter(i => 
            i.saidBy === member.id || (i.capturedBy === member.id && !i.saidBy)
          ).length;
          return (
            <button
              key={member.id}
              onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all relative ${
                selectedMember === member.id 
                  ? 'bg-amber-100 border-2 border-amber-400 shadow-sm' 
                  : 'bg-white border-2 border-transparent hover:bg-stone-50'
              }`}
            >
              <span className="text-3xl">{member.avatar}</span>
              <span className="text-xs font-medium">{member.name}</span>
              <span className="absolute -top-1 -right-1 bg-stone-200 text-stone-600 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {memberCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* Member Items */}
      {selectedMember && (
        <div>
          <h2 className="font-bold text-stone-800 mb-3">
            {getMember(selectedMember)?.avatar} {getMember(selectedMember)?.name}'s Highlight Reel
          </h2>
          {memberItems.length > 0 ? (
            <div className="space-y-2">
              {memberItems.map(item => (
                <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm flex items-start gap-3">
                  <span className="text-xl shrink-0">
                    {item.emoji || (item.pillar ? PILLAR_CONFIG[item.pillar].emoji : '✨')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-stone-800 leading-snug">
                      {item.type === 'quote' ? `"${item.content}"` : item.content}
                    </p>
                    <p className="text-xs text-stone-400 mt-1">
                      {item.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-stone-400 text-sm py-4 text-center bg-stone-50 rounded-xl">
              No captures yet
            </p>
          )}
        </div>
      )}

      {/* Spotlight History */}
      <div>
        <h2 className="font-bold text-stone-800 mb-3">⭐ Spotlight History</h2>
        <div className="space-y-2">
          {spotlightHistory.map((pass, i) => {
            const from = getMember(pass.from);
            const to = getMember(pass.to);
            return (
              <div key={i} className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-200/50">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-lg">{from?.avatar}</span>
                  <span className="text-amber-600">→</span>
                  <span className="text-lg">{to?.avatar}</span>
                  <span className="font-medium text-amber-900">{to?.name}</span>
                </div>
                <p className="text-stone-700 text-sm mt-2 italic">"{pass.reason}"</p>
                <p className="text-xs text-stone-400 mt-2">{pass.passedAt.toLocaleDateString()}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ADD QUOTE SCREEN
function AddQuoteScreen({ text, setText, saidBy, setSaidBy, emoji, setEmoji, family, onSubmit, onBack }: {
  text: string;
  setText: (v: string) => void;
  saidBy: string;
  setSaidBy: (v: string) => void;
  emoji: '😂' | '🥹' | '🤔' | '💡' | '❤️';
  setEmoji: (v: '😂' | '🥹' | '🤔' | '💡' | '❤️') => void;
  family: FamilyMember[];
  onSubmit: () => void;
  onBack: () => void;
}) {
  const emojis: Array<{ emoji: '😂' | '🥹' | '🤔' | '💡' | '❤️'; label: string }> = [
    { emoji: '😂', label: 'Funny' },
    { emoji: '🥹', label: 'Sweet' },
    { emoji: '🤔', label: 'Deep' },
    { emoji: '💡', label: 'Smart' },
    { emoji: '❤️', label: 'Love' },
  ];
  
  return (
    <div className="p-4 space-y-6">
      <button onClick={onBack} className="text-stone-500 hover:text-stone-700 transition-colors flex items-center gap-1">
        <span>←</span> Back
      </button>

      <div className="text-center">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-3xl">💬</span>
        </div>
        <h1 className="text-2xl font-bold text-stone-800">Quick Quote</h1>
        <p className="text-stone-500 mt-1">Capture something someone said</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-2">Who said it?</label>
        <div className="flex gap-2 flex-wrap">
          {family.map(member => (
            <button
              key={member.id}
              onClick={() => setSaidBy(member.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
                saidBy === member.id 
                  ? 'text-white shadow-md' 
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-300'
              }`}
              style={{ backgroundColor: saidBy === member.id ? member.color : undefined }}
            >
              <span className="text-lg">{member.avatar}</span>
              <span className="font-medium">{member.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-2">What did they say?</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type the quote..."
          autoFocus
          className="w-full h-28 p-4 rounded-xl bg-white border-2 border-stone-200 focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-100 resize-none text-lg transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-2">Vibe?</label>
        <div className="flex gap-2 justify-between">
          {emojis.map(e => (
            <button
              key={e.emoji}
              onClick={() => setEmoji(e.emoji)}
              className={`flex-1 py-3 rounded-xl text-center transition-all ${
                emoji === e.emoji 
                  ? 'bg-amber-100 ring-2 ring-amber-400 scale-105' 
                  : 'bg-white hover:bg-stone-50'
              }`}
            >
              <span className="text-2xl block">{e.emoji}</span>
              <span className="text-xs text-stone-500 mt-1 block">{e.label}</span>
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={onSubmit}
        disabled={!text.trim() || !saidBy}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-amber-500/25 active:scale-[0.98]"
      >
        Save to My Board
      </button>
    </div>
  );
}

// PICK QUESTION SCREEN
function PickQuestionScreen({ questions, picker, onPick, onBack }: {
  questions: { id: string; text: string; category: string }[];
  picker: FamilyMember;
  onPick: (q: string) => void;
  onBack: () => void;
}) {
  const [category, setCategory] = useState<string | null>(null);
  const categories = [...new Set(questions.map(q => q.category))];
  const filteredQuestions = category 
    ? questions.filter(q => q.category === category)
    : questions;

  const categoryConfig: Record<string, { emoji: string; label: string }> = {
    fun: { emoji: '🎉', label: 'Fun' },
    gratitude: { emoji: '🙏', label: 'Gratitude' },
    deep: { emoji: '💭', label: 'Deep' },
    learn: { emoji: '📚', label: 'Learning' },
    goals: { emoji: '🎯', label: 'Goals' },
    identity: { emoji: '🪞', label: 'Identity' },
  };

  return (
    <div className="p-4 space-y-6">
      <button onClick={onBack} className="text-stone-500 hover:text-stone-700 transition-colors flex items-center gap-1">
        <span>←</span> Back
      </button>

      <div className="text-center">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl"
          style={{ backgroundColor: `${picker.color}20` }}
        >
          {picker.avatar}
        </div>
        <h1 className="text-xl font-bold text-stone-800">{picker.name}'s Turn!</h1>
        <p className="text-stone-500">Pick tonight's dinner question</p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setCategory(null)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            !category ? 'bg-amber-100 text-amber-800' : 'bg-white text-stone-600 hover:bg-stone-50'
          }`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
              category === cat ? 'bg-amber-100 text-amber-800' : 'bg-white text-stone-600 hover:bg-stone-50'
            }`}
          >
            {categoryConfig[cat]?.emoji} {categoryConfig[cat]?.label || cat}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filteredQuestions.map(q => (
          <button
            key={q.id}
            onClick={() => onPick(q.text)}
            className="w-full text-left p-4 rounded-xl bg-white border-2 border-transparent hover:border-amber-300 hover:shadow-sm transition-all group"
          >
            <div className="flex items-start gap-3">
              <span className="text-lg shrink-0">{categoryConfig[q.category]?.emoji || '❓'}</span>
              <div className="flex-1">
                <p className="text-stone-800 font-medium group-hover:text-amber-900 transition-colors">{q.text}</p>
                <p className="text-xs text-stone-400 mt-1 capitalize">{categoryConfig[q.category]?.label || q.category}</p>
              </div>
              <span className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// PASS SPOTLIGHT SCREEN
function PassSpotlightScreen({ currentHolder, family, passTo, setPassTo, reason, setReason, onPass, onBack }: {
  currentHolder: FamilyMember;
  family: FamilyMember[];
  passTo: string;
  setPassTo: (v: string) => void;
  reason: string;
  setReason: (v: string) => void;
  onPass: () => void;
  onBack: () => void;
}) {
  return (
    <div className="p-4 space-y-6">
      <button onClick={onBack} className="text-stone-500 hover:text-stone-700 transition-colors flex items-center gap-1">
        <span>←</span> Back
      </button>

      <div className="text-center">
        <div className="relative inline-block">
          <span className="text-6xl">⭐</span>
          <span className="absolute -bottom-2 -right-2 text-2xl">{currentHolder.avatar}</span>
        </div>
        <h1 className="text-xl font-bold text-stone-800 mt-4">Pass the Spotlight</h1>
        <p className="text-stone-500">{currentHolder.name} is passing it on</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-3">Who deserves it?</label>
        <div className="flex gap-3 justify-center">
          {family.map(member => (
            <button
              key={member.id}
              onClick={() => setPassTo(member.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                passTo === member.id 
                  ? 'bg-yellow-100 border-2 border-yellow-400 shadow-sm scale-105' 
                  : 'bg-white border-2 border-transparent hover:bg-stone-50'
              }`}
            >
              <span className="text-3xl">{member.avatar}</span>
              <span className="text-sm font-medium">{member.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-2">Why are you passing it to them?</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="They deserve it because..."
          className="w-full h-28 p-4 rounded-xl bg-white border-2 border-stone-200 focus:border-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-100 resize-none transition-all"
        />
      </div>

      <button 
        onClick={onPass}
        disabled={!passTo || !reason.trim()}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-yellow-500/25 active:scale-[0.98]"
      >
        ⭐ Pass the Spotlight
      </button>
    </div>
  );
}

// WISDOM LIBRARY SCREEN
function WisdomLibraryScreen({ magnets, addedIds, onAdd, onBack }: {
  magnets: typeof MAGNETS;
  addedIds: string[];
  onAdd: (magnet: typeof MAGNETS[0]) => void;
  onBack: () => void;
}) {
  const [pillarFilter, setPillarFilter] = useState<Pillar | null>(null);
  const [addedMagnet, setAddedMagnet] = useState<string | null>(null);
  
  const filteredMagnets = pillarFilter 
    ? magnets.filter(m => m.pillar === pillarFilter)
    : magnets;

  const handleAdd = (magnet: typeof MAGNETS[0]) => {
    onAdd(magnet);
    setAddedMagnet(magnet.text);
    setTimeout(() => setAddedMagnet(null), 2000);
  };

  return (
    <div className="p-4 space-y-4">
      <button onClick={onBack} className="text-stone-500 hover:text-stone-700 transition-colors flex items-center gap-1">
        <span>←</span> Back
      </button>

      <div>
        <h1 className="text-xl font-bold text-stone-800 flex items-center gap-2">
          📚 Wisdom Library
        </h1>
        <p className="text-stone-500 text-sm">60 philosophy magnets to inspire your family</p>
      </div>

      {/* Pillar Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setPillarFilter(null)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            !pillarFilter ? 'bg-purple-100 text-purple-800' : 'bg-white text-stone-600 hover:bg-stone-50'
          }`}
        >
          All ({magnets.length})
        </button>
        {(Object.keys(PILLAR_CONFIG) as Pillar[]).map(pillar => {
          const config = PILLAR_CONFIG[pillar];
          const count = magnets.filter(m => m.pillar === pillar).length;
          return (
            <button
              key={pillar}
              onClick={() => setPillarFilter(pillar)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
                pillarFilter === pillar ? 'bg-purple-100 text-purple-800' : 'bg-white text-stone-600 hover:bg-stone-50'
              }`}
            >
              {config.emoji} {config.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Magnets Grid */}
      <div className="space-y-2">
        {filteredMagnets.map((magnet, i) => {
          const config = PILLAR_CONFIG[magnet.pillar];
          const isAdded = addedIds.includes(magnet.text);
          const justAdded = addedMagnet === magnet.text;
          return (
            <div 
              key={i}
              className={`bg-white rounded-xl p-4 shadow-sm transition-all ${
                justAdded ? 'ring-2 ring-green-400 bg-green-50' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl shrink-0">{config.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-stone-800 leading-snug">"{magnet.text}"</p>
                  {magnet.source && (
                    <p className="text-xs text-stone-400 mt-1">— {magnet.source}</p>
                  )}
                  <span 
                    className="inline-block text-xs px-2 py-0.5 rounded-full mt-2"
                    style={{ backgroundColor: `${config.color}20`, color: config.color }}
                  >
                    {config.name}
                  </span>
                </div>
                <button
                  onClick={() => !isAdded && handleAdd(magnet)}
                  disabled={isAdded}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    justAdded 
                      ? 'bg-green-100 text-green-700'
                      : isAdded 
                        ? 'bg-stone-100 text-stone-400 cursor-not-allowed' 
                        : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  }`}
                >
                  {justAdded ? '✓ Added!' : isAdded ? 'Added' : '+ Add'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const FAMILY_MEMBERS = FAMILY; // For Archive filter
