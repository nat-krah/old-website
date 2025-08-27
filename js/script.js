//Wait until DOM is loaded

//Specific to index.html
document.addEventListener('DOMContentLoaded', () => {
    // =============================
    // Fun Mode Toggle
    // =============================
    const toggleFunBtn = document.getElementById('toggleFun');
    const funItems = document.querySelectorAll('.fun-item');
    const noFun = document.querySelectorAll('.no-fun');
    const aboutHeader = document.querySelector('#about h2');
    const aboutText = document.querySelector('#about p');

    let funToggled = true;

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

    toggleFunBtn.addEventListener('click', function(e) {
        if (funToggled) {
            funItems.forEach(item => item.style.display = 'flex');
            noFun.forEach(item => item.style.display = 'none');
            scrambleText(aboutHeader, funAbout.title);
            scrambleText(aboutText, funAbout.text);

            funToggled = false;
        } else {
            funItems.forEach(item => item.style.display = 'none');
            noFun.forEach(item => item.style.display = 'flex');
            scrambleText(aboutHeader, defaultAbout.title);
            scrambleText(aboutText, defaultAbout.text);

            funToggled = true;
        }
    });
    
    // =============================
    // Dropdown + color code
    // =============================
    const colorBtn = document.getElementById('colorBtn');
    const colorWheel = document.getElementById('color-selector-img')
    const colorDropdown = document.getElementById('colorDropdown');
    const lightModeToggle = document.getElementById('lightModeToggle');
    const presetColors = document.querySelectorAll('.color-preset');
    const customColorPicker = document.getElementById('customColorPicker');
    const lightElems = document.querySelectorAll('.dark');
    const darkElems = document.querySelectorAll('.light');


    const savedMode = localStorage.getItem('mode');
    const savedColor = localStorage.getItem('primaryColor');
    applyColor(savedMode, savedColor); //Apply color on page laod

    
    // Toggle dropdown
    colorBtn.addEventListener('click', () => {
        const expanded = colorBtn.getAttribute('aria-expanded') === 'true';
        colorBtn.setAttribute('aria-expanded', String(!expanded));
        colorDropdown.hidden = !colorDropdown.hidden;
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!colorDropdown.contains(e.target) && e.target !== colorBtn && e.target !== colorWheel) {
            colorDropdown.hidden = true;
            colorBtn.setAttribute('aria-expanded', 'false');
        }
    });
    
    //Toggle light mode
    lightModeToggle.addEventListener('change',()=>{
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

    // =============================
    // Functions
    // =============================

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
});

//For all pages
document.addEventListener('DOMContentLoaded', () => {
    // =============================
    // SLIDESHOWS
    // =============================

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
            '../img/projects/wind-turbine/base-in-car.JPG'

        ],
        captions: [
            "Wind turbine competing at UMaine's Windstorm Challenge",
            "Wind Turbine Prototype",
            "Getting ready for the competition!"
        ]
        },
        {
        id: 'vex-spin-up',
        images: [
            '../img/projects/vex-spin-up/disk.jpeg',
            '../img/projects/vex-spin-up/string.jpg'

        ],
        captions: [
            "Robot launching disks",
            "Robot launching string"
        ]
        },


        {
        id: 'snake',
        images: [
            '../img/mini-projects/snake/intro-sequence.png',
            '../img/mini-projects/snake/gameplay.png'
        ],
        captions: [
            "Intro Sequence",
            "Game being played"
        ]
        },{
        id: 'arch-linux',
        images: [
            '../img/mini-projects/arch-linux/fastfetch.png',
            '../img/mini-projects/arch-linux/desktop.png'
        ],
        captions: [
            "Basic Fastfetch showing Arch logo and laptop specs",
            "Hyprland desktop"
        ]
        },{
        id: 'lunar-lander',
        images: [
            '../img/mini-projects/lunar-lander/playing.png',
            '../img/mini-projects/lunar-lander/landed.png'
        ],
        captions: [
            "Basic Fastfetch showing Arch logo and laptop specs",
            "Hyprland desktop"
        ]
        },{
        id: 'chime-machine',
        images: [
            '../img/mini-projects/chime-machine/final-chime.JPG',
            '../img/mini-projects/chime-machine/frame-chime.JPG'
        ],
        captions: [
            "Final Chime Machine",
            "Chime Machine frame"
        ]
        },{
        id: 'vertical-metal-organizer',
        images: [
            '../img/mini-projects',
            '../img/mini-projects',
            '../img/mini-projects'
        ],
        captions: [
            "Vertical metal organizers",
            "Sorting system before vertical metal organizers",
            "Constructing vertical metal organizers"
        ]
        },{
        id: 'beach-cleanup',
        images: [
            '../img/mini-projects/sandy/fronISO.png',
            '../img/mini-projects/sandy/backISO.png'
        ],
        captions: [
            "CAD view 1",
            "CAD view 2"
        ]
        }
    ]

    let activeIntervals = {};   // Track intervals per slideshow
    let imageIndexes = {};      // Track current index per slideshow

    slideshows.forEach(slideshow => {
        const project = document.getElementById(slideshow.id);

        //If the project doesn't exist in the current html file, break out of the function
        if(project === null){
            return;
        }

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


    // =============================
    // Image Enlarge
    // =============================
    const overlay = document.getElementById('imageOverlay');
    const overlayImage = document.getElementById('overlayImage');
    const enlargeableImages = document.querySelectorAll('.enlargeable');

    overlay.style.display = 'none';

    //Open overlay on button click
    enlargeableImages.forEach(img =>{
        img.addEventListener('click', ()=>{
            overlay.style.display = 'flex';
            overlayImage.src = img.src;
            document.body.style.overflow = 'hidden';
        })
    })

    //Close overlay
    overlay.addEventListener('click', closeOverlay);
    document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeOverlay();
    });

    function closeOverlay(){
        overlay .style.display = 'none';
        overlayImage.src = '';
        document.body.style.overflow = '';
    }

   



    // =============================
    // Functions
    // =============================

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
});


