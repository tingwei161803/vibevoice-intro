/* =========================================================================
   VibeVoice 介紹站 · data.js

   單一資料檔，被每一頁載入。整站由兩個全域物件驅動:
     window.SITE_META  = { title:{en,zh}, subtitle:{en,zh} }
     window.SITE_PAGES = [ { slug, layout, icon, title:{en,zh}, ...版型資料 } ]

   每個 SITE_PAGES entry = 一個實體 .html 頁:
     slug "home" -> index.html，其餘 slug -> <slug>.html
   跨頁 nav 依此陣列順序排列。

   內容彙整自 microsoft/VibeVoice 專案說明與公開技術介紹文章，為非官方的
   學習整理；人類可見字串一律寫成 {en,zh} 物件，兩種語言各有自己的網址。
   兩邊字面相同的值（模型大小、單位、刊物名）才留純字串。
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
      en: "VibeVoice synthesises up to 90 minutes of natural, multi-speaker audio in a single pass — powered by a 7.5 Hz continuous speech tokenizer and a next-token diffusion design. Six open checkpoints now cover long-form TTS, real-time speech, long-form and streaming recognition, and CPU-only edge inference.",
      zh: "VibeVoice 用 7.5 Hz 連續語音 tokenizer 與「next-token diffusion」架構，單次最長可生成 90 分鐘、最多 4 位語者的自然語音。目前六個開源權重涵蓋長語音合成、即時語音、長音訊與串流辨識，以及純 CPU 的邊緣推論。"
    },
    stats: [
      { value: 90,  label: { en: "min in one pass", zh: "分鐘・單次最長語音" } },
      { value: 4,   label: { en: "speakers at once", zh: "位・同時語者" } },
      { value: 7.5, label: { en: "Hz tokenizer", zh: "Hz・連續語音取樣" } },
      { value: 6,   label: { en: "open checkpoints", zh: "個・開源模型權重" } }
    ]
  },

  /* ===================== 2. MODELS (gallery) ===================== */
  {
    slug: "models", layout: "gallery", icon: "dataset",
    title: { en: "The model family", zh: "模型家族" },
    subtitle: {
      en: "Six open checkpoints, one design language. Tap a card for the full detail.",
      zh: "六個開源權重，同一套設計語言。點卡片看完整說明。"
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
        tags: ["1.5B", { en: "90 min", zh: "90 分鐘" }, { en: "4 speakers", zh: "4 位語者" }, "EN / ZH"],
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
        tags: ["7B", { en: "60 min", zh: "60 分鐘" }, { en: "50+ languages", zh: "50+ 種語言" }, "64K"],
        overview: {
          en: "The speech-to-text member of the family. It transcribes up to 60 minutes of audio in a single pass and produces structured output with speaker identity (who), timestamps (when) and content (what). It is natively multilingual across 50+ languages, supports custom hotwords for domain accuracy, and uses a 64K token context. Released 21 Jan 2026; it landed in Hugging Face Transformers on 6 Mar 2026 and in Azure AI Foundry Labs on 12 Mar 2026. Fine-tuning code and vLLM inference are both available. Two spin-offs followed — a CPU build (BitNet) and a streaming variant.",
          zh: "家族中的語音辨識成員。單次可轉寫最長 60 分鐘音訊，並輸出帶有語者身分（誰）、時間戳（何時）與內容（說了什麼）的結構化結果。原生支援 50+ 種語言，可自訂 hotword 提升專業領域準確度，脈絡長度達 64K token。2026 年 1 月 21 日發表，3 月 6 日併入 Hugging Face Transformers、3 月 12 日進入 Azure AI Foundry Labs。另提供 finetune 程式碼與 vLLM 推論支援。後續再衍生出兩個版本——純 CPU 的 BitNet 版與串流版。"
        }
      },
      {
        slug: "vibevoice-realtime-0-5b", category: "realtime",
        title: { en: "VibeVoice-Realtime · 0.5B", zh: "VibeVoice-Realtime · 0.5B" },
        summary: {
          en: "Lightweight streaming: ~300 ms first-audio latency, streaming text input, robust to ~10 minutes.",
          zh: "輕量即時串流：首字延遲約 300 毫秒，支援串流文字輸入，可穩定生成約 10 分鐘。"
        },
        tags: ["0.5B", "~300 ms", { en: "streaming", zh: "串流" }, { en: "multilingual", zh: "多語" }],
        overview: {
          en: "The smallest, deployment-friendly model for real-time use. It accepts streaming text and starts speaking with roughly 300 ms of first-audio latency, generating robustly up to about 10 minutes. Open-sourced on 3 Dec 2025; two weeks later an experimental speaker pack added multilingual voices in nine languages (DE, FR, IT, JP, KR, NL, PL, PT, ES) plus 11 distinct English style voices. A Colab demo is available.",
          zh: "家族中最小、最適合部署的即時模型。可接收串流文字輸入，首字延遲約 300 毫秒即開始發聲，能穩定生成約 10 分鐘。2025 年 12 月 3 日開源；兩週後的實驗性語者包再補上九種語言的多語音色（德、法、義、日、韓、荷、波、葡、西）與 11 種英文風格音色。並提供 Colab 範例。"
        }
      },
      {
        slug: "vibevoice-asr-streaming", category: "asr",
        title: { en: "VibeVoice-ASR-Streaming · 1.5B / 7B", zh: "VibeVoice-ASR-Streaming · 1.5B / 7B" },
        summary: {
          en: "Transcribes who said what while the audio is still arriving, emitting a line roughly every 2.9 seconds.",
          zh: "音訊還在進來時就邊聽邊轉寫「誰說了什麼」，約每 2.9 秒吐出一段文字。"
        },
        tags: ["1.5B / 7B", { en: "streaming", zh: "串流" }, { en: "10 languages", zh: "10 種語言" }, { en: "Sep 2026", zh: "2026 / 09" }],
        overview: {
          en: "Released 3 Sep 2026 in two sizes. Instead of waiting for a recording to end, it interleaves fixed-size audio chunks, a little lookahead audio and the text it has already produced — so speaker-attributed transcription comes out live, with no separate diarization stage. The shipped checkpoints use 22 chunk frames and 4 lookahead frames at 7.5 Hz, which works out to a ~2.9 s cadence with ~0.5 s of lookahead. Hotwords work exactly as they do on the offline model. The trade-off is language breadth: 10 languages (ZH, EN, FR, DE, IT, JA, KO, PT, RU, ES) against the offline model's 50+. Microsoft's own report puts the 7B at the lowest average WER/CER across five evaluation sets; there is no independent benchmark yet.",
          zh: "2026 年 9 月 3 日發表，分 1.5B 與 7B 兩種尺寸。它不等錄音結束，而是把固定長度的音訊區塊、一小段前瞻音訊與已產出的文字交錯餵進模型——因此帶語者標註的逐字稿是即時吐出來的，也不需要另一段獨立的語者分離流程。官方權重採用 22 個區塊影格與 4 個前瞻影格，在 7.5 Hz 下換算約為每 2.9 秒一段、前瞻約 0.5 秒。hotword 的用法與離線版完全相同。代價是語言廣度：串流版支援 10 種語言（中、英、法、德、義、日、韓、葡、俄、西），離線版則是 50+ 種。微軟自家報告指出 7B 在五組評測集上的平均 WER/CER 最低；目前尚無獨立第三方評測。"
        }
      },
      {
        slug: "vibevoice-asr-bitnet", category: "asr",
        title: { en: "VibeVoice-ASR-BitNet · CPU", zh: "VibeVoice-ASR-BitNet · CPU" },
        summary: {
          en: "The ASR model squeezed from 4.62 GB to 1.58 GB — faster than real time on a few CPU threads, no GPU.",
          zh: "把 ASR 模型從 4.62 GB 壓到 1.58 GB——幾條 CPU 執行緒就跑得比即時還快，不需要 GPU。"
        },
        tags: ["1.58 GB", { en: "CPU only", zh: "純 CPU" }, "RTF < 1", { en: "Jul 2026", zh: "2026 / 07" }],
        overview: {
          en: "Released 23 Jul 2026 alongside VibeASR.cpp, an edge inference engine built on ggml. The compression is deliberately uneven: the VAE acoustic tokenizer is quantized to INT8 with fused, SIMD-optimised kernels, while the autoregressive decoder goes all the way down to BitNet-style ternary weights. Together that takes the model from 4.62 GB to 1.58 GB — about 2.9× — for a real-time factor under 1 on as few as three CPU threads, and 1.6–2.3× faster than whisper.cpp at a comparable ~1.6 GB size. Progressive quantization-aware training keeps the accuracy loss modest against the FP16 baseline. This is the version that puts long-form, speaker-attributed transcription on a laptop or an ARM box.",
          zh: "2026 年 7 月 23 日與邊緣推論引擎 VibeASR.cpp（建在 ggml 上）一同發表。壓縮刻意採取不對稱做法：VAE 聲學 tokenizer 量化到 INT8，搭配融合過的 SIMD 最佳化 kernel；自迴歸解碼器則一路壓到 BitNet 式的三元權重。兩者合計把模型從 4.62 GB 縮到 1.58 GB、約 2.9 倍，只要三條 CPU 執行緒就能達到實時因子小於 1，在相近的約 1.6 GB 規模下比 whisper.cpp 快 1.6–2.3 倍。漸進式的量化感知訓練讓準確度相對 FP16 基準只有小幅下降。這個版本讓長音訊、帶語者標註的轉寫能直接跑在筆電或 ARM 機器上。"
        }
      }
    ]
  },

  /* ===================== 2b. VERSIONS (model comparison) ===================== */
  {
    slug: "versions", layout: "comparison", icon: "splitscreen",
    title: { en: "Model comparison", zh: "版本比較" },
    subtitle: {
      en: "All five VibeVoice models side by side — pick the right one for the job.",
      zh: "VibeVoice 五個版本並列比較——依任務挑對的那一個。"
    },
    plans: [
      { key: "realtime", name: { en: "Realtime-0.5B", zh: "Realtime-0.5B" }, price: { en: "0.5B", zh: "0.5B" }, note: { en: "real-time", zh: "即時串流" } },
      { key: "tts",      name: { en: "TTS-1.5B",      zh: "TTS-1.5B" },      price: { en: "1.5B", zh: "1.5B" }, highlight: true, note: { en: "flagship", zh: "旗艦" } },
      { key: "asr",      name: { en: "ASR-7B",        zh: "ASR-7B" },        price: { en: "7B",   zh: "7B" },   note: { en: "recognition", zh: "辨識" } },
      { key: "stream",   name: { en: "ASR-Streaming",  zh: "ASR-Streaming" }, price: { en: "1.5B / 7B", zh: "1.5B / 7B" }, note: { en: "live transcript", zh: "即時逐字稿" } },
      { key: "bitnet",   name: { en: "ASR-BitNet",     zh: "ASR-BitNet" },    price: { en: "1.58 GB", zh: "1.58 GB" }, note: { en: "edge CPU", zh: "邊緣 CPU" } }
    ],
    features: [
      { label: { en: "Task", zh: "任務類型" },
        values: { realtime: { en: "TTS (stream)", zh: "語音合成（串流）" }, tts: { en: "Text-to-Speech", zh: "語音合成" }, asr: { en: "Speech-to-Text", zh: "語音辨識" }, stream: { en: "STT (stream)", zh: "語音辨識（串流）" }, bitnet: { en: "Speech-to-Text", zh: "語音辨識" } } },
      { label: { en: "Max length", zh: "最長處理長度" },
        values: { realtime: { en: "~10 min", zh: "約 10 分鐘" }, tts: { en: "90 min", zh: "90 分鐘" }, asr: { en: "60 min", zh: "60 分鐘" }, stream: { en: "continuous", zh: "持續不限" }, bitnet: { en: "60 min", zh: "60 分鐘" } } },
      { label: { en: "Speakers", zh: "同時語者" },
        values: { realtime: "1", tts: { en: "up to 4", zh: "最多 4" }, asr: { en: "—", zh: "—" }, stream: { en: "—", zh: "—" }, bitnet: { en: "—", zh: "—" } } },
      { label: { en: "Context", zh: "脈絡長度" },
        values: { realtime: "8K", tts: "64K", asr: "64K", stream: { en: "rolling", zh: "滾動視窗" }, bitnet: "64K" } },
      { label: { en: "Streaming text input", zh: "串流文字輸入" },
        values: { realtime: true, tts: false, asr: false, stream: false, bitnet: false } },
      { label: { en: "Low latency (~300 ms)", zh: "低延遲（約 300ms）" },
        values: { realtime: true, tts: false, asr: false, stream: { en: "~2.9 s chunk", zh: "約 2.9 秒一段" }, bitnet: false } },
      { label: { en: "Multi-speaker consistency", zh: "多語者一致" },
        values: { realtime: false, tts: true, asr: false, stream: false, bitnet: false } },
      { label: { en: "Timestamps + diarization", zh: "時間戳 + 語者標註" },
        values: { realtime: false, tts: false, asr: true, stream: true, bitnet: true } },
      { label: { en: "Runs without a GPU", zh: "免 GPU 可執行" },
        values: { realtime: false, tts: false, asr: false, stream: false, bitnet: true } },
      { label: { en: "Languages", zh: "語言" },
        values: { realtime: { en: "Multi-voice", zh: "多語音色" }, tts: { en: "EN / ZH first", zh: "英・中為主" }, asr: { en: "50+ languages", zh: "50+ 語言" }, stream: { en: "10 languages", zh: "10 種語言" }, bitnet: { en: "EN / ZH +", zh: "英・中等" } } },
      { label: { en: "Best for", zh: "適合場景" },
        values: { realtime: { en: "Agent voice", zh: "AI 代理語音" }, tts: { en: "Long podcasts", zh: "長篇 Podcast" }, asr: { en: "Transcription", zh: "逐字稿" }, stream: { en: "Live captions", zh: "即時字幕" }, bitnet: { en: "On-device", zh: "裝置端離線" } } }
    ]
  },

  /* ===================== 3. ARCHITECTURE (article) ===================== */
  {
    slug: "architecture", layout: "article", icon: "schema",
    title: { en: "How it works", zh: "技術架構" },
    subtitle: {
      en: "A 7.5 Hz tokenizer plus next-token diffusion: how VibeVoice fits 90 minutes of audio inside a 64K context — and how that design later stretched to streaming and to CPUs.",
      zh: "7.5 Hz tokenizer 加上 next-token diffusion：VibeVoice 如何把 90 分鐘音訊塞進 64K 脈絡——以及這套設計後來如何延伸到串流與純 CPU。"
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
        id: "streaming", heading: { en: "Stretching the design: streaming and the edge", zh: "同一套設計的兩種延伸：串流與邊緣" },
        blocks: [
          { type: "p", text: {
            en: "The 2026 releases did not replace the architecture — they bent it in two directions. Both start from the same constraint: a 7.5 Hz stream is small enough that a model can afford to carry context around.",
            zh: "2026 年的幾次發布沒有換掉架構，而是把它往兩個方向拉伸。兩者的起點是同一個條件：7.5 Hz 的序列夠小，模型才負擔得起隨身攜帶脈絡。" } },
          { type: "h3", text: { en: "Streaming: chunks, lookahead, and its own transcript", zh: "串流：區塊、前瞻，與自己剛寫過的稿" } },
          { type: "p", text: {
            en: "Reading a whole hour at once is exactly what lets the offline model keep speakers straight — and exactly what a live transcript cannot do. VibeVoice-ASR-Streaming works around that by interleaving three things: a fixed-size chunk of new audio, a little lookahead audio past its edge, and the text the model has already produced. Feeding its own transcript back in is what carries speaker identity across chunk boundaries, which is why there is still no separate diarization stage.",
            zh: "一次讀完整整一小時，正是離線版能分清楚誰是誰的原因——也正是即時逐字稿做不到的事。VibeVoice-ASR-Streaming 的解法是把三樣東西交錯餵進去：一段固定長度的新音訊、一小段越過邊界的前瞻音訊，以及模型自己已經產出的文字。把自己的逐字稿再餵回去，就是語者身分能跨越區塊邊界的關鍵——所以它依然不需要獨立的語者分離流程。" } },
          { type: "code", text: {
            en: "chunk_frames = 22  @ 7.5 Hz  ->  ~2.9 s of audio per emitted segment\nlookahead_frames = 4          ->  ~0.5 s peek past the chunk edge\n\n[ audio chunk | lookahead | text so far ]\n      |\n      v\n[ LLM ]  ->  \"Speaker 1: ...\"\n      |\n      +-->  text fed back into the next chunk",
            zh: "chunk_frames = 22  @ 7.5 Hz  ->  每段輸出約 2.9 秒音訊\nlookahead_frames = 4          ->  越過邊界前瞻約 0.5 秒\n\n[ 音訊區塊 | 前瞻 | 已產出的文字 ]\n      |\n      v\n[ LLM ]  ->  「語者 1：…」\n      |\n      +-->  文字回饋到下一個區塊" } },
          { type: "p", text: {
            en: "Worth reading the numbers honestly: those are the values in the shipped checkpoints, and they describe a roughly three-second cadence, not sub-second latency. It is a live transcript, not an instant one.",
            zh: "數字要老實讀：以上是官方權重實際採用的設定，描述的是「約三秒一段」的節奏，而不是次秒級延遲。它是即時逐字稿，但不是零延遲。" } },
          { type: "h3", text: { en: "The edge: quantize the two halves differently", zh: "邊緣：兩個半邊，用不同的壓法" } },
          { type: "p", text: {
            en: "VibeVoice-ASR-BitNet takes the opposite route — same length, far less hardware. Its compression is deliberately uneven, because the two halves of the model tolerate very different things: the VAE acoustic tokenizer is quantized to INT8 with fused, SIMD-optimised kernels, while the autoregressive decoder goes all the way down to BitNet-style ternary weights. Progressive quantization-aware training keeps the accuracy cost modest.",
            zh: "VibeVoice-ASR-BitNet 走的是另一條路——長度不變，但硬體需求大幅下降。它的壓縮刻意不對稱，因為模型的兩個半邊能忍受的程度差很多：VAE 聲學 tokenizer 量化到 INT8，搭配融合過的 SIMD 最佳化 kernel；自迴歸解碼器則一路壓到 BitNet 式的三元權重。漸進式的量化感知訓練讓準確度的代價維持在小幅範圍。" } },
          { type: "ul", items: {
            en: [
              "4.62 GB -> 1.58 GB, about 2.9x smaller overall.",
              "Real-time factor under 1 on as few as three CPU threads — no GPU.",
              "1.6-2.3x faster than whisper.cpp at a comparable ~1.6 GB size."
            ],
            zh: [
              "4.62 GB -> 1.58 GB，整體約縮小 2.9 倍。",
              "只要三條 CPU 執行緒就能達到實時因子小於 1——不需要 GPU。",
              "在相近的約 1.6 GB 規模下，比 whisper.cpp 快 1.6–2.3 倍。"
            ] } }
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
      en: "The headline figures behind VibeVoice, plus a full per-model spec table covering all five models.",
      zh: "VibeVoice 的關鍵數字，以及涵蓋五個版本的完整規格表。"
    },
    stats: [
      { label: { en: "Frame rate",        zh: "連續語音取樣率" }, value: "7.5", unit: { en: "Hz", zh: "Hz" } },
      { label: { en: "Context (TTS/ASR)", zh: "脈絡長度 (TTS/ASR)" }, value: "64", unit: { en: "K tokens", zh: "K token" } },
      { label: { en: "Audio output",      zh: "音訊輸出取樣" }, value: "24", unit: { en: "kHz", zh: "kHz" } },
      { label: { en: "Realtime latency",  zh: "即時版首字延遲" }, value: "~300", unit: { en: "ms", zh: "毫秒" } },
      { label: { en: "Streaming ASR chunk", zh: "串流辨識輸出間隔" }, value: "~2.9", unit: { en: "s", zh: "秒" } },
      { label: { en: "Edge build size",     zh: "邊緣版模型大小" }, value: "1.58", unit: { en: "GB (CPU)", zh: "GB（CPU）" } }
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
        { x: "Str-1.5B", y: 1.5 },
        { x: "Str-7B",   y: 7 },
        { x: "ASR",      y: 7 }
      ]
    },
    table: {
      columns: [
        { key: "spec",     label: { en: "Spec",            zh: "項目" } },
        { key: "realtime", label: { en: "Realtime-0.5B",   zh: "Realtime-0.5B" } },
        { key: "tts",      label: { en: "TTS-1.5B",        zh: "TTS-1.5B" } },
        { key: "asr",      label: { en: "ASR-7B",          zh: "ASR-7B" } },
        { key: "stream",   label: { en: "ASR-Streaming",   zh: "ASR-Streaming" } },
        { key: "bitnet",   label: { en: "ASR-BitNet",      zh: "ASR-BitNet" } }
      ],
      rows: [
        { spec: { en: "Parameters",     zh: "參數量" },     realtime: "0.5B", tts: "1.5B", asr: "7B", stream: "1.5B / 7B", bitnet: { en: "1.58 GB", zh: "1.58 GB" } },
        { spec: { en: "Max output",     zh: "最長輸出" },   realtime: { en: "~10 min", zh: "約 10 分鐘" }, tts: { en: "90 min", zh: "90 分鐘" }, asr: { en: "60 min", zh: "60 分鐘" }, stream: { en: "continuous", zh: "持續不限" }, bitnet: { en: "60 min", zh: "60 分鐘" } },
        { spec: { en: "Speakers",       zh: "同時語者" },   realtime: "1", tts: { en: "up to 4", zh: "最多 4" }, asr: { en: "— (recognition)", zh: "—（辨識）" }, stream: { en: "— (recognition)", zh: "—（辨識）" }, bitnet: { en: "— (recognition)", zh: "—（辨識）" } },
        { spec: { en: "Context",        zh: "脈絡長度" },   realtime: "8K", tts: "64K", asr: "64K", stream: { en: "rolling", zh: "滾動視窗" }, bitnet: "64K" },
        { spec: { en: "Languages",      zh: "主要語言" },   realtime: { en: "Multilingual voices", zh: "多語語音" }, tts: { en: "EN / ZH first", zh: "英・中為主" }, asr: { en: "50+ languages", zh: "50+ 語言" }, stream: { en: "10 languages", zh: "10 種語言" }, bitnet: { en: "EN / ZH +", zh: "英・中等" } },
        { spec: { en: "First latency",  zh: "首字延遲" },   realtime: "~300 ms", tts: "—", asr: "—", stream: { en: "~2.9 s / chunk", zh: "約 2.9 秒／段" }, bitnet: "—" },
        { spec: { en: "Hardware",       zh: "硬體需求" },   realtime: "GPU", tts: "GPU", asr: "GPU", stream: "GPU", bitnet: { en: "CPU (3+ threads)", zh: "CPU（3 執行緒起）" } },
        { spec: { en: "Role",           zh: "定位" },       realtime: { en: "Real-time streaming", zh: "即時串流" }, tts: { en: "Long-form synthesis", zh: "長語音合成" }, asr: { en: "Long-form recognition", zh: "長音訊辨識" }, stream: { en: "Live transcription", zh: "即時逐字稿" }, bitnet: { en: "On-device recognition", zh: "裝置端辨識" } }
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
      { key: "vv",    name: { en: "VibeVoice",      zh: "VibeVoice" },      price: { en: "MIT · open", zh: "MIT · 開源" }, highlight: true, note: { en: "self-hosted", zh: "可自架" } },
      { key: "oai",   name: { en: "gpt-4o-mini-tts", zh: "gpt-4o-mini-tts" }, price: { en: "$0.015/min", zh: "$0.015/分" }, note: { en: "OpenAI · steerable", zh: "OpenAI 可指揮" } },
      { key: "el",    name: { en: "ElevenLabs",     zh: "ElevenLabs" },     price: { en: "$99+/mo",    zh: "$99+/月" },   note: { en: "cloud SaaS", zh: "雲端 SaaS" } },
      { key: "f5",    name: { en: "F5-TTS",         zh: "F5-TTS" },         price: { en: "open",       zh: "開源" },       note: { en: "single-shot", zh: "單句強" } },
      { key: "xtts",  name: { en: "XTTS-v2",        zh: "XTTS-v2" },        price: { en: "open",       zh: "開源" },       note: { en: "Coqui", zh: "Coqui" } },
      { key: "spark", name: { en: "SparkTTS",       zh: "SparkTTS" },       price: { en: "open",       zh: "開源" },       note: { en: "0.5B · clone", zh: "0.5B 複製" } },
      { key: "cosy",  name: { en: "CosyVoice 2",    zh: "CosyVoice 2" },    price: { en: "Apache-2.0", zh: "Apache-2.0" }, note: { en: "Alibaba · stream", zh: "Alibaba 串流" } }
    ],
    features: [
      { label: { en: "Multi-speaker consistency", zh: "多語者長對話一致性" }, values: { vv: true, oai: false, el: true, f5: false, xtts: false, spark: false, cosy: false } },
      { label: { en: "90-minute single pass",     zh: "單次最長 90 分鐘" },   values: { vv: true, oai: false, el: false, f5: false, xtts: false, spark: false, cosy: false } },
      { label: { en: "Real-time streaming",       zh: "即時串流（低延遲）" }, values: { vv: true, oai: true, el: true, f5: false, xtts: false, spark: false, cosy: true } },
      { label: { en: "Zero-shot voice clone",     zh: "零樣本聲音複製" },     values: { vv: { en: "via ref", zh: "參考音" }, oai: false, el: true, f5: true, xtts: true, spark: true, cosy: true } },
      { label: { en: "Language breadth",          zh: "語言廣度" },           values: { vv: { en: "EN / ZH", zh: "英 / 中" }, oai: { en: "50+", zh: "50+" }, el: { en: "Multi", zh: "多語" }, f5: { en: "EN / ZH", zh: "英 / 中" }, xtts: { en: "17", zh: "17 種" }, spark: { en: "EN / ZH", zh: "英 / 中" }, cosy: { en: "Multi", zh: "多語" } } },
      { label: { en: "Self-host / local",         zh: "自架 / 本地部署" },     values: { vv: true, oai: false, el: false, f5: true, xtts: true, spark: true, cosy: true } },
      { label: { en: "Open license",              zh: "開源授權" },           values: { vv: { en: "MIT", zh: "MIT" }, oai: false, el: false, f5: { en: "Open", zh: "開源" }, xtts: { en: "Non-commercial", zh: "非商用" }, spark: { en: "Open", zh: "開源" }, cosy: { en: "Apache-2.0", zh: "Apache-2.0" } } },
      { label: { en: "Top single-utterance",      zh: "頂尖單句音質" },       values: { vv: { en: "Great", zh: "很好" }, oai: true, el: true, f5: true, xtts: false, spark: { en: "Good", zh: "不錯" }, cosy: true } },
      { label: { en: "Commercial-ready",          zh: "開箱即可商用" },       values: { vv: { en: "Research", zh: "研究用" }, oai: true, el: true, f5: { en: "DIY", zh: "自評" }, xtts: false, spark: { en: "DIY", zh: "自評" }, cosy: true } }
    ]
  },

  /* ===================== 5a. COMPARE — ASR (comparison) ===================== */
  {
    slug: "compare-asr", layout: "comparison", icon: "hearing",
    title: { en: "ASR comparison", zh: "語音辨識對比" },
    subtitle: {
      en: "VibeVoice-ASR next to FunASR and Whisper — open-source speech-to-text, side by side. Updated for the streaming and CPU builds.",
      zh: "VibeVoice-ASR 與 FunASR、Whisper 的並列比較——開源語音辨識並排看。已納入串流版與 CPU 版。"
    },
    plans: [
      { key: "vv",      name: { en: "VibeVoice-ASR",    zh: "VibeVoice-ASR" },    price: { en: "7B", zh: "7B" }, highlight: true, note: { en: "long-form", zh: "長音訊" } },
      { key: "funasr",  name: { en: "FunASR",           zh: "FunASR" },           price: { en: "open", zh: "開源" }, note: { en: "Alibaba", zh: "Alibaba" } },
      { key: "whisper", name: { en: "Whisper",          zh: "Whisper" },          price: { en: "open", zh: "開源" }, note: { en: "OpenAI · open", zh: "OpenAI 開源" } },
      { key: "oai",     name: { en: "gpt-4o-transcribe", zh: "gpt-4o-transcribe" }, price: { en: "API", zh: "API" }, note: { en: "OpenAI · API", zh: "OpenAI · API" } }
    ],
    features: [
      { label: { en: "Open license",            zh: "開源授權" },     values: { vv: { en: "MIT", zh: "MIT" }, funasr: { en: "MIT", zh: "MIT" }, whisper: { en: "MIT", zh: "MIT" }, oai: { en: "Proprietary", zh: "閉源" } } },
      { label: { en: "Long-form single pass",   zh: "單次長音訊" },   values: { vv: { en: "60 min", zh: "60 分鐘" }, funasr: true, whisper: { en: "chunked", zh: "分段處理" }, oai: { en: "chunked", zh: "分段處理" } } },
      { label: { en: "Speaker diarization",     zh: "語者標註" },     values: { vv: true, funasr: true, whisper: false, oai: false } },
      { label: { en: "Timestamps",              zh: "時間戳" },       values: { vv: true, funasr: true, whisper: true, oai: { en: "limited", zh: "部分" } } },
      { label: { en: "Streaming / real-time",   zh: "串流 / 即時" },  values: { vv: { en: "since Sep 2026", zh: "2026/09 起支援" }, funasr: true, whisper: false, oai: true } },
      { label: { en: "Runs on CPU (no GPU)",    zh: "純 CPU（免 GPU）" }, values: { vv: { en: "BitNet build", zh: "BitNet 版" }, funasr: true, whisper: { en: "whisper.cpp", zh: "whisper.cpp" }, oai: false } },
      { label: { en: "Languages",               zh: "語言" },         values: { vv: { en: "50+ (10 streaming)", zh: "50+（串流 10）" }, funasr: { en: "50+", zh: "50+" }, whisper: { en: "~99", zh: "~99" }, oai: { en: "Multi", zh: "多語" } } },
      { label: { en: "Speed",                   zh: "速度" },         values: { vv: { en: "60-min pass", zh: "單次 60 分" }, funasr: { en: "up to 170x", zh: "最高 170x" }, whisper: { en: "baseline", zh: "基準" }, oai: { en: "high accuracy", zh: "高準確率" } } },
      { label: { en: "Self-host / local",       zh: "自架 / 本地部署" }, values: { vv: true, funasr: true, whisper: true, oai: false } }
    ]
  },

  /* ===================== 5a-2. COMPARE — REALTIME (comparison) ===================== */
  {
    slug: "compare-realtime", layout: "comparison", icon: "voice_chat",
    title: { en: "Realtime voice", zh: "即時語音對比" },
    subtitle: {
      en: "Low-latency streaming voice — VibeVoice-Realtime next to OpenAI's latest realtime model and CosyVoice 2.",
      zh: "低延遲串流語音——VibeVoice-Realtime 對比 OpenAI 最新即時模型與 CosyVoice 2。"
    },
    plans: [
      { key: "vv",   name: { en: "VibeVoice-Realtime", zh: "VibeVoice-Realtime" }, price: { en: "0.5B", zh: "0.5B" }, highlight: true, note: { en: "open · self-host", zh: "開源・可自架" } },
      { key: "oai",  name: { en: "GPT-Realtime-2",     zh: "GPT-Realtime-2" },     price: { en: "API", zh: "API" },   note: { en: "OpenAI · 2026", zh: "OpenAI · 2026" } },
      { key: "cosy", name: { en: "CosyVoice 2",        zh: "CosyVoice 2" },        price: { en: "Apache-2.0", zh: "Apache-2.0" }, note: { en: "Alibaba", zh: "Alibaba" } }
    ],
    features: [
      { label: { en: "Type", zh: "類型" }, values: { vv: { en: "streaming TTS", zh: "串流 TTS" }, oai: { en: "speech-to-speech", zh: "語音對語音" }, cosy: { en: "streaming TTS", zh: "串流 TTS" } } },
      { label: { en: "First-audio latency", zh: "首字延遲" }, values: { vv: { en: "~300 ms", zh: "~300 毫秒" }, oai: { en: "low", zh: "低延遲" }, cosy: { en: "~150 ms", zh: "~150 毫秒" } } },
      { label: { en: "Streaming input", zh: "串流輸入" }, values: { vv: true, oai: true, cosy: true } },
      { label: { en: "Reasoning / dialogue", zh: "推理 / 對話智慧" }, values: { vv: false, oai: true, cosy: false } },
      { label: { en: "Live translation", zh: "即時翻譯" }, values: { vv: false, oai: true, cosy: false } },
      { label: { en: "Open / self-host", zh: "開源 / 可自架" }, values: { vv: true, oai: false, cosy: true } },
      { label: { en: "License", zh: "授權" }, values: { vv: { en: "MIT", zh: "MIT" }, oai: { en: "Proprietary", zh: "閉源" }, cosy: { en: "Apache-2.0", zh: "Apache-2.0" } } },
      { label: { en: "Context window", zh: "脈絡長度" }, values: { vv: { en: "8K", zh: "8K" }, oai: { en: "128K", zh: "128K" }, cosy: { en: "—", zh: "—" } } }
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
        tags: [{ en: "Long-form", zh: "長語音" }, "Slator", { en: "Praise", zh: "好評" }],
        overview: {
          en: "Industry and review coverage (e.g. Slator, AllAboutAI) frames VibeVoice as moving long-form, multi-speaker speech from short-clip 'gimmicks' to genuinely usable long dialogue — best suited to audiobooks and podcasts. Source: Slator / AllAboutAI.",
          zh: "產業與評測報導（如 Slator、AllAboutAI）認為 VibeVoice 把長篇、多語者語音從「短秒數的玩具」推進到可實用的長對話，最適合有聲書與 Podcast。來源：Slator / AllAboutAI。"
        }
      },
      {
        slug: "rev-opensource", category: "praise",
        title: { en: "Open, free, self-hostable", zh: "開源、免費、可自架" },
        summary: { en: "Praised for MIT licensing and avoiding subscription/privacy concerns.", zh: "普遍讚賞 MIT 開源、可自架，免去訂閱與隱私疑慮。" },
        tags: [{ en: "Open source", zh: "開源" }, { en: "Cost", zh: "成本" }, { en: "Praise", zh: "好評" }],
        overview: {
          en: "A recurring positive across reviews: the MIT-licensed, self-hostable model removes ElevenLabs-style subscription costs and data-privacy worries, which reviewers weigh heavily for teams shipping a lot of audio. Source: AllAboutAI / Medium.",
          zh: "評論中反覆出現的優點：MIT 授權、可自架，免去 ElevenLabs 式的訂閱成本與資料隱私顧慮——對需要大量產出音訊的團隊特別加分。來源：AllAboutAI / Medium。"
        }
      },
      {
        slug: "rev-consistency", category: "praise",
        title: { en: "Speaker consistency & naturalness", zh: "語者一致性與自然度" },
        summary: { en: "HN community credits its voice consistency and conversational naturalness.", zh: "Hacker News 社群肯定其音色一致性與對話自然度。" },
        tags: ["Hacker News", { en: "Naturalness", zh: "自然度" }, { en: "Praise", zh: "好評" }],
        overview: {
          en: "On Hacker News the general sentiment is positive: commenters highlight high audio fidelity, speaker consistency across long passages, and natural-sounding conversation as a clear leap for open-source audio AI. Source: Hacker News discussion.",
          zh: "在 Hacker News，整體風向偏正面：留言者點出高音訊保真度、長段落的語者一致性，以及自然的對話感，認為是開源語音 AI 的明顯躍進。來源：Hacker News 討論串。"
        }
      },
      {
        slug: "rev-expressive", category: "praise",
        title: { en: "67% rate expressiveness higher", zh: "67% 認為表現力更佳" },
        summary: { en: "An AllAboutAI survey: 67% of technical users rate it above Chatterbox-TTS.", zh: "AllAboutAI 調查：67% 技術使用者認為其表現力優於 Chatterbox-TTS。" },
        tags: ["AllAboutAI", { en: "Expressiveness", zh: "表現力" }],
        overview: {
          en: "AllAboutAI reports that 67% of surveyed technical users rate VibeVoice's expressiveness as superior to alternatives such as Chatterbox-TTS, and gives it 4/5 overall — strong on open-source long-form audio, weaker on real-time and broad language coverage. Source: AllAboutAI review.",
          zh: "AllAboutAI 指出，受訪技術使用者中有 67% 認為 VibeVoice 的表現力優於 Chatterbox-TTS 等替代方案，整體給 4/5——長篇開源音訊是強項，即時性與語言廣度較弱。來源：AllAboutAI 評測。"
        }
      },
      {
        slug: "rev-intonation", category: "critique",
        title: { en: "Intonation still slips", zh: "語調仍有破綻" },
        summary: { en: "An HN user: intonation is off on nearly every phrase, with robotic modulation.", zh: "HN 有使用者指出幾乎每句語調都怪，帶機械感的調變。" },
        tags: ["Hacker News", { en: "Intonation", zh: "語調" }, { en: "Criticism", zh: "批評" }],
        overview: {
          en: "Not everyone is sold: one Hacker News commenter said the voices are decent but the intonation is off on almost every phrase, with a clearly robotic-sounding modulation. A useful reminder that prosody isn't fully solved. Source: Hacker News discussion.",
          zh: "並非一面倒：一位 Hacker News 留言者表示音色尚可，但幾乎每一句的語調都不對，帶有明顯機械感的調變。提醒了韻律仍未完全攻克。來源：Hacker News 討論串。"
        }
      },
      {
        slug: "rev-uninspiring", category: "critique",
        title: { en: "Impressive, but not by today's bar", zh: "驚艷，但以今日標準略平" },
        summary: { en: "Some find it impressive vs years ago, yet uninspiring by current standards.", zh: "有人認為相較數年前驚艷，但以今日標準仍嫌不夠出彩。" },
        tags: ["Hacker News", { en: "Criticism", zh: "批評" }],
        overview: {
          en: "Another HN take: very impressive compared to TTS from a few years ago, but for today's frontier it felt uninspiring. Expectations have moved fast, and open weights invite head-to-head scrutiny with the best proprietary systems. Source: Hacker News discussion.",
          zh: "另一則 HN 看法：相較數年前的 TTS 非常驚艷，但放到今天的前沿則覺得不夠出彩。期待值上升得很快，且開源權重也讓它直接被拿來和最強的閉源系統比較。來源：Hacker News 討論串。"
        }
      },
      {
        slug: "rev-limits", category: "critique",
        title: { en: "Language & feature limits", zh: "語言與功能限制" },
        summary: { en: "Reviews agree: EN/ZH-first, no overlapping speech, music or sound effects.", zh: "評測一致指出：英/中為主，無法處理重疊發話、背景音樂或音效。" },
        tags: [{ en: "Limits", zh: "限制" }, { en: "Languages", zh: "語言" }, { en: "Criticism", zh: "批評" }],
        overview: {
          en: "A consistent critique across reviews: VibeVoice is limited to English and Chinese for best quality and cannot handle overlapping speech, background noise, music or sound effects — and the original release leaned on offline batch rather than real-time use. Source: AllAboutAI / Slator.",
          zh: "評測中一致的批評：VibeVoice 以英文、中文品質最佳，且無法處理重疊發話、背景雜音、音樂或音效；早期版本偏離線批次而非即時使用。來源：AllAboutAI / Slator。"
        }
      },
      {
        slug: "rev-newmodels", category: "critique",
        title: { en: "The 2026 models arrived quietly", zh: "2026 年的新版本靜悄悄上線" },
        summary: { en: "Streaming ASR shipped with no launch post and, so far, no independent benchmarks.", zh: "串流版 ASR 沒有發布文，目前也還沒有第三方評測。" },
        tags: [{ en: "Streaming", zh: "串流" }, { en: "Benchmarks", zh: "評測" }, { en: "Criticism", zh: "批評" }],
        overview: {
          en: "The streaming checkpoints went up on Hugging Face on 2 September 2026 with little fanfare — the 7B first, the 1.5B five minutes later — and commentary since has focused on what is missing rather than what was claimed: no WER figures anyone outside Microsoft has reproduced, and model-card performance charts published as images rather than numbers. The technical report's claims are strong, but they are the authors' own. Worth testing on your own audio before committing. Source: independent write-ups following the release.",
          zh: "串流版權重在 2026 年 9 月 2 日悄悄上傳到 Hugging Face——先是 7B，五分鐘後是 1.5B——幾乎沒有宣傳。之後的討論多半聚焦在「缺什麼」而非「宣稱了什麼」：沒有微軟以外的人重現過的 WER 數字，模型卡上的效能圖表也是圖片而非可查核的數值。技術報告的宣稱很強，但那終究是作者自己的數據。正式採用前，建議先用自己的音訊實測。來源：發布後的獨立分析文章。"
        }
      },
      {
        slug: "rev-bench", category: "vs",
        title: { en: "MOS 4.5 — tops the benchmarks", zh: "MOS 4.5，評測居首" },
        summary: { en: "Per MS's report, the 7B model's MOS beat ElevenLabs v3 and Gemini TTS.", zh: "據微軟技術報告，7B 版 MOS 勝過 ElevenLabs v3 與 Gemini TTS。" },
        tags: [{ en: "Benchmarks", zh: "評測" }, "MOS", { en: "vs others", zh: "對比" }],
        overview: {
          en: "Microsoft's technical report puts the larger VibeVoice (7B) at a Mean Opinion Score of 4.5±0.1 — the highest in their comparison, ahead of ElevenLabs Eleven-V3 (Alpha) and Google Gemini-2.5-Pro-Preview-TTS, with realism (~3.71) approaching human-level. These are the authors' own benchmarks, so read them alongside independent listening. Source: Microsoft technical report (via AllAboutAI / Slator).",
          zh: "微軟技術報告指出較大的 VibeVoice（7B）平均意見分數（MOS）達 4.5±0.1，為其比較中最高，領先 ElevenLabs Eleven-V3（Alpha）與 Google Gemini-2.5-Pro-Preview-TTS，真實度（約 3.71）接近人類水準。這是作者自家評測，宜與獨立聽測一起參考。來源：微軟技術報告（經 AllAboutAI / Slator 引述）。"
        }
      },
      {
        slug: "rev-vs-eleven", category: "vs",
        title: { en: "vs ElevenLabs", zh: "對比 ElevenLabs" },
        summary: { en: "Wins on long-form and cost; ElevenLabs still leads on polish and languages.", zh: "長篇與成本勝出；ElevenLabs 的精緻度與語言廣度仍領先。" },
        tags: ["ElevenLabs", { en: "vs others", zh: "對比" }],
        overview: {
          en: "The common comparison: VibeVoice wins on long-form multi-speaker output and cost (free, self-hosted), while ElevenLabs still edges ahead on single-clip polish, emotion control and breadth of languages. Pick by workload, not by a single 'best'. Source: review aggregators.",
          zh: "常見的對比：VibeVoice 在長篇多語者輸出與成本（免費、自架）勝出；ElevenLabs 在單段精緻度、情緒控制與語言廣度仍略勝。應依工作負載挑選，而非追求單一「最佳」。來源：各評測彙整。"
        }
      },
      {
        slug: "rev-vs-f5", category: "vs",
        title: { en: "vs F5-TTS / XTTS", zh: "對比 F5-TTS / XTTS" },
        summary: { en: "Better long-dialogue consistency; F5 still praised for single-utterance quality.", zh: "長對話一致性更好；F5 的單句音質仍受稱讚。" },
        tags: ["F5-TTS", "XTTS", { en: "vs others", zh: "對比" }],
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
      en: "Long-form, multi-speaker synthesis unlocks workflows that single-utterance TTS struggles with — and the 2026 recognition builds add live and on-device ones.",
      zh: "長篇、多語者合成解鎖了單句 TTS 難以勝任的工作流——2026 年的辨識版本再補上即時與裝置端的應用。"
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
        body: { en: "Keep up to 4 voices consistent inside one model.", zh: "在單一模型內維持最多 4 位語者音色一致。" } },
      { size: "md", icon: "closed_caption",
        title: { en: "Live captions & meeting notes", zh: "即時字幕與會議記錄" },
        body: { en: "Streaming ASR labels who is speaking as the meeting happens — no waiting for the recording to end.",
                zh: "串流版 ASR 在會議進行中就標出誰在說話，不必等錄音結束。" } },
      { size: "sm", icon: "memory",
        title: { en: "On-device & offline", zh: "裝置端離線處理" },
        body: { en: "The 1.58 GB CPU build keeps sensitive audio on the machine.", zh: "1.58 GB 的 CPU 版讓敏感音訊留在本機。" } }
    ]
  },

  /* ===================== 7. TIMELINE ===================== */
  {
    slug: "timeline", layout: "timeline", icon: "timeline",
    title: { en: "Development timeline", zh: "發展時間軸" },
    subtitle: {
      en: "From the first TTS release to streaming, speaker-attributed recognition — and a build that runs on a CPU.",
      zh: "從首次 TTS 發表，到帶語者標註的串流辨識——以及一個純 CPU 就跑得動的版本。"
    },
    events: [
      { date: { en: "25 Aug 2025", zh: "2025 年 8 月 25 日" },
        title: { en: "TTS open-sourced", zh: "TTS 開源發表" },
        body: { en: "VibeVoice-TTS debuts: up to 90 minutes and 4 distinct speakers in one pass. The work is later accepted as an ICLR 2026 Oral.",
                zh: "VibeVoice-TTS 首次亮相：單次最長 90 分鐘、最多 4 位語者。此研究後獲 ICLR 2026 Oral 接受。" } },
      { date: { en: "5 Sep 2025", zh: "2025 年 9 月 5 日" },
        title: { en: "TTS code removed", zh: "TTS 程式碼下架" },
        body: { en: "After finding uses inconsistent with the stated intent, Microsoft pulls the TTS code from the repository. The weights remain on Hugging Face.",
                zh: "微軟發現有違背原始用途的使用方式後，將 TTS 程式碼自 repo 移除。模型權重仍保留在 Hugging Face。" } },
      { date: { en: "3 Dec 2025", zh: "2025 年 12 月 3 日" },
        title: { en: "Realtime-0.5B open-sourced", zh: "Realtime-0.5B 開源" },
        body: { en: "A real-time text-to-speech model that takes streaming text input and still holds together over long passages.",
                zh: "即時語音合成模型發表，可接收串流文字輸入，長段落生成依然穩定。" } },
      { date: { en: "16 Dec 2025", zh: "2025 年 12 月 16 日" },
        title: { en: "More Realtime voices", zh: "Realtime 語者擴充" },
        body: { en: "An experimental speaker pack adds nine multilingual voices (DE, FR, IT, JP, KR, NL, PL, PT, ES) and 11 English style voices.",
                zh: "實驗性語者包加入九種語言的多語音色（德、法、義、日、韓、荷、波、葡、西）與 11 種英文風格音色。" } },
      { date: { en: "21 Jan 2026", zh: "2026 年 1 月 21 日" },
        title: { en: "ASR open-sourced", zh: "ASR 開源發表" },
        body: { en: "A unified speech-to-text model: 60 minutes in a single pass, structured into who, when and what, across 50+ languages. Fine-tuning code and vLLM inference follow.",
                zh: "統一的語音辨識模型發表：單次 60 分鐘，結構化輸出「誰、何時、說了什麼」，支援 50+ 種語言。隨後再補上 finetune 程式碼與 vLLM 推論。" } },
      { date: { en: "6 Mar 2026", zh: "2026 年 3 月 6 日" },
        title: { en: "ASR in Transformers", zh: "ASR 併入 Transformers" },
        body: { en: "VibeVoice-ASR ships as part of a Hugging Face Transformers release, so it can be called like any other model.",
                zh: "VibeVoice-ASR 隨 Hugging Face Transformers 發布，可像其他模型一樣直接呼叫。" } },
      { date: { en: "12 Mar 2026", zh: "2026 年 3 月 12 日" },
        title: { en: "ASR in Azure AI Foundry Labs", zh: "ASR 進入 Azure AI Foundry Labs" },
        body: { en: "The model becomes explorable and testable through Microsoft Foundry, without a local setup.",
                zh: "模型進入 Microsoft Foundry，不必自行架設就能探索與測試。" } },
      { date: { en: "23 Jul 2026", zh: "2026 年 7 月 23 日" },
        title: { en: "ASR-BitNet — off the GPU", zh: "ASR-BitNet 擺脫 GPU" },
        body: { en: "Heterogeneous quantization compresses ASR from 4.62 GB to 1.58 GB, hitting a real-time factor under 1 on three CPU threads. Shipped with the VibeASR.cpp inference engine.",
                zh: "異質量化把 ASR 從 4.62 GB 壓到 1.58 GB，三條 CPU 執行緒即可達到實時因子小於 1。隨附 VibeASR.cpp 推論引擎。" } },
      { date: { en: "3 Sep 2026", zh: "2026 年 9 月 3 日" },
        title: { en: "ASR-Streaming released", zh: "ASR-Streaming 發表" },
        body: { en: "The newest member: 1.5B and 7B models that transcribe who said what while the audio is still arriving, with hotwords and 10 languages.",
                zh: "家族最新成員：1.5B 與 7B 兩種尺寸，音訊還在進來時就邊聽邊轉寫「誰說了什麼」，支援 hotword 與 10 種語言。" } }
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
        a: { en: "It depends on the model. For TTS, English and Chinese are the most reliable and other languages are less stable. Offline ASR is natively multilingual across 50+ languages, but the streaming ASR build narrows that to 10 (ZH, EN, FR, DE, IT, JA, KO, PT, RU, ES). Realtime ships multilingual voices (DE, FR, IT, JP, KR, NL, PL, PT, ES) plus 11 English style voices.",
             zh: "依模型而定。TTS 以英文、中文最穩定，其他語言較不穩。離線版 ASR 原生支援 50+ 種語言，但串流版收斂到 10 種（中、英、法、德、義、日、韓、葡、俄、西）。Realtime 則內建多語語音（德、法、義、日、韓、荷、波、葡、西）與 11 種英文風格音色。" } },
      { q: { en: "Is there a misuse safeguard?", zh: "有防濫用機制嗎？" },
        a: { en: "Yes — the model incorporates imperceptible watermarking to flag AI generation and encourages audible disclaimers. You should always disclose AI-generated audio.",
             zh: "有——模型內建不可察覺的浮水印以標記 AI 生成，並鼓勵加上可聽見的聲明。使用時都應主動揭露音訊為 AI 生成。" } },
      { q: { en: "What hardware do I need?", zh: "硬體需求是什麼？" },
        a: { en: "For TTS, the 1.5B model runs on an RTX 4070 Ti (12 GB) in BF16; full quality peaks around 14 GB VRAM. A 90-minute synthesis takes roughly 8–12 minutes on an A100 40 GB, with a real-time factor near 0.1×. For recognition you no longer need a GPU at all: the BitNet build is 1.58 GB and reaches a real-time factor under 1 on three CPU threads.",
             zh: "TTS 方面，1.5B 模型可在 RTX 4070 Ti（12GB）以 BF16 執行；全品質峰值約 14GB VRAM。在 A100 40GB 上，90 分鐘合成約需 8–12 分鐘，實時因子（RTF）約 0.1×。辨識則已經不一定需要 GPU：BitNet 版只有 1.58 GB，三條 CPU 執行緒就能達到實時因子小於 1。" } },
      { q: { en: "Can it transcribe live, while someone is still talking?", zh: "可以邊講邊轉寫嗎？" },
        a: { en: "Yes, since September 2026. VibeVoice-ASR-Streaming (1.5B and 7B) emits speaker-attributed text once per audio chunk instead of waiting for the recording to end. Read the cadence honestly though: the shipped checkpoints use a ~2.9 second chunk with ~0.5 seconds of lookahead, so it is a live transcript rather than an instant one.",
             zh: "可以，2026 年 9 月起支援。VibeVoice-ASR-Streaming（1.5B 與 7B）每收到一個音訊區塊就吐出一段帶語者標註的文字，不必等錄音結束。不過節奏要老實看待：官方權重採用約 2.9 秒的區塊搭配約 0.5 秒前瞻，所以它是即時逐字稿，而非零延遲。" } },
      { q: { en: "Are there independent benchmarks for the new models?", zh: "新模型有第三方評測嗎？" },
        a: { en: "Not yet for the streaming build. Microsoft's own technical report puts the 7B streaming model at the lowest average WER/CER across five evaluation sets and best or tied-best on 12 of 13 speaker-attribution settings — but those are the authors' numbers. Treat them as a starting point and test on your own audio.",
             zh: "串流版目前還沒有。微軟自家技術報告指出 7B 串流模型在五組評測集上的平均 WER/CER 最低，並在 13 項語者標註設定中的 12 項取得最佳或並列最佳——但那是作者自己的數據。建議當成起點，用自己的音訊實測。" } },
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

  /* ===================== 8b. COMMUNITY (ecosystem & safety, gallery) ===================== */
  {
    slug: "community", layout: "gallery", icon: "extension",
    title: { en: "Community builds & safety", zh: "社群生態與安全" },
    subtitle: {
      en: "People have wrapped VibeVoice into ComfyUI nodes, desktop apps, API servers and native ports. Here is what exists — and what to check before you run any of it. Signals captured September 2026; tap a card for the detail and the repo link.",
      zh: "社群把 VibeVoice 包成了 ComfyUI 節點、桌面應用、API 伺服器與原生移植。這裡整理有哪些，以及在你執行它們之前該確認什麼。數據擷取於 2026 年 9 月；點卡片看細節與 repo 連結。"
    },
    categories: [
      { key: "guide",   en: "Read first",   zh: "先讀這個" },
      { key: "source",  en: "Source rescue", zh: "原始碼保存" },
      { key: "comfyui", en: "ComfyUI",      zh: "ComfyUI 節點" },
      { key: "app",     en: "Apps & WebUI", zh: "應用 / WebUI" },
      { key: "server",  en: "API servers",  zh: "API 伺服器" },
      { key: "port",    en: "Native ports", zh: "原生移植" }
    ],
    items: [
      /* ---------- the safety frame ---------- */
      {
        slug: "how-to-read", category: "guide",
        title: { en: "How to read this page", zh: "這頁該怎麼讀" },
        summary: {
          en: "These are observable signals, not an audit. Nothing here is an endorsement.",
          zh: "這裡列的是可查證的訊號，不是稽核結果。任何一項都不構成背書。"
        },
        tags: [{ en: "Method", zh: "方法" }, { en: "Sep 2026", zh: "2026 / 09" }],
        overview: {
          en: "What was checked for every project below: the licence, when it was last pushed, how many people use it, where its README tells the software to fetch model weights from, and whether those weights are safetensors or a pickle format. What was NOT checked: nobody read the source code, ran the software, or verified that any weight file is really what it claims to be. A popular, recently-updated, MIT-licensed repo can still ship something harmful — popularity is a weak signal, not a guarantee. Treat every entry as a starting point for your own review, and weigh it against what you would lose if the machine running it were compromised.",
          zh: "以下每個專案都查了這些：授權條款、最後推送時間、使用規模、README 指示軟體去哪裡抓模型權重，以及那些權重是 safetensors 還是 pickle 類格式。沒有查的是：沒有人讀過原始碼、沒有實際執行過，也沒有驗證任何權重檔真的是它宣稱的東西。一個熱門、近期更新、掛著 MIT 的 repo，仍然可能夾帶有害的東西——熱門度是弱訊號，不是保證。請把每一則都當成你自己審查的起點，並衡量萬一執行它的那台機器被入侵，你會損失什麼。"
        }
      },
      {
        slug: "risk-installers", category: "guide",
        title: { en: "The real risk is the installer, not the model", zh: "真正的風險在安裝腳本，不在模型" },
        summary: {
          en: "A ComfyUI custom node is arbitrary Python running with your user's permissions. That vector has been abused for real.",
          zh: "ComfyUI 自訂節點就是以你的權限執行的任意 Python。這個管道已經被真實濫用過。"
        },
        tags: [{ en: "Arbitrary code", zh: "任意程式碼" }, "ComfyUI", { en: "High risk", zh: "高風險" }],
        overview: {
          en: "It is tempting to worry about the AI model and relax about the wrapper. That is backwards. Model weights in safetensors format cannot execute code when loaded; a custom node's install script can do anything your user account can. The ComfyUI ecosystem has seen this abused repeatedly: the ComfyUI_LLMVISION node harvested browser passwords and credit-card details, an 'Upscaler_4K' node in the official registry delivered the Akira infostealer, and in 2026 over a thousand internet-exposed ComfyUI instances were enrolled into a cryptomining botnet through nodes that accept and run Python. None of that is specific to VibeVoice — it is the cost of the plugin model. Practical mitigations: install from the author's own repo rather than a re-upload, read requirements.txt and any install.py before running, prefer a container or a machine you can wipe, and never expose ComfyUI to the internet without authentication.",
          zh: "人們很容易擔心 AI 模型本身，卻對外面那層包裝鬆懈。這是反過來的。safetensors 格式的權重在載入時無法執行程式碼；而自訂節點的安裝腳本，能做你的使用者帳號能做的任何事。ComfyUI 生態已經反覆被利用：ComfyUI_LLMVISION 節點竊取瀏覽器密碼與信用卡資料；官方 registry 上一個名為 Upscaler_4K 的節點散布 Akira 資訊竊取程式；2026 年更有超過一千台暴露在網際網路上的 ComfyUI 實例，透過會接收並執行 Python 的節點被納入挖礦殭屍網路。這些都不是 VibeVoice 特有的問題——這是外掛模式本身的代價。實務上的緩解：從作者本人的 repo 安裝而非別人的轉傳、執行前先讀過 requirements.txt 與任何 install.py、優先用容器或一台你隨時能重灌的機器，以及絕對不要把沒有驗證的 ComfyUI 對外開放。"
        }
      },
      {
        slug: "risk-7b-weights", category: "guide",
        title: { en: "Your \"7B / Large\" weights are not Microsoft's", zh: "你用的「7B / Large」不是微軟發布的" },
        summary: {
          en: "Microsoft never published a 7B TTS checkpoint. Every popular wrapper pulls it from a third-party re-upload.",
          zh: "微軟從未發布 7B 的 TTS 權重。所有熱門包裝都是去第三方轉傳處抓的。"
        },
        tags: [{ en: "Provenance", zh: "來源" }, "7B", { en: "Unverified", zh: "無法驗證" }],
        overview: {
          en: "Microsoft's Hugging Face org publishes exactly these VibeVoice checkpoints: TTS-1.5B, Realtime-0.5B, the ASR family (ASR, ASR-HF, ASR-BitNet, ASR-Streaming 1.5B and 7B) and the acoustic tokenizer. There is no microsoft/VibeVoice-7B for text-to-speech — the larger TTS model appears in the paper's benchmarks but was never left up for download. Yet the wrappers that offer you a 'Large' or '7B' voice all fetch it from somewhere else: vibevoice/VibeVoice-7B (~36k downloads), aoi-ot/VibeVoice-Large, FabioSarracino/VibeVoice-Large-Q8, zhaokun/vibevoice-large. The reassuring part: every one of those mirrors ships safetensors with no pickle files, so loading them cannot execute code. The unresolved part: nobody outside those uploaders can confirm the weights are unmodified Microsoft originals, and a fine-tuned or tampered model would look identical from the outside. If provenance matters to your use case, stay on the 1.5B checkpoint that Microsoft actually hosts.",
          zh: "微軟的 Hugging Face 帳號上，VibeVoice 系列的權重就是這些：TTS-1.5B、Realtime-0.5B、ASR 家族（ASR、ASR-HF、ASR-BitNet、ASR-Streaming 的 1.5B 與 7B）與聲學 tokenizer。**沒有** 給語音合成用的 microsoft/VibeVoice-7B——較大的 TTS 模型出現在論文的評測裡，但從未留在網路上供人下載。然而所有提供「Large」或「7B」音色的包裝，都是去別處抓的：vibevoice/VibeVoice-7B（約 3.6 萬次下載）、aoi-ot/VibeVoice-Large、FabioSarracino/VibeVoice-Large-Q8、zhaokun/vibevoice-large。可以放心的部分：這些鏡像全都是 safetensors、沒有任何 pickle 檔，載入時無法執行程式碼。無解的部分：除了上傳者本人，沒有人能確認那些權重是未經修改的微軟原版，而一個被微調過或動過手腳的模型，從外面看起來一模一樣。如果來源可信度對你的用途很重要，就留在微軟真的有在託管的 1.5B。"
        }
      },
      {
        slug: "risk-disclosure", category: "guide",
        title: { en: "Watermarking, disclosure, and the licence", zh: "浮水印、揭露，以及授權" },
        summary: {
          en: "MIT lets anyone fork it — including past the safeguards. Your obligations do not fork away with it.",
          zh: "MIT 讓任何人都能 fork——包括繞過防護。但你的義務不會跟著 fork 消失。"
        },
        tags: [{ en: "Responsible AI", zh: "負責任 AI" }, "MIT", { en: "Disclosure", zh: "揭露" }],
        overview: {
          en: "Microsoft pulled the TTS code in September 2025 after finding uses inconsistent with its stated intent. Because everything was released under MIT, the community forks that preserve it are entirely legal and cannot be taken down — the licence is why the model survived, and also why the removal changed very little in practice. What that does not do is transfer the responsibility elsewhere. The official model embeds imperceptible watermarking to mark audio as AI-generated and the documentation asks for an audible disclaimer too; a fork is free to strip either, and you have no way to tell from the outside whether a given build still does it. So verify it yourself if it matters, disclose AI-generated audio regardless, and remember the upstream guidance still stands: this is research code, not something the maintainers recommend deploying commercially without further safety and quality testing.",
          zh: "微軟在 2025 年 9 月發現有違背原始用途的使用方式後撤下 TTS 程式碼。由於所有東西都以 MIT 釋出，社群保存它的那些 fork 完全合法、也無從下架——授權正是這個模型得以存活的原因，也是撤下在實務上幾乎沒改變什麼的原因。但這並不代表責任跟著轉移出去。官方模型內建了不可察覺的浮水印來標記 AI 生成，文件也建議加上可聽見的聲明；fork 想拿掉哪一項都可以，而你從外面無法判斷某個版本是否還保留著。所以真的在意就自己驗證，無論如何都要揭露音訊為 AI 生成，並記得上游的定位始終沒變：這是研究用程式碼，維護者並不建議未經進一步的安全與品質測試就投入商業部署。"
        }
      },
      {
        slug: "vibevoice-community", category: "source",
        title: { en: "vibevoice-community/VibeVoice", zh: "vibevoice-community/VibeVoice" },
        summary: {
          en: "The fork that kept the pulled TTS code alive — 1.6k stars, 739 forks, still maintained.",
          zh: "把被下架的 TTS 程式碼接住的 fork——1.6k star、739 fork，仍在維護。"
        },
        tags: ["★ 1.6k", "MIT", "2026 / 08", { en: "de-facto upstream", zh: "事實上的上游" }],
        overview: {
          en: "When Microsoft removed the TTS code in September 2025, this fork picked it up within days and became the reference the rest of the ecosystem builds against. It is MIT, actively pushed to as of August 2026, and carries the largest fork count in the ecosystem. It also adds unofficial training and fine-tuning code that never existed upstream. Its README points at Microsoft's own 1.5B and Realtime-0.5B checkpoints, but also at community 7B re-uploads — see the provenance card above before pulling those. Being the most-used fork makes it the most-reviewed one, which helps; it does not make it audited.",
          zh: "微軟在 2025 年 9 月移除 TTS 程式碼後，這個 fork 在幾天內接手，成為整個生態其他專案對照的基準。採 MIT 授權，2026 年 8 月仍有推送，fork 數是生態中最高的。它另外補上了上游從未有過的非官方訓練與微調程式碼。README 指向微軟自家的 1.5B 與 Realtime-0.5B，但同時也指向社群轉傳的 7B——抓那些之前請先看上面那張來源卡。身為最多人用的 fork，代表被看過的眼睛也最多，這是加分；但那不等於它被稽核過。"
        },
        url: "https://github.com/vibevoice-community/VibeVoice"
      },
      {
        slug: "shijincai-archive", category: "source",
        title: { en: "shijincai/VibeVoice", zh: "shijincai/VibeVoice" },
        summary: {
          en: "A same-day snapshot of the official repo taken when Microsoft pulled it. Frozen since.",
          zh: "微軟下架當天做的官方 repo 快照。此後就凍結了。"
        },
        tags: ["★ 45", "MIT", "2025 / 09", { en: "frozen", zh: "已凍結" }],
        overview: {
          en: "Created on 5 September 2025 — the exact day the official code came down — as a straight archive of the repository. It has not been touched since, which is the point: it is a historical snapshot rather than a maintained project. Useful if you want to see what the original looked like before the community fork started diverging. Its README points at Microsoft's official Hugging Face collection for weights rather than a re-upload. For anything you actually intend to run, prefer the maintained community fork; a year-old frozen copy will not carry security fixes.",
          zh: "建立於 2025 年 9 月 5 日——正是官方程式碼下架的那一天——單純作為 repo 的存檔。此後未再更動，而這正是它的用意：它是歷史快照，而非持續維護的專案。如果你想看看社群 fork 開始分歧之前，原版長什麼樣子，它有價值。README 指向微軟官方的 Hugging Face 收藏而非轉傳。但凡你真的要拿來執行，請選有在維護的社群 fork；一份凍結一年的副本不會帶有任何安全修正。"
        },
        url: "https://github.com/shijincai/VibeVoice"
      },
      {
        slug: "enemyx-comfyui", category: "comfyui",
        title: { en: "Enemyx-net/VibeVoice-ComfyUI", zh: "Enemyx-net/VibeVoice-ComfyUI" },
        summary: {
          en: "The most-starred ComfyUI integration — but last pushed February 2026.",
          zh: "star 數最高的 ComfyUI 整合——但最後推送停在 2026 年 2 月。"
        },
        tags: ["★ 1.5k", "MIT", "2026 / 02", { en: "3rd-party weights", zh: "非官方權重" }],
        overview: {
          en: "The most popular way to drive VibeVoice from a ComfyUI workflow: single and multi-speaker nodes, voice cloning from a reference clip, and model downloads handled for you. Two things to weigh. First, it has not been pushed to since February 2026, so roughly seven months of upstream changes — including everything Microsoft shipped in 2026 — are not reflected, and 36 issues are open. Second, its default model list reaches for third-party 7B re-uploads (aoi-ot/VibeVoice-Large, FabioSarracino/VibeVoice-Large-Q8, DevParker/VibeVoice7b-low-vram) alongside Microsoft's official 1.5B. Automatic download is convenient and also means weights arrive without you choosing the source — decide that deliberately.",
          zh: "從 ComfyUI 工作流驅動 VibeVoice 最熱門的方式：單人與多人語者節點、用參考音複製聲音，並自動處理模型下載。有兩件事要權衡。第一，它自 2026 年 2 月後就沒有推送，等於約七個月的上游變動——包含微軟 2026 年發布的所有東西——都沒有反映進來，且有 36 個 issue 未關。第二，它預設的模型清單除了微軟官方的 1.5B，也伸手去抓第三方轉傳的 7B（aoi-ot/VibeVoice-Large、FabioSarracino/VibeVoice-Large-Q8、DevParker/VibeVoice7b-low-vram）。自動下載很方便，但也代表權重是在你沒有選擇來源的情況下進來的——這件事請有意識地決定。"
        },
        url: "https://github.com/Enemyx-net/VibeVoice-ComfyUI"
      },
      {
        slug: "wildminder-comfyui", category: "comfyui",
        title: { en: "wildminder/ComfyUI-VibeVoice", zh: "wildminder/ComfyUI-VibeVoice" },
        summary: {
          en: "The other well-known ComfyUI node — but untouched for about a year.",
          zh: "另一個知名的 ComfyUI 節點——但已經約一年沒有動過。"
        },
        tags: ["★ 597", "MIT", "2025 / 09", { en: "stale", zh: "已停滯" }],
        overview: {
          en: "An early and widely-recommended ComfyUI node, and still the one many tutorials point at. The problem is the date: its last push was September 2025, right around the time Microsoft pulled the code, so it predates the entire 2026 model line — no ASR, no streaming, no BitNet — and 26 issues sit open. It also defaults to the aoi-ot/VibeVoice-Large re-upload for the big model. If a guide sends you here, check whether a maintained alternative covers your case first; an abandoned node is not automatically dangerous, but nobody is watching it for you.",
          zh: "很早期、也被廣泛推薦的 ComfyUI 節點，至今仍是許多教學指向的對象。問題出在日期：最後推送是 2025 年 9 月，正好是微軟撤下程式碼的前後，因此它早於 2026 年整條模型線——沒有 ASR、沒有串流、沒有 BitNet——且有 26 個 issue 未關。大模型同樣預設抓 aoi-ot/VibeVoice-Large 轉傳。如果某篇教學把你導來這裡，先確認有沒有仍在維護的替代方案能滿足你的需求；停止維護的節點不必然危險，但已經沒有人在替你盯著它了。"
        },
        url: "https://github.com/wildminder/ComfyUI-VibeVoice"
      },
      {
        slug: "tts-audio-suite", category: "comfyui",
        title: { en: "diodiogod/TTS-Audio-Suite", zh: "diodiogod/TTS-Audio-Suite" },
        summary: {
          en: "Multi-engine ComfyUI suite where VibeVoice is one of several TTS backends. Actively maintained.",
          zh: "多引擎的 ComfyUI 套件，VibeVoice 只是其中一個 TTS 後端。維護活躍。"
        },
        tags: ["★ 1.2k", "MIT", "2026 / 09", { en: "actively maintained", zh: "維護活躍" }],
        overview: {
          en: "Rather than wrapping VibeVoice alone, this bundles several TTS and voice-conversion engines behind one set of ComfyUI nodes, which makes it easy to A/B VibeVoice against other models in the same workflow. It is the most actively maintained ComfyUI option here — pushed to in September 2026 — with 58 open issues, which is what an actively-used project of this size looks like. GitHub reports the licence as 'NOASSERTION' because it could not auto-detect it, but the LICENSE file is a standard MIT licence. Breadth cuts both ways: more engines means more third-party dependencies pulled into your ComfyUI install.",
          zh: "它不只包 VibeVoice，而是把多個 TTS 與變聲引擎收在同一組 ComfyUI 節點後面，因此可以在同一條工作流裡直接把 VibeVoice 跟其他模型互相對照。這是本頁 ComfyUI 選項中維護最活躍的一個——2026 年 9 月仍有推送——有 58 個 issue 未關，這對一個這種規模、且真的有人在用的專案來說算正常。GitHub 把授權標成 NOASSERTION 是因為自動偵測失敗，實際的 LICENSE 檔就是標準 MIT。廣度是雙面刃：引擎越多，被拉進你 ComfyUI 環境的第三方依賴也越多。"
        },
        url: "https://github.com/diodiogod/TTS-Audio-Suite"
      },
      {
        slug: "voice-clone-studio", category: "app",
        title: { en: "FranckyB/Voice-Clone-Studio", zh: "FranckyB/Voice-Clone-Studio" },
        summary: {
          en: "Gradio web UI for voice cloning, pairing VibeVoice with Qwen3-TTS and Whisper.",
          zh: "Gradio 網頁介面的聲音複製工具，把 VibeVoice 與 Qwen3-TTS、Whisper 搭在一起。"
        },
        tags: ["★ 667", "Apache-2.0", "2026 / 05", { en: "web UI", zh: "網頁介面" }],
        overview: {
          en: "A browser UI aimed at voice cloning and voice design rather than at long-form podcast generation. It combines engines: Qwen3-TTS and VibeVoice for synthesis, and either Whisper or VibeVoice-ASR for automatic transcription — so it is one of the few community apps that actually uses the recognition side of the family. Apache-2.0 rather than MIT, and only one open issue against 667 stars. Last push was May 2026, so it predates the ASR-BitNet and streaming releases. As with any Gradio app, do not put it on a public address without putting authentication in front of it.",
          zh: "以聲音複製與音色設計為目標的瀏覽器介面，而非長篇 Podcast 生成。它混用多個引擎：合成用 Qwen3-TTS 與 VibeVoice，自動轉寫則可選 Whisper 或 VibeVoice-ASR——因此它是少數真的有用到這個家族「辨識」那一側的社群應用。授權是 Apache-2.0 而非 MIT，667 star 之下只有 1 個 issue 未關。最後推送在 2026 年 5 月，因此早於 ASR-BitNet 與串流版。跟任何 Gradio 應用一樣：沒有在前面擋一層驗證之前，不要把它放到公開位址上。"
        },
        url: "https://github.com/FranckyB/Voice-Clone-Studio"
      },
      {
        slug: "tts-audiobook-tool", category: "app",
        title: { en: "zeropointnine/tts-audiobook-tool", zh: "zeropointnine/tts-audiobook-tool" },
        summary: {
          en: "Audiobook pipeline across many TTS models, with a synced reader app. Actively maintained.",
          zh: "跨多個 TTS 模型的有聲書製作流程，附同步閱讀器。維護活躍。"
        },
        tags: ["★ 203", "MIT", "2026 / 09", { en: "audiobooks", zh: "有聲書" }],
        overview: {
          en: "Built around the job rather than the model: it takes a book and produces high-quality long-form audio, with VibeVoice as one supported engine among several (Qwen3-TTS, OmniVoice and others). It also ships an audio-synced reader web app and a standalone server component, which is more finished than most projects in this list. Pushed to in September 2026 with only two open issues. If your actual goal is 'turn this text into a listenable audiobook' rather than 'run VibeVoice', this is a more direct route than assembling a ComfyUI graph.",
          zh: "它是繞著「任務」而非「模型」設計的：輸入一本書，產出高品質的長篇音訊，VibeVoice 只是它支援的引擎之一（另有 Qwen3-TTS、OmniVoice 等）。它還附帶一個音訊同步的閱讀器網頁應用與獨立的伺服器元件，完成度比清單上多數專案高。2026 年 9 月仍有推送，只有 2 個 issue 未關。如果你真正的目標是「把這段文字變成能聽的有聲書」而不是「執行 VibeVoice」，這條路比自己拼一張 ComfyUI 流程圖直接得多。"
        },
        url: "https://github.com/zeropointnine/tts-audiobook-tool"
      },
      {
        slug: "voice-studio", category: "app",
        title: { en: "msrbuilds/voice-studio", zh: "msrbuilds/voice-studio" },
        summary: {
          en: "A local multi-model TTS studio positioned as an open alternative to ElevenLabs.",
          zh: "本地端的多模型 TTS 工作室，定位是 ElevenLabs 的開源替代。"
        },
        tags: ["★ 185", "MIT", "2026 / 07", { en: "local studio", zh: "本地工作室" }],
        overview: {
          en: "A desktop-oriented studio that runs several TTS models locally, with VibeVoice among them, aimed squarely at people who want to stop paying a per-character subscription. MIT, pushed to in July 2026, one open issue. It is younger than most entries here — created in June 2026 — so there is less community history to judge it by, and a smaller project means fewer people would notice if a dependency turned malicious. Read the requirements before installing, as with anything in this category.",
          zh: "偏桌面型的工作室，在本地執行數個 TTS 模型、VibeVoice 是其中之一，明確針對不想再付每字計費訂閱的人。MIT 授權，2026 年 7 月有推送，1 個 issue 未關。它比本頁多數專案年輕——2026 年 6 月才建立——因此可供判斷的社群歷史較少；而專案規模小也意味著萬一某個依賴出問題，會注意到的人比較少。跟這個分類的所有東西一樣：安裝前先讀過依賴清單。"
        },
        url: "https://github.com/msrbuilds/voice-studio"
      },
      {
        slug: "audiobook-maker", category: "app",
        title: { en: "DigiJoe79/AudioBook-Maker", zh: "DigiJoe79/AudioBook-Maker" },
        summary: {
          en: "A real desktop app (Tauri 2.0) for audiobooks — drag-and-drop, 17+ languages, MP3/M4A export.",
          zh: "真正的桌面應用（Tauri 2.0），做有聲書用——拖放編排、17+ 種語言、可輸出 MP3/M4A。"
        },
        tags: ["★ 90", "MIT", "2026 / 01", { en: "desktop app", zh: "桌面應用" }],
        overview: {
          en: "The closest thing here to a packaged application rather than a repo you run from a terminal: built with Tauri 2.0, with drag-and-drop chapter organisation, NLP-based text segmentation and export to MP3, M4A or WAV. VibeVoice is one of three engines alongside XTTS and Chatterbox. Caveats: last push was January 2026 with 8 issues open, and it is a small project, so treat any prebuilt binary with the same care you would give any unsigned executable from an individual developer — building from source is the more conservative route.",
          zh: "本頁最接近「打包好的應用程式」而非「在終端機執行的 repo」的一個：以 Tauri 2.0 開發，可拖放編排章節、用 NLP 做文字切分，並輸出 MP3、M4A 或 WAV。VibeVoice 是它三個引擎之一，另有 XTTS 與 Chatterbox。要注意的是：最後推送在 2026 年 1 月、8 個 issue 未關，而且是小型專案，因此對任何預先編譯的執行檔，請用你對待「個人開發者提供的未簽章執行檔」同樣的謹慎——從原始碼自行建置是比較保守的做法。"
        },
        url: "https://github.com/DigiJoe79/AudioBook-Maker"
      },
      {
        slug: "vibevoice-fusion", category: "app",
        title: { en: "zhao-kun/VibeVoiceFusion", zh: "zhao-kun/VibeVoiceFusion" },
        summary: {
          en: "Full-stack multi-speaker web system — but it ships with no licence at all.",
          zh: "全端多語者網頁系統——但它完全沒有附授權。"
        },
        tags: ["★ 491", "NO LICENSE", "2026 / 02", { en: "licence risk", zh: "授權疑慮" }],
        overview: {
          en: "Popular enough at 491 stars to keep appearing in search results, and a genuinely full-stack take on multi-speaker generation. The reason it is listed with a warning: the repository carries no licence file. Under default copyright that means all rights reserved — you have no granted permission to use, modify or redistribute it, regardless of the fact that it is public on GitHub. That is a legal exposure, not a malware one, but it is the kind that surfaces later rather than sooner. It also points at its own weight re-upload (zhaokun/vibevoice-large). Last push February 2026. Worth watching in case a licence is added; hard to recommend for anything beyond personal experimentation until then.",
          zh: "491 star，熱門到會持續出現在搜尋結果裡，而且確實是個完整的全端多語者生成方案。之所以在這裡帶著警語列出，是因為：這個 repo 沒有附任何授權檔。在著作權的預設狀態下，這代表保留一切權利——不論它在 GitHub 上是公開的，你都沒有被授予使用、修改或再散布的權限。這是法律面的曝險而非惡意程式的問題，但屬於那種比較晚才會浮上檯面的類型。它同時指向自己上傳的權重（zhaokun/vibevoice-large）。最後推送在 2026 年 2 月。可以持續觀察它是否補上授權；在那之前，除了個人實驗以外都很難推薦。"
        },
        url: "https://github.com/zhao-kun/VibeVoiceFusion"
      },
      {
        slug: "asr-portable-win", category: "app",
        title: { en: "timoncool/VibeVoice_ASR_portable_ru", zh: "timoncool/VibeVoice_ASR_portable_ru" },
        summary: {
          en: "One-click portable ASR for Windows — fully offline, NVIDIA GPU. Freshly updated.",
          zh: "Windows 一鍵免安裝的 ASR——完全離線、需 NVIDIA GPU。近期仍在更新。"
        },
        tags: ["★ 40", "MIT", "2026 / 09", { en: "one-click", zh: "一鍵安裝" }],
        overview: {
          en: "The most literal answer to 'has anyone made this easy to deploy': a portable Windows build of VibeVoice-ASR with a one-click installer that runs entirely offline once set up. Pushed to in September 2026, so it tracks the current ASR line. Two things to note. It is a small project (40 stars) and the documentation is Russian-first, so read carefully if that is not a language you work in. And portable one-click bundles are exactly the format where you are trusting a packager rather than reading code — the convenience is real, and so is the fact that you are running someone else's prebuilt binary. Requires an NVIDIA GPU.",
          zh: "對於「有沒有人把這東西弄得很好部署」，這是最字面的答案：VibeVoice-ASR 的 Windows 免安裝版，一鍵安裝、裝好後完全離線運作。2026 年 9 月仍有推送，因此跟得上目前的 ASR 線。有兩點要注意。它是小型專案（40 star），且文件以俄文為主，如果那不是你的工作語言請仔細確認。另外，免安裝一鍵包正是那種「你信任的是打包者而不是你讀過的程式碼」的形式——便利是真的，你在執行別人預先編譯好的執行檔這件事也是真的。需要 NVIDIA GPU。"
        },
        url: "https://github.com/timoncool/VibeVoice_ASR_portable_ru"
      },
      {
        slug: "realtime-openai-api", category: "server",
        title: { en: "marhensa/vibevoice-realtime-openai-api", zh: "marhensa/vibevoice-realtime-openai-api" },
        summary: {
          en: "Drop-in OpenAI-compatible TTS endpoint backed by Realtime-0.5B. Docker included.",
          zh: "OpenAI API 相容的 TTS 端點，後面接 Realtime-0.5B。附 Docker。"
        },
        tags: ["★ 88", "MIT", "2025 / 12", { en: "OpenAI-compatible", zh: "OpenAI 相容" }],
        overview: {
          en: "The pragmatic integration path: it exposes VibeVoice-Realtime-0.5B behind an OpenAI-compatible speech API, with voice names aliased to OpenAI's, so existing code that calls OpenAI TTS can be pointed at a local server by changing a base URL. Ships both a Docker path and a plain Python venv, and is CUDA-optimised. Last push December 2025 — it works against the Realtime model it targets, but has not tracked anything since. Running it in Docker is the better default here, since a container bounds what a service listening on a port can reach.",
          zh: "最務實的整合路徑：把 VibeVoice-Realtime-0.5B 包在 OpenAI 相容的語音 API 後面，音色名稱也對應到 OpenAI 的命名，因此原本呼叫 OpenAI TTS 的程式碼只要改一個 base URL 就能指向本地伺服器。同時提供 Docker 與純 Python venv 兩條路，並針對 CUDA 最佳化。最後推送在 2025 年 12 月——對它鎖定的 Realtime 模型是可用的，但此後沒有跟進任何更新。這裡建議預設用 Docker 跑，因為容器能限制住一個對外監聽的服務所能觸及的範圍。"
        },
        url: "https://github.com/marhensa/vibevoice-realtime-openai-api"
      },
      {
        slug: "vibevoice-fastapi", category: "server",
        title: { en: "ncoder-ai/VibeVoice-FastAPI", zh: "ncoder-ai/VibeVoice-FastAPI" },
        summary: {
          en: "A thin FastAPI wrapper over the 1.5B and 7B models. Small but current.",
          zh: "包在 1.5B 與 7B 模型外面的輕量 FastAPI。規模小但還算跟得上。"
        },
        tags: ["★ 33", "MIT", "2026 / 06", { en: "self-host API", zh: "自架 API" }],
        overview: {
          en: "A minimal HTTP service around the original TTS models, for when you want an endpoint rather than a UI. At 33 stars this is a small project with correspondingly few eyes on it, but a thin wrapper is also the easiest kind of code to read end to end before you run it — which is the recommendation here. Last push June 2026. Whatever you use, an inference server should sit behind authentication and not be published directly to the internet; the 2026 ComfyUI botnet campaign found its victims precisely by scanning for exposed AI services.",
          zh: "包在原始 TTS 模型外面的極簡 HTTP 服務，適合你要的是一個端點而不是一套介面的情況。33 star 代表這是個小專案、盯著它的眼睛相應也少；但輕量包裝同時也是最容易在執行前從頭到尾讀完的那種程式碼——這也是這裡的建議做法。最後推送在 2026 年 6 月。無論你用哪一個，推論伺服器都應該擋在驗證後面、不要直接發布到網際網路上；2026 年那波 ComfyUI 殭屍網路，正是靠掃描暴露在外的 AI 服務找到受害者的。"
        },
        url: "https://github.com/ncoder-ai/VibeVoice-FastAPI"
      },
      {
        slug: "vibevoice-cpp", category: "port",
        title: { en: "localai-org/vibevoice.cpp", zh: "localai-org/vibevoice.cpp" },
        summary: {
          en: "C++ port on ggml — no Python environment at all. The most-downloaded weights in this list.",
          zh: "建在 ggml 上的 C++ 移植——完全不需要 Python 環境。本頁下載量最高的權重。"
        },
        tags: ["★ 123", "MIT", "2026 / 07", { en: "no Python", zh: "免 Python" }],
        overview: {
          en: "A ggml-based C++ implementation from the LocalAI org, in the same spirit as whisper.cpp and llama.cpp. The practical appeal is that it removes the Python dependency tree entirely — which, given that most of the risk in this ecosystem lives in pip installs and node install scripts, is a meaningful reduction in attack surface rather than just a performance choice. Its companion weight repo mudler/vibevoice.cpp-models has by far the most downloads of any source referenced on this page. MIT, last push July 2026. Note this is a separate effort from Microsoft's own ASR-BitNet CPU engine, VibeASR.cpp.",
          zh: "來自 LocalAI 組織、建在 ggml 上的 C++ 實作，精神與 whisper.cpp、llama.cpp 一脈相承。它實務上的吸引力在於完全拿掉了 Python 依賴樹——考慮到這個生態的風險大多住在 pip 安裝與節點安裝腳本裡，這是實質縮小攻擊面，而不只是效能上的選擇。它搭配的權重 repo mudler/vibevoice.cpp-models，下載量遠高於本頁提到的任何其他來源。MIT 授權，最後推送 2026 年 7 月。請注意這與微軟自家的 ASR-BitNet CPU 引擎 VibeASR.cpp 是兩個不同的專案。"
        },
        url: "https://github.com/localai-org/vibevoice.cpp"
      },
      {
        slug: "vibevoice-rs", category: "port",
        title: { en: "danielclough/vibevoice-rs", zh: "danielclough/vibevoice-rs" },
        summary: {
          en: "Rust implementation with voice cloning and multi-speaker support.",
          zh: "Rust 實作，支援聲音複製與多語者。"
        },
        tags: ["★ 67", "MIT", "2026 / 01", { en: "Rust", zh: "Rust" }],
        overview: {
          en: "A Rust port covering voice cloning and multi-speaker generation, for people who would rather ship a single compiled binary than manage a Python environment. Zero open issues and 67 stars — a quiet, small project. Last push January 2026, so it predates the 2026 model line. Like the C++ port, the main structural advantage is that a compiled binary with a Cargo dependency tree is easier to reason about than a pip environment that pulls packages at install time.",
          zh: "涵蓋聲音複製與多語者生成的 Rust 移植，適合寧願交付單一編譯執行檔、也不想管 Python 環境的人。0 個 issue 未關、67 star——安靜的小專案。最後推送在 2026 年 1 月，因此早於 2026 年那條模型線。跟 C++ 移植一樣，它結構上的主要優勢在於：一個帶著 Cargo 依賴樹的編譯執行檔，比一個安裝當下才去拉套件的 pip 環境更容易推敲。"
        },
        url: "https://github.com/danielclough/vibevoice-rs"
      },
      {
        slug: "vibevoice-swift", category: "port",
        title: { en: "mzbac/vibevoice.swift", zh: "mzbac/vibevoice.swift" },
        summary: {
          en: "Swift port of Realtime-0.5B, for Apple platforms.",
          zh: "Realtime-0.5B 的 Swift 移植，給 Apple 平台用。"
        },
        tags: ["★ 31", "MIT", "2025 / 12", { en: "Apple", zh: "Apple" }],
        overview: {
          en: "A Swift implementation targeting the real-time 0.5B model — the natural building block if you want on-device streaming speech inside a macOS or iOS app rather than a server call. It is small (31 stars) and has not been pushed since December 2025, so treat it as a reference implementation to learn from rather than a maintained dependency to build a product on.",
          zh: "針對即時 0.5B 模型的 Swift 實作——如果你想在 macOS 或 iOS 應用裡做裝置端的串流語音，而不是打一支伺服器 API，這是很自然的起點。它規模小（31 star），且自 2025 年 12 月後未再推送，因此請把它當成可以參考學習的實作，而不是拿來承載產品的長期依賴。"
        },
        url: "https://github.com/mzbac/vibevoice.swift"
      },
      {
        slug: "mlx-speech", category: "port",
        title: { en: "appautomaton/mlx-speech", zh: "appautomaton/mlx-speech" },
        summary: {
          en: "Pure-MLX speech stack for Apple Silicon — TTS, cloning, dialogue and ASR. Updated this month.",
          zh: "純 MLX 的 Apple Silicon 語音套件——合成、複製、對話與辨識。本月仍在更新。"
        },
        tags: ["★ 47", "MIT", "2026 / 09", { en: "Apple Silicon", zh: "Apple Silicon" }],
        overview: {
          en: "Runs VibeVoice natively on Apple Silicon through MLX, alongside several other speech models (Fish S2 Pro, LongCat, MOSS, Step-Audio and a Cohere ASR), covering synthesis, voice cloning, dialogue and recognition. Pushed to in September 2026, making it one of the freshest projects here. Still small at 47 stars, so the usual caveat applies — but if you are on a Mac and want the GPU actually used rather than falling back to CPU, this is the path that does not involve CUDA at all.",
          zh: "透過 MLX 在 Apple Silicon 上原生執行 VibeVoice，同時涵蓋其他數個語音模型（Fish S2 Pro、LongCat、MOSS、Step-Audio 與 Cohere 的 ASR），功能包含合成、聲音複製、對話與辨識。2026 年 9 月仍有推送，是本頁最新的專案之一。47 star 仍屬小型，因此一般性的提醒同樣適用——但如果你用 Mac、又希望 GPU 真的被用到而不是退回 CPU，這是完全不必碰 CUDA 的那條路。"
        },
        url: "https://github.com/appautomaton/mlx-speech"
      }
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
        desc: { en: "All six open checkpoints and their model cards, under the Microsoft org.", zh: "微軟組織底下的六個開源權重與模型卡。" },
        url: "https://huggingface.co/microsoft" },
      { name: { en: "ASR Playground", zh: "ASR 線上體驗" },
        type: { en: "Demo", zh: "體驗" },
        desc: { en: "Try VibeVoice-ASR in the browser.", zh: "在瀏覽器試用 VibeVoice-ASR。" },
        url: "https://aka.ms/vibevoice-asr" },
      { name: { en: "Project page", zh: "官方專案頁" },
        type: { en: "Official", zh: "官方" },
        desc: { en: "Demos, samples and an overview of the whole family.", zh: "整個家族的展示、樣本與總覽。" },
        url: "https://microsoft.github.io/VibeVoice" },
      { name: { en: "ASR-Streaming docs", zh: "ASR-Streaming 說明文件" },
        type: { en: "Official", zh: "官方" },
        desc: { en: "How to run the streaming build, including the FastAPI/WebSocket demo.", zh: "串流版的執行方式，含 FastAPI／WebSocket 示範。" },
        url: "https://github.com/microsoft/VibeVoice/blob/main/docs/vibevoice-asr-streaming.md" },
      { name: { en: "VibeASR.cpp", zh: "VibeASR.cpp" },
        type: { en: "Official", zh: "官方" },
        desc: { en: "The edge CPU inference engine behind the BitNet build.", zh: "BitNet 版背後的邊緣 CPU 推論引擎。" },
        url: "https://github.com/microsoft/VibeASR.cpp" },
      { name: { en: "Streaming ASR demo", zh: "串流辨識線上體驗" },
        type: { en: "Demo", zh: "體驗" },
        desc: { en: "Try live, speaker-attributed transcription in the browser.", zh: "在瀏覽器試用即時、帶語者標註的轉寫。" },
        url: "https://aka.ms/vibeasr" },
      { name: { en: "Azure AI Foundry Labs", zh: "Azure AI Foundry Labs" },
        type: { en: "Demo", zh: "體驗" },
        desc: { en: "Explore VibeVoice-ASR through Microsoft Foundry, no local setup.", zh: "透過 Microsoft Foundry 探索 VibeVoice-ASR，免自行架設。" },
        url: "https://labs.ai.azure.com/innovations/vibevoice-asr/" },
      { name: { en: "TTS paper (arXiv 2508.19205)", zh: "TTS 論文（arXiv 2508.19205）" },
        type: { en: "Paper", zh: "論文" },
        desc: { en: "Expressive podcast generation with next-token diffusion. ICLR 2026 Oral.", zh: "以 next-token diffusion 生成富表現力的 Podcast。ICLR 2026 Oral。" },
        url: "https://arxiv.org/abs/2508.19205" },
      { name: { en: "ASR report (arXiv 2601.18184)", zh: "ASR 技術報告（arXiv 2601.18184）" },
        type: { en: "Paper", zh: "論文" },
        desc: { en: "The 60-minute single-pass recognition model.", zh: "單次 60 分鐘長音訊辨識模型。" },
        url: "https://arxiv.org/abs/2601.18184" },
      { name: { en: "ASR-BitNet report (arXiv 2607.21075)", zh: "ASR-BitNet 報告（arXiv 2607.21075）" },
        type: { en: "Paper", zh: "論文" },
        desc: { en: "Heterogeneous quantization for CPU inference: 4.62 GB to 1.58 GB.", zh: "為 CPU 推論設計的異質量化：4.62 GB 壓到 1.58 GB。" },
        url: "https://arxiv.org/abs/2607.21075" },
      { name: { en: "ASR-Streaming report (arXiv 2609.02812)", zh: "ASR-Streaming 報告（arXiv 2609.02812）" },
        type: { en: "Paper", zh: "論文" },
        desc: { en: "LLM-based end-to-end streaming speaker-attributed recognition.", zh: "以 LLM 為核心的端到端串流語者標註辨識。" },
        url: "https://arxiv.org/abs/2609.02812" },
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
        url: "https://slator.com/microsoft-research-vibevoice-long-form-speech-synthesis/" },
      { name: { en: "OpenAI — next-gen audio models", zh: "OpenAI — 新一代語音模型" },
        type: { en: "Compared", zh: "對比" },
        desc: { en: "gpt-4o-transcribe and gpt-4o-mini-tts announcement.", zh: "gpt-4o-transcribe 與 gpt-4o-mini-tts 發表說明。" },
        url: "https://openai.com/index/introducing-our-next-generation-audio-models/" },
      { name: { en: "OpenAI — gpt-realtime", zh: "OpenAI — gpt-realtime" },
        type: { en: "Compared", zh: "對比" },
        desc: { en: "OpenAI's production realtime speech-to-speech models.", zh: "OpenAI 產品級即時語音對語音模型。" },
        url: "https://openai.com/index/introducing-gpt-realtime/" }
    ]
  }

];
