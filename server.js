const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3500;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Data storage (simple JSON file-based storage)
const DATA_FILE = path.join(__dirname, 'data', 'training-data.json');

// Initialize data file if it doesn't exist
function initializeDataFile() {
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  if (!fs.existsSync(DATA_FILE)) {
    const initialData = {
      trainingLogs: [],
      tasks: [],
      milestones: [],
      weeklyReports: [],
      progressData: {
        foundationPhase: 0,
        advancedObedience: 0,
        taskTraining: 0,
        publicAccess: 0
      }
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
  }
}

// Helper functions
function readData() {
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    baseUrl: "",
    page: 'dashboard',
    data: readData(),
    baseUrl: ''
  });
});

app.get('/guide/:section', (req, res) => {
  const section = req.params.section;
  res.render('guide', {
    baseUrl: "",
    page: 'guide',
    section: section,
    data: readData()
  });
});

app.get('/training-log', (req, res) => {
  res.render('training-log', {
    baseUrl: "",
    page: 'training-log',
    data: readData()
  });
});

app.get('/tasks', (req, res) => {
  res.render('tasks', {
    baseUrl: "",
    page: 'tasks',
    data: readData()
  });
});

app.get('/milestones', (req, res) => {
  res.render('milestones', {
    baseUrl: "",
    page: 'milestones',
    data: readData()
  });
});

app.get('/resources', (req, res) => {
  res.render('resources', {
    baseUrl: "",
    page: 'resources',
    data: readData()
  });
});

app.get('/analytics', (req, res) => {
  res.render('analytics', {
    baseUrl: "",
    page: 'analytics',
    data: readData()
  });
});

app.get('/certificates', (req, res) => {
  res.render('certificates', {
    baseUrl: "",
    page: 'certificates',
    data: readData()
  });
});

// API Routes
app.post('/api/training-log', (req, res) => {
  const data = readData();
  const newLog = {
    id: Date.now(),
    date: req.body.date,
    session: req.body.session,
    exercise: req.body.exercise,
    commands: req.body.commands || [],
    taskTraining: req.body.taskTraining,
    publicAccess: req.body.publicAccess,
    gypsyState: req.body.gypsyState,
    notes: req.body.notes,
    createdAt: new Date().toISOString()
  };

  data.trainingLogs.unshift(newLog);
  writeData(data);
  res.json({ success: true, log: newLog });
});

app.delete('/api/training-log/:id', (req, res) => {
  const data = readData();
  data.trainingLogs = data.trainingLogs.filter(log => log.id !== parseInt(req.params.id));
  writeData(data);
  res.json({ success: true });
});

app.post('/api/task', (req, res) => {
  const data = readData();
  const newTask = {
    id: Date.now(),
    name: req.body.name,
    description: req.body.description,
    difficulty: req.body.difficulty,
    progress: req.body.progress || 0,
    status: req.body.status || 'not-started',
    startDate: req.body.startDate,
    notes: req.body.notes || '',
    createdAt: new Date().toISOString()
  };

  data.tasks.push(newTask);
  writeData(data);
  res.json({ success: true, task: newTask });
});

app.put('/api/task/:id', (req, res) => {
  const data = readData();
  const taskIndex = data.tasks.findIndex(t => t.id === parseInt(req.params.id));

  if (taskIndex !== -1) {
    data.tasks[taskIndex] = {
      ...data.tasks[taskIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    writeData(data);
    res.json({ success: true, task: data.tasks[taskIndex] });
  } else {
    res.status(404).json({ success: false, error: 'Task not found' });
  }
});

app.delete('/api/task/:id', (req, res) => {
  const data = readData();
  data.tasks = data.tasks.filter(task => task.id !== parseInt(req.params.id));
  writeData(data);
  res.json({ success: true });
});

app.post('/api/milestone/:id/toggle', (req, res) => {
  const data = readData();
  const milestoneIndex = data.milestones.findIndex(m => m.id === req.params.id);

  if (milestoneIndex !== -1) {
    data.milestones[milestoneIndex].completed = !data.milestones[milestoneIndex].completed;
    data.milestones[milestoneIndex].completedDate = data.milestones[milestoneIndex].completed
      ? new Date().toISOString()
      : null;
    writeData(data);
    res.json({ success: true, milestone: data.milestones[milestoneIndex] });
  } else {
    res.status(404).json({ success: false, error: 'Milestone not found' });
  }
});

app.put('/api/progress', (req, res) => {
  const data = readData();
  data.progressData = {
    ...data.progressData,
    ...req.body
  };
  writeData(data);
  res.json({ success: true, progress: data.progressData });
});

app.post('/api/weekly-report', (req, res) => {
  const data = readData();
  const newReport = {
    id: Date.now(),
    weekOf: req.body.weekOf,
    totalTrainingHours: req.body.totalTrainingHours,
    totalExerciseHours: req.body.totalExerciseHours,
    commandsMastered: req.body.commandsMastered || [],
    tasksProgressed: req.body.tasksProgressed || [],
    newEnvironments: req.body.newEnvironments || [],
    challenges: req.body.challenges || [],
    victories: req.body.victories || [],
    nextWeekFocus: req.body.nextWeekFocus,
    createdAt: new Date().toISOString()
  };

  data.weeklyReports.unshift(newReport);
  writeData(data);
  res.json({ success: true, report: newReport });
});

// Initialize and start server
initializeDataFile();

app.listen(PORT, () => {
  console.log(`\n🐕 Gypsy Service Dog Training App Running! 🐕`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📍 Server: http://localhost:${PORT}`);
  console.log(`🎯 Status: Ready for training tracking`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
});
