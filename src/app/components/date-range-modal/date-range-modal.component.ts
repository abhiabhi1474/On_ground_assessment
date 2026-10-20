import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CallCentreService } from '../../services/call-centre.service';

@Component({
  selector: 'app-date-range-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './date-range-modal.component.html',
  styleUrl: './date-range-modal.component.css'
})
export class DateRangeModalComponent {
  public svc = inject(CallCentreService);

  public presets = [
    'Today',
    'Yesterday',
    'This Week',
    'Last 7 Days',
    'This Month',
    'Last 30 Days'
  ];

  public fromDate = '2026-10-13';
  public toDate = '2026-10-19';

  public selectPreset(preset: string): void {
    this.svc.setDateRange(preset);
  }

  public applyCustomRange(): void {
    if (this.fromDate && this.toDate) {
      const fromFormatted = this.fromDate.slice(5).replace('-', '/');
      const toFormatted = this.toDate.slice(5).replace('-', '/');
      this.svc.setDateRange(`${fromFormatted} – ${toFormatted}`);
    } else {
      this.svc.isDateRangeModalOpen.set(false);
    }
  }
}
