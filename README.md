# VibeVoice 介紹站

> 微軟開源「長語音、多語者」語音 AI 模型家族的中英雙語導覽。

把 [microsoft/VibeVoice](https://github.com/microsoft/VibeVoice) 的核心概念整理成一個多頁面、可互動的靜態網站：從模型家族、技術架構、規格數據，到競品比較、應用場景、發展時間軸與負責任 AI。純前端、零建置、可離線瀏覽。

---

## 🔗 線上版 / Live

| | |
|---|---|
| 🌐 網站 | <https://tingwei161803.github.io/vibevoice-intro/> |

> 直接點進去就能用，無需安裝。每一頁都有獨立網址，方便分享（例如「模型家族」頁可直接連到 `…/models.html`）。

---

## ✨ 功能特色

- 🌏 **雙語全頁切換** — 中文 / English 一鍵切換，整站（含導覽、圖表、表格）即時重繪
- 🌗 **深色 / 淺色模式** — 預設深色科技感，可手動切換，選擇會被記住
- 🧭 **多頁面導覽** — 13 個面向各自一頁，共用同一套頂部列與跨頁導覽
- 🔍 **即時搜尋** — 模型家族、限制 FAQ、資源頁皆可輸入關鍵字過濾
- 🏷️ **分類篩選** — 依模型類型 / 資源類別快速篩選
- 📊 **資料視覺化** — 純 SVG 長條圖與折線圖，無第三方圖表函式庫
- 📱 **響應式設計** — 手機、平板、桌機皆適配
- ⚡ **純靜態** — 無後端、載入快、可離線瀏覽

---

## 📂 內容結構 / 資料來源

本站內容整理自 **microsoft/VibeVoice 專案說明**，並參考[一篇中文技術介紹文章](https://www.itnotetk.com/2026/05/01/vibevoice-microsoft-multi-speaker-tts/)。

```
vibevoice-intro/
├── index.html          # 首頁 / 總覽（hub）
├── models.html         # 模型家族（TTS / ASR / Realtime）
├── versions.html       # 版本比較（三版本並列矩陣）
├── architecture.html   # 技術架構（7.5Hz tokenizer + next-token diffusion）
├── specs.html          # 規格與數據（圖表 + 完整規格表）
├── compare.html        # 語音合成對比（vs gpt-4o-mini-tts / ElevenLabs / F5-TTS / XTTS-v2 / SparkTTS / CosyVoice 2）
├── compare-asr.html    # 語音辨識對比（vs FunASR / Whisper / gpt-4o-transcribe）
├── compare-realtime.html # 即時語音對比（vs OpenAI GPT-Realtime-2 / CosyVoice 2）
├── reviews.html        # 社群評價（網路評測/口碑彙整 + 對比）
├── usecases.html       # 應用場景
├── timeline.html       # 發展時間軸
├── faq.html            # 限制與負責任 AI
├── resources.html      # 資源與連結
├── assets/
│   ├── styles.css      # MD3 基底 + 深色科技感樣式
│   ├── shell.js        # 共用 chrome：頂部列 / 跨頁導覽 / footer / 對話框
│   └── app.js          # 版型引擎：依頁面 layout 渲染內容
├── data/
│   └── data.js         # 唯一資料檔（SITE_META + SITE_PAGES，雙語）
└── .nojekyll
```

> ⚠️ **非官方**：本網站為個人學習整理之非官方資源，內容彙整自上述來源，數字與描述可能隨官方更新而變動。如有錯誤或出入，請以官方來源為準。

---

## 🛠 本機使用

```bash
# 1. clone 專案
git clone git@github.com:tingwei161803/vibevoice-intro.git
cd vibevoice-intro

# 2a. 最簡單：直接開啟首頁
open index.html

# 2b. 或啟動本機伺服器（建議，跨頁連結才完全正常）
uv run python -m http.server 4173
# 然後瀏覽 http://localhost:4173
```

> 本專案為純靜態網站，不需安裝任何依賴。若要跑本機伺服器，一律使用 `uv`。

---

## 📊 流量分析

本站使用 Google Analytics 4（GA4 property：`VibeVoice 介紹 - GA4`）蒐集匿名瀏覽流量數據，用於了解造訪概況。GA4 片段僅在線上版載入，不會蒐集個人身分資訊。

---

## 📝 聲明 / License

- 本站為非官方整理，VibeVoice 相關內容著作權歸原始來源（Microsoft 及各文章作者）所有。
- 本網站的程式碼以 **MIT** 授權釋出。
- 如為權利人且希望調整或移除內容，請開 issue 聯絡。
