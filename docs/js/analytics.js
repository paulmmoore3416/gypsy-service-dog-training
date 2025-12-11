// Analytics JavaScript - Charts and Data Visualization

let charts = {};

function initializeAnalytics(data) {
  calculateSummaryStats(data);
  createProgressChart(data);
  createHoursChart(data);
  createSuccessChart(data);
  createActivityCalendar(data);
}

function calculateSummaryStats(data) {
  // Total days training
  const uniqueDates = new Set(data.trainingLogs.map(log => log.date));
  document.getElementById('total-days').textContent = uniqueDates.size;

  // Total hours
  const totalHours = data.weeklyReports.reduce((sum, report) =>
    sum + (parseFloat(report.totalTrainingHours) || 0), 0);
  document.getElementById('total-hours').textContent = totalHours.toFixed(1);

  // Average success rate
  const successRates = [];
  data.trainingLogs.forEach(log => {
    if (log.taskTraining && log.taskTraining.successRate) {
      successRates.push(parseFloat(log.taskTraining.successRate));
    }
  });
  const avgSuccess = successRates.length > 0
    ? (successRates.reduce((a, b) => a + b, 0) / successRates.length).toFixed(0)
    : 0;
  document.getElementById('avg-success').textContent = avgSuccess + '%';

  // Tasks completed
  const completedTasks = data.tasks.filter(t => t.status === 'completed').length;
  document.getElementById('tasks-completed').textContent = completedTasks;
}

function createProgressChart(data) {
  const ctx = document.getElementById('progressChart');
  if (!ctx) return;

  charts.progress = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: [
        'Foundation Phase',
        'Advanced Obedience',
        'Task Training',
        'Public Access',
        'Overall Readiness'
      ],
      datasets: [{
        label: 'Current Progress',
        data: [
          data.progressData.foundationPhase || 0,
          data.progressData.advancedObedience || 0,
          data.progressData.taskTraining || 0,
          data.progressData.publicAccess || 0,
          calculateOverallProgress(data.progressData)
        ],
        backgroundColor: 'rgba(44, 90, 160, 0.2)',
        borderColor: 'rgba(44, 90, 160, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(44, 90, 160, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(44, 90, 160, 1)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 20
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Training Phase Completion (%)',
          font: {
            size: 16,
            weight: 'bold'
          }
        }
      }
    }
  });
}

function createHoursChart(data) {
  const ctx = document.getElementById('hoursChart');
  if (!ctx) return;

  // Get last 8 weeks of data
  const weeklyData = data.weeklyReports.slice(0, 8).reverse();

  charts.hours = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: weeklyData.map(r => new Date(r.weekOf).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
      datasets: [{
        label: 'Training Hours',
        data: weeklyData.map(r => parseFloat(r.totalTrainingHours) || 0),
        backgroundColor: 'rgba(6, 214, 160, 0.7)',
        borderColor: 'rgba(6, 214, 160, 1)',
        borderWidth: 1
      }, {
        label: 'Exercise Hours',
        data: weeklyData.map(r => parseFloat(r.totalExerciseHours) || 0),
        backgroundColor: 'rgba(255, 209, 102, 0.7)',
        borderColor: 'rgba(255, 209, 102, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Hours'
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        title: {
          display: true,
          text: 'Weekly Training & Exercise Hours',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      }
    }
  });
}

function createSuccessChart(data) {
  const ctx = document.getElementById('successChart');
  if (!ctx) return;

  const tasks = data.tasks.filter(t => t.progress > 0);

  charts.success = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: tasks.map(t => t.name),
      datasets: [{
        data: tasks.map(t => t.progress || 0),
        backgroundColor: [
          'rgba(6, 214, 160, 0.8)',
          'rgba(44, 90, 160, 0.8)',
          'rgba(230, 57, 70, 0.8)',
          'rgba(255, 209, 102, 0.8)',
          'rgba(168, 218, 220, 0.8)',
          'rgba(29, 53, 87, 0.8)'
        ],
        borderColor: '#fff',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          position: 'right'
        },
        title: {
          display: true,
          text: 'Task Progress Distribution',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.label + ': ' + context.parsed + '%';
            }
          }
        }
      }
    }
  });
}

function createActivityCalendar(data) {
  const calendar = document.getElementById('activityCalendar');
  if (!calendar) return;

  // Create a simple activity heatmap for the last 90 days
  const today = new Date();
  const days = 90;
  const activityMap = {};

  // Count activities per day
  data.trainingLogs.forEach(log => {
    const date = log.date;
    activityMap[date] = (activityMap[date] || 0) + 1;
  });

  let html = '<div class="calendar-grid">';

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const count = activityMap[dateStr] || 0;

    const intensity = count === 0 ? 'none' : count === 1 ? 'low' : count === 2 ? 'medium' : 'high';
    const tooltip = `${date.toLocaleDateString()}: ${count} sessions`;

    html += `<div class="calendar-day ${intensity}" title="${tooltip}" data-date="${dateStr}"></div>`;
  }

  html += '</div>';
  html += '<div class="calendar-legend">';
  html += '<span>Less</span>';
  html += '<div class="legend-item none"></div>';
  html += '<div class="legend-item low"></div>';
  html += '<div class="legend-item medium"></div>';
  html += '<div class="legend-item high"></div>';
  html += '<span>More</span>';
  html += '</div>';

  calendar.innerHTML = html;
}

function calculateOverallProgress(progressData) {
  const values = [
    progressData.foundationPhase || 0,
    progressData.advancedObedience || 0,
    progressData.taskTraining || 0,
    progressData.publicAccess || 0
  ];
  return Math.round(values.reduce((a, b) => a + b, 0) / 4);
}

// Export functions
function exportToPDF() {
  window.print();
}

function exportToCSV() {
  // Simple CSV export of training logs
  const logs = window.gypsyData.trainingLogs;
  let csv = 'Date,Session,Exercise Duration,Task,Success Rate,Notes\n';

  logs.forEach(log => {
    const row = [
      log.date,
      log.session,
      log.exercise?.duration || '',
      log.taskTraining?.task || '',
      log.taskTraining?.successRate || '',
      (log.notes || '').replace(/,/g, ';')
    ];
    csv += row.join(',') + '\n';
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `gypsy-training-data-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);

  window.gypsyApp.showMessage('CSV exported successfully! 📊');
}

function printCharts() {
  window.print();
}

// Store data globally for export
window.gypsyData = {};
