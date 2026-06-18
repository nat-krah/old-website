//Wait until DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
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

    // =============================
    // SLIDESHOWS
    // =============================

    const slideshows = [
        {
        id: 'cubesat',
        images: [
            '../img/projects/cubesat/cubesat-at-imagine.jpg',
            '../img/projects/cubesat/geiger-scintillating.JPG'
        ],
        captions: [
            "Cubesat at Imagine RIT",
            "Custom scintillating and geiger counter run from Arduino"
        ]
        },
        {
        id: 'all-seeing-eye',
        images: [
            '../img/projects/all-seeing-eye/current-eye.png',
            '../img/projects/all-seeing-eye/test-eye.JPG',
            '../img/projects/all-seeing-eye/old-eye.JPG'
        ],
        captions: [
            "All Seeing Eye At Maker Fair",
            "Testing new core",
            "Old All Seeing Eye"
        ]
        },
        {
        id: 'website',
        images: [
            '../img/projects/website-images/homepage.png',
            '../img/projects/website-images/code.png'
        ],
        captions: [
            "Homepage Screenshot",
            "Website code"
        ]
        },
        {
        id: 'vex-over-under',
        images: [
            '../img/projects/vex-over-under/red-leds.jpg',
            '../img/projects/vex-over-under/v2-blue-leds.jpg',

        ],
        captions: [
            "Showcasing v1 with red LEDs",
            "v2 about to start the autonomous period",
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
        id: 'balista',
        images: [
            '../img/mini-projects/balista/balista2.png',
            '../img/mini-projects/balista/balista1.png', 
            '../img/mini-projects/balista/engineeringDrawing.png'
        ],
        captions: [
            "Second iteration of the Balista",
            "First iteration of the Balista",
            "Assembly drawing"
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
            "Gameplay",
            "Landed Screen"
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
        const caption = project.querySelector('.caption');

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
            img.alt = slideshow.captions[index];
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


