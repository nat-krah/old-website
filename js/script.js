// =============================
// LIGHTBOX (Image Enlarge)
// =============================
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('imageOverlay');
  const overlayImage = document.getElementById('overlayImage');
  const enlargeableImages = document.querySelectorAll('.enlargeable');

  // Ensure overlay hidden at load
  overlay.style.display = 'none';

  // Open overlay
  enlargeableImages.forEach(img => {
    img.addEventListener('click', () => {
      overlay.style.display = 'flex';
      overlayImage.src = img.src;
      document.body.style.overflow = 'hidden'; // Lock scroll
    });
  });

  // Close overlay
  function closeOverlay() {
    overlay.style.display = 'none';
    overlayImage.src = '';
    document.body.style.overflow = ''; // Restore scroll
  }
  overlay.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeOverlay();
  });
});


// =============================
// PROJECT SLIDESHOWS
// =============================
document.addEventListener('DOMContentLoaded', () => {
  const slideshows = [
    {
      id: 'cubesat',
      images: [
        '../img/projects/cubesat/spex-hab-space.png',
        '../img/projects/cubesat/spex-hab-ground.jpg',
        '../img/projects/cubesat/cubesat-at-imagine.jpg',
        '../img/projects/cubesat/geiger-scintillating.JPG'
      ],
      captions: [
        "Image from SPEX High Altitude Balloon",
        "Launching High Altitude Balloon",
        "Cubesat at Imagine RIT",
        "Custom scintillating and geiger counter run from an Arduino"
      ]
    },
    {
      id: 'all-seeing-eye',
      images: [
        'https://placehold.co/400x400',
        '../img/projects/all-seeing-eye/test-eye.JPG',
        '../img/projects/all-seeing-eye/old-eye.JPG'
      ],
      captions: [
        "All Seeing Eye at Imagine RIT",
        "Testing new core",
        "Old version of the tentical"
      ]
    },
    {
      id: 'website',
      images: [
        '../img/projects/website-images/homepage.png',
        '../img/projects/website-images/snake.png',
        '../img/projects/website-images/code.png'
      ],
      captions: [
        "Homepage Screenshot",
        "Snake game I coded in js",
        "Website code"
      ]
    },
    {
      id: 'vex-over-under',
      images: [
        '../img/projects/vex-over-under/red-leds.jpg',
        '../img/projects/vex-over-under/v2-blue-leds.jpg',
        '../img/projects/vex-over-under/.jpg',
        '../img/projects/vex-over-under/.jpg'

      ],
      captions: [
        "Showcasing v1 with red LEDs",
        "v2 about to start the autonomous period",
        "Cad model of v2",
        "Cad model of v1"
      ]
    },
    {
      id: 'floating-turbine',
      images: [
        '../img/projects/wind-turbine/windstorm.jpg',
        '../img/projects/wind-turbine/prototype.jpg',
        '../img/projects/wind-turbine/base-in-car.JPG',

      ],
      captions: [
        "Wind turbine competing at UMaine's Windstorm Challenge",
        "Wind Turbine Prototype",
        "Getting ready for the competition!",
      ]
    },
    {
      id: 'spin-up',
      images: [
        '../img/projects/vex-spin-up/disk.jpeg',
        '../img/projects/vex-spin-up/string.jpg',

      ],
      captions: [
        "Robot launching disks",
        "Robot launching string",
      ]
    }
  ];

  let activeIntervals = {};   // Track intervals per slideshow
  let imageIndexes = {};      // Track current index per slideshow

  slideshows.forEach(slideshow => {
    const project = document.getElementById(slideshow.id);
    const img = project.querySelector('.slideshow');
    const caption = project.querySelector('.caption'); // <- NEED a .caption element in HTML

    let index = 0;
    imageIndexes[slideshow.id] = 0;

    // Start slideshow
    function startSlideshow() {
      if (activeIntervals[slideshow.id]) return; // already running

      activeIntervals[slideshow.id] = setInterval(() => {
        // Fade out image
        img.classList.add('fade-out');

        setTimeout(() => {
          // Next index
          index = (index + 1) % slideshow.images.length;
          img.src = slideshow.images[index];
          imageIndexes[slideshow.id] = index;

          // Scramble caption
          if (caption) scrambleText(caption, slideshow.captions[index]);

          // Fade back in
          img.classList.remove('fade-out');
        }, 400); // matches CSS fade time
      }, 2200); // slide interval
    }

    // Stop slideshow
    function stopSlideshow() {
      clearInterval(activeIntervals[slideshow.id]);
      activeIntervals[slideshow.id] = null;
    }

    // Start slideshow on project hover
    project.addEventListener('mouseenter', () => {
      index = imageIndexes[slideshow.id];
      startSlideshow();
    });

    // Stop slideshow when leaving project
    project.addEventListener('mouseleave', () => {
      stopSlideshow();
    });

    // Pause slideshow when hovering image
    img.addEventListener('mouseenter', stopSlideshow);
    img.addEventListener('mouseleave', startSlideshow);
    
  });
});

// =============================
// FUN MODE TOGGLE
// =============================
const toggleFunBtn = document.getElementById('toggleFun');
const snakeLink = document.getElementById('snake-link');
const snakeHint = document.getElementById('snake-hint');
const colorWrapper = document.querySelector('.color-wrapper');
const personalSection = document.getElementById('personal');
const projectSection = document.getElementById('projects');

// Hide elements on page load
snakeLink.style.display = 'none';
snakeHint.style.display = 'none';
colorWrapper.style.display = 'none';
personalSection.style.display = 'none';

// Grab about section title and text
const aboutTitle = document.querySelector('#about h2'); 
const aboutText = document.querySelector('#about p'); 

// Default content
const defaultAbout = {
  title: "About",
  text: "Hi!\nI'm Nat, a second year at RIT studing mechanical, aerospace, and computer engineering. For as long as I can remember I've loved putting things together. From simple legos in Elementery school to speocalizing in designing complex parts for a non-uniform robotic arm. My life has been a series of projects, and this website is an attempt to document there highlights."
};

// Fun content
const funAbout = {
  title: "About-Personal",
  text: "While projects are a lot of fun and a huge proponent in my life, they are not everything. I made this section to add a little personality to the website and showcase some of the stuff I do outside of strict engineering. Feel free to look around, explore. You might find something cool or unexpected."
};

// Replace text with scramble effect
function setAboutContent(content) {
  scrambleText(aboutTitle, content.title);
  scrambleText(aboutText, content.text);
}

// Update Fun button toggle
toggleFunBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const isHidden = snakeLink.style.display === 'none';

  if (isHidden){
    snakeLink.style.display = 'block';
    snakeHint.style.display = 'block';
    colorWrapper.style.display = 'flex';
    personalSection.style.display = 'flex';
    projectSection.style.display = 'none';

    // Change About content (fun)
    setAboutContent(funAbout);

  } else{
    snakeLink.style.display = 'none';
    snakeHint.style.display = 'none';
    colorWrapper.style.display = 'none';
    personalSection.style.display = 'none';
    projectSection.style.display = 'block';

    // Reset About content (default)
    setAboutContent(defaultAbout);
  }
});


// Text scramble function
function scrambleText(element, newText, duration = 600) {
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  let frame = 0;
  const totalFrames = Math.round(duration / 30);
  const oldText = element.innerText;
  const length = Math.max(oldText.length, newText.length);

  const interval = setInterval(() => {
    let output = "";
    for (let i = 0; i < length; i++) {
      if (i < newText.length && Math.random() < frame / totalFrames) {
        output += newText[i]; // reveal correct char
      } else {
        output += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    element.innerText = output;

    frame++;
    if (frame > totalFrames) {
      clearInterval(interval);
      element.innerText = newText; // ensure final text is correct
    }
  }, 30);
}



// =============================
// COLOR PICKER + MODE SWITCH
// =============================
document.addEventListener('DOMContentLoaded', () => {
  const colorBtn = document.getElementById('colorBtn');
  const colorDropdown = document.getElementById('colorDropdown');
  const lightModeToggle = document.getElementById('lightModeToggle');
  const presetColors = document.querySelectorAll('.color-preset');
  const customColorPicker = document.getElementById('customColorPicker');
  const lightElems = document.querySelectorAll('.dark');
  const darkElems = document.querySelectorAll('.light');

  // Toggle dropdown
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

  // Load saved mode & color
  const savedMode = localStorage.getItem('mode') || 'dark';
  const savedColor = localStorage.getItem('primaryColor') || '#007acc';

  function applyColor(mode, color) {
    document.documentElement.setAttribute('data-theme', mode);
    document.documentElement.style.setProperty('--primary-color', color);
    lightModeToggle.checked = (mode === 'dark');
    customColorPicker.value = color;

    // Show/hide light/dark elems
    if (mode === 'light') {
      lightElems.forEach(el => el.style.display = 'block');
      darkElems.forEach(el => el.style.display = 'none');
    } else {
      darkElems.forEach(el => el.style.display = 'block');
      lightElems.forEach(el => el.style.display = 'none');
    }
  }

  applyColor(savedMode, savedColor);

  // Toggle mode
  lightModeToggle.addEventListener('change', () => {
    const mode = lightModeToggle.checked ? 'dark' : 'light';
    localStorage.setItem('mode', mode);
    applyColor(mode, localStorage.getItem('primaryColor') || '#007acc');
  });

  // Preset colors
  presetColors.forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.getAttribute('data-color');
      localStorage.setItem('primaryColor', color);
      applyColor(localStorage.getItem('mode') || 'dark', color);
    });
  });

  // Custom color
  customColorPicker.addEventListener('input', () => {
    const color = customColorPicker.value;
    localStorage.setItem('primaryColor', color);
    applyColor(localStorage.getItem('mode') || 'dark', color);
  });
});
