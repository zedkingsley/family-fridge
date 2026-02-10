'use client';

import { useFridge } from '@/components/providers/FridgeContext';
import { useFamily } from '@/components/providers/FamilyContext';
import { useNavigation } from '@/components/providers/AppProvider';
import FridgeItemCard from '@/components/cards/FridgeItemCard';

const VALUE_BADGE_COLORS = [
  'bg-rose-100 text-rose-700',
  'bg-sky-100 text-sky-700',
  'bg-emerald-100 text-emerald-700',
  'bg-violet-100 text-violet-700',
  'bg-amber-100 text-amber-700',
  'bg-teal-100 text-teal-700',
  'bg-pink-100 text-pink-700',
  'bg-indigo-100 text-indigo-700',
];

export default function FridgeScreen() {
  const { dispatch, pinnedItems, rotationItems } = useFridge();
  const { state: familyState, getMember } = useFamily();
  const { navigateTo, goBack } = useNavigation();

  const currentUserId = familyState.activeUser || familyState.members[0]?.id || '';

  const handlePromote = (itemId: string, status: import('@/lib/types').FridgeStatus) => {
    dispatch({ type: 'UPDATE_STATUS', itemId, status });
  };

  const handleReact = (itemId: string, emoji: string) => {
    dispatch({
      type: 'ADD_REACTION',
      itemId,
      reaction: { memberId: currentUserId, emoji },
    });
  };

  const handleRemoveReaction = (itemId: string) => {
    dispatch({ type: 'REMOVE_REACTION', itemId, memberId: currentUserId });
  };

  return (
    <div className="min-h-screen bg-amber-50/40">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 px-4 py-3 flex items-center gap-3 border-b border-amber-100">
        <button
          onClick={goBack}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 transition-colors text-stone-600"
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-stone-800">Family Fridge</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-6">
        {/* Family Values Badges */}
        {familyState.values.length > 0 && (
          <button
            onClick={() => navigateTo('family-values')}
            className="w-full"
          >
            <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2.5">
                Our Family Values
              </p>
              <div className="flex flex-wrap gap-2">
                {familyState.values.map((value, index) => (
                  <span
                    key={value.id}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                      VALUE_BADGE_COLORS[index % VALUE_BADGE_COLORS.length]
                    }`}
                  >
                    <span>{value.emoji}</span>
                    {value.title}
                  </span>
                ))}
              </div>
            </div>
          </button>
        )}

        {/* Pinned Section */}
        <section>
          <h2 className="text-base font-bold text-stone-700 mb-3 flex items-center gap-2">
            <span className="text-lg">{'📌'}</span>
            Pinned ({pinnedItems.length} {pinnedItems.length === 1 ? 'item' : 'items'})
          </h2>
          {pinnedItems.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {pinnedItems.map((item) => (
                <FridgeItemCard
                  key={item.id}
                  item={item}
                  getMember={getMember}
                  currentUserId={currentUserId}
                  onPromote={handlePromote}
                  onReact={handleReact}
                  onRemoveReaction={handleRemoveReaction}
                  compact
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <p className="text-3xl mb-2">{'📌'}</p>
              <p className="text-sm text-stone-400">
                No pinned items yet. Pin your favorites from the archive!
              </p>
            </div>
          )}
        </section>

        {/* Rotation Section */}
        <section>
          <h2 className="text-base font-bold text-stone-700 mb-3 flex items-center gap-2">
            <span className="text-lg">{'🔄'}</span>
            Rotation ({rotationItems.length} {rotationItems.length === 1 ? 'item' : 'items'})
          </h2>
          {rotationItems.length > 0 ? (
            <div className="space-y-3">
              {rotationItems.map((item) => (
                <FridgeItemCard
                  key={item.id}
                  item={item}
                  getMember={getMember}
                  currentUserId={currentUserId}
                  onPromote={handlePromote}
                  onReact={handleReact}
                  onRemoveReaction={handleRemoveReaction}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <p className="text-3xl mb-2">{'🔄'}</p>
              <p className="text-sm text-stone-400">
                No rotation items. Swipe through packs to add some!
              </p>
            </div>
          )}
        </section>

        {/* Archive Link */}
        <button
          onClick={() => navigateTo('archive')}
          className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{'📦'}</span>
            <div className="text-left">
              <p className="text-stone-700 font-semibold">Archive</p>
              <p className="text-xs text-stone-400">
                Browse all saved items
              </p>
            </div>
          </div>
          <svg
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="text-stone-400 group-hover:translate-x-0.5 transition-transform"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
