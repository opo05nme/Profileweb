/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase, GraduationCap, ChevronDown, ChevronUp, Star, Award } from 'lucide-react';
import { TimelineItem } from '../types';

export default function TimelineView() {
  const [expandedId, setExpandedId] = useState<string | null>("work-1");

  const timelineData: TimelineItem[] = [
    {
      id: "work-1",
      period: "2024 年 至今",
      role: "AI 內容策略顧問 ／ 自由講師",
      company: "個人工作室 / 自由接案",
      type: "work",
      description: "協助中小企業、教育單位、講師與自由工作者導入生成式 AI 工具，全面升級內容產製工作流與效率。顧問風格並非只講工具，而是深入理解客戶具體痛點，設計最接地氣的 AI 應用流程。",
      details: [
        "規劃並交付企業內訓『生成式 AI 在行銷企劃與內容包裝中的應用』。",
        "協助公司團隊建立提示詞模板（Prompt Template）與內容產製 SOP，縮短 40% 的常規內容編寫時程。",
        "為講師設計高轉化的 AI 內容產製工作流，包含文案大綱發想、簡報初稿大綱生成、社群貼文規劃等。",
        "為社區大學、非營利組織、中高齡學員規劃與教授客製化的 AI 生活與行政流程應用課程。"
      ]
    },
    {
      id: "work-2",
      period: "2020 年 － 2024 年",
      role: "資深品牌企劃 ／ 講師包裝顧問",
      company: "知名教育科技公司 (EdTech Company)",
      type: "work",
      description: "負責成人教育線上與線下課程產品的定位、文案行銷、招生策略與講師品牌塑造。成功打通專業內容到爆款熱銷課程的最後一公里路。",
      details: [
        "主導規劃並推廣多款百萬級線上課程產品，包含一場超過 500 人線上報名的精準教育講座。",
        "撰寫高轉換招生文案、社群貼文、EDM 與整合活動宣傳頁，精準觸及成人學習市場痛點。",
        "作為轉譯者，協助講師從零梳理其深硬的專業，淬鍊出具備高共鳴、高吸引力的課程亮點與大綱結構。",
        "跨部門協調整合設計、影音、社群廣告數據、客服與教研專案，建立高效率的線上發售流程。"
      ]
    },
    {
      id: "work-3",
      period: "2017 年 － 2020 年",
      role: "專題編輯 ／ 人物採訪記者",
      company: "生活風格媒體平台",
      type: "work",
      description: "負責深度人物採訪、品牌合作品牌故事文章、專題企劃與社群多媒體內容。在日常採訪中深度磨練了故事包裝與議題敏感度。",
      details: [
        "獨立策劃多個熱門專欄專題，包含女性職涯成長、青年返鄉故事、地方創生及文化手作產業。",
        "深度訪談與撰寫超過 20 位地方創業者與品牌人物故事，能從平凡經驗中淬鍊核心精神與議題張力。",
        "策劃與社群、影音小組合作，將傳統文字專案轉化為懶人包、短影片指令，成功提升 30% 專題擴散率。"
      ]
    },
    {
      id: "work-4",
      period: "2015 年 － 2017 年",
      role: "視覺設計助理",
      company: "精緻視覺設計工作室",
      type: "work",
      description: "負責大型活動主視覺細節修潤、企業簡報排版、社群宣傳素材製作及展覽文案排版設計。在此階段培養了極高的視覺品味與嚴謹的排版排程能力。",
      details: [
        "協助資深設計師執行品牌識別（CI）提案、活動大會手冊、海報排版與實體文宣校對。",
        "專責將客戶冗長生硬的商業數據和簡報架構，重構為具有優雅字體階層與明晰資訊流的高質感簡報。",
        "培養了在高壓、敏捷、緊急修改等步調緊湊環境中，依舊保持細膩與穩定交付品質的能力。"
      ]
    },
    {
      id: "edu-1",
      period: "2013 年 － 2015 年",
      role: "傳播碩士 (研究社群與知識品牌建立)",
      company: "國立政治大學 傳播學院",
      type: "education",
      description: "主要探討數位媒體與受眾行為。研究論文以《社群媒體時代下的知識型品牌經營》為題，深度分析講師、顧問等專業工作者，如何藉由社群建立信任，成為個人品牌成功的基礎。",
      details: [
        "系統化修習了數位媒體行銷、使用者經驗分析、質化訪談及傳播理論。",
        "分析過數十個國內外成功的線上教育、知識訂閱與顧問個人品牌經營路徑。"
      ]
    },
    {
      id: "edu-2",
      period: "2009 年 － 2013 年",
      role: "圖文傳播學士 (主修視覺設計與出版企劃)",
      company: "國立台灣師範大學 圖文傳播學系",
      type: "education",
      description: "在學期間專注於視覺設計、影像故事、數位出版與媒體企劃。在台師大奠定了我『不只關注畫面好看，更在乎觀眾是否看懂與理解』的設計轉譯哲學。",
      details: [
        "掌握攝影、數位排版、印刷與基礎網頁設計技能。",
        "與團隊合作多個專題企劃案，負責簡報框架規劃與展覽成果主視覺。"
      ]
    },
    {
      id: "edu-3",
      period: "2006 年 － 2009 年",
      role: "校刊社副社長 (採訪與排版編輯啟蒙)",
      company: "台中市立台中第一女子高級中學 (台中女中)",
      type: "education",
      description: "高中時期擔任校刊社副社長，主辦多次人物專訪與編輯專題。那段歲月讓我第一次感受到『把文字和版面做好，能產生感動人的能量』。",
      details: [
        "負責校內專欄企劃、採訪市內文化工作者、並親自動手調整網格系統與排版。"
      ]
    }
  ];

  const representativeAchievements = [
    { text: "協助導入 AI 文案 SOP，使合作企業之社群內容產出時程減少約 40%。", icon: "🤖" },
    { text: "主導推廣一場高達 500 人線上報名之付費資安教育講座。", icon: "📈" },
    { text: "協助一位專業講師從零開始建置個人品牌，3 個月內累積首批付費學員。", icon: "🎓" },
    { text: "專題編輯時期，深度訪談、撰寫、包裝超過 20 位地方創業者與品牌故事。", icon: "✍️" },
    { text: "受邀擔任知名企業內訓講師，主題為《生成式 AI 在行銷企劃中的落地應用》。", icon: "🏛️" }
  ];

  return (
    <div className="space-y-16">
      
      {/* Overview Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-stone-900">
            十年淬鍊：<span className="text-accent-darkGold italic font-normal">從美感到邏輯的跨界歷程</span>
          </h2>
          <p className="text-stone-600 text-sm font-light leading-relaxed">
            林若晴的職涯起步於**視覺設計助理**，在細節修改和緊急排程中訓練出嚴謹的美感直覺；隨後在**生活風格媒體**擔任專題編輯，提煉了傾聽、提問與議題包裝的故事靈魂。
          </p>
          <p className="text-stone-600 text-sm font-light leading-relaxed">
            在進入**教育科技產業**後，她將這兩者結合，專攻品牌企劃與課程轉譯，深諳如何讓專業內容走入大眾視野。如今，她作為**AI內容策略顧問**，引導眾多團隊掌握人機協作的高效未來。
          </p>
        </div>

        {/* Highlight Stats Box */}
        <div className="lg:col-span-5 bg-[#fcfbf9] text-stone-900 rounded-2xl p-6 border border-stone-200/80 space-y-5 shadow-sm">
          <div className="flex items-center gap-2 border-b border-stone-150 pb-3">
            <Award className="w-5 h-5 text-accent-darkGold" />
            <span className="text-xs font-mono text-accent-darkGold tracking-wider font-semibold">REPRESENTATIVE MILESTONES</span>
          </div>
          <div className="space-y-4">
            {representativeAchievements.map((item, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <span className="text-sm shrink-0">{item.icon}</span>
                <p className="text-stone-600 text-xs font-light leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chronological Timeline */}
      <section className="space-y-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <h3 className="font-serif text-xl font-medium text-stone-900">履歷年表</h3>
          <span className="text-xs text-stone-400 font-mono">點擊項目可查看具體職責細節</span>
        </div>

        <div className="relative border-l border-stone-200 ml-4 md:ml-6 pl-6 md:pl-10 space-y-12">
          {timelineData.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div key={item.id} className="relative group">
                
                {/* Bullet Icon */}
                <div className={`absolute -left-[35px] md:-left-[51px] top-1.5 w-7 h-7 rounded-full border border-stone-200 flex items-center justify-center transition-all ${
                  isExpanded 
                    ? 'bg-accent-darkGold text-white ring-4 ring-amber-50' 
                    : 'bg-white text-stone-500 hover:border-stone-400 group-hover:text-stone-900'
                }`}>
                  {item.type === 'work' ? (
                    <Briefcase className="w-3.5 h-3.5" />
                  ) : (
                    <GraduationCap className="w-3.5 h-3.5" />
                  )}
                </div>

                {/* Content Box */}
                <div 
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className={`bg-white border rounded-2xl p-5 md:p-6 transition-all duration-300 cursor-pointer ${
                    isExpanded 
                      ? 'border-accent-darkGold/50 shadow-md ring-1 ring-amber-100' 
                      : 'border-stone-200 hover:border-stone-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-3">
                    <span className="text-xs font-mono font-semibold text-accent-darkGold uppercase tracking-wider">
                      {item.period}
                    </span>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-stone-400">
                      <span>{item.company}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-serif text-lg font-medium text-stone-900 group-hover:text-amber-800 transition-colors">
                        {item.role}
                      </h4>
                      <p className="text-stone-500 text-xs font-light mt-1.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="text-stone-400 shrink-0 pt-1">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>

                  {/* Expanded detail list */}
                  {isExpanded && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mt-5 pt-4 border-t border-stone-100 overflow-hidden"
                    >
                      <h5 className="text-[10px] font-mono font-medium text-stone-400 uppercase tracking-widest mb-3">
                        主要工作內容與實績：
                      </h5>
                      <ul className="space-y-2.5">
                        {item.details.map((detail, idx) => (
                          <li key={idx} className="flex gap-2.5 items-start text-xs text-stone-700 font-light leading-relaxed">
                            <Star className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
