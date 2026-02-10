// Wisdom Packs - Curated collections of wisdom from various sources

export interface WisdomCard {
  id: string;
  text: string;
  source?: string;
  attribution?: string;
}

export interface WisdomPack {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
  cards: WisdomCard[];
}

export const WISDOM_PACKS: WisdomPack[] = [
  {
    id: 'stoics',
    name: 'Stoic Philosophy',
    emoji: '🏛️',
    description: 'Ancient wisdom for modern life',
    color: '#6366F1',
    cards: [
      { id: 'stoic-1', text: 'The obstacle is the way.', source: 'Marcus Aurelius' },
      { id: 'stoic-2', text: 'We suffer more in imagination than in reality.', source: 'Seneca' },
      { id: 'stoic-3', text: 'It is not things that disturb us, but our judgments about things.', source: 'Epictetus' },
      { id: 'stoic-4', text: 'Waste no more time arguing about what a good man should be. Be one.', source: 'Marcus Aurelius' },
      { id: 'stoic-5', text: 'He who fears death will never do anything worthy of a living man.', source: 'Seneca' },
      { id: 'stoic-6', text: 'No person has the power to have everything they want, but it is in their power not to want what they don\'t have.', source: 'Seneca' },
      { id: 'stoic-7', text: 'You have power over your mind, not outside events. Realize this, and you will find strength.', source: 'Marcus Aurelius' },
      { id: 'stoic-8', text: 'First say to yourself what you would be; then do what you have to do.', source: 'Epictetus' },
      { id: 'stoic-9', text: 'The best revenge is not to be like your enemy.', source: 'Marcus Aurelius' },
      { id: 'stoic-10', text: 'Luck is what happens when preparation meets opportunity.', source: 'Seneca' },
      { id: 'stoic-11', text: 'How long are you going to wait before you demand the best for yourself?', source: 'Epictetus' },
      { id: 'stoic-12', text: 'Very little is needed to make a happy life; it is all within yourself.', source: 'Marcus Aurelius' },
    ]
  },
  {
    id: 'gita',
    name: 'Bhagavad Gita',
    emoji: '🙏',
    description: 'Hindu scripture on duty and devotion',
    color: '#F59E0B',
    cards: [
      { id: 'gita-1', text: 'You have the right to work, but never to the fruit of work.', attribution: 'Chapter 2, Verse 47' },
      { id: 'gita-2', text: 'The soul is neither born, and nor does it die.', attribution: 'Chapter 2, Verse 20' },
      { id: 'gita-3', text: 'Change is the law of the universe. You can be a millionaire or a pauper in an instant.', attribution: 'Chapter 2' },
      { id: 'gita-4', text: 'The mind is restless and difficult to restrain, but it is subdued by practice.', attribution: 'Chapter 6, Verse 35' },
      { id: 'gita-5', text: 'A person can rise through the efforts of their own mind; they can also degrade themselves.', attribution: 'Chapter 6, Verse 5' },
      { id: 'gita-6', text: 'When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.', attribution: 'Chapter 6, Verse 19' },
      { id: 'gita-7', text: 'Set your heart upon your work but never its reward.', attribution: 'Chapter 2' },
      { id: 'gita-8', text: 'There is neither this world, nor the world beyond. Happiness is for the one who doubts not.', attribution: 'Chapter 4' },
      { id: 'gita-9', text: 'Perform your obligatory duty, because action is indeed better than inaction.', attribution: 'Chapter 3, Verse 8' },
      { id: 'gita-10', text: 'Reshape yourself through the power of your will.', attribution: 'Chapter 6' },
    ]
  },
  {
    id: 'tao',
    name: 'Tao Te Ching',
    emoji: '☯️',
    description: 'The way of balance and harmony',
    color: '#10B981',
    cards: [
      { id: 'tao-1', text: 'The journey of a thousand miles begins with a single step.', source: 'Lao Tzu' },
      { id: 'tao-2', text: 'Nature does not hurry, yet everything is accomplished.', source: 'Lao Tzu' },
      { id: 'tao-3', text: 'Knowing others is intelligence; knowing yourself is true wisdom.', source: 'Lao Tzu' },
      { id: 'tao-4', text: 'When I let go of what I am, I become what I might be.', source: 'Lao Tzu' },
      { id: 'tao-5', text: 'Be content with what you have; rejoice in the way things are.', source: 'Lao Tzu' },
      { id: 'tao-6', text: 'The softest things in the world overcome the hardest things.', source: 'Lao Tzu' },
      { id: 'tao-7', text: 'Life is a series of natural and spontaneous changes. Don\'t resist them.', source: 'Lao Tzu' },
      { id: 'tao-8', text: 'Silence is a source of great strength.', source: 'Lao Tzu' },
      { id: 'tao-9', text: 'To lead people, walk behind them.', source: 'Lao Tzu' },
      { id: 'tao-10', text: 'He who knows that enough is enough will always have enough.', source: 'Lao Tzu' },
    ]
  },
  {
    id: 'kids-books',
    name: 'Children\'s Literature',
    emoji: '📚',
    description: 'Wisdom hidden in kids\' stories',
    color: '#EC4899',
    cards: [
      { id: 'kids-1', text: 'Unless someone like you cares a whole awful lot, nothing is going to get better. It\'s not.', source: 'The Lorax, Dr. Seuss' },
      { id: 'kids-2', text: 'You\'re braver than you believe, stronger than you seem, and smarter than you think.', source: 'Winnie the Pooh, A.A. Milne' },
      { id: 'kids-3', text: 'It is only with the heart that one can see rightly; what is essential is invisible to the eye.', source: 'The Little Prince' },
      { id: 'kids-4', text: 'Sometimes the smallest things take up the most room in your heart.', source: 'Winnie the Pooh' },
      { id: 'kids-5', text: 'Why fit in when you were born to stand out?', source: 'Dr. Seuss' },
      { id: 'kids-6', text: 'A person\'s a person, no matter how small.', source: 'Horton Hears a Who, Dr. Seuss' },
      { id: 'kids-7', text: 'You have been my friend. That in itself is a tremendous thing.', source: 'Charlotte\'s Web, E.B. White' },
      { id: 'kids-8', text: 'It does not do to dwell on dreams and forget to live.', source: 'Harry Potter, J.K. Rowling' },
      { id: 'kids-9', text: 'All grown-ups were once children... but only few of them remember it.', source: 'The Little Prince' },
      { id: 'kids-10', text: 'You\'re off to great places! Today is your day! Your mountain is waiting, so get on your way!', source: 'Oh, the Places You\'ll Go!, Dr. Seuss' },
    ]
  },
  {
    id: 'buddha',
    name: 'Buddhist Teachings',
    emoji: '🧘',
    description: 'The path to peace and awakening',
    color: '#8B5CF6',
    cards: [
      { id: 'buddha-1', text: 'Peace comes from within. Do not seek it without.', source: 'Buddha' },
      { id: 'buddha-2', text: 'The mind is everything. What you think you become.', source: 'Buddha' },
      { id: 'buddha-3', text: 'In the end, only three things matter: how much you loved, how gently you lived, and how gracefully you let go.', source: 'Buddha' },
      { id: 'buddha-4', text: 'Every morning we are born again. What we do today is what matters most.', source: 'Buddha' },
      { id: 'buddha-5', text: 'Holding on to anger is like grasping a hot coal with the intent of throwing it at someone else.', source: 'Buddha' },
      { id: 'buddha-6', text: 'There is no path to happiness: happiness is the path.', source: 'Buddha' },
      { id: 'buddha-7', text: 'You yourself must strive. The Buddhas only point the way.', source: 'Buddha' },
      { id: 'buddha-8', text: 'Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.', source: 'Buddha' },
      { id: 'buddha-9', text: 'Thousands of candles can be lighted from a single candle. Happiness never decreases by being shared.', source: 'Buddha' },
      { id: 'buddha-10', text: 'If you light a lamp for somebody, it will also brighten your path.', source: 'Buddha' },
    ]
  },
  {
    id: 'mr-rogers',
    name: 'Mister Rogers',
    emoji: '👟',
    description: 'Lessons from the neighborhood',
    color: '#EF4444',
    cards: [
      { id: 'rogers-1', text: 'You\'ve made this day a special day, by just your being you.', source: 'Fred Rogers' },
      { id: 'rogers-2', text: 'Often when you thought you were at your worst, you were really at your best.', source: 'Fred Rogers' },
      { id: 'rogers-3', text: 'When we can talk about our feelings, they become less overwhelming.', source: 'Fred Rogers' },
      { id: 'rogers-4', text: 'There\'s no person in the whole world like you; and I like you just the way you are.', source: 'Fred Rogers' },
      { id: 'rogers-5', text: 'Love isn\'t a state of perfect caring. It is an active noun like struggle.', source: 'Fred Rogers' },
      { id: 'rogers-6', text: 'The greatest thing we can do is let people know they are loved and capable of loving.', source: 'Fred Rogers' },
      { id: 'rogers-7', text: 'When I was a boy and I would see scary things in the news, my mother would say, look for the helpers.', source: 'Fred Rogers' },
      { id: 'rogers-8', text: 'Listening is where love begins.', source: 'Fred Rogers' },
      { id: 'rogers-9', text: 'You rarely have time for everything you want in this life, so you need to make choices.', source: 'Fred Rogers' },
      { id: 'rogers-10', text: 'The thing I remember best about successful people I\'ve met is their obvious delight in what they\'re doing.', source: 'Fred Rogers' },
    ]
  },
];

// Get a specific pack by ID
export function getPack(id: string): WisdomPack | undefined {
  return WISDOM_PACKS.find(p => p.id === id);
}

// Get all pack metadata (without cards, for listing)
export function getPackList(): Omit<WisdomPack, 'cards'>[] {
  return WISDOM_PACKS.map(({ cards: _cards, ...rest }) => rest);
}
