import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallCentreService } from '../../services/call-centre.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  public svc = inject(CallCentreService);
}
