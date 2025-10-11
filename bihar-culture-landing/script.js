// Enhanced JavaScript for Bihar Culture Landing - Open Source Ready
// Modern ES6+ JavaScript with smooth animations and interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initAnimations();
    initInteractiveElements();
    initAccessibility();
    initProgressiveEnhancement();
    initQuiz(); // attach quiz logic if present
});

// Navigation enhancements
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Set active navigation state
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
        
        // Add smooth hover effects
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Mobile navigation optimization
    const navContainer = document.querySelector('.nav-container');
    if (navContainer && window.innerWidth <= 768) {
        navContainer.classList.add('mobile-nav');
    }
}

// Advanced scroll animations and intersection observers
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger animation for grid items
                if (entry.target.classList.contains('features-grid') || 
                    entry.target.classList.contains('highlights-grid')) {
                    animateGridItems(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.hero-section, .features-grid, .highlights-section, .call-to-action'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Parallax effect for header
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            header.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Animate grid items with stagger effect
function animateGridItems(gridContainer) {
    const items = gridContainer.querySelectorAll('.feature-card, .highlight-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = `fadeInUp 0.6s ease-out forwards`;
            item.style.animationDelay = `${index * 0.1}s`;
        }, 100);
    });
}

// Interactive elements and enhanced UX
function initInteractiveElements() {
    // Enhanced feature card interactions
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        // Add ripple effect on click
        card.addEventListener('click', function(e) {
            createRippleEffect(e, this);
            
            // Navigate after animation
            setTimeout(() => {
                const link = this.getAttribute('onclick');
                if (link) {
                    const url = link.match(/window\.location\.href='([^']+)'/);
                    if (url && url[1]) {
                        window.location.href = url[1];
                    }
                }
            }, 200);
        });
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Enhanced highlight items
    const highlightItems = document.querySelectorAll('.highlight-item');
    highlightItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotate(1deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
    
    // CTA button enhancement
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    }
}

// Create ripple effect for interactive elements
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 10;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Accessibility enhancements
function initAccessibility() {
    // Add keyboard navigation for cards
    const interactiveElements = document.querySelectorAll('.feature-card, .nav-link, .cta-button');
    
    interactiveElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Focus indicators
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid #ff6b35';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #ff6b35;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 1000;
        border-radius: 4px;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Progressive enhancement features
function initProgressiveEnhancement() {
    // Add CSS animation support detection
    const supportsAnimations = 'animate' in document.createElement('div') || 
                              CSS.supports('animation', 'none');
    
    if (!supportsAnimations) {
        document.body.classList.add('no-animations');
    }
    
    // Lazy loading for images (if implemented later)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Performance monitoring (basic)
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }
}

// Quiz initialization and logic
function initQuiz() {
    const form = document.getElementById('bihar-quiz');
    if (!form) return;
    const result = document.getElementById('quiz-result');
    const answers = {
        q1: 'bodh',
        q2: 'nalanda',
        q3: 'chhath',
        q4: 'patna',
        q5: 'valmiki'
    };

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let score = 0;
        for (const [q, correct] of Object.entries(answers)) {
            const group = form.elements[q];
            if (group && group.value === correct) score++;
        }

        let message = '';
        if (score === 5) message = 'Incredible! You’re a Bihar Boss!';
        else if (score >= 4) message = 'Great job! Bhojpuri Bravo!';
        else if (score >= 3) message = 'Nice! You’re on the Patna path.';
        else if (score >= 2) message = 'Not bad! Keep exploring Bihar.';
        else message = 'Time to tour Bihar’s wonders!';

        if (result) result.textContent = 'You scored ' + score + '/5. ' + message;
    });
}

// Utility functions for future enhancements
const BiharCulture = {
    // Notification system
    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    },
    
    // Theme switcher (for future dark mode)
    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    },
    
    // Analytics helper (privacy-friendly)
    trackEvent(category, action, label = null) {
        if ('gtag' in window) {
            gtag('event', action, {
                event_category: category,
                event_label: label
            });
        }
        console.log('Event tracked:', { category, action, label });
    }
};

// Add CSS animations keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to { transform: scale(4); opacity: 0; }
    }
    
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .no-animations * {
        animation-duration: 0s !important;
        transition-duration: 0s !important;
    }
    
    .skip-link:focus {
        transition: top 0.3s ease;
    }
`;

document.head.appendChild(style);

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BiharCulture;
}