'use client';

import { useState, useMemo } from 'react';
import { useFridge } from '@/components/providers/FridgeContext';
import { useFamily } from '@/components/providers/FamilyContext';
import { useNavigation } from '@/components/providers/AppProvider';
import FridgeItemCard from '@/components/cards/FridgeItemCard';
import TabFilter from '@/components/ui/TabFilter';
import MemberPicker from '@/components/ui/MemberPicker';
import type { FridgeItemType, FridgeStatus } from '@/lib/types';

const TYPE_TABS = [
  { id: 'all', label: 'All', emoji: '🗂' },
  { id: 'quote', label: 'Quotes', emoji: '💬' },
  { id: 'wisdom', label: 'Wisdom', emoji: '🌿' },
  { id: 'note', label: 'Notes', emoji: '📝' },
];

export default function ArchiveScreen() {
  const { state: fridgeState, dispatch } = useFridge();
  const { state: familyState, getMember } = useFamily();
  const { navigateTo } = useNavigation();

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [personFilter, setPersonFilter] = useState<string | null>(null);

  const currentUserId = familyState.activeUser || familyState.members[0]?.id || '';

  const handlePromote = (itemId: string, status: FridgeStatus) => {
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

  const handlePersonSelect = (memberId: string) => {
    setPersonFilter((prev) => (prev === memberId ? null : memberId));
  };

  const filteredItems = useMemo(() => {
    const searchLower = search.toLowerCase().trim();

    return fridgeState.items
      .filter((item) => {
        // Type filter
        if (typeFilter !== 'all' && item.type !== (typeFilter as FridgeItemType)) {
          return false;
        }

        // Person filter: match capturedBy or saidBy
        if (personFilter) {
          if (item.capturedBy !== personFilter && item.saidBy !== personFilter) {
            return false;
          }
        }

        // Search filter
        if (searchLower) {
          const contentMatch = item.content.toLowerCase().includes(searchLower);
          const sourceMatch = item.source?.toLowerCase().includes(searchLower) ?? false;
          const memberName = item.saidBy
            ? getMember(item.saidBy)?.name?.toLowerCase()
            : undefined;
          const nameMatch = memberName?.includes(searchLower) ?? false;
          if (!contentMatch && !sourceMatch && !nameMatch) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [fridgeState.items, typeFilter, personFilter, search, getMember]);

  return (
    <div className="min-h-screen bg-amber-50/40">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 px-4 py-3 flex items-center gap-3 border-b border-amber-100">
        <button
          onClick={() => navigateTo('fridge', 'right')}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 transition-colors text-stone-600"
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-stone-800">Archive</h1>
        </div>
        <span className="text-sm text-stone-400 font-medium">
          {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search quotes, wisdom, notes..."
            className="w-full bg-white rounded-2xl pl-11 pr-4 py-3 text-sm text-stone-700 placeholder:text-stone-400 shadow-sm border border-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Type Filter Tabs */}
        <div className="bg-white rounded-2xl p-3 shadow-sm">
          <TabFilter
            options={TYPE_TABS}
            selected={typeFilter}
            onSelect={setTypeFilter}
            variant="amber"
          />
        </div>

        {/* Person Filter */}
        {familyState.members.length > 0 && (
          <div className="bg-white rounded-2xl p-3 shadow-sm">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
              Filter by Person
            </p>
            <MemberPicker
              members={familyState.members}
              selected={personFilter}
              onSelect={handlePersonSelect}
              size="sm"
              showNames
            />
          </div>
        )}

        {/* Results List */}
        {filteredItems.length > 0 ? (
          <div className="space-y-3">
            {filteredItems.map((item) => (
              <FridgeItemCard
                key={item.id}
                item={item}
                getMember={getMember}
                currentUserId={currentUserId}
                onPromote={handlePromote}
                onReact={handleReact}
                onRemoveReaction={handleRemoveReaction}
                showActions
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
            <p className="text-4xl mb-3">{'🔍'}</p>
            <h3 className="text-lg font-bold text-stone-700 mb-1">Nothing found</h3>
            <p className="text-sm text-stone-400">
              {search
                ? `No results for "${search}". Try a different search or clear your filters.`
                : 'No items match the current filters. Try adjusting them above.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
