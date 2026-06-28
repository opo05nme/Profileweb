/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Compass, 
  Clock, 
  Heart, 
  MessageSquare, 
  Settings, 
  Menu, 
  X, 
  Sparkles,
  RefreshCw,
  Cpu
} from 'lucide-react';
import { Article, Consultation, Tab } from './types';

// Importing sub-views
import ProfileHero from './components/ProfileHero';
import Services from './components/Services';
import TimelineView from './components/TimelineView';
import GoalsAndLifestyle from './components/GoalsAndLifestyle';
import ContactForm from './components/ContactForm';
import AIConsultantChat from './components/AIConsultantChat';
import AdminWorkspace from './components/AdminWorkspace';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // App-level Shared Data State
  const [articles, setArticles] = useState<Article[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  // Prompt seed state: carries generated ROLE prompt to Chat companion
  const [promptSeed, setPromptSeed] = useState<string>('');

  const [loading, setLoading] = useState(true);

  // Sync / Fetch data from our full-stack Express API
  const fetchData = async () => {
    setLoading(true);
    try {
      const artResponse = await fetch('/api/articles');
      if (artResponse.ok) {
        const artData = await artResponse.json();
        setArticles(artData);
      }

      const conResponse = await fetch('/api/consultations');
      if (conResponse.ok) {
        const conData = await conResponse.json();
        setConsultations(conData);
      }
    } catch (err) {
      console.error("Error fetching full-stack data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Callbacks to sync state after admin alterations
  const handleAddArticle = (newArt: Article) => {
    setArticles(prev => [newArt, ...prev]);
  };

  const handleUpdateArticle = (updatedArt: Article) => {
    setArticles(prev => prev.map(art => art.id === updatedArt.id ? updatedArt : art));
  };

  const handleDeleteArticle = (id: string) => {
    setArticles(prev => prev.filter(art => art.id !== id));
  };

  const handleAddConsultation = (newCon: Consultation) => {
    setConsultations(prev => [newCon, ...prev]);
  };

  const handleUpdateConsultation = (updatedCon: Consultation) => {
    setConsultations(prev => prev.map(con => con.id === updatedCon.id ? updatedCon : con));
  };

  // Nav configuration
  const navItems = [
    { id: 'home', label: '首頁介紹', icon: Home },
    { id: 'services', label: '專業服務 & 專欄', icon: Compass },
    { id: 'timeline', label: '履歷歷程', icon: Clock },
    { id: 'lifestyle', label: '生活與目標', icon: Heart },
    { id: 'contact', label: '預約與 AI 顧問', icon: MessageSquare },
    { id: 'admin', label: '若晴後台', icon: Settings, isBadge: true }
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 font-sans antialiased flex flex-col md:flex-row">
      
      {/* 1. Sidebar Navigation (Desktop only) */}
      <aside className="hidden md:flex flex-col w-64 bg-[#fcfbf9] text-stone-800 p-6 space-y-8 border-r border-stone-200/80 shrink-0 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-100/30 to-transparent z-0 pointer-events-none" />
        
        {/* Sidebar Header Logo */}
        <div className="relative z-10 py-2 border-b border-stone-200/80 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-darkGold to-amber-100 flex items-center justify-center font-serif text-white font-bold text-sm tracking-wider shadow-sm">
              CL
            </span>
            <h1 className="font-serif text-lg font-medium tracking-tight text-stone-900">林若晴 Claire Lin</h1>
          </div>
          <p className="text-[10px] font-mono tracking-wider text-accent-darkGold uppercase font-semibold">
            AI 內容策略顧問 / 講師
          </p>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="relative z-10 flex-grow flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as Tab);
                  if (item.id !== 'services') setSelectedArticle(null); // Clear selected article unless we stay in services
                }}
                className={`w-full px-4 py-3 rounded-xl font-sans text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-[#f5f2eb] text-stone-900 shadow-sm border-l-2 border-accent-darkGold'
                    : 'text-stone-500 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-accent-darkGold' : 'opacity-60'}`} />
                  <span>{item.label}</span>
                </div>
                {item.isBadge && consultations.filter(c => c.status === 'pending').length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="relative z-10 pt-4 border-t border-stone-200/80 flex items-center justify-between text-[10px] font-mono text-stone-400">
          <span>CLAIRE LIN © 2026</span>
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-accent-darkGold animate-pulse" />
            <span className="text-[9px] text-accent-darkGold/75">AI COMPANION</span>
          </div>
        </div>
      </aside>

      {/* 2. Top Header Navigation (Mobile only) */}
      <header className="md:hidden bg-[#fcfbf9] text-stone-900 p-4 sticky top-0 z-40 flex items-center justify-between border-b border-stone-200/80 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded bg-accent-darkGold flex items-center justify-center font-serif text-white font-bold text-xs">
            CL
          </span>
          <h1 className="font-serif text-base font-medium tracking-tight text-stone-900">林若晴 Claire Lin</h1>
        </div>
        
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-600 transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#fcfbf9] text-stone-800 border-b border-stone-200/80 absolute top-[57px] left-0 right-0 z-30 shadow-lg overflow-hidden flex flex-col p-4 gap-1.5"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as Tab);
                    if (item.id !== 'services') setSelectedArticle(null);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 rounded-lg font-sans text-xs font-medium transition-all flex items-center gap-3 cursor-pointer text-left ${
                    isActive
                      ? 'bg-[#f5f2eb] text-stone-900 border-l-2 border-accent-darkGold'
                      : 'text-stone-500 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-accent-darkGold' : 'opacity-60'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Main Workspace Area */}
      <main className="flex-grow p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full overflow-x-hidden">
        {loading ? (
          /* Loading overlay */
          <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
            <RefreshCw className="w-10 h-10 text-accent-darkGold animate-spin" />
            <p className="text-sm text-stone-500 font-light font-sans">正在加載若晴的個人資料與觀點專欄...</p>
          </div>
        ) : (
          /* Route transition wrapper */
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="space-y-12"
            >
              {activeTab === 'home' && (
                <ProfileHero 
                  articles={articles} 
                  setActiveTab={setActiveTab} 
                  setSelectedArticle={setSelectedArticle}
                />
              )}

              {activeTab === 'services' && (
                <Services 
                  articles={articles} 
                  selectedArticle={selectedArticle}
                  setSelectedArticle={setSelectedArticle}
                  setActiveTab={setActiveTab}
                  setPromptSeed={setPromptSeed}
                />
              )}

              {activeTab === 'timeline' && (
                <TimelineView />
              )}

              {activeTab === 'lifestyle' && (
                <GoalsAndLifestyle />
              )}

              {activeTab === 'contact' && (
                <div className="space-y-16">
                  {/* Hero Intro for contact page */}
                  <div className="text-center max-w-2xl mx-auto space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-mono tracking-wider uppercase">
                      <Sparkles className="w-3.5 h-3.5 text-accent-darkGold" />
                      MEET CLAIRE OR ASK HER CO-PILOT
                    </div>
                    <h2 className="font-serif text-3xl font-medium tracking-tight text-stone-900">
                      開啟智慧對話，引導無限可能
                    </h2>
                    <p className="text-sm text-stone-500 font-light leading-relaxed">
                      不論您是想體驗與 Claire 同等風格的 **AI 內容策略諮詢**，還是需要預約實際的**企業內訓或顧問合作**，都可以在此與我們取得聯繫。
                    </p>
                  </div>

                  {/* Dual Grid: AI Chatbot on left, intake form on right */}
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                    {/* Left: Chat Widget */}
                    <div className="xl:col-span-6 space-y-4">
                      <div className="flex items-center justify-between pl-1">
                        <h3 className="font-serif text-sm font-medium text-stone-900">與若晴的 AI 助理對話</h3>
                        <span className="text-[10px] font-mono text-stone-400">⚡ 24/7 線上即時諮詢</span>
                      </div>
                      <AIConsultantChat 
                        promptSeed={promptSeed} 
                        setPromptSeed={setPromptSeed}
                        setActiveTab={setActiveTab}
                      />
                    </div>

                    {/* Right: Consultation intake Form */}
                    <div className="xl:col-span-6 space-y-4">
                      <div className="flex items-center justify-between pl-1">
                        <h3 className="font-serif text-sm font-medium text-stone-900">填寫正式諮詢委託</h3>
                        <span className="text-[10px] font-mono text-stone-400">⏳ 2 工作天內信件回覆</span>
                      </div>
                      <ContactForm 
                        onSuccessSubmit={handleAddConsultation} 
                        setActiveTab={setActiveTab}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'admin' && (
                <AdminWorkspace 
                  articles={articles}
                  consultations={consultations}
                  onRefreshData={fetchData}
                  onAddArticle={handleAddArticle}
                  onUpdateArticle={handleUpdateArticle}
                  onDeleteArticle={handleDeleteArticle}
                  onUpdateConsultation={handleUpdateConsultation}
                />
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

    </div>
  );
}
