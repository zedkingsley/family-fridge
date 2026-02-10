'use client';

import { useState, useMemo } from 'react';
import { useFamily } from '@/components/providers/FamilyContext';
import { useRituals } from '@/components/providers/RitualContext';
import { useNavigation } from '@/components/providers/AppProvider';
import { QUESTIONS, QUESTION_CATEGORIES } from '@/lib/questions';
import TabFilter from '@/components/ui/TabFilter';
import { getAge, shuffleArray } from '@/lib/utils';
import { QuestionCategory, Question } from '@/lib/types';

export default function PickQuestionScreen() {
  const { state: familyState, getMember } = useFamily();
  const { state: ritualState, dispatch, currentQuestionPicker } = useRituals();
  const { navigateTo, goBack } = useNavigation();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const picker = getMember(currentQuestionPicker);
  const isChild = picker?.role === 'child';

  // Determine youngest family member age for filtering
  const youngestAge = useMemo(() => {
    if (familyState.members.length === 0) return 0;
    return Math.min(
      ...familyState.members
        .filter(m => m.birthdate)
        .map(m => getAge(m.birthdate))
    );
  }, [familyState.members]);

  // Filter out already-used questions and apply age filter
  const availableQuestions = useMemo(() => {
    return QUESTIONS.filter(q => {
      if (ritualState.questionHistory.includes(q.id)) return false;
      if (q.minAge > youngestAge) return false;
      return true;
    });
  }, [ritualState.questionHistory, youngestAge]);

  // For kids: pick 3 random age-appropriate questions
  const kidQuestions = useMemo(() => {
    return shuffleArray(availableQuestions).slice(0, 3);
  }, [availableQuestions]);

  // For parents: filter by selected category
  const filteredQuestions = useMemo(() => {
    if (selectedCategory === 'all') return availableQuestions;
    return availableQuestions.filter(q => q.category === selectedCategory);
  }, [availableQuestions, selectedCategory]);

  // Build category tab options
  const categoryTabs = useMemo(() => {
    const allOption = { id: 'all', label: 'All', emoji: '🌟', count: availableQuestions.length };
    const cats = (Object.keys(QUESTION_CATEGORIES) as QuestionCategory[]).map(cat => ({
      id: cat,
      label: QUESTION_CATEGORIES[cat].label,
      emoji: QUESTION_CATEGORIES[cat].emoji,
      count: availableQuestions.filter(q => q.category === cat).length,
    }));
    return [allOption, ...cats];
  }, [availableQuestions]);

  const handlePickQuestion = (question: Question) => {
    dispatch({
      type: 'PICK_QUESTION',
      questionId: question.id,
      questionText: question.text,
      category: question.category,
      pickedBy: currentQuestionPicker,
    });
    dispatch({ type: 'ADVANCE_QUESTION_PICKER' });
    navigateTo('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/80 to-orange-50/40">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-amber-100">
        <button
          onClick={goBack}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-stone-500 hover:bg-stone-50 transition-colors shadow-sm"
        >
          <span className="text-xl">&larr;</span>
        </button>
        <h1 className="text-lg font-bold text-stone-800">Pick Tonight&apos;s Question</h1>
      </div>

      <div className="p-5 space-y-5">
        {/* Who's picking */}
        {picker && (
          <div className="flex flex-col items-center gap-2 py-3">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
              style={{ backgroundColor: `${picker.color}20` }}
            >
              {picker.avatar}
            </div>
            <p className="text-lg font-bold text-stone-800">
              {picker.name}&apos;s Turn!
            </p>
          </div>
        )}

        {/* Kid Mode: 3 simple cards */}
        {isChild ? (
          <div className="space-y-3">
            <p className="text-center text-sm text-stone-500">
              Pick a question for dinner tonight!
            </p>
            {kidQuestions.map(question => (
              <button
                key={question.id}
                onClick={() => handlePickQuestion(question)}
                className="w-full bg-white rounded-2xl p-5 border-2 border-stone-100 text-left hover:border-amber-300 hover:shadow-lg transition-all active:scale-[0.98] group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-0.5">
                    {QUESTION_CATEGORIES[question.category].emoji}
                  </span>
                  <div className="flex-1">
                    <p className="text-stone-800 font-medium text-lg leading-snug">
                      {question.text}
                    </p>
                    <p className="text-xs text-stone-400 mt-2 capitalize">
                      {QUESTION_CATEGORIES[question.category].label}
                    </p>
                  </div>
                  <span className="text-stone-300 group-hover:text-amber-400 group-hover:translate-x-1 transition-all text-lg mt-1">
                    &rarr;
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* Parent Mode: Full category browsing */
          <div className="space-y-4">
            {/* Category filter tabs */}
            <TabFilter
              options={categoryTabs}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
              variant="amber"
            />

            {/* Questions list */}
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-3xl mb-2">🎉</p>
                <p className="text-stone-500 font-medium">
                  All questions in this category have been used!
                </p>
                <p className="text-sm text-stone-400 mt-1">
                  Try another category or check back later.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredQuestions.map(question => (
                  <button
                    key={question.id}
                    onClick={() => handlePickQuestion(question)}
                    className="w-full bg-white rounded-xl p-4 border border-stone-100 text-left hover:border-amber-200 hover:shadow-md transition-all active:scale-[0.99] group"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-lg mt-0.5">
                        {QUESTION_CATEGORIES[question.category].emoji}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-stone-800 text-sm leading-relaxed">
                          {question.text}
                        </p>
                      </div>
                      <span className="text-stone-200 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all shrink-0">
                        &rarr;
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
