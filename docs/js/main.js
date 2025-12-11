// Main JavaScript for Gypsy Service Dog Training App

// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
  // Tab switching
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-tab');

      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      const activeContent = document.getElementById(`${tabName}-tab`);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });

  // Success rate coloring
  colorSuccessRates();

  // Initialize tooltips if needed
  initializeTooltips();
});

// Color code success rates
function colorSuccessRates() {
  const successRates = document.querySelectorAll('.success-rate');
  successRates.forEach(rate => {
    const value = parseInt(rate.getAttribute('data-rate'));
    if (value >= 90) {
      rate.style.background = '#06d6a0';
      rate.style.color = 'white';
    } else if (value >= 70) {
      rate.style.background = '#ffd166';
      rate.style.color = '#264653';
    } else {
      rate.style.background = '#ef476f';
      rate.style.color = 'white';
    }
  });
}

// Initialize tooltips (if you add them)
function initializeTooltips() {
  // Placeholder for tooltip initialization
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Show success message
function showMessage(message, type = 'success') {
  const messageDiv = document.createElement('div');
  messageDiv.className = `alert alert-${type}`;
  messageDiv.style.position = 'fixed';
  messageDiv.style.top = '100px';
  messageDiv.style.right = '20px';
  messageDiv.style.zIndex = '1000';
  messageDiv.style.minWidth = '300px';
  messageDiv.style.boxShadow = '0 10px 15px rgba(0,0,0,0.2)';
  messageDiv.innerHTML = `<strong>${message}</strong>`;

  document.body.appendChild(messageDiv);

  setTimeout(() => {
    messageDiv.style.opacity = '0';
    messageDiv.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      document.body.removeChild(messageDiv);
    }, 500);
  }, 3000);
}

// Show error message
function showError(message) {
  showMessage(message, 'warning');
}

// Confirm delete action
function confirmDelete(itemName) {
  return confirm(`Are you sure you want to delete "${itemName}"? This action cannot be undone.`);
}

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// Calculate progress percentage
function calculateProgress(current, total) {
  return Math.round((current / total) * 100);
}

// Export functions for use in other files
window.gypsyApp = {
  showMessage,
  showError,
  confirmDelete,
  formatDate,
  calculateProgress
};
