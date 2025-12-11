// Tasks JavaScript

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('task-form');
  if (form) {
    form.addEventListener('submit', handleTaskSubmit);
  }
});

function showAddTaskForm() {
  const form = document.getElementById('add-task-form');
  if (form) {
    form.style.display = 'block';
    form.scrollIntoView({ behavior: 'smooth' });
  }
}

function hideAddTaskForm() {
  const form = document.getElementById('add-task-form');
  if (form) {
    form.style.display = 'none';
    document.getElementById('task-form').reset();
  }
}

async function handleTaskSubmit(e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById('task-name').value,
    description: document.getElementById('task-description').value,
    difficulty: document.getElementById('task-difficulty').value,
    startDate: document.getElementById('task-start-date').value,
    notes: document.getElementById('task-notes').value,
    progress: 0,
    status: 'not-started'
  };

  try {
    const response = await fetch('/api/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (result.success) {
      window.gypsyApp.showMessage('Task added successfully! 🎯');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      window.gypsyApp.showError('Failed to add task. Please try again.');
    }
  } catch (error) {
    console.error('Error adding task:', error);
    window.gypsyApp.showError('An error occurred. Please try again.');
  }
}

async function updateTaskProgress(taskId, progress) {
  try {
    const response = await fetch(`/api/task/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ progress: parseInt(progress) })
    });

    const result = await response.json();

    if (result.success) {
      // Update the progress bar
      const taskCard = document.querySelector(`[data-task-id="${taskId}"]`);
      if (taskCard) {
        const progressBar = taskCard.querySelector('.progress-fill');
        const progressLabel = taskCard.querySelector('.task-progress label');
        if (progressBar) progressBar.style.width = `${progress}%`;
        if (progressLabel) progressLabel.textContent = `Progress: ${progress}%`;
      }

      // Show brief success message
      const message = document.createElement('div');
      message.textContent = '✓ Progress updated';
      message.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #06d6a0; color: white; padding: 10px 20px; border-radius: 8px; z-index: 1000;';
      document.body.appendChild(message);
      setTimeout(() => message.remove(), 2000);
    }
  } catch (error) {
    console.error('Error updating progress:', error);
    window.gypsyApp.showError('Failed to update progress.');
  }
}

async function updateTaskStatus(taskId, status) {
  try {
    const response = await fetch(`/api/task/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: status })
    });

    const result = await response.json();

    if (result.success) {
      window.gypsyApp.showMessage('Task status updated! 🔄');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      window.gypsyApp.showError('Failed to update status. Please try again.');
    }
  } catch (error) {
    console.error('Error updating status:', error);
    window.gypsyApp.showError('An error occurred. Please try again.');
  }
}

async function deleteTask(taskId) {
  if (!window.gypsyApp.confirmDelete('this task')) {
    return;
  }

  try {
    const response = await fetch(`/api/task/${taskId}`, {
      method: 'DELETE'
    });

    const result = await response.json();

    if (result.success) {
      window.gypsyApp.showMessage('Task deleted successfully');
      const taskCard = document.querySelector(`[data-task-id="${taskId}"]`);
      if (taskCard) {
        taskCard.style.opacity = '0';
        taskCard.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
          taskCard.remove();
        }, 300);
      }
    } else {
      window.gypsyApp.showError('Failed to delete task. Please try again.');
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    window.gypsyApp.showError('An error occurred. Please try again.');
  }
}

// Add suggested task
async function addSuggestedTask(taskName, difficulty) {
  const descriptions = {
    'Deep Pressure Therapy': 'Applies calming pressure to handler\'s lap, chest, or legs during anxiety or panic attacks',
    'Nightmare Interruption': 'Detects distress during sleep and wakes handler with pawing, licking, or nudging',
    'Crowd Control': 'Positions between handler and strangers to create physical barrier and personal space',
    'Room Clearing': 'Enters rooms first and checks spaces before handler enters to reduce hypervigilance',
    'Grounding': 'Provides persistent tactile stimulation during dissociation, flashbacks, or panic attacks',
    'Medication Reminder': 'Alerts handler at scheduled times to take medication by bringing pouch or nudging',
    'Mobility Support': 'Provides counterbalance and bracing assistance for balance issues or standing from seated position',
    'Item Retrieval': 'Retrieves and brings medication, phone, keys, or dropped objects to handler'
  };

  const formData = {
    name: taskName,
    description: descriptions[taskName] || '',
    difficulty: difficulty,
    startDate: new Date().toISOString().split('T')[0],
    notes: 'Task added from suggestions. Review training guide for detailed steps.',
    progress: 0,
    status: 'not-started'
  };

  try {
    const response = await fetch('/api/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (result.success) {
      window.gypsyApp.showMessage(`"${taskName}" added to your training plan! 🎯`);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      window.gypsyApp.showError('Failed to add task. Please try again.');
    }
  } catch (error) {
    console.error('Error adding task:', error);
    window.gypsyApp.showError('An error occurred. Please try again.');
  }
}
