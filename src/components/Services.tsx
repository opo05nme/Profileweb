/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ArrowLeft, Copy, Check, MessageSquare, BookOpen, Send, RefreshCw } from 'lucide-react';
import { Article, Tab } from '../types';

interface ServicesProps {
  articles: Article[];
  selectedArticle: Article | null;
  setSelectedArticle: (article: Article | null) => void;
  setActiveTab: (tab: Tab) => void;
  setPromptSeed?: (prompt: string) => void; // Connect to Claire's AI Chat bot
}

export default function Services({ 
  articles, 
  selectedArticle, 
  setSelectedArticle, 
  setActiveTab,
  setPromptSeed
}: ServicesProps) {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  
  // ROLE Prompt Sandbox state
  const [role, setRole] = useState('資深精品咖啡行銷企劃與文案寫手');
  const [obj, setObj] = useState('撰寫 3 篇適合 Instagram 的手沖精品咖啡壺宣傳貼文');
  const [limit, setLimit] = useState('每篇 150 字內，語氣要知性溫暖，避免使用誇大詞句');
  const [format, setFormat] = useState('包含吸引人的開頭、3 個風味/體驗切入點、2 個 Emoji 及 5 個標籤');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  const categories = ['all', 'AI 應用', '品牌行銷', '內容企劃', '職涯成長'];

  const filteredArticles = filterCategory === 'all' 
    ? articles 
    : articles.filter(art => art.category === filterCategory);

  const handleGeneratePrompt = () => {
    const prompt = `# 角色設定 (Role)
${role}

# 任務目標 (Objective)
${obj}

# 限制與規範 (Limit)
${limit}

# 輸出格式 (Format / Execution)
${format}

---
請根據上述架構，為我產出高品質、符合品牌語調的內容：`;
    setGeneratedPrompt(prompt);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendToAIChat = () => {
    if (setPromptSeed && generatedPrompt) {
      setPromptSeed(generatedPrompt);
      setActiveTab('contact'); // Go to contact/consultation tab where chat resides
      setTimeout(() => {
        const el = document.getElementById('ai-chat-anchor');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  };

  const consultingServices = [
    {
      title: "企業 AI 內容工作流優化",
      badge: "顧問諮詢",
      desc: "協助中小企業、自媒體團隊導入生成式 AI 工具。我們從了解團隊既有工作瓶頸出發，設計可落地的 AI SOP 與提示詞模版，使內容產出時間減少約 40%，打造高效率的內容流水線。",
      deliverables: ["工作流程瓶頸盤點", "客製化提示詞 (Prompt) 模板庫", "AI 協作內容產製 SOP"]
    },
    {
      title: "品牌行銷企劃與線上課程定位",
      badge: "品牌企劃",
      desc: "協助專業講師、顧問、教育機構挖掘個人品牌亮點。將深奧的專業知識，翻譯成大眾聽得懂、學得會、主動報名的線上課程與公開講座宣傳企劃，涵蓋招生大綱包裝、招生文案與對外溝通定位。",
      deliverables: ["課程大綱定位與修飾", "高共鳴招生文案框架", "講師個人品牌切入策略"]
    },
    {
      title: "生成式 AI 行銷實作工作坊",
      badge: "課程內訓",
      desc: "專為非技術背景、非工程師、行銷企劃與行政團隊設計的實戰課程。不講空泛的科技理論，完全聚焦於工作場景（如：撰寫文案、整理資料、簡報大綱生成），引導學員在課中即學即用、產出初稿。",
      deliverables: ["企業專屬內訓大綱設計", "實用工作場景實操練習", "課後現成範本可立即複用"]
    }
  ];

  return (
    <div className="space-y-16">
      
      {/* 1. Services Catalog */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-stone-900">專業顧問服務與課程</h2>
          <p className="text-sm text-stone-500 font-light leading-relaxed">
            Claire 提供量身定做的內容策略諮詢與 AI 導入課程，重視實際落地，讓好創意轉化為商業價值。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {consultingServices.map((srv, i) => (
            <div 
              key={i} 
              className="bg-[#fcfbf9] rounded-2xl p-6 border border-stone-200/80 flex flex-col justify-between space-y-6 card-warm-hover shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="px-2.5 py-1 text-[11px] font-mono font-semibold rounded bg-amber-50 text-accent-darkGold border border-amber-200/40">
                    {srv.badge}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-medium text-stone-900">{srv.title}</h3>
                <p className="text-stone-600 text-xs font-light leading-relaxed">{srv.desc}</p>
              </div>

              <div className="space-y-3 pt-4 border-t border-stone-150">
                <h4 className="text-xs font-mono font-medium text-stone-400">核心交付物</h4>
                <ul className="space-y-1.5">
                  {srv.deliverables.map((del, d) => (
                    <li key={d} className="text-xs text-stone-700 flex items-center gap-1.5 font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-darkGold" />
                      {del}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Interactive ROLE Prompt Sandbox */}
      <section className="bg-[#fcfbf9] rounded-3xl p-6 md:p-10 text-stone-900 relative overflow-hidden border border-stone-200 shadow-sm">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(197,168,128,0.06),transparent_50%)]" />
        
        <div className="relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-10">
          {/* Inputs */}
          <div className="xl:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-50 text-accent-darkGold text-[10px] font-mono tracking-wider uppercase border border-amber-200/50">
                <Sparkles className="w-3 h-3 text-accent-darkGold" />
                Prompt Engineering Playground
              </div>
              <h3 className="font-serif text-2xl font-medium text-stone-900">若晴的 ROLE 提示詞沙盒</h3>
              <p className="text-stone-500 text-xs font-light leading-relaxed">
                這是若晴在內訓中推薦的黃金提示詞架構。在下方輸入你的場景，AI 將生成高度結構化的黃金指令，你可一鍵複製，或丟給下方的 AI 若晴助理測試回答！
              </p>
            </div>

            <div className="space-y-4">
              {/* R */}
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-stone-700 flex justify-between">
                  <span>R (Role) - AI 的角色設定</span>
                  <span className="text-stone-400">你是誰？</span>
                </label>
                <input 
                  type="text" 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg text-stone-850 focus:outline-none focus:border-accent-darkGold font-sans"
                />
              </div>

              {/* O */}
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-stone-700 flex justify-between">
                  <span>O (Objective) - 具體任務與目標</span>
                  <span className="text-stone-400">要做什麼？</span>
                </label>
                <textarea 
                  rows={2}
                  value={obj}
                  onChange={(e) => setObj(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg text-stone-850 focus:outline-none focus:border-accent-darkGold font-sans resize-none"
                />
              </div>

              {/* L */}
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-stone-700 flex justify-between">
                  <span>L (Limit) - 限制規範與防線</span>
                  <span className="text-stone-400">不要什麼？</span>
                </label>
                <input 
                  type="text" 
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg text-stone-850 focus:outline-none focus:border-accent-darkGold font-sans"
                />
              </div>

              {/* E */}
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-stone-700 flex justify-between">
                  <span>E (Format / Execution) - 輸出格式與排版</span>
                  <span className="text-stone-400">長成怎樣？</span>
                </label>
                <input 
                  type="text" 
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg text-stone-850 focus:outline-none focus:border-accent-darkGold font-sans"
                />
              </div>

              <button 
                onClick={handleGeneratePrompt}
                className="w-full py-2.5 rounded-xl bg-accent-darkGold hover:bg-[#866f4a] text-white font-sans font-medium text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                生成黃金提示詞指令
              </button>
            </div>
          </div>

          {/* Prompt Output Code block */}
          <div className="xl:col-span-7 flex flex-col justify-between bg-white border border-stone-200 rounded-2xl p-5 md:p-6 space-y-4 shadow-sm">
            <div className="space-y-2 flex-grow">
              <div className="flex justify-between items-center border-b border-stone-100 pb-3">
                <span className="text-[11px] font-mono text-stone-400">GENERATED STRUCTURAL PROMPT</span>
                {generatedPrompt && (
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handleCopyPrompt}
                      className="px-2.5 py-1 rounded bg-stone-50 hover:bg-stone-100 text-[10px] font-mono text-stone-600 border border-stone-200 flex items-center gap-1 transition-all cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          已複製！
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          複製指令
                        </>
                      )}
                    </button>
                    {setPromptSeed && (
                      <button 
                        onClick={handleSendToAIChat}
                        className="px-2.5 py-1 rounded bg-amber-50 border border-amber-200/50 hover:bg-amber-100 text-[10px] font-mono text-amber-800 flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <Send className="w-3 h-3" />
                        送去 AI 聊天測試
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="bg-stone-50 border border-stone-100 rounded-lg p-3 overflow-y-auto max-h-64 md:max-h-80 font-mono text-xs text-stone-700 leading-relaxed whitespace-pre-wrap">
                {generatedPrompt ? (
                  generatedPrompt
                ) : (
                  <div className="h-48 flex flex-col items-center justify-center text-center text-stone-400 space-y-2">
                    <BookOpen className="w-8 h-8 opacity-40" />
                    <p className="text-xs font-sans font-medium text-stone-600">尚未生成任何提示詞</p>
                    <p className="text-[11px] font-sans">請填寫左側欄位並點擊「生成黃金提示詞指令」</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-[#fdfcfb] border border-amber-200/30 rounded-xl p-3 text-[11px] text-stone-600 font-light leading-relaxed flex items-start gap-2.5">
              <span className="text-accent-darkGold font-semibold">💡 提示心法：</span>
              <span>
                ROLE 提示詞邏輯能大幅消除 AI 的幻覺，給予框架和邊界，是若晴協助公司優化社群、電子報、或簡報大綱產製流程最基礎也最核心的主幹。
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Columns / Blog Section */}
      <section className="space-y-8" id="blog-reader-anchor">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-stone-900">若晴專欄觀點</h2>
          <p className="text-sm text-stone-500 font-light leading-relaxed">
            在這裡，我用文字梳理十年來在內容企劃、品牌定位和最新 AI 應用的實戰結晶。
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilterCategory(cat);
                setSelectedArticle(null); // Clear selected article reading when category changes
              }}
              className={`px-4 py-1.5 rounded-full font-sans text-xs font-medium transition-all cursor-pointer ${
                filterCategory === cat
                  ? 'bg-stone-900 text-stone-100'
                  : 'bg-stone-100 hover:bg-stone-200/70 text-stone-600'
              }`}
            >
              {cat === 'all' ? '全部觀點' : cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedArticle ? (
            /* Detailed Article Reader View */
            <motion.div
              key="article-reader"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-[#fcfbf9] border border-stone-200 rounded-3xl p-6 md:p-12 max-w-3xl mx-auto space-y-8 shadow-sm"
            >
              {/* Back btn */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="inline-flex items-center gap-2 text-xs font-sans font-medium text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                返回文章清單
              </button>

              <div className="space-y-4 border-b border-stone-200 pb-6">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 text-[10px] font-mono font-medium rounded-full bg-amber-50 text-accent-darkGold border border-amber-200/50">
                    {selectedArticle.category}
                  </span>
                  <span className="text-xs font-mono text-stone-400">{selectedArticle.date}</span>
                  <span className="text-xs font-mono text-stone-400">•</span>
                  <span className="text-xs font-mono text-stone-400">閱讀 {selectedArticle.readTime}</span>
                </div>
                <h1 className="font-serif text-2xl md:text-3.5xl font-medium tracking-tight text-stone-900 leading-snug">
                  {selectedArticle.title}
                </h1>
              </div>

              {/* Article content (rich styling) */}
              <div className="font-serif text-stone-850 text-base md:text-lg leading-relaxed space-y-6 whitespace-pre-line text-justify max-w-none">
                {selectedArticle.content}
              </div>

              {/* Article footer */}
              <div className="border-t border-stone-200 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-stone-200">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200" 
                      alt="林若晴 Claire Lin" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-sans font-medium text-stone-800">作者：林若晴 Claire Lin</p>
                    <p className="text-[10px] font-sans text-stone-400">AI 內容策略顧問 / 品牌企劃講師</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('contact');
                    setTimeout(() => {
                      const el = document.getElementById('consultation-form-anchor');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 200);
                  }}
                  className="px-4 py-2 text-xs bg-stone-900 hover:bg-stone-850 text-white font-sans font-medium rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  預約若晴策略諮詢
                </button>
              </div>
            </motion.div>
          ) : (
            /* Articles Grid List */
            <motion.div
              key="articles-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filteredArticles.map((art) => (
                <div
                  key={art.id}
                  className="bg-[#fcfbf9] rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 text-[10px] font-mono font-medium rounded bg-stone-100 text-stone-600">
                        {art.category}
                      </span>
                      <span className="text-xs font-mono text-stone-400">{art.date}</span>
                    </div>
                    <h3 className="font-serif text-lg font-medium text-stone-900 group-hover:text-accent-darkGold transition-colors line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="text-stone-600 text-xs font-light leading-relaxed line-clamp-3">
                      {art.summary}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-stone-200">
                    <span className="text-xs text-stone-400 font-mono">時間: {art.readTime}</span>
                    <button
                      onClick={() => {
                        setSelectedArticle(art);
                        const el = document.getElementById('blog-reader-anchor');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-xs font-sans font-medium text-stone-700 group-hover:text-accent-darkGold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      閱讀全文
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

    </div>
  );
}
