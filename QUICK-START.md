# 🚀 Quick Start Guide

## Getting Started in 3 Steps

### Step 1: Open Terminal
Navigate to the application folder:
```bash
cd /home/paul/Documents/Articles/gypsy-training-app
```

### Step 2: Start the Application
Run one of these commands:

**Option A - Using npm:**
```bash
npm start
```

**Option B - Using the startup script:**
```bash
./start-app.sh
```

### Step 3: Open Your Browser
Once you see "Server Running" message, open your browser and go to:
```
http://localhost:3500
```

---

## First Time Using the App

### 1. Explore the Dashboard
- See your training statistics
- View progress across all training phases
- Access quick actions

### 2. Read the Training Guide
- Click "Training Guide" in the navigation
- Start with "Introduction & Legal Framework"
- Use the sidebar to navigate between sections

### 3. Add Your First Training Log
- Click "Training Logs" → "Add New Log"
- Fill in Gypsy's session details
- Track commands, tasks, and progress

### 4. Set Up Your Tasks
- Click "Tasks"
- Add tasks from suggested veteran-specific tasks
- Or create custom tasks for your needs

### 5. Track Milestones
- Click "Milestones"
- Check off achievements as Gypsy progresses
- Watch phase progress update automatically

### 6. Save Important Resources
- Click "Resources"
- Add your local vet, trainer contacts
- Bookmark important links

---

## Daily Workflow

### Morning Session
1. Log into app: `http://localhost:3500`
2. Complete training session with Gypsy
3. Add training log with results
4. Update any task progress
5. Check off any milestones achieved

### Weekly Review
1. Add a weekly report
2. Review all training logs from the week
3. Identify patterns and improvements
4. Plan next week's focus areas

---

## Tips for Success

✅ **Log Every Session** - Consistency is key for tracking progress

✅ **Be Honest** - Accurate logs help identify areas needing work

✅ **Celebrate Small Wins** - Check those milestones and watch progress grow

✅ **Update Tasks Regularly** - Keep task progress current with reality

✅ **Review the Guide** - Reference training sections as you progress through phases

✅ **Backup Your Data** - Periodically copy `data/training-data.json` to a safe location

---

## Common Commands

```bash
# Start the application
npm start

# Start in development mode (auto-restart on changes)
npm run dev

# Stop the server
Press Ctrl+C in the terminal

# Backup your data
cp data/training-data.json data/backup-$(date +%Y%m%d).json

# Check if Node.js is installed
node --version
```

---

## Troubleshooting

### Can't access http://localhost:3500
- Make sure the server is running (check terminal)
- Look for "Server Running" message
- Try refreshing your browser

### Data not saving
- Check terminal for error messages
- Ensure `data/training-data.json` exists
- Check browser console (F12) for errors

### Need to restart
1. Press Ctrl+C in terminal
2. Run `npm start` again
3. Refresh browser

---

## Next Steps

1. ✅ Set up the application (you're here!)
2. 📖 Read "Introduction & Legal Framework" in the guide
3. 🎯 Add 3-5 priority tasks for Gypsy
4. 📝 Log your first training session
5. 🏆 Start checking off milestones!

---

**You're all set! Good luck with Gypsy's training!** 🐕‍🦺

**Semper Fi!** 🇺🇸
