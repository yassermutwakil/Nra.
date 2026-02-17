
import React from 'react';
// Added missing Sparkles icon to the lucide-react import list
import { Rocket, DollarSign, TrendingUp, ShieldCheck, Zap, Star, Globe, MessageSquare, Sparkles } from 'lucide-react';

const ForCreators: React.FC<{ onJoin: () => void }> = ({ onJoin }) => {
  return (
    <div className="bg-[#030712] text-white">
      {/* Hero Section */}
      <section className="pt-20 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full mb-10 animate-reveal border-white/10">
            <Sparkles className="text-indigo-400" size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">بوابة المبدعين في Nra</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-tight">
            حول إبداعك إلى <br />
            <span className="gradient-text">إمبراطورية تجارية.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            في Nra، لا نوفر لك مجرد إعلانات. نحن نوفر لك النظام الأساسي لتدير أعمالك، وتؤمن حقوقك، وتنمو كعلامة تجارية مستقلة.
          </p>
          <button onClick={onJoin} className="px-16 py-8 bg-white text-black rounded-full font-black text-2xl hover:scale-105 transition-all shadow-3xl">سجل كمبدع الآن</button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-indigo-600/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <FeatureItem 
              icon={<DollarSign size={32}/>}
              title="تعدد مصادر الدخل"
              desc="سواء كان ذلك عبر إنتاج فيديوهات UGC مخصصة أو عبر روابط Affiliate بعمولات مجزية، Nra تفتح لك أبواب الأرباح من كل اتجاه."
            />
            <FeatureItem 
              icon={<TrendingUp size={32}/>}
              title="بناء الـ Media Kit الاحترافي"
              desc="احصل على ملف تعريفي مدعوم بالبيانات يظهر قوتك التأثيرية الحقيقية ويجذب كبار المعلنين تلقائياً."
            />
            <FeatureItem 
              icon={<ShieldCheck size={32}/>}
              title="نظام الدفع المضمون"
              desc="لا مزيد من القلق بشأن المستحقات. نظام التعاقد الذكي لدينا يضمن إيداع الأموال فور اعتماد العمل."
            />
            <FeatureItem 
              icon={<Globe size={32}/>}
              title="الوصول لبراندات عالمية"
              desc="محركنا الذكي يوصلك بعلامات تجارية تبحث بالضبط عن أسلوبك وجمهورك، بدون الحاجة لمطاردة المعلنين."
            />
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-black mb-20 text-center">رحلتك إلى القمة</h2>
          <div className="space-y-24">
            <StepItem number="01" title="أنشئ هويتك" desc="اربط حساباتك الاجتماعية ودع محرك Nra يحلل أداءك ويبرز نقاط قوتك الفريدة." />
            <StepItem number="02" title="تلقَّ العروض" desc="ستصلك دعوات مباشرة من براندات تناسب محتواك، أو يمكنك التقديم على فرص الـ Affiliate المفتوحة." />
            <StepItem number="03" title="أبدع واستلم" desc="نفذ المهام المطلوبة عبر مساحة العمل الخاصة بك، وسيتم تحويل أرباحك فوراً بعد الموافقة." />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureItem = ({ icon, title, desc }: any) => (
  <div className="glass p-12 rounded-[4rem] border-white/5 hover:bg-white/[0.03] transition-all text-right group">
    <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-indigo-400 mb-8 border border-white/5 shadow-xl group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-3xl font-black mb-6">{title}</h3>
    <p className="text-xl text-slate-500 leading-relaxed font-medium">{desc}</p>
  </div>
);

const StepItem = ({ number, title, desc }: any) => (
  <div className="flex flex-col md:flex-row gap-12 items-start md:items-center text-right">
    <div className="text-8xl font-black text-white/5 leading-none">{number}</div>
    <div>
      <h3 className="text-4xl font-black mb-4">{title}</h3>
      <p className="text-xl text-slate-400 max-w-xl font-medium">{desc}</p>
    </div>
  </div>
);

export default ForCreators;
