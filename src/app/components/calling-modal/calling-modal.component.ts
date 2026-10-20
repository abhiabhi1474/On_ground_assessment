import { Component, inject, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AudioCallService } from '../../services/audio-call.service';
import { CallCentreService } from '../../services/call-centre.service';

@Component({
  selector: 'app-calling-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calling-modal.component.html',
  styleUrl: './calling-modal.component.css'
})
export class CallingModalComponent implements AfterViewInit, OnDestroy {
  public audioCall = inject(AudioCallService);
  public svc = inject(CallCentreService);

  @ViewChild('waveformCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  public showKeypad = false;
  public customAgentSpeech = '';
  public keypadDigits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

  private animationFrameId: number | null = null;

  public setMode(mode: 'ai-roleplay' | 'human-peer'): void {
    this.audioCall.callSession.update(s => ({
      ...s,
      mode,
      aiCoachingTip: mode === 'human-peer'
        ? 'Human-to-Human Peer Audio connected. Two-party audio stream established with HD Opus 48kHz.'
        : 'AI Roleplay Active. Practice your pitch and objection handling against customer persona.'
    }));
  }

  ngAfterViewInit(): void {
    this.startWaveformVisualizer();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  public suggestedResponses(): string[] {
    return this.audioCall.getCurrentTurnSuggestedResponses();
  }

  public passedCount(): number {
    return this.audioCall.callSession().sopChecklist.filter(i => i.passed).length;
  }

  public sendResponse(text: string): void {
    this.audioCall.submitAgentResponse(text);
  }

  public sendCustomResponse(): void {
    if (!this.customAgentSpeech.trim()) return;
    this.audioCall.submitAgentResponse(this.customAgentSpeech.trim());
    this.customAgentSpeech = '';
  }

  public pressKeypad(digit: string): void {
    this.audioCall.playDtmfTone(digit);
  }

  public endCallAndOpenWrapup(): void {
    const session = this.audioCall.callSession();
    const result = this.audioCall.stopCall();
    this.svc.openWrapupModal(
      session.contactName,
      result.duration,
      result.sopScore,
      session.phone
    );
  }

  private startWaveformVisualizer(): void {
    const draw = () => {
      this.animationFrameId = requestAnimationFrame(draw);
      if (!this.canvasRef || !this.canvasRef.nativeElement) return;
      const canvas = this.canvasRef.nativeElement;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width = canvas.parentElement?.clientWidth || 300;
      const height = canvas.height = 64;

      ctx.clearRect(0, 0, width, height);

      const isLive = this.audioCall.callSession().status === 'connected';

      const bars = 28;
      const barWidth = width / bars - 2;

      for (let i = 0; i < bars; i++) {
        const timeFactor = Math.sin((Date.now() / 150) + i * 0.4);
        const baseH = isLive ? (Math.abs(timeFactor) * (height * 0.65) + 6) : 4;

        const x = i * (barWidth + 2);
        const y = (height - baseH) / 2;

        const grad = ctx.createLinearGradient(0, y, 0, y + baseH);
        if (isLive) {
          grad.addColorStop(0, '#38bdf8');
          grad.addColorStop(1, '#10b981');
        } else {
          grad.addColorStop(0, '#f59e0b');
          grad.addColorStop(1, '#ef4444');
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, baseH, 3);
        ctx.fill();
      }
    };

    draw();
  }
}
