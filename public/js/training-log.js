// Training Log JavaScript

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('training-log-form');
  if (form) {
    form.addEventListener('submit', handleLogSubmit);
  }
});

async function handleLogSubmit(e) {
  e.preventDefault();

  const formData = {
    date: document.getElementById('date').value,
    session: document.getElementById('session').value,
    exercise: {
      duration: document.getElementById('exercise-duration').value,
      type: document.getElementById('exercise-type').value,
      energyLevel: document.getElementById('energy-level').value
    },
    taskTraining: {
      task: document.getElementById('task-name').value,
      duration: document.getElementById('task-duration').value,
      successRate: document.getElementById('task-success').value,
      challenges: document.getElementById('task-challenges').value,
      breakthroughs: document.getElementById('task-breakthroughs').value
    },
    gypsyState: {
      focus: document.getElementById('focus-level').value,
      energy: document.getElementById('gypsy-energy').value
    },
    notes: document.getElementById('notes').value
  };

  try {
    const response = await fetch('/api/training-log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (result.success) {
      window.gypsyApp.showMessage('Training log saved successfully! 🎉');
      setTimeout(() => {
        window.location.href = '/training-log';
      }, 1500);
    } else {
      window.gypsyApp.showError('Failed to save training log. Please try again.');
    }
  } catch (error) {
    console.error('Error saving log:', error);
    window.gypsyApp.showError('An error occurred. Please try again.');
  }
}

async function deleteLog(logId) {
  if (!window.gypsyApp.confirmDelete('this training log')) {
    return;
  }

  try {
    const response = await fetch(`/api/training-log/${logId}`, {
      method: 'DELETE'
    });

    const result = await response.json();

    if (result.success) {
      window.gypsyApp.showMessage('Training log deleted successfully');
      const logCard = document.querySelector(`[data-log-id="${logId}"]`);
      if (logCard) {
        logCard.style.opacity = '0';
        logCard.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
          logCard.remove();
        }, 300);
      }
    } else {
      window.gypsyApp.showError('Failed to delete log. Please try again.');
    }
  } catch (error) {
    console.error('Error deleting log:', error);
    window.gypsyApp.showError('An error occurred. Please try again.');
  }
}

function showWeeklyReportForm() {
  // Create a modal or inline form for weekly report
  const form = `
    <div class="form-card" id="weekly-report-form">
      <h3>Add Weekly Report</h3>
      <form id="weekly-form">
        <div class="form-group">
          <label for="week-of">Week Of</label>
          <input type="date" id="week-of" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="training-hours">Total Training Hours</label>
            <input type="number" id="training-hours" min="0" step="0.5">
          </div>
          <div class="form-group">
            <label for="exercise-hours">Total Exercise Hours</label>
            <input type="number" id="exercise-hours" min="0" step="0.5">
          </div>
        </div>
        <div class="form-group">
          <label for="victories">Victories (one per line)</label>
          <textarea id="victories" rows="3"></textarea>
        </div>
        <div class="form-group">
          <label for="challenges">Challenges (one per line)</label>
          <textarea id="challenges" rows="3"></textarea>
        </div>
        <div class="form-group">
          <label for="next-focus">Next Week's Focus</label>
          <textarea id="next-focus" rows="2"></textarea>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">Save Report</button>
          <button type="button" class="btn btn-secondary" onclick="closeWeeklyReportForm()">Cancel</button>
        </div>
      </form>
    </div>
  `;

  const container = document.querySelector('#weekly-tab');
  container.insertAdjacentHTML('afterbegin', form);

  document.getElementById('weekly-form').addEventListener('submit', handleWeeklyReportSubmit);
}

async function handleWeeklyReportSubmit(e) {
  e.preventDefault();

  const victories = document.getElementById('victories').value.split('\n').filter(v => v.trim());
  const challenges = document.getElementById('challenges').value.split('\n').filter(c => c.trim());

  const formData = {
    weekOf: document.getElementById('week-of').value,
    totalTrainingHours: parseFloat(document.getElementById('training-hours').value) || 0,
    totalExerciseHours: parseFloat(document.getElementById('exercise-hours').value) || 0,
    victories: victories,
    challenges: challenges,
    nextWeekFocus: document.getElementById('next-focus').value
  };

  try {
    const response = await fetch('/api/weekly-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (result.success) {
      window.gypsyApp.showMessage('Weekly report saved successfully! 📊');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      window.gypsyApp.showError('Failed to save report. Please try again.');
    }
  } catch (error) {
    console.error('Error saving report:', error);
    window.gypsyApp.showError('An error occurred. Please try again.');
  }
}

function closeWeeklyReportForm() {
  const form = document.getElementById('weekly-report-form');
  if (form) {
    form.remove();
  }
}
