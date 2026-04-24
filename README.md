# 🚀 AI Content Studio  
### Automated Multi-Channel Content Generation Pipeline

AI Content Studio is an AI-powered automation system that transforms a single content brief into multiple marketing assets — including blog posts, social media captions, and email newsletters — using **Notion, n8n, and OpenAI**.

This project demonstrates how marketing teams can scale content production using **AI + no-code workflows**, eliminating manual work and streamlining approvals.

---

## 🧠 Overview

The system enables:

- Input a single content brief  
- Automatically generate multi-channel content  
- Store and manage everything in Notion  
- Move content through an approval workflow  

---

## ✨ Features

- 📝 **Single Brief Input**
  - Topic, audience, tone, and goals

- 🤖 **AI Content Generation**
  - 600-word blog post  
  - LinkedIn caption  
  - Instagram caption  
  - Twitter/X post  
  - Email newsletter snippet  

- 🎯 **Brand Voice Consistency**
  - Structured prompts maintain tone and style  

- 🗂️ **Notion as CMS**
  - Stores all generated content  
  - Tracks workflow status  
  - Maintains relationships between briefs and outputs  

- 🔄 **n8n Automation**
  - Webhook trigger  
  - Batch processing  
  - Multi-step AI pipeline  

- ✅ **Approval Workflow**


- 🧩 **Relational Data Model**
- Each content item links back to its brief  

- 📊 **Production-Ready System**
- Batch IDs  
- Version tracking  
- Error handling  

---

## 🏗️ Architecture


---

## 🛠️ Tech Stack

- **n8n** – Workflow automation  
- **Notion API** – Content database & CMS  
- **OpenAI API** – AI content generation  
- **JavaScript (Webhooks)** – Integration layer  

---

## 📂 Notion Database Structure

### 1. Brief Intake

| Field | Description |
|------|------------|
| Topic | Main content topic |
| Target Audience | Intended audience |
| Tone | Writing style |
| Goals | Content objective |
| Additional Context | Extra input |
| Processing Status | Workflow tracking |
| Batch ID | Unique batch identifier |

---

### 2. Content Items

| Field | Description |
|------|------------|
| Content Type | Blog, LinkedIn, Instagram, etc. |
| Generated Content | AI output |
| Generation Status | Pending / Completed |
| Approval Status | Draft → Published |
| Batch ID | Links content to a brief |
| Relation (Brief) | Connects to original brief |
| Version | Revision tracking |

---

## ⚙️ Workflow

1. User submits a content brief  
2. Webhook triggers n8n workflow  
3. Batch ID is generated  
4. Content items are created in Notion  
5. OpenAI generates content  
6. Outputs are stored in Notion  
7. Content moves through approval stages  

---

