
//Fun! mode code
const toggleFunBtn = document.getElementById('toggleFun');
const snakeLink = document.getElementById('snake-link');
const snakeHint = document.getElementById('snake-hint');
const colorWrapper = document.querySelector('.color-wrapper');
const personalSection = document.getElementById('personal');
const projectSection = document.getElementById('projects');

// Hide on page load
snakeLink.style.display = 'none';
snakeHint.style.display = 'none';
colorWrapper.style.display = 'none';
personalSection.style.display = 'none';

toggleFunBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const isHidden = snakeLink.style.display === 'none';

  if (isHidden){
    snakeLink.style.display = 'block';
    snakeHint.style.display = 'block';
    colorWrapper.style.display = 'flex';
    personalSection.style.display = 'flex';
    projectSection.style.display = 'none';
  } else{
    snakeLink.style.display = 'none';
    snakeHint.style.display = 'none';
    colorWrapper.style.display = 'none';
    personalSection.style.display = 'none';
    projectSection.style.display = 'block';
  }
});

//Color code, uses user storage to save settings
document.addEventListener('DOMContentLoaded', () => {
  const colorBtn = document.getElementById('colorBtn');
  const colorDropdown = document.getElementById('colorDropdown');
  const lightModeToggle = document.getElementById('lightModeToggle');
  const presetColors = document.querySelectorAll('.color-preset');
  const customColorPicker = document.getElementById('customColorPicker');

  // Toggle dropdown visibility
  colorBtn.addEventListener('click', () => {
    const expanded = colorBtn.getAttribute('aria-expanded') === 'true';
    colorBtn.setAttribute('aria-expanded', String(!expanded));
    colorDropdown.hidden = !colorDropdown.hidden;
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!colorDropdown.contains(e.target) && e.target !== colorBtn) {
      colorDropdown.hidden = true;
      colorBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Load saved settings or defaults
  const savedMode = localStorage.getItem('mode') || 'dark';
  const savedColor = localStorage.getItem('primaryColor') || '#007acc';

  // Apply saved or default mode & color
  function applyColor(mode, color) {
    document.documentElement.setAttribute('data-theme', mode);
    document.documentElement.style.setProperty('--primary-color', color);
    lightModeToggle.checked = (mode === 'dark');
    customColorPicker.value = color;
  }

  applyColor(savedMode, savedColor);

  // Light mode toggle
  lightModeToggle.addEventListener('change', () => {
    const mode = lightModeToggle.checked ? 'dark' : 'light';
    localStorage.setItem('mode', mode);
    applyColor(mode, localStorage.getItem('primaryColor') || '#007acc');
  });

  // Preset colors click
  presetColors.forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.getAttribute('data-color');
      localStorage.setItem('primaryColor', color);
      applyColor(localStorage.getItem('mode') || 'dark', color);
    });
  });

  // Custom color picker change
  customColorPicker.addEventListener('input', () => {
    const color = customColorPicker.value;
    localStorage.setItem('primaryColor', color);
    applyColor(localStorage.getItem('mode') || 'dark', color);
  });
});