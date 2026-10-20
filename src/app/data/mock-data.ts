import { Lead, WaitingLead, IncomingCall, RecentCall, CalendarEvent, PulseChannel, PulseMessage, NeedsInputTask, StaffAgent, KudosItem } from '../models/app.models';

export const INITIAL_LEADS: Lead[] = [
  {
    "id": "lead-1",
    "name": "Mukunda",
    "phone": "+91 98765 43210",
    "store": "Koramangala · The Sleep Company",
    "stage": "Discovery & Pitch",
    "sla": "24h SLA",
    "value": 45000,
    "icpScore": 92,
    "intentScore": 91,
    "subscores": [
      {
        "label": "Budget Fit",
        "pct": 87,
        "color": "#1d9e75"
      },
      {
        "label": "Need Match",
        "pct": 72,
        "color": "#c8860a"
      },
      {
        "label": "Decision Stage",
        "pct": 60,
        "color": "#7c3aed"
      }
    ],
    "problemBuckets": [
      {
        "cat": "Financing Related",
        "text": "Asked specifically about EMI options on the Ortho GRID — budget is a live concern, not a blocker"
      },
      {
        "cat": "Quotation Demanded",
        "text": "Compared pricing with a competitor before reaching out — price-anchored, expects a competitive number"
      },
      {
        "cat": "Warranty Related",
        "text": "Hasn't raised this yet — worth proactively mentioning the 100-night trial to reduce perceived risk"
      }
    ],
    "journey": [
      {
        "date": "18 May",
        "channel": "Meta Ad",
        "icon": "📢",
        "color": "#1877f2",
        "text": "Clicked our \"0% EMI on Ortho GRID\" retargeting ad — first touch"
      },
      {
        "date": "20 May",
        "channel": "AI Agent",
        "icon": "🤖",
        "color": "#7c3aed",
        "text": "WhatsApp opt-in — shared preferred size"
      },
      {
        "date": "22 May",
        "channel": "Voice AI",
        "icon": "🎙️",
        "color": "#7c3aed",
        "text": "4m 12s qualifying call — asked if pillows come bundled"
      },
      {
        "date": "24 May",
        "channel": "WhatsApp",
        "icon": "💬",
        "color": "#25D366",
        "text": "Asked for a quote with pillows bundled in"
      }
    ],
    "notes": [
      "Asked about EMI on the Ortho GRID — lead with the 12-month zero-interest plan.",
      "Price-sensitive — compared us with a competitor, so mention the 100-night trial to reduce risk.",
      "Prefers evening calls, after 6pm."
    ],
    "objections": [
      "Competitor foam mattress is cheaper",
      "Needs spouse approval before booking"
    ],
    "actions": "open",
    "expanded": true
  },
  {
    "id": "lead-2",
    "name": "Kavitha R.",
    "phone": "+91 97654 32109",
    "store": "Koramangala · The Sleep Company",
    "stage": "Discovery & Pitch",
    "sla": "24h SLA",
    "value": 45000,
    "icpScore": 92,
    "intentScore": 63,
    "subscores": [
      {
        "label": "Budget Fit",
        "pct": 61,
        "color": "#c8860a"
      },
      {
        "label": "Need Match",
        "pct": 42,
        "color": "#e24b4a"
      },
      {
        "label": "Decision Stage",
        "pct": 35,
        "color": "#7c3aed"
      }
    ],
    "problemBuckets": [
      {
        "cat": "Product Related",
        "text": "Uncertain whether SmartGRID Hybrid actually fits her need — Need Match score is low (42%), worth re-confirming fit before pushing further"
      },
      {
        "cat": "In-Store Experience Needed",
        "text": "Hasn't responded to WhatsApp — may prefer to see/feel the product before deciding, worth inviting her back in"
      },
      {
        "cat": "Financing Related",
        "text": "Budget fit is borderline (61%) — a payment plan or bundle discount could tip this"
      }
    ],
    "journey": [
      {
        "date": "12 May",
        "channel": "Google Ad",
        "icon": "🔍",
        "color": "#ea4335",
        "text": "Searched \"cooling gel mattress bangalore\", clicked our top search ad"
      },
      {
        "date": "15 May",
        "channel": "AI Agent",
        "icon": "🤖",
        "color": "#7c3aed",
        "text": "WhatsApp auto-reply engaged — confirmed interest in the cooling gel layer"
      },
      {
        "date": "19 May",
        "channel": "WhatsApp",
        "icon": "💬",
        "color": "#25D366",
        "text": "Asked to hold the price for 2 days, went quiet since"
      }
    ],
    "notes": [
      "SLA already missed — open with an apology for the delay, not a sales pitch.",
      "Low Need Match (42%) — re-confirm the SmartGRID Hybrid is still the right fit before pushing further.",
      "Hasn't responded to the last 2 WhatsApp messages — try a call instead."
    ],
    "objections": [
      "Competitor foam mattress is cheaper",
      "Needs spouse approval before booking"
    ],
    "actions": "open",
    "expanded": false
  },
  {
    "id": "lead-3",
    "name": "Faizan A.",
    "phone": "+91 96543 21098",
    "store": "Koramangala · The Sleep Company",
    "stage": "Discovery & Pitch",
    "sla": "24h SLA",
    "value": 45000,
    "icpScore": 92,
    "intentScore": 85,
    "subscores": [
      {
        "label": "Budget Fit",
        "pct": 82,
        "color": "#1d9e75"
      },
      {
        "label": "Need Match",
        "pct": 78,
        "color": "#1d9e75"
      },
      {
        "label": "Decision Stage",
        "pct": 70,
        "color": "#c8860a"
      }
    ],
    "problemBuckets": [
      {
        "cat": "Financing Related",
        "text": "Explicitly asked for the no-cost EMI plan — ready to commit if financing is confirmed"
      },
      {
        "cat": "Warranty Related",
        "text": "Compared warranty terms with a competitor and preferred ours — reinforce this on the call"
      }
    ],
    "journey": [
      {
        "date": "2 Jun",
        "channel": "Store Visit",
        "icon": "🏬",
        "color": "#0f6e56",
        "text": "Tried the chair in-store, asked detailed questions on massage programs"
      },
      {
        "date": "4 Jun",
        "channel": "Call",
        "icon": "📞",
        "color": "#185fa5",
        "text": "6m 40s call — confirmed budget and asked about EMI"
      }
    ],
    "notes": [
      "Confirmed Monday as the day he'll decide — call back then, don't let this go quiet.",
      "Wants the 6-month no-cost EMI plan — have the paperwork ready.",
      "Already compared with a competitor and preferred our warranty terms."
    ],
    "objections": [
      "Competitor foam mattress is cheaper",
      "Needs spouse approval before booking"
    ],
    "actions": "open",
    "expanded": false
  },
  {
    "id": "lead-4",
    "name": "Ritu S.",
    "phone": "+91 98450 00001",
    "store": "Koramangala · The Sleep Company",
    "stage": "Discovery & Pitch",
    "sla": "24h SLA",
    "value": 45000,
    "icpScore": 92,
    "intentScore": 96,
    "subscores": [
      {
        "label": "Budget Fit",
        "pct": 90,
        "color": "#1d9e75"
      },
      {
        "label": "Need Match",
        "pct": 88,
        "color": "#1d9e75"
      },
      {
        "label": "Decision Stage",
        "pct": 85,
        "color": "#1d9e75"
      }
    ],
    "problemBuckets": [
      {
        "cat": "Quotation Demanded",
        "text": "Asked for delivery timeline immediately — ready to commit once price is confirmed"
      }
    ],
    "journey": [
      {
        "date": "28 May",
        "channel": "Store Visit",
        "icon": "🏬",
        "color": "#0f6e56",
        "text": "Visited RT Nagar store, tried the Smart Luxe in person"
      },
      {
        "date": "30 May",
        "channel": "Missed Call",
        "icon": "📵",
        "color": "#e24b4a",
        "text": "Called back after store visit, missed — needs a callback"
      }
    ],
    "notes": [
      "Asked \"how soon can this be delivered\" — very high buying signal, close fast.",
      "Already visited the RT Nagar store last week.",
      "Has this lead in CRM from a prior visit — high expected value."
    ],
    "objections": [
      "Competitor foam mattress is cheaper",
      "Needs spouse approval before booking"
    ],
    "actions": "open",
    "expanded": false
  },
  {
    "id": "lead-5",
    "name": "Divya P.",
    "phone": "+91 90000 44556",
    "store": "Koramangala · The Sleep Company",
    "stage": "Discovery & Pitch",
    "sla": "24h SLA",
    "value": 45000,
    "icpScore": 92,
    "intentScore": 38,
    "subscores": [
      {
        "label": "Budget Fit",
        "pct": 40,
        "color": "#e24b4a"
      },
      {
        "label": "Need Match",
        "pct": 35,
        "color": "#e24b4a"
      },
      {
        "label": "Decision Stage",
        "pct": 20,
        "color": "#e24b4a"
      }
    ],
    "problemBuckets": [
      {
        "cat": "In-Store Experience Needed",
        "text": "Vague, non-committal answers — may need to see the product before engaging further"
      }
    ],
    "journey": [
      {
        "date": "1 Jun",
        "channel": "Website",
        "icon": "🌐",
        "color": "#8e8e93",
        "text": "Browsed chair category, no form filled"
      }
    ],
    "notes": [
      "Gave one-word replies on the last call — low engagement.",
      "Said she's \"just looking around\" — treat as low priority this week."
    ],
    "objections": [
      "Competitor foam mattress is cheaper",
      "Needs spouse approval before booking"
    ],
    "actions": "open",
    "expanded": false
  }
];

export const WAITING_LEADS: WaitingLead[] = [
  {
    id: 'wait-1',
    name: 'Ritu S.',
    waitTime: '4m waiting',
    value: 32000,
    reason: 'Callback requested · SmartGRID Luxe',
    phone: '+91 98450 78219',
    intent: 96,
    urgency: 'high'
  },
  {
    id: 'wait-2',
    name: 'Priya K.',
    waitTime: '12m waiting',
    value: 48000,
    reason: 'Missed inquiry · Ortho Pro Bundle',
    phone: '+91 98201 44521',
    intent: 89,
    urgency: 'medium'
  },
  {
    id: 'wait-3',
    name: 'Vikram Mehta',
    waitTime: '25m waiting',
    value: 54999,
    reason: 'Store demo follow-up needed',
    phone: '+91 98765 11029',
    intent: 84,
    urgency: 'normal'
  }
];

export const INCOMING_CALLS: IncomingCall[] = [
  {
    id: 'inc-1',
    name: 'Ritu S.',
    phone: '+91 98450 78219',
    intent: 96,
    value: 32000,
    timeAgo: '4m ago',
    reason: 'Missed Call · Quotation request follow-up',
    status: 'missed'
  },
  {
    id: 'inc-2',
    name: 'Anand M.',
    phone: '+91 98112 39012',
    intent: 92,
    value: 55000,
    timeAgo: '28m ago',
    reason: 'Missed Call · SmartGRID Luxe King query',
    status: 'missed'
  },
  {
    id: 'inc-3',
    name: 'Ravindra G.',
    phone: '+91 97410 88921',
    intent: 88,
    value: 42000,
    timeAgo: '1h ago',
    reason: 'Missed Call · Zero-cost EMI options',
    status: 'missed'
  },
  {
    id: 'inc-4',
    name: 'Deepa R.',
    phone: '+91 99001 54321',
    intent: 85,
    value: 68000,
    timeAgo: '2h ago',
    reason: 'Missed Call · Dual recliner bed bundle',
    status: 'missed'
  }
];

export const RECENT_CALLS: RecentCall[] = [
  {
    id: 'rec-1',
    name: 'Mukunda D.',
    phone: '+91 98450 11200',
    type: 'outgoing',
    duration: '4m 32s',
    durationSeconds: 272,
    timestamp: 'Today · 11:45 AM',
    sopScore: 96,
    sentiment: 'positive',
    summary: 'Explained SmartGRID vs memory foam. Customer agreed to visit Koramangala store this evening for mattress firmness test. Shared location pin on WhatsApp.',
    sopResults: [
      { key: 'greet', label: 'Greeted customer by name & stated brand', passed: true, scriptHint: '"Hello Mukunda, Arvind here from The Sleep Company Koramangala"' },
      { key: 'discover', label: 'Discovered sleep posture & back support requirements', passed: true, scriptHint: 'Identified lower back stiffness on waking' },
      { key: 'tech', label: 'Articulated patented SmartGRID hyper-elastic polymer advantage', passed: true, scriptHint: 'Grid walls bend only under pressure points' },
      { key: 'finance', label: 'Offered 0% EMI financing & 100-night trial', passed: true, scriptHint: 'Mentioned 12-month zero-cost EMI' },
      { key: 'close', label: 'Booked store visit / demo appointment', passed: true, scriptHint: 'Confirmed 6:00 PM visit today' }
    ]
  },
  {
    id: 'rec-2',
    name: 'Apoorva N.',
    phone: '+91 97422 66100',
    type: 'incoming',
    duration: '3m 15s',
    durationSeconds: 195,
    timestamp: 'Today · 10:15 AM',
    sopScore: 91,
    sentiment: 'positive',
    summary: 'Customer called inquiring about warranty claims. Explained 10-year replacement warranty without hassle. Sent warranty digital certificate on WhatsApp.',
    sopResults: [
      { key: 'greet', label: 'Greeting by name', passed: true, scriptHint: 'Warm welcoming greeting' },
      { key: 'discover', label: 'Identify customer inquiry', passed: true, scriptHint: 'Sagging policy clarification' },
      { key: 'tech', label: 'Explain durability test standards', passed: true, scriptHint: '100,000 roller strokes test' },
      { key: 'finance', label: 'Offer trial guarantee', passed: false, scriptHint: 'Missed explicit mention of 100-night trial' },
      { key: 'close', label: 'WhatsApp follow-up confirmation', passed: true, scriptHint: 'Sent certificate via official WhatsApp' }
    ]
  },
  {
    id: 'rec-3',
    name: 'Kashish C.',
    phone: '+91 98200 45612',
    type: 'outgoing',
    duration: '2m 45s',
    durationSeconds: 165,
    timestamp: 'Yesterday · 4:50 PM',
    sopScore: 84,
    sentiment: 'neutral',
    summary: 'Follow-up on abandoned cart for Ortho Pro 8 inch. Customer was comparing with Wakefit. Emphasized Japanese patented grid technology.',
    sopResults: [
      { key: 'greet', label: 'Greeted customer', passed: true, scriptHint: 'Identified cart item' },
      { key: 'discover', label: 'Price comparison objection handling', passed: true, scriptHint: 'Foam degrades in 2 years vs SmartGRID durability' },
      { key: 'tech', label: 'SmartGRID cooling channels explained', passed: true, scriptHint: '2500+ air channels keep mattress cool' },
      { key: 'finance', label: 'Special store discount offer', passed: false, scriptHint: 'Did not offer store bundle voucher' },
      { key: 'close', label: 'Schedule follow-up', passed: true, scriptHint: 'Scheduled call back for tomorrow' }
    ]
  },
  {
    id: 'rec-4',
    name: 'Farhan A.',
    phone: '+91 98801 98231',
    type: 'outgoing',
    duration: '5m 10s',
    durationSeconds: 310,
    timestamp: 'Yesterday · 2:30 PM',
    sopScore: 94,
    sentiment: 'positive',
    summary: 'Full pitch on SmartGRID Elev8 Smart Recliner bed. Customer requested video demo link.',
    sopResults: [
      { key: 'greet', label: 'Greeted customer', passed: true, scriptHint: 'Follow up on store visit' },
      { key: 'discover', label: 'Dual zone elevation feature discovery', passed: true, scriptHint: 'Zero gravity mode for snoring reduction' },
      { key: 'tech', label: 'German dual motor mechanism', passed: true, scriptHint: 'Whisper-quiet electric actuators' },
      { key: 'finance', label: 'Custom EMI scheme breakdown', passed: true, scriptHint: '₹4,999/month calculation provided' },
      { key: 'close', label: 'Video link dispatch', passed: true, scriptHint: 'Demo walkthrough video shared' }
    ]
  }
];

export const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'cal-1',
    dateStr: '2026-10-19',
    time: '4:30 PM',
    title: 'Customer Callback · Quotation Follow-up',
    contactName: 'Mukunda D.',
    phone: '+91 98450 11200',
    type: 'callback',
    status: 'pending',
    notes: 'Confirm competitive price match and 12m zero-cost EMI terms.'
  },
  {
    id: 'cal-2',
    dateStr: '2026-10-19',
    time: '6:00 PM',
    title: 'Store Experience Visit · Koramangala',
    contactName: 'Ritu S.',
    phone: '+91 98450 78219',
    type: 'visit',
    status: 'confirmed',
    notes: 'Mattress firmness test for SmartGRID Luxe 10-inch.'
  },
  {
    id: 'cal-3',
    dateStr: '2026-10-20',
    time: '11:00 AM',
    title: 'High-Value Lead Escalation Review',
    contactName: 'Anand M.',
    phone: '+91 98112 39012',
    type: 'followup',
    status: 'pending',
    notes: '₹55,000 value at stake. Lead untouched 24h.'
  },
  {
    id: 'cal-4',
    dateStr: '2026-10-21',
    time: '2:30 PM',
    title: 'Home Demo Appointment',
    contactName: 'Kaavya B.',
    phone: '+91 97410 88921',
    type: 'demo',
    status: 'confirmed',
    notes: 'SmartGRID sample kit and pillow trial at residence.'
  },
  {
    id: 'cal-5',
    dateStr: '2026-10-22',
    time: '5:00 PM',
    title: 'Re-engagement Call · Dormant Lead',
    contactName: 'Deva R.',
    phone: '+91 99001 54321',
    type: 'callback',
    status: 'pending',
    notes: 'Festival festive season preview discount offer.'
  }
];

export const PULSE_CHANNELS: PulseChannel[] = [
  {
    id: 'ch-1',
    slug: 'all-staff',
    name: 'all-staff',
    icon: '#',
    unreadCount: 2,
    hasMention: true,
    description: 'General store announcements & team updates'
  },
  {
    id: 'ch-2',
    slug: 'leads-sla-escalations',
    name: 'leads-sla-escalations',
    icon: '⚡',
    unreadCount: 3,
    hasMention: true,
    description: 'Hot leads touching 24h without call center follow-up'
  },
  {
    id: 'ch-3',
    slug: 'smartgrid-discussions',
    name: 'smartgrid-discussions',
    icon: '#',
    unreadCount: 0,
    hasMention: false,
    description: 'Product objection handling, technical comparisons & tips'
  },
  {
    id: 'ch-4',
    slug: 'coaching-wins',
    name: 'coaching-wins',
    icon: '🏆',
    unreadCount: 1,
    hasMention: false,
    description: 'Celebrating high CSAT calls and closed deals'
  }
];

export const NEEDS_INPUT_TASKS: NeedsInputTask[] = [
  {
    id: 'task-1',
    channelSlug: 'all-staff',
    title: 'Confirm the 4:30pm callback',
    q: 'Mukunda specifically requested a 4:30 PM callback regarding Bajaj Finserv EMI terms. Will you take this call or reassign?',
    time: 'Today · 3:45 PM',
    options: ['Confirm I will take it', 'Reassign to Priya'],
    status: 'pending'
  },
  {
    id: 'task-2',
    channelSlug: 'leads-sla-escalations',
    title: 'Hot lead SLA escalation: Ritu S. untouched 24h',
    q: 'Ritu S. visited Koramangala store yesterday (₹32,000 value). Zero follow-up recorded. Call now or transfer to field ASM?',
    time: 'Today · 2:15 PM',
    options: ['Call Now via Dialer', 'Transfer to ASM Coach'],
    status: 'pending'
  },
  {
    id: 'task-3',
    channelSlug: 'coaching-wins',
    title: 'Log outcome for 11:45 AM coached call',
    q: 'AvaniBot detected you covered all 5 SOP points on Mukunda call. Confirm closure status to credit ₹800 incentive.',
    time: 'Today · 12:00 PM',
    options: ['Confirm & Log Closed Won', 'Schedule 2nd Follow-up'],
    status: 'pending'
  }
];

export const PULSE_MESSAGES: PulseMessage[] = [
  {
    id: 'msg-1',
    channelId: 'all-staff',
    senderName: 'Rashmi Sehgal',
    senderAvatar: '👩‍💼',
    senderRole: 'Founder & CEO',
    time: '10:00 AM',
    text: 'Good morning team! The Sleep Company Koramangala achieved +2% revenue lift this week. 86% of offline sales are usually lost without follow-up — great job staying on your calls today!',
    isSelf: false
  },
  {
    id: 'msg-2',
    channelId: 'all-staff',
    senderName: 'Mukunda Dwarkanath',
    senderAvatar: '👨‍💼',
    senderRole: 'Co-Founder',
    time: '10:45 AM',
    text: 'Remember to name the shopper on every call: data shows a +23.6pp conversion lift when the agent uses the customer name naturally in the first 20 seconds.',
    isSelf: false
  },
  {
    id: 'msg-3',
    channelId: 'all-staff',
    senderName: 'Arvind Rajan',
    senderAvatar: '🦸‍♂️',
    senderRole: 'Call Centre Agent',
    time: '11:50 AM',
    text: 'Just closed a SmartGRID Luxe King inquiry with Mukunda by highlighting zero EMI and booking him for an in-store firmness test today at 6 PM!',
    isSelf: true
  },
  {
    id: 'msg-4',
    channelId: 'leads-sla-escalations',
    senderName: 'AvaniBot',
    senderAvatar: '🤖',
    senderRole: 'AI Store Coach',
    time: '1:10 PM',
    text: '⚠️ SLA Warning: 2 hot leads have been untouched for 24h. Please review your planner outgoing queue immediately to prevent competitor WhatsApp churn.',
    isSelf: false
  },
  {
    id: 'msg-5',
    channelId: 'smartgrid-discussions',
    senderName: 'Priya K.',
    senderAvatar: '👩‍💻',
    senderRole: 'Senior Agent',
    time: '9:30 AM',
    text: 'Pro-tip for objection handling against memory foam: explain that memory foam traps body heat, whereas SmartGRID has 2,500 air channels that keep temperature neutral all night.',
    isSelf: false
  }
];

export const STAFF_AGENTS: StaffAgent[] = [
  {
    id: 'ag-1',
    slug: 'avanibot',
    name: 'AvaniBot',
    role: 'Omni AI Coach',
    icon: '🤖',
    gradient: 'linear-gradient(135deg,#3b1a5a,#6b2fa0)',
    description: 'Real-time pitch coaching, SOP compliance scoring and instant knowledge base queries.',
    active: true
  },
  {
    id: 'ag-2',
    slug: 'walkout-recovery',
    name: 'Walk-out Recovery Agent',
    role: 'Stage 1 Agent',
    icon: '🚶‍♂️',
    gradient: 'linear-gradient(135deg,#0d2e26,#1d9e75)',
    description: 'Automated 15-minute follow-up for customers who left the store without purchasing.',
    active: true
  },
  {
    id: 'ag-3',
    slug: 'pitch-coach',
    name: 'Pitch Coach',
    role: 'Stage 2 Agent',
    icon: '🎯',
    gradient: 'linear-gradient(135deg,#1e3a8a,#3b82f6)',
    description: 'Roleplay practice partner for warranty pitch, objection handling, and pricing pushback.',
    active: true
  },
  {
    id: 'ag-4',
    slug: 'asm-agent',
    name: 'ASM Tele-caller Agent',
    role: 'Stage 3 Agent',
    icon: '👔',
    gradient: 'linear-gradient(135deg,#78350f,#d97706)',
    description: 'Manager coaching assistant monitoring pipeline health and SLA close deadlines.',
    active: true
  },
  {
    id: 'ag-5',
    slug: 'followup-assistant',
    name: 'Follow-up Assistant',
    role: 'Stage 4 Agent',
    icon: '📞',
    gradient: 'linear-gradient(135deg,#4c1d95,#8b5cf6)',
    description: 'Post-visit quotation follow-ups and WhatsApp appointment scheduling.',
    active: true
  }
];

export const KUDOS_LIST: KudosItem[] = [
  {
    id: 'kud-1',
    fromName: 'Mukunda Dwarkanath',
    toName: 'Arvind Rajan',
    badge: '🌟 Top Performer',
    text: 'Awarded 250 points for achieving 94% CSAT and resolving 19 calls before 2 PM today!',
    time: '2h ago',
    points: 250
  },
  {
    id: 'kud-2',
    fromName: 'Rashmi Sehgal',
    toName: 'Call Centre Team',
    badge: '🔥 100% SLA Record',
    text: 'Zero dropped leads between store and field over the weekend. Outstanding consistency.',
    time: '5h ago',
    points: 500
  },
  {
    id: 'kud-3',
    fromName: 'AvaniBot',
    toName: 'Arvind Rajan',
    badge: '🎯 Coached Move Master',
    text: 'Perfect 5-step SOP adherence on the 11:45 AM call with Mukunda! ₹800 incentive unlocked.',
    time: 'Today',
    points: 150
  }
];
