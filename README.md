# nba_4

Red Stream - Blood Donation Web Platform powered by Node.js, Express, and MongoDB Atlas.

## 🚀 Features
- **Frontend:** Responsive HTML5, CSS3, JavaScript UI
- **Backend:** Node.js & Express REST API
- **Database:** MongoDB Atlas (Cloud Database)
- **Deployment:** Vercel ready (`vercel.json`)

## 🛠️ Environment Setup
Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb+srv://dharsansp23cse_db_user:xJKXXf8lFEFiIjBL@cluster0.6egwq7d.mongodb.net/nba_4?retryWrites=true&w=majority&appName=Cluster0
```

## 📦 Run Locally
```bash
npm install
npm start
```
Open [http://localhost:5000](http://localhost:5000) in your browser.

## 🌐 Deploy to Vercel
1. Install Vercel CLI (`npm i -g vercel`) or push to GitHub.
2. Link your repository `https://github.com/Dharsan5/nba_4.git` on Vercel.
3. Add Environment Variable in Vercel settings:
   - `MONGODB_URI` = `mongodb+srv://dharsansp23cse_db_user:xJKXXf8lFEFiIjBL@cluster0.6egwq7d.mongodb.net/nba_4?retryWrites=true&w=majority&appName=Cluster0`
4. Click **Deploy**!
