/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Tab = 'home' | 'services' | 'timeline' | 'lifestyle' | 'contact' | 'admin';

export interface Article {
  id: string;
  title: string;
  category: 'AI 應用' | '品牌行銷' | '內容企劃' | '職涯成長';
  summary: string;
  content: string;
  date: string;
  readTime: string;
}

export interface Consultation {
  id: string;
  name: string;
  email: string;
  company?: string;
  role?: string;
  serviceType: 'ai-workflow' | 'brand-positioning' | 'workshop' | 'other';
  bottlenecks: string;
  status: 'pending' | 'reviewed' | 'contacted';
  createdAt: string;
}

export interface TimelineItem {
  id: string;
  period: string;
  role: string;
  company: string;
  type: 'work' | 'education';
  description: string;
  details: string[];
}

export interface Message {
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  isPromptTemplate?: boolean;
}
