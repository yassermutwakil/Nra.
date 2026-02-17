
import { GoogleGenAI } from "@google/genai";
import { Creator, Campaign, GroundingSource } from "../types";

export interface ScoutingResult {
  text: string;
  sources: GroundingSource[];
}

export class GeminiService {
  constructor() {}

  private getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  private async executeWithRetry<T>(fn: () => Promise<T>, retries = 4, delay = 3000): Promise<T> {
    try {
      return await fn();
    } catch (error: any) {
      const isRateLimit = error?.status === 429 || error?.message?.includes('429');
      if (isRateLimit && retries > 0) {
        console.warn(`[Nra Intelligence] Quota exceeded. Re-scanning in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.executeWithRetry(fn, retries - 1, delay * 2);
      }
      throw error;
    }
  }

  /**
   * محرك البحث الاستخباراتي Nra Hunter
   */
  async scoutLiveCreators(query: string): Promise<ScoutingResult> {
    const ai = this.getAI();
    return this.executeWithRetry(async () => {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `أنت الآن "Nra Smart Matching Engine". مهمتك هي إيجاد الملفات الشخصية الحقيقية والمباشرة الأكثر توافقاً مع هذا الطلب: "${query}".
        
        استخدم تقنيات OSINT المتقدمة للبحث في (TikTok, Instagram, Twitter/X, YouTube).
        
        تنسيق التقرير (Dossier Format):
        1. بطاقة الهوية: (الاسم، المجال، الموقع).
        2. جدول الحسابات: (المنصة، الرابط المباشر، حالة النشاط).
        3. تحليل التوافق (Fit DNA): لماذا هذا المبدع مناسب؟ (ركز على نبرة الصوت والجودة).
        4. وسائط مكتشفة: (روابط لصور أو فيديوهات).
        
        تعليمات صارمة: لا تذكر Reddit أو المدونات العامة. فقط حسابات تواصل مباشرة وموثوقة.`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      return this.processResponse(response);
    });
  }

  async scoutLiveBrands(niche: string, query: string): Promise<ScoutingResult> {
    const ai = this.getAI();
    return this.executeWithRetry(async () => {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `أنت محرك Nra. ابحث عن العلامات التجارية الرسمية في قطاع "${niche}" التي تبحث عن شراكات: "${query}".
        ركز على الملفات الرسمية في Instagram و LinkedIn. قدم النتائج في شكل بطاقة هوية تجارية مهيكلة.`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      return this.processResponse(response);
    });
  }

  async generateAffiliateAdvice(stats: any[]): Promise<string> {
    const ai = this.getAI();
    return this.executeWithRetry(async () => {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `بناءً على إحصائيات الأداء في منصة Nra لصانع محتوى: ${JSON.stringify(stats)}. قدم نصيحة واحدة قصيرة واحترافية باللغة العربية لتحسين أداء الحملات وزيادة المبيعات.`,
      });
      return response.text || "استمر في تقديم محتوى عالي الجودة لجمهورك عبر Nra.";
    });
  }

  private processResponse(response: any): ScoutingResult {
    const sources: GroundingSource[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web) {
          const uri = chunk.web.uri.toLowerCase();
          const isSocial = ['instagram.com', 'tiktok.com', 'twitter.com', 'x.com', 'linkedin.com', 'youtube.com'].some(s => uri.includes(s));
          const isForbidden = ['reddit.com', 'blog', 'news', 'forum'].some(f => uri.includes(f));

          if (isSocial && !isForbidden) {
            sources.push({
              title: chunk.web.title || 'Official Digital Identity',
              uri: chunk.web.uri
            });
          }
        }
      });
    }

    return {
      text: response.text || "لم يتم العثور على أهداف مطابقة تماماً حالياً في Nra.",
      sources: sources
    };
  }
}

export const geminiService = new GeminiService();
