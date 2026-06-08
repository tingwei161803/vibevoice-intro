/* =========================================================================
   VibeVoice 介紹站 · data.js

   單一資料檔，被每一頁載入。整站由兩個全域物件驅動:
     window.SITE_META  = { title:{en,zh}, subtitle:{en,zh} }
     window.SITE_PAGES = [ { slug, layout, icon, title:{en,zh}, ...版型資料 } ]

   每個 SITE_PAGES entry = 一個實體 .html 頁:
     slug "home" -> index.html，其餘 slug -> <slug>.html
   跨頁 nav 依此陣列順序排列。

   內容彙整自 microsoft/VibeVoice 專案說明與公開技術介紹文章，為非官方的
   學習整理；所有人類可見字串皆為 {en,zh} 物件，語言切換時整站重繪。
   ========================================================================= */

window.SITE_META = {
  title: { en: "VibeVoice", zh: "VibeVoice" },
  subtitle: {
    en: "Microsoft's open-source long-form, multi-speaker voice AI family.",
    zh: "微軟開源的長語音、多語者語音 AI 模型家族。"
  }
};

window.SITE_PAGES = [

  /* ===================== 1. HOME / HUB ===================== */
  {
    slug: "home", layout: "hub", icon: "graphic_eq",
    title: {
      en: "Open-source long-form voice AI",
      zh: "開源長語音 AI 模型家族"
    },
    subtitle: {
      en: "VibeVoice synthesises up to 90 minutes of natural, multi-speaker audio in a single pass — powered by a 7.5 Hz continuous speech tokenizer and a next-token diffusion design. Three open models cover TTS, ASR and real-time streaming.",
      zh: "VibeVoice 用 7.5 Hz 連續語音 tokenizer 與「next-token diffusion」架構，單次最長可生成 90 分鐘、最多 4 位語者的自然語音。三個開源模型涵蓋語音合成、語音辨識與即時串流。"
    },
    stats: [
      { value: 90,  label: { en: "min in one pass", zh: "分鐘・單次最長語音" } },
      { value: 4,   label: { en: "speakers at once", zh: "位・同時語者" } },
      { value: 7.5, label: { en: "Hz tokenizer", zh: "Hz・連續語音取樣" } },
      { value: 3,   label: { en: "open models", zh: "個・開源模型版本" } }
    ]
  },

  /* ===================== 2. MODELS (gallery) ===================== */
  {
    slug: "models", layout: "gallery", icon: "dataset",
    title: { en: "The model family", zh: "模型家族" },
    subtitle: {
      en: "Three open models, one design language. Tap a card for the full detail.",
      zh: "三個開源模型，同一套設計語言。點卡片看完整說明。"
    },
    categories: [
      { key: "tts",      en: "Text-to-Speech", zh: "語音合成 TTS" },
      { key: "asr",      en: "Speech-to-Text", zh: "語音辨識 ASR" },
      { key: "realtime", en: "Real-time",      zh: "即時 Realtime" }
    ],
    items: [
      {
        slug: "vibevoice-tts-1-5b", category: "tts",
        title: { en: "VibeVoice-TTS · 1.5B", zh: "VibeVoice-TTS · 1.5B" },
        summary: {
          en: "Long-form multi-speaker synthesis: up to 90 minutes and 4 distinct speakers in a single generation.",
          zh: "長語音多語者合成：單次最長 90 分鐘、最多 4 位語者，音色維持一致。"
        },
        tags: ["1.5B", "90 min", "4 speakers", "EN / ZH"],
        overview: {
          en: "The flagship text-to-speech model. Built on a Qwen2.5-1.5B LLM backbone plus a diffusion head, it generates up to 90 minutes of expressive, conversational audio with as many as 4 speakers while keeping each voice consistent. English and Chinese are the most reliable languages. The training/inference code was removed in September 2025 over misuse concerns, but the weights remain on Hugging Face. The work was accepted as an ICLR 2026 Oral.",
          zh: "旗艦級語音合成模型。以 Qwen2.5-1.5B 作為 LLM 主幹、搭配 diffusion head，單次可生成最長 90 分鐘、最多 4 位語者的富表現力對談式語音，並維持每個語者音色一致。英文與中文最為穩定。訓練／推論程式碼於 2025 年 9 月因濫用疑慮被移除，但權重仍保留在 Hugging Face。此研究獲 ICLR 2026 Oral 接受。"
        }
      },
      {
        slug: "vibevoice-asr-7b", category: "asr",
        title: { en: "VibeVoice-ASR · 7B", zh: "VibeVoice-ASR · 7B" },
        summary: {
          en: "Long-form recognition: 60 minutes in one pass, with who / when / what — speaker, timestamp and content.",
          zh: "長音訊辨識：單次 60 分鐘，輸出「誰、何時、說了什麼」——語者、時間戳與內容。"
        },
        tags: ["7B", "60 min", "50+ languages", "64K"],
        overview: {
          en: "The speech-to-text member of the family. It transcribes up to 60 minutes of audio in a single pass and produces structured output with speaker identity (who), timestamps (when) and content (what). It is natively multilingual across 50+ languages, supports custom hotwords for domain accuracy, and uses a 64K token context. Released January 2026 and integrated into Hugging Face Transformers in March 2026; ASR fine-tuning code is available.",
          zh: "家族中的語音辨識成員。單次可轉寫最長 60 分鐘音訊，並輸出帶有語者身分（誰）、時間戳（何時）與內容（說了什麼）的結構化結果。原生支援 50+ 種語言，可自訂 hotword 提升專業領域準確度，脈絡長度達 64K token。2026 年 1 月發表，3 月併入 Hugging Face Transformers；另提供 ASR finetune 程式碼。"
        }
      },
      {
        slug: "vibevoice-realtime-0-5b", category: "realtime",
        title: { en: "VibeVoice-Realtime · 0.5B", zh: "VibeVoice-Realtime · 0.5B" },
        summary: {
          en: "Lightweight streaming: ~300 ms first-audio latency, streaming text input, robust to ~10 minutes.",
          zh: "輕量即時串流：首字延遲約 300 毫秒，支援串流文字輸入，可穩定生成約 10 分鐘。"
        },
        tags: ["0.5B", "~300 ms", "streaming", "multilingual"],
        overview: {
          en: "The smallest, deployment-friendly model for real-time use. It accepts streaming text and starts speaking with roughly 300 ms of first-audio latency, generating robustly up to about 10 minutes. Beyond English styles it offers multilingual voices (DE, FR, IT, JP, KR, NL, PL, PT, ES). An experimental speaker expansion landed in December 2025, and a Colab demo is available.",
          zh: "家族中最小、最適合部署的即時模型。可接收串流文字輸入，首字延遲約 300 毫秒即開始發聲，能穩定生成約 10 分鐘。除英文音色外，另提供多語語音（德、法、義、日、韓、荷、波、葡、西）。2025 年 12 月加入實驗性語者擴充，並提供 Colab 範例。"
        }
      }
    ]
  },

  /* ===================== 2b. VERSIONS (model comparison) ===================== */
  {
    slug: "versions", layout: "comparison", icon: "splitscreen",
    title: { en: "Model comparison", zh: "版本比較" },
    subtitle: {
      en: "The three VibeVoice models side by side — pick the right one for the job.",
      zh: "VibeVoice 三個版本並列比較——依任務挑對的那一個。"
    },
    plans: [
      { key: "realtime", name: { en: "Realtime-0.5B", zh: "Realtime-0.5B" }, price: { en: "0.5B", zh: "0.5B" }, note: { en: "real-time", zh: "即時串流" } },
      { key: "tts",      name: { en: "TTS-1.5B",      zh: "TTS-1.5B" },      price: { en: "1.5B", zh: "1.5B" }, highlight: true, note: { en: "flagship", zh: "旗艦" } },
      { key: "asr",      name: { en: "ASR-7B",        zh: "ASR-7B" },        price: { en: "7B",   zh: "7B" },   note: { en: "recognition", zh: "辨識" } }
    ],
    features: [
      { label: { en: "Task", zh: "任務類型" },
        values: { realtime: { en: "TTS (stream)", zh: "語音合成（串流）" }, tts: { en: "Text-to-Speech", zh: "語音合成" }, asr: { en: "Speech-to-Text", zh: "語音辨識" } } },
      { label: { en: "Max length", zh: "最長處理長度" },
        values: { realtime: { en: "~10 min", zh: "約 10 分鐘" }, tts: { en: "90 min", zh: "90 分鐘" }, asr: { en: "60 min", zh: "60 分鐘" } } },
      { label: { en: "Speakers", zh: "同時語者" },
        values: { realtime: "1", tts: { en: "up to 4", zh: "最多 4" }, asr: { en: "—", zh: "—" } } },
      { label: { en: "Context", zh: "脈絡長度" },
        values: { realtime: "8K", tts: "64K", asr: "64K" } },
      { label: { en: "Streaming text input", zh: "串流文字輸入" },
        values: { realtime: true, tts: false, asr: false } },
      { label: { en: "Low latency (~300 ms)", zh: "低延遲（約 300ms）" },
        values: { realtime: true, tts: false, asr: false } },
      { label: { en: "Multi-speaker consistency", zh: "多語者一致" },
        values: { realtime: false, tts: true, asr: false } },
      { label: { en: "Timestamps + diarization", zh: "時間戳 + 語者標註" },
        values: { realtime: false, tts: false, asr: true } },
      { label: { en: "Languages", zh: "語言" },
        values: { realtime: { en: "Multi-voice", zh: "多語音色" }, tts: { en: "EN / ZH first", zh: "英・中為主" }, asr: { en: "50+ languages", zh: "50+ 語言" } } },
      { label: { en: "Best for", zh: "適合場景" },
        values: { realtime: { en: "Agent voice", zh: "AI 代理語音" }, tts: { en: "Long podcasts", zh: "長篇 Podcast" }, asr: { en: "Transcription", zh: "逐字稿" } } }
    ]
  },

  /* ===================== 3. ARCHITECTURE (article) ===================== */
  {
    slug: "architecture", layout: "article", icon: "schema",
    title: { en: "How it works", zh: "技術架構" },
    subtitle: {
      en: "A 7.5 Hz tokenizer plus next-token diffusion: how VibeVoice fits 90 minutes of audio inside a 64K context.",
      zh: "7.5 Hz tokenizer 加上 next-token diffusion：VibeVoice 如何把 90 分鐘音訊塞進 64K 脈絡。"
    },
    sections: [
      {
        id: "idea", heading: { en: "The core idea", zh: "核心構想" },
        blocks: [
          { type: "p", text: {
            en: "Most neural TTS systems tokenize audio at 50–100 Hz. That fidelity is expensive: 90 minutes of speech becomes 135,000+ tokens, far beyond a practical context window. VibeVoice's central bet is that you can tokenize far more coarsely — at 7.5 Hz — and let a diffusion model paint back the acoustic detail.",
            zh: "多數神經語音合成系統以 50–100 Hz 將音訊 token 化，這種精細度代價高昂：90 分鐘語音會變成 135,000 個以上的 token，遠超出實用的脈絡長度。VibeVoice 的關鍵賭注是——可以用更粗的 7.5 Hz 來 token 化，再讓 diffusion 模型把聲學細節「補繪」回來。" } },
          { type: "quote", text: {
            en: "Compress the timeline, not the meaning: 7.5 Hz keeps the dialogue coherent while a diffusion head restores 24 kHz detail.",
            zh: "壓縮的是時間軸，不是語意：7.5 Hz 維持對話連貫，由 diffusion head 還原 24 kHz 的聲音細節。" } }
        ]
      },
      {
        id: "tokenizer", heading: { en: "Continuous 7.5 Hz tokenizers", zh: "連續 7.5 Hz tokenizer" },
        blocks: [
          { type: "p", text: {
            en: "VibeVoice uses continuous speech tokenizers — an acoustic and a semantic stream — running at a 7.5 Hz frame rate. The low rate is what makes long-sequence processing tractable while preserving enough information to reconstruct natural speech.",
            zh: "VibeVoice 採用連續語音 tokenizer——分為聲學（acoustic）與語意（semantic）兩條流——以 7.5 Hz 的影格率運作。正是這個低取樣率，讓長序列處理變得可行，同時保留足夠資訊還原自然語音。" } },
          { type: "h3", text: { en: "Why 7.5 Hz matters", zh: "為什麼 7.5 Hz 是關鍵" } },
          { type: "ul", items: {
            en: [
              "~10× coarser than the 50–100 Hz industry norm.",
              "90 minutes of audio ≈ 40,500 tokens — it fits a 64K context.",
              "Fewer tokens means the model spends capacity on dialogue, not acoustic minutiae."
            ],
            zh: [
              "比業界常見的 50–100 Hz 粗約 10 倍。",
              "90 分鐘音訊約 40,500 token——可放進 64K 脈絡。",
              "token 變少，模型把算力花在對話連貫，而非聲學細節。"
            ] } }
        ]
      },
      {
        id: "diffusion", heading: { en: "Next-token diffusion", zh: "Next-token diffusion" },
        blocks: [
          { type: "p", text: {
            en: "The generation pipeline has two stages. A large language model (a Qwen2.5 backbone) handles textual context, dialogue understanding and prosodic decisions at the token level. A diffusion head then reconstructs the fine 24 kHz acoustic detail for each step.",
            zh: "生成管線分為兩段。大型語言模型（Qwen2.5 主幹）在 token 層級處理文字脈絡、對話理解與韻律決策；接著由 diffusion head 為每一步還原精細的 24 kHz 聲學細節。" } },
          { type: "code", text: {
            en: "text + speaker refs\n      |\n      v\n[ LLM backbone (Qwen2.5) ]  ->  semantic / prosody tokens @ 7.5 Hz\n      |\n      v\n[ diffusion head ]          ->  24 kHz acoustic waveform",
            zh: "文字 + 語者參考音\n      |\n      v\n[ LLM 主幹 (Qwen2.5) ]   ->  7.5 Hz 的語意／韻律 token\n      |\n      v\n[ diffusion head ]        ->  24 kHz 聲學波形" } },
          { type: "p", text: {
            en: "This separation of concerns is why a single model can hold a long, multi-speaker conversation together: the LLM keeps track of who is speaking and what comes next, and the diffusion head worries about how it sounds.",
            zh: "這種「分工」正是單一模型能撐起長篇多語者對話的原因：LLM 負責記住「誰在說、接下來說什麼」，diffusion head 則專注於「聽起來如何」。" } }
        ]
      },
      {
        id: "tradeoffs", heading: { en: "What it inherits and what it can't do", zh: "繼承與限制" },
        blocks: [
          { type: "p", text: {
            en: "Because the backbone is built on Qwen2.5, the model can inherit its base behaviours — including occasionally unexpected, biased or inaccurate output. And the design is tuned for clean, sequential dialogue: it does not handle overlapping speech, background music or sound effects.",
            zh: "由於主幹建立在 Qwen2.5 之上，模型會繼承其基礎行為——包含偶爾出現非預期、帶偏見或不準確的輸出。架構也是為乾淨、依序的對話而調校：它無法處理重疊發話、背景音樂或音效。" } },
          { type: "p", text: {
            en: "See the Specs page for the exact numbers, or Limitations for the responsible-AI guidance.",
            zh: "確切數據見「規格與數據」頁；負責任 AI 的指引見「限制與負責任 AI」頁。" } }
        ]
      }
    ]
  },

  /* ===================== 4. SPECS (dashboard) ===================== */
  {
    slug: "specs", layout: "dashboard", icon: "monitoring",
    title: { en: "Specs & numbers", zh: "規格與數據" },
    subtitle: {
      en: "The headline figures behind VibeVoice, plus a full per-model spec table.",
      zh: "VibeVoice 的關鍵數字，以及各版本完整規格表。"
    },
    stats: [
      { label: { en: "Frame rate",        zh: "連續語音取樣率" }, value: "7.5", unit: { en: "Hz", zh: "Hz" } },
      { label: { en: "Context (TTS/ASR)", zh: "脈絡長度 (TTS/ASR)" }, value: "64", unit: { en: "K tokens", zh: "K token" } },
      { label: { en: "Audio output",      zh: "音訊輸出取樣" }, value: "24", unit: { en: "kHz", zh: "kHz" } },
      { label: { en: "Realtime latency",  zh: "即時版首字延遲" }, value: "~300", unit: { en: "ms", zh: "毫秒" } }
    ],
    bars: {
      title: { en: "Tokens for 90 minutes of audio", zh: "90 分鐘音訊所需 token 數" },
      series: [
        { label: { en: "Traditional 50–100 Hz", zh: "傳統 50–100 Hz" }, value: 135000 },
        { label: { en: "VibeVoice 7.5 Hz",       zh: "VibeVoice 7.5 Hz" }, value: 40500 }
      ]
    },
    line: {
      title: { en: "Parameters by model (billions)", zh: "各版本參數量（十億）" },
      points: [
        { x: "Realtime", y: 0.5 },
        { x: "TTS",      y: 1.5 },
        { x: "ASR",      y: 7 }
      ]
    },
    table: {
      columns: [
        { key: "spec",     label: { en: "Spec",            zh: "項目" } },
        { key: "realtime", label: { en: "Realtime-0.5B",   zh: "Realtime-0.5B" } },
        { key: "tts",      label: { en: "TTS-1.5B",        zh: "TTS-1.5B" } },
        { key: "asr",      label: { en: "ASR-7B",          zh: "ASR-7B" } }
      ],
      rows: [
        { spec: { en: "Parameters",     zh: "參數量" },     realtime: "0.5B", tts: "1.5B", asr: "7B" },
        { spec: { en: "Max output",     zh: "最長輸出" },   realtime: { en: "~10 min", zh: "約 10 分鐘" }, tts: { en: "90 min", zh: "90 分鐘" }, asr: { en: "60 min", zh: "60 分鐘" } },
        { spec: { en: "Speakers",       zh: "同時語者" },   realtime: "1", tts: { en: "up to 4", zh: "最多 4" }, asr: { en: "— (recognition)", zh: "—（辨識）" } },
        { spec: { en: "Context",        zh: "脈絡長度" },   realtime: "8K", tts: "64K", asr: "64K" },
        { spec: { en: "Languages",      zh: "主要語言" },   realtime: { en: "Multilingual voices", zh: "多語語音" }, tts: { en: "EN / ZH first", zh: "英・中為主" }, asr: { en: "50+ languages", zh: "50+ 語言" } },
        { spec: { en: "First latency",  zh: "首字延遲" },   realtime: "~300 ms", tts: "—", asr: "—" },
        { spec: { en: "Role",           zh: "定位" },       realtime: { en: "Real-time streaming", zh: "即時串流" }, tts: { en: "Long-form synthesis", zh: "長語音合成" }, asr: { en: "Long-form recognition", zh: "長音訊辨識" } }
      ]
    }
  },

  /* ===================== 5. COMPARE — TTS (comparison) ===================== */
  {
    slug: "compare", layout: "comparison", icon: "balance",
    title: { en: "TTS comparison", zh: "語音合成對比" },
    subtitle: {
      en: "VibeVoice next to popular and open-source TTS models. A fair, non-exhaustive sketch — strengths differ by use case.",
      zh: "VibeVoice 與常見及開源 TTS 模型的並列比較。屬概略、非窮盡的整理——各方強項依使用情境而異。"
    },
    plans: [
      { key: "vv",    name: { en: "VibeVoice",   zh: "VibeVoice" },   price: { en: "MIT · open", zh: "MIT · 開源" }, highlight: true, note: { en: "self-hosted", zh: "可自架" } },
      { key: "el",    name: { en: "ElevenLabs",  zh: "ElevenLabs" },  price: { en: "$99+/mo",    zh: "$99+/月" },   note: { en: "cloud SaaS", zh: "雲端 SaaS" } },
      { key: "f5",    name: { en: "F5-TTS",      zh: "F5-TTS" },      price: { en: "open",       zh: "開源" },       note: { en: "single-shot", zh: "單句強" } },
      { key: "xtts",  name: { en: "XTTS-v2",     zh: "XTTS-v2" },     price: { en: "open",       zh: "開源" },       note: { en: "Coqui", zh: "Coqui" } },
      { key: "spark", name: { en: "SparkTTS",    zh: "SparkTTS" },    price: { en: "open",       zh: "開源" },       note: { en: "0.5B · clone", zh: "0.5B 複製" } },
      { key: "cosy",  name: { en: "CosyVoice 2", zh: "CosyVoice 2" }, price: { en: "Apache-2.0", zh: "Apache-2.0" }, note: { en: "Alibaba · stream", zh: "Alibaba 串流" } }
    ],
    features: [
      { label: { en: "Multi-speaker consistency", zh: "多語者長對話一致性" }, values: { vv: true, el: true, f5: false, xtts: false, spark: false, cosy: false } },
      { label: { en: "90-minute single pass",     zh: "單次最長 90 分鐘" },   values: { vv: true, el: false, f5: false, xtts: false, spark: false, cosy: false } },
      { label: { en: "Real-time streaming",       zh: "即時串流（低延遲）" }, values: { vv: true, el: true, f5: false, xtts: false, spark: false, cosy: true } },
      { label: { en: "Zero-shot voice clone",     zh: "零樣本聲音複製" },     values: { vv: { en: "via ref", zh: "參考音" }, el: true, f5: true, xtts: true, spark: true, cosy: true } },
      { label: { en: "Language breadth",          zh: "語言廣度" },           values: { vv: { en: "EN / ZH", zh: "英 / 中" }, el: { en: "Multi", zh: "多語" }, f5: { en: "EN / ZH", zh: "英 / 中" }, xtts: { en: "17", zh: "17 種" }, spark: { en: "EN / ZH", zh: "英 / 中" }, cosy: { en: "Multi", zh: "多語" } } },
      { label: { en: "Self-host / local",         zh: "自架 / 本地部署" },     values: { vv: true, el: false, f5: true, xtts: true, spark: true, cosy: true } },
      { label: { en: "Open license",              zh: "開源授權" },           values: { vv: { en: "MIT", zh: "MIT" }, el: false, f5: { en: "Open", zh: "開源" }, xtts: { en: "Non-commercial", zh: "非商用" }, spark: { en: "Open", zh: "開源" }, cosy: { en: "Apache-2.0", zh: "Apache-2.0" } } },
      { label: { en: "Top single-utterance",      zh: "頂尖單句音質" },       values: { vv: { en: "Great", zh: "很好" }, el: true, f5: true, xtts: false, spark: { en: "Good", zh: "不錯" }, cosy: true } },
      { label: { en: "Commercial-ready",          zh: "開箱即可商用" },       values: { vv: { en: "Research", zh: "研究用" }, el: true, f5: { en: "DIY", zh: "自評" }, xtts: false, spark: { en: "DIY", zh: "自評" }, cosy: true } }
    ]
  },

  /* ===================== 5a. COMPARE — ASR (comparison) ===================== */
  {
    slug: "compare-asr", layout: "comparison", icon: "hearing",
    title: { en: "ASR comparison", zh: "語音辨識對比" },
    subtitle: {
      en: "VibeVoice-ASR next to FunASR and Whisper — open-source speech-to-text, side by side.",
      zh: "VibeVoice-ASR 與 FunASR、Whisper 的並列比較——開源語音辨識並排看。"
    },
    plans: [
      { key: "vv",      name: { en: "VibeVoice-ASR", zh: "VibeVoice-ASR" }, price: { en: "7B", zh: "7B" }, highlight: true, note: { en: "long-form", zh: "長音訊" } },
      { key: "funasr",  name: { en: "FunASR",        zh: "FunASR" },        price: { en: "open", zh: "開源" }, note: { en: "Alibaba", zh: "Alibaba" } },
      { key: "whisper", name: { en: "Whisper",       zh: "Whisper" },       price: { en: "open", zh: "開源" }, note: { en: "OpenAI", zh: "OpenAI" } }
    ],
    features: [
      { label: { en: "Open license",            zh: "開源授權" },     values: { vv: { en: "MIT", zh: "MIT" }, funasr: { en: "MIT", zh: "MIT" }, whisper: { en: "MIT", zh: "MIT" } } },
      { label: { en: "Long-form single pass",   zh: "單次長音訊" },   values: { vv: { en: "60 min", zh: "60 分鐘" }, funasr: true, whisper: { en: "chunked", zh: "分段處理" } } },
      { label: { en: "Speaker diarization",     zh: "語者標註" },     values: { vv: true, funasr: true, whisper: false } },
      { label: { en: "Timestamps",              zh: "時間戳" },       values: { vv: true, funasr: true, whisper: true } },
      { label: { en: "Streaming / real-time",   zh: "串流 / 即時" },  values: { vv: false, funasr: true, whisper: false } },
      { label: { en: "Languages",               zh: "語言" },         values: { vv: { en: "50+", zh: "50+" }, funasr: { en: "50+", zh: "50+" }, whisper: { en: "~99", zh: "~99" } } },
      { label: { en: "Speed",                   zh: "速度" },         values: { vv: { en: "60-min pass", zh: "單次 60 分" }, funasr: { en: "up to 170x", zh: "最高 170x" }, whisper: { en: "baseline", zh: "基準" } } },
      { label: { en: "Self-host / local",       zh: "自架 / 本地部署" }, values: { vv: true, funasr: true, whisper: true } }
    ]
  },

  /* ===================== 5b. REVIEWS (reception, gallery) ===================== */
  {
    slug: "reviews", layout: "gallery", icon: "reviews",
    title: { en: "Reviews & reception", zh: "社群評價" },
    subtitle: {
      en: "What benchmarks and the community say — and how it stacks up against others. A non-official digest of public opinion; tap a card for detail and source.",
      zh: "評測與社群怎麼說，以及它和其他方案的對比。以下為網路公開評價的非官方彙整，點卡片看細節與出處。"
    },
    categories: [
      { key: "praise",   en: "Praise",     zh: "好評" },
      { key: "critique", en: "Criticism",  zh: "批評" },
      { key: "vs",       en: "vs others",  zh: "與他者對比" }
    ],
    items: [
      {
        slug: "rev-longform", category: "praise",
        title: { en: "A genuine long-form breakthrough", zh: "長篇多語者的真突破" },
        summary: { en: "Reviewers widely call 90-min, 4-speaker dialogue a real step change.", zh: "評測普遍認為單次 90 分鐘、4 語者長對話是真正的躍進。" },
        tags: ["長語音", "Slator", "好評"],
        overview: {
          en: "Industry and review coverage (e.g. Slator, AllAboutAI) frames VibeVoice as moving long-form, multi-speaker speech from short-clip 'gimmicks' to genuinely usable long dialogue — best suited to audiobooks and podcasts. Source: Slator / AllAboutAI.",
          zh: "產業與評測報導（如 Slator、AllAboutAI）認為 VibeVoice 把長篇、多語者語音從「短秒數的玩具」推進到可實用的長對話，最適合有聲書與 Podcast。來源：Slator / AllAboutAI。"
        }
      },
      {
        slug: "rev-opensource", category: "praise",
        title: { en: "Open, free, self-hostable", zh: "開源、免費、可自架" },
        summary: { en: "Praised for MIT licensing and avoiding subscription/privacy concerns.", zh: "普遍讚賞 MIT 開源、可自架，免去訂閱與隱私疑慮。" },
        tags: ["開源", "成本", "好評"],
        overview: {
          en: "A recurring positive across reviews: the MIT-licensed, self-hostable model removes ElevenLabs-style subscription costs and data-privacy worries, which reviewers weigh heavily for teams shipping a lot of audio. Source: AllAboutAI / Medium.",
          zh: "評論中反覆出現的優點：MIT 授權、可自架，免去 ElevenLabs 式的訂閱成本與資料隱私顧慮——對需要大量產出音訊的團隊特別加分。來源：AllAboutAI / Medium。"
        }
      },
      {
        slug: "rev-consistency", category: "praise",
        title: { en: "Speaker consistency & naturalness", zh: "語者一致性與自然度" },
        summary: { en: "HN community credits its voice consistency and conversational naturalness.", zh: "Hacker News 社群肯定其音色一致性與對話自然度。" },
        tags: ["Hacker News", "自然度", "好評"],
        overview: {
          en: "On Hacker News the general sentiment is positive: commenters highlight high audio fidelity, speaker consistency across long passages, and natural-sounding conversation as a clear leap for open-source audio AI. Source: Hacker News discussion.",
          zh: "在 Hacker News，整體風向偏正面：留言者點出高音訊保真度、長段落的語者一致性，以及自然的對話感，認為是開源語音 AI 的明顯躍進。來源：Hacker News 討論串。"
        }
      },
      {
        slug: "rev-expressive", category: "praise",
        title: { en: "67% rate expressiveness higher", zh: "67% 認為表現力更佳" },
        summary: { en: "An AllAboutAI survey: 67% of technical users rate it above Chatterbox-TTS.", zh: "AllAboutAI 調查：67% 技術使用者認為其表現力優於 Chatterbox-TTS。" },
        tags: ["AllAboutAI", "表現力"],
        overview: {
          en: "AllAboutAI reports that 67% of surveyed technical users rate VibeVoice's expressiveness as superior to alternatives such as Chatterbox-TTS, and gives it 4/5 overall — strong on open-source long-form audio, weaker on real-time and broad language coverage. Source: AllAboutAI review.",
          zh: "AllAboutAI 指出，受訪技術使用者中有 67% 認為 VibeVoice 的表現力優於 Chatterbox-TTS 等替代方案，整體給 4/5——長篇開源音訊是強項，即時性與語言廣度較弱。來源：AllAboutAI 評測。"
        }
      },
      {
        slug: "rev-intonation", category: "critique",
        title: { en: "Intonation still slips", zh: "語調仍有破綻" },
        summary: { en: "An HN user: intonation is off on nearly every phrase, with robotic modulation.", zh: "HN 有使用者指出幾乎每句語調都怪，帶機械感的調變。" },
        tags: ["Hacker News", "語調", "批評"],
        overview: {
          en: "Not everyone is sold: one Hacker News commenter said the voices are decent but the intonation is off on almost every phrase, with a clearly robotic-sounding modulation. A useful reminder that prosody isn't fully solved. Source: Hacker News discussion.",
          zh: "並非一面倒：一位 Hacker News 留言者表示音色尚可，但幾乎每一句的語調都不對，帶有明顯機械感的調變。提醒了韻律仍未完全攻克。來源：Hacker News 討論串。"
        }
      },
      {
        slug: "rev-uninspiring", category: "critique",
        title: { en: "Impressive, but not by today's bar", zh: "驚艷，但以今日標準略平" },
        summary: { en: "Some find it impressive vs years ago, yet uninspiring by current standards.", zh: "有人認為相較數年前驚艷，但以今日標準仍嫌不夠出彩。" },
        tags: ["Hacker News", "批評"],
        overview: {
          en: "Another HN take: very impressive compared to TTS from a few years ago, but for today's frontier it felt uninspiring. Expectations have moved fast, and open weights invite head-to-head scrutiny with the best proprietary systems. Source: Hacker News discussion.",
          zh: "另一則 HN 看法：相較數年前的 TTS 非常驚艷，但放到今天的前沿則覺得不夠出彩。期待值上升得很快，且開源權重也讓它直接被拿來和最強的閉源系統比較。來源：Hacker News 討論串。"
        }
      },
      {
        slug: "rev-limits", category: "critique",
        title: { en: "Language & feature limits", zh: "語言與功能限制" },
        summary: { en: "Reviews agree: EN/ZH-first, no overlapping speech, music or sound effects.", zh: "評測一致指出：英/中為主，無法處理重疊發話、背景音樂或音效。" },
        tags: ["限制", "語言", "批評"],
        overview: {
          en: "A consistent critique across reviews: VibeVoice is limited to English and Chinese for best quality and cannot handle overlapping speech, background noise, music or sound effects — and the original release leaned on offline batch rather than real-time use. Source: AllAboutAI / Slator.",
          zh: "評測中一致的批評：VibeVoice 以英文、中文品質最佳，且無法處理重疊發話、背景雜音、音樂或音效；早期版本偏離線批次而非即時使用。來源：AllAboutAI / Slator。"
        }
      },
      {
        slug: "rev-bench", category: "vs",
        title: { en: "MOS 4.5 — tops the benchmarks", zh: "MOS 4.5，評測居首" },
        summary: { en: "Per MS's report, the 7B model's MOS beat ElevenLabs v3 and Gemini TTS.", zh: "據微軟技術報告，7B 版 MOS 勝過 ElevenLabs v3 與 Gemini TTS。" },
        tags: ["評測", "MOS", "對比"],
        overview: {
          en: "Microsoft's technical report puts the larger VibeVoice (7B) at a Mean Opinion Score of 4.5±0.1 — the highest in their comparison, ahead of ElevenLabs Eleven-V3 (Alpha) and Google Gemini-2.5-Pro-Preview-TTS, with realism (~3.71) approaching human-level. These are the authors' own benchmarks, so read them alongside independent listening. Source: Microsoft technical report (via AllAboutAI / Slator).",
          zh: "微軟技術報告指出較大的 VibeVoice（7B）平均意見分數（MOS）達 4.5±0.1，為其比較中最高，領先 ElevenLabs Eleven-V3（Alpha）與 Google Gemini-2.5-Pro-Preview-TTS，真實度（約 3.71）接近人類水準。這是作者自家評測，宜與獨立聽測一起參考。來源：微軟技術報告（經 AllAboutAI / Slator 引述）。"
        }
      },
      {
        slug: "rev-vs-eleven", category: "vs",
        title: { en: "vs ElevenLabs", zh: "對比 ElevenLabs" },
        summary: { en: "Wins on long-form and cost; ElevenLabs still leads on polish and languages.", zh: "長篇與成本勝出；ElevenLabs 的精緻度與語言廣度仍領先。" },
        tags: ["ElevenLabs", "對比"],
        overview: {
          en: "The common comparison: VibeVoice wins on long-form multi-speaker output and cost (free, self-hosted), while ElevenLabs still edges ahead on single-clip polish, emotion control and breadth of languages. Pick by workload, not by a single 'best'. Source: review aggregators.",
          zh: "常見的對比：VibeVoice 在長篇多語者輸出與成本（免費、自架）勝出；ElevenLabs 在單段精緻度、情緒控制與語言廣度仍略勝。應依工作負載挑選，而非追求單一「最佳」。來源：各評測彙整。"
        }
      },
      {
        slug: "rev-vs-f5", category: "vs",
        title: { en: "vs F5-TTS / XTTS", zh: "對比 F5-TTS / XTTS" },
        summary: { en: "Better long-dialogue consistency; F5 still praised for single-utterance quality.", zh: "長對話一致性更好；F5 的單句音質仍受稱讚。" },
        tags: ["F5-TTS", "XTTS", "對比"],
        overview: {
          en: "Against open peers, the community view is that VibeVoice holds multi-speaker, long-dialogue consistency better than F5-TTS and XTTS-v2, while F5-TTS is still admired for crisp single-utterance quality. VibeVoice trades a little per-clip sharpness for staying coherent over the long haul. Source: community discussion.",
          zh: "與開源同儕相比，社群看法是 VibeVoice 在多語者、長對話的一致性勝過 F5-TTS 與 XTTS-v2；而 F5-TTS 的單句清晰音質仍受稱讚。VibeVoice 以些許單段銳利度，換取長程的一致連貫。來源：社群討論。"
        }
      }
    ]
  },

  /* ===================== 6. USE CASES (bento) ===================== */
  {
    slug: "usecases", layout: "bento", icon: "interests",
    title: { en: "Where it fits", zh: "應用場景" },
    subtitle: {
      en: "Long-form, multi-speaker synthesis unlocks workflows that single-utterance TTS struggles with.",
      zh: "長篇、多語者合成解鎖了單句 TTS 難以勝任的工作流。"
    },
    tiles: [
      { size: "lg", accent: true, icon: "podcasts", value: "90 min",
        title: { en: "Blog → podcast", zh: "部落格轉 Podcast" },
        body: { en: "Turn an article into a natural two-host conversation, generated in one pass with consistent voices.",
                zh: "把一篇文章自動變成自然的雙人對談 Podcast，單次生成、音色一致。" } },
      { size: "tall", icon: "school",
        title: { en: "Educational dialogue", zh: "教育對話情境" },
        body: { en: "Teacher–student scripts, interviews and role-play voiced for courseware.",
                zh: "師生對話、訪談與角色扮演腳本，為教材配上語音。" } },
      { size: "sm", icon: "smart_toy",
        title: { en: "AI agent voice", zh: "AI 代理語音" },
        body: { en: "Low-latency voice interface for agents (Realtime).", zh: "為 AI 代理提供低延遲語音介面（Realtime）。" } },
      { size: "sm", icon: "corporate_fare",
        title: { en: "Corporate e-learning", zh: "企業 e-learning" },
        body: { en: "Scale training narration without a studio.", zh: "免錄音室，大量產出教育訓練旁白。" } },
      { size: "wide", icon: "menu_book",
        title: { en: "Long-form narration", zh: "長篇技術內容朗讀" },
        body: { en: "Narrate technical docs and long articles in a single coherent take.",
                zh: "技術文件、長篇文章一次連貫合成朗讀。" } },
      { size: "md", accent: true, icon: "record_voice_over",
        title: { en: "Multi-speaker narration", zh: "多語者旁白" },
        body: { en: "Keep up to 4 voices consistent inside one model.", zh: "在單一模型內維持最多 4 位語者音色一致。" } }
    ]
  },

  /* ===================== 7. TIMELINE ===================== */
  {
    slug: "timeline", layout: "timeline", icon: "timeline",
    title: { en: "Development timeline", zh: "發展時間軸" },
    subtitle: {
      en: "From the first TTS announcement to ASR landing in Hugging Face Transformers.",
      zh: "從首次 TTS 發表，到 ASR 併入 Hugging Face Transformers。"
    },
    events: [
      { date: { en: "Aug 2025", zh: "2025 年 8 月" },
        title: { en: "TTS announced", zh: "TTS 首次發表" },
        body: { en: "The original VibeVoice text-to-speech model debuts; the work is later accepted as an ICLR 2026 Oral.",
                zh: "VibeVoice 語音合成模型首次亮相；此研究後獲 ICLR 2026 Oral 接受。" } },
      { date: { en: "Sep 2025", zh: "2025 年 9 月" },
        title: { en: "TTS code removed", zh: "TTS 程式碼下架" },
        body: { en: "The code is pulled over misuse concerns; the model weights remain available on Hugging Face.",
                zh: "因濫用疑慮，程式碼被移除；模型權重仍保留在 Hugging Face。" } },
      { date: { en: "Dec 2025", zh: "2025 年 12 月" },
        title: { en: "Realtime-0.5B expansion", zh: "Realtime-0.5B 語者擴充" },
        body: { en: "An experimental speaker expansion lands for the lightweight real-time model.",
                zh: "輕量即時模型加入實驗性語者擴充。" } },
      { date: { en: "Jan 2026", zh: "2026 年 1 月" },
        title: { en: "ASR-7B released", zh: "ASR-7B 發表" },
        body: { en: "The 7B speech-recognition model arrives with 60-minute single-pass transcription.",
                zh: "7B 語音辨識模型發表，支援單次 60 分鐘長音訊轉寫。" } },
      { date: { en: "Mar 2026", zh: "2026 年 3 月" },
        title: { en: "ASR in Transformers", zh: "ASR 併入 Transformers" },
        body: { en: "VibeVoice-ASR is integrated into Hugging Face Transformers for easy use.",
                zh: "VibeVoice-ASR 併入 Hugging Face Transformers，更易上手使用。" } }
    ]
  },

  /* ===================== 8. FAQ (limitations & responsible AI) ===================== */
  {
    slug: "faq", layout: "faq", icon: "policy",
    title: { en: "Limitations & responsible AI", zh: "限制與負責任 AI" },
    subtitle: {
      en: "What VibeVoice can't do, what it needs, and how to use it responsibly. Search to jump to a question.",
      zh: "VibeVoice 做不到什麼、需要什麼，以及如何負責任地使用。可用搜尋快速跳到問題。"
    },
    qa: [
      { q: { en: "Can I use it commercially?", zh: "可以商用嗎？" },
        a: { en: "It is intended for research and development. The maintainers do not recommend commercial deployment without further testing of safety and quality.",
             zh: "官方定位為研究與開發用途。未經進一步的安全與品質測試，不建議直接用於商業部署。" } },
      { q: { en: "Which languages are supported?", zh: "支援哪些語言？" },
        a: { en: "For TTS, English and Chinese are the most reliable; other languages are less stable. ASR is natively multilingual across 50+ languages, and Realtime ships multilingual voices (DE, FR, IT, JP, KR, NL, PL, PT, ES).",
             zh: "TTS 以英文、中文最穩定，其他語言較不穩。ASR 原生支援 50+ 種語言；Realtime 內建多語語音（德、法、義、日、韓、荷、波、葡、西）。" } },
      { q: { en: "Is there a misuse safeguard?", zh: "有防濫用機制嗎？" },
        a: { en: "Yes — the model incorporates imperceptible watermarking to flag AI generation and encourages audible disclaimers. You should always disclose AI-generated audio.",
             zh: "有——模型內建不可察覺的浮水印以標記 AI 生成，並鼓勵加上可聽見的聲明。使用時都應主動揭露音訊為 AI 生成。" } },
      { q: { en: "What hardware do I need?", zh: "硬體需求是什麼？" },
        a: { en: "The 1.5B model runs on an RTX 4070 Ti (12 GB) in BF16; full quality peaks around 14 GB VRAM. A 90-minute synthesis takes roughly 8–12 minutes on an A100 40 GB, with a real-time factor near 0.1×.",
             zh: "1.5B 模型可在 RTX 4070 Ti（12GB）以 BF16 執行；全品質峰值約 14GB VRAM。在 A100 40GB 上，90 分鐘合成約需 8–12 分鐘，實時因子（RTF）約 0.1×。" } },
      { q: { en: "Can it do overlapping speech or background music?", zh: "能做重疊對話或背景音樂嗎？" },
        a: { en: "No. It cannot synthesise simultaneous overlapping speakers, background music or sound effects — it is tuned for clean, sequential dialogue.",
             zh: "不行。它無法合成同時重疊的發話、背景音樂或音效——架構是為乾淨、依序的對話而調校。" } },
      { q: { en: "How much emotion control is there?", zh: "情緒控制做得到嗎？" },
        a: { en: "Only basic sentiment. Fine-grained emotion control beyond simple tones is limited.",
             zh: "僅支援基本情緒。超出簡單語氣的細緻情緒控制有限。" } },
      { q: { en: "Why was it briefly pulled in Sep 2025?", zh: "為什麼 2025 年 9 月一度下架？" },
        a: { en: "Microsoft temporarily removed the TTS code over misuse concerns. The weights stayed on Hugging Face, and access has shifted over time.",
             zh: "微軟因濫用疑慮暫時移除了 TTS 程式碼。權重仍留在 Hugging Face，存取狀態隨時間有所變動。" } },
      { q: { en: "What's the license?", zh: "授權是什麼？" },
        a: { en: "MIT.", zh: "MIT 授權。" } },
      { q: { en: "What are the risks?", zh: "有什麼風險？" },
        a: { en: "High-quality synthetic speech can be misused for impersonation, fraud or disinformation. Disclose AI-generated content, verify transcripts, and avoid misleading deployments.",
             zh: "高品質合成語音可能被用於假冒、詐騙或散布不實資訊。請揭露 AI 生成內容、查核轉寫結果，並避免誤導性的應用。" } }
    ]
  },

  /* ===================== 9. RESOURCES (table) ===================== */
  {
    slug: "resources", layout: "table", icon: "link",
    title: { en: "Resources & links", zh: "資源與連結" },
    subtitle: {
      en: "Official source, weights, a live demo and further reading. Filter by type or search.",
      zh: "官方原始碼、權重、線上體驗與延伸閱讀。可依類別篩選或搜尋。"
    },
    columns: [
      { key: "name", label: { en: "Resource",    zh: "名稱" }, type: "text" },
      { key: "type", label: { en: "Type",        zh: "類別" }, type: "tag", filter: true },
      { key: "desc", label: { en: "Description", zh: "說明" }, type: "text" },
      { key: "url",  label: { en: "Link",        zh: "連結" }, type: "link" }
    ],
    rows: [
      { name: { en: "GitHub source", zh: "GitHub 原始碼" },
        type: { en: "Official", zh: "官方" },
        desc: { en: "microsoft/VibeVoice — code, docs and fine-tuning resources.", zh: "microsoft/VibeVoice——程式碼、說明與 finetune 資源。" },
        url: "https://github.com/microsoft/VibeVoice" },
      { name: { en: "Hugging Face (microsoft)", zh: "Hugging Face（microsoft）" },
        type: { en: "Weights", zh: "權重" },
        desc: { en: "Model weights and cards under the Microsoft org.", zh: "微軟組織底下的模型權重與模型卡。" },
        url: "https://huggingface.co/microsoft" },
      { name: { en: "ASR Playground", zh: "ASR 線上體驗" },
        type: { en: "Demo", zh: "體驗" },
        desc: { en: "Try VibeVoice-ASR in the browser.", zh: "在瀏覽器試用 VibeVoice-ASR。" },
        url: "https://aka.ms/vibevoice-asr" },
      { name: { en: "Reference article (itnotetk)", zh: "參考文章（itnotetk）" },
        type: { en: "Reading", zh: "延伸" },
        desc: { en: "Chinese write-up on the multi-speaker long-form TTS.", zh: "中文介紹：多語者長語音 TTS。" },
        url: "https://www.itnotetk.com/2026/05/01/vibevoice-microsoft-multi-speaker-tts/" },
      { name: { en: "AllAboutAI review", zh: "AllAboutAI 評測" },
        type: { en: "Reviews", zh: "評價" },
        desc: { en: "Hands-on review with a user-survey score (4/5).", zh: "實測評測，附使用者調查評分（4/5）。" },
        url: "https://www.allaboutai.com/ai-reviews/microsoft-vibevoice/" },
      { name: { en: "Applied AI Tools — user review analysis", zh: "Applied AI Tools — 使用者評價分析" },
        type: { en: "Reviews", zh: "評價" },
        desc: { en: "Open-source explainer plus aggregated user reviews.", zh: "開源解析與彙整的使用者評價。" },
        url: "https://appliedai.tools/ai-for-content/microsoft-vibevoice-tts-open-source-explained-with-user-review-analysis/" },
      { name: { en: "Hacker News discussion", zh: "Hacker News 討論" },
        type: { en: "Reviews", zh: "評價" },
        desc: { en: "Community thread with praise and critical takes.", zh: "社群討論串，含好評與批評。" },
        url: "https://news.ycombinator.com/item?id=45114245" },
      { name: { en: "Slator coverage", zh: "Slator 產業報導" },
        type: { en: "Reviews", zh: "評價" },
        desc: { en: "Language-industry coverage of the long-form model.", zh: "語言產業媒體對長語音模型的報導。" },
        url: "https://slator.com/microsoft-research-vibevoice-long-form-speech-synthesis/" }
    ]
  }

];
