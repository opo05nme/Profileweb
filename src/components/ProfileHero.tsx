/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, BookOpen, Sparkles, BrainCircuit, Compass, Target } from 'lucide-react';
import { Article, Tab } from '../types';

interface ProfileHeroProps {
  articles: Article[];
  setActiveTab: (tab: Tab) => void;
  setSelectedArticle: (article: Article) => void;
}

export default function ProfileHero({ articles, setActiveTab, setSelectedArticle }: ProfileHeroProps) {
  const handleReadArticle = (article: Article) => {
    setSelectedArticle(article);
    setActiveTab('services'); // We will show full article reading in Services/Blog tab
    setTimeout(() => {
      const el = document.getElementById('blog-reader-anchor');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="space-y-16">
      {/* Editorial Hero Statement */}
      <section className="relative overflow-hidden rounded-3xl bg-[#fcfbf9] text-stone-900 p-8 md:p-16 border border-stone-200 shadow-sm">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,168,128,0.1),transparent_45%)]" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Text */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-accent-darkGold text-xs font-mono tracking-wider uppercase border border-amber-200/50"
            >
              <Sparkles className="w-3 h-3 text-accent-darkGold" />
              AI CONTENT STRATEGY & BRANDING
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-4"
            >
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.15] text-stone-900">
                把複雜的事情說清楚，<br />
                <span className="text-accent-darkGold font-normal italic">把平凡的工作做到有價值。</span>
              </h1>
              <p className="text-stone-600 font-sans text-base md:text-lg max-w-xl font-light leading-relaxed">
                我是 <strong className="text-stone-950 font-medium">林若晴 Claire Lin</strong>。十餘年橫跨視覺設計、專題編輯與教育科技的實戰積累，專注於協助企業與個人將深奧的專業知識，轉化為具備商業價值的內容。
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button 
                onClick={() => setActiveTab('contact')}
                className="px-6 py-3 rounded-xl bg-accent-darkGold hover:bg-[#866f4a] text-white font-sans font-medium transition-all shadow-md shadow-amber-950/10 flex items-center gap-2 cursor-pointer"
              >
                預約策略商討
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setActiveTab('services')}
                className="px-6 py-3 rounded-xl bg-white hover:bg-stone-50 text-stone-800 font-sans font-medium border border-stone-200 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                探索專業服務
              </button>
            </motion.div>
          </div>

          {/* Hero Profile Photo Container */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-64 h-64 md:w-80 md:h-80 group"
            >
              {/* Artistic border / shape behind photo */}
              <div className="absolute inset-4 rounded-3xl border border-accent-darkGold/40 translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2 duration-500" />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-accent-darkGold/20 to-transparent z-10 mix-blend-overlay" />
              
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=600" 
                alt="林若晴 Claire Lin" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-3xl grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 relative z-0"
              />
              
              {/* Micro interactive indicator */}
              <div className="absolute -bottom-3 -left-3 bg-white border border-stone-200 rounded-xl p-3 shadow-md z-20 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-xs font-mono text-stone-700">諮詢預約開放中</span>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Specialty Bento Grid */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-stone-900">核心能力架構</h2>
          <p className="text-sm text-stone-500 font-light leading-relaxed">
            融合感性敘事與理性架構，在文字、視覺與新興 AI 工具之間，搭起溝通的最高效橋樑。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: AI Content Integration */}
          <div className="md:col-span-7 bg-stone-100/75 rounded-2xl p-8 border border-stone-200/50 flex flex-col justify-between space-y-6 card-warm-hover">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-900">AI 內容策略優化</h3>
              <p className="text-stone-600 text-sm font-light leading-relaxed">
                並非盲目追求自動化，而是從「工作場景」出發。引導團隊導入生成式 AI，設計專屬提示詞（Prompt）模板與內容產製 SOP，降低 40% 的內容產出時間，同時確保品牌風格一致。
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2.5 py-1 text-xs font-mono rounded bg-stone-200/60 text-stone-700">ROLE 提示詞架構</span>
              <span className="px-2.5 py-1 text-xs font-mono rounded bg-stone-200/60 text-stone-700">AI 工作流優化</span>
              <span className="px-2.5 py-1 text-xs font-mono rounded bg-stone-200/60 text-stone-700">文案大纲生成 SOP</span>
            </div>
          </div>

          {/* Card 2: Brand & Course Design */}
          <div className="md:col-span-5 bg-stone-100/75 rounded-2xl p-8 border border-stone-200/50 flex flex-col justify-between space-y-6 card-warm-hover">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-accent-darkGold">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-900">品牌行銷與轉譯</h3>
              <p className="text-stone-600 text-sm font-light leading-relaxed">
                將硬核專業或小眾故事「翻譯」成大眾聽得懂、想學習的爆款課程或企劃。擅長挖掘核心亮點、定位受眾、包裝招生文案，搭起創作者與市場的直達橋樑。
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2.5 py-1 text-xs font-mono rounded bg-stone-200/60 text-stone-700">講師個人品牌</span>
              <span className="px-2.5 py-1 text-xs font-mono rounded bg-stone-200/60 text-stone-700">線上課程定位</span>
              <span className="px-2.5 py-1 text-xs font-mono rounded bg-stone-200/60 text-stone-700">招生文案包裝</span>
            </div>
          </div>

          {/* Card 3: Visual Narrative */}
          <div className="md:col-span-5 bg-stone-100/75 rounded-2xl p-8 border border-stone-200/50 flex flex-col justify-between space-y-6 card-warm-hover">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-stone-200 flex items-center justify-center text-stone-800">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-900">影像敘事與設計美感</h3>
              <p className="text-stone-600 text-sm font-light leading-relaxed">
                早年設計工作室與媒體編輯的扎實底蘊，使我格外注重版面的視覺層次、簡報結構與資訊架構。不只讓畫面好看，更讓繁複的資訊一目了然。
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2.5 py-1 text-xs font-mono rounded bg-stone-200/60 text-stone-700">簡報資訊視覺化</span>
              <span className="px-2.5 py-1 text-xs font-mono rounded bg-stone-200/60 text-stone-700">視覺版面規劃</span>
              <span className="px-2.5 py-1 text-xs font-mono rounded bg-stone-200/60 text-stone-700">影像編輯敘事</span>
            </div>
          </div>

          {/* Card 4: Action Orientated Learning */}
          <div className="md:col-span-7 bg-stone-100/75 rounded-2xl p-8 border border-stone-200/50 flex flex-col justify-between space-y-6 card-warm-hover">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#f0ece3] flex items-center justify-center text-stone-800">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-900">非技術背景教學引導</h3>
              <p className="text-stone-600 text-sm font-light leading-relaxed">
                拒絕枯燥抽象的理論。我針對行銷、企劃、行政等非工程背景學員，規劃出多套實務操作案例、即時互動工作坊。強調下課後「帶走一整套直接能套用的 AI 工作模版」。
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2.5 py-1 text-xs font-mono rounded bg-stone-200/60 text-stone-700">企業實作工作坊</span>
              <span className="px-2.5 py-1 text-xs font-mono rounded bg-stone-200/60 text-stone-700">互動式教學設計</span>
              <span className="px-2.5 py-1 text-xs font-mono rounded bg-stone-200/60 text-stone-700">中高齡 AI 啟蒙</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Writing Spotlight */}
      <section className="bg-stone-50 border border-stone-200 rounded-2xl p-6 md:p-10 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-200 pb-6">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-medium text-stone-900">若晴觀點與專欄專題</h2>
            <p className="text-sm text-stone-500 font-light">Claire 定期分享在生成式 AI、行銷企劃與品牌故事的深度見解</p>
          </div>
          <button 
            onClick={() => setActiveTab('services')}
            className="text-sm font-sans font-medium text-amber-800 hover:text-amber-950 flex items-center gap-1 transition-all cursor-pointer group"
          >
            閱讀所有文章
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.slice(0, 2).map((art) => (
            <div 
              key={art.id} 
              className="bg-white rounded-xl p-6 border border-stone-150 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 text-[11px] font-mono font-medium rounded-full bg-stone-100 text-stone-600">
                    {art.category}
                  </span>
                  <span className="text-xs font-mono text-stone-400">{art.date}</span>
                </div>
                <h3 className="font-serif text-lg font-medium text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-2">
                  {art.title}
                </h3>
                <p className="text-stone-500 text-xs font-light leading-relaxed line-clamp-3">
                  {art.summary}
                </p>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-stone-100">
                <span className="text-xs text-stone-400 font-mono">閱讀時間: {art.readTime}</span>
                <button 
                  onClick={() => handleReadArticle(art)}
                  className="text-xs font-sans font-medium text-stone-700 hover:text-amber-800 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  細讀全文
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote Banner */}
      <section className="py-12 px-6 bg-gradient-to-r from-stone-100 to-stone-200/50 rounded-2xl text-center max-w-3xl mx-auto border border-stone-200/40">
        <p className="font-serif text-lg md:text-xl text-stone-700 italic font-light leading-relaxed">
          「AI 不是要取代人類的創意，而是要協助人更快地完成初稿、整理繁雜資訊，進而打開更廣闊的創意可能。當工具回歸流程，我們才有時間思考何謂真正的價值。」
        </p>
        <p className="text-xs font-mono text-stone-400 mt-4 tracking-wider uppercase">— CLAIRE LIN, AI 內容策略顧問</p>
      </section>

    </div>
  );
}
