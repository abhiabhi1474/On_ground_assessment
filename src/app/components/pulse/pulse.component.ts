import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CallCentreService } from '../../services/call-centre.service';
import { StaffAgent, KudosItem } from '../../models/app.models';

@Component({
  selector: 'app-pulse',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pulse.component.html',
  styleUrl: './pulse.component.css'
})
export class PulseComponent {
  public svc = inject(CallCentreService);

  public pulseTab: 'channels' | 'kudos' = 'channels';
  public chatInput = '';
  public taskReplyText = '';

  public isGiveKudosOpen = false;
  public newKudosTo = 'Sunita Rao (Manager)';
  public newKudosBadge = '🌟 Top Performer';
  public newKudosPoints = 250;
  public newKudosText = 'Great coaching on the SmartGRID Luxe presentation today!';

  public activeChannel = computed(() => {
    const slug = this.svc.activeChannelSlug();
    return this.svc.pulseChannels().find(c => c.slug === slug);
  });

  public channelMessages = computed(() => {
    const slug = this.svc.activeChannelSlug();
    return this.svc.pulseMessages().filter(m => m.channelId === slug);
  });

  public pendingTask = computed(() => {
    const slug = this.svc.activeChannelSlug();
    return this.svc.needsInputTasks().find(t => t.channelSlug === slug && t.status === 'pending');
  });

  public sendMessage(): void {
    if (!this.chatInput.trim()) return;
    const text = this.chatInput.trim();
    const slug = this.svc.activeChannelSlug();
    this.svc.sendChannelMessage(slug, text);
    this.chatInput = '';

    const isAiChat = slug === 'avanibot' || slug === 'all-staff' || slug.includes('agent') || slug.includes('coach') || slug.includes('nudge');
    if (isAiChat) {
      setTimeout(() => {
        this.generateAiReply(text, slug);
      }, 500);
    }
  }

  public submitCustomTaskReply(): void {
    const task = this.pendingTask();
    if (!task || !this.taskReplyText.trim()) return;
    this.svc.answerNeedsInputTask(task.id, this.taskReplyText.trim());
    this.taskReplyText = '';
  }

  public openAgentChannel(ag: StaffAgent): void {
    this.svc.selectChannel(ag.slug);

    const msgs = this.svc.pulseMessages().filter(m => m.channelId === ag.slug);
    if (msgs.length === 0) {
      this.svc.pulseMessages.update(all => [
        ...all,
        {
          id: 'seed-' + Date.now(),
          channelId: ag.slug,
          senderName: ag.name,
          senderAvatar: ag.icon,
          senderRole: ag.role,
          time: 'Just now',
          text: `Hello Arvind! I am your ${ag.name}. ${ag.description} How can I assist you with your customer calls today?`,
          isSelf: false
        }
      ]);
    }
  }

  public askAvani(topic: string): void {
    this.svc.selectChannel('all-staff');
    let prompt = '';
    let reply = '';

    if (topic === 'daily-brief') {
      prompt = 'AvaniBot, give me the daily briefing for The Sleep Company Koramangala shift today.';
      reply = '📋 Daily Briefing for Koramangala:\n• Focus Product: SmartGRID Luxe King (Target: 8 sales)\n• Hot Leads SLA: 3 inquiries waiting over 20m — prioritize Mukunda D. (₹55k) and Ritu S. (₹32k)\n• Promotion: 12-month Zero-Cost EMI via Bajaj Finserv with 2 complimentary SmartGRID pillows!';
    } else if (topic === 'objections') {
      prompt = 'AvaniBot, what are our top counterpoints when a customer says memory foam is 18k cheaper?';
      reply = '💡 Objection Defense against Cheap Memory Foam:\n1. Heat Retention: Memory foam traps body heat and causes sweating; SmartGRID has 2,500 open air channels keeping you 4° cooler.\n2. Sagging: Polyurethane foam dips within 18 months; our hyper-elastic polymer holds structural integrity for 10 years.\n3. Pressure Relief: SmartGRID adapts dynamically to shoulder/hip pressure while keeping spine aligned.';
    } else if (topic === 'emi-rules') {
      prompt = 'AvaniBot, what are our zero-cost EMI options for SmartGRID mattresses?';
      reply = '💳 0% EMI Terms:\n• 12-month paperless approval through Bajaj Finserv, HDFC, ICICI, and Axis Bank.\n• ₹0 down payment today. For a ₹55,000 Luxe mattress, the monthly installment is just ₹4,583/month!\n• Includes 100-night risk-free in-home trial.';
    }

    this.svc.sendChannelMessage('all-staff', prompt);
    setTimeout(() => {
      this.svc.pulseMessages.update(msgs => [
        ...msgs,
        {
          id: 'avani-' + Date.now(),
          channelId: 'all-staff',
          senderName: 'AvaniBot',
          senderAvatar: '🤖',
          senderRole: 'Omni AI Coach',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: reply,
          isSelf: false
        }
      ]);
    }, 500);
  }

  private generateAiReply(userText: string, slug: string): void {
    const textLower = userText.toLowerCase();
    const matchedAgent = this.svc.staffAgents().find(a => a.slug === slug);
    const agentName = matchedAgent?.name || 'AvaniBot';
    const agentAvatar = matchedAgent?.icon || '🤖';
    const agentRole = matchedAgent?.role || 'Omni AI Coach';

    let reply = `I've noted that! Focus on greeting the customer by name within the first 10 seconds and pitching the 100-night trial.`;
    if (slug.includes('follow-up') || textLower.includes('lead') || textLower.includes('sla')) {
      reply = `Clearing your 2 untouched leads today is worth +0.3 pts of RT Nagar conversion and brings our 48h SLA to 90%!`;
    } else if (slug.includes('emi') || textLower.includes('emi') || textLower.includes('price') || textLower.includes('discount')) {
      reply = `We have approved 12-month zero-cost EMI starting at ₹2,660/month. Pitching EMI moves your manager's attach goal toward 35%!`;
    } else if (slug.includes('coach') || textLower.includes('warranty') || textLower.includes('trial')) {
      reply = `Every SmartGRID mattress includes an unconditional 10-year warranty and a 100-night risk-free trial with doorstep pickup. Mentioning this closes 1 in 3 hesitations.`;
    }

    this.svc.pulseMessages.update(msgs => [
      ...msgs,
      {
        id: 'reply-' + Date.now(),
        channelId: slug,
        senderName: agentName,
        senderAvatar: agentAvatar,
        senderRole: agentRole,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: reply,
        isSelf: false
      }
    ]);
  }

  public saveNewKudos(): void {
    if (!this.newKudosText.trim()) return;
    const newK: KudosItem = {
      id: 'kud-' + Date.now(),
      fromName: this.svc.userProfile().name,
      toName: this.newKudosTo,
      badge: this.newKudosBadge,
      text: this.newKudosText.trim(),
      time: 'Just now',
      points: Number(this.newKudosPoints) || 250
    };
    this.svc.kudosList.update(list => [newK, ...list]);
    this.isGiveKudosOpen = false;
    this.newKudosText = '';
  }
}
