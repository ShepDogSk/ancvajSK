// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Track menu toggle event
        if (typeof gtag === 'function') {
            gtag('event', 'menu_toggle', {
                'event_category': 'navigation',
                'event_label': hamburger.classList.contains('active') ? 'open' : 'close'
            });
        }
    });
    
    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Track navigation link click
            if (typeof gtag === 'function') {
                gtag('event', 'nav_link_click', {
                    'event_category': 'navigation',
                    'event_label': link.textContent
                });
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                // Track scroll to section event
                if (typeof gtag === 'function') {
                    gtag('event', 'scroll_to_section', {
                        'event_category': 'navigation',
                        'event_label': targetId.replace('#', '')
                    });
                }
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact item hover animation and click tracking
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow)';
        });
    });
    
    // Track phone and email clicks
    document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function(e) {
            if (typeof gtag === 'function') {
                const isPhone = this.getAttribute('href').startsWith('tel:');
                gtag('event', isPhone ? 'phone_click' : 'email_click', {
                    'event_category': 'contact',
                    'event_label': this.textContent.trim()
                });
            }
        });
    });
    
    // Track service card clicks
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function() {
            if (typeof gtag === 'function') {
                const serviceName = this.querySelector('h3').textContent;
                gtag('event', 'service_click', {
                    'event_category': 'engagement',
                    'event_label': serviceName
                });
            }
        });
    });
    
    // Track language switcher
    document.querySelectorAll('a[href="index.html"], a[href="index-sk.html"]').forEach(langLink => {
        langLink.addEventListener('click', function() {
            if (typeof gtag === 'function') {
                const targetLang = this.textContent.trim();
                gtag('event', 'language_switch', {
                    'event_category': 'localization',
                    'event_label': targetLang
                });
            }
        });
    });
    
    // Scroll reveal animation
    function revealOnScroll() {
        const elements = document.querySelectorAll('.service-card, .section-header, .contact-container');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('fade-in');
            }
        });
    }
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
});
