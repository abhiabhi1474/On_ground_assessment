import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallCentreService } from '../../services/call-centre.service';
import { AudioCallService } from '../../services/audio-call.service';
import { WaitingLead } from '../../models/app.models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public svc = inject(CallCentreService);
  private audioCall = inject(AudioCallService);

  public callsChartData = [
    { day: 'Mon', val: 18, pct: 58 },
    { day: 'Tue', val: 22, pct: 70 },
    { day: 'Wed', val: 15, pct: 48 },
    { day: 'Thu', val: 26, pct: 82 },
    { day: 'Fri', val: 20, pct: 64 },
    { day: 'Sat', val: 12, pct: 38 },
    { day: 'Today', val: 14, pct: 45 }
  ];

  public csatChartData = [
    { day: 'Mon', val: 88, pct: 70 },
    { day: 'Tue', val: 90, pct: 74 },
    { day: 'Wed', val: 85, pct: 64 },
    { day: 'Thu', val: 92, pct: 78 },
    { day: 'Fri', val: 89, pct: 72 },
    { day: 'Sat', val: 91, pct: 76 },
    { day: 'Today', val: 94, pct: 84 }
  ];

  public callLead(lead: WaitingLead): void {
    this.svc.switchTab('calls');
    this.audioCall.startCall(lead.name, lead.phone, 'ai-roleplay', lead.value);
  }

  public onTaskClick(type: string): void {
    if (type === 'callback') {
      this.svc.switchTab('calls');
      this.svc.switchPlanSubTab('incoming');
    } else if (type === 'outcome') {
      this.svc.openWrapupModal('Mukunda D.', '04:32', 96, '+91 98450 11200');
    }
  }
}
