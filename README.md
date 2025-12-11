# 🐕‍🦺 Gypsy Service Dog Training Application

A personal web application for tracking service dog training progress for Gypsy, an 18-month-old female blue nose pitbull being trained as a service dog for a Marine Corps veteran.

## Features

### 📊 Dashboard
- Real-time training statistics
- Visual progress tracking across all 4 training phases
- Quick access to all major features
- Recent training log overview

### 📖 Complete Training Guide
- Comprehensive service dog training manual
- Specialized for blue nose pitbulls
- Veteran-specific task training
- 8 enhancement additions including:
  - Training log system
  - Breed-specific motivation techniques
  - Veteran task matrix
  - Distraction proofing protocols
  - Emergency response training
  - Heat cycle management
  - Community integration strategies
  - Lifetime support resources

### 📝 Training Log System
- Daily session tracking
- Exercise logging
- Command practice records
- Task training progress
- Public access work documentation
- Gypsy's state tracking (focus, energy levels)
- Weekly progress reports

### 🎯 Task Management
- Track specific service dog tasks
- Progress indicators (0-100%)
- Status tracking (Not Started, In Progress, Completed)
- Difficulty ratings
- Suggested veteran-specific tasks
- Notes and training approaches

### 🏆 Milestone Tracker
- 5 training phases with specific milestones
- Visual progress for each phase
- Persistent state (saved in browser)
- Celebration animation on graduation
- Foundation Phase (Weeks 1-8)
- Advanced Obedience (Weeks 9-16)
- Task Training (Weeks 17-28)
- Public Access (Weeks 29-40)
- Full Service Dog Status

### 🔗 Resource Library
- Veteran service dog programs
- ADA legal rights and requirements
- Training organizations
- Pitbull-specific resources
- Online training videos
- Equipment suppliers
- Community support links
- Emergency contacts

## Installation

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Setup Instructions

1. **Navigate to the application directory:**
   ```bash
   cd /home/paul/Documents/Articles/gypsy-training-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the application:**
   ```bash
   npm start
   ```

4. **Access the application:**
   Open your web browser and go to:
   ```
   http://localhost:3500
   ```

### Development Mode

For development with auto-restart on file changes:
```bash
npm run dev
```

## Application Structure

```
gypsy-training-app/
├── server.js                 # Express server and API routes
├── package.json             # Dependencies and scripts
├── data/                    # JSON data storage
│   └── training-data.json   # Training logs, tasks, milestones
├── public/                  # Static assets
│   ├── css/
│   │   └── style.css       # Complete styling
│   └── js/
│       ├── main.js         # Core JavaScript
│       ├── training-log.js # Training log functionality
│       ├── tasks.js        # Task management
│       └── milestones.js   # Milestone tracking
└── views/                   # EJS templates
    ├── index.ejs           # Dashboard
    ├── guide.ejs           # Training guide layout
    ├── training-log.ejs    # Training logs
    ├── tasks.ejs           # Task management
    ├── milestones.ejs      # Milestone tracker
    ├── resources.ejs       # Resources page
    ├── guide-sections/     # Individual guide pages
    └── partials/           # Reusable components
        ├── header.ejs
        ├── nav.ejs
        └── footer.ejs
```

## Data Storage

The application uses a simple JSON file-based storage system (`data/training-data.json`). All data is stored locally on your machine.

### Data Structure:
```json
{
  "trainingLogs": [],      // Daily training sessions
  "tasks": [],             // Service dog tasks
  "milestones": [],        // Training milestones
  "weeklyReports": [],     // Weekly summaries
  "progressData": {        // Phase progress percentages
    "foundationPhase": 0,
    "advancedObedience": 0,
    "taskTraining": 0,
    "publicAccess": 0
  }
}
```

## Usage Guide

### Adding a Training Log
1. Navigate to "Training Logs"
2. Click "Add New Log" tab
3. Fill in session details:
   - Date and time of session
   - Exercise information
   - Commands practiced
   - Task training work
   - Public access practice
   - Gypsy's state
   - Notes
4. Click "Save Training Log"

### Managing Tasks
1. Navigate to "Tasks"
2. Click "+ Add New Task" to create custom tasks
3. Or click suggested tasks to add them quickly
4. Update progress with the slider (0-100%)
5. Change status (Not Started → In Progress → Completed)
6. Delete tasks when no longer needed

### Tracking Milestones
1. Navigate to "Milestones"
2. Check off milestones as Gypsy achieves them
3. Watch phase progress update automatically
4. Celebrate when all final milestones are complete!

### Reading the Training Guide
1. Navigate to "Training Guide"
2. Use the sidebar to jump to specific sections
3. Read through each phase sequentially
4. Reference enhancement additions for specialized topics

## Key Training Timeline

- **Weeks 1-8:** Foundation Obedience
- **Weeks 9-16:** Advanced Obedience
- **Weeks 17-28:** Task-Specific Training
- **Weeks 29-40:** Public Access Training
- **Total:** 10-12 months to full service dog status

## API Endpoints

### Training Logs
- `POST /api/training-log` - Create new training log
- `DELETE /api/training-log/:id` - Delete training log

### Tasks
- `POST /api/task` - Create new task
- `PUT /api/task/:id` - Update task
- `DELETE /api/task/:id` - Delete task

### Progress
- `PUT /api/progress` - Update phase progress
- `POST /api/milestone/:id/toggle` - Toggle milestone completion

### Weekly Reports
- `POST /api/weekly-report` - Create weekly report

## Customization

### Changing Port
Edit `server.js` line 7:
```javascript
const PORT = 3500; // Change to your preferred port
```

### Modifying Suggested Tasks
Edit `views/tasks.ejs` in the "Suggested Tasks" section to add/remove tasks relevant to your specific needs.

### Adding Local Resources
Navigate to Resources page and use "Edit Local Resources" to add your specific contacts:
- Local trainer
- Veterinarian
- Dog parks
- Pet supply stores

## Troubleshooting

### Application won't start
- Ensure Node.js is installed: `node --version`
- Make sure you're in the correct directory
- Try deleting `node_modules` and running `npm install` again

### Data not saving
- Check that the `data` directory exists
- Ensure `data/training-data.json` is writable
- Check browser console for errors (F12)

### Port already in use
- Change the PORT variable in `server.js`
- Or stop other applications using port 3500

## Privacy & Security

- **All data is stored locally** on your machine
- No data is sent to external servers
- The application runs entirely on your computer
- Access only through localhost (not accessible from other devices by default)

## Backup Your Data

To backup your training data:
```bash
cp data/training-data.json data/training-data-backup-$(date +%Y%m%d).json
```

To restore from backup:
```bash
cp data/training-data-backup-YYYYMMDD.json data/training-data.json
```

## Future Enhancements

Potential features to add:
- [ ] Photo uploads for training logs
- [ ] Video recording of training sessions
- [ ] Print-friendly training log reports
- [ ] Export data to PDF
- [ ] Calendar view of training sessions
- [ ] Graphical progress charts
- [ ] Email reminders for training sessions
- [ ] Integration with veterinary records

## Support

This is a personal application designed specifically for your training needs. For technical issues:
1. Check the browser console for errors (F12)
2. Review server logs in the terminal
3. Ensure all dependencies are installed

## Credits

**Created for:** Marine Corps Veteran
**Service Dog:** Gypsy (Blue Nose Pitbull, 18 months)
**Purpose:** Comprehensive service dog training tracker
**Based on:** Professional service dog training standards and ADA requirements

---

## Quick Start Commands

```bash
# Install dependencies
npm install

# Start the application
npm start

# Open in browser
# Go to: http://localhost:3500
```

---

**Semper Fi! Good luck with Gypsy's training! 🇺🇸🐕‍🦺**
