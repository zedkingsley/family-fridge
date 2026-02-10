'use client';

import { useMemo } from 'react';
import { useFamily } from '@/components/providers/FamilyContext';
import { useFridge } from '@/components/providers/FridgeContext';
import { useRituals } from '@/components/providers/RitualContext';
import { useQuests } from '@/components/providers/QuestContext';
import { useExperiments } from '@/components/providers/ExperimentContext';
import { useNavigation } from '@/components/providers/AppProvider';
import { getTimeOfDay, isWeekend, isOnThisDay, daysSince } from '@/lib/utils';
import type { FridgeItem, FamilyMember, Experiment } from '@/lib/types';

// ---------------------------------------------------------------------------
// HomeScreen -- contextual, time-aware landing screen
// ---------------------------------------------------------------------------
// Philosophy: show only 1-2 things that matter *right now*.
// The primary card shifts based on time of day:
//   morning  -> question picker turn prompt + experiment check-ins
//   afternoon -> quest + spotlight
//   evening  -> tonight's question prominently
// Below the primary section we surface at most 2 additional contextual cards
// chosen from: spotlight, weekly quest, experiments, "on this day".
// ---------------------------------------------------------------------------

export default function HomeScreen() {
  const { state: familyState, getMember } = useFamily();
  const { state: fridgeState } = useFridge();
  const {
    state: ritualState,
    dispatch: ritualDispatch,
    currentQuestionPicker,
    spotlightDaysHeld,
  } = useRituals();
  const { state: questState } = useQuests();
  const { familyVisibleExperiments } = useExperiments();
  const { navigateTo } = useNavigation();

  const timeOfDay = getTimeOfDay();
  const weekend = isWeekend();
  const activeUser = familyState.activeUser;

  // --- derived data -------------------------------------------------------

  const picker: FamilyMember | undefined = getMember(currentQuestionPicker);
  const isMyTurn = currentQuestionPicker === activeUser;

  const tonightsQ = ritualState.tonightsQuestion;
  const questionPicked = tonightsQ !== null;
  const questionDiscussed = tonightsQ?.discussed ?? false;
  const questionPickerMember = tonightsQ ? getMember(tonightsQ.pickedBy) : undefined;

  const spotlightHolder: FamilyMember | undefined = getMember(
    ritualState.spotlight.currentHolder,
  );
  const spotlightNeedsNudge = spotlightDaysHeld >= 7;

  const weeklyQuest = questState.weeklyQuest;
  const weeklyQuestDetail = weeklyQuest
    ? questState.library.find((fq) => fq.id === weeklyQuest.familyQuestId)
    : undefined;

  const onThisDayItems: FridgeItem[] = useMemo(
    () => fridgeState.items.filter((item) => isOnThisDay(item.createdAt)),
    [fridgeState.items],
  );

  // --- decide which cards to show (max 2-3 total) -------------------------

  type CardKey =
    | 'question'
    | 'spotlight'
    | 'quest'
    | 'experiments'
    | 'onThisDay';

  const cards = useMemo(() => {
    const selected: CardKey[] = [];

    // The "question" card is always first priority
    selected.push('question');

    if (timeOfDay === 'morning') {
      // Morning: experiment check-ins are the secondary focus
      if (familyVisibleExperiments.length > 0) selected.push('experiments');
      if (spotlightHolder) selected.push('spotlight');
    } else if (timeOfDay === 'afternoon') {
      // Afternoon: quest + spotlight
      if (weeklyQuest && weeklyQuestDetail) selected.push('quest');
      if (spotlightHolder) selected.push('spotlight');
      if (selected.length < 3 && familyVisibleExperiments.length > 0)
        selected.push('experiments');
    } else {
      // Evening: question is already primary; fill with spotlight + quest
      if (spotlightHolder) selected.push('spotlight');
      if (weeklyQuest && weeklyQuestDetail) selected.push('quest');
    }

    // "On This Day" is a bonus card -- only show if we have room
    if (onThisDayItems.length > 0 && selected.length < 3) {
      selected.push('onThisDay');
    }

    return selected.slice(0, 3);
  }, [
    timeOfDay,
    familyVisibleExperiments.length,
    spotlightHolder,
    weeklyQuest,
    weeklyQuestDetail,
    onThisDayItems.length,
  ]);

  // --- greeting -----------------------------------------------------------

  const greetingName =
    getMember(activeUser)?.name.split(' ')[0] ?? 'there';

  const greeting =
    timeOfDay === 'morning'
      ? `Good morning, ${greetingName}`
      : timeOfDay === 'afternoon'
        ? `Good afternoon, ${greetingName}`
        : `Good evening, ${greetingName}`;

  const subtitle = weekend
    ? 'Happy weekend! What will the family get into today?'
    : timeOfDay === 'evening'
      ? 'Time to gather around the table.'
      : 'Here\u2019s what\u2019s happening for the family.';

  // --- render helpers -----------------------------------------------------

  function renderQuestionCard() {
    if (questionPicked && tonightsQ) {
      return (
        <div
          key="question"
          className="rounded-2xl border border-stone-100 bg-white p-5 shadow-sm"
        >
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-amber-600">
            Tonight&rsquo;s Question
          </p>
          <p className="mb-3 text-lg font-semibold leading-snug text-stone-800">
            &ldquo;{tonightsQ.questionText}&rdquo;
          </p>
          <p className="mb-4 text-sm text-stone-500">
            Picked by{' '}
            <span className="font-medium text-stone-700">
              {questionPickerMember?.avatar} {questionPickerMember?.name}
            </span>
          </p>

          {!questionDiscussed ? (
            <button
              onClick={() => ritualDispatch({ type: 'MARK_DISCUSSED' })}
              className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-transform active:scale-[0.98]"
            >
              We talked about it!
            </button>
          ) : (
            <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3">
              <span className="text-emerald-600">&#10003;</span>
              <span className="text-sm font-medium text-emerald-700">
                Great conversation!
              </span>
            </div>
          )}
        </div>
      );
    }

    // Question not yet picked
    return (
      <div
        key="question"
        className="rounded-2xl border border-stone-100 bg-white p-5 shadow-sm"
      >
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-amber-600">
          Tonight&rsquo;s Question
        </p>

        {picker ? (
          <>
            <div className="mb-3 flex items-center gap-3">
              <span className="text-3xl">{picker.avatar}</span>
              <div>
                <p className="text-base font-semibold text-stone-800">
                  {picker.name}
                </p>
                <p className="text-sm text-stone-500">
                  {isMyTurn ? 'Your turn to pick!' : 'Picking tonight\u2019s question'}
                </p>
              </div>
            </div>

            {isMyTurn && (
              <button
                onClick={() => navigateTo('pick-question')}
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-transform active:scale-[0.98]"
              >
                Pick tonight&rsquo;s question
              </button>
            )}
          </>
        ) : (
          <button
            onClick={() => navigateTo('pick-question')}
            className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-transform active:scale-[0.98]"
          >
            Pick tonight&rsquo;s question
          </button>
        )}
      </div>
    );
  }

  function renderSpotlightCard() {
    if (!spotlightHolder) return null;
    return (
      <div
        key="spotlight"
        className="rounded-2xl border border-stone-100 bg-gradient-to-br from-yellow-50 to-amber-50 p-5 shadow-sm"
      >
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-yellow-700">
          Family Spotlight
        </p>
        <div className="mb-3 flex items-center gap-3">
          <span className="text-3xl">{spotlightHolder.avatar}</span>
          <div>
            <p className="text-base font-semibold text-stone-800">
              {spotlightHolder.name}
            </p>
            <p className="text-sm text-stone-500">
              Holding the spotlight for{' '}
              <span className="font-medium text-stone-700">
                {spotlightDaysHeld} {spotlightDaysHeld === 1 ? 'day' : 'days'}
              </span>
            </p>
          </div>
        </div>

        {spotlightNeedsNudge && (
          <p className="mb-3 text-xs text-amber-600">
            It&rsquo;s been a week &mdash; maybe time to pass it along?
          </p>
        )}

        <button
          onClick={() => navigateTo('pass-spotlight')}
          className="w-full rounded-xl bg-gradient-to-r from-yellow-400 to-amber-400 px-4 py-3 text-sm font-semibold text-stone-800 shadow-sm transition-transform active:scale-[0.98]"
        >
          Pass when ready
        </button>
      </div>
    );
  }

  function renderQuestCard() {
    if (!weeklyQuest || !weeklyQuestDetail) return null;
    return (
      <div
        key="quest"
        className="rounded-2xl border border-stone-100 bg-white p-5 shadow-sm"
      >
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-violet-600">
          Weekly Quest
        </p>
        <p className="mb-3 text-base font-semibold leading-snug text-stone-800">
          {weeklyQuestDetail.quest.title}
        </p>
        <button
          onClick={() => navigateTo('weekly-quest')}
          className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-transform active:scale-[0.98]"
        >
          We did it!
        </button>
      </div>
    );
  }

  function renderExperimentsCard() {
    if (familyVisibleExperiments.length === 0) return null;

    // Show a compact list (max 3)
    const visible = familyVisibleExperiments.slice(0, 3);

    return (
      <div
        key="experiments"
        className="rounded-2xl border border-stone-100 bg-white p-5 shadow-sm"
      >
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-teal-600">
          Active Experiments
        </p>
        <ul className="space-y-2">
          {visible.map((exp: Experiment) => {
            const owner = getMember(exp.memberId);
            const daysIn = daysSince(exp.startDate);
            const progress = Math.min(
              100,
              Math.round((daysIn / exp.durationDays) * 100),
            );

            return (
              <li
                key={exp.id}
                className="flex items-center gap-3"
              >
                <span className="text-lg">{owner?.avatar ?? '?'}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-stone-700">
                    {exp.title}
                  </p>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-stone-100">
                    <div
                      className="h-full rounded-full bg-teal-400 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <span className="shrink-0 text-xs text-stone-400">
                  Day {daysIn}/{exp.durationDays}
                </span>
              </li>
            );
          })}
        </ul>

        {familyVisibleExperiments.length > 3 && (
          <button
            onClick={() => navigateTo('experiment')}
            className="mt-3 text-sm font-medium text-teal-600"
          >
            +{familyVisibleExperiments.length - 3} more
          </button>
        )}
      </div>
    );
  }

  function renderOnThisDayCard() {
    if (onThisDayItems.length === 0) return null;
    const item = onThisDayItems[0];
    const author = item.saidBy ? getMember(item.saidBy) : getMember(item.capturedBy);
    const yearsAgo = new Date().getFullYear() - new Date(item.createdAt).getFullYear();

    return (
      <div
        key="onThisDay"
        className="rounded-2xl border border-stone-100 bg-gradient-to-br from-rose-50 to-orange-50 p-5 shadow-sm"
      >
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-rose-500">
          {yearsAgo === 1 ? 'A year ago today' : `${yearsAgo} years ago today`}
        </p>
        <p className="mb-2 text-base leading-snug text-stone-800">
          {author && (
            <span className="font-medium">
              {author.avatar} {author.name} said:{' '}
            </span>
          )}
          &ldquo;{item.content}&rdquo;
        </p>

        <button
          onClick={() => navigateTo('fridge')}
          className="text-sm font-medium text-rose-500"
        >
          View on the fridge &rarr;
        </button>
      </div>
    );
  }

  const cardRenderers: Record<CardKey, () => React.ReactNode> = {
    question: renderQuestionCard,
    spotlight: renderSpotlightCard,
    quest: renderQuestCard,
    experiments: renderExperimentsCard,
    onThisDay: renderOnThisDayCard,
  };

  // --- main render --------------------------------------------------------

  return (
    <div className="flex min-h-full flex-col px-5 pb-6 pt-8">
      {/* Greeting */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-stone-800">{greeting}</h1>
        <p className="mt-1 text-sm text-stone-500">{subtitle}</p>
      </header>

      {/* Contextual cards */}
      <div className="flex-1 space-y-4">
        {cards.map((key) => cardRenderers[key]())}
      </div>

      {/* Quick actions */}
      <nav className="mt-8 flex items-center justify-around rounded-2xl border border-stone-100 bg-white px-2 py-3 shadow-sm">
        <QuickAction
          icon="&#x1F30D;"
          label="Discover"
          onClick={() => navigateTo('discover')}
        />
        <QuickAction
          icon="&#x1F5FA;"
          label="Quests"
          onClick={() => navigateTo('quest-library')}
        />
        <QuickAction
          icon="&#x1F9EA;"
          label="Experiment"
          onClick={() => navigateTo('experiment')}
        />
      </nav>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Small internal component for the quick-action row
// ---------------------------------------------------------------------------

interface QuickActionProps {
  icon: string;
  label: string;
  onClick: () => void;
}

function QuickAction({ icon, label, onClick }: QuickActionProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 rounded-xl px-4 py-2 transition-colors hover:bg-stone-50 active:bg-stone-100"
    >
      <span
        className="text-xl"
        dangerouslySetInnerHTML={{ __html: icon }}
      />
      <span className="text-xs font-medium text-stone-600">{label}</span>
    </button>
  );
}
