/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Mail, MapPin, Send, CheckCircle2, AlertCircle, Compass, ShieldCheck } from 'lucide-react';
import { Tab } from '../types';

interface ContactFormProps {
  onSuccessSubmit: (newInquiry: any) => void;
  setActiveTab: (tab: Tab) => void;
}

export default function ContactForm({ onSuccessSubmit, setActiveTab }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [serviceType, setServiceType] = useState('ai-workflow');
  const [bottlenecks, setBottlenecks] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !serviceType || !bottlenecks) {
      setErrorMsg('請填寫所有必填欄位。');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, role, serviceType, bottlenecks })
      });

      if (!response.ok) {
        throw new Error('Submit failed');
      }

      const data = await response.json();
      onSuccessSubmit(data); // Propagate to central state
      setSuccess(true);
      
      // Reset form
      setName('');
      setEmail('');
      setCompany('');
      setRole('');
      setServiceType('ai-workflow');
      setBottlenecks('');

    } catch (err) {
      console.error(err);
      setErrorMsg('提交失敗，請檢查網路連接後再試。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12" id="consultation-form-anchor">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Contact info and scheduling expectation */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-50 text-accent-darkGold border border-amber-200/50 text-[10px] font-mono tracking-wider uppercase">
              <Calendar className="w-3 h-3" />
              Book a session
            </div>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-stone-900 leading-tight">
              開始您的 <br />
              <span className="text-accent-darkGold italic font-normal">內容優化第一步</span>
            </h2>
            <p className="text-stone-600 text-xs font-light leading-relaxed text-justify">
              不論您是想為企業團隊導入 **AI 內容生產 SOP**，還是需要**品牌線上課程定位與招生包裝**，都歡迎填寫預約表單。若晴會在收到表單的 2 個工作天內主動與您回信聯繫。
            </p>
          </div>

          {/* Quick Contact metadata */}
          <div className="space-y-4 bg-[#fcfbf9] border border-stone-200/80 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-mono font-medium text-stone-400 uppercase tracking-wider border-b border-stone-150 pb-2 mb-3">
              聯絡與諮詢須知
            </h3>
            
            <div className="space-y-3">
              <div className="flex gap-3 items-start text-xs font-light text-stone-600">
                <Mail className="w-4 h-4 text-accent-darkGold shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-stone-900">電子信箱 (Email)</p>
                  <p className="font-mono text-[11px] text-stone-600">claire.lin@example.com (模擬聯絡)</p>
                </div>
              </div>

              <div className="flex gap-3 items-start text-xs font-light text-stone-600">
                <MapPin className="w-4 h-4 text-accent-darkGold shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-stone-900">工作室據點 (Office)</p>
                  <p className="text-stone-600">台灣台北市大安區 (鄰近大安森林公園)</p>
                </div>
              </div>

              <div className="flex gap-3 items-start text-xs font-light text-stone-600">
                <ShieldCheck className="w-4 h-4 text-accent-darkGold shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-stone-900">30 分鐘免費探索會議</p>
                  <p className="text-stone-600">經審核初步合適之委託，我會邀請您進行 30 分鐘的 Zoom/Meet 線上初步對焦與需求診斷，此會議完全免費。</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#fcfbf9] text-stone-900 rounded-xl p-5 border border-stone-200/80 space-y-3 shadow-sm">
            <h4 className="font-serif text-sm font-medium text-accent-darkGold flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-accent-darkGold" />
              Claire 的合作風格
            </h4>
            <p className="text-[11px] text-stone-600 leading-relaxed font-light">
              「我深信每一場顧問案都不是公式套用。我會親自研究你們既有的社群、文章或日常流程瓶頸，梳理出一套有厚度、具備美感與邏輯的內容架構。這需要雙方真誠的溝通與共同努力。」
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Intake Form */}
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-sm">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div 
                key="success-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-10 space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-medium text-stone-900">諮詢表單已成功送出！</h3>
                  <p className="text-xs text-stone-500 font-light max-w-md mx-auto leading-relaxed">
                    謝謝您的信任。若晴已收到您的預約資訊。她將仔細評估您提到的瓶頸，並於 2 個工作天內回信與您確認 Zoom 免費探索會議的時段！
                  </p>
                </div>
                <div className="flex gap-4 justify-center pt-4">
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-4 py-2 border border-stone-300 hover:border-stone-800 text-stone-700 font-sans text-xs font-medium rounded-xl transition-all cursor-pointer"
                  >
                    再填寫一份
                  </button>
                  <button
                    onClick={() => setActiveTab('admin')}
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-stone-100 font-sans text-xs font-medium rounded-xl transition-all cursor-pointer"
                  >
                    前往後台查看 (Admin)
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form 
                key="intake-form"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {errorMsg && (
                  <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-3 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-700">
                      您的姓名 <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="例如：林先生 / Claire"
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-stone-800 font-sans"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-700">
                      電子信箱 <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-stone-800 font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Company */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-700">
                      公司名稱 / 組織機構 <span className="text-stone-400">(選填)</span>
                    </label>
                    <input 
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="例如：美美行銷工作室"
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-stone-800 font-sans"
                    />
                  </div>

                  {/* Role */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-700">
                      職稱 / 角色身份 <span className="text-stone-400">(選填)</span>
                    </label>
                    <input 
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="例如：品牌創辦人 / 專案經理"
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-stone-800 font-sans"
                    />
                  </div>
                </div>

                {/* Service type */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-stone-700">
                    預約諮詢服務項目 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-stone-800 font-sans text-stone-800"
                  >
                    <option value="ai-workflow">企業 AI 內容生產工作流優化 (顧問導入)</option>
                    <option value="brand-positioning">品牌行銷企劃與線上課程定位 (講師包裝)</option>
                    <option value="workshop">生成式 AI 行銷實作工作坊 (團體企業內訓)</option>
                    <option value="other">其他合作需求諮詢</option>
                  </select>
                </div>

                {/* Bottlenecks / Details */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-stone-700">
                    請描述您目前的『內容產出瓶頸』或希望 AI 解決的問題 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={bottlenecks}
                    onChange={(e) => setBottlenecks(e.target.value)}
                    placeholder="請簡述您的既有流程、使用的工具，以及目前最卡關的地方（例如：社群貼文耗費太多時間、AI 產出文案不夠精準、想為講師設計課程招生大綱等...）這能幫若晴進行會前研究。"
                    className="w-full px-3 py-2.5 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-stone-800 font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-stone-100 disabled:bg-stone-100 disabled:text-stone-400 font-sans text-xs font-medium rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  {loading ? '正在發送表單...' : '送出策略諮詢預約'}
                  <Send className="w-3.5 h-3.5" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
