
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Landing from './views/Landing';
import Discovery from './views/Discovery';
import CreatorDashboard from './views/CreatorDashboard';
import BrandDashboard from './views/BrandDashboard';
import Onboarding from './views/Onboarding';
import Workspace from './views/Workspace';
import AiMatch from './views/AiMatch';
import ForCreators from './views/ForCreators';
import ForBrands from './views/ForBrands';
import About from './views/About';
import ContactSection from './components/ContactSection';
import { UserRole, UserProfile } from './types';
import { Menu, X, Bell, MessageSquare, User, Layout, Search, Sparkles, Briefcase, BarChart3, Star, Zap, Home, Globe, PhoneCall, Info } from 'lucide-react';

// Official Nra Logo Component based on the provided branding
const Logo: React.FC<{ className?: string, hideText?: boolean }> = ({ className = "h-8", hideText = false }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="relative flex items-center">
      {!hideText && (
        <span className="text-3xl font-black tracking-tighter text-white mr-1" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          Nra
        </span>
      )}
      <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -top-1 -right-4 w-6 h-6">
        <path d="M40 0H70V30H40V0Z" fill="#0066FF" />
        <path d="M65 25H95V55H65V25Z" fill="#0066FF" />
      </svg>
    </div>
  </div>
);

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  const handleLogin = (role: UserRole) => {
    setUser({
      id: '123',
      role,
      name: role === 'creator' ? 'سارة العبدالله' : 'شركة فولتيفاي',
      email: 'user@example.com',
      isVerified: false,
      onboardingCompleted: false
    });
  };

  const handleLogout = () => setUser(null);

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col selection:bg-indigo-500/30">
        <Navigation user={user} onLogout={handleLogout} />
        
        <main className="flex-grow pt-24">
          <Routes>
            <Route path="/" element={<Landing onLogin={handleLogin} />} />
            <Route path="/about" element={<About />} />
            <Route path="/for-creators" element={<ForCreators onJoin={() => handleLogin('creator')} />} />
            <Route path="/for-brands" element={<ForBrands onJoin={() => handleLogin('brand')} />} />
            <Route path="/onboarding" element={<Onboarding user={user} onComplete={() => setUser(prev => prev ? {...prev, onboardingCompleted: true} : null)} />} />
            <Route path="/discovery" element={<Discovery />} />
            <Route path="/workspace" element={<Workspace user={user} />} />
            <Route path="/aimatch" element={<AiMatch user={user} />} />
            <Route path="/creator-dashboard" element={<CreatorDashboard />} />
            <Route path="/brand-dashboard" element={<BrandDashboard />} />
            <Route path="/analytics" element={<div className="p-20 text-center text-4xl font-black text-white">صفحة التحليلات قيد التطوير</div>} />
          </Routes>
          
          <ContactSection />
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
};

const Navigation: React.FC<{ user: UserProfile | null, onLogout: () => void }> = ({ user, onLogout }) => {
  const location = useLocation();

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!user) {
    return (
      <div className="fixed top-6 left-0 right-0 z-50 px-6">
        <nav className="max-w-6xl mx-auto glass rounded-full py-3 px-8 flex justify-between items-center shadow-2xl border border-white/5">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center">
               <Logo className="h-7" />
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/about" className={`text-[10px] font-black uppercase tracking-widest transition-colors ${location.pathname === '/about' ? 'text-white' : 'text-slate-400 hover:text-white'}`}>عن نرى</Link>
              <Link to="/for-creators" className={`text-[10px] font-black uppercase tracking-widest transition-colors ${location.pathname === '/for-creators' ? 'text-white' : 'text-slate-400 hover:text-white'}`}>للمبدعين</Link>
              <Link to="/for-brands" className={`text-[10px] font-black uppercase tracking-widest transition-colors ${location.pathname === '/for-brands' ? 'text-white' : 'text-slate-400 hover:text-white'}`}>للبراندات</Link>
              <Link to="/discovery" className={`text-[10px] font-black uppercase tracking-widest transition-colors ${location.pathname === '/discovery' ? 'text-white' : 'text-slate-400 hover:text-white'}`}>الاكتشاف</Link>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={scrollToContact} className="hidden lg:block text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">تواصل معنا</button>
            <Link to="/" className="bg-white text-black px-8 py-2.5 rounded-full text-xs font-black hover:bg-slate-200 transition-all active:scale-95 shadow-xl">
              دخول المنصة
            </Link>
          </div>
        </nav>
      </div>
    );
  }

  const isCreator = user.role === 'creator';

  return (
    <div className="fixed top-6 left-0 right-0 z-50 px-6">
      <nav className="max-w-6xl mx-auto glass rounded-full py-2 px-4 flex justify-between items-center shadow-2xl border border-white/10">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center pr-4 border-l border-white/10 ml-4">
             <Logo className="h-6" />
          </Link>
          <div className="hidden lg:flex items-center gap-1">
            <NavLink to={isCreator ? "/creator-dashboard" : "/brand-dashboard"} icon={<Layout size={14}/>} label="الرئيسية" />
            <NavLink to="/about" icon={<Info size={14}/>} label="عن نرى" />
            <NavLink to="/discovery" icon={<Search size={14}/>} label={isCreator ? "الفرص" : "المبدعين"} />
            <NavLink to="/aimatch" icon={<Sparkles size={14}/>} label="AI Match" />
            <NavLink to="/workspace" icon={<Briefcase size={14}/>} label="مساحة العمل" />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={scrollToContact} className="hidden md:flex items-center gap-2 px-4 py-2 glass rounded-full text-[10px] font-black text-slate-300 hover:text-white transition-all border-white/5">
             <PhoneCall size={14} className="text-[#0066FF]"/> تواصل معنا
          </button>
          <div className="h-8 w-px bg-white/10 mx-2"></div>
          <button onClick={onLogout} className="flex items-center gap-3 pl-1 pr-4 py-1 glass rounded-full hover:bg-white/5 transition-all">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white uppercase">
              {user.name.charAt(0)}
            </div>
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest hidden sm:inline">خروج</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

const NavLink: React.FC<{ to: string, icon: React.ReactNode, label: string }> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className={`flex items-center gap-2 px-3 py-2 rounded-full text-[10px] font-bold transition-all uppercase tracking-wider ${isActive ? 'bg-white text-black shadow-lg scale-105' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
      <span className={isActive ? 'opacity-100' : 'opacity-60'}>{icon}</span>
      {label}
    </Link>
  );
};

const Footer = () => (
  <footer className="py-20 px-6 border-t border-white/5 bg-black/50">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 text-right">
      <div className="md:col-span-4">
        <div className="mb-6">
          <Logo className="h-10" />
        </div>
        <p className="text-slate-400 text-sm leading-loose max-w-sm">المنصة الرائدة لبناء الجسور بين المبدعين والعلامات التجارية في الشرق الأوسط. مستقبل التعاون الرقمي يبدأ من هنا عبر منظومة نرى المتكاملة.</p>
      </div>
      <div className="md:col-span-2 md:col-start-7">
        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">المنصة</h4>
        <ul className="text-sm space-y-4 text-slate-500">
          <li><Link to="/about" className="hover:text-white">عن نرى (قصتنا)</Link></li>
          <li><Link to="/discovery" className="hover:text-white">محرك البحث الذكي</Link></li>
          <li><Link to="/aimatch" className="hover:text-white">نظام المطابقة AI</Link></li>
        </ul>
      </div>
      <div className="md:col-span-2">
        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">التواصل</h4>
        <ul className="text-sm space-y-4 text-slate-500">
          <li className="hover:text-white cursor-pointer">X (تويتر)</li>
          <li className="hover:text-white cursor-pointer">انستقرام</li>
          <li className="hover:text-white cursor-pointer">الدعم الفني</li>
        </ul>
      </div>
      <div className="md:col-span-2">
        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">قانوني</h4>
        <ul className="text-sm space-y-4 text-slate-500">
          <li className="hover:text-white cursor-pointer">شروط الاستخدام</li>
          <li className="hover:text-white cursor-pointer">الخصوصية</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-[10px] text-center font-bold text-slate-600 uppercase tracking-widest">
      &copy; {new Date().getFullYear()} Nra MENA. جميع الحقوق محفوظة. شركة طلابية تأسست في 2026.
    </div>
  </footer>
);

export default App;
