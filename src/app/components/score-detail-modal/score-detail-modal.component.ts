import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallCentreService } from '../../services/call-centre.service';

interface CapabilityDimension {
  label: string;
  pct: number;
}

interface RankWeight {
  key: string;
  label: string;
  weight: number;
  value: number;
  max: number;
  pct: number;
  displayVal: string;
  icon: string;
}

@Component({
  selector: 'app-score-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-detail-modal.component.html',
  styleUrl: './score-detail-modal.component.css'
})
export class ScoreDetailModalComponent {
  public svc = inject(CallCentreService);
  public isPostSuccess = false;

  public get currentView(): 'score' | 'rank' | 'linkedin' {
    return this.svc.scoreModalTab();
  }

  public set currentView(val: 'score' | 'rank' | 'linkedin') {
    this.svc.scoreModalTab.set(val);
  }

  public openLinkedInModal(): void {
    this.currentView = 'linkedin';
  }

  public capabilities: CapabilityDimension[] = [
    { label: 'Follow-up Pace (inside 48h)', pct: 88 },
    { label: 'Greeting & Opening Rapport', pct: 82 },
    { label: 'Product Knowledge (SmartGRID)', pct: 78 },
    { label: 'Warranty & Trial Pitch', pct: 71 },
    { label: 'Objection Handling', pct: 65 },
    { label: 'Closing & Store Demo Booking', pct: 58 }
  ];

  public rankWeights: RankWeight[] = [
    {
      key: 'ogscore',
      label: 'OG Score™',
      weight: 40,
      value: 76,
      max: 100,
      pct: 76,
      displayVal: '76/100',
      icon: '🏆'
    },
    {
      key: 'leadscalled',
      label: 'Leads Called',
      weight: 20,
      value: 2,
      max: 5,
      pct: 40,
      displayVal: '2 / 5',
      icon: '📞'
    },
    {
      key: 'leadscreated',
      label: 'Leads Created',
      weight: 15,
      value: 3,
      max: 5,
      pct: 60,
      displayVal: '3 / 5',
      icon: '🎯'
    },
    {
      key: 'convtime',
      label: 'Conversation Time',
      weight: 15,
      value: 62,
      max: 90,
      pct: 68.8,
      displayVal: '62m',
      icon: '⏱️'
    },
    {
      key: 'delivery',
      label: 'On-time Delivery / CSAT',
      weight: 10,
      value: 94,
      max: 100,
      pct: 94,
      displayVal: '94%',
      icon: '🚚'
    }
  ];

  public goToCoaching(): void {
    this.svc.closeScoreModal();
    this.svc.switchTab('pulse');
    this.svc.selectChannel('all-staff');
    this.svc.sendChannelMessage(
      'all-staff',
      'AvaniBot, I need practice coaching on Closing and Handling Objections to lift my OG Score.'
    );
  }

  public confirmLinkedInPost(): void {
    this.isPostSuccess = true;
    setTimeout(() => {
      this.isPostSuccess = false;
      this.svc.closeScoreModal();
    }, 2200);
  }
}
