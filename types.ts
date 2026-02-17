
export type UserRole = 'creator' | 'brand' | null;

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface FitDNA {
  style: 'strict' | 'flexible' | 'balanced';
  approvalSpeed: 'fast' | 'structured';
  tone: 'serious' | 'playful';
  collaboration: 'independent' | 'guided';
}

export interface UserProfile {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  avatar?: string;
  isVerified: boolean;
  onboardingCompleted: boolean;
  fitDNA?: FitDNA;
}

export interface Brand extends UserProfile {
  industry: string;
  description: string;
  website: string;
  teamSize?: string;
}

export interface Creator extends UserProfile {
  handle: string;
  category: string;
  followers: number;
  engagement: string;
  platforms: string[];
  bio: string;
  location: string;
  contentStyles: string[];
  availability: 'Available' | 'Busy' | 'On Leave';
  avgViews: string;
  ratePerPost: number;
  badges: string[];
  loyaltyTier: 'Bronze' | 'Silver' | 'Gold';
  brandSafetyAvoid?: string[];
  audienceDemographics?: {
    ageRange: string;
    topLocations: string[];
    genderSplit: string;
  };
}

export interface Deal {
  id: string;
  title: string;
  brandId: string;
  creatorId: string;
  status: 'Negotiation' | 'Active' | 'Delivered' | 'Paid' | 'Completed';
  payoutModel: 'Fixed' | 'Commission' | 'Hybrid';
  amount: number;
  deadline: string;
  tasks: { id: string; label: string; completed: boolean }[];
  deliverables: string[];
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  budget: number;
  spent: number;
  status: 'Open' | 'Active' | 'Completed';
  brandId: string;
  deliverables: string[];
  creatorsInvited: string[];
  deadline: string;
  roiMetrics?: {
    conversions: number;
    costPerAsset: number;
    totalRevenue: number;
    avgDeliveryTimeDays: number;
  };
}

export interface BoostPackage {
  id: string;
  title: string;
  description: string;
  price: number;
  features: string[];
  category: 'Creator' | 'Brand' | 'Growth';
}

export interface AffiliateProgram {
  id: string;
  brandId: string;
  brandName: string;
  productName: string;
  description: string;
  commissionType: 'Percentage' | 'Fixed';
  commissionValue: number;
  status: 'Active' | 'Paused';
}

export interface AffiliateLink {
  id: string;
  programId: string;
  creatorId: string;
  customCode: string;
  url: string;
  clicks: number;
  conversions: number;
  totalRevenue: number;
  totalCommission: number;
}

export interface AffiliateStat {
  date: string;
  clicks: number;
  conversions: number;
  revenue: number;
}
