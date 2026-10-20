import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallCentreService } from '../../services/call-centre.service';
import { AudioCallService } from '../../services/audio-call.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  public svc = inject(CallCentreService);
  private audioCall = inject(AudioCallService);

  public triggerDemoCall(): void {
    this.svc.switchTab('calls');
    this.svc.switchPlanSubTab('outgoing');
    this.audioCall.startCall('Mukunda D.', '+91 98450 11200', 'ai-roleplay', 55000);
  }

  public openScoreOrRank(tab: 'score' | 'rank'): void {
    this.svc.openScoreModal(tab);
  }
}
