import { Pillar } from './magnets';

export type AgeTier = 'seedling' | 'explorer' | 'navigator';

export interface FamilyMember {
  id: string;
  name: string;
  avatar: string;
  age: number;
  tier: AgeTier;
  role: 'parent' | 'child';
}

export interface FridgeItem {
  id: string;
  type: 'magnet' | 'note' | 'quote';
  content: string;
  pillar?: Pillar;
  
  // For magnets
  source?: string;
  magnetId?: number;
  
  // For quotes (shit kids say)
  saidBy?: string;
  recordedBy?: string;
  emoji?: '😂' | '🥹' | '🤔' | '💡' | '❤️';
  
  // For notes
  author?: string;
  
  createdAt: Date;
  pinned?: boolean;
}

export interface DailyCheckIn {
  id: string;
  memberId: string;
  date: Date;
  type: 'high-low' | 'news-good' | 'yes';
  high?: string;
  low?: string;
  news?: string;
  good?: string;
  yes?: string;
}
