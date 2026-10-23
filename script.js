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
        navbar.style.background = 'rgba(247, 242, 233, 0.97)';
        navbar.style.boxShadow = '0 2px 12px rgba(122, 31, 43, 0.08)';
    } else {
        navbar.style.background = 'rgba(247, 242, 233, 0.85)';
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

// ===== Active Nav Link Highlight =====
const navLinks = document.querySelectorAll('.nav-link');
const sectionElements = document.querySelectorAll('section[id]');

function highlightNavLink() {
    let currentSection = '';

    sectionElements.forEach(section => {
        const sectionTop = section.offsetTop;

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

// ===== Initialize on page load =====
window.addEventListener('load', () => {
    revealSection();
    highlightNavLink();
});
