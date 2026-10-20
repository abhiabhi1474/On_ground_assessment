import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallCentreService } from '../../services/call-centre.service';

interface NotificationItem {
  id: string;
  icon: string;
  iconBg: string;
  title: string;
  body: string;
  time: string;
  needsAction: boolean;
  actionLabel?: string;
  target: 'leads' | 'calls' | 'pulse' | 'dash';
  leadIdx?: number;
}

@Component({
  selector: 'app-notifications-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications-modal.component.html',
  styleUrl: './notifications-modal.component.css'
})
export class NotificationsModalComponent {
  public svc = inject(CallCentreService);
  public filter: 'all' | 'action' | 'alert' = 'all';

  public notifications: NotificationItem[] = [
    {
      id: 'n1',
      icon: '🚨',
      iconBg: '#fee2e2',
      title: 'Lead SLA Alert: Ritu S.',
      body: 'Hot lead untouched 24h. Value at stake: ₹32,000.',
      time: '10m ago',
      needsAction: true,
      actionLabel: 'View Lead Card',
      target: 'leads',
      leadIdx: 0
    },
    {
      id: 'n2',
      icon: '📞',
      iconBg: '#fef3c7',
      title: 'Scheduled Callback: Mukunda D.',
      body: 'Customer requested 4:30 PM call regarding 0% EMI terms.',
      time: '35m ago',
      needsAction: true,
      actionLabel: 'Open Planner',
      target: 'calls'
    },
    {
      id: 'n3',
      icon: '🌟',
      iconBg: '#e0e7ff',
      title: 'Kudos Received from Mukunda',
      body: 'Awarded 250 bonus points for 94% CSAT adherence!',
      time: '2h ago',
      needsAction: false,
      actionLabel: 'View Pulse Wall',
      target: 'pulse'
    },
    {
      id: 'n4',
      icon: '📈',
      iconBg: '#dcfce7',
      title: 'Revenue Lift Milestone',
      body: 'Koramangala store reached +2% revenue lift this week.',
      time: 'Today',
      needsAction: false,
      target: 'dash'
    },
    {
      id: 'n5',
      icon: '📊',
      iconBg: '#ffedd5',
      title: 'Weekly Call Quality Summary',
      body: 'Your weekly SOP average is 88%. Grade A performance.',
      time: 'Mon 8:00am',
      needsAction: false,
      target: 'dash'
    }
  ];

  public actionCount(): number {
    return this.notifications.filter(n => n.needsAction).length;
  }

  public alertCount(): number {
    return this.notifications.filter(n => !n.needsAction).length;
  }

  public filteredNotifications(): NotificationItem[] {
    if (this.filter === 'action') {
      return this.notifications.filter(n => n.needsAction);
    }
    if (this.filter === 'alert') {
      return this.notifications.filter(n => !n.needsAction);
    }
    return this.notifications;
  }

  public handleNotifClick(notif: NotificationItem): void {
    this.svc.isNotificationPanelOpen.set(false);
    if (notif.target === 'leads') {
      this.svc.openLeadsModal(notif.leadIdx ?? 0);
    } else if (notif.target === 'calls') {
      this.svc.switchTab('calls');
    } else if (notif.target === 'pulse') {
      this.svc.switchTab('pulse');
    } else {
      this.svc.switchTab('dash');
    }
  }

  public markAllAsRead(): void {
    this.notifications.forEach(n => (n.needsAction = false));
  }
}
