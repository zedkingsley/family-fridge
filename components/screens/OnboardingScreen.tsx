'use client';

import { useState } from 'react';
import { useFamily } from '@/components/providers/FamilyContext';
import { useFridge } from '@/components/providers/FridgeContext';
import { useRituals } from '@/components/providers/RitualContext';
import { useNavigation } from '@/components/providers/AppProvider';
import { FamilyMember, VibeEmoji } from '@/lib/types';
import { generateId, setSchemaVersion } from '@/lib/storage';
import { SAMPLE_FAMILY, SAMPLE_FRIDGE_ITEMS, SAMPLE_SPOTLIGHT, SAMPLE_TURNS, SAMPLE_VALUES, SAMPLE_TONIGHTS_QUESTION } from '@/lib/sampleData';
import { MAGNETS } from '@/lib/magnets';
import Button from '@/components/ui/Button';

const AVATARS = ['👨', '👩', '👦', '👧', '🧑', '👴', '👵', '🧒', '👶'];
const COLORS = ['#3B82F6', '#8B5CF6', '#F59E0B', '#EC4899', '#10B981', '#EF4444', '#6366F1', '#0891B2'];

export default function OnboardingScreen() {
  const { dispatch: familyDispatch } = useFamily();
  const { dispatch: fridgeDispatch } = useFridge();
  const { dispatch: ritualDispatch } = useRituals();
  const { navigateTo } = useNavigation();

  const [step, setStep] = useState(0);
  const [members, setMembers] = useState<Partial<FamilyMember>[]>([]);
  const [editingName, setEditingName] = useState('');
  const [editingAvatar, setEditingAvatar] = useState('🧑');
  const [editingColor, setEditingColor] = useState('#3B82F6');
  const [editingRole, setEditingRole] = useState<'parent' | 'child'>('parent');

  // Step 4: First quote
  const [quoteText, setQuoteText] = useState('');
  const [quoteSaidBy, setQuoteSaidBy] = useState('');
  const [quoteEmoji, setQuoteEmoji] = useState<VibeEmoji>('😂');

  // Step 5: Swipe
  const [swipeIndex, setSwipeIndex] = useState(0);
  const starterMagnets = MAGNETS.slice(0, 5);

  const handleAddMember = () => {
    if (!editingName.trim()) return;
    setMembers([...members, {
      id: generateId('member'),
      name: editingName.trim(),
      avatar: editingAvatar,
      color: editingColor,
      role: editingRole,
      birthdate: editingRole === 'child' ? '2018-01-01' : '1988-01-01',
    }]);
    setEditingName('');
    setEditingAvatar(AVATARS[(members.length + 1) % AVATARS.length]);
    setEditingColor(COLORS[(members.length + 1) % COLORS.length]);
    setEditingRole(members.length < 1 ? 'parent' : 'child');
  };

  const finishOnboarding = () => {
    const fullMembers: FamilyMember[] = members.map(m => ({
      id: m.id || generateId('member'),
      name: m.name || '',
      avatar: m.avatar || '🧑',
      color: m.color || '#3B82F6',
      birthdate: m.birthdate || '2000-01-01',
      role: m.role || 'parent',
    }));

    // Save family
    fullMembers.forEach(m => familyDispatch({ type: 'ADD_MEMBER', member: m }));
    familyDispatch({ type: 'SET_ACTIVE_USER', memberId: fullMembers[0]?.id || '' });
    familyDispatch({ type: 'COMPLETE_ONBOARDING' });

    // Set up turns
    ritualDispatch({
      type: 'SET_TURN_ORDER',
      questionPickerOrder: fullMembers.map(m => m.id),
      questPickerOrder: fullMembers.filter(m => m.role === 'parent').map(m => m.id),
    });

    // Set spotlight to first member
    ritualDispatch({
      type: 'SET_STATE',
      state: {
        spotlight: {
          currentHolder: fullMembers[0]?.id || '',
          heldSince: new Date().toISOString(),
          history: [],
        },
      },
    });

    // Save first quote if captured
    if (quoteText.trim() && quoteSaidBy) {
      fridgeDispatch({
        type: 'ADD_ITEM',
        item: {
          type: 'quote',
          content: quoteText,
          saidBy: quoteSaidBy,
          capturedBy: fullMembers[0]?.id || '',
          emoji: quoteEmoji,
          status: 'pinned',
        },
      });
    }

    setSchemaVersion();
    navigateTo('home');
  };

  const loadDemo = () => {
    SAMPLE_FAMILY.forEach(m => familyDispatch({ type: 'ADD_MEMBER', member: m }));
    familyDispatch({ type: 'SET_ACTIVE_USER', memberId: 'dad' });
    familyDispatch({ type: 'COMPLETE_ONBOARDING' });
    SAMPLE_VALUES.forEach(v => familyDispatch({ type: 'ADD_VALUE', value: v }));
    fridgeDispatch({ type: 'SET_ITEMS', items: SAMPLE_FRIDGE_ITEMS });
    ritualDispatch({
      type: 'SET_STATE',
      state: {
        spotlight: SAMPLE_SPOTLIGHT,
        turns: SAMPLE_TURNS,
        tonightsQuestion: SAMPLE_TONIGHTS_QUESTION,
      },
    });
    setSchemaVersion();
    navigateTo('home');
  };

  // STEP 0: Welcome
  if (step === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <div className="animate-float-in">
          <span className="text-7xl block mb-6">🧲</span>
          <h1 className="text-3xl font-bold text-stone-800 mb-2">Family Fridge</h1>
          <p className="text-stone-500 text-lg mb-8">Your family&apos;s fridge door, digital.</p>
          <Button onClick={() => setStep(1)} size="lg" fullWidth>
            Let&apos;s set it up!
          </Button>
          <button
            onClick={loadDemo}
            className="mt-4 text-sm text-stone-400 hover:text-stone-600 transition-colors"
          >
            or load demo family
          </button>
        </div>
      </div>
    );
  }

  // STEP 1: Add family members
  if (step === 1) {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center">
          <span className="text-4xl block mb-2">👨‍👩‍👧‍👦</span>
          <h1 className="text-2xl font-bold text-stone-800">Who&apos;s in your family?</h1>
          <p className="text-stone-500 mt-1">Add everyone who&apos;ll use the Fridge</p>
        </div>

        {/* Added members */}
        {members.length > 0 && (
          <div className="flex gap-3 justify-center flex-wrap">
            {members.map((m, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2"
                  style={{ backgroundColor: `${m.color}20`, borderColor: m.color }}
                >
                  {m.avatar}
                </div>
                <span className="text-xs font-medium text-stone-700">{m.name}</span>
                <span className="text-[10px] text-stone-400">{m.role}</span>
              </div>
            ))}
          </div>
        )}

        {/* Add member form */}
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
          <input
            type="text"
            value={editingName}
            onChange={e => setEditingName(e.target.value)}
            placeholder="Name (e.g., Mom, Dad, Alex...)"
            className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-amber-400 focus:outline-none text-base"
            autoFocus
          />

          <div>
            <label className="block text-xs font-medium text-stone-500 mb-2">Pick an avatar</label>
            <div className="flex gap-2 flex-wrap">
              {AVATARS.map(a => (
                <button
                  key={a}
                  onClick={() => setEditingAvatar(a)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all ${
                    editingAvatar === a ? 'ring-2 ring-amber-400 bg-amber-50 scale-110' : 'bg-stone-50 hover:bg-stone-100'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-500 mb-2">Color</label>
            <div className="flex gap-2 flex-wrap">
              {COLORS.map(c => (
                <button
                  key={c}
                  onClick={() => setEditingColor(c)}
                  className={`w-8 h-8 rounded-full transition-all ${
                    editingColor === c ? 'ring-2 ring-offset-2 scale-110' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: c, ['--tw-ring-color' as string]: c } as React.CSSProperties}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            {(['parent', 'child'] as const).map(role => (
              <button
                key={role}
                onClick={() => setEditingRole(role)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                  editingRole === role
                    ? 'bg-amber-100 text-amber-800 ring-2 ring-amber-400'
                    : 'bg-stone-50 text-stone-500 hover:bg-stone-100'
                }`}
              >
                {role === 'parent' ? '👤 Parent' : '🧒 Child'}
              </button>
            ))}
          </div>

          <Button onClick={handleAddMember} disabled={!editingName.trim()} fullWidth>
            Add {editingName || 'member'}
          </Button>
        </div>

        {members.length >= 2 && (
          <Button onClick={() => setStep(2)} variant="success" fullWidth size="lg">
            Continue with {members.length} members →
          </Button>
        )}
      </div>
    );
  }

  // STEP 2: Fun conversation starter
  if (step === 2) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <div className="animate-float-in max-w-sm">
          <span className="text-5xl block mb-4">💬</span>
          <h1 className="text-xl font-bold text-stone-800 mb-2">Before we go further...</h1>
          <p className="text-stone-600 mb-4">Everyone answer this out loud:</p>
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <p className="text-xl font-medium text-stone-800 leading-relaxed">
              &ldquo;If our family had a theme song, what would it be?&rdquo;
            </p>
          </div>
          <p className="text-stone-400 text-sm mb-6">Discuss it right now! No need to type anything.</p>
          <Button onClick={() => setStep(3)} fullWidth>
            We talked about it! →
          </Button>
        </div>
      </div>
    );
  }

  // STEP 3: First quote capture
  if (step === 3) {
    return (
      <div className="p-6 space-y-5">
        <div className="text-center">
          <span className="text-4xl block mb-2">💬</span>
          <h1 className="text-xl font-bold text-stone-800">Capture your first quote!</h1>
          <p className="text-stone-500 text-sm">Has anyone said something hilarious or sweet?</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-2">Who said it?</label>
          <div className="flex gap-2 flex-wrap">
            {members.map(m => (
              <button
                key={m.id}
                onClick={() => setQuoteSaidBy(m.id || '')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  quoteSaidBy === m.id
                    ? 'text-white shadow-md'
                    : 'bg-white text-stone-700 border border-stone-200'
                }`}
                style={{ backgroundColor: quoteSaidBy === m.id ? m.color : undefined }}
              >
                <span>{m.avatar}</span>
                <span className="font-medium text-sm">{m.name}</span>
              </button>
            ))}
          </div>
        </div>

        <textarea
          value={quoteText}
          onChange={e => setQuoteText(e.target.value)}
          placeholder="Type what they said..."
          className="w-full h-24 p-4 rounded-xl bg-white border-2 border-stone-200 focus:border-amber-400 focus:outline-none resize-none text-base"
        />

        <div className="flex gap-2 justify-between">
          {(['😂', '🥹', '🤔', '💡', '❤️'] as const).map(e => (
            <button
              key={e}
              onClick={() => setQuoteEmoji(e)}
              className={`flex-1 py-2 rounded-xl text-center transition-all ${
                quoteEmoji === e ? 'bg-amber-100 ring-2 ring-amber-400 scale-105' : 'bg-white hover:bg-stone-50'
              }`}
            >
              <span className="text-xl">{e}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <Button onClick={() => setStep(4)} fullWidth disabled={!quoteText.trim() || !quoteSaidBy}>
            Save and continue →
          </Button>
          <Button onClick={() => setStep(4)} variant="ghost">
            Skip
          </Button>
        </div>
      </div>
    );
  }

  // STEP 4: Quick wisdom swipe
  if (step === 4) {
    const currentMagnet = starterMagnets[swipeIndex];
    if (!currentMagnet || swipeIndex >= starterMagnets.length) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
          <div className="animate-float-in">
            <span className="text-6xl block mb-4">🎉</span>
            <h1 className="text-2xl font-bold text-stone-800 mb-2">You&apos;re all set!</h1>
            <p className="text-stone-500 mb-2">Your Family Fridge is ready.</p>
            <p className="text-stone-400 text-sm mb-8">
              Each day, someone picks a dinner question. The spotlight passes when you&apos;re ready.
              Everything builds from here.
            </p>
            <Button onClick={finishOnboarding} size="lg" fullWidth>
              Open your Fridge →
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <p className="text-sm text-stone-400 mb-4">{swipeIndex + 1} of {starterMagnets.length} • Quick taste of Family Wisdom</p>
        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-amber-200 max-w-sm w-full mb-6">
          <span className="text-3xl block mb-4">🪞</span>
          <p className="text-lg font-medium text-stone-800 leading-relaxed">
            &ldquo;{currentMagnet.text}&rdquo;
          </p>
          <p className="text-stone-500 mt-3 text-sm">— {currentMagnet.source}</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setSwipeIndex(i => i + 1)}
            className="w-14 h-14 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center text-xl hover:bg-stone-200 transition-all"
          >
            ✕
          </button>
          <button
            onClick={() => {
              // Add to fridge
              fridgeDispatch({
                type: 'ADD_ITEM',
                item: {
                  type: 'wisdom',
                  content: currentMagnet.text,
                  source: currentMagnet.source,
                  capturedBy: members[0]?.id || '',
                  pillar: currentMagnet.pillar,
                  status: 'personal',
                },
              });
              setSwipeIndex(i => i + 1);
            }}
            className="w-14 h-14 rounded-full bg-green-100 text-green-500 flex items-center justify-center text-xl hover:bg-green-200 transition-all"
          >
            ♥
          </button>
        </div>
      </div>
    );
  }

  return null;
}
