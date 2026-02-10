'use client';

import { useNavigation } from '@/components/providers/AppProvider';
import { WISDOM_PACKS } from '@/lib/packs';
import { QUEST_PACKS } from '@/lib/quests';

export default function DiscoverScreen() {
  const { navigateTo, setActivePack } = useNavigation();

  const handleOpenWisdomPack = (pack: typeof WISDOM_PACKS[0]) => {
    setActivePack({
      type: 'wisdom',
      id: pack.id,
      name: pack.name,
      emoji: pack.emoji,
      color: pack.color,
      items: pack.cards.map(c => ({ id: c.id, text: c.text, source: c.source, attribution: c.attribution })),
    });
    navigateTo('swipe-pack');
  };

  const handleOpenQuestPack = (pack: typeof QUEST_PACKS[0]) => {
    setActivePack({
      type: 'quest',
      id: pack.id,
      name: pack.name,
      emoji: pack.emoji,
      color: pack.color,
      items: pack.quests.map(q => ({ id: q.id, title: q.title, description: q.description, duration: q.duration, minAge: q.minAge })),
    });
    navigateTo('swipe-pack');
  };

  return (
    <div className="p-4 space-y-6">
      {/* Family Wisdom highlight */}
      <button
        onClick={() => navigateTo('wisdom-library')}
        className="w-full bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border-2 border-amber-200 text-left hover:border-amber-300 hover:shadow-md transition-all group"
      >
        <div className="flex items-center gap-4">
          <span className="text-4xl">🪞</span>
          <div className="flex-1">
            <p className="font-bold text-amber-900 text-lg">Family Wisdom</p>
            <p className="text-amber-700 text-sm">60 magnets from your family philosophy</p>
          </div>
          <span className="text-amber-400 group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </button>

      {/* Wisdom Packs */}
      <div>
        <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3">Wisdom Packs</h2>
        <div className="grid gap-3">
          {WISDOM_PACKS.map(pack => (
            <button
              key={pack.id}
              onClick={() => handleOpenWisdomPack(pack)}
              className="w-full bg-white rounded-xl p-4 border border-stone-100 text-left hover:border-stone-200 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{ backgroundColor: `${pack.color}15` }}
                >
                  {pack.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-stone-800">{pack.name}</p>
                  <p className="text-stone-500 text-sm">{pack.description}</p>
                  <p className="text-xs text-stone-400 mt-0.5">{pack.cards.length} cards</p>
                </div>
                <span className="text-stone-300 group-hover:text-stone-400 group-hover:translate-x-1 transition-all shrink-0">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quest Packs */}
      <div>
        <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3">Quest Packs</h2>
        <div className="grid gap-3">
          {QUEST_PACKS.map(pack => (
            <button
              key={pack.id}
              onClick={() => handleOpenQuestPack(pack)}
              className="w-full bg-white rounded-xl p-4 border border-stone-100 text-left hover:border-stone-200 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{ backgroundColor: `${pack.color}15` }}
                >
                  {pack.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-stone-800">{pack.name}</p>
                  <p className="text-stone-500 text-sm">{pack.description}</p>
                  <p className="text-xs text-stone-400 mt-0.5">{pack.quests.length} quests</p>
                </div>
                <span className="text-stone-300 group-hover:text-stone-400 group-hover:translate-x-1 transition-all shrink-0">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
