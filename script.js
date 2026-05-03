// NETFLIX JavaScript - Netflix-inspired streaming platform

// Global variables
let loader, navbar, heroSection, heroImage, heroTitle, heroDescription, indicators, playBtn, infoBtn, clickSound, hoverSound;
let currentHeroIndex = 0;
let heroInterval;

// Initialize DOM elements safely
function initializeDOMElements() {
    loader = document.getElementById('loader');
    navbar = document.getElementById('navbar');
    heroSection = document.getElementById('hero');
    
    if (heroSection) {
        heroImage = heroSection.querySelector('.hero-image');
        heroTitle = heroSection.querySelector('.hero-title');
        heroDescription = heroSection.querySelector('.hero-description');
    }
    
    indicators = document.querySelectorAll('.indicator');
    playBtn = document.querySelector('.play-btn');
    infoBtn = document.querySelector('.info-btn');
    clickSound = document.getElementById('clickSound');
    hoverSound = document.getElementById('hoverSound');
}

// Hero content data for auto-rotation
const heroContent = [
    {
        image: 'https://picsum.photos/seed/hero1/1920/1080.jpg',
        title: 'Cosmic Odyssey',
        description: 'In the year 2157, humanity\'s last hope lies in the hands of a rogue astronaut who must navigate through uncharted galaxies to find a new home for mankind.'
    },
    {
        image: 'https://picsum.photos/seed/hero2/1920/1080.jpg',
        title: 'Neon Nights',
        description: 'A cyberpunk thriller set in 2089 Tokyo, where a detective must uncover a conspiracy that threatens the very fabric of digital reality.'
    },
    {
        image: 'https://picsum.photos/seed/hero3/1920/1080.jpg',
        title: 'The Last Frontier',
        description: 'When Earth\'s resources run out, a team of explorers embarks on a dangerous mission to colonize a distant planet in the Andromeda galaxy.'
    },
    {
        image: 'https://picsum.photos/seed/hero4/1920/1080.jpg',
        title: 'Quantum Paradox',
        description: 'A brilliant physicist discovers a way to manipulate time, but each change creates dangerous paradoxes that threaten to unravel reality itself.'
    }
];
// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('NETFLIX loading...');
    
    // Initialize DOM elements first
    initializeDOMElements();
    
    // Then initialize all features
    initializeLoader();
    initializeNavbar();
    initializeHero();
    initializeCarousels();
    initializeSoundEffects();
    initializeScrollAnimations();
    initializeCardInteractions();
    
    console.log('NETFLIX initialized successfully! 🎬');
});

// Loading Screen
function initializeLoader() {
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            // Trigger hero animation after loader hides
            if (heroSection) {
                heroSection.classList.add('active');
            }
        }, 2000);
    }
}

// Navbar scroll effect
function initializeNavbar() {
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Add navigation functionality
        const navLinks = navbar.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.textContent.toLowerCase().replace(/\s+/g, '-');
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                    // For demo purposes, scroll to main content
                    document.querySelector('.main-content').scrollIntoView({ behavior: 'smooth' });
                }
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
        
        // Add search functionality
        const searchBtn = navbar.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                alert('Search functionality would open here');
                playClickSound();
            });
        }
        
        // Add notification functionality
        const notificationBtn = navbar.querySelector('.notification-btn');
        if (notificationBtn) {
            notificationBtn.addEventListener('click', () => {
                alert('You have 3 new notifications');
                playClickSound();
            });
        }
    }
}

// Hero Section Auto-rotation
function initializeHero() {
    if (!heroSection || !heroImage || !heroTitle || !heroDescription) return;
    
    // Start auto-rotation
    startHeroRotation();
    
    // Manual controls
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentHeroIndex = index;
            updateHeroContent();
            resetHeroRotation();
        });
    });
    
    // Pause on hover
    heroSection.addEventListener('mouseenter', pauseHeroRotation);
    heroSection.addEventListener('mouseleave', startHeroRotation);
    
    // Add play and info button functionality
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            alert('Playing content...');
            playClickSound();
        });
    }
    
    if (infoBtn) {
        infoBtn.addEventListener('click', () => {
            showMovieInfo();
            playClickSound();
        });
    }
}

function startHeroRotation() {
    heroInterval = setInterval(() => {
        currentHeroIndex = (currentHeroIndex + 1) % heroContent.length;
        updateHeroContent();
    }, 8000);
}

function pauseHeroRotation() {
    clearInterval(heroInterval);
}

function resetHeroRotation() {
    clearInterval(heroInterval);
    startHeroRotation();
}

function updateHeroContent() {
    if (!heroImage || !heroTitle || !heroDescription) return;
    
    const content = heroContent[currentHeroIndex];
    
    // Fade out
    heroImage.style.opacity = '0';
    heroTitle.style.opacity = '0';
    heroDescription.style.opacity = '0';
    
    setTimeout(() => {
        // Update content
        heroImage.src = content.image;
        heroTitle.textContent = content.title;
        heroDescription.textContent = content.description;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentHeroIndex);
        });
        
        // Fade in
        heroImage.style.opacity = '1';
        heroTitle.style.opacity = '1';
        heroDescription.style.opacity = '1';
    }, 500);
}

function showMovieInfo() {
    const content = heroContent[currentHeroIndex];
    const modal = document.createElement('div');
    modal.className = 'movie-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <h2>${content.title}</h2>
            <p>${content.description}</p>
            <div class="modal-buttons">
                <button class="btn btn-primary">Play</button>
                <button class="btn btn-secondary">Add to List</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Carousel Functionality
function initializeCarousels() {
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        const container = carousel.parentElement;
        const prevBtn = container.querySelector('.prev-btn');
        const nextBtn = container.querySelector('.next-btn');
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => scrollCarousel(carousel, 'prev'));
            nextBtn.addEventListener('click', () => scrollCarousel(carousel, 'next'));
        }
        
        // Add smooth scrolling with mouse wheel
        carousel.addEventListener('wheel', (e) => {
            e.preventDefault();
            carousel.scrollLeft += e.deltaY;
        });
    });
}

function scrollCarousel(carousel, direction) {
    const card = carousel.querySelector('.movie-card');
    if (!card) return;
    
    const cardWidth = card.offsetWidth;
    const gap = 8; // Gap between cards
    const scrollAmount = (cardWidth + gap) * 3; // Scroll 3 cards at a time
    
    if (direction === 'prev') {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}

// Sound Effects
function initializeSoundEffects() {
    // Click sound for buttons
    const buttons = document.querySelectorAll('.btn, .carousel-btn, .action-btn, .nav-link, .dropdown-item');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            playClickSound();
        });
    });
    
    // Hover sound for movie cards
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            playHoverSound();
        });
    });
}

function playClickSound() {
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.log('Audio play failed:', e));
    }
}

function playHoverSound() {
    if (hoverSound) {
        hoverSound.currentTime = 0;
        hoverSound.volume = 0.3;
        hoverSound.play().catch(e => console.log('Audio play failed:', e));
    }
}

// Scroll Animations using Intersection Observer
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe movie rows
    const movieRows = document.querySelectorAll('.movie-row');
    movieRows.forEach(row => {
        row.classList.add('animate-on-scroll');
        observer.observe(row);
    });
}

// Card Interactions
function initializeCardInteractions() {
    const movieCards = document.querySelectorAll('.movie-card');
    
    movieCards.forEach(card => {
        const playBtn = card.querySelector('.card-play-btn');
        const addBtn = card.querySelector('.add-btn');
        const likeBtn = card.querySelector('.like-btn');
        
        if (playBtn) {
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                playClickSound();
                alert('Playing movie...');
            });
        }
        
        if (addBtn) {
            addBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                playClickSound();
                toggleAddToList(addBtn);
            });
        }
        
        if (likeBtn) {
            likeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                playClickSound();
                toggleLike(likeBtn);
            });
        }
        
        // Card click
        card.addEventListener('click', () => {
            playClickSound();
            const title = card.querySelector('.movie-title')?.textContent;
            alert(`Opening details for: ${title || 'Movie'}`);
        });
    });
}

function toggleAddToList(button) {
    const svg = button.querySelector('svg');
    const isAdded = button.classList.contains('added');
    
    if (isAdded) {
        button.classList.remove('added');
        // Change back to plus icon
        svg.innerHTML = '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>';
    } else {
        button.classList.add('added');
        // Change to check icon
        svg.innerHTML = '<polyline points="20 6 9 17 4 12"/>';
    }
}

function toggleLike(button) {
    const svg = button.querySelector('svg');
    const isLiked = button.classList.contains('liked');
    
    if (isLiked) {
        button.classList.remove('liked');
        // Change back to empty heart
        svg.innerHTML = '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>';
    } else {
        button.classList.add('liked');
        // Change to filled heart
        svg.innerHTML = '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="currentColor"/>';
    }
}

// Hero button interactions
playBtn.addEventListener('click', () => {
    playClickSound();
    console.log('Starting movie playback...');
    // Add play functionality here
});

infoBtn.addEventListener('click', () => {
    playClickSound();
    console.log('Showing more info...');
    // Add info functionality here
});

// Search functionality
const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', () => {
    playClickSound();
    console.log('Opening search...');
    // Add search modal or redirect here
});

// Notification functionality
const notificationBtn = document.querySelector('.notification-btn');
notificationBtn.addEventListener('click', () => {
    playClickSound();
    console.log('Opening notifications...');
    // Add notification dropdown here
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Escape key to close any open modals
    if (e.key === 'Escape') {
        console.log('Closing modals...');
        // Add modal closing logic here
    }
    
    // Arrow keys for carousel navigation
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const focusedCarousel = document.querySelector('.carousel:hover');
        if (focusedCarousel) {
            const direction = e.key === 'ArrowLeft' ? 'prev' : 'next';
            scrollCarousel(focusedCarousel, direction);
        }
    }
});

// Touch gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        const focusedCarousel = document.querySelector('.carousel:hover');
        if (focusedCarousel) {
            const direction = diff > 0 ? 'next' : 'prev';
            scrollCarousel(focusedCarousel, direction);
        }
    }
}

// Performance optimization - Debounce scroll events
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Add any scroll-dependent animations here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Lazy loading for images (if needed in future)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Error handling
window.addEventListener('error', (e) => {
    console.error('NETFLIX Error:', e.error);
    // Add user-friendly error handling here
});

// Service Worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Analytics tracking (optional)
function trackEvent(eventName, properties = {}) {
    console.log('Event tracked:', eventName, properties);
    // Add analytics implementation here
}

// Track user interactions
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('movie-card')) {
        trackEvent('movie_card_clicked', {
            title: e.target.querySelector('.movie-title')?.textContent
        });
    }
});

// Dynamic content loading simulation
function loadMoreContent() {
    console.log('Loading more content...');
    // Add infinite scroll or load more functionality here
}

// Initialize any additional features
function initializeAdditionalFeatures() {
    // Add any additional initialization here
}

// Call additional initialization
initializeAdditionalFeatures();

console.log('StreamFlix initialized successfully! 🎬');
