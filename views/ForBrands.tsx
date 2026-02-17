
import React from 'react';
import { Target, BarChart3, Users, Zap, Briefcase, ShieldCheck, Search, ArrowRight } from 'lucide-react';

const ForBrands: React.FC<{ onJoin: () => void }> = ({ onJoin }) => {
  return (
    <div className="bg-[#030712] text-white">
      {/* Hero Section */}
      <section className="pt-20 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full mb-10 animate-reveal border-white/10">
            <Briefcase className="text-rose-400" size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">حلول الأعمال من Nra</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-tight">
            توسع بذكاء عبر <br />
            <span className="gradient-text">قوة المحتوى الأصيل.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            اعثر على المبدعين الذين يثق بهم جمهورك. Nra تمنحك الدقة في الاختيار، والشفافية في التنفيذ، والنتائج القابلة للقياس.
          </p>
          <button onClick={onJoin} className="px-16 py-8 bg-white text-black rounded-full font-black text-2xl hover:scale-105 transition-all shadow-3xl">أطلق حملتك الأولى</button>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="py-24 px-6 bg-rose-600/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard 
              icon={<Target size={28}/>}
              title="استهداف دقيق بالذكاء الاصطناعي"
              desc="لا تعتمد على عدد المتابعين فقط. محركنا يحلل الـ DNA للمبدعين لضمان تطابق قيمهم مع علامتك التجارية."
              color="text-rose-400"
            />
            <ValueCard 
              icon={<BarChart3 size={28}/>}
              title="تتبع العائد (ROI) لحظياً"
              desc="راقب المبيعات، النقرات، ومعدلات التحويل لكل مبدع بشكل منفصل عبر لوحة تحكم Affiliate متكاملة."
              color="text-amber-400"
            />
            <ValueCard 
              icon={<ShieldCheck size={28}/>}
              title="محتوى UGC عالي الجودة"
              desc="احصل على فيديوهات إبداعية أصلية تزيد من ثقة جمهورك وتخفض تكلفة الاستحواذ على العميل."
              color="text-emerald-400"
            />
          </div>
        </div>
      </section>

      {/* Why Nra Section */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 text-right">
            <h2 className="text-5xl font-black leading-tight">لماذا تختار العلامات التجارية الرائدة Nra؟</h2>
            <div className="space-y-8">
              <CheckItem title="توفير الوقت" desc="تقليص عملية البحث والتواصل من أسابيع إلى دقائق عبر نظام المطابقة الفوري." />
              <CheckItem title="إدارة العقود" desc="أتمتة كاملة للعقود وحقوق الاستخدام لضمان حماية قانونية لعلامتك التجارية." />
              <CheckItem title="جودة مضمونة" desc="نظام مراجعة مدمج يضمن استلامك للمحتوى وفق المعايير التي حددتها في الـ Brief." />
            </div>
          </div>
          <div className="glass p-16 rounded-[4rem] border-rose-500/20 bg-rose-500/[0.02] shadow-3xl text-center">
            <div className="text-7xl font-black text-white mb-6 tracking-tighter">3.5x</div>
            <p className="text-2xl font-bold text-rose-400 mb-8">متوسط العائد على الإنفاق الإعلاني (ROAS)</p>
            <p className="text-slate-500 text-lg leading-relaxed">العلامات التجارية التي تستخدم Nra تحقق نمواً أسرع وتفاعلاً أعمق بفضل الشراكات المبنية على البيانات لا العاطفة.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const ValueCard = ({ icon, title, desc, color }: any) => (
  <div className="glass p-10 rounded-[3.5rem] border-white/5 hover:bg-white/[0.04] transition-all text-right shadow-2xl group">
    <div className={`w-14 h-14 glass rounded-2xl flex items-center justify-center mb-8 border border-white/5 shadow-xl group-hover:scale-110 transition-transform ${color}`}>{icon}</div>
    <h3 className="text-2xl font-black mb-4">{title}</h3>
    <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

const CheckItem = ({ title, desc }: any) => (
  <div className="flex gap-6 text-right">
    <div className="mt-1"><Zap className="text-rose-500" size={20}/></div>
    <div>
      <h4 className="text-2xl font-black text-white mb-2">{title}</h4>
      <p className="text-lg text-slate-400 font-medium">{desc}</p>
    </div>
  </div>
);

export default ForBrands;
