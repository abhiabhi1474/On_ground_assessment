import { Injectable, signal } from '@angular/core';
import {
  NavTab, PlanSubTab, Lead, WaitingLead, IncomingCall, RecentCall,
  CalendarEvent, PulseChannel, PulseMessage, NeedsInputTask, StaffAgent, KudosItem
} from '../models/app.models';
import {
  INITIAL_LEADS, WAITING_LEADS, INCOMING_CALLS, RECENT_CALLS,
  CALENDAR_EVENTS, PULSE_CHANNELS, NEEDS_INPUT_TASKS, PULSE_MESSAGES,
  STAFF_AGENTS, KUDOS_LIST
} from '../data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class CallCentreService {

  public currentTab = signal<NavTab>('dash');
  public planSubTab = signal<PlanSubTab>('outgoing');

  public leads = signal<Lead[]>(INITIAL_LEADS);
  public activeLeadsModalIdx = signal<number>(0);
  public isLeadsModalOpen = signal<boolean>(false);

  public waitingLeads = signal<WaitingLead[]>(WAITING_LEADS);
  public incomingCalls = signal<IncomingCall[]>(INCOMING_CALLS);
  public recentCalls = signal<RecentCall[]>(RECENT_CALLS);

  public calendarEvents = signal<CalendarEvent[]>(CALENDAR_EVENTS);
  public selectedCalendarDate = signal<string>('2026-10-19');
  public calendarMonth = signal<string>('October 2026');
  public calendarYear = signal<number>(2026);
  public calendarMonthIdx = signal<number>(9);

  public pulseChannels = signal<PulseChannel[]>(PULSE_CHANNELS);
  public activeChannelSlug = signal<string>('all-staff');
  public pulseMessages = signal<PulseMessage[]>(PULSE_MESSAGES);
  public needsInputTasks = signal<NeedsInputTask[]>(NEEDS_INPUT_TASKS);
  public staffAgents = signal<StaffAgent[]>(STAFF_AGENTS);
  public kudosList = signal<KudosItem[]>(KUDOS_LIST);
  public isPulseChannelView = signal<boolean>(false);

  public isWrapupModalOpen = signal<boolean>(false);
  public wrapupData = signal<{ name: string; duration: string; sopScore: number; phone: string } | null>(null);

  public isReviewModalOpen = signal<boolean>(false);
  public reviewCallData = signal<RecentCall | null>(null);

  public isNotificationPanelOpen = signal<boolean>(false);
  public isUserDropdownOpen = signal<boolean>(false);
  public isScoreDetailOpen = signal<boolean>(false);
  public isRankDetailOpen = signal<boolean>(false);
  public isDateRangeModalOpen = signal<boolean>(false);
  public isIncomingCallAlertOpen = signal<boolean>(false);
  public scoreModalTab = signal<'score' | 'rank' | 'linkedin'>('score');

  public dateFilterLabel = signal<string>('This Week');

  public openScoreModal(tab: 'score' | 'rank' | 'linkedin' = 'score'): void {
    this.scoreModalTab.set(tab);
    this.isScoreDetailOpen.set(true);
  }

  public closeScoreModal(): void {
    this.isScoreDetailOpen.set(false);
  }

  public userProfile = signal({
    name: 'Arvind Rajan',
    role: 'Call Centre Agent',
    store: 'Koramangala · The Sleep Company',
    avatar: '🦸‍♂️',
    initials: 'AR',
    ogScore: 76,
    rank: 3,
    rankCity: 'RT Nagar',
    earningsThisMonth: 5200,
    earningsMax: 6000,
    coachedEarnings: 1700
  });

  constructor() {}

  public switchTab(tab: NavTab): void {
    this.currentTab.set(tab);
    if (tab === 'pulse') {
      this.isPulseChannelView.set(false);
    }
  }

  public switchPlanSubTab(subTab: PlanSubTab): void {
    this.planSubTab.set(subTab);
  }

  public openLeadsModal(idx: number = 0): void {
    this.activeLeadsModalIdx.set(idx);
    this.isLeadsModalOpen.set(true);
  }

  public closeLeadsModal(): void {
    this.isLeadsModalOpen.set(false);
  }

  public nextLead(): void {
    if (this.activeLeadsModalIdx() < this.leads().length - 1) {
      this.activeLeadsModalIdx.update(i => i + 1);
    }
  }

  public prevLead(): void {
    if (this.activeLeadsModalIdx() > 0) {
      this.activeLeadsModalIdx.update(i => i - 1);
    }
  }

  public toggleLeadExpand(leadId: string): void {
    this.leads.update(items =>
      items.map(l => (l.id === leadId ? { ...l, expanded: !l.expanded } : l))
    );
  }

  public selectChannel(slug: string): void {
    this.activeChannelSlug.set(slug);
    this.isPulseChannelView.set(true);

    this.pulseChannels.update(chans =>
      chans.map(c => (c.slug === slug ? { ...c, unreadCount: 0, hasMention: false } : c))
    );
  }

  public closeChannelView(): void {
    this.isPulseChannelView.set(false);
  }

  public sendChannelMessage(channelSlug: string, text: string): void {
    if (!text.trim()) return;
    const newMsg: PulseMessage = {
      id: 'msg-' + Date.now(),
      channelId: channelSlug,
      senderName: this.userProfile().name,
      senderAvatar: this.userProfile().avatar,
      senderRole: this.userProfile().role,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: text.trim(),
      isSelf: true
    };
    this.pulseMessages.update(msgs => [...msgs, newMsg]);
  }

  public answerNeedsInputTask(taskId: string, answer: string): void {
    this.needsInputTasks.update(tasks =>
      tasks.map(t => (t.id === taskId ? { ...t, status: 'completed', answer } : t))
    );

    const task = this.needsInputTasks().find(t => t.id === taskId);
    if (task) {
      this.sendChannelMessage(
        task.channelSlug,
        `✅ Answered "${task.title}": ${answer}`
      );
    }
  }

  public openWrapupModal(name: string, duration: string, sopScore: number, phone: string): void {
    this.wrapupData.set({ name, duration, sopScore, phone });
    this.isWrapupModalOpen.set(true);
  }

  public saveCallWrapup(outcome: string, notes: string): void {
    const data = this.wrapupData();
    if (!data) return;

    const newCall: RecentCall = {
      id: 'rec-' + Date.now(),
      name: data.name,
      phone: data.phone,
      type: 'outgoing',
      duration: data.duration,
      durationSeconds: 180,
      timestamp: 'Just now',
      sopScore: data.sopScore,
      sentiment: data.sopScore >= 85 ? 'positive' : 'neutral',
      summary: `Logged disposition: ${outcome}. Notes: ${notes || 'Customer engaged well with SmartGRID pitch.'}`,
      sopResults: [
        { key: 'greet', label: 'Greeted customer by name', passed: true, scriptHint: 'Polite welcoming opening' },
        { key: 'discover', label: 'Discovered sleep posture', passed: true, scriptHint: 'Pain points discussed' },
        { key: 'tech', label: 'Pitched SmartGRID benefits', passed: data.sopScore >= 80, scriptHint: 'Hyper-elastic polymer explained' },
        { key: 'finance', label: 'Offered EMI & Trial', passed: data.sopScore >= 85, scriptHint: '0% EMI discussed' },
        { key: 'close', label: 'Booked store appointment', passed: data.sopScore >= 90, scriptHint: 'Store visit scheduled' }
      ]
    };

    this.recentCalls.update(calls => [newCall, ...calls]);
    this.isWrapupModalOpen.set(false);
    this.wrapupData.set(null);

    // Update earnings bonus if high score
    if (data.sopScore >= 85) {
      this.userProfile.update(u => ({
        ...u,
        earningsThisMonth: u.earningsThisMonth + 150,
        coachedEarnings: u.coachedEarnings + 150,
        ogScore: Math.min(u.ogScore + 1, 99)
      }));
    }
  }

  public openCallReview(call: RecentCall): void {
    this.reviewCallData.set(call);
    this.isReviewModalOpen.set(true);
  }

  public closeCallReview(): void {
    this.isReviewModalOpen.set(false);
    this.reviewCallData.set(null);
  }

  // Incoming Call Demo Alert
  public triggerIncomingCallSimulation(): void {
    this.isIncomingCallAlertOpen.set(true);
  }

  public simulateIncomingCall(): void {
    this.triggerIncomingCallSimulation();
  }

  public dismissIncomingCall(): void {
    this.isIncomingCallAlertOpen.set(false);
  }

  // Calendar
  public selectDate(dateStr: string): void {
    this.selectedCalendarDate.set(dateStr);
  }

  public addCalendarEvent(event: Omit<CalendarEvent, 'id'>): void {
    const newEv: CalendarEvent = {
      ...event,
      id: 'cal-' + Date.now()
    };
    this.calendarEvents.update(evs => [...evs, newEv]);
  }

  public setDateRange(label: string): void {
    this.dateFilterLabel.set(label);
    this.isDateRangeModalOpen.set(false);
  }
}
