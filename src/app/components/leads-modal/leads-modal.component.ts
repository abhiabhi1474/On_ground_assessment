import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallCentreService } from '../../services/call-centre.service';
import { AudioCallService } from '../../services/audio-call.service';
import { Lead } from '../../models/app.models';

@Component({
  selector: 'app-leads-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leads-modal.component.html',
  styleUrl: './leads-modal.component.css'
})
export class LeadsModalComponent {
  public svc = inject(CallCentreService);
  private audioCall = inject(AudioCallService);

  public isBuyingSignalsOpen = true;

  public currentLead = computed<Lead | undefined>(() => {
    const list = this.svc.leads();
    const idx = this.svc.activeLeadsModalIdx();
    return list[idx];
  });

  public callLeadFromModal(): void {
    const lead = this.currentLead();
    if (!lead) return;
    this.svc.closeLeadsModal();
    this.svc.switchTab('calls');
    this.audioCall.startCall(lead.name, lead.phone, 'ai-roleplay', lead.value);
  }

  public phoneCallDirect(): void {
    const lead = this.currentLead();
    if (!lead) return;
    this.svc.closeLeadsModal();
    this.svc.switchTab('calls');
    this.audioCall.startCall(lead.name, lead.phone, 'human-peer', lead.value);
  }

  public openWhatsApp(): void {
    const lead = this.currentLead();
    if (!lead) return;
    window.alert(`Opened WhatsApp message prompt for ${lead.name} (${lead.phone}) with SmartGRID catalog link.`);
  }
}
