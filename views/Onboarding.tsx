
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle2, User, Globe, Target, DollarSign, Sparkles, Rocket, Send, Instagram, Youtube, Twitter, Camera, Briefcase, Zap, BarChart3, Users, ShieldCheck } from 'lucide-react';
import { UserProfile, FitDNA } from '../types';

const Onboarding: React.FC<{ user: UserProfile | null, onComplete: () => void }> = ({ user, onComplete }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!user) return null;
  const isCreator = user.role === 'creator';
  const totalSteps = isCreator ? 4 : 3;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
    else {
      setLoading(true);
      setTimeout(() => {
        onComplete();
        navigate(isCreator ? '/creator-dashboard' : '/brand-dashboard');
      }, 1500);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-right animate-reveal">
      <div className="mb-16">
         <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-black text-white tracking-tighter">إعداد حسابك في LinkAI</h1>
            <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">الخطوة {step} من {totalSteps}</p>
         </div>
         <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 transition-all duration-700" style={{ width: `${(step/totalSteps)*100}%` }}></div>
         </div>
      </div>

      <div className="glass p-12 md:p-16 rounded-[4rem] border-white/10 shadow-3xl min-h-[450px] flex flex-col justify-between">
         <div className="animate-reveal" key={step}>
            {isCreator ? (
               <CreatorSteps step={step} />
            ) : (
               <BrandSteps step={step} />
            )}
         </div>

         <div className="flex justify-between items-center mt-16 pt-8 border-t border-white/5">
            <button 
              onClick={handleBack} 
              disabled={step === 1}
              className={`flex items-center gap-3 font-black text-xs uppercase tracking-widest transition-all ${step === 1 ? 'opacity-0' : 'text-slate-500 hover:text-white'}`}
            >
               <ArrowLeft size={16} /> العودة
            </button>
            <button 
              onClick={handleNext}
              disabled={loading}
              className="px-10 py-5 bg-white text-black rounded-full font-black text-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shadow-xl disabled:opacity-50"
            >
               {loading ? 'جاري التحليل...' : step === totalSteps ? 'ابدأ رحلتك' : 'المتابعة'} <ArrowRight size={18} />
            </button>
         </div>
      </div>
    </div>
  );
};

const CreatorSteps: React.FC<{ step: number }> = ({ step }) => {
  switch(step) {
    case 1: return (
      <div className="space-y-10">
        <h2 className="text-3xl font-black text-white">من أنت؟</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pr-2">الاسم الحقيقي</label>
              <input type="text" placeholder="مثال: سارة العبدالله" className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold outline-none focus:border-indigo-500 transition-all text-right" />
           </div>
           <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pr-2">تخصصك الإبداعي</label>
              <select className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold outline-none focus:border-indigo-500 transition-all text-right appearance-none">
                 <option>تكنولوجيا وتقنية</option>
                 <option>موضة وأزياء</option>
                 <option>صحة ولياقة</option>
                 <option>ألعاب فيديو</option>
              </select>
           </div>
        </div>
      </div>
    );
    case 2: return (
      <div className="space-y-10">
        <h2 className="text-3xl font-black text-white">قنواتك الرئيسية</h2>
        <p className="text-slate-500 font-medium">اربط حساباتك لنتمكن من تحليل الـ DNA الخاص بمحتواك.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
           <SimpleChannel icon={<Instagram size={18}/>} label="Instagram" />
           <SimpleChannel icon={<Youtube size={18}/>} label="YouTube" />
           <SimpleChannel icon={<Twitter size={18}/>} label="TikTok" />
        </div>
      </div>
    );
    case 3: return (
      <div className="space-y-10">
        <h2 className="text-3xl font-black text-white">تفضيلات الأرباح</h2>
        <div className="grid grid-cols-2 gap-4">
           <SimplePref label="UGC مدفوع" />
           <SimplePref label="Affiliate" />
           <SimplePref label="سفير علامة" />
           <SimplePref label="تبادل منتجات" />
        </div>
      </div>
    );
    case 4: return (
      <div className="space-y-10 text-center py-6">
        <div className="w-20 h-20 vibrant-gradient rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-2xl">
           <Sparkles size={40} />
        </div>
        <h2 className="text-4xl font-black text-white tracking-tighter">جاهز للانطلاق!</h2>
        <p className="text-lg text-slate-400 font-medium max-w-sm mx-auto leading-relaxed">سنقوم الآن بمطابقة ملفك مع مئات العلامات التجارية التي تبحث عن أسلوبك.</p>
      </div>
    );
    default: return null;
  }
};

const BrandSteps: React.FC<{ step: number }> = ({ step }) => {
  switch(step) {
    case 1: return (
      <div className="space-y-10">
        <h2 className="text-3xl font-black text-white">عن شركتك</h2>
        <div className="space-y-6">
           <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pr-2">اسم البراند</label>
              <input type="text" placeholder="فولتيفاي" className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold outline-none focus:border-indigo-500 transition-all text-right" />
           </div>
           <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pr-2">الموقع الإلكتروني</label>
              <input type="url" placeholder="https://..." className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold outline-none focus:border-indigo-500 transition-all text-left dir-ltr" />
           </div>
        </div>
      </div>
    );
    case 2: return (
      <div className="space-y-10">
        <h2 className="text-3xl font-black text-white">هدف الحملة</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
           <SimpleGoal icon={<Zap size={24}/>} label="إنتاج محتوى UGC" />
           <SimpleGoal icon={<DollarSign size={24}/>} label="مبيعات بالعمولة" />
        </div>
      </div>
    );
    case 3: return (
      <div className="space-y-10 text-center py-6">
        <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl border border-emerald-500/20">
           <ShieldCheck size={40} />
        </div>
        <h2 className="text-4xl font-black text-white tracking-tighter">تم توثيق طلبك</h2>
        <p className="text-lg text-slate-400 font-medium max-w-sm mx-auto leading-relaxed">سنعرض لك الآن المبدعين الذين يتمتعون بـ "DNA" مطابق تماماً لرؤيتك.</p>
      </div>
    );
    default: return null;
  }
};

const SimpleChannel: React.FC<{ icon: React.ReactNode, label: string }> = ({ icon, label }) => (
  <button className="p-6 glass rounded-2xl border border-white/5 text-center hover:border-indigo-500/50 transition-all group">
     <div className="mb-4 text-slate-600 group-hover:text-white transition-colors flex justify-center">{icon}</div>
     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
  </button>
);

const SimplePref: React.FC<{ label: string }> = ({ label }) => (
  <button className="p-6 glass rounded-2xl border border-white/5 text-right font-black text-sm text-slate-400 hover:text-white hover:border-indigo-500/30 transition-all">
     {label}
  </button>
);

const SimpleGoal: React.FC<{ icon: React.ReactNode, label: string }> = ({ icon, label }) => (
  <button className="p-10 glass rounded-[2.5rem] border border-white/5 text-right hover:bg-white/[0.03] transition-all group">
     <div className="mb-6 text-indigo-500 group-hover:scale-110 transition-transform">{icon}</div>
     <p className="text-xl font-black text-white">{label}</p>
  </button>
);

export default Onboarding;
