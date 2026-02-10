// ============================================================
// Family Fridge — Type Definitions
// ============================================================

// --- Family ---

export type MemberRole = 'parent' | 'child';

export interface FamilyMember {
  id: string;
  name: string;
  avatar: string;
  color: string;
  birthdate: string; // ISO date string
  role: MemberRole;
}

export interface FamilyValue {
  id: string;
  emoji: string;
  title: string;
  description: string;
  createdAt: string;
}

// --- Fridge ---

export type FridgeStatus = 'personal' | 'rotation' | 'pinned' | 'archived';
export type FridgeItemType = 'quote' | 'wisdom' | 'photo' | 'note';
export type VibeEmoji = '😂' | '🥹' | '🤔' | '💡' | '❤️';

export interface Reaction {
  memberId: string;
  emoji: string;
  reactedAt: string;
}

export interface FridgeItem {
  id: string;
  type: FridgeItemType;
  content: string;
  saidBy?: string;
  source?: string;
  pillar?: string;
  capturedBy: string;
  emoji?: VibeEmoji;
  status: FridgeStatus;
  valueTag?: string; // linked family value id
  reactions: Reaction[];
  createdAt: string;
  updatedAt: string;
}

// --- Rituals (Questions + Spotlight + Turns) ---

export interface Question {
  id: string;
  text: string;
  category: QuestionCategory;
  minAge: number;
}

export type QuestionCategory = 'fun' | 'gratitude' | 'deep' | 'learn' | 'goals' | 'identity' | 'would-you-rather';

export interface TonightsQuestion {
  questionId: string;
  questionText: string;
  category: QuestionCategory;
  pickedBy: string;
  date: string;
  discussed: boolean;
}

export interface SpotlightPass {
  id: string;
  from: string;
  to: string;
  reason: string;
  passedAt: string;
}

export interface SpotlightState {
  currentHolder: string;
  heldSince: string;
  history: SpotlightPass[];
}

export interface TurnState {
  questionPickerOrder: string[];
  questionPickerIndex: number;
  questPickerOrder: string[];
  questPickerIndex: number;
}

// --- Quests ---

export interface Quest {
  id: string;
  title: string;
  description: string;
  duration: string;
  minAge: number;
  materials?: string[];
  tips?: string;
}

export interface QuestPack {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
  quests: Quest[];
}

export interface QuestCompletion {
  id: string;
  completedAt: string;
  note?: string;
}

export interface FamilyQuest {
  id: string;
  questId: string;
  packId: string;
  quest: Quest; // denormalized for easy access
  addedBy: string;
  addedAt: string;
  status: 'available' | 'completed' | 'favorite' | 'archived';
  completions: QuestCompletion[];
}

export interface WeeklyQuest {
  id: string;
  familyQuestId: string;
  pickedBy: string;
  weekStart: string;
  status: 'active' | 'completed' | 'skipped';
  completedAt?: string;
  note?: string;
}

// --- Experiments ---

export type ExperimentStatus = 'active' | 'completed' | 'paused' | 'abandoned';
export type CheckInFrequency = 'daily' | 'weekly' | 'none';
export type CheckInStatus = 'going' | 'struggling' | 'break';

export interface ExperimentCheckIn {
  id: string;
  date: string;
  note?: string;
  status: CheckInStatus;
}

export interface Experiment {
  id: string;
  memberId: string;
  title: string;
  description?: string;
  durationDays: number;
  startDate: string;
  checkInFrequency: CheckInFrequency;
  status: ExperimentStatus;
  checkIns: ExperimentCheckIn[];
  completedAt?: string;
  reflection?: string;
  familyVisible: boolean;
  isFamily: boolean; // shared family experiment
  reactions: Reaction[];
}

// --- Time Capsule ---

export interface TimeCapsule {
  id: string;
  createdBy: string;
  createdAt: string;
  unlockDate: string;
  note: string;
  itemIds: string[];
  isUnlocked: boolean;
}

// --- Badges ---

export interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  requirement: number;
  category: 'quotes' | 'quests' | 'wisdom' | 'spotlight' | 'experiments';
}

export interface EarnedBadge {
  badgeId: string;
  memberId: string;
  earnedAt: string;
}

// --- Onboarding ---

export interface OnboardingState {
  completed: boolean;
  currentStep: number;
  totalSteps: number;
}

// --- Navigation ---

export type Screen =
  | 'home'
  | 'fridge'
  | 'archive'
  | 'discover'
  | 'swipe-pack'
  | 'browse-pack'
  | 'my-board'
  | 'family'
  | 'add-quote'
  | 'pick-question'
  | 'pass-spotlight'
  | 'wisdom-library'
  | 'quest-library'
  | 'weekly-quest'
  | 'experiment'
  | 'family-values'
  | 'family-story'
  | 'onboarding'
  | 'settings';

export interface NavigationState {
  current: Screen;
  previous: Screen;
  direction: 'left' | 'right';
}

// --- App State ---

export interface AppState {
  schemaVersion: number;
  family: FamilyMember[];
  values: FamilyValue[];
  onboarding: OnboardingState;
  fridge: FridgeItem[];
  spotlight: SpotlightState;
  turns: TurnState;
  tonightsQuestion: TonightsQuestion | null;
  questionHistory: string[]; // question ids used
  questLibrary: FamilyQuest[];
  weeklyQuest: WeeklyQuest | null;
  experiments: Experiment[];
  timeCapsules: TimeCapsule[];
  earnedBadges: EarnedBadge[];
}

// --- Pack Types (shared for wisdom + quest swipe) ---

export type PackType = 'wisdom' | 'quest';

export interface SwipePackState {
  packType: PackType;
  packId: string;
  swipedIds: string[];
}
