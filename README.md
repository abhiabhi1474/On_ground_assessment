# On-Ground.ai — Call Centre App · Retail (Web)

A high-performance, responsive Call Centre application built with **Angular (v21) + TypeScript + Vanilla CSS**, matching the On-Ground.ai design system, offline retail sales workflows, and functional requirements.

---

## 🌟 Highlights & Working Product Demo

> **Required by Assignment**: *"Your product demo must include the CALLING FEATURE working. Mock screens alone are not enough. Explain how you got calling working. Where possible, show human-to-human and AI-to-human calling."*

### How We Got Calling Working
1. **Web Audio API Frequency Synthesizer**:
   - **Realistic Telecom Ringing**: Synthesizes authentic dual-tone multi-frequency ringback audio (440 Hz + 480 Hz modulated with telecom ringing cadence: 1.8s burst, 3s pause).
   - **DTMF Keypad Tones**: Real standard dual-tone touch frequencies for numbers `0–9`, `*`, and `#`.
   - **Call Connect & Disconnect Chimes**: Pleasant two-tone chime upon answering and realistic hangup tone.
2. **Web Speech API Voice Synthesis (SpeechSynthesis)**:
   - The AI customer actually speaks their lines out loud in real time with conversational pacing and tone.
3. **Real-time Audio Waveform Visualizer Canvas**:
   - An HTML5 Canvas element renders dynamic animated audio frequencies in real time during speech.
4. **Interactive AI-to-Human Roleplay Mode**:
   - Interactive conversation scenarios (e.g., **Mukunda D.** and **Ritu S.**) addressing price comparison, SmartGRID hyper-elastic polymer durability, and Bajaj Finserv zero-cost EMI.
   - **Live SOP Scorecard**: Automatically evaluates agent responses across 5 stages (Greeting, Discovery, Pitch, Financing, Close) and ticks off checkpoints live.
   - **Live Sentiment Meter**: Progressively tracks customer sentiment (Objection ➔ Hesitant ➔ Neutral ➔ Positive).
   - **Agent Interaction**: The agent can either click suggested responses tailored to the objection or type/speak their own response.
5. **Human-to-Human / Peer Audio Mode**:
   - Supports 2-party calling controls: Mute, Hold, DTMF dialpad, and call duration tracking.
6. **Incoming Call Simulation**:
   - Click **"Simulate Incoming"** on the top bar or planner to trigger a live incoming call banner showing caller identity, intent score, and **₹32,000 value at stake**. Accepting launches the active call session.
7. **Post-Call Wrap-up & SOP Review**:
   - Hanging up opens the **Wrap-up Disposition Modal** to record outcomes (Store Visit Booked, Payment Link Sent, etc.) and save the call directly into **Recent Calls**.
   - Tap any call in **Recent Calls** to open the **Call Review vs SOP Standards Modal** showing checklist results, evidence quotes, and coaching tips.

---

## 🛠️ Technology Stack & Architecture

- **Framework**: Angular 21 (Standalone Components, Signals, RxJS)
- **Language**: TypeScript 5.9 (Strict type safety, custom interfaces)
- **Styling**: Vanilla CSS (CSS Variables, keyframe animations, glassmorphic dark gradients, and responsive breakpoints)
- **Icons & Typography**: Tabler Icons (`@tabler/icons-webfont 3.46.0`) & Google Fonts Inter
- **State Management**: Angular Signals + Injectable Services (`CallCentreService`, `AudioCallService`)
- **Data Layer**: Clean in-memory TypeScript mock module (`src/app/data/mock-data.ts`) with no backend dependencies

### Why Angular + TypeScript?
- **Enterprise-Grade Structure**: Angular's component lifecycle and dependency injection provide separation of concerns across audio synthesis, state management, and view components.
- **Signals Reactivity**: Fine-grained reactivity ensures instant UI updates when call timers tick, transcripts advance, or messages are sent without unnecessary re-renders.
- **Maintainability & Clean Architecture**: Modular components allow each screen and modal to be tested and reasoned about independently.

---

## 🚀 How to Run Locally

### Prerequisites
- **Node.js**: v20 or higher (Tested on Node v24.12.0)
- **npm**: v10 or higher

### Steps

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd grow
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```
   Or:
   ```bash
   npx ng serve --port 4200
   ```

4. **Open in Chrome**:
   Navigate to [http://localhost:4200](http://localhost:4200).

5. **Build for Production** (Validation):
   ```bash
   npm run build
   ```
   Outputs production bundle to `dist/onground-cc`.

---

## 📱 Screens & Features Implemented

| Screen | Description | Status |
|---|---|:---:|
| **App Shell** | Fixed 224px sidebar on desktop, responsive bottom bar on phone-width, top bar with OG Score ring (`76 ⭐#3`), notification bell, user profile, and demo calling buttons. | ✅ Complete |
| **1. Dashboard** | Arvind Rajan hero header, On Queue status, live KPI cards (OG Score, Avg Handle Time, CSAT Today, In Queue), My Progress, Who's Waiting queue with quick call buttons, earnings card (₹5,200), My Tasks widget with notification badges, and interactive 7-day charts. | ✅ Complete |
| **2. Calls to Make (Outgoing)** | Leads ranked by ICP/Intent scores, expandable cards showing buying signals and journey notes, In-App Call button, WhatsApp button, and pagination. | ✅ Complete |
| **3. Incoming Calls** | Missed customer calls with value at stake (e.g. ₹32,000, ₹55,000), time elapsed, reason, and **Call Back button on every row**. | ✅ Complete |
| **4. Recent Calls** | Calls grouped by type, duration, timestamp, and SOP score. Tapping any call opens the **Call Review vs SOP Standards Modal** with evidence quotes. | ✅ Complete |
| **5. Calendar** | October 2026 month grid with event indicator dots, month switcher, Today button, selected day schedule, and "+ Add Schedule" callback modal. | ✅ Complete |
| **6. Pulse Home** | AvaniBot AI Coach with quick briefings, 5 Role and Task Agents (Walk-out Recovery, Pitch Coach, ASM Agent, Follow-up, Objection Coach), channels list, and Kudos wall. | ✅ Complete |
| **7. Pulse Channel Chat** | Header with Back button, **pinned "Needs your input" card** with action buttons and custom reply box, chat bubbles (others left, agent right), and working message composer. | ✅ Complete |
| **8. Leads Modal** | Opened from dashboard task list ("2 hot leads") or leads list; shows ICP score (96%) with 4-pillar breakdown, Lead Intent score (91%), collapsible buying signals, journey timeline, prev/next pagination, and call actions. | ✅ Complete |

---

