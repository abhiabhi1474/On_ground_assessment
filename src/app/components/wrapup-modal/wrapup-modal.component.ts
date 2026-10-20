import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CallCentreService } from '../../services/call-centre.service';

@Component({
  selector: 'app-wrapup-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wrapup-modal.component.html',
  styleUrl: './wrapup-modal.component.css'
})
export class WrapupModalComponent {
  public svc = inject(CallCentreService);

  public outcomes = [
    'Confirmed Store Visit',
    'Requested Callback Later',
    'Shared 0% EMI Quote',
    'Follow-up on WhatsApp',
    'Price Objection - Competitor',
    'Not Interested / Closed'
  ];

  public selectedOutcome = 'Confirmed Store Visit';
  public wrapupNotes = '';

  public submitWrapup(): void {
    this.svc.saveCallWrapup(this.selectedOutcome, this.wrapupNotes);
    this.wrapupNotes = '';
  }
}
