export type BuildTarget = 'web' | 'mobile' | 'both';

export type AppCategory = 
  | 'E-Commerce & Store'
  | 'SaaS & Productivity'
  | 'Social & Community'
  | 'On-Demand & Delivery'
  | 'Health & Fitness'
  | 'Finance & Crypto'
  | 'AI & Tools'
  | 'Travel & Booking'
  | 'Gaming & Entertainment';

export interface ProjectBrandAsset {
  logoSvg?: string;
  logoUrl?: string;
  logoTheme?: string;
  introVideo?: {
    title: string;
    tagline: string;
    durationSeconds: number;
    accentColor: string;
    bgStyle: string;
    musicTrack: string;
    script: string;
    scenes: Array<{
      text: string;
      subtext: string;
      visualIcon: string;
      duration: number;
    }>;
  };
}

export interface StoreComplianceReport {
  overallScore: number; // 0 - 100
  status: 'compliant' | 'warning' | 'urgent_action_required';
  targetSdk: string;
  playStoreDeadline: string;
  appStoreDeadline: string;
  warnings: Array<{
    id: string;
    severity: 'high' | 'medium' | 'low';
    title: string;
    description: string;
    remediationAction: string;
    autoPatchAvailable: boolean;
  }>;
  lastUpdated: string;
}

export interface GeneratedFile {
  path: string;
  description: string;
  code: string;
  language: string;
}

export interface NinoProject {
  id: string;
  name: string;
  tagline: string;
  description: string;
  target: BuildTarget;
  category: AppCategory;
  prompt: string;
  status: 'draft' | 'building' | 'ready' | 'deployed' | 'sold';
  createdAt: number;
  lastEditedAt: number;
  version: string;
  
  // Customization & Generated UI Preview
  previewHtml: string;
  features: string[];
  techStack: string[];
  colorPalette: {
    primary: string;
    secondary: string;
    background: string;
    accent: string;
  };
  
  // Files / Source Code
  files: GeneratedFile[];
  
  // Branding
  branding: ProjectBrandAsset;
  
  // Monetization & Store State
  isFreeOfRevenueShare: boolean; // True if $30 buyout paid
  totalRevenueEarned: number;
  creatorEarnings: number;
  ninoPlatformCut: number;
  walletBalance: number;
  
  // Store Compliance & Updates
  storeCompliance: StoreComplianceReport;
  updateHistory: Array<{
    id: string;
    version: string;
    notes: string;
    appliedAt: number;
  }>;
  
  // Transfer / Sale Info
  isListedForSale: boolean;
  salePrice?: number;
  ownerEmail: string;
  originalCreatorEmail: string;
  transferHistory: Array<{
    fromEmail: string;
    toEmail: string;
    date: number;
    price?: number;
  }>;
  
  // Deployment
  deployedUrl?: string;
  apkDownloadUrl?: string;
  zipSourceUrl?: string;
}

export interface RecentChatSession {
  id: string;
  projectId?: string;
  title: string;
  target: BuildTarget;
  createdAt: number;
  expiresAt: number; // 24 hours from creation
  messages: Array<{
    id: string;
    sender: 'user' | 'nino';
    text: string;
    timestamp: number;
    generatedProjectSnapshot?: NinoProject;
  }>;
}

export interface MarketplaceListing {
  id: string;
  projectId: string;
  title: string;
  description: string;
  target: BuildTarget;
  category: AppCategory;
  priceUsd: number;
  sellerEmail: string;
  rating: number;
  monthlyRevenueEst: number;
  previewUrl?: string;
  bannerGradient: string;
  features: string[];
  techStack: string[];
  createdAt: number;
}

export interface PayoutTransaction {
  id: string;
  projectId: string;
  projectName: string;
  amount: number;
  feeAmount: number;
  netPayout: number;
  method: 'paypal' | 'bank_transfer';
  accountDetails: string;
  status: 'completed' | 'processing' | 'pending';
  timestamp: number;
}
