
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, Users, Globe, Sparkles, ArrowRight, DollarSign, CheckCircle2, 
  Briefcase, Star, Search, BrainCircuit, Activity, Layout, Database, 
  User, ShieldCheck, HeartHandshake, TrendingUp, BarChart3, Rocket, 
  MessageSquare, Phone, Send, UserCheck, PhoneCall, Layers, Target,
  Lock, Globe2, Cpu
} from 'lucide-react';
import { UserRole } from '../types';

const Landing: React.FC<{ onLogin: (role: UserRole) => void }> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleJoin = (role: UserRole) => {
    onLogin(role);
    navigate('/onboarding');
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onLogin('brand');
      navigate(`/discovery?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative overflow-hidden bg-[#030712] text-white selection:bg-indigo-500/40">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-12 px-6 z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full mb-10 animate-reveal border-white/10">
             <div className="relative w-4 h-4 mr-1">
                <div className="absolute top-0 left-0 w-2.5 h-2.5 bg-[#0066FF]"></div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#0066FF]"></div>
             </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">بناء الجسور في MENA عبر Nra</span>
          </div>
          
          <h1 className="text-6xl md:text-[7.5rem] font-black tracking-tighter mb-8 leading-[0.9] animate-reveal">
            Nra. <br />
            <span className="gradient-text">إبداعك هو استثمارك.</span>
          </h1>
          
          <div className="max-w-3xl mx-auto mb-16 animate-reveal">
            <p className="text-2xl md:text-3xl text-white font-bold mb-4 leading-tight">ببساطة: نرى يجمع صناع المحتوى المبدعين بأفضل البراندات في مكان واحد.</p>
            <p className="text-xl text-slate-400 leading-relaxed font-medium">إذا كنت مبدعاً، نوفر لك العقود والعمولات. وإذا كنت براند، نوفر لك المبدع المناسب لجمهورك بدقة الذكاء الاصطناعي.</p>
          </div>

          <div className="max-w-4xl mx-auto mb-12 animate-reveal flex flex-col items-center gap-6">
            <form onSubmit={handleQuickSearch} className="w-full relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-[#0066FF] rounded-full blur opacity-10 group-focus-within:opacity-40 transition duration-700"></div>
              <div className="relative glass rounded-full p-2 flex items-center border-white/10 shadow-2xl">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن الشريك المثالي أو الفرصة القادمة..." 
                  className="flex-grow bg-transparent px-8 py-4 text-xl font-bold text-white outline-none placeholder:text-slate-700 text-right"
                />
                <button type="submit" className="bg-white text-black px-10 py-4 rounded-full font-black text-sm hover:bg-indigo-50 transition-all flex items-center gap-3 shadow-xl">
                  <span>بحث ذكي</span>
                  <Search size={18} />
                </button>
              </div>
            </form>
            
            <button 
              onClick={scrollToContact}
              className="flex items-center gap-3 px-8 py-3 glass rounded-full border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all text-xs font-black uppercase tracking-widest shadow-xl"
            >
              <PhoneCall size={16} className="text-[#0066FF]" /> لديك استفسار؟ تواصل معنا الآن
            </button>
          </div>
        </div>
      </section>

      {/* 2. THE JOURNEY */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Creator Path */}
            <div 
              className="group relative bento-card p-12 rounded-[4rem] border-indigo-500/10 hover:bg-indigo-500/[0.03] transition-all overflow-hidden cursor-pointer" 
              onClick={() => navigate('/for-creators')}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0066FF] to-transparent"></div>
              <div className="flex justify-between items-start mb-10">
                <div className="w-20 h-20 glass rounded-3xl flex items-center justify-center text-[#0066FF] shadow-2xl border border-indigo-500/20 group-hover:scale-110 transition-transform"><Rocket size={40}/></div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-[#0066FF] uppercase tracking-widest block mb-2">أنا صانع محتوى</span>
                  <h3 className="text-4xl font-black text-white">حول إبداعك إلى بزنس</h3>
                </div>
              </div>
              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4 text-right">
                   <div className="w-2 h-2 rounded-full bg-[#0066FF]"></div>
                   <p className="text-lg text-slate-300 font-medium">احصل على صفقات Affiliate و UGC بعمولات مجزية.</p>
                </div>
                <div className="flex items-center gap-4 text-right">
                   <div className="w-2 h-2 rounded-full bg-[#0066FF]"></div>
                   <p className="text-lg text-slate-300 font-medium">عقود قانونية تضمن لك استلام أرباحك فوراً.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[#0066FF] font-black text-lg">
                <span>اكتشف المزيد للمبدعين</span>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform"/>
              </div>
            </div>

            {/* Brand Path */}
            <div 
              className="group relative bento-card p-12 rounded-[4rem] border-rose-500/10 hover:bg-rose-500/[0.03] transition-all overflow-hidden cursor-pointer" 
              onClick={() => navigate('/for-brands')}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-transparent"></div>
              <div className="flex justify-between items-start mb-10">
                <div className="w-20 h-20 glass rounded-3xl flex items-center justify-center text-rose-400 shadow-2xl border border-rose-500/20 group-hover:scale-110 transition-transform"><Target size={40}/></div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest block mb-2">أنا صاحب براند</span>
                  <h3 className="text-4xl font-black text-white">اكتشف المبدع المثالي</h3>
                </div>
              </div>
              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4 text-right">
                   <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                   <p className="text-lg text-slate-300 font-medium">محرك AI يحلل الـ DNA للمبدع لضمان التوافق.</p>
                </div>
                <div className="flex items-center gap-4 text-right">
                   <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                   <p className="text-lg text-slate-300 font-medium">تتبع العائد (ROI) لكل حملة بشكل منفصل.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-rose-400 font-black text-lg">
                <span>اكتشف المزيد للبراندات</span>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TECH STACK */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 tracking-tighter">القوة التقنية خلف Nra.</h2>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">نستخدم أحدث تقنيات البيانات والاستخبارات الرقمية لتنفيذ شراكات دقيقة ومربحة.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass p-10 rounded-[3rem] border-white/5 text-right">
              <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-[#0066FF] mb-6"><BrainCircuit size={24}/></div>
              <h4 className="text-2xl font-black mb-4">AI Match Engine</h4>
              <p className="text-slate-400 font-medium">خوارزميات تحلل توافق الجمهور والأسلوب بين الطرفين.</p>
            </div>
            <div className="glass p-10 rounded-[3rem] border-white/5 text-right">
              <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-[#0066FF] mb-6"><Search size={24}/></div>
              <h4 className="text-2xl font-black mb-4">OSINT Social Radar</h4>
              <p className="text-slate-400 font-medium">مسح عميق عبر الويب لاكتشاف المواهب الصاعدة والموثوقة.</p>
            </div>
            <div className="glass p-10 rounded-[3rem] border-white/5 text-right">
              <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-[#0066FF] mb-6"><Lock size={24}/></div>
              <h4 className="text-2xl font-black mb-4">Secure Escrow</h4>
              <p className="text-slate-400 font-medium">نظام مالي يؤمن حقوق الطرفين حتى اكتمال العمل.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-12 tracking-tighter">ابدأ الآن مع Nra.</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={() => handleJoin('creator')}
              className="px-16 py-8 bg-white text-black rounded-full font-black text-2xl hover:scale-105 transition-all shadow-3xl flex items-center justify-center gap-4 group"
            >
              سجل كمبدع <Rocket size={28} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            <button 
              onClick={() => handleJoin('brand')}
              className="px-16 py-8 glass border-white/20 text-white rounded-full font-black text-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-4 group"
            >
              سجل كبراند <Briefcase size={28} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
