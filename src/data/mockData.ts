import { NinoProject, MarketplaceListing, RecentChatSession, PayoutTransaction } from '../types';

export const INITIAL_PROJECTS: NinoProject[] = [
  {
    id: 'proj-urban-mart',
    name: 'SwiftGrocer',
    tagline: '15-Minute Hyperlocal Grocery Delivery',
    description: 'A full-stack grocery delivery system with live driver GPS tracking, cart management, stripe checkout, and store inventory sync.',
    target: 'both',
    category: 'On-Demand & Delivery',
    prompt: 'Build a dark-mode 15-minute grocery delivery app with dynamic product search, animated cart drawer, live order tracking map, and instant checkout.',
    status: 'ready',
    createdAt: Date.now() - 3600000 * 18,
    lastEditedAt: Date.now() - 3600000 * 2,
    version: '1.2.4',
    features: [
      'Real-time inventory sync',
      'Interactive visual store aisle',
      'One-tap biometric checkout',
      'Live driver courier route simulation',
      'Customer push notification dispatch'
    ],
    techStack: ['React 19', 'Tailwind CSS', 'WebSockets', 'Capacitor iOS/Android', 'Express API'],
    colorPalette: {
      primary: '#10b981',
      secondary: '#059669',
      background: '#090d16',
      accent: '#f59e0b',
    },
    branding: {
      logoSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="24" fill="url(#grad-sg)" />
        <path d="M30 35H70L65 65H35L30 35Z" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M42 35V28C42 23.58 45.58 20 50 20C54.42 20 58 23.58 58 28V35" stroke="#34d399" stroke-width="4" stroke-linecap="round"/>
        <circle cx="40" cy="74" r="4" fill="#ffffff"/>
        <circle cx="60" cy="74" r="4" fill="#ffffff"/>
        <path d="M45 48L49 52L57 44" stroke="#f59e0b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <defs>
          <linearGradient id="grad-sg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stop-color="#064e3b" />
            <stop offset="1" stop-color="#022c22" />
          </linearGradient>
        </defs>
      </svg>`,
      introVideo: {
        title: 'SwiftGrocer',
        tagline: 'Fresh Groceries in 15 Minutes Flat',
        durationSeconds: 12,
        accentColor: '#10b981',
        bgStyle: 'from-emerald-950 via-slate-950 to-black',
        musicTrack: 'Upbeat Tech Groove (128 BPM)',
        script: 'Welcome to SwiftGrocer. Tap into thousands of organic items, flash deals, and lightning 15-minute door delivery.',
        scenes: [
          { text: 'Craving Freshness?', subtext: 'Over 5,000 pantry items delivered instantly', visualIcon: 'ShoppingBag', duration: 4 },
          { text: 'Live Courier Telemetry', subtext: 'Watch your rider on the GPS radar', visualIcon: 'Navigation', duration: 4 },
          { text: 'One-Tap Checkout', subtext: 'Apple Pay, Google Pay, & Crypto Ready', visualIcon: 'Zap', duration: 4 },
        ]
      }
    },
    isFreeOfRevenueShare: false,
    totalRevenueEarned: 1450.00,
    creatorEarnings: 1015.00,
    ninoPlatformCut: 435.00,
    walletBalance: 1015.00,
    storeCompliance: {
      overallScore: 96,
      status: 'compliant',
      targetSdk: 'Android 15 (API level 35)',
      playStoreDeadline: 'Nov 1, 2026',
      appStoreDeadline: 'Dec 15, 2026',
      warnings: [
        {
          id: 'warn-1',
          severity: 'low',
          title: 'Google Play 64-bit Architecture Verified',
          description: 'All native dependencies comply with 64-bit ARM standards.',
          remediationAction: 'None needed. Auto-patched by Nino compiler.',
          autoPatchAvailable: true
        }
      ],
      lastUpdated: 'Today'
    },
    updateHistory: [
      { id: 'up-1', version: '1.2.4', notes: 'Optimized image caching and updated to Target API 35 for Play Store policy compliance.', appliedAt: Date.now() - 3600000 * 24 }
    ],
    isListedForSale: false,
    ownerEmail: 'ninobitch@gmail.com',
    originalCreatorEmail: 'ninobitch@gmail.com',
    transferHistory: [],
    deployedUrl: 'https://swiftgrocer.nino.app',
    previewHtml: `
      <div style="padding: 24px; font-family: system-ui, -apple-system, sans-serif; background: #0b111e; color: #f8fafc; min-height: 100vh;">
        <header style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #1e293b; padding-bottom:16px; margin-bottom:24px;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:38px; height:38px; border-radius:10px; background:linear-gradient(135deg, #10b981, #059669); display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:18px;">⚡</div>
            <div>
              <h2 style="margin:0; font-size:18px; font-weight:800; color:#ffffff;">SwiftGrocer</h2>
              <span style="font-size:11px; color:#10b981; font-weight:600;">● Delivery in 14 mins to 5th Ave</span>
            </div>
          </div>
          <button style="background:#10b981; color:#052e16; border:none; padding:8px 16px; border-radius:8px; font-weight:700; cursor:pointer;">Cart (3)</button>
        </header>

        <div style="background:linear-gradient(90deg, #064e3b, #022c22); padding:18px; border-radius:14px; border:1px solid #047857; margin-bottom:24px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <h3 style="margin:0 0 4px 0; font-size:16px; color:#ffffff;">Flash Farm Sale 🍓</h3>
            <p style="margin:0; font-size:12px; color:#a7f3d0;">Organic strawberries & fresh avocados 40% OFF</p>
          </div>
          <span style="background:#059669; color:#fff; padding:6px 12px; border-radius:20px; font-size:12px; font-weight:bold;">Claim Deal</span>
        </div>

        <h3 style="font-size:14px; text-transform:uppercase; letter-spacing:1px; color:#94a3b8; margin-bottom:14px;">Popular Categories</h3>
        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap:12px; margin-bottom:24px;">
          <div style="background:#1e293b; padding:14px; border-radius:12px; text-align:center; border:1px solid #334155;">
            <div style="font-size:24px; margin-bottom:6px;">🥑</div>
            <div style="font-size:12px; font-weight:700;">Organic Veggies</div>
          </div>
          <div style="background:#1e293b; padding:14px; border-radius:12px; text-align:center; border:1px solid #334155;">
            <div style="font-size:24px; margin-bottom:6px;">🥐</div>
            <div style="font-size:12px; font-weight:700;">Artisan Bakery</div>
          </div>
          <div style="background:#1e293b; padding:14px; border-radius:12px; text-align:center; border:1px solid #334155;">
            <div style="font-size:24px; margin-bottom:6px;">🥩</div>
            <div style="font-size:12px; font-weight:700;">Prime Cuts</div>
          </div>
          <div style="background:#1e293b; padding:14px; border-radius:12px; text-align:center; border:1px solid #334155;">
            <div style="font-size:24px; margin-bottom:6px;">🧃</div>
            <div style="font-size:12px; font-weight:700;">Cold Press</div>
          </div>
        </div>

        <div style="background:#111827; border:1px solid #1f2937; border-radius:14px; padding:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span style="font-size:13px; font-weight:700; color:#38bdf8;">🛵 Order #SG-9821 On The Way</span>
            <span style="font-size:11px; background:#0284c7; color:#fff; padding:2px 8px; rounded:4px;">ETA 6 min</span>
          </div>
          <div style="height:6px; background:#1e293b; border-radius:3px; overflow:hidden;">
            <div style="width:75%; height:100%; background:linear-gradient(90deg, #38bdf8, #10b981);"></div>
          </div>
        </div>
      </div>
    `,
    files: [
      { path: 'src/App.tsx', description: 'Main Root Component', language: 'typescript', code: `// SwiftGrocer App Root Component\nimport React from 'react';\nexport default function App() {\n  return <div>SwiftGrocer Engine Active</div>;\n}` },
      { path: 'src/components/CartDrawer.tsx', description: 'Interactive Cart Drawer', language: 'typescript', code: `export const CartDrawer = () => <div>Cart System</div>;` },
      { path: 'package.json', description: 'Project Dependencies', language: 'json', code: `{\n  "name": "swiftgrocer",\n  "version": "1.2.4"\n}` }
    ]
  },
  {
    id: 'proj-pulse-ai',
    name: 'PulseFlow AI',
    tagline: 'Automated CRM & Lead Intelligence Web App',
    description: 'AI-driven CRM that auto-qualifies sales prospects, transcribes customer meetings, and drafts deal summaries.',
    target: 'web',
    category: 'SaaS & Productivity',
    prompt: 'Build a SaaS dashboard for sales teams with AI deal forecasting, pipeline kanban, transcript summarizer, and automated billing tiers.',
    status: 'ready',
    createdAt: Date.now() - 3600000 * 48,
    lastEditedAt: Date.now() - 3600000 * 5,
    version: '2.0.1',
    features: [
      'Interactive Sales Pipeline Kanban',
      'AI Lead Score Heatmap',
      'Stripe Recurring Subscriptions ($49/mo)',
      'Google Calendar & Gmail Two-Way Sync',
      'Exportable Executive PDF Reports'
    ],
    techStack: ['Next.js', 'PostgreSQL', 'Tailwind CSS', 'ChartJS', 'Stripe API'],
    colorPalette: {
      primary: '#6366f1',
      secondary: '#4f46e5',
      background: '#0a0a14',
      accent: '#ec4899',
    },
    branding: {
      logoSvg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="24" fill="url(#grad-pf)" />
        <path d="M20 52H35L44 28L56 72L65 48L72 56H80" stroke="#818cf8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="56" cy="72" r="4" fill="#ec4899"/>
        <defs>
          <linearGradient id="grad-pf" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stop-color="#312e81" />
            <stop offset="1" stop-color="#0f172a" />
          </linearGradient>
        </defs>
      </svg>`,
      introVideo: {
        title: 'PulseFlow AI',
        tagline: 'Close Deals 3X Faster With Predictive Intelligence',
        durationSeconds: 10,
        accentColor: '#6366f1',
        bgStyle: 'from-indigo-950 via-slate-950 to-black',
        musicTrack: 'Futuristic Ambient Synth',
        script: 'Meet PulseFlow. The next-generation sales intelligence platform that closes your pipeline on autopilot.',
        scenes: [
          { text: 'Instant Lead Scoring', subtext: 'AI analyzes 40+ buyer buying signals', visualIcon: 'Activity', duration: 3.5 },
          { text: 'Automated CRM Updates', subtext: 'Zero manual data entry after client calls', visualIcon: 'CheckCircle', duration: 3.5 },
          { text: 'Scale to Millions', subtext: 'Enterprise-grade cloud pipeline sync', visualIcon: 'TrendingUp', duration: 3 },
        ]
      }
    },
    isFreeOfRevenueShare: true, // Marked "Set Free"
    totalRevenueEarned: 3820.00,
    creatorEarnings: 3820.00, // 100% because Set Free
    ninoPlatformCut: 0,
    walletBalance: 3820.00,
    storeCompliance: {
      overallScore: 100,
      status: 'compliant',
      targetSdk: 'Modern Web (PWA & HTTPS)',
      playStoreDeadline: 'N/A (Web SaaS)',
      appStoreDeadline: 'N/A (Web SaaS)',
      warnings: [],
      lastUpdated: 'Yesterday'
    },
    updateHistory: [
      { id: 'up-2', version: '2.0.1', notes: 'Integrated multi-currency Stripe billing and automated webhook retries.', appliedAt: Date.now() - 3600000 * 48 }
    ],
    isListedForSale: true,
    salePrice: 1200,
    ownerEmail: 'ninobitch@gmail.com',
    originalCreatorEmail: 'ninobitch@gmail.com',
    transferHistory: [],
    deployedUrl: 'https://pulseflow.nino.app',
    previewHtml: `
      <div style="padding: 24px; font-family: system-ui, -apple-system, sans-serif; background: #090912; color: #e2e8f0; min-height: 100vh;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; padding-bottom:16px; border-bottom:1px solid #1e1b4b;">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:36px; height:36px; border-radius:8px; background:#6366f1; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:bold;">⚡</div>
            <h2 style="margin:0; font-size:18px; color:#fff;">PulseFlow Dashboard</h2>
          </div>
          <span style="background:#312e81; color:#a5b4fc; padding:6px 12px; border-radius:6px; font-size:12px; font-weight:600;">MRR: $18,450 (+24%)</span>
        </div>

        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:16px; margin-bottom:24px;">
          <div style="background:#131326; padding:16px; border-radius:12px; border:1px solid #2e2a72;">
            <div style="color:#94a3b8; font-size:12px;">Qualified Leads</div>
            <div style="font-size:22px; font-weight:800; color:#fff; margin-top:4px;">1,420</div>
            <div style="color:#10b981; font-size:11px; margin-top:4px;">↑ 18% this week</div>
          </div>
          <div style="background:#131326; padding:16px; border-radius:12px; border:1px solid #2e2a72;">
            <div style="color:#94a3b8; font-size:12px;">Deals Closed</div>
            <div style="font-size:22px; font-weight:800; color:#fff; margin-top:4px;">84</div>
            <div style="color:#6366f1; font-size:11px; margin-top:4px;">Avg Deal: $4,200</div>
          </div>
          <div style="background:#131326; padding:16px; border-radius:12px; border:1px solid #2e2a72;">
            <div style="color:#94a3b8; font-size:12px;">AI Win Rate</div>
            <div style="font-size:22px; font-weight:800; color:#ec4899; margin-top:4px;">68.4%</div>
            <div style="color:#94a3b8; font-size:11px; margin-top:4px;">+12% vs Manual</div>
          </div>
        </div>

        <div style="background:#131326; border:1px solid #2e2a72; border-radius:12px; padding:16px;">
          <h4 style="margin:0 0 12px 0; font-size:14px; color:#fff;">Active AI Deal Opportunities</h4>
          <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid #1e1b4b;">
            <div>
              <strong style="color:#fff; font-size:13px;">Acme Corp Global</strong>
              <div style="color:#64748b; font-size:11px;">Contract value: $34,000/yr</div>
            </div>
            <span style="background:#059669; color:#fff; padding:4px 8px; border-radius:4px; font-size:11px; font-weight:bold;">94% Score</span>
          </div>
        </div>
      </div>
    `,
    files: [
      { path: 'src/pages/Dashboard.tsx', description: 'SaaS Analytics Dashboard', language: 'typescript', code: `export default function Dashboard() { return <div>PulseFlow CRM</div>; }` }
    ]
  }
];

export const INITIAL_MARKETPLACE: MarketplaceListing[] = [
  {
    id: 'market-1',
    projectId: 'proj-pulse-ai',
    title: 'PulseFlow AI - B2B Sales Intelligence SaaS',
    description: 'Fully built B2B CRM SaaS with AI prospect analysis, Stripe subscription billing, and multi-tenant database. Ready for immediate deployment or re-branding.',
    target: 'web',
    category: 'SaaS & Productivity',
    priceUsd: 1200,
    sellerEmail: 'ninobitch@gmail.com',
    rating: 4.9,
    monthlyRevenueEst: 850,
    bannerGradient: 'from-indigo-600 via-purple-600 to-pink-600',
    features: ['Stripe Billing', 'AI Prospect Engine', 'Kanban Board', 'PostgreSQL DB', '100% Code Ownership'],
    techStack: ['Next.js', 'PostgreSQL', 'Tailwind CSS', 'Stripe'],
    createdAt: Date.now() - 3600000 * 12
  },
  {
    id: 'market-2',
    projectId: 'proj-fitcraft',
    title: 'FitCraft Pro - AI Fitness & Meal Planner Mobile App',
    description: 'iOS & Android fitness tracker with AI camera form analysis, barcode calorie scanner, personalized workout routines, and push notification streaks.',
    target: 'mobile',
    category: 'Health & Fitness',
    priceUsd: 790,
    sellerEmail: 'alex.fitness@devmail.io',
    rating: 4.8,
    monthlyRevenueEst: 420,
    bannerGradient: 'from-amber-500 via-orange-600 to-rose-600',
    features: ['Barcode Calorie Scanner', 'AI Workout Generator', 'Apple HealthKit Sync', 'In-App Subscriptions'],
    techStack: ['React Native', 'Capacitor', 'Tailwind CSS', 'Supabase'],
    createdAt: Date.now() - 3600000 * 28
  },
  {
    id: 'market-3',
    projectId: 'proj-cryptonest',
    title: 'CryptoNest - Multi-Chain Web3 Portfolio & Alert Bot',
    description: 'Non-custodial crypto wallet viewer, gas tracker, arbitrage signal scanner, and automated Telegram alert dispatch for Ethereum & Solana.',
    target: 'both',
    category: 'Finance & Crypto',
    priceUsd: 1450,
    sellerEmail: 'satoshi.craft@web3build.org',
    rating: 5.0,
    monthlyRevenueEst: 1100,
    bannerGradient: 'from-cyan-500 via-blue-600 to-violet-700',
    features: ['Web3 Wallet Connect', 'DEX Aggregator API', 'Arbitrage Radar', 'Telegram Bot Alerts'],
    techStack: ['React', 'Ethers.js', 'Solana Web3', 'Express', 'Tailwind'],
    createdAt: Date.now() - 3600000 * 72
  }
];

export const INITIAL_RECENT_CHATS: RecentChatSession[] = [
  {
    id: 'chat-sess-1',
    title: 'SwiftGrocer Delivery App Prompting',
    target: 'both',
    createdAt: Date.now() - 3600000 * 4,
    expiresAt: Date.now() + 3600000 * 20, // 24hr window
    messages: [
      {
        id: 'm-1',
        sender: 'user',
        text: 'Build a dark-mode 15-minute grocery delivery app with dynamic product search, animated cart drawer, live order tracking map, and instant checkout.',
        timestamp: Date.now() - 3600000 * 4
      },
      {
        id: 'm-2',
        sender: 'nino',
        text: 'I have engineered **SwiftGrocer** for Web & Mobile! Generated 5 core components, integrated live courier telemetry, branded logo with SVG vector geometry, and an animated intro clip ready for app store deployment.',
        timestamp: Date.now() - 3600000 * 4 + 3000
      }
    ]
  },
  {
    id: 'chat-sess-2',
    title: 'PulseFlow AI Sales CRM',
    target: 'web',
    createdAt: Date.now() - 3600000 * 8,
    expiresAt: Date.now() + 3600000 * 16,
    messages: [
      {
        id: 'm-3',
        sender: 'user',
        text: 'Create an AI sales CRM dashboard with lead score heatmaps and automated recurring Stripe tiers.',
        timestamp: Date.now() - 3600000 * 8
      },
      {
        id: 'm-4',
        sender: 'nino',
        text: 'Engineered **PulseFlow AI**! Complete with deal kanban, AI win-rate prediction, and zero-fee export license ready.',
        timestamp: Date.now() - 3600000 * 8 + 2000
      }
    ]
  }
];
