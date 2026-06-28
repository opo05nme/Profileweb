/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, Book, Coffee, Heart, Target, Smile, ShieldAlert } from 'lucide-react';

interface BookItem {
  title: string;
  author: string;
  category: '設計美感' | '商業策略' | '心理學' | '生活散文';
  recommendation: string;
}

export default function GoalsAndLifestyle() {
  const [selectedBookCat, setSelectedBookCat] = useState<string>('all');

  const goals = [
    {
      title: "短期目標 (Short-term)",
      items: [
        "建立並維護個人品牌網站，提升數位影響力。",
        "每週固定發表 1-2 篇結合內容企劃與生成式 AI 的應用文章。",
        "開設主題為『AI 時代內容工作流實作』的公開工作坊。",
        "累積 10 家以上中小企業內訓或深度顧問導入案例。",
        "完成電子書《AI 時代的內容企劃工作法》初稿撰寫。"
      ]
    },
    {
      title: "中期目標 (Mid-term)",
      items: [
        "確立在教育科技與 AI 內容應用領域的指標型顧問地位。",
        "協助 100 位以上領域專家、講師或專業工作者打造個人品牌與定位。",
        "開發一門結構完整的『AI 高效行銷企劃大師線上課程』。",
        "與學校、社大、企業推廣組織深度合作，普及 AI 生活化應用教育。"
      ]
    },
    {
      title: "長期目標 (Long-term)",
      items: [
        "成立個人專屬的『內容策略與品牌轉譯工作室』。",
        "打造一個完美結合 AI 流程、教學設計與品牌顧問的服務系統品牌。",
        "持續以溫和、清晰的教學方式，消弭科技鴻溝，協助更多人擁抱 AI。",
        "正式出版個人品牌建立與 AI 落地應用的繁體實體書籍。"
      ]
    }
  ];

  const strengths = [
    { title: "卓越轉譯與表達力", desc: "能將極度硬核、複雜抽象的技術或知識整理成清晰明瞭、好懂的框架與視覺簡報。" },
    { title: "細膩敏銳的觀察力", desc: "善於傾聽與訪談，能察覺客戶或受眾沒明說的潛在痛點與心理需求，做深度情感共鳴。" },
    { title: "美感與邏輯兼備", desc: "傳播所學術訓練與設計助理實務，使我同時擁有嚴謹的邏輯架構與講究文字層次的優雅美感。" },
    { title: "極度負責、學習迅速", desc: "對交付成果有高自我要求，一旦承諾必全力以赴；對新科技（如 AI）抱持強大熱情，並迅速轉化為教學方案。" }
  ];

  const weaknesses = [
    { title: "有些完美主義", desc: "由於凡事追求完整、精準，有時會在細部修飾（如一個詞、一頁排版）花費過多時間，需練習在敏捷中妥協。" },
    { title: "容易過度思考", desc: "慢熟且深思熟慮，面對衝突或重大決策時，前期傾向默默忍耐或反覆推演，有時會顯得不夠果斷。" },
    { title: "情緒過度承擔", desc: "同理心強，容易把合作方、主管或客戶的焦慮與責任攬到自己肩上，近年積極修習『課題分離』與建立界線。" }
  ];

  const books: BookItem[] = [
    {
      title: "設計的設計 (Designing Design)",
      author: "原研哉",
      category: "設計美感",
      recommendation: "這本書重新定義了『什麼是設計』。原研哉大師提醒我們：設計不是花哨的裝飾，而是將繁雜事物回歸本質。這深深影響了我『把複雜事情說清楚』的轉譯哲學。"
    },
    {
      title: "被討厭的勇氣",
      author: "岸見一郎 / 古賀史健",
      category: "心理學",
      recommendation: "做顧問和內容策略，需要與各式各樣的人打交道。這本書引導我學會『課題分離』，不去攬下別人的情緒，幫助我這個完美主義、容易過度思考的人在職場建立健康的邊界。"
    },
    {
      title: "精實創業 (The Lean Startup)",
      author: "Eric Ries",
      category: "商業策略",
      recommendation: "教導我們在不確定中用最少資源做 MVP（最小可行性產品）驗證。我在協助講師發售課程與導入企業 AI 工作流時，常常引用這個思維：先跑通流程，再優化細節。"
    },
    {
      title: "生活的藝術",
      author: "林語堂",
      category: "生活散文",
      recommendation: "在追求極致效率的 AI 與行銷世界，人往往容易變得像機器。林語堂先生筆下的生活哲學，如手沖咖啡、品茶、慢行，幫助我在下班後調慢步調，重新找回感性的生活質感。"
    }
  ];

  const bookCategories = ['all', '設計美感', '商業策略', '心理學', '生活散文'];
  const filteredBooks = selectedBookCat === 'all' ? books : books.filter(b => b.category === selectedBookCat);

  return (
    <div className="space-y-16">
      
      {/* 1. Goals & Vision */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-stone-900">
            職涯目標與品牌願景
          </h2>
          <p className="text-sm text-stone-500 font-light leading-relaxed">
            林若晴的每一步規劃，都是為了將人本情感與 AI 效率完美融合，打造具備永續價值的內容生態。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {goals.map((g, i) => (
            <div key={i} className="bg-[#fcfbf9] border border-stone-200/80 rounded-2xl p-6 shadow-sm space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-stone-850 pb-2 border-b border-stone-150">
                  <Target className="w-5 h-5 text-accent-darkGold" />
                  <h3 className="font-serif text-lg font-medium text-stone-900">{g.title}</h3>
                </div>
                <ul className="space-y-3">
                  {g.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-stone-600 font-light leading-relaxed">
                      <span className="text-accent-darkGold font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Self Awareness: Strengths & Weaknesses (The Balance) */}
      <section className="bg-[#fcfbf9] border border-stone-200 rounded-3xl p-6 md:p-10 space-y-8 shadow-sm">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-stone-900">
            理性剖析：自我特質的均衡與拉扯
          </h2>
          <p className="text-xs text-stone-500 font-light leading-relaxed">
            唯有誠實、深刻地面對自身的優勢與盲點，才能在顧問諮詢中給予他人最具溫度的理解與支持。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Strengths */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-5 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-800 border-b border-stone-100 pb-3">
              <Smile className="w-5 h-5" />
              <h3 className="font-serif text-lg font-medium text-stone-900">Claire 的核心優勢</h3>
            </div>
            <div className="space-y-4">
              {strengths.map((s, idx) => (
                <div key={idx} className="space-y-1">
                  <h4 className="text-stone-950 font-sans font-medium text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {s.title}
                  </h4>
                  <p className="text-stone-600 text-xs font-light leading-relaxed pl-3">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Weaknesses */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-5 shadow-sm">
            <div className="flex items-center gap-2 text-amber-800 border-b border-stone-100 pb-3">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="font-serif text-lg font-medium text-stone-900">完美主義的盲點與調適</h3>
            </div>
            <div className="space-y-4">
              {weaknesses.map((w, idx) => (
                <div key={idx} className="space-y-1">
                  <h4 className="text-stone-950 font-sans font-medium text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {w.title}
                  </h4>
                  <p className="text-stone-600 text-xs font-light leading-relaxed pl-3">
                    {w.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Lifestyle & Bookstore */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Lifestyle narrative */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-accent-darkGold border border-amber-200/30 text-[10px] font-mono uppercase tracking-wider">
            <Compass className="w-3 h-3" />
            LIFESTYLE & ORDER
          </div>
          <h3 className="font-serif text-2xl font-medium text-stone-900">
            在簡約與秩序中，<br />
            <span className="text-accent-darkGold italic font-normal">追尋靈魂的質感</span>
          </h3>
          
          <div className="space-y-4 font-light text-stone-600 text-xs leading-relaxed text-justify">
            <p>
              林若晴的生活不算奢華，但極度重視質感與生活秩序。她的居家與工作室空間，以乾淨明朗的白色、沉靜溫潤的木質與灰色調為主，呈現一種令人感到平靜的安全感。
            </p>
            <p>
              她是一個高度晨型人。每天早起，她習慣給自己沖煮一杯香醇的手沖耶加雪菲咖啡，看著熱水在濾紙中打圈、咖啡粉膨脹，那段幾分鐘的專注，是她整理當日工作心流與提示詞架構最棒的沉澱時刻。
            </p>
            <p>
              下班後，如果沒有排定的課程或視訊顧問會議，她會選擇去瑜伽教室做伸展拉伸，或者獨自在台北街頭進行一場無目的的城市散步。這能幫助她釋放完美主義帶來的高壓，找回理性與感性的平衡。
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-200/80">
            <div className="space-y-1 text-center">
              <Coffee className="w-4 h-4 text-accent-darkGold mx-auto" />
              <p className="text-[10px] font-sans font-medium text-stone-850">手沖咖啡</p>
              <p className="text-[9px] text-stone-400">每日的晨間沉澱</p>
            </div>
            <div className="space-y-1 text-center">
              <Heart className="w-4 h-4 text-accent-darkGold mx-auto" />
              <p className="text-[10px] font-sans font-medium text-stone-850">瑜伽伸展</p>
              <p className="text-[9px] text-stone-400">釋放過度思考</p>
            </div>
            <div className="space-y-1 text-center">
              <Book className="w-4 h-4 text-accent-darkGold mx-auto" />
              <p className="text-[10px] font-sans font-medium text-stone-850">知性閱讀</p>
              <p className="text-[9px] text-stone-400">奠定創作養分</p>
            </div>
          </div>
        </div>

        {/* Interactive Bookstore shelf */}
        <div className="lg:col-span-7 bg-[#fcfbf9] border border-stone-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-150 pb-4">
            <div className="space-y-0.5">
              <h4 className="font-serif text-lg font-medium text-stone-900">若晴的推薦書架</h4>
              <p className="text-[11px] text-stone-400 font-light">Claire 精選對其設計美感與思維影響深遠的書籍</p>
            </div>

            {/* Book Filter categories */}
            <div className="flex flex-wrap gap-1">
              {bookCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedBookCat(cat)}
                  className={`px-2.5 py-1 rounded text-[10px] font-medium transition-all cursor-pointer ${
                    selectedBookCat === cat
                      ? 'bg-stone-900 text-stone-100'
                      : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {cat === 'all' ? '全部' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6 max-h-96 overflow-y-auto pr-1">
            {filteredBooks.map((book, i) => (
              <div key={i} className="flex gap-4 items-start p-3 hover:bg-white rounded-xl transition-all border border-transparent hover:border-stone-150">
                <div className="w-10 h-10 rounded bg-amber-50 border border-amber-100 flex items-center justify-center text-accent-darkGold shrink-0 mt-0.5">
                  <Book className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h5 className="font-serif text-sm font-medium text-stone-900">{book.title}</h5>
                    <span className="text-[9px] font-mono bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded">
                      {book.category}
                    </span>
                  </div>
                  <p className="text-[10px] font-sans text-stone-400">作者：{book.author}</p>
                  <p className="text-stone-600 text-xs font-light leading-relaxed italic pl-2 border-l border-stone-200">
                    &ldquo;{book.recommendation}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

    </div>
  );
}
