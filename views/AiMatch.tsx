
import React, { useState } from 'react';
import { Sparkles, Search, Zap, Star, ShieldCheck, Target, MessageSquare, ArrowRight, BrainCircuit, Users, Briefcase } from 'lucide-react';
import { UserProfile, Creator, Brand } from '../types';
import { MOCK_CREATORS } from '../constants';
import { geminiService } from '../services/geminiService';

const AiMatch: React.FC<{ user: UserProfile | null }> = ({ user }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<any[]>([]);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const isBrand = user?.role === 'brand';

  const handleMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setMatches([]);
    setAnalysis(null);

    try {
      // Simulate AI searching and ranking
      // In a real app, we'd send the query to Gemini to filter/rank our DB
      setTimeout(() => {
        setMatches(MOCK_CREATORS.slice(0, 2)); // Mocked ranked results
        setAnalysis(
          isBrand 
            ? "بناءً على طلبك، تم تحديد هؤلاء المبدعين لأن لديهم جمهوراً متفاعلاً جداً في قطاع التقنية والرياض، مع أسلوب عرض 'Talking Head' الذي يفضله جمهورك المستهدف."
            : "تم العثور على فرص توافق عالية مع علامات تجارية تبحث عن مبدعين في مجال المراجعات الفنية ولديهم نظام عمولات (Affiliate) متقدم."
        );
        setLoading(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 text-right animate-reveal">
      <header className="max-w-4xl mx-auto text-center mb-24">
        <div className="w-20 h-20 vibrant-gradient rounded-[2.5rem] flex items-center justify-center text-white mx-auto mb-10 shadow-3xl animate-pulse">
          <Sparkles size={40} />
        </div>
        <h1 className="text-7xl font-black text-white tracking-tighter mb-8 leading-tight">
          المحرك الذكي <br />
          <span className="gradient-text">AI Match Engine</span>
        </h1>
        <p className="text-2xl text-slate-400 font-medium leading-relaxed">
          تحدث إلى الذكاء الاصطناعي وكأنه خبير تسويق. صف ما تبحث عنه وسنقوم بالمطابقة المثالية بناءً على الـ Fit DNA.
        </p>
      </header>

      <div className="max-w-4xl mx-auto mb-32">
        <form onSubmit={handleMatch} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[4rem] blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
          <div className="relative glass rounded-[4rem] p-4 flex flex-col md:flex-row gap-4 border-white/10 shadow-3xl">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isBrand ? "مثال: ابحث عن مبدع في الرياض، متخصص في التقنية، أسلوبه فكاهي ومناسب لحملة جيل زد..." : "مثال: ابحث عن براندات أزياء تبحث عن شراكات طويلة الأمد في الخليج..."}
              className="flex-grow bg-transparent p-8 text-2xl font-bold text-white outline-none min-h-[160px] resize-none text-right"
            />
            <button 
              disabled={loading}
              className="md:w-64 bg-white text-black rounded-[3rem] font-black text-2xl flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl disabled:opacity-50"
            >
              {loading ? (
                <div className="w-8 h-8 border-4 border-black/20 border-t-black rounded-full animate-spin"></div>
              ) : (
                <><Zap size={24}/> ابحث بالذكاء</>
              )}
            </button>
          </div>
        </form>
      </div>

      {analysis && (
        <div className="max-w-5xl mx-auto space-y-16 animate-reveal">
          <div className="glass p-12 rounded-[4rem] border-indigo-500/20 bg-indigo-500/[0.02] shadow-2xl">
            <div className="flex items-center gap-6 mb-8 text-indigo-400">
               <BrainCircuit size={40} />
               <h3 className="text-3xl font-black tracking-tight">تحليل المحرك الذكي</h3>
            </div>
            <p className="text-2xl text-slate-300 leading-relaxed font-medium">
              {analysis}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {matches.map((item, idx) => (
              <MatchCard key={idx} item={item} isBrand={isBrand} />
            ))}
          </div>
        </div>
      )}

      {!analysis && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto opacity-40">
           <PromptIdea text="مبدع محتوى تقني بأسلوب تعليمي" />
           <PromptIdea text="براندات فينتك تبحث عن UGC" />
           <PromptIdea text="مؤثرين في مجال اللايف ستايل بجدة" />
        </div>
      )}
    </div>
  );
};

const MatchCard: React.FC<{ item: any, isBrand: boolean }> = ({ item, isBrand }) => (
  <div className="bento-card p-10 rounded-[4rem] group hover:border-indigo-500/50 transition-all bg-white/[0.01]">
    <div className="flex justify-between items-start mb-10">
       <div className="flex items-center gap-6">
          <img src={item.avatar} className="w-24 h-24 rounded-3xl object-cover shadow-2xl border border-white/10" alt="" />
          <div>
             <h4 className="text-3xl font-black text-white">{item.name}</h4>
             <p className="text-indigo-400 font-bold">{item.handle}</p>
          </div>
       </div>
       <div className="text-center">
          <div className="w-20 h-20 rounded-full border-4 border-indigo-500/20 flex items-center justify-center relative">
             <span className="text-2xl font-black text-white">92</span>
             <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="40" cy="40" r="36" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-indigo-500" strokeDasharray="226" strokeDashoffset="20" />
             </svg>
          </div>
          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-3">Fit Score</p>
       </div>
    </div>
    
    <div className="space-y-6 mb-10">
       <div className="flex items-center gap-4 text-slate-300 font-bold">
          <ShieldCheck size={20} className="text-emerald-400" />
          <span>توافق تام مع نبرة العلامة التجارية</span>
       </div>
       <div className="flex items-center gap-4 text-slate-300 font-bold">
          <Target size={20} className="text-indigo-400" />
          <span>تطابق جغرافي في المنطقة المستهدفة</span>
       </div>
    </div>

    <button className="w-full py-6 glass rounded-3xl text-white font-black text-xl hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4">
       {isBrand ? 'إرسال دعوة عرض' : 'عرض تفاصيل الفرصة'} <ArrowRight size={20} />
    </button>
  </div>
);

const PromptIdea: React.FC<{ text: string }> = ({ text }) => (
  <div className="p-8 border border-white/5 rounded-3xl text-center text-slate-600 font-bold italic">
    "{text}"
  </div>
);

export default AiMatch;
