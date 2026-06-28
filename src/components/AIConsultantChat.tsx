/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, Bot, User, Trash2, ArrowRight } from 'lucide-react';
import { Message, Tab } from '../types';

interface AIConsultantChatProps {
  promptSeed?: string;
  setPromptSeed?: (prompt: string) => void;
  setActiveTab: (tab: Tab) => void;
}

export default function AIConsultantChat({ 
  promptSeed, 
  setPromptSeed, 
  setActiveTab 
}: AIConsultantChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "您好！我是 Claire 林若晴的專屬 AI 助理。很高興與您相遇！\n\n作為一個 AI 內容策略顧問與品牌企劃，我能代表若晴為您提供關於：\n\n1. 💻 **AI 內容工作流導入與優化**\n2. 🎯 **個人與講師品牌定位、線上課程包裝**\n3. 📝 **文案、簡報與社群企劃設計**\n\n等專業諮詢與落地指引。您也可以在上方點選若晴在 Services 分頁設計的 **ROLE 提示詞** 並發送給我，讓我為您示範若晴的 AI 行銷應用風格！\n\n請問有什麼我可以協助您的？",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Suggested questions
  const suggestions = [
    { label: "妳的 ROLE 提示詞架構是什麼？", q: "請介紹若晴推薦的 ROLE 提示詞架構，並給我一個社群文案的範本。" },
    { label: "非技術背景如何跟妳預約合作？", q: "我想了解非技術背景的行銷企劃團隊，可以怎麼跟若晴預約企業內訓或工作流導入諮詢？" },
    { label: "如何將 AI 導入日常生活工作流程？", q: "我想將 AI 工具融入我的每日文案大綱發想和資料摘要流程，有沒有具體可落地的 SOP 建議？" },
    { label: "聊聊妳從設計助理轉型到 AI 顧問的歷程", q: "我想了解若晴是怎麼從剛畢業的視覺設計助理，經歷專題編輯、EdTech 資深企劃，最後轉型成獨立 AI 顧問的？這段心路歷程能給我一些職涯啟發嗎？" }
  ];

  // If a prompt seed was passed from the ROLE playground, auto-populate the input
  useEffect(() => {
    if (promptSeed) {
      setInput(promptSeed);
      // Optional: Clear seed after use
      if (setPromptSeed) setPromptSeed('');
      
      // Scroll to chat
      setTimeout(() => {
        const el = document.getElementById('ai-chat-anchor');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, [promptSeed]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });

      if (!response.ok) {
        throw new Error('Chat API response not ok');
      }

      const data = await response.json();
      const aiMsg: Message = {
        sender: 'ai',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      // Fallback
      const errorMsg: Message = {
        sender: 'ai',
        text: "抱歉，目前伺服器連接稍微繁忙。若您有緊急的顧問委託或企業內訓需求，非常歡迎您直接在右側（或下方）的 **「預約策略諮詢」** 表單留下您的聯絡方式，若晴將親自回覆您！",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm("確定要清空與 AI 顧問的聊天紀錄嗎？")) {
      setMessages([
        {
          sender: 'ai',
          text: "對話紀錄已清空。我是 Claire 林若晴的專屬 AI 助理。很高興隨時為您提供 AI 內容策略、提示詞設計或品牌包裝上的引導！有什麼我可以幫忙的呢？",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 md:p-6 flex flex-col h-[600px] justify-between relative shadow-sm" id="ai-chat-anchor">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-stone-200 pb-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200/40 flex items-center justify-center text-accent-darkGold">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-sm font-medium text-stone-900 flex items-center gap-1.5">
              林若晴 AI 顧問助理
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            </h3>
            <p className="text-[10px] text-stone-400 font-light">基於若晴的 AI 內容策略與品牌心法建構</p>
          </div>
        </div>
        <button 
          onClick={handleClearChat}
          className="p-1.5 rounded-lg hover:bg-stone-200/50 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
          title="清空對話"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Message List */}
      <div className="flex-grow overflow-y-auto py-4 space-y-4 pr-1">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
              msg.sender === 'user' 
                ? 'bg-amber-50 border-amber-200/40 text-accent-darkGold font-semibold' 
                : 'bg-[#fcfbf9] border-stone-200 text-accent-darkGold'
            }`}>
              {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            {/* Bubble */}
            <div className="space-y-1">
              <div className={`rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-wrap ${
                msg.sender === 'user'
                  ? 'bg-stone-900 text-stone-100 rounded-tr-none shadow-sm'
                  : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none shadow-sm'
              }`}>
                {msg.text}
              </div>
              <p className={`text-[9px] text-stone-400 font-mono ${msg.sender === 'user' ? 'text-right' : ''}`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex gap-3 max-w-[80%]">
            <div className="w-8 h-8 rounded-full bg-[#fcfbf9] border border-stone-200 text-accent-darkGold flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5 animate-bounce" />
            </div>
            <div className="bg-white border border-stone-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-accent-darkGold rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-accent-darkGold rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-accent-darkGold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="text-[10px] text-stone-400 ml-1.5 font-light">正在梳理內容策略...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggested chips (Only show if messages length is small or just after clear) */}
      {messages.length < 3 && !loading && (
        <div className="py-2.5 shrink-0">
          <p className="text-[10px] font-mono font-medium text-stone-400 uppercase tracking-wider mb-2">您可以試著問我：</p>
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(s.q)}
                className="px-2.5 py-1 text-[10px] bg-white hover:bg-amber-50 text-stone-600 hover:text-amber-950 border border-stone-200 hover:border-amber-200 rounded-full transition-all text-left cursor-pointer flex items-center gap-1 shrink-0"
              >
                <span>{s.label}</span>
                <ArrowRight className="w-2.5 h-2.5 opacity-60" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input box */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="flex gap-2 border-t border-stone-200 pt-3 shrink-0"
      >
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={loading ? "AI 助理撰寫中..." : "輸入關於 AI 內容策略、提示詞或與若晴合作的疑問..."}
          disabled={loading}
          className="flex-grow px-3.5 py-2.5 text-xs bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-stone-800 disabled:opacity-50 font-sans"
        />
        <button 
          type="submit"
          disabled={!input.trim() || loading}
          className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-100 text-stone-100 disabled:text-stone-400 rounded-xl transition-all flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
