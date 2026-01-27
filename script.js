// ============================================
// PRELOADER & INITIALIZATION
// ============================================
let count = 0;
const counterEl = document.getElementById('counter');
const preloaderEl = document.getElementById('preloader');
const mainContentEl = document.getElementById('mainContent');
const startBtn = document.getElementById('startBtn');
const cookieNotice = document.getElementById('cookieNotice');

function updateCounter() {
    if (count <= 100) {
        counterEl.textContent = count.toString().padStart(3, '0');
        count += Math.floor(Math.random() * 8) + 1;
        setTimeout(updateCounter, 50);
    } else {
        counterEl.textContent = '100';
    }
}

// Start button click
startBtn.addEventListener('click', () => {
    preloaderEl.classList.add('hidden');
    setTimeout(() => {
        mainContentEl.classList.add('visible');
        createParticles();
        // Show cookie notice after 1 second
        setTimeout(() => {
            if (!localStorage.getItem('cookieConsent')) {
                cookieNotice.classList.add('visible');
            }
        }, 1000);
    }, 500);
});

// Auto-start after counter completes (optional)
setTimeout(() => {
    if (count >= 100) {
        startBtn.style.opacity = '1';
        startBtn.style.pointerEvents = 'auto';
    }
}, 6000);

// Start counter on page load
updateCounter();

// ============================================
// COOKIE CONSENT
// ============================================
const acceptCookies = document.getElementById('acceptCookies');
const rejectCookies = document.getElementById('rejectCookies');

if (acceptCookies) {
    acceptCookies.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieNotice.classList.remove('visible');
    });
}

if (rejectCookies) {
    rejectCookies.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'rejected');
        cookieNotice.classList.remove('visible');
    });
}

// ============================================
// NAVIGATION
// ============================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Highlight active page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// ============================================
// PARTICLES EFFECT
// ============================================
function createParticles() {
    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.position = 'fixed';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '5';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.bottom = '0';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        const colors = ['var(--neon-green)', 'var(--neon-pink)', 'var(--neon-cyan)'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 10px ${color}`;
        
        // Animation
        particle.style.animation = 'particleFloat 3s linear forwards';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 3000);
    }, 200);
}

// Add particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// CURSOR TRAIL EFFECT
// ============================================
let mouseX = 0;
let mouseY = 0;
let trails = [];

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Throttle trail creation
    if (Math.random() > 0.8) {
        createCursorTrail(mouseX, mouseY);
    }
});

function createCursorTrail(x, y) {
    const trail = document.createElement('div');
    trail.style.position = 'fixed';
    trail.style.width = '4px';
    trail.style.height = '4px';
    trail.style.borderRadius = '50%';
    trail.style.background = 'var(--neon-green)';
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    trail.style.pointerEvents = 'none';
    trail.style.zIndex = '9999';
    trail.style.boxShadow = '0 0 10px var(--neon-green)';
    trail.style.transition = 'all 0.5s ease';
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'scale(0)';
    }, 10);
    
    setTimeout(() => {
        trail.remove();
    }, 500);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.work-card, .skill-category');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ============================================
// SMOOTH SCROLL
// ============================================
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

// ============================================
// INTERACTIVE AWARDS BADGES
// ============================================
const awardBadges = document.querySelectorAll('.award-badge');
awardBadges.forEach(badge => {
    badge.addEventListener('mouseenter', () => {
        badge.style.animation = 'none';
        setTimeout(() => {
            badge.style.animation = '';
        }, 10);
    });
});

// ============================================
// TYPING EFFECT (Optional enhancement)
// ============================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ============================================
// WORK CARD TILT EFFECT
// ============================================
const workCards = document.querySelectorAll('.work-card');
workCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ============================================
// RANDOM GLITCH EFFECT
// ============================================
function randomGlitch() {
    const glitchElements = document.querySelectorAll('.glitch');
    glitchElements.forEach(el => {
        if (Math.random() > 0.95) {
            el.style.animation = 'none';
            setTimeout(() => {
                el.style.animation = '';
            }, 100);
        }
    });
}

setInterval(randomGlitch, 3000);

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// PAGE LOAD OPTIMIZATION
// ============================================
window.addEventListener('load', () => {
    // Remove loading class from body if exists
    document.body.classList.remove('loading');
    
    // Trigger any load animations
    const loadElements = document.querySelectorAll('[data-load-animation]');
    loadElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('loaded');
        }, index * 100);
    });
});

// ============================================
// PREVENT CONSOLE ERRORS
// ============================================
console.log('%c⚡ Welcome to the Digital Experience ⚡', 'color: #00ff41; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00ff41;');
console.log('%cBuilt with passion and code', 'color: #00f0ff; font-size: 14px;');

// ============================================
// EASTER EGG (Konami Code)
// ============================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s linear infinite';
    
    const easterStyle = document.createElement('style');
    easterStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(easterStyle);
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 10000);
    
    console.log('%c🎉 Easter Egg Activated! 🎉', 'color: #ff10f0; font-size: 24px; font-weight: bold;');
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================
// Skip to main content
const skipLink = document.createElement('a');
skipLink.href = '#main';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--neon-green);
    color: var(--darker-bg);
    padding: 8px;
    z-index: 100;
    text-decoration: none;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// ============================================
// FORM VALIDATION (for contact page)
// ============================================
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'var(--neon-pink)';
                input.style.boxShadow = '0 0 10px var(--neon-pink)';
            } else {
                input.style.borderColor = 'var(--neon-green)';
                input.style.boxShadow = '0 0 10px var(--neon-green)';
            }
        });
        
        if (!isValid) {
            e.preventDefault();
        }
    });
});

// ============================================
// EXPORT FOR OTHER PAGES
// ============================================
window.portfolioUtils = {
    typeWriter,
    createCursorTrail,
    debounce
};