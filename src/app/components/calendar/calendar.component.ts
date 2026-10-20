import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CallCentreService } from '../../services/call-centre.service';
import { AudioCallService } from '../../services/audio-call.service';
import { CalendarEvent } from '../../models/app.models';

interface CalendarCell {
  dayNum: number;
  dateStr: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasEvent: boolean;
  eventsCount: number;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  public svc = inject(CallCentreService);
  private audioCall = inject(AudioCallService);

  public weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  public isAddEventOpen = false;
  public newEventName = '';
  public newEventPhone = '';
  public newEventTime = '4:30 PM';
  public newEventType = 'callback';
  public newEventNotes = '';

  public currentMonthLabel = computed(() => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[this.svc.calendarMonthIdx()]} ${this.svc.calendarYear()}`;
  });

  public gridCells = computed(() => {
    const year = this.svc.calendarYear();
    const month = this.svc.calendarMonthIdx(); // 9 for October
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Monday is index 0
    let startDayIdx = (firstDay.getDay() + 6) % 7;
    const daysInMonth = lastDay.getDate();

    const cells: CalendarCell[] = [];

    // Prev month padding
    const prevLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayIdx - 1; i >= 0; i--) {
      const dNum = prevLastDay - i;
      const mStr = month === 0 ? '12' : (month).toString().padStart(2, '0');
      const yStr = month === 0 ? year - 1 : year;
      const dateStr = `${yStr}-${mStr}-${dNum.toString().padStart(2, '0')}`;
      cells.push({
        dayNum: dNum,
        dateStr,
        isCurrentMonth: false,
        isToday: false,
        hasEvent: false,
        eventsCount: 0
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const mStr = (month + 1).toString().padStart(2, '0');
      const dateStr = `${year}-${mStr}-${d.toString().padStart(2, '0')}`;
      const isToday = dateStr === '2026-10-19';
      const evs = this.svc.calendarEvents().filter(e => e.dateStr === dateStr);

      cells.push({
        dayNum: d,
        dateStr,
        isCurrentMonth: true,
        isToday,
        hasEvent: evs.length > 0,
        eventsCount: evs.length
      });
    }

    // Next month padding to fill 35 cells
    const remaining = 35 - cells.length;
    if (remaining > 0) {
      for (let d = 1; d <= remaining; d++) {
        const mStr = (month + 2).toString().padStart(2, '0');
        const dateStr = `${year}-${mStr}-${d.toString().padStart(2, '0')}`;
        cells.push({
          dayNum: d,
          dateStr,
          isCurrentMonth: false,
          isToday: false,
          hasEvent: false,
          eventsCount: 0
        });
      }
    }

    return cells;
  });

  public selectedEvents = computed(() => {
    const sel = this.svc.selectedCalendarDate();
    return this.svc.calendarEvents().filter(e => e.dateStr === sel);
  });

  public selectCell(cell: CalendarCell): void {
    if (cell.isCurrentMonth) {
      this.svc.selectDate(cell.dateStr);
    }
  }

  public isSelected(cell: CalendarCell): boolean {
    return cell.dateStr === this.svc.selectedCalendarDate();
  }

  public jumpToToday(): void {
    this.svc.calendarYear.set(2026);
    this.svc.calendarMonthIdx.set(9);
    this.svc.selectDate('2026-10-19');
  }

  public prevMonth(): void {
    if (this.svc.calendarMonthIdx() === 0) {
      this.svc.calendarMonthIdx.set(11);
      this.svc.calendarYear.update(y => y - 1);
    } else {
      this.svc.calendarMonthIdx.update(m => m - 1);
    }
  }

  public nextMonth(): void {
    if (this.svc.calendarMonthIdx() === 11) {
      this.svc.calendarMonthIdx.set(0);
      this.svc.calendarYear.update(y => y + 1);
    } else {
      this.svc.calendarMonthIdx.update(m => m + 1);
    }
  }

  public formatSelectedDate(): string {
    const str = this.svc.selectedCalendarDate();
    const parts = str.split('-');
    if (parts.length === 3) {
      const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      return d.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    }
    return str;
  }

  public openAddModal(): void {
    this.isAddEventOpen = true;
  }

  public saveNewEvent(): void {
    if (!this.newEventName.trim()) {
      alert('Please enter a contact name');
      return;
    }
    this.svc.addCalendarEvent({
      dateStr: this.svc.selectedCalendarDate(),
      time: this.newEventTime || '4:30 PM',
      title: (this.newEventType === 'visit' ? 'Store Visit · ' : 'Callback · ') + this.newEventName,
      contactName: this.newEventName,
      phone: this.newEventPhone || '+91 98450 11200',
      type: this.newEventType as 'callback' | 'visit',
      status: 'pending',
      notes: this.newEventNotes || 'Scheduled customer callback'
    });
    this.isAddEventOpen = false;
    this.newEventName = '';
    this.newEventPhone = '';
    this.newEventNotes = '';
  }

  public callContact(ev: CalendarEvent): void {
    this.audioCall.startCall(ev.contactName, ev.phone, 'ai-roleplay', 45000);
  }
}
