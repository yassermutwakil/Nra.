
import React from 'react';
import { Sparkles, Users, Rocket, Globe, Award, Heart, Target, Zap, ShieldCheck, GraduationCap, TrendingUp, BarChart3 } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-[#030712] text-white min-h-screen overflow-hidden selection:bg-indigo-500/30">
      {/* 1. HERO SECTION - The Vision */}
      <section className="relative pt-32 pb-20 px-6 z-10 text-right">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-indigo-600/5 blur-[120px] rounded-full -z-10"></div>
        
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full mb-10 animate-reveal border-white/10">
            <GraduationCap className="text-[#0066FF]" size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">نرى: طموح جيل.. سيادة اقتصاد</span>
          </div>
          
          <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter mb-10 leading-[0.85] animate-reveal">
            القصة خلف <br />
            <span className="gradient-text">نرى.</span>
          </h1>
          
          <div className="max-w-4xl mr-auto animate-reveal">
            <p className="text-3xl md:text-4xl text-white font-bold mb-8 leading-tight">
              نحن لسنا مجرد منصة تقنية؛ نحن "شركة طلابية جامعية" تأسست في عام 2026 لنعيد تعريف قواعد اللعبة.
            </p>
          </div>
        </div>
      </section>

      {/* 2. OUR ORIGIN - The Student Spark */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 glass p-16 rounded-[4.5rem] border-white/5 bg-white/[0.01] shadow-3xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none"><Users size={150}/></div>
             <h3 className="text-4xl font-black mb-8 tracking-tight">من قاعات الجامعة إلى ريادة السوق</h3>
             <p className="text-xl text-slate-400 font-medium leading-[2.2] text-right">
               جاءت فكرة **نرى** من ملاحظة عميقة للفجوة في السوق؛ حيث يمتلك المبدعون الموهبة ولكن يفتقرون للنظام، وتمتلك البراندات الميزانية ولكن تفتقر للدقة. كطلاب جامعيين نؤمن بقدرة جيلنا على إحداث تغيير حقيقي، قررنا ألا ننتظر المستقبل، بل أن نصنعه بأنفسنا في عام 2026.
             </p>
          </div>
          <div className="order-1 lg:order-2 space-y-12">
             <div className="grid grid-cols-2 gap-6">
                <AboutStatCard icon={<Users/>} label="فريق طلابي" value="100%" />
                <AboutStatCard icon={<Rocket/>} label="سنة التأسيس" value="2026" />
             </div>
             <div className="glass p-10 rounded-[3rem] border-[#0066FF]/20 bg-[#0066FF]/5 text-right">
                <p className="text-2xl text-white font-black mb-4">"نؤمن بأن جيلنا قادر على قيادة دفة الاقتصاد الإبداعي محلياً وإقليمياً."</p>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">— مؤسسو نرى</p>
             </div>
          </div>
        </div>
      </section>

      {/* 3. IMPACT & VISION 2030 */}
      <section className="py-32 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-6xl font-black mb-8 tracking-tighter">التأثير والسيادة الاقتصادية</h2>
            <p className="text-2xl text-slate-500 font-medium max-w-3xl mx-auto">نرى هي مساهمتنا في تحقيق رؤية المملكة؛ تمكين المحتوى المحلي وتعزيز النمو الرقمي.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <ImpactCard 
              icon={<TrendingUp/>} 
              title="تغيير الجيل الحالي" 
              desc="نهدف لتمكين جيل الشباب من تحويل شغفهم إلى مصدر دخل مستدام ومستقر اقتصادياً."
            />
            <ImpactCard 
              icon={<Globe/>} 
              title="التوسع الإقليمي" 
              desc="انطلقنا من المملكة العربية السعودية وطموحنا يمتد ليغطي أسواق المنطقة بأكملها بحلول تقنية مبتكرة."
            />
            <ImpactCard 
              icon={<Target/>} 
              title="رؤية المملكة 2030" 
              desc="نساهم في تنويع الاقتصاد من خلال تطوير قطاع 'اقتصاد المبدعين' ورفع جودة الإنتاج الرقمي المحلي."
            />
          </div>
        </div>
      </section>

      {/* 4. WHY WE CREATED NRA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 vibrant-gradient opacity-5 blur-[150px] -z-10"></div>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-16 tracking-tighter">لماذا ابتكرنا نرى؟</h2>
          <div className="glass p-16 rounded-[5rem] border-white/5 bg-black/40 text-right space-y-10">
            <p className="text-2xl md:text-3xl text-slate-300 font-medium leading-relaxed">
              ابتكرنا **نرى** لأننا رأينا فرصة ستؤثر جذرياً على الاقتصاد الإبداعي. السوق كان بحاجة إلى "منصة تفهم لغتنا" كجيل جديد، وتلبي معايير الاحترافية للعلامات التجارية العالمية. 
            </p>
            <p className="text-2xl md:text-3xl text-white font-black leading-relaxed">
              نحن هنا لنثبت أن الابتكار الجامعي يمكنه أن يتحدى النماذج التقليدية ويخلق سوقاً أكثر عدلاً وشفافية للجميع.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const AboutStatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="glass p-10 rounded-[3rem] text-center border-white/5 transition-all hover:bg-white/5">
    <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-[#0066FF] mx-auto mb-6 shadow-xl border border-white/5">{icon}</div>
    <p className="text-4xl font-black text-white mb-2">{value}</p>
    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{label}</p>
  </div>
);

const ImpactCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="bento-card p-12 rounded-[4rem] text-right group">
    <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-[#0066FF] mb-8 border border-white/5 shadow-xl group-hover:scale-110 transition-transform">{icon}</div>
    <h4 className="text-2xl font-black text-white mb-6 tracking-tight">{title}</h4>
    <p className="text-lg text-slate-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

export default About;
