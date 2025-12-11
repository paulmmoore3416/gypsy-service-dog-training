const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// Create dist directory
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Read training data
const dataPath = path.join(__dirname, 'training-data.json');
let data = {
  trainingLogs: [],
  weeklyReports: [],
  tasks: [],
  milestones: {}
};

if (fs.existsSync(dataPath)) {
  data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

// Guide sections to render
const guideSections = [
  'introduction',
  'understanding-pitbull',
  'requirements',
  'foundation',
  'advanced',
  'task-training',
  'public-access',
  'veteran-tasks',
  'behavioral',
  'schedule',
  'training-log-system',
  'motivation',
  'task-matrix',
  'distraction-proofing',
  'emergency',
  'heat-cycle',
  'community',
  'resources-guide'
];

// Function to render a page
function renderPage(templatePath, outputPath, pageData) {
  try {
    const html = ejs.renderFile(templatePath, pageData, (err, str) => {
      if (err) {
        console.error(`Error rendering ${templatePath}:`, err);
        return;
      }

      // Write to dist
      const fullOutputPath = path.join(distDir, outputPath);
      const outputDir = path.dirname(fullOutputPath);

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      fs.writeFileSync(fullOutputPath, str);
      console.log(`✅ Generated: ${outputPath}`);
    });
  } catch (error) {
    console.error(`Error rendering ${templatePath}:`, error);
  }
}

// Copy public assets
function copyAssets() {
  const publicDir = path.join(__dirname, 'public');
  const distPublicDir = path.join(distDir);

  // Copy CSS
  const cssDir = path.join(publicDir, 'css');
  const distCssDir = path.join(distPublicDir, 'css');
  if (!fs.existsSync(distCssDir)) {
    fs.mkdirSync(distCssDir, { recursive: true });
  }
  fs.readdirSync(cssDir).forEach(file => {
    fs.copyFileSync(
      path.join(cssDir, file),
      path.join(distCssDir, file)
    );
  });

  // Copy JS
  const jsDir = path.join(publicDir, 'js');
  const distJsDir = path.join(distPublicDir, 'js');
  if (!fs.existsSync(distJsDir)) {
    fs.mkdirSync(distJsDir, { recursive: true });
  }
  fs.readdirSync(jsDir).forEach(file => {
    fs.copyFileSync(
      path.join(jsDir, file),
      path.join(distJsDir, file)
    );
  });

  console.log('✅ Copied CSS and JS assets');
}

// Build all pages
console.log('🚀 Building static site...\n');

// Copy assets first
copyAssets();

// Base URL for GitHub Pages (will be /gypsy-service-dog-training)
const baseUrl = '/gypsy-service-dog-training';

// Render main pages
renderPage(
  path.join(__dirname, 'views', 'index.ejs'),
  'index.html',
  { page: 'dashboard', data, baseUrl }
);

renderPage(
  path.join(__dirname, 'views', 'training-log.ejs'),
  'training-log.html',
  { page: 'training-log', data, baseUrl }
);

renderPage(
  path.join(__dirname, 'views', 'tasks.ejs'),
  'tasks.html',
  { page: 'tasks', data, baseUrl }
);

renderPage(
  path.join(__dirname, 'views', 'milestones.ejs'),
  'milestones.html',
  { page: 'milestones', data, baseUrl }
);

renderPage(
  path.join(__dirname, 'views', 'resources.ejs'),
  'resources.html',
  { page: 'resources', data, baseUrl }
);

renderPage(
  path.join(__dirname, 'views', 'analytics.ejs'),
  'analytics.html',
  { page: 'analytics', data, baseUrl }
);

renderPage(
  path.join(__dirname, 'views', 'certificates.ejs'),
  'certificates.html',
  { page: 'certificates', data, baseUrl }
);

// Render guide pages
guideSections.forEach(section => {
  renderPage(
    path.join(__dirname, 'views', 'guide.ejs'),
    `guide/${section}.html`,
    { page: 'guide', section, data, baseUrl }
  );
});

// Create a simple redirect for /guide to /guide/introduction
fs.writeFileSync(
  path.join(distDir, 'guide.html'),
  `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="0; url=guide/introduction.html">
  <title>Redirecting...</title>
</head>
<body>
  <p>Redirecting to <a href="guide/introduction.html">Training Guide</a>...</p>
</body>
</html>`
);

console.log('\n✅ Static site built successfully in ./dist/');
console.log('📦 Ready for GitHub Pages deployment!');
