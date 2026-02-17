
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign, MousePointer2, Briefcase, ChevronRight, Lightbulb, Copy, Check, Tag, Rocket, Layout, ExternalLink, Award, Sparkles, ShieldCheck, Zap, Calendar, Package, Send, X, Clock, CheckCircle } from 'lucide-react';
import { MOCK_STATS, MOCK_PROGRAMS, MOCK_LINKS, BOOST_PACKAGES } from '../constants';
import { geminiService } from '../services/geminiService';
import { BoostPackage } from '../types';

const StatCard: React.FC<{ title: string, value: string, change: string, icon: React.ReactNode, color: string }> = ({ title, value, change, icon, color }) => (
  <div className="bento-card p-10 rounded-[3rem] shadow-2xl bg-white/[0.01] border-white/5">
    <div className="flex justify-between items-start mb-8">
      <div className={`w-14 h-14 glass rounded-2xl flex items-center justify-center border border-white/5 ${color} shadow-lg`}>{icon}</div>
      <span className={`text-[10px] font-black px-3 py-1.5 rounded-full bg-white/5 ${change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{change}</span>
    </div>
    <h4 className="text-sm text-slate-500 mb-2 font-black uppercase tracking-widest">{title}</h4>
    <p className="text-4xl font-black text-white tracking-tighter">{value}</p>
  </div>
);

const CreatorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'affiliate' | 'boost' | 'workspace'>('analytics');
  const [advice, setAdvice] = useState<string>('');
  const [adviceLoading, setAdviceLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<BoostPackage | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    const fetchAdvice = async () => {
      setAdviceLoading(true);
      try {
        const result = await geminiService.generateAffiliateAdvice(MOCK_STATS);
        setAdvice(result);
      } catch (e) {
        setAdvice("استهدف جمهور المنطقة الوسطى في حملتك القادمة لزيادة التفاعل.");
      } finally {
        setAdviceLoading(false);
      }
    };
    fetchAdvice();
  }, []);

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
      setSelectedPackage(null);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 text-right animate-reveal">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-white tracking-tighter leading-none">بوابة المبدع</h1>
          <div className="flex items-center gap-4">
             <span className="px-4 py-2 bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase rounded-full border border-amber-500/20 flex items-center gap-2 shadow-inner"><Award size={14}/> المستوى الذهبي</span>
             <span className="px-4 py-2 bg-indigo-500/10 text-indigo-500 text-[10px] font-black uppercase rounded-full border border-indigo-500/20 flex items-center gap-2"><ShieldCheck size={14}/> مبدع موثق</span>
          </div>
        </div>
        <div className="flex glass p-1.5 rounded-full border border-white/10 shadow-2xl">
          <button onClick={() => setActiveTab('analytics')} className={`px-10 py-3 rounded-full text-[10px] font-black uppercase transition-all ${activeTab === 'analytics' ? 'bg-white text-black shadow-xl' : 'text-slate-500 hover:text-white'}`}>التحليلات</button>
          <button onClick={() => setActiveTab('affiliate')} className={`px-10 py-3 rounded-full text-[10px] font-black uppercase transition-all ${activeTab === 'affiliate' ? 'bg-white text-black shadow-xl' : 'text-slate-500 hover:text-white'}`}>العمولات</button>
          <button onClick={() => setActiveTab('boost')} className={`px-10 py-3 rounded-full text-[10px] font-black uppercase transition-all ${activeTab === 'boost' ? 'bg-indigo-600 text-white shadow-xl scale-105' : 'text-slate-500 hover:text-white'}`}>تطوير العلامة</button>
          <button onClick={() => setActiveTab('workspace')} className={`px-10 py-3 rounded-full text-[10px] font-black uppercase transition-all ${activeTab === 'workspace' ? 'bg-white text-black shadow-xl' : 'text-slate-500 hover:text-white'}`}>مساحة العمل</button>
        </div>
      </header>

      {activeTab === 'analytics' && (
        <div className="space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="إجمالي الأرباح" value="$24,500" change="+22%" icon={<DollarSign size={24} />} color="text-emerald-400" />
            <StatCard title="النقرات الحية" value="3,450" change="+14%" icon={<MousePointer2 size={24} />} color="text-indigo-400" />
            <StatCard title="أوسمة النشاط" value="12" change="+2" icon={<Award size={24} />} color="text-purple-400" />
            <StatCard title="درجة الموثوقية" value="98%" change="Perfect" icon={<ShieldCheck size={24} />} color="text-amber-400" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 bento-card p-12 rounded-[3.5rem] bg-white/[0.01]">
              <h3 className="text-2xl font-black text-white mb-12 flex items-center gap-4"><TrendingUp size={24} className="text-indigo-400"/> منحنى النمو المالي</h3>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MOCK_STATS}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} reversed={true} />
                    <YAxis orientation="right" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} />
                    <Tooltip contentStyle={{backgroundColor: '#030712', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'right'}} />
                    <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={4} fill="url(#colorRev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="lg:col-span-4 bento-card p-12 rounded-[3.5rem] vibrant-gradient text-white shadow-3xl group">
              <h3 className="text-2xl font-black mb-10 flex items-center gap-4"><Lightbulb size={28} /> استراتيجية اليوم</h3>
              <p className="text-2xl font-medium leading-relaxed italic group-hover:scale-105 transition-transform duration-500">
                {adviceLoading ? 'جاري التحليل الإحصائي...' : advice}
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'boost' && (
        <div className="space-y-20 animate-reveal">
           <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-7xl font-black text-white mb-8 tracking-tighter">ارتقِ بمسيرتك المهنية.</h2>
              <p className="text-2xl text-slate-400 leading-relaxed max-w-2xl mx-auto">نحن نوفر لك الأدوات والخبراء لبناء هوية رقمية تنافس العلامات التجارية العالمية.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {BOOST_PACKAGES.filter(p => p.category === 'Creator').map(pkg => (
                <div key={pkg.id} className="bento-card p-16 rounded-[4.5rem] group border-indigo-500/20 bg-indigo-500/[0.02] shadow-2xl flex flex-col justify-between">
                   <div>
                      <h4 className="text-5xl font-black text-white mb-6 tracking-tight">{pkg.title}</h4>
                      <p className="text-2xl text-slate-500 mb-12 leading-relaxed">{pkg.description}</p>
                      <div className="space-y-6 mb-16">
                          {pkg.features.map(f => (
                            <div key={f} className="flex items-center gap-5 text-xl text-slate-300 font-bold">
                               <div className="w-8 h-8 glass rounded-full flex items-center justify-center border border-indigo-500/30 text-indigo-400">
                                  <Check size={16}/>
                               </div>
                               {f}
                            </div>
                          ))}
                      </div>
                   </div>
                   <div className="flex justify-between items-center pt-10 border-t border-white/5">
                      <div>
                        <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mb-2">سعر الحزمة</p>
                        <p className="text-5xl font-black text-white tracking-tighter">${pkg.price}</p>
                      </div>
                      <button onClick={() => setSelectedPackage(pkg)} className="px-16 py-6 bg-white text-black rounded-full font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-xl">اطلب الآن</button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}

      {selectedPackage && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
           <div className="fixed inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setSelectedPackage(null)}></div>
           <div className="bg-[#030712] rounded-[4rem] w-full max-w-3xl relative shadow-2xl border border-white/10 animate-reveal overflow-hidden">
              <div className="p-20 text-center">
                 <div className="flex justify-between items-center mb-10">
                    <h2 className="text-4xl font-black text-white">حجز حزمة التطوير</h2>
                    <button onClick={() => setSelectedPackage(null)} className="p-4 glass rounded-full"><X size={24}/></button>
                 </div>
                 {orderSuccess ? (
                    <div className="py-20 animate-reveal">
                       <div className="w-24 h-24 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-8">
                          <CheckCircle size={48}/>
                       </div>
                       <h3 className="text-3xl font-black text-white mb-4">تم استلام طلبك!</h3>
                       <p className="text-xl text-slate-500">سيتواصل معك فريقنا خلال 24 ساعة.</p>
                    </div>
                 ) : (
                    <form className="space-y-8" onSubmit={handleOrder}>
                       <div className="p-8 glass rounded-[2.5rem] border-white/5 text-right mb-12">
                          <p className="text-xs text-slate-500 font-black uppercase mb-2 tracking-widest">الحزمة المختارة</p>
                          <p className="text-3xl font-black text-white">{selectedPackage.title}</p>
                          <p className="text-xl text-indigo-400 font-bold mt-2">${selectedPackage.price}</p>
                       </div>
                       <button type="submit" className="w-full py-8 bg-white text-black rounded-[2.5rem] font-black text-2xl hover:scale-105 transition-all shadow-2xl">تأكيد الطلب والدفع</button>
                    </form>
                 )}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default CreatorDashboard;
