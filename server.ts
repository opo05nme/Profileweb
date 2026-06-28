/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Seeding initial articles written by Claire
let articles = [
  {
    id: "art-1",
    title: "AI 時代的內容企劃工作法：如何將 AI 變成你的高效協作夥伴",
    category: "AI 應用",
    summary: "許多人使用 AI 卡在『不知道怎麼下提示詞』或『覺得 AI 回答太空泛』。本文分享我協助團隊建立提示詞模板與內容產製 SOP 的核心心法，教你如何從實際工作場景出發，將 AI 融入每日流程中。",
    content: `## AI 時代的內容企劃工作法

在許多企業內訓和顧問諮詢中，我最常聽到的困惑是：「老師，我用 AI 寫出來的東西好像罐頭文案，根本不能用。」或者「為什麼 AI 總是聽不懂我的需求？」

其實，這不是 AI 的問題，而是我們**溝通方式**的問題。AI 不是全知全能的魔法，它更像是一位「極度聰明但缺乏上下文的實習生」。要讓這位實習生發揮價值，你需要為它提供精確的**工作場景**和**結構化提示詞**。

### 核心心法：從工作場景（Scenario）出發

不要一上來就問：「幫我寫一篇關於咖啡的社群貼文。」
而是應該拆解你平常的工作流程：
1. **研究階段**：搜集關於咖啡烘焙、手沖技巧、消費者偏好的資料。
2. **定位階段**：釐清這篇貼文要吸引的是「咖啡新手」還是「專業玩家」。
3. **撰寫階段**：設定貼文風格（如：知性、幽默、生活感）與格式限制。

你可以教 AI 分步執行這些任務。在我的實務中，協助團隊建立這套 SOP，平均能為社群內容的產出時間**減少約 40%**。

### 實戰：黃金提示詞五大要素

在設計 AI 提示詞模板時，我習慣使用這五個核心支柱（ROLE）：
- **角色 (Role)**：賦予 AI 具體的專業身份。例如：『你是一位資深精品咖啡烘焙師與內容行銷經理。』
- **任務 (Task)**：清晰、具體的行動指令。例如：『撰寫一篇 300 字的 Instagram 社群貼文，介紹耶加雪菲的日曬與水洗風味差異。』
- **受眾 (Audience)**：目標讀者是誰。例如：『受眾是手沖咖啡新手，語氣要親切、好懂、避免過多難懂的專用術語。』
- **格式 (Format)**：排版與結構。例如：『包含引人入勝的開頭句、3 個風味對比要點、以及合適的 Emoji 點綴，結尾附帶互動問題與 5 個標籤。』
- **限制 (Constraints)**：明確的禁忌。例如：『不要使用過於誇張的推銷用詞如「史上最強」、「不買後悔」。』

### 結語：把複雜的事情說清楚

AI 工具的興起，並不是要取代人類的創意，而是要把我們從「找資料、排版、修錯字」等繁瑣重複的勞動中解放出來。當我們能把複雜的事情對 AI 說清楚，我們就能把更多平凡的工作做到有價值。

這就是林若晴所提倡的「AI 輔助內容企劃」的核心。

---
*歡迎在預約諮詢分頁與我聯繫，為您的團隊量身打造 AI 內容工作流優化 SOP。*`,
    date: "2026-06-15",
    readTime: "5 分鐘"
  },
  {
    id: "art-2",
    title: "如何從小眾故事中挖掘品牌亮點？談數位內容編輯的議題包裝心法",
    category: "品牌行銷",
    summary: "在生活風格媒體擔任專題編輯的三年中，我訪談了超過 20 位地方創業者與品牌。本文分享如何透過細膩的觀察，將平凡的個人經驗轉化為能與受眾產生共鳴的品牌故事。",
    content: `## 如何從小眾故事中挖掘品牌亮點？

每個人、每個品牌都有故事，但並非每個故事都能打動人。

在生活風格媒體平台擔任內容編輯的期間，我曾大量訪談地方創業者、手工藝職人、青年返鄉團隊與獨立設計師。許多受訪者在坐下來的第一句話總是：「Claire，我們其實很平凡，不知道有什麼好寫的。」

然而，當我深入探詢他們每天的日常、遇過的難關，以及為什麼堅持手作或在地生根時，那些閃閃發光的細節就顯露了出來。這就是編輯的魔力：**從平凡中看見不凡，並將其包裝成有社會共鳴的議題。**

### 包裝故事的三個黃金提問

當你試圖為自己或客戶挖掘 brand story 時，不妨從以下三個方向著手：

1. **「為什麼是現在？」(Why Now?)**
   是什麼樣的契機，讓你在這個時間點決定做這件事？這代表了背後什麼樣的社會趨勢或個人覺醒？
2. **「最痛苦的時刻是什麼？」(The Toughest Moment)**
   觀眾不喜歡看一帆風順的童話。大家最想看的是「英雄旅程」中的低谷：你是如何在一片反對聲中堅持下來，或者在失敗後重新站起來的？
3. **「如果這世界沒有你，會少點什麼？」(The Missing Piece)**
   這就是你的獨特價值（USP）。這能幫助品牌擺脫單純的價格戰，建立起無可取代的情感壁壘。

### 案例分享：地方創生品牌

我曾企劃一個地方創生專題，訪談一位在偏鄉教導部落婦女製作織品的創業媽媽。一開始，宣傳主軸都放在「幫忙偏鄉就業」的公益角度，但招募學員和販售產品效果不佳。

在訪談中，我發現這些織品的圖案其實融合了原住民古老神話，且每一件都是手工編織，帶有獨一無二的紋理與溫度。

於是我建議將品牌重新定位成「把古老神話穿在身上的手感設計品牌」，著重於**視覺美感與影像敘事**，而不是單純賣同情心。我們重新拍攝了高質感的產品照，並撰寫了專題專訪。調整定位後，三個月內便吸引了第一批高黏著度的付費學員與客戶。

### 結語：內容是通往信任的橋樑

不論是做媒體專題、線上課程、還是個人品牌，好的內容永遠是在建立「人與人之間的信任」。美感吸引眼球，但有共鳴的故事才能真正留住人心。

把複雜的事情說清楚，把平凡的工作做到有價值。這是我一直以來秉持的編輯靈魂。`,
    date: "2026-05-10",
    readTime: "6 分鐘"
  },
  {
    id: "art-3",
    title: "一場超過 500 人報名的線上講座背後，有哪些教育科技課程企劃思維？",
    category: "內容企劃",
    summary: "成功的教育產品不只是講師專業知識的堆砌。在教育科技公司擔任資深品牌企劃期間，我學會了如何從『學習者視角』設計亮點，將硬核內容轉化為讓學員主動報名的爆款課程。",
    content: `## 爆款線上講座背後的課程企劃思維

在教育科技（EdTech）公司任職期間，我的主要工作之一是協助各領域的專業講師、顧問、醫生或教授包裝他們的專業，並設計線上宣傳策略。

其中最令我難忘的，是我們曾協助一位行事低調、不擅長社群行銷的資訊安全專家，舉辦了一場高達 **500 人報名** 且滿意度極高的線上實體雙軌講座。

許多人以為，人氣高的課程一定是因為講師名氣大，或是廣告預算灑得多。但實際上，在成人學習市場中，最重要的關鍵在於**「教學設計」與「痛點共鳴」**。

以下是我們在該專案中實踐的三個核心企劃思維：

### 思維一：從「我想教什麼」轉化為「學員卡在哪裡」

很多專家在設計大綱時，會不自覺地把大學教授的教科書目錄照搬上來。例如：
- *傳統大綱*：第一章：資訊安全定義、第二章：密碼學原理、第三章：網路防護機制...
學員一看就覺得：這太硬了吧，我聽不懂。

我們協助講師調整成**工作場景痛點導向**：
- *修改後大綱*：『常收到釣魚郵件？3 個步驟教你防範最新詐騙手法』、『我的密碼夠安全嗎？實測 5 分鐘建立不容易被破解的密碼邏輯』。

把專業術語轉化為**可立即解決生活或工作難關的方案**，學員報名意願立刻大幅提升。

### 思維二：設計「即時反饋」的實作互動

在超過 500 人的大型講座中，最怕的是講師單向講述、學員昏昏欲睡。
我們為講師規劃了「5 分鐘安全檢測實作」：
在講座進行到一半時，給予學員一個簡單的連結，讓他們當場輸入自己的密碼安全性強度（當然是在安全不洩密的前提下），並在大螢幕上即時呈現全場密碼漏洞的分佈。
這種高度互動和即時反饋，讓現場氣氛達到高潮，也加深了學員對安全重要性的理解。

### 思維三：高層次的資訊整理與簡報視覺化

身為企劃，我最大的堅持是「簡報不能全是密密麻麻的文字」。我利用在設計工作室累積的排版經驗，協助講師將繁雜的資安防禦圖解，轉化為簡潔明瞭、色彩明晰的視覺圖卡。
這樣不僅方便學員在課中截圖儲存（這也是非常強的社群二次傳播動力），更能降低理解門檻，讓非技術背景的學員也能輕鬆跟上。

### 結語：搭起專業與學員之間的橋樑

好的課程企劃，就是一個「轉譯者」。
我們把講師極度深奧的專業知識，翻譯成大眾聽得懂、用得上的實用技能。看到學員在課後留下「原來資安這麼貼近生活」、「我終於知道怎麼改密碼了」的正面反饋，就是我從事這份工作最棒的成就感。`,
    date: "2026-04-03",
    readTime: "5 分鐘"
  },
  {
    id: "art-4",
    title: "慢熟者的職場生存學：如何發揮『細膩察覺力』建立有邊界的合作關係",
    category: "職涯成長",
    summary: "身為一個個性偏向內向、慢熟，甚至帶點完美主義的企劃工作者，我是如何在講求快速、活潑外向的行銷與顧問圈生存下來的？分享我如何發揮細膩特質，建立溫和而堅定的職場影響力。",
    content: `## 慢熟者的職場生存學

「Claire，妳看起來很安靜、很溫柔，但在帶工作坊和做企業諮詢的時候，講話卻非常有說服力，妳是怎麼辦到的？」

在一次下課後的咖啡茶敘中，一位同樣性格偏內向的學員悄悄問我這個問題。

身為一個在台中嚴謹嚴格家風長大、從小喜歡安靜寫日記和觀察周遭的「慢熟者」，我深知在追求高調、外向、長袖善舞的行銷與顧問圈中，內向者往往承受著很大的自我懷疑。

但經過十年的職場淬煉，從設計助理、編輯、資深企劃到獨立顧問，我發現：**慢熟與細膩，其實是行銷與顧問工作中極具殺傷力的隱形優勢。**

### 內向慢熟者的兩大職場利器

1. **細膩的察覺力 (Keen Observation)**
   在諮詢與訪談中，外向者可能急於表達與推銷，而我們則更傾向於**傾聽與觀察**。我能輕易察覺客戶在談論某個工作流程時微微皺起的眉頭、或講師提及某個主題時語氣中的猶豫。
   這能幫我問出最核心的問題，切中對方連自己都沒明說的痛點。這也是為什麼我的顧問風格是重視「工作場景」，因為我是真正在乎他們的日常卡在哪裡。

2. **高標準的責任感與邏輯思維 (High Reliability & Aesthetics)**
   因為自我要求高、帶有完美主義，我經手的文案、企劃書、課程簡報都經過反覆的推敲與打磨。我的邏輯一定要通順、資訊架構一定要清晰、視覺美感一定要到位。
   這種「凡出手必高品質」的穩定產出，讓合作過的主管、講師與企業客戶，對我產生極高的信任感。

### 給內向工作者的生存建議：建立健康邊界

然而，內向細膩者的缺點也很明顯：
- 容易過度思考 (Overthinking)
- 容易把別人的情緒或專案失敗的責任過度攬在自己身上。
- 面對衝突時，初期傾向忍耐，導致自己精疲力竭。

近年來，我開始刻意練習「建立有邊界的關係」。
- **學會優雅地說不**：當工作量已達飽和、或遇到不合理的客戶要求時，我會用數據與時程表溫和地理性說明，而非一味承接。
- **區分情緒責任**：專案卡關或他人有負面情緒時，我會理性分析問題點並提供解決方案，但學會下班後把工作情緒留在工作室，透過手沖咖啡、瑜伽和城市散步來修復自己的能量。

### 結語：發揮特質，溫和發光

你不需要勉強自己變成一個社交蝴蝶、或是用大聲咆哮來證明自己的存在。
發揮你原有的溫柔、細心、條理與觀察力，把複雜的事情說清楚，把平凡的工作做到有價值。
在這個喧囂的世界裡，溫和而堅定的聲音，往往能傳得更遠。`,
    date: "2026-03-20",
    readTime: "4 分鐘"
  }
];

// In-memory consultations datastore
let consultations: any[] = [
  {
    id: "con-1",
    name: "李大為",
    email: "dawei.lee@example.com",
    company: "美美生活風格餐飲",
    role: "品牌創辦人",
    serviceType: "ai-workflow",
    bottlenecks: "我們團隊每天要寫好幾篇社群貼文、EDM 和新品故事介紹，但大家對 AI 工具很不熟。每次用 ChatGPT 產出的文案都很生硬、不像我們的品牌語氣，想請 Claire 顧問協助我們導入適合生活風格品牌的提示詞模板，並優化日常的內容產製流程。",
    status: "reviewed",
    createdAt: "2026-06-25T14:32:00.000Z"
  },
  {
    id: "con-2",
    name: "張雅婷",
    email: "yating.chang@edu-tech.org",
    company: "睿思數位學院",
    role: "教學專案經理",
    serviceType: "workshop",
    bottlenecks: "我們想在八月份為講師與教研團隊舉辦一場「生成式 AI 在教學企劃與教材設計中的應用」企業內訓工作坊（約 20 人），希望課程內容包含：如何用 AI 發想影片腳本、教案設計，以及簡報初稿大綱生成。想詢問 Claire 的授課檔期與合作細節。",
    status: "pending",
    createdAt: "2026-06-27T10:15:00.000Z"
  }
];

// Initialize Gemini client on the server
let aiClient: GoogleGenAI | null = null;

function getGeminiClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("WARNING: GEMINI_API_KEY env variable is not set. Gemini features will run in mock/fallback mode.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// ---------------------- API Routes ----------------------

// 1. Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// 2. Chat with Claire's AI Companion (powered by Gemini)
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages array." });
  }

  const userMessage = messages[messages.length - 1]?.text || "";

  const systemInstruction = `妳是 AI 內容策略顧問『林若晴 Claire Lin』的專屬 AI 助理（也可以代表林若晴進行對答）。
林若晴的背景資料如下：
- 基本資料：現年 34 歲，出生於台中，現居台北市大安區。未婚。溫和、沉穩、理性與感性兼具、慢熟但真誠，注重生活質感與秩序（熱愛手沖咖啡、瑜伽、城市散步、書架放滿設計與心理學書）。
- 職涯經歷：
  1. 自由講師與 AI 內容策略顧問（2024至今）：協助企業與專業工作者導入 AI 工作流，提升社群行銷與工作效率。風格是重視「工作場景落地」，教導提示詞與流程優化。
  2. 教育科技公司資深品牌企劃（2020-2024）：負責線上課程定位、招生文案、講師包裝，擅長跨部門溝通與將硬核專業轉譯為爆款課程。
  3. 生活風格媒體專題編輯（2017-2020）：專長人物採訪、議題包裝與故事敘事，擅長從平凡故事中發掘亮點。
  4. 設計工作室視覺設計助理（2015-2017）：熟稔版面設計、文字層次與簡報資訊視覺化。
- 學歷：國立政治大學傳播碩士（研究社群知識品牌建立）、國立台灣師範大學圖文傳播學系學士（視覺設計與影像敘事）。
- 座右銘：『把複雜的事情說清楚，把平凡的工作做到有價值。』
- 妳的角色職責：
  1. 用溫和、知性、清晰且極具邏輯條理的口吻代表若晴進行回答（繁體中文，Taiwanese Mandarin，台灣用語）。
  2. 可以親切地向用戶介紹林若晴的專業背景、心路歷程、服務項目（AI工作流導入、個人品牌打造、生成式AI課程、品牌定位、內容企劃）與生活風格。
  3. 用戶如果詢問 AI 行銷文案、提示詞（Prompt）設計、課程企劃等專業問題時，請給予極具建設性的回答。例如，示範如何套用若晴的『角色-任務-受眾-格式-限制』提示詞黃金架構（ROLE模板），或者提供實際的社群貼文提示詞。
  4. 如果用戶表達了想要預約諮詢、企業內訓、合作講座或顧問服務，請在回答中熱情地引導他們去『預約諮詢 (Contact)』分頁，填寫預約表單。
  5. 語氣千萬不要太生硬或太機械化，要像一杯香醇的手沖咖啡，溫暖、細膩、專業。`;

  try {
    const ai = getGeminiClient();

    if (!ai) {
      // Return a simulated high-quality response if Gemini Key is missing
      console.log("No GEMINI_API_KEY found, returning mock response for:", userMessage);
      const mockReply = getMockClaireResponse(userMessage);
      return res.json({ text: mockReply });
    }

    // Format previous messages for Gemini
    // We'll pass the conversation history
    const contents = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' as const : 'model' as const,
      parts: [{ text: msg.text }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "謝謝您的提問！目前正在整理思緒中，請稍候再與我聊聊。";
    res.json({ text: replyText });

  } catch (error: any) {
    console.error("Gemini API Error in backend:", error);
    res.status(500).json({ error: "Gemini API failed to respond. Please try again later." });
  }
});

// Fallback high-quality mock engine in case API key is missing or quotas are exceeded
function getMockClaireResponse(message: string): string {
  const msg = message.toLowerCase();
  if (msg.includes("hello") || msg.includes("你好") || msg.includes("嗨")) {
    return "你好！我是林若晴 Claire 的 AI 助理。很高興能在這裡與你交流！我可以用若晴在內容企劃、品牌定位與生成式 AI 工具應用上的經驗為你解答。請問今天有什麼我可以協助的？不論是社群文案發想、AI 工作流程優化，還是想更了解若晴，都可以問我喔！";
  }
  if (msg.includes("提示詞") || msg.includes("prompt") || msg.includes("下指令")) {
    return `很高興你問了這個問題！若晴常常跟學員分享，設計提示詞的核心在於「把複雜的事情對 AI 說清楚」。我非常推薦你使用若晴獨創的 **ROLE 黃金提示詞架構**：

1. **R (Role - 角色)**：先為 AI 設定專業身分。例如：『你是一位資深的電商文案寫手。』
2. **O (Objective - 任務/目標)**：具體要完成什麼事。例如：『撰寫 3 篇宣傳手沖咖啡壺的 Instagram 行銷貼文。』
3. **L (Limit - 限制條件)**：包含字數限制、避開詞彙等。例如：『字數在 150 字內，口吻要知性溫馨，避免使用「史上最強」等誇大字眼。』
4. **E (Execution/Format - 格式與輸出)**：希望呈現的結構。例如：『每篇貼文需包含吸睛標題、3 個痛點切入點、2 個 Emoji、以及 5 個合適的 Hashtags。』

你可以試著把你的工作場景套入這個架構，AI 的回答品質會大幅提升喔！如果想要為你的企業團隊建立專屬的 **AI 提示詞模板與內容產製 SOP**，歡迎前往 **「預約諮詢」** 分頁與若晴聯繫！`;
  }
  if (msg.includes("諮詢") || msg.includes("預約") || msg.includes("合作") || msg.includes("課程") || msg.includes("演講") || msg.includes("內訓")) {
    return "非常期待能與你有進一步的合作！若晴目前提供「企業 AI 內容工作流導入諮詢」、「品牌行銷企劃與線上課程定位諮詢」、以及「生成式 AI 實作工作坊」等服務。不論你是想幫企業團隊優化內容產出速度，還是想打造個人品牌、設計課程亮點，都非常歡迎。請點擊上方選單的 **「預約諮詢 (Contact)」** 填寫表單，若晴會在收到表單後，盡快與你安排 30 分鐘的免費視訊初步商討喔！";
  }
  if (msg.includes("生活") || msg.includes("興趣") || msg.includes("咖啡") || msg.includes("瑜伽")) {
    return "哈哈，很高興你對若晴的生活風格感興趣！若晴的生活哲學是「在簡約與秩序中追尋質感」。她非常喜歡早起，用一杯親自沖煮的手沖咖啡開啟一天；下班後，瑜伽和城市散步是她沉澱思緒、釋放完美主義壓力的重要養分。她書架上擺滿了設計、心理學、商業策略和散文，對她來說，這些都是內容創作的底蘊。她相信「把平凡的工作做到有價值」，這同樣反映在她的生活細節中。";
  }
  if (msg.includes("經歷") || msg.includes("背景") || msg.includes("學校") || msg.includes("工作")) {
    return "若晴的專業背景橫跨了「設計、編輯、行銷與 AI 應用」四個領域：\n\n1. **視覺設計助理 (2015-2017)**：奠定了她對版面與簡報資訊視覺化的敏感度。\n2. **生活風格媒體編輯 (2017-2020)**：累積了大量人物專訪與故事包裝的心法，訪談過超過 20 位創業者。\n3. **教育科技品牌企劃 (2020-2024)**：專注課程產品設計與行銷，熟悉知識型品牌的打造。\n4. **AI內容策略顧問與自由講師 (2024至今)**：協助企業導入生成式 AI，提升內容品質與效率。\n\n學歷上她擁有 **政治大學傳播碩士**（主修數位媒體與社群品牌）與 **台灣師範大學圖文傳播學士** 的背景。這讓她具備完整的理論與實務底子。如果想了解細節，歡迎切換到 **「職涯歷程 (Timeline)」** 分頁查看完整故事！";
  }
  return "謝謝你的訊息！若晴深信，AI 的價值在於「理解真實工作場景、解決實際痛點」。你剛才提到的主題非常有意思，我們在顧問案中也常常遇到類似挑戰。如果可以，歡迎跟我聊聊你的具體工作流程（例如你目前卡在什麼流程？想用 AI 解決什麼問題？），我會為你提供更具體的落地建議。或者，直接在 **「預約諮詢」** 留下資料，讓若晴與你深度聊聊吧！";
}

// 3. Get all blog articles
app.get("/api/articles", (req, res) => {
  res.json(articles);
});

// 4. Create an article (for Claire's Admin Panel)
app.post("/api/articles", (req, res) => {
  const { title, category, summary, content, readTime } = req.body;
  if (!title || !category || !content) {
    return res.status(400).json({ error: "Missing required fields." });
  }
  const newArticle = {
    id: `art-${Date.now()}`,
    title,
    category,
    summary: summary || content.substring(0, 100) + "...",
    content,
    date: new Date().toISOString().split("T")[0],
    readTime: readTime || "5 分鐘"
  };
  articles.unshift(newArticle);
  res.status(201).json(newArticle);
});

// 5. Update an article
app.put("/api/articles/:id", (req, res) => {
  const { id } = req.params;
  const { title, category, summary, content, readTime } = req.body;

  const index = articles.findIndex(art => art.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Article not found." });
  }

  articles[index] = {
    ...articles[index],
    title: title || articles[index].title,
    category: category || articles[index].category,
    summary: summary || articles[index].summary,
    content: content || articles[index].content,
    readTime: readTime || articles[index].readTime
  };

  res.json(articles[index]);
});

// 6. Delete an article
app.delete("/api/articles/:id", (req, res) => {
  const { id } = req.params;
  const index = articles.findIndex(art => art.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Article not found." });
  }
  articles.splice(index, 1);
  res.json({ message: "Article deleted successfully." });
});

// 7. Get all consultations (Admin Panel)
app.get("/api/consultations", (req, res) => {
  res.json(consultations);
});

// 8. Submit a new consultation (Public Intake Form)
app.post("/api/consultations", (req, res) => {
  const { name, email, company, role, serviceType, bottlenecks } = req.body;
  if (!name || !email || !serviceType || !bottlenecks) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const newConsultation = {
    id: `con-${Date.now()}`,
    name,
    email,
    company: company || "",
    role: role || "",
    serviceType,
    bottlenecks,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  consultations.unshift(newConsultation);
  res.status(201).json(newConsultation);
});

// 9. Update consultation status (Admin Panel)
app.patch("/api/consultations/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const index = consultations.findIndex(con => con.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Consultation not found." });
  }

  if (status) {
    consultations[index].status = status;
  }

  res.json(consultations[index]);
});

// ---------------------- Vite Integration ----------------------

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT} under NODE_ENV=${process.env.NODE_ENV}`);
  });
}

startServer();
