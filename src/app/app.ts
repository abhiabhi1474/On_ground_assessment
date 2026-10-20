import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallCentreService } from './services/call-centre.service';
import { AudioCallService } from './services/audio-call.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PlannerComponent } from './components/planner/planner.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { PulseComponent } from './components/pulse/pulse.component';
import { LeadsModalComponent } from './components/leads-modal/leads-modal.component';
import { CallingModalComponent } from './components/calling-modal/calling-modal.component';
import { WrapupModalComponent } from './components/wrapup-modal/wrapup-modal.component';
import { CallReviewModalComponent } from './components/call-review-modal/call-review-modal.component';
import { NotificationsModalComponent } from './components/notifications-modal/notifications-modal.component';
import { ScoreDetailModalComponent } from './components/score-detail-modal/score-detail-modal.component';
import { DateRangeModalComponent } from './components/date-range-modal/date-range-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    TopbarComponent,
    DashboardComponent,
    PlannerComponent,
    CalendarComponent,
    PulseComponent,
    LeadsModalComponent,
    CallingModalComponent,
    WrapupModalComponent,
    CallReviewModalComponent,
    NotificationsModalComponent,
    ScoreDetailModalComponent,
    DateRangeModalComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  public svc = inject(CallCentreService);
  public audioCall = inject(AudioCallService);
}
