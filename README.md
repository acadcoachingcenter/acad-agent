# ACAD.AI — Academic Counsellor for Indian Students After Class 12

A beautiful AI-powered landing page with an interactive chatbot that helps Indian students figure out what to do after their 12th standard (10+2), based on their stream, marks, interests, and passions.

## 🚀 Deploy to Vercel (Step-by-Step)

### Step 1: Push to GitHub
1. Go to [github.com](https://github.com) → **New Repository**
2. Name it `acad-ai` (or anything you like)
3. Open your terminal (Claude Code / CMD) in this folder and run:
```bash
git init
git add .
git commit -m "Initial commit - ACAD AI Agent"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/acad-ai.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click **"Add New Project"** → Import your `acad-ai` repo
3. Click **Deploy** (no build settings needed for this project)

### Step 3: Add your Anthropic API Key
1. In Vercel dashboard → your project → **Settings → Environment Variables**
2. Add:
   - **Name**: `ANTHROPIC_API_KEY`
   - **Value**: your key from [console.anthropic.com](https://console.anthropic.com)
3. Click **Save** → then go to **Deployments** → **Redeploy**

That's it! Your ACAD AI Agent is live 🎉

---

## 🧠 Features
- Beautiful landing page with Indian education context
- AI chatbot powered by Claude (Anthropic)
- Covers Science (PCM/PCB), Commerce, Arts streams
- JEE, NEET, CLAT, NIFT, NID, CA and 50+ career paths
- Quick prompt buttons for common queries
- Fully responsive (mobile-friendly)

## 📁 File Structure
```
acad-agent/
├── index.html        ← Landing page + chatbot UI
├── api/
│   └── chat.js       ← Vercel serverless API function
├── vercel.json       ← Vercel configuration
├── .gitignore
└── README.md
```

## 💰 Cost
- Uses Anthropic API (`claude-sonnet-4`) — approximately ₹0.10–0.30 per conversation
- Vercel hosting is **free** for personal projects

## 🛠 Customization
- Edit the system prompt in `api/chat.js` to change ACAD's behavior
- Update colors in `index.html` CSS variables (`:root` section)
- Add more career path cards in the paths grid section
