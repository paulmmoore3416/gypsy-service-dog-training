// Milestones JavaScript

document.addEventListener('DOMContentLoaded', function() {
  loadMilestoneStates();
  updateAllProgress();

  // Add event listeners to all checkboxes
  const checkboxes = document.querySelectorAll('.milestone-checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', handleMilestoneChange);
  });
});

function handleMilestoneChange(e) {
  const checkbox = e.target;
  const phase = checkbox.getAttribute('data-phase');
  const milestone = checkbox.getAttribute('data-milestone');
  const isChecked = checkbox.checked;

  // Update parent item styling
  const item = checkbox.closest('.milestone-item');
  if (isChecked) {
    item.classList.add('completed');
  } else {
    item.classList.remove('completed');
  }

  // Save to localStorage
  saveMilestoneState(phase, milestone, isChecked);

  // Update progress
  updatePhaseProgress(phase);
  updateAllProgress();

  // Check for graduation
  checkGraduation();

  // Show brief message
  showMilestoneMessage(isChecked);
}

function saveMilestoneState(phase, milestone, isChecked) {
  const key = `milestone-${phase}-${milestone}`;
  localStorage.setItem(key, isChecked ? 'true' : 'false');
}

function loadMilestoneStates() {
  const checkboxes = document.querySelectorAll('.milestone-checkbox');
  checkboxes.forEach(checkbox => {
    const phase = checkbox.getAttribute('data-phase');
    const milestone = checkbox.getAttribute('data-milestone');
    const key = `milestone-${phase}-${milestone}`;
    const saved = localStorage.getItem(key);

    if (saved === 'true') {
      checkbox.checked = true;
      checkbox.closest('.milestone-item').classList.add('completed');
    }
  });
}

function updatePhaseProgress(phase) {
  const checkboxes = document.querySelectorAll(`.milestone-checkbox[data-phase="${phase}"]`);
  const total = checkboxes.length;
  const completed = Array.from(checkboxes).filter(cb => cb.checked).length;
  const percentage = Math.round((completed / total) * 100);

  const progressElement = document.getElementById(`${phase}-progress`);
  if (progressElement) {
    progressElement.textContent = percentage;
  }

  return percentage;
}

function updateAllProgress() {
  const phases = ['foundation', 'advanced', 'task', 'public', 'final'];
  const progressData = {};

  phases.forEach(phase => {
    const progress = updatePhaseProgress(phase);
    progressData[phase] = progress;
  });

  // Update dashboard progress if on dashboard
  if (window.location.pathname === '/') {
    updateDashboardProgress(progressData);
  }
}

async function updateDashboardProgress(progressData) {
  try {
    await fetch('/api/progress', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        foundationPhase: progressData.foundation || 0,
        advancedObedience: progressData.advanced || 0,
        taskTraining: progressData.task || 0,
        publicAccess: progressData.public || 0
      })
    });
  } catch (error) {
    console.error('Error updating dashboard progress:', error);
  }
}

function checkGraduation() {
  const finalCheckboxes = document.querySelectorAll('.milestone-checkbox[data-phase="final"]');
  const allCompleted = Array.from(finalCheckboxes).every(cb => cb.checked);

  const graduation = document.getElementById('graduation');
  if (graduation) {
    if (allCompleted) {
      graduation.style.display = 'block';
      graduation.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Celebration animation
      celebrateGraduation();
    } else {
      graduation.style.display = 'none';
    }
  }
}

function celebrateGraduation() {
  // Simple confetti effect using emoji
  const container = document.getElementById('graduation');
  const emojis = ['🎉', '🎊', '⭐', '🏆', '🐕‍🦺', '❤️', '🇺🇸'];

  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const emoji = document.createElement('div');
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}%;
        top: -50px;
        font-size: 2rem;
        animation: fall 3s linear;
        pointer-events: none;
        z-index: 1000;
      `;
      document.body.appendChild(emoji);

      setTimeout(() => emoji.remove(), 3000);
    }, i * 100);
  }

  // Add animation
  if (!document.getElementById('fall-animation')) {
    const style = document.createElement('style');
    style.id = 'fall-animation';
    style.textContent = `
      @keyframes fall {
        to {
          top: 100vh;
          transform: rotate(360deg);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

function showMilestoneMessage(isChecked) {
  const messages = [
    "Great progress! 🎯",
    "Keep it up! 🐕",
    "Excellent work! ⭐",
    "Gypsy is learning! 🎓",
    "One step closer! 🚀",
    "You're doing great! 💪"
  ];

  const message = document.createElement('div');
  message.textContent = isChecked ? messages[Math.floor(Math.random() * messages.length)] : 'Milestone unchecked';
  message.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${isChecked ? '#06d6a0' : '#a8dadc'};
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    z-index: 1000;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    animation: slideIn 0.3s ease;
  `;

  document.body.appendChild(message);

  setTimeout(() => {
    message.style.opacity = '0';
    message.style.transition = 'opacity 0.3s ease';
    setTimeout(() => message.remove(), 300);
  }, 2000);
}

// Add slide-in animation
if (!document.getElementById('slide-animation')) {
  const style = document.createElement('style');
  style.id = 'slide-animation';
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
}
