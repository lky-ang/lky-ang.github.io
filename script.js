// ===== Particles Background Animation =====
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = Math.random() > 0.5 ? '#00d9ff' : '#b537f2';
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

// Create particles
const particlesArray = [];
const numberOfParticles = 100;

function initParticles() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        // Connect particles
        for (let j = i + 1; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.strokeStyle = particlesArray[i].color;
                ctx.globalAlpha = 0.1 * (1 - distance / 100);
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
        }
    }

    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ===== Navigation Toggle (Mobile) =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Navbar Background on Scroll =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 217, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// ===== Section Reveal Animation =====
const sections = document.querySelectorAll('.section-reveal');

const revealSection = () => {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealSection);
revealSection(); // Initial check

// ===== Counter Animation for Stats =====
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

const animateCounter = () => {
    if (animated) return;

    const aboutSection = document.getElementById('about');
    const sectionTop = aboutSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight * 0.75) {
        animated = true;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };

            updateCounter();
        });
    }
};

window.addEventListener('scroll', animateCounter);

// ===== Publications Filter =====
const filterButtons = document.querySelectorAll('.filter-btn');
const publicationItems = document.querySelectorAll('.publication-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        publicationItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'grid';
                item.style.animation = 'fadeInUp 0.5s ease';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// ===== Video Player Control =====
const videoContainers = document.querySelectorAll('.video-container');

// Format time as M:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

videoContainers.forEach(container => {
    const video = container.querySelector('.project-video');
    const playBtn = container.querySelector('.play-btn');
    const overlay = container.querySelector('.video-overlay');
    const progressBar = container.querySelector('.progress-bar');
    const progressFilled = container.querySelector('.progress-filled');
    const videoTime = container.querySelector('.video-time');

    if (video && playBtn && overlay) {
        playBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 300);
            } else {
                video.pause();
                overlay.style.display = 'flex';
                setTimeout(() => {
                    overlay.style.opacity = '1';
                }, 10);
            }
        });

        // Toggle overlay on video click
        video.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                overlay.style.opacity = '0';
                overlay.style.display = 'none';
            } else {
                video.pause();
                overlay.style.display = 'flex';
                setTimeout(() => {
                    overlay.style.opacity = '1';
                }, 10);
            }
        });

        // Auto-hide overlay when video is playing
        video.addEventListener('play', () => {
            overlay.style.opacity = '0';
            container.classList.add('playing');
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 300);
        });

        video.addEventListener('pause', () => {
            overlay.style.display = 'flex';
            container.classList.remove('playing');
            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 10);
        });

        // Progress bar functionality
        if (progressBar && progressFilled && videoTime) {
            // Update progress bar as video plays
            const updateProgress = () => {
                if (video.duration && !isNaN(video.duration)) {
                    const percent = (video.currentTime / video.duration) * 100;
                    progressFilled.style.width = percent + '%';
                    videoTime.textContent = formatTime(video.currentTime) + ' / ' + formatTime(video.duration);
                }
            };

            video.addEventListener('timeupdate', updateProgress);

            // Update time display when metadata loads
            video.addEventListener('loadedmetadata', () => {
                if (video.duration && !isNaN(video.duration)) {
                    videoTime.textContent = '0:00 / ' + formatTime(video.duration);
                }
            });

            // Also try to update when video can play
            video.addEventListener('canplay', () => {
                if (video.duration && !isNaN(video.duration)) {
                    videoTime.textContent = '0:00 / ' + formatTime(video.duration);
                }
            });

            // Click on progress bar to seek
            progressBar.addEventListener('click', (e) => {
                if (video.duration && !isNaN(video.duration)) {
                    const rect = progressBar.getBoundingClientRect();
                    const percent = (e.clientX - rect.left) / rect.width;
                    video.currentTime = percent * video.duration;
                }
            });

            // Drag to seek
            let isDragging = false;

            progressBar.addEventListener('mousedown', (e) => {
                if (video.duration && !isNaN(video.duration)) {
                    isDragging = true;
                    const rect = progressBar.getBoundingClientRect();
                    const percent = (e.clientX - rect.left) / rect.width;
                    video.currentTime = percent * video.duration;
                }
            });

            document.addEventListener('mousemove', (e) => {
                if (isDragging && video.duration && !isNaN(video.duration)) {
                    const rect = progressBar.getBoundingClientRect();
                    let percent = (e.clientX - rect.left) / rect.width;
                    percent = Math.max(0, Math.min(1, percent));
                    video.currentTime = percent * video.duration;
                }
            });

            document.addEventListener('mouseup', () => {
                isDragging = false;
            });
        }
    }
});

// ===== Mouse Parallax Effect on Hero Section =====
const hero = document.querySelector('.hero');
const heroImage = document.querySelector('.hero-image');

hero.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const xPos = (clientX / innerWidth - 0.5) * 20;
    const yPos = (clientY / innerHeight - 0.5) * 20;

    heroImage.style.transform = `translate(${xPos}px, ${yPos}px)`;
});

// ===== Typing Effect (Optional Enhancement) =====
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

// ===== Active Nav Link Highlight =====
const navLinks = document.querySelectorAll('.nav-link');
const sectionElements = document.querySelectorAll('section[id]');

function highlightNavLink() {
    let currentSection = '';

    sectionElements.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===== Card Hover Glow Effect =====
const cards = document.querySelectorAll('.card-hover');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 217, 255, 0.2), transparent 50%)`;
        }
    });
});

// ===== Lazy Loading for Images =====
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===== Scroll to Top Button (in footer) =====
const scrollTopBtn = document.querySelector('.footer-links a[href="#home"]');

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Initialize all animations on page load =====
window.addEventListener('load', () => {
    // Trigger initial animations
    revealSection();
    highlightNavLink();

    console.log('Personal website loaded successfully! ✨');
});

// ===== Mouse Trail Effect (Optional Enhancement) =====
let mouseX = 0;
let mouseY = 0;
let trailX = 0;
let trailY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Create a subtle cursor trail
const trail = document.createElement('div');
trail.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 217, 255, 0.3), transparent);
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
`;
document.body.appendChild(trail);

function animateTrail() {
    trailX += (mouseX - trailX) * 0.1;
    trailY += (mouseY - trailY) * 0.1;

    trail.style.left = trailX - 10 + 'px';
    trail.style.top = trailY - 10 + 'px';

    requestAnimationFrame(animateTrail);
}

animateTrail();

// ===== Easter Egg: Konami Code =====
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiPattern.join('')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s infinite';

        // Add rainbow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            document.body.style.animation = '';
            style.remove();
        }, 5000);

        console.log('🎉 Easter egg found! You discovered the Konami Code!');
    }
});
