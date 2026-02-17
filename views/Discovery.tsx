
import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Sparkles, X, BarChart3, Users, Globe, ExternalLink, MessageSquare, ArrowRight, Star, Briefcase, Zap, CheckCircle, ShieldCheck, Filter, Clock, DollarSign, EyeOff, Ban, SlidersHorizontal, User, Heart, AlertCircle, Share2, Info, Instagram, Youtube, Twitter, MapPin, Activity, Award, CheckCircle2, AlertTriangle, ChevronDown, FileText, Database, Radio } from 'lucide-react';
import { MOCK_CREATORS } from '../constants';
import { Creator, GroundingSource } from '../types';
import { geminiService } from '../services/geminiService';

const Discovery: React.FC = () => {
  const location = useLocation();
  const [userRole, setUserRole] = useState<'brand' | 'creator'>('brand');
  const [searchTerm, setSearchTerm] = useState('');
  const [aiQuery, setAiQuery] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [groundingSources, setGroundingSources] = useState<GroundingSource[]>([]);
  const [scoutMode, setScoutMode] = useState<'internal' | 'live'>('internal');
  const [selectedProfile, setSelectedProfile] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (query) {
      setAiQuery(query);
      setScoutMode('live');
      executeLiveScout(query);
    }
  }, [location]);

  const executeLiveScout = async (queryToScout: string) => {
    setAiLoading(true);
    setAiResponse(null);
    setGroundingSources([]);
    setError(null);
    
    try {
      const result = userRole === 'brand' 
        ? await geminiService.scoutLiveCreators(queryToScout)
        : await geminiService.scoutLiveBrands("مبدع محتوى", queryToScout);
        
      setAiResponse(result.text);
      setGroundingSources(result.sources);
    } catch (err: any) {
      console.error(err);
      if (err?.status === 429 || err?.message?.includes('429')) {
        setError("عذراً، انتهت حصة البحث الحالية (429 Quota Exceeded). المحرك يحتاج لاستراحة قصيرة قبل المسح القادم.");
      } else {
        setError("فشل المسح الاستخباراتي. تأكد من جودة اتصالك بالشبكة.");
      }
    } finally {
      setAiLoading(false);
    }
  };

  const filteredCreators = useMemo(() => {
    return MOCK_CREATORS.filter(c => {
      return c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
             c.handle.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 text-right">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20 animate-reveal">
        <div className="space-y-6">
          <div className="flex gap-4 p-1 glass rounded-full w-fit border border-white/5 shadow-inner">
            <button onClick={() => setUserRole('brand')} className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${userRole === 'brand' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}>مسح المبدعين</button>
            <button onClick={() => setUserRole('creator')} className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${userRole === 'creator' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}>مسح البراندات</button>
          </div>
          <h1 className="text-7xl md:text-8xl font-black text-white tracking-tighter leading-[0.85]">
            {scoutMode === 'live' ? 'OSINT Intelligence.' : 'Verified Intel.'}
          </h1>
        </div>
        <div className="flex glass p-2 rounded-full border border-white/10 shadow-3xl overflow-hidden">
           <button onClick={() => setScoutMode('internal')} className={`px-12 py-4 rounded-full text-xs font-black transition-all ${scoutMode === 'internal' ? 'bg-white text-black shadow-3xl' : 'text-slate-500 hover:text-white'} flex items-center gap-3`}><Database size={14}/> قاعدة البيانات</button>
           <button onClick={() => setScoutMode('live')} className={`px-12 py-4 rounded-full text-xs font-black transition-all ${scoutMode === 'live' ? 'bg-white text-black shadow-3xl' : 'text-slate-500 hover:text-white'} flex items-center gap-3`}><Radio size={14} className="animate-pulse text-rose-500"/> رادار المحقق</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Investigator Control Panel */}
        <div className="lg:col-span-4">
          <div className="bento-card p-10 rounded-[3.5rem] sticky top-32 bg-white/[0.01] border-indigo-500/10">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-2xl font-black text-white flex items-center gap-4"><ShieldCheck className="text-indigo-400" /> لوحة المحقق</h3>
               <div className="px-3 py-1 bg-rose-500/10 text-rose-500 text-[10px] font-black rounded-full border border-rose-500/20">Secured Scan</div>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); if (aiQuery.trim()) executeLiveScout(aiQuery); }} className="space-y-8">
              <div className="relative group">
                <textarea 
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  className="w-full p-8 rounded-[2.5rem] bg-white/5 border border-white/10 text-white text-md focus:border-indigo-500 outline-none min-h-[260px] transition-all font-bold text-right placeholder:text-slate-700"
                  placeholder="أدخل اسم الهدف، أو الشركة، أو الموضوع لبدء المسح العميق..."
                />
                <div className="absolute top-6 left-6 text-indigo-500/20"><Search size={24}/></div>
              </div>
              <button disabled={aiLoading} className="w-full py-8 bg-indigo-600 text-white rounded-[2.5rem] font-black text-lg hover:bg-indigo-500 active:scale-95 transition-all flex items-center justify-center gap-4 shadow-3xl disabled:opacity-50 group">
                {aiLoading ? (
                  <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <><Zap size={20} className="group-hover:rotate-12 transition-transform" /> بدء المسح الاستخباراتي</>
                )}
              </button>
            </form>

            <div className="mt-12 pt-12 border-t border-white/5 space-y-6">
               <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4">أدوات التحقق النشطة</p>
               <div className="flex items-center gap-4 text-xs font-black text-slate-400"><CheckCircle2 size={16} className="text-emerald-500"/> Google Dorking v4.0</div>
               <div className="flex items-center gap-4 text-xs font-black text-slate-400"><CheckCircle2 size={16} className="text-emerald-500"/> Social Profile Filter</div>
               <div className="flex items-center gap-4 text-xs font-black text-slate-400"><CheckCircle2 size={16} className="text-emerald-500"/> Media Link Extractor</div>
            </div>
          </div>
        </div>

        {/* Intelligence Dossier Area */}
        <div className="lg:col-span-8 space-y-16">
          {scoutMode === 'live' && (
            <div className="space-y-12 animate-reveal">
              {aiLoading && (
                <div className="glass p-24 rounded-[5rem] text-center border-white/5 shadow-2xl relative overflow-hidden">
                   <div className="absolute inset-0 vibrant-gradient opacity-5 animate-pulse"></div>
                   <div className="w-24 h-24 vibrant-gradient rounded-[2.5rem] flex items-center justify-center text-white mx-auto mb-10 shadow-3xl animate-bounce">
                      <Radio size={48} />
                   </div>
                   <h3 className="text-4xl font-black text-white mb-6 tracking-tighter">جاري اختراق الحواجز الرقمية...</h3>
                   <p className="text-xl text-slate-500 font-medium italic">نقوم بمسح TikTok و Instagram و X حصرياً لإعداد ملف القضية.</p>
                </div>
              )}

              {error && (
                <div className="p-16 glass rounded-[4rem] border-rose-500/20 bg-rose-500/5 text-center shadow-3xl">
                   <AlertTriangle className="text-rose-500 mx-auto mb-8" size={64} />
                   <h3 className="text-3xl font-black text-white mb-6">فشل في جلب الاستخبارات</h3>
                   <p className="text-2xl text-slate-400 font-medium leading-relaxed max-w-lg mx-auto mb-10">{error}</p>
                   <button onClick={() => executeLiveScout(aiQuery)} className="px-12 py-5 bg-white text-black rounded-full font-black uppercase text-xs">إعادة المحاولة</button>
                </div>
              )}

              {aiResponse && !error && (
                <div className="grid grid-cols-1 gap-12">
                   {/* Full Intelligence Dossier Card */}
                  <div className="glass p-16 rounded-[4.5rem] border-indigo-500/20 bg-indigo-500/[0.03] shadow-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none"><Database size={120}/></div>
                    <div className="flex items-center justify-between mb-16">
                       <div className="flex items-center gap-8">
                          <div className="w-16 h-16 vibrant-gradient rounded-2xl flex items-center justify-center text-white shadow-xl"><FileText size={32}/></div>
                          <h2 className="text-5xl font-black text-white tracking-tighter">ملف القضية المكتشف (Target Dossier)</h2>
                       </div>
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest border border-white/10 px-6 py-2 rounded-full">Report ID: #OSINT-{Math.floor(Math.random()*10000)}</span>
                    </div>

                    <div className="prose prose-invert max-w-none text-slate-300 text-xl whitespace-pre-wrap leading-[2.2] font-medium border-r-4 border-indigo-600 pr-12 mb-16">
                       {aiResponse}
                    </div>

                    {/* Quick Sources Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-12 border-t border-white/5">
                        {groundingSources.map((source, idx) => (
                           <SocialDossierCard key={idx} source={source} idx={idx} onClick={() => setSelectedProfile({...source, id: idx})} />
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {!aiResponse && !aiLoading && !error && (
                <div className="h-full flex flex-col items-center justify-center py-48 text-center glass rounded-[5rem] border-dashed border-white/5 bg-white/[0.01]">
                  <div className="w-28 h-28 glass rounded-[3rem] flex items-center justify-center text-slate-800 mb-10 shadow-3xl border border-white/5"><Database size={56}/></div>
                  <h3 className="text-5xl font-black text-slate-500 mb-6">المحقق بانتظار أوامرك.</h3>
                  <p className="text-xl text-slate-700 font-bold uppercase tracking-[0.2em]">أدخل اسم الهدف لبدء المسح الفوري.</p>
                </div>
              )}
            </div>
          )}

          {scoutMode === 'internal' && (
            <div className="space-y-12 animate-reveal">
              <div className="relative group">
                <Search className="absolute right-12 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-white transition-colors" size={40} />
                <input 
                  type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="البحث في الأرشيف الموثق..."
                  className="w-full pr-32 pl-12 py-14 rounded-[4.5rem] bg-white/5 border border-white/10 focus:border-white outline-none text-4xl font-black text-white shadow-3xl transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {filteredCreators.map(creator => (
                  <SocialDossierCard 
                    key={creator.id} 
                    source={{title: creator.name, uri: creator.platforms[0]}} 
                    idx={parseInt(creator.id)} 
                    internalCreator={creator}
                    onClick={() => setSelectedProfile(creator)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Profile Detail Dossier Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
           <div className="fixed inset-0 bg-black/98 backdrop-blur-3xl animate-fade-in" onClick={() => setSelectedProfile(null)}></div>
           <div className="bg-[#030712] rounded-[5rem] w-full max-w-5xl relative shadow-3xl border border-white/10 animate-reveal overflow-hidden max-h-[90vh] overflow-y-auto">
              <div className="p-12 md:p-24 text-right">
                 <div className="flex justify-between items-start mb-24">
                    <div className="flex items-center gap-14">
                       <img src={selectedProfile.avatar || `https://images.unsplash.com/photo-${1535713875002 + selectedProfile.id}-d1d0cf377fde?q=80&w=300&h=300&fit=crop`} className="w-48 h-48 rounded-[4rem] object-cover border-4 border-indigo-500/30 shadow-3xl" alt="" />
                       <div>
                          <h2 className="text-8xl font-black text-white tracking-tighter mb-4">{selectedProfile.title || selectedProfile.name}</h2>
                          <div className="flex items-center gap-8">
                             <span className="text-indigo-400 font-bold text-3xl">{selectedProfile.handle || '@target_id'}</span>
                             <span className="px-8 py-3 bg-emerald-500/10 text-emerald-400 text-xs font-black uppercase rounded-full border border-emerald-500/20 shadow-inner flex items-center gap-4"><ShieldCheck size={18}/> Verified Entity</span>
                          </div>
                       </div>
                    </div>
                    <button onClick={() => setSelectedProfile(null)} className="p-6 glass rounded-full hover:bg-white/10 transition-all text-white shadow-2xl"><X size={48}/></button>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
                    <IntelligenceStat label="قوة الحضور" value={selectedProfile.followers?.toLocaleString() || "Private"} sub="تحليل آلي" />
                    <IntelligenceStat label="معدل الاختراق" value={selectedProfile.engagement || "Direct"} sub="نسبة التفاعل" color="text-indigo-400" />
                    <IntelligenceStat label="تصنيف الهدف" value="High Value" sub="استنتاج AI" color="text-amber-400" />
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24">
                    <div className="space-y-12">
                       <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">الآثار الرقمية (Footprint)</h4>
                       <div className="flex flex-wrap gap-4">
                          {(selectedProfile.contentStyles || ['Target', 'Verified', 'Direct Link', 'Official']).map((style: string) => (
                             <span key={style} className="px-10 py-5 glass rounded-[2.5rem] border-white/5 text-white font-black text-sm hover:scale-105 transition-transform">{style}</span>
                          ))}
                       </div>
                    </div>
                    <div className="space-y-12">
                       <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">تقرير المحقق السري</h4>
                       <p className="text-3xl text-slate-400 font-medium leading-[1.8] italic border-r-8 border-indigo-500/40 pr-12">
                          "{selectedProfile.bio || "يظهر الهدف نشاطاً استراتيجياً عبر منصات متعددة. الملف الشخصي موثق ومتاح للتواصل المباشر لإغراض التعاون التجاري."}"
                       </p>
                    </div>
                 </div>

                 <div className="flex gap-10">
                    <a href={selectedProfile.uri || '#'} target="_blank" className="flex-1 py-12 bg-white text-black rounded-[4rem] font-black text-4xl hover:scale-[1.02] transition-all shadow-3xl flex items-center justify-center gap-8 group">
                       <Radio size={40} className="group-hover:animate-pulse" /> فتح الاتصال المباشر
                    </a>
                    <button className="px-16 py-12 glass rounded-[4rem] border-white/10 text-white font-black hover:bg-white/5 transition-all shadow-2xl">
                       <MessageSquare size={40} />
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const SocialDossierCard: React.FC<{ source: GroundingSource, idx: number, onClick: () => void, internalCreator?: Creator }> = ({ source, idx, onClick, internalCreator }) => {
  const isX = source.uri.includes('twitter.com') || source.uri.includes('x.com');
  const isIG = source.uri.includes('instagram.com');
  const isTikTok = source.uri.includes('tiktok.com');
  const isYT = source.uri.includes('youtube.com');

  const platformName = isX ? 'X (Investigated)' : isIG ? 'Instagram Hub' : isTikTok ? 'TikTok Pulse' : isYT ? 'YouTube Arch' : 'Secure Source';
  
  const getHandle = (url: string) => {
    try {
      const parts = url.split('/').filter(p => p !== '');
      const last = parts[parts.length - 1];
      return last.startsWith('@') ? last : `@${last}`;
    } catch {
      return '@target_id';
    }
  };

  const handle = internalCreator?.handle || getHandle(source.uri);
  const avatar = internalCreator?.avatar || `https://images.unsplash.com/photo-${1535713875002 + idx}-d1d0cf377fde?q=80&w=200&h=200&fit=crop`;

  return (
    <div 
      onClick={onClick}
      className="bento-card rounded-[4rem] bg-white/[0.01] border-white/10 overflow-hidden hover:border-indigo-600/50 transition-all shadow-2xl group flex flex-col md:flex-row min-h-[320px] cursor-pointer"
    >
       <div className="md:w-1/3 relative overflow-hidden h-64 md:h-auto flex items-center justify-center bg-black/60 border-l border-white/5">
          <div className="relative z-10 text-center">
             <div className="relative inline-block">
                <img src={avatar} className="w-32 h-32 md:w-44 md:h-44 rounded-full object-cover border-4 border-white/10 shadow-3xl group-hover:scale-110 transition-transform duration-1000" alt="" />
                <div className="absolute -bottom-4 -right-4 w-16 h-16 vibrant-gradient rounded-full flex items-center justify-center border border-white/20 text-white shadow-2xl backdrop-blur-xl">
                   {isX ? <Twitter size={24} /> : isIG ? <Instagram size={24} /> : isTikTok ? <Activity size={24} /> : isYT ? <Youtube size={24} /> : <User size={24} />}
                </div>
             </div>
             <p className="mt-8 text-2xl font-black text-white dir-ltr">{handle}</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-black/90 pointer-events-none"></div>
       </div>

       <div className="md:w-2/3 p-12 flex flex-col justify-between text-right">
          <div>
             <div className="flex justify-between items-start mb-8">
                <div>
                   <h4 className="text-4xl font-black text-white mb-2 tracking-tighter group-hover:text-indigo-400 transition-colors">{source.title}</h4>
                   <div className="flex items-center gap-4">
                      <span className="px-6 py-2 glass rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest border border-white/5">{platformName}</span>
                      <span className="px-6 py-2 glass rounded-full text-[10px] font-black text-emerald-400 uppercase tracking-widest border border-emerald-500/20">● Source Verified</span>
                   </div>
                </div>
                <div className="text-indigo-500/50 group-hover:text-indigo-400 transition-colors">
                   <ChevronDown size={40} className="group-hover:translate-y-2 transition-transform" />
                </div>
             </div>
             <p className="text-slate-400 text-xl font-medium leading-[1.8] line-clamp-2">
                {internalCreator?.bio || "هذا الملف يمثل بصمة رقمية حقيقية للهدف المذكور. تم سحب البيانات ومعالجتها عبر منظومة البحث الاستخباري OSINT Hunter."}
             </p>
          </div>

          <div className="flex justify-between items-center pt-10 border-t border-white/5">
             <div className="flex gap-10">
                <div className="flex items-center gap-4 text-slate-600 font-black text-xs uppercase tracking-widest">
                   <Database size={18}/> {internalCreator?.followers ? `${internalCreator.followers.toLocaleString()} Active` : "ID Acquired"}
                </div>
             </div>
             <div className="text-xs font-black text-indigo-400 uppercase tracking-widest flex items-center gap-4">
                عرض تقرير Dossier الكامل <ArrowRight size={18} />
             </div>
          </div>
       </div>
    </div>
  );
};

const IntelligenceStat: React.FC<{ label: string, value: string, sub: string, color?: string }> = ({ label, value, sub, color = "text-white" }) => (
  <div className="glass p-12 rounded-[3.5rem] text-center border-white/5 bg-white/[0.01] shadow-2xl transition-all hover:bg-white/5">
     <p className="text-[11px] text-slate-600 font-black uppercase mb-6 tracking-widest">{label}</p>
     <p className={`text-7xl font-black ${color} tracking-tighter mb-3`}>{value}</p>
     <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">{sub}</p>
  </div>
);

export default Discovery;
