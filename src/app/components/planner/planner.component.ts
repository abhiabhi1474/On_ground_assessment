import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallCentreService } from '../../services/call-centre.service';
import { AudioCallService } from '../../services/audio-call.service';
import { Lead, IncomingCall } from '../../models/app.models';

@Component({
  selector: 'app-planner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planner.component.html',
  styleUrl: './planner.component.css'
})
export class PlannerComponent {
  public svc = inject(CallCentreService);
  private audioCall = inject(AudioCallService);

  public outgoingPage = signal<number>(0);
  public pageSize = 3;

  public totalPages = computed(() => Math.ceil(this.svc.leads().length / this.pageSize));

  public pagedLeads = computed(() => {
    const start = this.outgoingPage() * this.pageSize;
    return this.svc.leads().slice(start, start + this.pageSize);
  });

  public prevOutgoingPage(): void {
    if (this.outgoingPage() > 0) {
      this.outgoingPage.update(p => p - 1);
    }
  }

  public nextOutgoingPage(): void {
    if (this.outgoingPage() < this.totalPages() - 1) {
      this.outgoingPage.update(p => p + 1);
    }
  }

  public placeCall(name: string, phone: string, value: number): void {
    this.audioCall.startCall(name, phone, 'ai-roleplay', value);
  }

  public callBack(inc: IncomingCall): void {
    this.audioCall.startCall(inc.name, inc.phone, 'ai-roleplay', inc.value);
  }

  public acceptIncomingCall(): void {
    this.svc.dismissIncomingCall();
    this.audioCall.startCall('Ritu S.', '+91 98450 78219', 'ai-roleplay', 32000);
  }

  public openWhatsApp(lead: Lead): void {
    window.alert(`Opened WhatsApp chat for ${lead.name} (${lead.phone}) with SmartGRID brochure & 0% EMI details.`);
  }
}
