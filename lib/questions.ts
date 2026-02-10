// ============================================================
// Family Fridge — Dinner Questions Bank
// ============================================================

import { Question, QuestionCategory } from './types';

export const QUESTION_CATEGORIES: Record<QuestionCategory, { emoji: string; label: string }> = {
  fun: { emoji: '🎉', label: 'Fun' },
  gratitude: { emoji: '🙏', label: 'Gratitude' },
  deep: { emoji: '💭', label: 'Deep' },
  learn: { emoji: '📚', label: 'Learning' },
  goals: { emoji: '🎯', label: 'Goals' },
  identity: { emoji: '🪞', label: 'Identity' },
  'would-you-rather': { emoji: '🤔', label: 'Would You Rather' },
};

export const QUESTIONS: Question[] = [
  // Fun (13 questions)
  { id: 'q-1', text: 'What made you laugh today?', category: 'fun', minAge: 3 },
  { id: 'q-2', text: 'If you could have any superpower, what would it be?', category: 'fun', minAge: 3 },
  { id: 'q-3', text: 'If you could be any animal for a day, which would you choose?', category: 'fun', minAge: 4 },
  { id: 'q-4', text: 'What would you do if you were invisible for a day?', category: 'fun', minAge: 5 },
  { id: 'q-5', text: 'If our family had a theme song, what would it be?', category: 'fun', minAge: 4 },
  { id: 'q-6', text: 'What is the silliest thing you can think of?', category: 'fun', minAge: 3 },
  { id: 'q-7', text: 'If you could invent a new holiday, what would it celebrate?', category: 'fun', minAge: 5 },
  { id: 'q-8', text: 'If you could eat only one food for a week, what would it be?', category: 'fun', minAge: 3 },
  { id: 'q-9', text: 'If you could travel anywhere in the world, where would you go?', category: 'fun', minAge: 4 },
  { id: 'q-10', text: 'If you found a magic lamp with one wish, what would you wish for?', category: 'fun', minAge: 4 },
  { id: 'q-11', text: 'What is the weirdest dream you have ever had?', category: 'fun', minAge: 4 },
  { id: 'q-12', text: 'If you could switch places with someone in the family for a day, who would it be?', category: 'fun', minAge: 5 },
  { id: 'q-13', text: 'What is the funniest thing that happened this week?', category: 'fun', minAge: 3 },

  // Gratitude (9 questions)
  { id: 'q-14', text: 'What are you grateful for today?', category: 'gratitude', minAge: 4 },
  { id: 'q-15', text: 'Who made you feel good today?', category: 'gratitude', minAge: 4 },
  { id: 'q-16', text: 'What was the best part of your day?', category: 'gratitude', minAge: 3 },
  { id: 'q-17', text: 'What is something nice someone did for you recently?', category: 'gratitude', minAge: 4 },
  { id: 'q-18', text: 'What is one thing about our family that makes you happy?', category: 'gratitude', minAge: 4 },
  { id: 'q-19', text: 'What is something you have that you are really thankful for?', category: 'gratitude', minAge: 4 },
  { id: 'q-20', text: 'Who is someone outside our family you are grateful for?', category: 'gratitude', minAge: 5 },
  { id: 'q-21', text: 'What is a simple thing that made you smile today?', category: 'gratitude', minAge: 3 },
  { id: 'q-22', text: 'What is something beautiful you noticed today?', category: 'gratitude', minAge: 4 },

  // Deep (8 questions)
  { id: 'q-23', text: 'What was the hardest part of your day?', category: 'deep', minAge: 6 },
  { id: 'q-24', text: "What is something you are worried about?", category: 'deep', minAge: 6 },
  { id: 'q-25', text: 'If you could change one thing about today, what would it be?', category: 'deep', minAge: 7 },
  { id: 'q-26', text: 'What is something that scared you, but you did it anyway?', category: 'deep', minAge: 6 },
  { id: 'q-27', text: 'When do you feel the most brave?', category: 'deep', minAge: 5 },
  { id: 'q-28', text: 'What is something you wish grown-ups understood about kids?', category: 'deep', minAge: 6 },
  { id: 'q-29', text: 'What does it feel like when someone is kind to you?', category: 'deep', minAge: 5 },
  { id: 'q-30', text: 'What is something hard that you are proud you got through?', category: 'deep', minAge: 7 },

  // Learning (7 questions)
  { id: 'q-31', text: "What is something new you learned recently?", category: 'learn', minAge: 5 },
  { id: 'q-32', text: 'What is a mistake you made that taught you something?', category: 'learn', minAge: 6 },
  { id: 'q-33', text: 'What is something you want to learn how to do?', category: 'learn', minAge: 4 },
  { id: 'q-34', text: 'Who taught you something important?', category: 'learn', minAge: 5 },
  { id: 'q-35', text: 'What is the most interesting thing you learned this week?', category: 'learn', minAge: 5 },
  { id: 'q-36', text: 'What is a question you have been thinking about?', category: 'learn', minAge: 6 },
  { id: 'q-37', text: 'If you could learn any skill instantly, what would it be?', category: 'learn', minAge: 5 },

  // Goals (6 questions)
  { id: 'q-38', text: "What is a goal you are working towards?", category: 'goals', minAge: 8 },
  { id: 'q-39', text: 'What do you want to get better at?', category: 'goals', minAge: 6 },
  { id: 'q-40', text: 'What is something you want to accomplish this week?', category: 'goals', minAge: 7 },
  { id: 'q-41', text: 'What does your best day look like?', category: 'goals', minAge: 6 },
  { id: 'q-42', text: 'What kind of person do you want to be when you grow up?', category: 'goals', minAge: 6 },
  { id: 'q-43', text: 'What is one small thing you could do tomorrow to make someone happy?', category: 'goals', minAge: 5 },

  // Identity (7 questions)
  { id: 'q-44', text: 'What makes our family special?', category: 'identity', minAge: 5 },
  { id: 'q-45', text: "What is something you love about yourself?", category: 'identity', minAge: 5 },
  { id: 'q-46', text: 'What is a tradition our family should start?', category: 'identity', minAge: 6 },
  { id: 'q-47', text: 'What is your favorite family memory?', category: 'identity', minAge: 4 },
  { id: 'q-48', text: 'What do you think our family is really good at?', category: 'identity', minAge: 5 },
  { id: 'q-49', text: 'If you could describe our family in one word, what would it be?', category: 'identity', minAge: 6 },
  { id: 'q-50', text: 'What is something about you that most people do not know?', category: 'identity', minAge: 7 },

  // Would You Rather (8 questions)
  { id: 'q-51', text: 'Would you rather fly or be invisible?', category: 'would-you-rather', minAge: 4 },
  { id: 'q-52', text: 'Would you rather live in the future or the past?', category: 'would-you-rather', minAge: 6 },
  { id: 'q-53', text: 'Would you rather be able to talk to animals or speak every language?', category: 'would-you-rather', minAge: 4 },
  { id: 'q-54', text: 'Would you rather have a pet dragon or a pet unicorn?', category: 'would-you-rather', minAge: 3 },
  { id: 'q-55', text: 'Would you rather live on a boat or in a treehouse?', category: 'would-you-rather', minAge: 4 },
  { id: 'q-56', text: 'Would you rather be the funniest or the smartest person in the room?', category: 'would-you-rather', minAge: 6 },
  { id: 'q-57', text: 'Would you rather explore space or the bottom of the ocean?', category: 'would-you-rather', minAge: 5 },
  { id: 'q-58', text: 'Would you rather always have to sing instead of talk, or always have to dance instead of walk?', category: 'would-you-rather', minAge: 4 },
];
