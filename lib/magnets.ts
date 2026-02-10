// Magnets from the family philosophy framework
// Tagged to 5 outcomes: Identity, Community, Delight, Effort, Wonder

export type Pillar = 'identity' | 'community' | 'delight' | 'effort' | 'wonder';

export interface Magnet {
  id: number;
  text: string;
  source: string;
  pillar: Pillar;
  tags: string[];
}

export const PILLAR_CONFIG: Record<Pillar, { emoji: string; icon: string; color: string; label: string; name: string }> = {
  identity: { emoji: '🪞', icon: '🪞', color: '#F59E0B', label: 'Identity', name: 'Identity' },
  community: { emoji: '🤝', icon: '🤝', color: '#3B82F6', label: 'Community', name: 'Community' },
  delight: { emoji: '🎈', icon: '🎈', color: '#EF4444', label: 'Delight', name: 'Delight' },
  effort: { emoji: '💪', icon: '💪', color: '#10B981', label: 'Effort', name: 'Effort' },
  wonder: { emoji: '✨', icon: '✨', color: '#8B5CF6', label: 'Wonder', name: 'Wonder' },
};

export const MAGNETS: Magnet[] = [
  { id: 1, text: "Know yourself, love yourself, be true to yourself.", source: "Grandmother", pillar: "identity", tags: ["self-knowledge", "authenticity"] },
  { id: 2, text: "Be sensitive to the needs of others.", source: "Grandmother", pillar: "community", tags: ["empathy", "kindness"] },
  { id: 3, text: "Be honest. Show integrity in your dealings with others.", source: "Grandfather", pillar: "community", tags: ["integrity", "honesty"] },
  { id: 4, text: "Enjoy the little things that come by. If you wait for the big happiness before being happy, you will always be sad.", source: "Grandfather", pillar: "delight", tags: ["joy", "presence", "gratitude"] },
  { id: 5, text: "Think for yourself.", source: "Great-grandfather", pillar: "identity", tags: ["independence", "critical-thinking"] },
  { id: 6, text: "Keep fighting. Never quit.", source: "Great-grandfather", pillar: "effort", tags: ["perseverance", "resilience"] },
  { id: 7, text: "Laughing makes things easier. Don't take it all too seriously.", source: "Great-grandmother", pillar: "delight", tags: ["humor", "lightness"] },
  { id: 8, text: "I am equal to, but no better than, everybody.", source: "A stranger on a plane", pillar: "community", tags: ["humility", "equality"] },
  { id: 9, text: "They are all just as afraid as you are.", source: "Grandfather", pillar: "community", tags: ["empathy", "courage"] },
  { id: 10, text: "Start on time, end on time, and keep things moving.", source: "A teacher", pillar: "effort", tags: ["discipline", "respect"] },
  { id: 11, text: "Life is not fair.", source: "Grandparents", pillar: "effort", tags: ["acceptance", "reality"] },
  { id: 12, text: "Respect your elders. It was hard to survive that long, and that is worth your respect.", source: "Grandparents", pillar: "community", tags: ["respect", "elders"] },
  { id: 13, text: "Live every minute, intensely. Pay attention to small things in life, for that is mostly what there is.", source: "Grandmother", pillar: "delight", tags: ["presence", "attention"] },
  { id: 14, text: "Decide what you believe about god, and let that in to everything you do.", source: "Father", pillar: "wonder", tags: ["spirituality", "faith"] },
  { id: 15, text: "Sing. Listen to the wind. Both soothe your soul.", source: "Father", pillar: "wonder", tags: ["soul", "music", "nature"] },
  { id: 16, text: "Protect yourself. You are your own best friend.", source: "Father", pillar: "identity", tags: ["self-protection", "boundaries"] },
  { id: 17, text: "Notice what makes you light up, and do more of that.", source: "Wife", pillar: "identity", tags: ["passion", "joy"] },
  { id: 18, text: "Learn how to fill your own cup. Then, let it overflow to others.", source: "Self", pillar: "identity", tags: ["self-care", "generosity"] },
  { id: 19, text: "You are loved unconditionally, with a love that has been nurtured over many generations.", source: "Family lineage", pillar: "wonder", tags: ["love", "family"] },
  { id: 20, text: "Don't be afraid to be bored. Let your mind wander.", source: "Grandmother", pillar: "delight", tags: ["boredom", "possibility"] },
  { id: 21, text: "Create a definition of success and work towards it.", source: "Brother", pillar: "effort", tags: ["success", "purpose"] },
  { id: 22, text: "Do the best you can with what you have. And have fun with it!", source: "Father", pillar: "effort", tags: ["constraints", "creativity"] },
  { id: 23, text: "You only get one body. Treat it with respect.", source: "Father", pillar: "identity", tags: ["body", "health"] },
  { id: 24, text: "Try to notice more. Practice this frequently.", source: "Improv teacher", pillar: "delight", tags: ["attention", "practice"] },
  { id: 25, text: "Always keep an open mind. There's your version, their version, and the truth.", source: "A friend", pillar: "community", tags: ["open-mindedness", "truth"] },
  { id: 26, text: "Develop a relationship with your guardian angels.", source: "Wife", pillar: "wonder", tags: ["spirituality", "unseen"] },
  { id: 27, text: "Mistakes are gifts. They reveal a truth about the world to you.", source: "Self", pillar: "effort", tags: ["mistakes", "learning"] },
  { id: 28, text: "What if you already had everything you need to succeed?", source: "Improv teacher", pillar: "delight", tags: ["sufficiency", "contentment"] },
  { id: 30, text: "It takes courage to grow up and become who you really are.", source: "Fridge magnet", pillar: "identity", tags: ["courage", "growth"] },
  { id: 31, text: "Do not panic. Do something to help yourself.", source: "Great-grandfather", pillar: "identity", tags: ["self-reliance", "calm"] },
  { id: 32, text: "Positive thought leads to positive action. What we think, we become.", source: "Buddha", pillar: "effort", tags: ["mindset", "positivity"] },
  { id: 33, text: "The beginning of wisdom is silence. The second stage is listening.", source: "Fridge magnet", pillar: "community", tags: ["wisdom", "listening"] },
  { id: 34, text: "The most beautiful thing we can experience is the mysterious.", source: "Albert Einstein", pillar: "wonder", tags: ["mystery", "beauty"] },
  { id: 35, text: "Always the beautiful answer, who asks a more beautiful question.", source: "Fridge magnet", pillar: "wonder", tags: ["questions", "curiosity"] },
  { id: 36, text: "Avoid the temptation of certainty.", source: "Fridge magnet", pillar: "effort", tags: ["certainty", "humility"] },
  { id: 37, text: "If you obey all the rules, you miss all the fun.", source: "Fridge magnet", pillar: "delight", tags: ["rules", "fun", "play"] },
  { id: 38, text: "A wise person does not grieve for the things they don't have, but rejoices for those they do.", source: "Epictetus", pillar: "delight", tags: ["gratitude", "contentment"] },
  { id: 39, text: "Those who say yes are rewarded by adventures. Those who say no are rewarded by safety.", source: "Fridge magnet", pillar: "delight", tags: ["yes", "adventure"] },
  { id: 40, text: "When is the best time to do things? Now. Who is the most important one? The one you are with.", source: "Tolstoy", pillar: "community", tags: ["presence", "now"] },
  { id: 42, text: "It is not the strongest that survive, but the ones most responsive to change.", source: "Darwin", pillar: "effort", tags: ["adaptation", "change"] },
  { id: 43, text: "Hope is the certainty that something makes sense, regardless of how it turns out.", source: "Vaclav Havel", pillar: "wonder", tags: ["hope", "meaning"] },
  { id: 44, text: "Accept Emptiness. Embrace Mystery. Maintain Innocent Delight.", source: "Fridge magnet", pillar: "wonder", tags: ["mystery", "delight"] },
  { id: 45, text: "The job of the artist is always to deepen the mystery.", source: "Francis Bacon", pillar: "wonder", tags: ["art", "mystery"] },
  { id: 46, text: "The snow doesn't give a soft white damn whom it touches.", source: "Fridge magnet", pillar: "wonder", tags: ["nature", "beauty"] },
  { id: 47, text: "To know someone with whom you feel understanding — that can make of this earth a garden.", source: "Goethe", pillar: "community", tags: ["connection", "friendship"] },
  { id: 48, text: "Breathing in I calm my body. Breathing out I smile.", source: "Thich Nhat Hanh", pillar: "identity", tags: ["breathing", "calm"] },
  { id: 49, text: "The family is the nucleus of civilization.", source: "Fridge magnet", pillar: "community", tags: ["family", "foundation"] },
  { id: 50, text: "Love and be loved.", source: "Father-in-law", pillar: "community", tags: ["love", "reciprocity"] },
  { id: 51, text: "Always do the right thing.", source: "Father-in-law", pillar: "community", tags: ["ethics", "integrity"] },
  { id: 52, text: "Power of positive thinking.", source: "Father-in-law", pillar: "effort", tags: ["positivity", "mindset"] },
  { id: 54, text: "Never give up, never surrender.", source: "Father-in-law", pillar: "effort", tags: ["perseverance", "resilience"] },
  { id: 55, text: "So this is the world. I am not in it. It is beautiful.", source: "Mary Oliver", pillar: "wonder", tags: ["beauty", "transcendence"] },
  { id: 56, text: "I only want to live in reality. It is why I have to spend so much time forgiving myself.", source: "Fridge magnet", pillar: "identity", tags: ["reality", "forgiveness"] },
  { id: 57, text: "Respond to the strongest plausible interpretation of what someone says.", source: "Y Combinator", pillar: "community", tags: ["charity", "communication"] },
  { id: 58, text: "Appreciate the magic of the ordinary day.", source: "Sister", pillar: "delight", tags: ["ordinary", "magic"] },
  { id: 59, text: "Don't be afraid to be a fool. Cynicism masquerades as wisdom, but cynics don't learn anything.", source: "Fridge magnet", pillar: "delight", tags: ["foolishness", "openness"] },
  { id: 60, text: "There is only one time that is important — Now! It is the only time when we have any power.", source: "Tolstoy", pillar: "delight", tags: ["now", "presence", "power"] },
];

// Starter magnets - the most accessible, kid-friendly ones
export const STARTER_MAGNET_IDS = [1, 7, 9, 17, 27, 33, 37, 39, 50, 58];

export function getStarterMagnets(): Magnet[] {
  return MAGNETS.filter(m => STARTER_MAGNET_IDS.includes(m.id));
}

export function getMagnetsByPillar(pillar: Pillar): Magnet[] {
  return MAGNETS.filter(m => m.pillar === pillar);
}
