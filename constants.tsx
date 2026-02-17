
import { Creator, AffiliateStat, Campaign, AffiliateProgram, AffiliateLink, BoostPackage } from './types';

export const MOCK_CREATORS: Creator[] = [
  {
    id: '1',
    name: 'سارة العبدالله',
    handle: '@sarah_reviews',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop',
    category: 'التكنولوجيا والابتكار',
    followers: 250000,
    engagement: '5.2%',
    platforms: ['YouTube', 'Instagram', 'TikTok'],
    bio: 'أكتشف مستقبل التقنية من قلب الرياض. مراجعات دقيقة لأحدث الأجهزة والحلول الذكية.',
    location: 'الرياض، المملكة العربية السعودية',
    contentStyles: ['Review', 'Talking Head', 'Cinematic'],
    availability: 'Available',
    brandSafetyAvoid: ['Gambling', 'Tobacco'],
    avgViews: '85k',
    ratePerPost: 4500,
    badges: ['Verified', 'High Reliability', 'Top Converter'],
    loyaltyTier: 'Gold',
    onboardingCompleted: true,
    isVerified: true,
    email: 'sarah@example.com',
    role: 'creator',
    audienceDemographics: {
      ageRange: '18-34 (65%)',
      topLocations: ['السعودية', 'الإمارات', 'الكويت'],
      genderSplit: 'ذكر: 60%، أنثى: 40%'
    }
  },
  {
    id: '2',
    name: 'أحمد المرزوقي',
    handle: '@ahmad_fitness',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop',
    category: 'اللياقة والرياضة',
    followers: 680000,
    engagement: '7.8%',
    platforms: ['TikTok', 'Instagram'],
    bio: 'مدرب معتمد ومستشار تغذية. نغير نمط حياتك للأفضل خطوة بخطوة.',
    location: 'دبي، الإمارات العربية المتحدة',
    contentStyles: ['Tutorial', 'Educational'],
    availability: 'Busy',
    brandSafetyAvoid: ['Alcohol'],
    avgViews: '250k',
    ratePerPost: 8000,
    badges: ['Verified', 'Fast Responder'],
    loyaltyTier: 'Silver',
    onboardingCompleted: true,
    isVerified: true,
    email: 'ahmad@example.com',
    role: 'creator',
    audienceDemographics: {
      ageRange: '20-45 (75%)',
      topLocations: ['الإمارات', 'السعودية', 'مصر'],
      genderSplit: 'ذكر: 70%، أنثى: 30%'
    }
  }
];

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'c1',
    title: 'انطلاقة الشتاء 2024',
    description: 'حملة ترويجية لمجموعة الرحلات الشتوية الجديدة بالتعاون مع كبار صناع المحتوى.',
    budget: 150000,
    spent: 45000,
    status: 'Active',
    brandId: 'b1',
    creatorsInvited: ['1', '2'],
    deadline: '2024-12-30',
    deliverables: ['فيديو يوتيوب مخصص', '3 ريلز انستقرام'],
    roiMetrics: {
      conversions: 1250,
      costPerAsset: 2500,
      avgDeliveryTimeDays: 4.5,
      totalRevenue: 345000
    }
  }
];

export const BOOST_PACKAGES: BoostPackage[] = [
  {
    id: 'b1',
    title: 'باقة المبدع الشخصية',
    description: 'ملف تعريفي كامل، هوية بصرية، وقوالب محتوى احترافية لجذب البراندات العالمية.',
    price: 1200,
    features: ['شعار وهوية بصرية', 'تصميم Media Kit', '5 قوالب Canva مخصصة'],
    category: 'Creator'
  },
  {
    id: 'b2',
    title: 'باقة البراند لليوجي سي (UGC)',
    description: 'تجهيز بريفات احترافية، دليل نبرة الصوت، ومعايير الجودة لضمان أفضل مخرجات من المبدعين.',
    price: 1800,
    features: ['دليل نبرة الصوت', '5 قوالب Brief', 'نظام مراجعة فني'],
    category: 'Brand'
  },
  {
    id: 'b3',
    title: 'باقة استراتيجية النمو',
    description: 'تجهيز نظام العمولات بالكامل، صفحات الهبوط، والقمع التسويقي للشراكات.',
    price: 2500,
    features: ['بناء قمع تسويقي', 'تجهيز نظام Affiliate', 'استراتيجية تسعير'],
    category: 'Growth'
  }
];

export const MOCK_PROGRAMS: AffiliateProgram[] = [
  {
    id: 'p1',
    brandId: 'b1',
    brandName: 'فولتيفاي',
    productName: 'شاحن Solar X الذكي',
    description: 'شاحن متنقل يعمل بالطاقة الشمسية مصمم للرحلات البرية الطويلة.',
    commissionType: 'Percentage',
    commissionValue: 12,
    status: 'Active'
  }
];

export const MOCK_LINKS: AffiliateLink[] = [
  {
    id: 'l1',
    programId: 'p1',
    creatorId: '1',
    customCode: 'SARAH12',
    url: 'https://voltify.me/solar-x?ref=sarah12',
    clicks: 3450,
    conversions: 128,
    totalRevenue: 24500,
    totalCommission: 2940
  }
];

export const MOCK_STATS: AffiliateStat[] = [
  { date: '2023-11-01', clicks: 450, conversions: 22, revenue: 1200 },
  { date: '2023-11-02', clicks: 580, conversions: 35, revenue: 2100 },
  { date: '2023-11-03', clicks: 390, conversions: 18, revenue: 950 },
  { date: '2023-11-04', clicks: 720, conversions: 52, revenue: 3400 },
  { date: '2023-11-05', clicks: 900, conversions: 68, revenue: 4500 },
  { date: '2023-11-06', clicks: 850, conversions: 60, revenue: 3800 },
  { date: '2023-11-07', clicks: 1100, conversions: 85, revenue: 5600 },
];
