export type NavTab = 'dash' | 'calls' | 'calendar' | 'pulse';
export type PlanSubTab = 'outgoing' | 'incoming' | 'recent';

export interface SubScore {
  label: string;
  pct: number;
  color: string;
}

export interface ProblemBucket {
  cat: string;
  text: string;
}

export interface JourneyEvent {
  date: string;
  channel: string;
  icon: string;
  color: string;
  text: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  store: string;
  avatar?: string;
  stage: string;
  sla: string;
  value: number;
  icpScore: number;
  intentScore: number;
  subscores: SubScore[];
  problemBuckets: ProblemBucket[];
  journey: JourneyEvent[];
  notes: string[];
  objections: string[];
  actions: 'open' | 'closed';
  expanded?: boolean;
}

export interface WaitingLead {
  id: string;
  name: string;
  waitTime: string;
  value: number;
  reason: string;
  phone: string;
  intent: number;
  urgency: 'high' | 'medium' | 'normal';
}

export interface IncomingCall {
  id: string;
  name: string;
  phone: string;
  intent: number;
  value: number;
  timeAgo: string;
  reason: string;
  status: 'missed' | 'called_back' | 'in_progress';
}

export interface SopCheckItem {
  key: string;
  label: string;
  passed: boolean;
  scriptHint: string;
}

export interface RecentCall {
  id: string;
  name: string;
  phone: string;
  type: 'incoming' | 'outgoing';
  duration: string;
  durationSeconds: number;
  timestamp: string;
  sopScore: number;
  sentiment: 'positive' | 'neutral' | 'hesitant';
  summary: string;
  sopResults: SopCheckItem[];
}

export interface CalendarEvent {
  id: string;
  dateStr: string;
  time: string;
  title: string;
  contactName: string;
  phone: string;
  type: 'visit' | 'callback' | 'demo' | 'followup';
  status: 'confirmed' | 'pending' | 'completed';
  notes?: string;
}

export interface PulseChannel {
  id: string;
  slug: string;
  name: string;
  icon: string;
  unreadCount: number;
  hasMention: boolean;
  description: string;
}

export interface PulseMessage {
  id: string;
  channelId: string;
  senderName: string;
  senderAvatar: string;
  senderRole?: string;
  time: string;
  text: string;
  isSelf: boolean;
}

export interface NeedsInputTask {
  id: string;
  channelSlug: string;
  title: string;
  q: string;
  time: string;
  options: string[];
  status: 'pending' | 'completed';
  answer?: string;
}

export interface StaffAgent {
  id: string;
  slug: string;
  name: string;
  role: string;
  icon: string;
  gradient: string;
  description: string;
  active: boolean;
}

export interface KudosItem {
  id: string;
  fromName: string;
  toName: string;
  badge: string;
  text: string;
  time: string;
  points: number;
}

export interface TranscriptItem {
  speaker: 'agent' | 'customer' | 'coach';
  text: string;
  time: string;
  sentiment?: string;
}

export interface CallSession {
  isActive: boolean;
  contactName: string;
  phone: string;
  status: 'dialing' | 'ringing' | 'connected' | 'ended';
  durationSeconds: number;
  formattedDuration: string;
  mode: 'ai-roleplay' | 'human-peer';
  isMuted: boolean;
  isOnHold: boolean;
  sentiment: 'Positive' | 'Neutral' | 'Hesitant' | 'Objection';
  sentimentPct: number;
  liveTranscript: TranscriptItem[];
  sopChecklist: SopCheckItem[];
  aiCoachingTip: string;
  leadValue?: number;
}
