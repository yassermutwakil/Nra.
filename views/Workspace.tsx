
import React, { useState } from 'react';
import { UserProfile, Deal } from '../types';
import { Briefcase, Clock, CheckCircle2, DollarSign, ArrowRight, MessageSquare, Send, FileText, ChevronRight, X, Sparkles, Star } from 'lucide-react';

const Workspace: React.FC<{ user: UserProfile | null }> = ({ user }) => {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const isCreator = user?.role === 'creator';

  const mockDeals: Deal[] = [
    {
      id: 'd1',
      title: 'حملة شواحن Solar X',
      brandId: 'b1',
      creatorId: '123',
      status: 'Active',
      payoutModel: 'Fixed',
      amount: 4500,
      deadline: '2024-05-20',
      tasks: [
        { id: 't1', label: 'اعتماد السيناريو (Draft)', completed: true },
        { id: 't2', label: 'تسليم المسودة الأولى', completed: false },
        { id: 't3', label: 'التسليم النهائي', completed: false },
      ],
      deliverables: ['1x UGC Video (9:16)', '3x High-res photos']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 text-right animate-reveal">
      <header className="mb-16">
         <h1 className="text-6xl font-black text-white tracking-tighter mb-4 leading-none">مساحة العمل</h1>
         <p className="text-xl text-slate-400 font-medium">أدر صفقاتك، نفذ مهامك، واضمن أرباحك.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Pipeline View */}
         <div className="lg:col-span-4 space-y-6">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-8 pr-4">الصفقات النشطة</h3>
            <div className="space-y-4">
               {mockDeals.map(deal => (
                  <div 
                    key={deal.id} 
                    onClick={() => setSelectedDeal(deal)}
                    className={`bento-card p-8 rounded-[2.5rem] cursor-pointer transition-all border-white/5 ${selectedDeal?.id === deal.id ? 'border-indigo-500/50 bg-indigo-500/5 shadow-2xl scale-[1.02]' : 'hover:bg-white/5'}`}
                  >
                     <div className="flex justify-between items-start mb-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${deal.status === 'Active' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                           {deal.status === 'Active' ? 'نشط' : 'مكتمل'}
                        </span>
                        <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10"></div>
                     </div>
                     <h4 className="text-2xl font-black text-white mb-2">{deal.title}</h4>
                     <div className="flex items-center gap-4 text-slate-500 text-xs font-bold mb-6">
                        <span className="flex items-center gap-1"><Clock size={12}/> {deal.deadline}</span>
                        <span className="flex items-center gap-1"><DollarSign size={12}/> ${deal.amount}</span>
                     </div>
                     <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500" style={{ width: '40%' }}></div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Execution Workspace */}
         <div className="lg:col-span-8">
            {selectedDeal ? (
               <div className="bento-card p-12 rounded-[4rem] bg-white/[0.01] border-white/10 shadow-3xl animate-reveal h-full flex flex-col">
                  <div className="flex justify-between items-start mb-16 border-b border-white/5 pb-10">
                     <div>
                        <h2 className="text-5xl font-black text-white tracking-tight mb-4">{selectedDeal.title}</h2>
                        <div className="flex gap-4">
                           <span className="text-indigo-400 font-bold text-sm">نظام الدفع: {selectedDeal.payoutModel}</span>
                           <span className="text-slate-600 font-bold text-sm">|</span>
                           <span className="text-slate-400 font-bold text-sm">عقد رقم #DEAL-{selectedDeal.id.toUpperCase()}</span>
                        </div>
                     </div>
                     <div className="flex gap-3">
                        <button className="p-4 glass rounded-full text-slate-400 hover:text-white transition-all shadow-xl"><MessageSquare size={24}/></button>
                        <button className="p-4 glass rounded-full text-slate-400 hover:text-white transition-all shadow-xl"><FileText size={24}/></button>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 flex-grow">
                     <div className="space-y-12">
                        <section>
                           <h5 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-3">
                              <span className="w-2 h-2 rounded-full bg-indigo-500"></span> قائمة المهام
                           </h5>
                           <div className="space-y-4">
                              {selectedDeal.tasks.map(task => (
                                 <div key={task.id} className="flex items-center gap-6 p-6 glass rounded-[2rem] border-white/5 bg-white/[0.01] transition-all hover:bg-white/5 group">
                                    <button className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all shadow-inner ${task.completed ? 'bg-indigo-500 border-indigo-400 text-white' : 'border-white/10 text-transparent group-hover:border-white/30'}`}>
                                       <CheckCircle2 size={20}/>
                                    </button>
                                    <span className={`text-xl font-bold ${task.completed ? 'text-slate-500 line-through' : 'text-white'}`}>{task.label}</span>
                                 </div>
                              ))}
                           </div>
                        </section>

                        <section className="glass p-10 rounded-[3rem] border-white/5 bg-indigo-500/[0.02]">
                           <h5 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-6">الملخص المالي</h5>
                           <div className="flex justify-between items-end">
                              <div>
                                 <p className="text-4xl font-black text-white">${selectedDeal.amount.toLocaleString()}</p>
                                 <p className="text-xs text-slate-500 font-bold mt-2">بانتظار التسليم النهائي</p>
                              </div>
                              <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-emerald-400 shadow-2xl border border-white/10">
                                 <DollarSign size={28}/>
                              </div>
                           </div>
                        </section>
                     </div>

                     <div className="space-y-12">
                        <section>
                           <h5 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-8">رفع المخرجات النهائية</h5>
                           <div className="border-4 border-dashed border-white/5 rounded-[4rem] p-16 text-center hover:border-white/20 transition-all bg-white/[0.01] group cursor-pointer">
                              <div className="w-20 h-20 glass rounded-3xl flex items-center justify-center mx-auto mb-8 text-slate-500 group-hover:scale-110 transition-transform shadow-2xl border border-white/10"><Send size={40}/></div>
                              <p className="text-2xl font-black text-white mb-4">اضغط أو اسحب الملف هنا</p>
                              <p className="text-sm text-slate-600 font-medium">MP4, MOV, JPG, or PDF (Max 500MB)</p>
                           </div>
                        </section>

                        <section className="glass p-10 rounded-[3rem] border-white/5 bg-white/[0.01] shadow-2xl">
                           <h5 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-8">تعليمات البراند (Brief)</h5>
                           <div className="space-y-4">
                              {selectedDeal.deliverables.map((d, i) => (
                                 <div key={i} className="flex items-center gap-4 text-slate-400 font-bold">
                                    <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                                    {d}
                                 </div>
                              ))}
                           </div>
                        </section>
                     </div>
                  </div>
               </div>
            ) : (
               <div className="h-full flex flex-col items-center justify-center py-48 text-center glass rounded-[5rem] border-dashed border-white/5 bg-white/[0.01]">
                  <div className="w-24 h-24 glass rounded-[2rem] flex items-center justify-center text-slate-800 mb-10 shadow-3xl border border-white/5"><Briefcase size={48}/></div>
                  <h3 className="text-4xl font-black text-slate-500 mb-6">اختر صفقة للبدء.</h3>
                  <p className="text-xl text-slate-700 font-bold uppercase tracking-widest">تظهر هنا الصفقات التي تم التعاقد عليها فقط.</p>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default Workspace;
