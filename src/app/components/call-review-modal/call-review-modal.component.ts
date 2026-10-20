import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallCentreService } from '../../services/call-centre.service';

@Component({
  selector: 'app-call-review-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './call-review-modal.component.html',
  styleUrl: './call-review-modal.component.css'
})
export class CallReviewModalComponent {
  public svc = inject(CallCentreService);
}
