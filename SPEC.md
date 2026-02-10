# Family Fridge — Complete Specification

**Version:** 1.0  
**Date:** February 10, 2026  
**Status:** Ready for Implementation

---

## Table of Contents

1. [Vision](#vision)
2. [Philosophy](#philosophy)
3. [Core Concepts](#core-concepts)
4. [The Three Pillars](#the-three-pillars)
5. [The Turns System](#the-turns-system)
6. [Feature Specifications](#feature-specifications)
7. [Data Models](#data-models)
8. [Screens & Flows](#screens--flows)
9. [Design Principles](#design-principles)
10. [Technical Architecture](#technical-architecture)

---

## Vision

**Family Fridge** is a family identity and ritual app that helps families:
- Capture and preserve family wisdom, quotes, and moments
- Discover wisdom from the world's great traditions
- Build intentional family practices and experiments
- Pass the torch of values across generations

### The Core Insight

The app is NOT where the magic happens. **The app facilitates magic that happens in real life.** It's the conductor, not the orchestra.

Family Fridge is a digital version of the physical fridge door — covered with magnets, photos, kids' art, and wisdom that matters to your family. It's curated, limited, and meaningful.

### Target Users

- Families with children ages 5-14
- Parents who want to be intentional about family culture
- Families who value conversation over content consumption
- Works for: nuclear families, blended families, shared custody, multi-generational

---

## Philosophy

### 1. Facilitate IRL, Don't Replace It

The app prompts real conversations, not digital ones. When it asks "Tonight's Question," the family talks at dinner — the app doesn't record or transcribe. When the Spotlight passes, it happens with a physical hug, not a notification.

### 2. Constraints Create Value

The fridge has limited space. You can't pin everything. This forces curation, which creates meaning. Infinite scroll is the enemy. Intentional limits are the friend.

### 3. Anti-Guilt Design

No streaks. No "you missed 5 days!" No shame. If life gets busy, the app waits patiently. Family comes first, app serves family.

### 4. Everyone Contributes

Kids aren't just consumers of parent-generated content. They capture quotes, pick questions, hold the spotlight, and curate their own section of the fridge. Agency builds ownership.

### 5. Discovery is Play

Browsing wisdom and quests should feel like play, not homework. The Tinder-style swipe UI makes discovery feel light and fun. Pass or keep, no pressure.

---

## Core Concepts

### The Fridge

The central metaphor. A digital family fridge door where meaningful things live:
- **Pinned Items** (3 per person) — permanent, most important
- **Rotation Items** (5 per person) — rotate through visibility
- **Archive** — everything captured, searchable, never deleted

### Wisdom

Things the family believes and values:
- Family quotes ("shit kids say")
- Inherited wisdom from grandparents
- Philosophy from world traditions
- Notes and reflections

### Quests

Things the family does together:
- Challenges and activities
- Weekend adventures
- Traditions and rituals
- Collected from Quest Packs or created custom

### Experiments

Personal growth challenges individuals take on:
- Time-bound self-improvement
- "I'm trying X for 30 days"
- Tracked progress, optional check-ins
- Celebration on completion

### Turns

Role-based participation that rotates through family members:
- Question Picker (daily)
- Spotlight Holder (self-paced)
- Quest Picker (weekly)
- Ensures everyone participates, distributes emotional labor

---

## The Three Pillars

Family Fridge is built on three interconnected pillars:

### 🧠 Wisdom — What You Believe

**Purpose:** Capture, discover, and curate the ideas that guide your family.

**Sources:**
- Family quotes (things kids/adults say)
- Inherited wisdom (grandparents, ancestors)
- Wisdom Packs (curated collections from world traditions)
- Personal notes and reflections

**Flow:**
1. **Capture** — Quick quote capture (< 10 seconds)
2. **Discover** — Browse Wisdom Packs, swipe to collect
3. **Curate** — Promote from backlog → rotation → pinned
4. **Display** — Fridge shows curated wisdom

### 🎯 Quests — What You Do Together

**Purpose:** Intentional family activities that build connection and memories.

**Sources:**
- Quest Packs (curated activity collections)
- Custom family quests
- Traditions and rituals

**Flow:**
1. **Discover** — Browse Quest Packs, swipe to add to Family Quest Library
2. **Pick** — Weekly Quest Picker chooses from library
3. **Do** — Family does the quest IRL
4. **Complete** — Mark done, optional photo/note
5. **History** — Track what you've done together

### 🧪 Experiments — What You're Becoming

**Purpose:** Personal growth through intentional self-challenges.

**Characteristics:**
- Individual, not family (though family can cheer you on)
- Time-bound (7 days, 30 days, etc.)
- Self-defined (you create your own)
- Progress-tracked (Day 7 of 30)
- Optional check-ins

**Flow:**
1. **Define** — "I'm trying to [X] for [duration]"
2. **Track** — Daily/weekly progress
3. **Check-in** — Optional reflection prompts
4. **Complete** — Celebrate or reflect on learnings
5. **History** — Your experiment journal

---

## The Turns System

Turns distribute participation and responsibility across family members.

### Question Picker (Daily)
- **Frequency:** Rotates daily
- **Action:** Pick tonight's dinner question from curated options
- **Categories:** Fun, Gratitude, Deep, Goals, Identity
- **After dinner:** Optional "We talked about it ✓" confirmation

### Spotlight Holder (Self-Paced)
- **Frequency:** Pass when ready (typical: 5-7 days)
- **Action:** Hold the family spotlight, then pass with a reason
- **Physical:** Can be paired with a physical object (star, token)
- **History:** Track all passes with reasons ("For helping Eleanor this week")

### Quest Picker (Weekly)
- **Frequency:** Rotates weekly
- **Action:** Pick this week's family quest from the Quest Library
- **Requirement:** Quest Library must have quests (collected from packs)
- **Optional:** Can skip a week, no guilt

### Turn Order
- Configurable per family
- Can skip members (e.g., 3-year-old can't pick questions)
- System suggests next person, manual override allowed

---

## Feature Specifications

### F1: Quick Quote Capture

**Purpose:** Capture something someone said before you forget it.

**Requirements:**
- Total flow < 10 seconds
- Tap FAB → Pick who → Type quote → Pick vibe → Done
- Vibes: 😂 Funny | 🥹 Sweet | 🤔 Deep | 💡 Smart | ❤️ Love
- Goes to personal backlog by default
- Optional: add directly to rotation/pinned

**Edge Cases:**
- Quote from non-family member → "Someone else" option with name field
- Very long quote → Auto-truncate with "..." or allow expansion

### F2: The Fridge

**Purpose:** Curated display of family wisdom and moments.

**Structure:**
- **Pinned Section** — 3 items per person, always visible
- **Rotation Section** — 5 items per person, cycles through
- **Color-coded** by family member

**Item Types:**
- Quotes (someone said something)
- Wisdom (inherited or discovered)
- Photos (coming later)
- Notes (reflections, thoughts)

**Actions:**
- Tap item → Expand view
- Long press → Move to archive, change status
- Promote: Personal → Rotation → Pinned
- Demote: Pinned → Rotation → Archive

### F3: Archive

**Purpose:** Searchable repository of everything captured.

**Features:**
- All items, sorted by date (newest first)
- Filter by: Type (quote/wisdom/photo/note)
- Filter by: Person (who said it / who captured it)
- Filter by: Status (pinned/rotation/personal/archived)
- Search by text content
- Promote items directly from archive

**Principle:** Nothing is ever deleted. Archive is forever.

### F4: Wisdom Packs

**Purpose:** Discover wisdom from world traditions.

**Packs (Initial Set):**
| Pack | Description | Cards |
|------|-------------|-------|
| Family Wisdom | Your family's philosophy magnets | 60 |
| Stoic Philosophy | Marcus Aurelius, Seneca, Epictetus | 12 |
| Bhagavad Gita | Hindu scripture on duty and devotion | 10 |
| Tao Te Ching | The way of balance and harmony | 10 |
| Children's Literature | Wisdom hidden in kids' stories | 10 |
| Buddhist Teachings | The path to peace and awakening | 10 |
| Mister Rogers | Lessons from the neighborhood | 10 |

**UI: Tinder-Style Swipe**
- Card shows: emoji, quote text, source/attribution
- Swipe left → Pass (don't add)
- Swipe right → Add to personal backlog
- Long press / ⋯ → Action sheet: Pin directly, Add to rotation
- Progress bar shows cards reviewed
- "Pack Complete" celebration at end

**Card Anatomy:**
```
┌─────────────────────────┐
│         🏛️              │
│                         │
│  "The obstacle is       │
│   the way."             │
│                         │
│  — Marcus Aurelius      │
│                         │
│  Swipe or tap below     │
└─────────────────────────┘
    [✕]   [⋯]   [♥]
```

### F5: Quest Packs

**Purpose:** Discover family activities and challenges.

**Packs (Initial Set):**
| Pack | Description | Quests |
|------|-------------|--------|
| Weekend Adventures | Get out of the house together | 12 |
| Kindness Challenges | Acts of kindness for others | 10 |
| Tech-Free Activities | No screens required | 10 |
| Kitchen Quests | Cooking and baking together | 10 |
| Creative Projects | Make something together | 10 |
| Outdoor Challenges | Nature and exploration | 10 |
| Family Game Night | Games and competitions | 10 |
| Giving Back | Service and volunteering | 8 |

**UI:** Same Tinder-style swipe as Wisdom Packs

**Quest Card Anatomy:**
```
┌─────────────────────────┐
│         🏕️              │
│                         │
│  "Backyard Campout"     │
│                         │
│  Set up a tent in the   │
│  backyard and sleep     │
│  under the stars.       │
│                         │
│  Duration: Evening      │
│  Ages: 4+               │
└─────────────────────────┘
    [✕]   [⋯]   [♥]
```

**Flow:**
1. Browse Quest Packs
2. Swipe to add quests to Family Quest Library
3. Quest Picker chooses from library each week
4. Family does quest, marks complete

### F6: Family Quest Library

**Purpose:** Your family's collected quests to choose from.

**Features:**
- All quests you've swiped right on
- Organized by category/pack
- Filter: Not done yet / Done before / Favorites
- Quest Picker picks from here
- Can add custom quests

**Quest States:**
- Available (never done)
- Completed (done at least once, with date)
- Favorite (starred for repeat)
- Archived (hidden but not deleted)

### F7: Weekly Quest

**Purpose:** This week's family activity.

**Flow:**
1. Quest Picker's turn notification (or see on home screen)
2. Open Quest Library
3. Pick a quest (or skip this week)
4. Quest shows on home screen for the week
5. Family does it IRL
6. Mark complete (optional photo/note)

**Home Screen Display:**
```
┌─────────────────────────────────┐
│ 🎯 This Week's Quest            │
│ ─────────────────────────       │
│ "Backyard Campout"              │
│ Picked by: 👦 Wyatt             │
│                                 │
│ [We did it!]                    │
└─────────────────────────────────┘
```

### F8: Personal Experiments

**Purpose:** Individual growth through self-challenges.

**Creating an Experiment:**
- Name: "No phone after 8pm"
- Duration: 7 days / 14 days / 30 days / Custom
- Start: Today / Tomorrow / Pick date
- Check-in frequency: Daily / Weekly / None
- Notes: Optional context

**Tracking:**
- Progress indicator: "Day 12 of 30"
- Visual progress bar
- Check-in prompts (if enabled)
- Streak counter (optional, anti-guilt design)

**States:**
- Active (in progress)
- Completed (finished successfully)
- Paused (taking a break)
- Abandoned (stopped early, with reflection)

**Check-in Flow:**
```
┌─────────────────────────────────┐
│ 🧪 Experiment Check-in          │
│ ─────────────────────────       │
│ "No phone after 8pm"            │
│ Day 12 of 30                    │
│                                 │
│ How's it going?                 │
│ ┌─────────────────────────────┐ │
│ │ Quick reflection...         │ │
│ └─────────────────────────────┘ │
│                                 │
│ [Still going!] [Need a break]   │
└─────────────────────────────────┘
```

**Experiment History:**
- All experiments with outcomes
- Learnings captured
- "I learned that I actually sleep better without screens"

### F9: Tonight's Question

**Purpose:** Prompt meaningful dinner conversation.

**Question Categories:**
| Category | Emoji | Description | Min Age |
|----------|-------|-------------|---------|
| Fun | 🎉 | Silly, imaginative | 3+ |
| Gratitude | 🙏 | Thankfulness | 4+ |
| Deep | 💭 | Feelings, challenges | 6+ |
| Learning | 📚 | What you learned | 5+ |
| Goals | 🎯 | Aspirations | 8+ |
| Identity | 🪞 | Family, self | 5+ |
| Would You Rather | 🤔 | Fun choices | 4+ |

**Question Bank:** 50+ questions across categories

**Flow:**
1. Question Picker sees "Your turn!" on home
2. Browse questions by category or random
3. Pick one → Shows on everyone's home screen
4. Discuss at dinner (IRL!)
5. Optional: "We talked about it ✓"

### F10: The Spotlight

**Purpose:** Family recognition and appreciation.

**Physical Pairing:**
- Can be paired with a physical object (gold star, special token)
- App tracks, physical object is passed IRL

**Tracking:**
- Who has it currently
- How many days they've held it
- Full history of passes with reasons

**Passing Flow:**
1. Current holder decides to pass
2. Select recipient (family member)
3. Write reason ("For being brave at the dentist")
4. Confirm → Spotlight transfers
5. Optional: Notification to recipient

**History Display:**
```
⭐ Spotlight History

👩 → 👦 Wyatt
"For being such a great helper with Eleanor"
Feb 6, 2026

👨 → 👩 Mom  
"For making everyone laugh at dinner"
Feb 1, 2026
```

### F11: Family Profiles

**Purpose:** Each member's highlight reel and contributions.

**Profile Contents:**
- Avatar and name
- Their quotes (things they said)
- Their captures (things they added)
- Their pinned items
- Spotlight history (times received)
- Experiment history (if applicable)

### F12: Family Settings

**Configuration:**
- Family members (add/edit/remove)
- Turn order configuration
- Notification preferences
- Question age filtering
- Theme/appearance

---

## Data Models

### Family
```typescript
interface Family {
  id: string;
  name: string;
  members: FamilyMember[];
  createdAt: Date;
}
```

### FamilyMember
```typescript
interface FamilyMember {
  id: string;
  name: string;
  avatar: string; // emoji
  color: string; // hex
  age: number;
  role: 'parent' | 'child';
  canPickQuestions: boolean;
  canPickQuests: boolean;
}
```

### FridgeItem
```typescript
interface FridgeItem {
  id: string;
  type: 'quote' | 'wisdom' | 'photo' | 'note';
  content: string;
  saidBy?: string; // member id (for quotes)
  source?: string; // attribution (for wisdom)
  capturedBy: string; // member id
  emoji?: string; // vibe emoji
  pillar?: string; // philosophy pillar
  packId?: string; // source pack if from swipe
  status: 'personal' | 'rotation' | 'pinned' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}
```

### WisdomPack
```typescript
interface WisdomPack {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
  cards: WisdomCard[];
}

interface WisdomCard {
  id: string;
  text: string;
  source?: string;
  attribution?: string;
}
```

### QuestPack
```typescript
interface QuestPack {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
  quests: Quest[];
}

interface Quest {
  id: string;
  title: string;
  description: string;
  duration: string; // "1 hour", "Evening", "Weekend"
  minAge: number;
  materials?: string[];
  tips?: string;
}
```

### FamilyQuest (in library)
```typescript
interface FamilyQuest {
  id: string;
  questId: string; // reference to Quest
  packId: string;
  addedBy: string; // member id
  addedAt: Date;
  status: 'available' | 'completed' | 'favorite' | 'archived';
  completions: QuestCompletion[];
}

interface QuestCompletion {
  id: string;
  completedAt: Date;
  note?: string;
  photoUrl?: string;
}
```

### WeeklyQuest
```typescript
interface WeeklyQuest {
  id: string;
  familyQuestId: string;
  pickedBy: string; // member id
  weekStart: Date;
  status: 'active' | 'completed' | 'skipped';
  completedAt?: Date;
  note?: string;
}
```

### Experiment
```typescript
interface Experiment {
  id: string;
  memberId: string;
  title: string;
  description?: string;
  durationDays: number;
  startDate: Date;
  checkInFrequency: 'daily' | 'weekly' | 'none';
  status: 'active' | 'completed' | 'paused' | 'abandoned';
  checkIns: ExperimentCheckIn[];
  completedAt?: Date;
  reflection?: string;
}

interface ExperimentCheckIn {
  id: string;
  date: Date;
  note?: string;
  status: 'going' | 'struggling' | 'break';
}
```

### TonightsQuestion
```typescript
interface TonightsQuestion {
  id: string;
  questionId: string;
  questionText: string;
  category: string;
  pickedBy: string; // member id
  date: Date;
  discussed: boolean;
}
```

### Spotlight
```typescript
interface SpotlightState {
  currentHolder: string; // member id
  heldSince: Date;
  history: SpotlightPass[];
}

interface SpotlightPass {
  id: string;
  from: string; // member id
  to: string; // member id
  reason: string;
  passedAt: Date;
}
```

---

## Screens & Flows

### Navigation Structure

```
├── Home (default)
├── Fridge
│   └── Archive
├── Discover
│   ├── Wisdom Packs
│   │   └── Swipe Pack
│   └── Quest Packs
│       └── Swipe Pack
├── My Board
│   └── My Experiments
└── Family
    └── Member Profile
```

### Bottom Navigation
| Icon | Label | Screen |
|------|-------|--------|
| 🏠 | Home | Home screen |
| 🧲 | Fridge | Fridge view |
| 🃏 | Discover | Packs browser |
| 📋 | My Board | Personal items |
| 👨‍👩‍👧‍👦 | Family | Family members |

### Screen: Home

**Contents:**
1. Tonight's Question (or "Pick a question" CTA)
2. This Week's Quest (if active)
3. Spotlight status
4. My Experiments (if any active)
5. Fridge preview (pinned items)
6. Quick actions

**FAB:** Quick quote capture (💬)

### Screen: Fridge

**Contents:**
1. Pinned section (grid)
2. Rotation section (list)
3. Archive link

**Actions:**
- Tap item → Expand
- Long press → Context menu
- Archive button → Full archive

### Screen: Discover

**Contents:**
1. Wisdom Packs section
   - Family Wisdom (special, highlighted)
   - Other packs (grid)
2. Quest Packs section
   - Quest packs (grid)

### Screen: Swipe Pack (Wisdom or Quest)

**Contents:**
1. Header (back, pack name, progress)
2. Card stack (current + peek at next)
3. Swipe indicators (PASS / ADD)
4. Action buttons (✕ ⋯ ♥)

**Gestures:**
- Swipe left → Pass
- Swipe right → Add
- Long press card → Action sheet
- Tap ⋯ → Action sheet

### Screen: My Board

**Contents:**
1. My captures (quotes I've saved)
2. My experiments
3. Items I can promote

### Screen: Family

**Contents:**
1. Family member avatars with counts
2. Selected member's highlight reel
3. Spotlight history

---

## Design Principles

### Visual Language

**Color Palette:**
- Background: Warm cream (#FEF7ED)
- Primary: Amber/Orange gradient
- Accent: Purple (discovery), Green (success), Red (pass)
- Member colors: Assigned unique colors

**Typography:**
- Headings: Bold, warm
- Body: Clean, readable
- Quotes: Italic, larger

**Cards:**
- Rounded corners (xl: 16px)
- Subtle shadows
- Color-coded left borders by member

### Micro-interactions

- Swipe cards animate off-screen
- Progress bars animate smoothly
- Buttons scale on press (active:scale-95)
- Success states show briefly then transition

### Accessibility

- Minimum tap targets: 44x44px
- Color not sole indicator (use icons too)
- Support for system font size
- VoiceOver/TalkBack labels

---

## Technical Architecture

### Recommended Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React state (useState) for prototype
- Consider: Zustand for complex state

**Backend (Future):**
- Supabase (auth + database + storage)
- Row-level security for family data
- Real-time sync for family members

**Mobile (Future):**
- Capacitor wrapper for iOS/Android
- Push notifications
- Home screen widget (iOS 17+)

### Data Persistence

**Phase 1: Prototype**
- localStorage (current)
- No auth, single device

**Phase 2: Cloud**
- Supabase Postgres
- Auth with magic link or social
- Real-time sync across family devices
- Photo storage in Supabase Storage

### File Structure

```
app/
├── app/
│   ├── page.tsx          # Main app
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── lib/
│   ├── types.ts          # TypeScript interfaces
│   ├── magnets.ts        # Family wisdom data
│   ├── packs.ts          # Wisdom packs data
│   ├── quests.ts         # Quest packs data
│   ├── questions.ts      # Question bank
│   └── storage.ts        # Persistence layer
├── components/
│   ├── screens/          # Full screens
│   ├── cards/            # Card components
│   ├── ui/               # Reusable UI
│   └── providers/        # Context providers
└── public/
    └── ...               # Static assets
```

---

## Implementation Phases

### Phase 1: Core (Current)
- [x] Tonight's Question
- [x] Spotlight
- [x] Fridge (pinned/rotation)
- [x] Archive
- [x] Quick quote capture
- [x] Wisdom Packs (swipe UI)
- [x] Family Wisdom library
- [ ] Quest Packs (swipe UI)
- [ ] Family Quest Library
- [ ] Weekly Quest

### Phase 2: Experiments
- [ ] Create experiment
- [ ] Track progress
- [ ] Check-ins
- [ ] Experiment history
- [ ] Completion celebration

### Phase 3: Polish
- [ ] Animations and transitions
- [ ] Photo capture and display
- [ ] Custom quest creation
- [ ] Notification system
- [ ] Onboarding flow

### Phase 4: Cloud
- [ ] Supabase integration
- [ ] Auth flow
- [ ] Multi-device sync
- [ ] Family invites

### Phase 5: Mobile
- [ ] Capacitor build
- [ ] App Store submission
- [ ] Push notifications
- [ ] Widgets

---

## Appendix: Sample Content

### Sample Questions (excerpt)

**Fun:**
- What made you laugh today?
- If you could have any superpower, what would it be?
- Would you rather fly or be invisible?

**Gratitude:**
- What are you grateful for today?
- Who made you feel good today?
- What was the best part of your day?

**Deep:**
- What was the hardest part of your day?
- What's something you're worried about?
- If you could change one thing about today, what would it be?

### Sample Quest Pack: Weekend Adventures

1. **Backyard Campout** — Set up a tent and sleep under the stars
2. **Sunrise Mission** — Wake up early and watch the sunrise together
3. **Photo Scavenger Hunt** — Find and photograph 10 items from a list
4. **New Restaurant Roulette** — Pick a random restaurant you've never tried
5. **Letter to Future Selves** — Write letters to open in 5 years
6. **Technology-Free Saturday** — No screens for 24 hours
7. **Random Acts Day** — Do 3 surprise kind things for strangers
8. **Cook a Cuisine** — Pick a country and cook a meal from there
9. **Memory Lane Drive** — Visit places that are meaningful to your family
10. **Stargazing Night** — Learn 3 new constellations together

---

## Summary

Family Fridge is built on the belief that families thrive when they're intentional about their culture. It provides tools for:

1. **Capturing** — Quick, frictionless preservation of moments
2. **Discovering** — Playful exploration of wisdom and activities
3. **Doing** — Turn-based participation in family rituals
4. **Growing** — Personal experiments and reflection

The app is the facilitator, not the destination. The real magic happens when families talk, laugh, struggle, and grow together — offline, in real life, around the dinner table and under the stars.

---

*Built with love for families who want to be intentional about who they're becoming together.*
