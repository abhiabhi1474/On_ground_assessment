import { Injectable, signal } from '@angular/core';
import { CallSession, SopCheckItem, TranscriptItem } from '../models/app.models';

export interface DialogueScript {
  customerLine: string;
  expectedAgentSopKey: string;
  suggestedAgentResponses: string[];
  sentiment: 'Positive' | 'Neutral' | 'Hesitant' | 'Objection';
  coachTip: string;
}

const DEFAULT_SOP_ITEMS: SopCheckItem[] = [
  { key: 'greet', label: '1. Greet customer by name & state brand', passed: false, scriptHint: '"Hello [Name], Arvind here from The Sleep Company Koramangala"' },
  { key: 'discover', label: '2. Discover sleep posture & back support pain points', passed: false, scriptHint: 'Inquire about morning stiffness or sleep discomfort' },
  { key: 'tech', label: '3. Pitch patented SmartGRID hyper-elastic polymer', passed: false, scriptHint: 'Explain grid walls buckle under hips/shoulders while supporting spine' },
  { key: 'finance', label: '4. Offer 0% 12-month EMI & 100-night risk-free trial', passed: false, scriptHint: 'Highlight ₹2,699/mo zero-cost financing + free doorstep trial' },
  { key: 'close', label: '5. Book in-store firmness test or close order', passed: false, scriptHint: 'Lock in 6:00 PM appointment or send payment checkout link' }
];

const SCENARIOS: Record<string, DialogueScript[]> = {
  'Mukunda D.': [
    {
      customerLine: 'Hi Arvind. Yes, I saw your SmartGRID mattress online, but honestly ₹55,000 feels quite high compared to regular memory foam.',
      expectedAgentSopKey: 'greet',
      suggestedAgentResponses: [
        'Great to speak with you, Mukunda! I completely understand budget is top of mind. May I share why SmartGRID lasts 3x longer than memory foam?',
        'Hello Mukunda, Arvind from The Sleep Company here! What specific size and firmness are you looking for?'
      ],
      sentiment: 'Hesitant',
      coachTip: 'Use customer name immediately and validate their price concern before explaining hyper-elastic polymer value.'
    },
    {
      customerLine: 'My wife and I wake up with lower back stiffness on our current foam bed. Does your mattress actually provide spinal alignment?',
      expectedAgentSopKey: 'discover',
      suggestedAgentResponses: [
        'That morning stiffness is caused by memory foam sinking over time. SmartGRID has 2,500 smart gel grid walls that dynamically adapt to your spine.',
        'Yes Mukunda! SmartGRID provides orthopaedic support that cradles your hips and shoulders while keeping your lumbar spine strictly straight.'
      ],
      sentiment: 'Neutral',
      coachTip: 'Great transition! Now connect their back pain directly to SmartGRID patented grid technology.'
    },
    {
      customerLine: 'Interesting. But what if we do not like the feel? Is there a trial or warranty?',
      expectedAgentSopKey: 'tech',
      suggestedAgentResponses: [
        'We offer a 100-night risk-free home trial and an ironclad 10-year replacement warranty. If you do not love it, we pick it up 100% free!',
        'You get 100 nights at home to test it! Plus we have a 10-year non-prorated warranty against sagging.'
      ],
      sentiment: 'Positive',
      coachTip: 'Customer is warming up! Reassure them with the 100-night trial and transition to zero-cost EMI.'
    },
    {
      customerLine: 'That gives me peace of mind. What payment schemes do you have?',
      expectedAgentSopKey: 'finance',
      suggestedAgentResponses: [
        'We have 0% interest 12-month EMI through Bajaj Finserv and all major credit cards. That comes out to just ₹4,580 per month!',
        'We offer instant paperless 12-month zero-cost EMI with zero down payment today.'
      ],
      sentiment: 'Positive',
      coachTip: 'Excellent. Close the call by booking him for an in-store firmness test at Koramangala this evening.'
    },
    {
      customerLine: 'Sounds fair. Can I come by the Koramangala store to feel the difference in person before ordering?',
      expectedAgentSopKey: 'close',
      suggestedAgentResponses: [
        'Absolutely Mukunda! I will reserve our VIP experience bed for you at 6:00 PM today at Koramangala. Sending location pin on WhatsApp now!',
        'We would love that Mukunda. I am at the store until 8 PM. Let me book you in for 6 PM today!'
      ],
      sentiment: 'Positive',
      coachTip: 'Perfect! All 5 SOP stages covered. You have secured the store visit!'
    }
  ],
  'Ritu S.': [
    {
      customerLine: 'Hello? I left a callback request because I received a quotation for ₹32,000 on the Luxe mattress, but another brand offered 18k.',
      expectedAgentSopKey: 'greet',
      suggestedAgentResponses: [
        'Hello Ritu, Arvind here from The Sleep Company! Thank you for taking my call. I can explain the big difference between basic foam and patented SmartGRID.',
        'Hi Ritu! Great to connect. Are you comparing against traditional polyurethane foam or coir?'
      ],
      sentiment: 'Objection',
      coachTip: 'Acknowledge the competitor quote warmly and educate on why cheap foam sags within 18 months.'
    },
    {
      customerLine: 'The other one is memory foam. Why is SmartGRID worth the extra price?',
      expectedAgentSopKey: 'discover',
      suggestedAgentResponses: [
        'Memory foam traps body heat and sags where you sleep most. SmartGRID has 2,500 open air ventilation channels and never loses its shape.',
        'SmartGRID is made of food-grade hyper-elastic polymer that does not degrade, keeping you 4 degrees cooler all night.'
      ],
      sentiment: 'Neutral',
      coachTip: 'Highlight the cooling advantage and 10-year durability.'
    },
    {
      customerLine: 'Cooling is actually very important for me because I sleep hot. Does it come with pillows?',
      expectedAgentSopKey: 'tech',
      suggestedAgentResponses: [
        'Yes Ritu! If you confirm today, I can bundle 2 patented SmartGRID cooling pillows worth ₹4,999 complimentary with your order.',
        'I can include our plush SmartGRID cervical support pillows at zero additional cost today.'
      ],
      sentiment: 'Positive',
      coachTip: 'High intent signal! Offer zero-cost EMI to close the value gap.'
    },
    {
      customerLine: 'That is tempting. Can I pay in monthly installments?',
      expectedAgentSopKey: 'finance',
      suggestedAgentResponses: [
        'Yes! With our 12-month zero-cost EMI, it is only ₹2,666 per month with zero interest or processing fee.',
        'We offer instant zero-cost EMI on all cards — just ₹2,666 a month!'
      ],
      sentiment: 'Positive',
      coachTip: 'Move for the close — offer to send the secure payment link or schedule store pickup.'
    },
    {
      customerLine: 'Alright Arvind, send me the WhatsApp link with the pillows bundle and EMI details. I will place the order today.',
      expectedAgentSopKey: 'close',
      suggestedAgentResponses: [
        'Sending the official WhatsApp confirmation and secure link right now, Ritu. Thank you for choosing The Sleep Company!',
        'Done Ritu! Link sent on WhatsApp. I will personally supervise dispatch for tomorrow morning delivery.'
      ],
      sentiment: 'Positive',
      coachTip: 'Deal closed! Log the outcome as Closed Won to credit your monthly incentive.'
    }
  ]
};

@Injectable({
  providedIn: 'root'
})
export class AudioCallService {
  public callSession = signal<CallSession>({
    isActive: false,
    contactName: '',
    phone: '',
    status: 'ended',
    durationSeconds: 0,
    formattedDuration: '00:00',
    mode: 'ai-roleplay',
    isMuted: false,
    isOnHold: false,
    sentiment: 'Neutral',
    sentimentPct: 50,
    liveTranscript: [],
    sopChecklist: DEFAULT_SOP_ITEMS.map(item => ({ ...item })),
    aiCoachingTip: 'Press "Start Call" or select a lead to begin live coached conversation.',
    leadValue: 0
  });

  private audioCtx: AudioContext | null = null;
  private ringOsc1: OscillatorNode | null = null;
  private ringOsc2: OscillatorNode | null = null;
  private ringGain: GainNode | null = null;
  private ringInterval: any = null;
  private timerInterval: any = null;
  private currentTurnIndex = 0;
  private currentScenario: DialogueScript[] = [];

  public analyserNode: AnalyserNode | null = null;

  constructor() {}

  private initAudioContext(): AudioContext {
    if (!this.audioCtx || this.audioCtx.state === 'closed') {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    if (!this.analyserNode && this.audioCtx) {
      this.analyserNode = this.audioCtx.createAnalyser();
      this.analyserNode.fftSize = 64;
    }
    return this.audioCtx;
  }

  public startRingingAudio(): void {
    try {
      const ctx = this.initAudioContext();
      if (!ctx) return;

      const playRingBurst = () => {
        if (!this.callSession().isActive || this.callSession().status !== 'ringing') return;

        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.frequency.setValueAtTime(440, ctx.currentTime);
        osc2.frequency.setValueAtTime(480, ctx.currentTime);
        osc1.type = 'sine';
        osc2.type = 'sine';

        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);

        osc1.connect(gain);
        osc2.connect(gain);
        if (this.analyserNode) {
          gain.connect(this.analyserNode);
          this.analyserNode.connect(ctx.destination);
        } else {
          gain.connect(ctx.destination);
        }

        osc1.start(ctx.currentTime);
        osc2.start(ctx.currentTime);
        osc1.stop(ctx.currentTime + 1.8);
        osc2.stop(ctx.currentTime + 1.8);
      };

      playRingBurst();
      this.ringInterval = setInterval(playRingBurst, 3000);
    } catch (e) {
      console.warn('Web Audio ringing error:', e);
    }
  }

  public stopRingingAudio(): void {
    if (this.ringInterval) {
      clearInterval(this.ringInterval);
      this.ringInterval = null;
    }
  }

  public playDtmfTone(digit: string): void {
    try {
      const ctx = this.initAudioContext();
      if (!ctx) return;

      const dtmfFreqs: Record<string, [number, number]> = {
        '1': [697, 1209], '2': [697, 1336], '3': [697, 1477],
        '4': [770, 1209], '5': [770, 1336], '6': [770, 1477],
        '7': [852, 1209], '8': [852, 1336], '9': [852, 1477],
        '*': [941, 1209], '0': [941, 1336], '#': [941, 1477]
      };

      const freqs = dtmfFreqs[digit] || [770, 1336];
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.frequency.setValueAtTime(freqs[0], ctx.currentTime);
      osc2.frequency.setValueAtTime(freqs[1], ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

      osc1.connect(gain);
      osc2.connect(gain);
      if (this.analyserNode) {
        gain.connect(this.analyserNode);
        this.analyserNode.connect(ctx.destination);
      } else {
        gain.connect(ctx.destination);
      }

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.2);
      osc2.stop(ctx.currentTime + 0.2);
    } catch (e) {
      console.warn('DTMF audio error:', e);
    }
  }

  public playConnectChime(): void {
    try {
      const ctx = this.initAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {}
  }

  public playHangupTone(): void {
    try {
      const ctx = this.initAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(425, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {}
  }

  public speakCustomerVoice(text: string): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.lang.includes('en-IN') || v.name.includes('India')) ||
                             voices.find(v => v.lang.startsWith('en')) || null;
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      window.speechSynthesis.speak(utterance);
    }
  }

  public startCall(contactName: string, phone: string, mode: 'ai-roleplay' | 'human-peer' = 'ai-roleplay', dealValue = 45000): void {
    this.stopCall();

    this.currentTurnIndex = 0;
    this.currentScenario = SCENARIOS[contactName] || SCENARIOS['Mukunda D.'];

    this.callSession.set({
      isActive: true,
      contactName: contactName || 'Mukunda D.',
      phone: phone || '+91 98450 11200',
      status: 'ringing',
      durationSeconds: 0,
      formattedDuration: '00:00',
      mode,
      isMuted: false,
      isOnHold: false,
      sentiment: 'Neutral',
      sentimentPct: 50,
      liveTranscript: [
        {
          speaker: 'coach',
          text: `Call initiated to ${contactName}. Ringing tone active. Preparing live AI coaching...`,
          time: this.getCurrentTimeStr()
        }
      ],
      sopChecklist: DEFAULT_SOP_ITEMS.map(i => ({ ...i, passed: false })),
      aiCoachingTip: `Ringing ${contactName}... Get ready to greet by name and discover their sleep needs.`,
      leadValue: dealValue
    });

    this.startRingingAudio();

    // Answer after 2.5 seconds
    setTimeout(() => {
      if (this.callSession().isActive && this.callSession().status === 'ringing') {
        this.stopRingingAudio();
        this.playConnectChime();
        this.connectCall();
      }
    }, 2500);
  }

  private connectCall(): void {
    this.callSession.update(s => ({
      ...s,
      status: 'connected',
      aiCoachingTip: 'Call connected! Greet the customer warmly by their name.'
    }));

    // Start live duration counter
    this.timerInterval = setInterval(() => {
      this.callSession.update(s => {
        const secs = s.durationSeconds + 1;
        const mins = Math.floor(secs / 60);
        const remSecs = secs % 60;
        const formatted = `${mins.toString().padStart(2, '0')}:${remSecs.toString().padStart(2, '0')}`;
        return {
          ...s,
          durationSeconds: secs,
          formattedDuration: formatted
        };
      });
    }, 1000);

    // First customer turn
    this.triggerNextCustomerTurn();
  }

  public triggerNextCustomerTurn(): void {
    if (this.currentTurnIndex >= this.currentScenario.length) {
      // End of script scenario
      this.callSession.update(s => ({
        ...s,
        aiCoachingTip: 'All customer queries handled! Wrap up the call and log your outcome.'
      }));
      return;
    }

    const script = this.currentScenario[this.currentTurnIndex];

    setTimeout(() => {
      if (!this.callSession().isActive) return;

      this.speakCustomerVoice(script.customerLine);

      const sentimentPctMap = { 'Positive': 85, 'Neutral': 55, 'Hesitant': 40, 'Objection': 20 };

      this.callSession.update(s => ({
        ...s,
        sentiment: script.sentiment,
        sentimentPct: sentimentPctMap[script.sentiment] || 50,
        aiCoachingTip: script.coachTip,
        liveTranscript: [
          ...s.liveTranscript,
          {
            speaker: 'customer',
            text: script.customerLine,
            time: this.getCurrentTimeStr(),
            sentiment: script.sentiment
          }
        ]
      }));
    }, 700);
  }

  /**
   * Agent responds (either by clicking suggestion or typing custom text)
   */
  public submitAgentResponse(responseText: string): void {
    if (!this.callSession().isActive || !responseText.trim()) return;

    const script = this.currentScenario[this.currentTurnIndex];

    // Mark current SOP item passed if expected
    if (script && script.expectedAgentSopKey) {
      this.callSession.update(s => ({
        ...s,
        sopChecklist: s.sopChecklist.map(item =>
          item.key === script.expectedAgentSopKey ? { ...item, passed: true } : item
        )
      }));
    }

    this.callSession.update(s => ({
      ...s,
      liveTranscript: [
        ...s.liveTranscript,
        {
          speaker: 'agent',
          text: responseText,
          time: this.getCurrentTimeStr()
        }
      ]
    }));

    // Advance turn
    this.currentTurnIndex++;
    this.triggerNextCustomerTurn();
  }

  public toggleMute(): void {
    this.callSession.update(s => ({ ...s, isMuted: !s.isMuted }));
  }

  public toggleHold(): void {
    this.callSession.update(s => ({ ...s, isOnHold: !s.isOnHold }));
  }

  public stopCall(): { duration: string; sopScore: number; transcript: TranscriptItem[] } {
    this.stopRingingAudio();
    this.playHangupTone();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    const session = this.callSession();
    const passedCount = session.sopChecklist.filter(i => i.passed).length;
    const sopScore = Math.round((passedCount / session.sopChecklist.length) * 100) || 75;

    this.callSession.update(s => ({
      ...s,
      status: 'ended',
      isActive: false
    }));

    return {
      duration: session.formattedDuration,
      sopScore: Math.max(sopScore, 70),
      transcript: session.liveTranscript
    };
  }

  public getCurrentTurnSuggestedResponses(): string[] {
    if (this.currentTurnIndex < this.currentScenario.length) {
      return this.currentScenario[this.currentTurnIndex].suggestedAgentResponses;
    }
    return [
      'Thank you for your time today! I have sent all details on WhatsApp. Have a great day!',
      'We look forward to welcoming you at our Koramangala store this evening!'
    ];
  }

  private getCurrentTimeStr(): string {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
