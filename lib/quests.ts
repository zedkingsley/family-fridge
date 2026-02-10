// ============================================================
// Family Fridge — Quest Packs
// ============================================================

import { QuestPack } from './types';

export const QUEST_PACKS: QuestPack[] = [
  {
    id: 'weekend-adventures',
    name: 'Weekend Adventures',
    emoji: '🏕️',
    description: 'Get out of the house together',
    color: '#10B981',
    quests: [
      { id: 'wa-1', title: 'Backyard Campout', description: 'Set up a tent in the backyard and sleep under the stars. Tell stories, make shadow puppets with flashlights, and listen to the night sounds.', duration: 'Evening', minAge: 4 },
      { id: 'wa-2', title: 'Sunrise Mission', description: 'Wake up early and watch the sunrise together. Bring hot cocoa and blankets. Talk about what you hope for the day.', duration: '1 hour', minAge: 4 },
      { id: 'wa-3', title: 'Photo Scavenger Hunt', description: 'Create a list of 10 things to find and photograph: something red, something that makes you happy, something older than you, etc.', duration: '2 hours', minAge: 5, materials: ['Phone or camera', 'List of items'] },
      { id: 'wa-4', title: 'New Restaurant Roulette', description: 'Pick a random restaurant you have never tried. Spin a wheel, close your eyes on a map, or ask a stranger for a recommendation.', duration: '2 hours', minAge: 3 },
      { id: 'wa-5', title: 'Letter to Future Selves', description: 'Everyone writes a letter to themselves to open in 5 years. Seal them up and put them somewhere safe. What will you remember about right now?', duration: '1 hour', minAge: 6, materials: ['Paper', 'Envelopes', 'Pens'] },
    ],
  },
  {
    id: 'kindness',
    name: 'Kindness Challenges',
    emoji: '💛',
    description: 'Acts of kindness for others',
    color: '#F59E0B',
    quests: [
      { id: 'kc-1', title: 'Random Acts Day', description: 'Do 3 surprise kind things for strangers today. Buy someone coffee, leave a kind note, hold doors open with a smile.', duration: 'All day', minAge: 4 },
      { id: 'kc-2', title: 'Neighbor Surprise', description: 'Bake cookies, draw a picture, or make something for a neighbor. Deliver it together and say hello.', duration: '2 hours', minAge: 3, materials: ['Baking supplies or art supplies'] },
      { id: 'kc-3', title: 'Thank You Letters', description: 'Everyone writes a thank you letter to someone who has made a difference in their life. A teacher, coach, friend, or relative.', duration: '1 hour', minAge: 6, materials: ['Paper', 'Pens', 'Stamps'] },
      { id: 'kc-4', title: 'Compliment Chain', description: 'Start a chain of compliments. Each family member gives a genuine compliment to the person on their left, then they pass it on.', duration: '30 min', minAge: 3 },
      { id: 'kc-5', title: 'Care Package', description: 'Put together a care package for someone going through a tough time. Include snacks, a book, a note, and something comforting.', duration: '1 hour', minAge: 4, materials: ['Box', 'Comfort items'] },
    ],
  },
  {
    id: 'tech-free',
    name: 'Tech-Free Activities',
    emoji: '📵',
    description: 'No screens required',
    color: '#8B5CF6',
    quests: [
      { id: 'tf-1', title: 'Technology-Free Saturday', description: 'No screens for 24 hours. Board games, outdoor play, cooking, reading, and real conversations only.', duration: 'All day', minAge: 3 },
      { id: 'tf-2', title: 'Fort Building Championship', description: 'Using only blankets, pillows, and furniture, build the most epic fort you can. Then have a picnic inside it.', duration: '2 hours', minAge: 3 },
      { id: 'tf-3', title: 'Story Round Robin', description: 'One person starts a story with one sentence. Go around the circle, each person adding a sentence. Where does it end up?', duration: '30 min', minAge: 4 },
      { id: 'tf-4', title: 'Nature Journal', description: 'Go outside with paper and pencils. Draw what you see. Leaves, bugs, clouds, trees. No phones allowed — just your eyes and hands.', duration: '1 hour', minAge: 4, materials: ['Paper', 'Pencils', 'Colored pencils'] },
      { id: 'tf-5', title: 'Family Talent Show', description: 'Everyone prepares a short act: a song, a joke, a dance, a magic trick, a poem. Perform for each other after dinner.', duration: '2 hours', minAge: 3 },
    ],
  },
  {
    id: 'kitchen',
    name: 'Kitchen Quests',
    emoji: '👨‍🍳',
    description: 'Cooking and baking together',
    color: '#EF4444',
    quests: [
      { id: 'kq-1', title: 'Cook a Cuisine', description: 'Pick a country and cook a meal from there. Research the food, shop for ingredients together, and cook as a team.', duration: '3 hours', minAge: 4 },
      { id: 'kq-2', title: 'Family Recipe Night', description: 'Cook a recipe passed down from a grandparent or family member. Talk about where it came from and why it matters.', duration: '2 hours', minAge: 4 },
      { id: 'kq-3', title: 'Mystery Ingredient Challenge', description: 'Everyone picks one surprise ingredient. Together, figure out how to make something delicious with all of them.', duration: '2 hours', minAge: 5 },
      { id: 'kq-4', title: 'Bake and Give', description: 'Bake extra of something delicious and give it away to friends, neighbors, or a local shelter.', duration: '2 hours', minAge: 3, materials: ['Baking supplies'] },
      { id: 'kq-5', title: 'Pizza From Scratch', description: 'Make pizza dough from scratch. Everyone designs their own personal pizza with whatever toppings they want.', duration: '2 hours', minAge: 3, materials: ['Flour', 'Yeast', 'Toppings'] },
    ],
  },
  {
    id: 'creative',
    name: 'Creative Projects',
    emoji: '🎨',
    description: 'Make something together',
    color: '#EC4899',
    quests: [
      { id: 'cp-1', title: 'Family Art Gallery', description: 'Everyone creates a piece of art on the same theme. Then hang them up and walk through your gallery together, explaining your work.', duration: '2 hours', minAge: 3, materials: ['Art supplies'] },
      { id: 'cp-2', title: 'Time Capsule', description: 'Create a family time capsule. Include photos, drawings, letters, small objects, and predictions about the future. Bury or hide it.', duration: '2 hours', minAge: 4, materials: ['Container', 'Items to include'] },
      { id: 'cp-3', title: 'Family Playlist', description: 'Everyone picks 3 songs that mean something to them. Make a family playlist and listen to it together. Share why each song matters.', duration: '1 hour', minAge: 4 },
      { id: 'cp-4', title: 'Build Something', description: 'Using recycled materials, build something together: a birdhouse, a catapult, a marble run, a robot. The goal is the process, not perfection.', duration: '2 hours', minAge: 4, materials: ['Recycled materials', 'Tape', 'Scissors'] },
      { id: 'cp-5', title: 'Family Movie Night Deluxe', description: 'Pick a movie everyone loves. Make themed snacks, create tickets, decorate the room like a theater. The whole experience matters.', duration: 'Evening', minAge: 3 },
    ],
  },
  {
    id: 'outdoor',
    name: 'Outdoor Challenges',
    emoji: '🌿',
    description: 'Nature and exploration',
    color: '#059669',
    quests: [
      { id: 'oc-1', title: 'Stargazing Night', description: 'Go outside on a clear night and learn 3 new constellations together. Bring blankets, hot drinks, and a star chart.', duration: 'Evening', minAge: 4 },
      { id: 'oc-2', title: 'Neighborhood Explorer', description: 'Walk a route you have never taken in your own neighborhood. Notice things you have never seen before. How many new things can you spot?', duration: '1 hour', minAge: 3 },
      { id: 'oc-3', title: 'Cloud Watching', description: 'Lie on your backs and watch the clouds. What shapes do you see? Take turns telling stories about the clouds.', duration: '30 min', minAge: 3 },
      { id: 'oc-4', title: 'Nature Treasure Hunt', description: 'Make a list of natural treasures to find: a feather, a smooth rock, a Y-shaped stick, something soft, something that makes a sound.', duration: '1 hour', minAge: 4 },
      { id: 'oc-5', title: 'Plant Something', description: 'Plant seeds, a tree, or start a small garden together. Take care of it as a family and watch it grow.', duration: '1 hour', minAge: 3, materials: ['Seeds or plants', 'Soil', 'Pots or garden space'] },
    ],
  },
  {
    id: 'game-night',
    name: 'Family Game Night',
    emoji: '🎲',
    description: 'Games and competitions',
    color: '#6366F1',
    quests: [
      { id: 'gn-1', title: 'Invent a Game', description: 'As a family, invent a brand new board game or card game. Make the pieces, write the rules, and play it.', duration: '2 hours', minAge: 5, materials: ['Paper', 'Markers', 'Dice or cards'] },
      { id: 'gn-2', title: 'Tournament Night', description: 'Pick 3 different games. Play a round-robin tournament. Keep score across all games. Crown the family champion.', duration: 'Evening', minAge: 4 },
      { id: 'gn-3', title: 'Charades Marathon', description: 'Play charades with family-specific categories: family memories, inside jokes, favorite movies, things someone in the family always says.', duration: '1 hour', minAge: 4 },
      { id: 'gn-4', title: 'Puzzle Race', description: 'Split into teams. Each team gets a puzzle. First team to finish wins. Or work on one big puzzle together and time yourselves.', duration: '2 hours', minAge: 4, materials: ['Puzzles'] },
      { id: 'gn-5', title: 'Family Trivia', description: 'Write trivia questions about each family member. How well do you really know each other? Score points for correct answers.', duration: '1 hour', minAge: 5 },
    ],
  },
  {
    id: 'giving-back',
    name: 'Giving Back',
    emoji: '🤲',
    description: 'Service and volunteering',
    color: '#0891B2',
    quests: [
      { id: 'gb-1', title: 'Volunteer Day', description: 'Find a local volunteer opportunity and do it together: food bank, park cleanup, animal shelter, community garden.', duration: 'Half day', minAge: 5 },
      { id: 'gb-2', title: 'Donation Declutter', description: 'Everyone goes through their things and picks items to donate. Take them together to a donation center.', duration: '2 hours', minAge: 4 },
      { id: 'gb-3', title: 'Lemonade for a Cause', description: 'Set up a lemonade stand and donate the proceeds to a cause your family cares about. Let the kids pick the cause.', duration: 'Half day', minAge: 4, materials: ['Lemonade supplies', 'Table', 'Sign'] },
      { id: 'gb-4', title: 'Memory Lane Drive', description: 'Visit places that are meaningful to your family: where you got married, the hospital where kids were born, grandparents house, first home.', duration: 'Half day', minAge: 3 },
    ],
  },
];

export function getQuestPack(id: string): QuestPack | undefined {
  return QUEST_PACKS.find(p => p.id === id);
}

export function getQuestPackList(): Omit<QuestPack, 'quests'>[] {
  return QUEST_PACKS.map(({ quests: _, ...rest }) => rest);
}
