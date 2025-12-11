/**
 * Dark Mode Toggle Functionality
 * Manages dark mode state with localStorage persistence
 */

(function() {
  'use strict';

  // Get DOM elements
  const darkModeToggle = document.getElementById('darkModeToggle');
  const toggleIcon = darkModeToggle.querySelector('.toggle-icon');

  // Check for saved user preference, otherwise check system preference
  function getInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

  // Apply theme to document
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
      toggleIcon.textContent = '☀️';
      darkModeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
      document.body.classList.remove('dark-mode');
      toggleIcon.textContent = '🌙';
      darkModeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  // Toggle theme
  function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Apply new theme
    applyTheme(newTheme);

    // Save to localStorage
    localStorage.setItem('theme', newTheme);

    // Optional: Trigger custom event for other components
    const event = new CustomEvent('themeChanged', { detail: { theme: newTheme } });
    document.dispatchEvent(event);
  }

  // Initialize theme on page load
  function initializeTheme() {
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);
  }

  // Event listeners
  darkModeToggle.addEventListener('click', toggleTheme);

  // Keyboard accessibility
  darkModeToggle.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  });

  // Listen for system theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      // Only auto-update if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTheme);
  } else {
    initializeTheme();
  }

  // Export for debugging (optional)
  window.darkModeAPI = {
    getTheme: function() {
      return document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    },
    setTheme: function(theme) {
      applyTheme(theme);
      localStorage.setItem('theme', theme);
    },
    toggle: toggleTheme
  };

})();
