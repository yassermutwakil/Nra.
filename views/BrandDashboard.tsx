
import React, { useState } from 'react';
import { 
  Plus, ChevronRight, DollarSign, ImageIcon, Tag, Activity, LayoutDashboard, Target, ArrowLeft, Send, CheckCircle, BarChart3, Clock, TrendingUp, ShieldCheck, X, Calendar, Package, ArrowUpRight
} from 'lucide-react';
import { MOCK_CAMPAIGNS, MOCK_CREATORS, MOCK_PROGRAMS, BOOST_PACKAGES } from '../constants';
import { Campaign, AffiliateProgram, BoostPackage } from '../types';

const BrandDashboard: React.FC = () => {
  const [view, setView] = useState<'list' | 'create' | 'detail' | 'affiliate' | 'boost'>('list');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<BoostPackage | null>(null);

  const handleCreateCampaign = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCampaign: Campaign = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      budget: Number(formData.get('budget')),
      spent: 0,
      status: 'Active',
      brandId: 'b1',
      creatorsInvited: ['1'],
      deadline: '2024-12-31',
      deliverables: ['فيديو مخصص'],
      roiMetrics: {
        conversions: 0,
        costPerAsset: 0,
        avgDeliveryTimeDays: 0,
        totalRevenue: 0
      }
    };
    setCampaigns([newCampaign, ...campaigns]);
    setSuccessMsg("تم إطلاق الحملة بنجاح!");
    setTimeout(() => { setSuccessMsg(null); setView('list'); }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 text-right animate-reveal">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
        <div>
          <h1 className="text-5xl font-black text-white mb-4 tracking-tighter">مركز قيادة العلامة</h1>
          <p className="text-lg text-slate-400 font-medium">أطلق حملاتك وراقب نتائجك بدقة احترافية.</p>
        </div>
        <div className="flex glass p-1.5 rounded-full border border-white/10 shadow-2xl">
          <button onClick={() => setView('list')} className={`px-10 py-3 rounded-full text-[10px] font-black uppercase transition-all ${view !== 'affiliate' && view !== 'boost' ? 'bg-white text-black shadow-lg' : 'text-slate-500 hover:text-white'}`}>إدارة الحملات</button>
          <button onClick={() => setView('affiliate')} className={`px-10 py-3 rounded-full text-[10px] font-black uppercase transition-all ${view === 'affiliate' ? 'bg-white text-black shadow-lg' : 'text-slate-500 hover:text-white'}`}>العمولات</button>
          <button onClick={() => setView('boost')} className={`px-10 py-3 rounded-full text-[10px] font-black uppercase transition-all ${view === 'boost' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}>حلول الأعمال</button>
        </div>
      </header>

      {successMsg && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] glass px-10 py-5 rounded-[2rem] border-emerald-500/50 flex items-center gap-4 text-emerald-400 font-black animate-reveal shadow-2xl">
           <CheckCircle /> {successMsg}
        </div>
      )}

      {view === 'list' && (
        <div className="space-y-12">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard title="إجمالي الإنفاق" value="$45,000" change="+12%" icon={<DollarSign size={24}/>} color="text-indigo-400" />
              <StatCard title="عائد الاستثمار (ROI)" value="3.5x" change="+0.4x" icon={<TrendingUp size={24}/>} color="text-emerald-400" />
              <StatCard title="المبيعات (Affiliate)" value="1,250" change="+18%" icon={<Tag size={24}/>} color="text-amber-400" />
              <StatCard title="متوسط زمن التنفيذ" value="4.5 يوم" change="-0.5" icon={<Clock size={24}/>} color="text-rose-400" />
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8">
                 <div className="bento-card rounded-[3.5rem] overflow-hidden bg-white/[0.01]">
                    <div className="p-10 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                       <h3 className="text-3xl font-black text-white">الحملات النشطة</h3>
                       <button onClick={() => setView('create')} className="px-8 py-3 bg-white text-black rounded-full font-black text-xs hover:scale-105 transition-all shadow-lg">حملة جديدة</button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-right border-collapse">
                        <thead className="bg-white/5 text-[10px] uppercase font-black text-slate-500 tracking-widest">
                          <tr><th className="px-10 py-8">اسم الحملة</th><th className="px-10 py-8">الحالة</th><th className="px-10 py-8">الميزانية</th><th className="px-10 py-8">النتائج (ROI)</th></tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {campaigns.map(c => (
                            <tr key={c.id} className="hover:bg-white/5 cursor-pointer group" onClick={() => { setSelectedCampaign(c); setView('detail'); }}>
                              <td className="px-10 py-10"><p className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors">{c.title}</p><p className="text-xs text-slate-500">{c.deadline}</p></td>
                              <td className="px-10 py-10"><span className="text-[10px] font-black px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">نشط</span></td>
                              <td className="px-10 py-10"><p className="text-xl font-black text-white">${c.budget.toLocaleString()}</p></td>
                              <td className="px-10 py-10 text-emerald-400 font-black">{(c.roiMetrics?.conversions || 0) > 0 ? '3.5x' : 'جاري الجمع...'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                 </div>
              </div>
              <div className="lg:col-span-4 bento-card p-10 rounded-[3.5rem] relative overflow-hidden bg-indigo-600/10 border-indigo-500/20 shadow-2xl">
                 <h3 className="text-2xl font-black text-white mb-10 flex items-center gap-4"><Activity size={28}/> نبض الشراكات</h3>
                 <div className="space-y-8">
                    {[1, 2].map(i => (
                      <div key={i} className="flex justify-between items-center border-b border-white/5 pb-6">
                        <div>
                           <span className="text-slate-400 font-bold block">{MOCK_CREATORS[i-1].name}</span>
                           <span className="text-[10px] text-slate-600 font-black uppercase">تسليم المحتوى قريباً</span>
                        </div>
                        <span className="text-emerald-400 font-black flex items-center gap-2">+{10 * i}% <ArrowUpRight size={14}/></span>
                      </div>
                    ))}
                    <p className="text-sm text-slate-500 italic leading-relaxed pt-4">نظام التنبيهات يكتشف تأخيراً محتملاً في حملة "انطلاقة الشتاء".</p>
                 </div>
              </div>
           </div>
        </div>
      )}

      {view === 'create' && (
        <div className="max-w-4xl mx-auto animate-reveal">
          <button onClick={() => setView('list')} className="flex items-center gap-4 text-slate-500 hover:text-white mb-10 font-black text-xl"><ArrowLeft size={24} /> العودة</button>
          <div className="bento-card rounded-[4rem] overflow-hidden p-16 bg-white/[0.01]">
            <form onSubmit={handleCreateCampaign} className="space-y-12">
              <h2 className="text-6xl font-black text-white tracking-tighter">إطلاق حملة استراتيجية</h2>
              <div className="space-y-4"><label className="text-xs font-black text-slate-500 uppercase tracking-widest">اسم الحملة</label><input name="title" required type="text" className="w-full p-8 rounded-3xl bg-white/5 border border-white/10 text-white font-black text-2xl outline-none focus:border-white transition-all text-right shadow-inner" placeholder="مثلاً: انطلاقة الوعي التقني" /></div>
              <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-4"><label className="text-xs font-black text-slate-500 uppercase tracking-widest">الميزانية (USD)</label><input name="budget" required type="number" className="w-full p-8 rounded-3xl bg-white/5 border border-white/10 text-white font-black text-2xl outline-none focus:border-white transition-all text-center shadow-inner" placeholder="50,000" /></div>
                 <div className="space-y-4"><label className="text-xs font-black text-slate-500 uppercase tracking-widest">تاريخ الانتهاء</label><input name="deadline" type="date" className="w-full p-8 rounded-3xl bg-white/5 border border-white/10 text-white font-black text-2xl outline-none focus:border-white transition-all text-center shadow-inner" /></div>
              </div>
              <div className="space-y-4"><label className="text-xs font-black text-slate-500 uppercase tracking-widest">وصف الأهداف</label><textarea name="description" required className="w-full p-8 rounded-3xl bg-white/5 border border-white/10 text-white font-medium text-xl outline-none focus:border-white transition-all text-right min-h-[200px]" placeholder="ما الذي ترغب في تحقيقه من خلال هذه الشراكات؟" /></div>
              <button type="submit" className="w-full py-10 bg-white text-black rounded-[3rem] font-black text-3xl hover:scale-[1.03] active:scale-95 transition-all shadow-2xl">إطلاق الحملة فوراً</button>
            </form>
          </div>
        </div>
      )}

      {view === 'boost' && (
        <div className="space-y-20 animate-reveal">
           <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-7xl font-black text-white mb-8 tracking-tighter">حلول نمو ذكية.</h2>
              <p className="text-2xl text-slate-400 leading-relaxed max-w-2xl mx-auto">خدمات استشارية وفنية تهدف لتقليل revision cycles وزيادة ROI حملات المبدعين بشكل ملموس.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {BOOST_PACKAGES.filter(p => p.category === 'Brand').map(pkg => (
                <div key={pkg.id} className="bento-card p-16 rounded-[4.5rem] group border-emerald-500/20 bg-emerald-500/[0.02] shadow-2xl flex flex-col justify-between">
                   <div>
                      <h4 className="text-5xl font-black text-white mb-6 tracking-tight">{pkg.title}</h4>
                      <p className="text-2xl text-slate-500 mb-12 leading-relaxed">{pkg.description}</p>
                      <div className="space-y-6 mb-16">
                          {pkg.features.map(f => (
                            <div key={f} className="flex items-center gap-5 text-xl text-slate-300 font-bold">
                               <div className="w-8 h-8 glass rounded-full flex items-center justify-center border border-emerald-500/30 text-emerald-400">
                                  <CheckCircle size={16}/>
                               </div>
                               {f}
                            </div>
                          ))}
                      </div>
                   </div>
                   <div className="flex justify-between items-center pt-10 border-t border-white/5">
                      <div>
                        <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mb-2">الاستثمار</p>
                        <p className="text-5xl font-black text-white tracking-tighter">${pkg.price}</p>
                      </div>
                      <button onClick={() => setSelectedPackage(pkg)} className="px-16 py-6 bg-white text-black rounded-full font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-xl">اطلب الآن</button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}

      {view === 'detail' && selectedCampaign && (
        <div className="space-y-16 animate-reveal">
          <button onClick={() => setView('list')} className="flex items-center gap-4 text-slate-500 hover:text-white font-black text-xl transition-all"><ArrowLeft size={24} /> العودة للوحة التحكم</button>
          <div className="bento-card p-16 rounded-[4rem] bg-white/[0.01] border-white/10 shadow-3xl">
            <div className="flex justify-between items-start mb-16">
                <div className="space-y-4">
                    <h2 className="text-7xl font-black text-white tracking-tighter">{selectedCampaign.title}</h2>
                    <p className="text-3xl text-slate-400 font-medium max-w-3xl leading-relaxed italic">"{selectedCampaign.description}"</p>
                </div>
                <div className="flex gap-4">
                    <span className="px-8 py-3 bg-emerald-500/10 text-emerald-400 text-xs font-black uppercase rounded-full border border-emerald-500/20 shadow-inner">الحالة: نشطة</span>
                </div>
            </div>

            <h3 className="text-3xl font-black mb-10 text-white flex items-center gap-4"><BarChart3 size={32} className="text-indigo-400"/> مقاييس الأداء المتقدمة (ROI)</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
               <ROICard label="إجمالي التحويلات" value={selectedCampaign.roiMetrics?.conversions || 0} unit="عملية" color="text-indigo-400" />
               <ROICard label="تكلفة الأصل الإبداعي" value={`$${selectedCampaign.roiMetrics?.costPerAsset || 0}`} unit="لكل فيديو" color="text-amber-400" />
               <ROICard label="زمن التسليم" value={selectedCampaign.roiMetrics?.avgDeliveryTimeDays || 0} unit="أيام" color="text-rose-400" />
               <ROICard label="عائد المبيعات" value={`$${(selectedCampaign.roiMetrics?.totalRevenue || 0).toLocaleString()}`} unit="إجمالي" color="text-emerald-400" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               <div className="space-y-10">
                  <h3 className="text-3xl font-black text-white">المبدعون في الحملة</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {selectedCampaign.creatorsInvited.map(id => {
                        const creator = MOCK_CREATORS.find(c => c.id === id);
                        return creator ? (
                        <div key={id} className="glass p-8 rounded-[2.5rem] flex items-center gap-6 border-white/5 hover:bg-white/5 transition-all shadow-xl">
                            <img src={creator.avatar} className="w-20 h-20 rounded-2xl object-cover shadow-lg" alt="" />
                            <div>
                                <p className="text-xl font-black text-white">{creator.name}</p>
                                <p className="text-sm text-indigo-400 font-bold">{creator.handle}</p>
                            </div>
                        </div>
                        ) : null;
                    })}
                  </div>
               </div>
               <div className="space-y-10">
                  <h3 className="text-3xl font-black text-white">الأهداف والمخرجات</h3>
                  <div className="glass p-10 rounded-[3rem] border-white/5 bg-white/[0.01]">
                     <ul className="space-y-6">
                        {selectedCampaign.deliverables.map((d, i) => (
                           <li key={i} className="flex items-center gap-5 text-xl text-slate-300 font-bold">
                              <div className="w-8 h-8 glass rounded-full flex items-center justify-center border border-indigo-500/30 text-indigo-400 font-black">{i+1}</div>
                              {d}
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Package Order Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
           <div className="fixed inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setSelectedPackage(null)}></div>
           <div className="bg-[#030712] rounded-[4rem] w-full max-w-3xl relative shadow-2xl border border-white/10 animate-reveal overflow-hidden">
              <div className="p-20 text-center">
                 <div className="flex justify-between items-center mb-10">
                    <h2 className="text-4xl font-black text-white">حجز حزمة الأعمال</h2>
                    <button onClick={() => setSelectedPackage(null)} className="p-4 glass rounded-full"><X size={24}/></button>
                 </div>
                 <div className="p-8 glass rounded-[2.5rem] border-white/5 text-right mb-12">
                    <p className="text-xs text-slate-500 font-black uppercase mb-2 tracking-widest">الحزمة الاستراتيجية</p>
                    <p className="text-3xl font-black text-white">{selectedPackage.title}</p>
                    <p className="text-xl text-indigo-400 font-bold mt-2">${selectedPackage.price}</p>
                 </div>
                 <form className="space-y-8" onSubmit={(e) => {e.preventDefault(); setSuccessMsg("تم طلب حزمة الأعمال بنجاح!"); setSelectedPackage(null); setTimeout(() => setSuccessMsg(null), 3000)}}>
                    <div className="text-right space-y-4">
                       <label className="text-xs font-black text-slate-500 uppercase pr-4">رابط المتجر / الموقع الإلكتروني</label>
                       <input required type="url" placeholder="https://..." className="w-full p-6 rounded-3xl bg-white/5 border border-white/10 text-white font-bold outline-none focus:border-indigo-500 transition-all text-left dir-ltr shadow-inner" />
                    </div>
                    <div className="text-right space-y-4">
                       <label className="text-xs font-black text-slate-500 uppercase pr-4">موعد الاجتماع الاستراتيجي</label>
                       <input required type="datetime-local" className="w-full p-6 rounded-3xl bg-white/5 border border-white/10 text-white font-bold outline-none focus:border-indigo-500 transition-all text-left dir-ltr shadow-inner" />
                    </div>
                    <button type="submit" className="w-full py-8 bg-white text-black rounded-[2.5rem] font-black text-2xl hover:scale-105 transition-all shadow-2xl">تأكيد الحجز والدفع</button>
                 </form>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const ROICard: React.FC<{ label: string, value: string | number, unit: string, color: string }> = ({ label, value, unit, color }) => (
  <div className="glass p-10 rounded-[3rem] text-center border-white/5 bg-white/[0.01] shadow-2xl transition-all hover:bg-white/5">
     <p className="text-[11px] text-slate-600 font-black uppercase mb-4 tracking-widest">{label}</p>
     <p className={`text-5xl font-black ${color} tracking-tighter mb-2`}>{value}</p>
     <p className="text-xs text-slate-500 font-bold">{unit}</p>
  </div>
);

const StatCard: React.FC<{ title: string, value: string, change: string, icon: React.ReactNode, color: string }> = ({ title, value, change, icon, color }) => (
  <div className="bento-card p-10 rounded-[3rem] shadow-2xl">
    <div className="flex justify-between items-start mb-8">
      <div className={`w-14 h-14 glass rounded-2xl flex items-center justify-center border border-white/5 ${color} shadow-lg`}>{icon}</div>
      <span className={`text-[10px] font-black px-3 py-1.5 rounded-full bg-white/5 ${change.startsWith('+') || change.startsWith('3') ? 'text-emerald-400' : 'text-rose-400 shadow-inner'}`}>{change}</span>
    </div>
    <h4 className="text-sm text-slate-500 mb-2 font-black uppercase tracking-widest">{title}</h4>
    <p className="text-4xl font-black text-white tracking-tighter">{value}</p>
  </div>
);

export default BrandDashboard;
