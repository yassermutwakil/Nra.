
import React, { useState } from 'react';
import { Send, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('success'), 1500);
    setTimeout(() => setFormStatus('idle'), 5000);
  };

  return (
    <section id="contact-section" className="py-24 px-6 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto">
        <div className="glass rounded-[5rem] overflow-hidden border-white/5 shadow-3xl flex flex-col lg:flex-row">
          <div className="lg:w-2/5 vibrant-gradient p-16 text-right flex flex-col justify-between">
            <div>
              <h3 className="text-4xl font-black text-white mb-6">تواصل مع Nra</h3>
              <p className="text-white/80 text-lg leading-relaxed mb-10">هل لديك استفسار خاص؟ أو ترغب في حلول مخصصة لشركتك؟ فريقنا جاهز للرد عليك خلال دقائق.</p>
              <div className="space-y-6">
                <div className="flex items-center gap-6 text-right">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center"><Phone size={20}/></div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">دعم مباشر</p>
                    <p className="font-bold">+966 500 000 000</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-right">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center"><MessageSquare size={20}/></div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">البريد الإلكتروني</p>
                    <p className="font-bold">hello@nra.mena</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-10 border-t border-white/10">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Nra | Building Bridges in MENA</p>
            </div>
          </div>

          <div className="lg:w-3/5 p-16 bg-black/40">
            {formStatus === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-reveal">
                <div className="w-24 h-24 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mb-8 shadow-2xl border border-emerald-500/20">
                  <CheckCircle2 size={48} />
                </div>
                <h4 className="text-3xl font-black text-white mb-4">تم الإرسال بنجاح!</h4>
                <p className="text-slate-400 font-medium">شكراً لتواصلك مع Nra. فريقنا سيقوم بمراجعة طلبك والرد عليك قريباً جداً.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-right">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pr-4">الاسم الكامل</label>
                    <input required type="text" placeholder="مثال: أحمد محمد" className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold outline-none focus:border-indigo-500 transition-all text-right shadow-inner" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pr-4">رقم الهاتف</label>
                    <input required type="tel" placeholder="+966 5..." className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold outline-none focus:border-indigo-500 transition-all text-left dir-ltr shadow-inner" />
                  </div>
                </div>

                <div className="space-y-3 text-right">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pr-4">من أنت؟</label>
                  <div className="grid grid-cols-2 gap-4">
                     <label className="relative cursor-pointer">
                        <input type="radio" name="role" value="creator" className="peer sr-only" defaultChecked />
                        <div className="p-4 glass rounded-2xl border border-white/10 text-center font-black text-sm text-slate-500 peer-checked:bg-white peer-checked:text-black transition-all">صانع محتوى / مبدع</div>
                     </label>
                     <label className="relative cursor-pointer">
                        <input type="radio" name="role" value="brand" className="peer sr-only" />
                        <div className="p-4 glass rounded-2xl border border-white/10 text-center font-black text-sm text-slate-500 peer-checked:bg-white peer-checked:text-black transition-all">صاحب علامة تجارية</div>
                     </label>
                  </div>
                </div>

                <div className="space-y-3 text-right">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pr-4">نص الرسالة أو الاستفسار</label>
                  <textarea required placeholder="اكتب رسالتك هنا..." className="w-full p-6 rounded-2xl bg-white/5 border border-white/10 text-white font-medium text-lg outline-none focus:border-indigo-500 transition-all text-right min-h-[150px] shadow-inner" />
                </div>

                <button 
                  disabled={formStatus === 'sending'}
                  type="submit" 
                  className="w-full py-6 bg-white text-black rounded-full font-black text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-4 disabled:opacity-50"
                >
                  {formStatus === 'sending' ? 'جاري الإرسال...' : <><Send size={20}/> إرسال الرسالة</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
