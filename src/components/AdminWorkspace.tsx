/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Inbox, Plus, Trash2, Edit2, Check, RefreshCw, Send, X, Eye, CheckCircle2 } from 'lucide-react';
import { Article, Consultation } from '../types';

interface AdminWorkspaceProps {
  articles: Article[];
  consultations: Consultation[];
  onRefreshData: () => void;
  onAddArticle: (newArt: Article) => void;
  onUpdateArticle: (updatedArt: Article) => void;
  onDeleteArticle: (id: string) => void;
  onUpdateConsultation: (updatedCon: Consultation) => void;
}

export default function AdminWorkspace({
  articles,
  consultations,
  onRefreshData,
  onAddArticle,
  onUpdateArticle,
  onDeleteArticle,
  onUpdateConsultation
}: AdminWorkspaceProps) {
  const [activeSubTab, setActiveSubTab] = useState<'inbox' | 'articles'>('inbox');
  
  // Consultation review detail modal/card
  const [selectedCon, setSelectedCon] = useState<Consultation | null>(null);

  // Article editor state
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editorTitle, setEditorTitle] = useState('');
  const [editorCategory, setEditorCategory] = useState<'AI 應用' | '品牌行銷' | '內容企劃' | '職涯成長'>('AI 應用');
  const [editorSummary, setEditorSummary] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [editorReadTime, setEditorReadTime] = useState('5 分鐘');
  
  const [loading, setLoading] = useState(false);

  const handleOpenEdit = (art: Article) => {
    setEditingArticle(art);
    setEditorTitle(art.title);
    setEditorCategory(art.category);
    setEditorSummary(art.summary);
    setEditorContent(art.content);
    setEditorReadTime(art.readTime);
    setIsCreating(false);
  };

  const handleOpenCreate = () => {
    setEditingArticle(null);
    setEditorTitle('');
    setEditorCategory('AI 應用');
    setEditorSummary('');
    setEditorContent('');
    setEditorReadTime('5 分鐘');
    setIsCreating(true);
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editorTitle || !editorContent) {
      alert("請填寫標題與內容！");
      return;
    }

    setLoading(true);
    try {
      if (isCreating) {
        // CREATE
        const response = await fetch('/api/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: editorTitle,
            category: editorCategory,
            summary: editorSummary,
            content: editorContent,
            readTime: editorReadTime
          })
        });
        if (response.ok) {
          const newArt = await response.json();
          onAddArticle(newArt);
          setIsCreating(false);
        }
      } else if (editingArticle) {
        // UPDATE
        const response = await fetch(`/api/articles/${editingArticle.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: editorTitle,
            category: editorCategory,
            summary: editorSummary,
            content: editorContent,
            readTime: editorReadTime
          })
        });
        if (response.ok) {
          const updatedArt = await response.json();
          onUpdateArticle(updatedArt);
          setEditingArticle(null);
        }
      }
    } catch (err) {
      console.error(err);
      alert("文章儲存失敗！");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArt = async (id: string) => {
    if (!window.confirm("確定要刪除這篇專欄文章嗎？此操作無法還原。")) return;

    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        onDeleteArticle(id);
      }
    } catch (err) {
      console.error(err);
      alert("刪除文章失敗！");
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: 'pending' | 'reviewed' | 'contacted') => {
    try {
      const response = await fetch(`/api/consultations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        const updatedCon = await response.json();
        onUpdateConsultation(updatedCon);
        if (selectedCon && selectedCon.id === id) {
          setSelectedCon(updatedCon);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#fcfbf9] text-stone-900 p-6 rounded-2xl border border-stone-200/80 shadow-sm">
        <div className="space-y-1">
          <h2 className="font-serif text-2xl font-medium flex items-center gap-2 text-stone-900">
            若晴的專業工作台 (Claire's Workspace)
          </h2>
          <p className="text-xs text-stone-500 font-light">
            管理來自公共網站的策略預約、發布最新專欄文章與提示詞範本
          </p>
        </div>
        <button 
          onClick={onRefreshData}
          className="px-4 py-2 bg-white hover:bg-stone-50 text-stone-700 text-xs font-mono font-medium rounded-xl border border-stone-200 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          重新整理數據
        </button>
      </div>

      {/* Admin Tabs switcher */}
      <div className="flex border-b border-stone-200">
        <button
          onClick={() => {
            setActiveSubTab('inbox');
            setIsCreating(false);
            setEditingArticle(null);
          }}
          className={`px-5 py-3 text-sm font-sans font-medium transition-all flex items-center gap-2 border-b-2 cursor-pointer ${
            activeSubTab === 'inbox'
              ? 'border-stone-900 text-stone-900'
              : 'border-transparent text-stone-500 hover:text-stone-950'
          }`}
        >
          <Inbox className="w-4 h-4" />
          預約諮詢收件夾 ({consultations.length})
        </button>
        <button
          onClick={() => setActiveSubTab('articles')}
          className={`px-5 py-3 text-sm font-sans font-medium transition-all flex items-center gap-2 border-b-2 cursor-pointer ${
            activeSubTab === 'articles'
              ? 'border-stone-900 text-stone-900'
              : 'border-transparent text-stone-500 hover:text-stone-950'
          }`}
        >
          <FileText className="w-4 h-4" />
          專欄專題發布與編輯 ({articles.length})
        </button>
      </div>

      {/* Content area */}
      <div className="min-h-[400px]">
        {activeSubTab === 'inbox' ? (
          /* SubTab 1: Consultation Inbox */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Consultation list */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-xs font-mono font-medium text-stone-400 uppercase tracking-widest">
                最近收到的委託
              </h3>
              
              {consultations.length === 0 ? (
                <div className="p-8 border border-dashed border-stone-200 rounded-xl text-center text-stone-400 text-xs">
                  目前尚無任何預約表單。
                </div>
              ) : (
                <div className="space-y-3">
                  {consultations.map((con) => (
                    <div
                      key={con.id}
                      onClick={() => setSelectedCon(con)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                        selectedCon?.id === con.id
                          ? 'bg-amber-50/50 border-amber-300 shadow-sm'
                          : 'bg-white border-stone-200 hover:border-stone-350'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-sans font-medium text-xs text-stone-900">
                          {con.name} {con.company ? `| ${con.company}` : ''}
                        </h4>
                        
                        {/* Status tag */}
                        <span className={`px-2 py-0.5 text-[9px] font-mono font-medium rounded-full ${
                          con.status === 'pending'
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : con.status === 'reviewed'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {con.status === 'pending' ? '未審閱' : con.status === 'reviewed' ? '已分析' : '已聯絡'}
                        </span>
                      </div>

                      <p className="text-[10px] font-mono text-stone-400 mb-2">
                        {new Date(con.createdAt).toLocaleString()}
                      </p>
                      
                      <p className="text-stone-500 text-xs font-light line-clamp-2 leading-relaxed">
                        {con.bottlenecks}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Consultation detail card */}
            <div className="lg:col-span-7 bg-stone-50 border border-stone-200 rounded-2xl p-6 min-h-[300px]">
              {selectedCon ? (
                <div className="space-y-6">
                  
                  {/* Title */}
                  <div className="flex justify-between items-start border-b border-stone-200 pb-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono bg-stone-200 text-stone-700 px-2 py-0.5 rounded">
                        ID: {selectedCon.id}
                      </span>
                      <h3 className="font-serif text-lg font-medium text-stone-900">{selectedCon.name}</h3>
                      <p className="text-xs text-stone-500 font-mono">{selectedCon.email}</p>
                    </div>

                    {/* Change Status select */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-stone-400 block text-right">變更處理進度：</label>
                      <select
                        value={selectedCon.status}
                        onChange={(e) => handleUpdateStatus(selectedCon.id, e.target.value as any)}
                        className="px-2.5 py-1 text-xs bg-white border border-stone-200 rounded focus:outline-none focus:border-stone-800 font-sans"
                      >
                        <option value="pending">待審閱 (Pending)</option>
                        <option value="reviewed">已需求分析 (Reviewed)</option>
                        <option value="contacted">已主動聯絡 (Contacted)</option>
                      </select>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="font-mono text-stone-400 uppercase text-[9px] tracking-wider">諮詢公司名稱：</p>
                      <p className="font-sans font-medium text-stone-850">{selectedCon.company || '未填寫 / 個人獨立工作者'}</p>
                    </div>
                    <div>
                      <p className="font-mono text-stone-400 uppercase text-[9px] tracking-wider">來訪者職稱：</p>
                      <p className="font-sans font-medium text-stone-850">{selectedCon.role || '未填寫'}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-mono text-stone-400 uppercase text-[9px] tracking-wider">意向服務類別：</p>
                      <p className="font-sans font-medium text-stone-850">
                        {selectedCon.serviceType === 'ai-workflow' 
                          ? '企業 AI 內容工作流優化' 
                          : selectedCon.serviceType === 'brand-positioning'
                          ? '品牌行銷企劃與線上課程定位'
                          : selectedCon.serviceType === 'workshop'
                          ? '生成式 AI 行銷實作工作坊'
                          : '其他合作諮詢'}
                      </p>
                    </div>
                  </div>

                  {/* Bottlenecks narrative box */}
                  <div className="space-y-1.5 bg-white border border-stone-200 rounded-xl p-4">
                    <p className="font-mono text-stone-400 uppercase text-[9px] tracking-wider">瓶頸與痛點自述：</p>
                    <p className="text-stone-700 text-xs font-light leading-relaxed whitespace-pre-wrap">
                      {selectedCon.bottlenecks}
                    </p>
                  </div>

                  {/* Admin action memo / suggestions */}
                  <div className="border-t border-stone-200 pt-5 space-y-3">
                    <h4 className="text-[10px] font-mono font-medium text-stone-400 uppercase tracking-widest">
                      若晴的診斷思路 (Claire's Diagnostics)
                    </h4>
                    <div className="text-xs text-stone-600 space-y-2 font-light leading-relaxed bg-amber-50/20 border border-amber-200/40 rounded-xl p-3">
                      <p className="font-medium text-amber-900">💡 會前對焦建議：</p>
                      {selectedCon.serviceType === 'ai-workflow' ? (
                        <p>此客戶痛點在於 AI 回答生硬不符合品牌語氣。可以初步規劃一套客製化的 ROLE 貼文大綱生成模板，並在 Zoom 會議時，當場用他們的主題示範，以此展示人機協作流程的可行性。</p>
                      ) : selectedCon.serviceType === 'workshop' ? (
                        <p>此為團體內訓工作坊需求。建議了解其教研團隊平常最常使用的教材類型與工具，為其客製化『簡報大綱生成』與『影音腳本撰寫』的實作環節，提高課程落地滿意度。</p>
                      ) : (
                        <p>請於兩天內安排 30 分鐘 Meet 線上免費診斷。初步回信中，可附帶若晴近期撰寫的專欄文章作為理念認同建立的第一步。</p>
                      )}
                    </div>
                  </div>

                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-center text-stone-400 space-y-2">
                  <Inbox className="w-12 h-12 opacity-30" />
                  <p className="text-xs">尚未選擇任何預約委託</p>
                  <p className="text-[10px]">點擊左側列表即可展開查看、修改狀態及診斷分析</p>
                </div>
              )}
            </div>

          </div>
        ) : (
          /* SubTab 2: Article Editor and publisher */
          <div className="space-y-8">
            
            <AnimatePresence mode="wait">
              {isCreating || editingArticle ? (
                /* Editor Form */
                <motion.form
                  key="editor-form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSaveArticle}
                  className="bg-stone-50 border border-stone-200 rounded-2xl p-6 md:p-8 space-y-5"
                >
                  <div className="flex justify-between items-center border-b border-stone-200 pb-4">
                    <h3 className="font-serif text-lg font-medium text-stone-900">
                      {isCreating ? '撰寫全新專欄觀點' : `正在編輯文章: ${editingArticle?.title}`}
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreating(false);
                        setEditingArticle(null);
                      }}
                      className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-500 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Title */}
                    <div className="md:col-span-8 space-y-1">
                      <label className="text-xs font-medium text-stone-700">文章標題</label>
                      <input
                        type="text"
                        required
                        value={editorTitle}
                        onChange={(e) => setEditorTitle(e.target.value)}
                        placeholder="請輸入一個有吸引力的標題..."
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-stone-800 font-sans"
                      />
                    </div>

                    {/* Category */}
                    <div className="md:col-span-4 space-y-1">
                      <label className="text-xs font-medium text-stone-700">文章分類</label>
                      <select
                        value={editorCategory}
                        onChange={(e) => setEditorCategory(e.target.value as any)}
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-stone-800 font-sans"
                      >
                        <option value="AI 應用">AI 應用</option>
                        <option value="品牌行銷">品牌行銷</option>
                        <option value="內容企劃">內容企劃</option>
                        <option value="職涯成長">職涯成長</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Read Time */}
                    <div className="md:col-span-4 space-y-1">
                      <label className="text-xs font-medium text-stone-700">預估閱讀時間</label>
                      <input
                        type="text"
                        required
                        value={editorReadTime}
                        onChange={(e) => setEditorReadTime(e.target.value)}
                        placeholder="例如：5 分鐘"
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-stone-800 font-sans"
                      />
                    </div>

                    {/* Summary */}
                    <div className="md:col-span-8 space-y-1">
                      <label className="text-xs font-medium text-stone-700">文章簡短導讀 (Summary)</label>
                      <input
                        type="text"
                        value={editorSummary}
                        onChange={(e) => setEditorSummary(e.target.value)}
                        placeholder="選填。若不填則預設擷取正文前 100 字作為社群卡片摘要..."
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-stone-800 font-sans"
                      />
                    </div>
                  </div>

                  {/* Markdown Content */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-700">文章內文 (Markdown 格式)</label>
                    <textarea
                      required
                      rows={12}
                      value={editorContent}
                      onChange={(e) => setEditorContent(e.target.value)}
                      placeholder="請使用 Markdown 標籤排版。例如：## 一級標題、### 二級標題、* 加粗 *"
                      className="w-full px-3.5 py-3 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-stone-800 font-mono resize-none leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 disabled:bg-stone-100 disabled:text-stone-400 font-sans text-xs font-medium rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    {loading ? '儲存中...' : '儲存並公開發布'}
                  </button>
                </motion.form>
              ) : (
                /* Article Table / Grid */
                <motion.div
                  key="article-table"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-mono font-medium text-stone-400 uppercase tracking-widest">
                      專欄清單列表
                    </h3>
                    <button
                      onClick={handleOpenCreate}
                      className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-sans font-medium rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      發布全新文章
                    </button>
                  </div>

                  <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-mono font-medium uppercase text-[10px] tracking-wider">
                          <th className="p-4">標題與導讀</th>
                          <th className="p-4">文章分類</th>
                          <th className="p-4">發布日期</th>
                          <th className="p-4 text-center">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {articles.map((art) => (
                          <tr key={art.id} className="hover:bg-stone-50/50 transition-colors">
                            <td className="p-4 max-w-sm">
                              <p className="font-serif font-medium text-stone-900 text-sm line-clamp-1">{art.title}</p>
                              <p className="text-stone-400 text-[10px] font-light line-clamp-1 mt-1">{art.summary}</p>
                            </td>
                            <td className="p-4">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-stone-100 text-stone-600">
                                {art.category}
                              </span>
                            </td>
                            <td className="p-4 font-mono text-stone-500">{art.date}</td>
                            <td className="p-4 text-center">
                              <div className="flex justify-center gap-2">
                                <button
                                  onClick={() => handleOpenEdit(art)}
                                  className="p-1.5 rounded-lg hover:bg-stone-150 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                                  title="編輯"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteArt(art.id)}
                                  className="p-1.5 rounded-lg hover:bg-stone-150 text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                                  title="刪除"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

    </div>
  );
}
