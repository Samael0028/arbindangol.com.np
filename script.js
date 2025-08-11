// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== HAMBURGER MENU FUNCTIONALITY =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        
        // Toggle hamburger animation
        hamburger.classList.toggle('active');
        
        // Toggle nav menu
        navMenu.classList.toggle('active');
        
        // Update aria-expanded for accessibility
        hamburger.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const isClickInsideNav = navMenu.contains(e.target);
        const isClickOnHamburger = hamburger.contains(e.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
    
    
    // ===== SMOOTH SCROLLING =====
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    // ===== FORM VALIDATION AND SUBMISSION =====
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Show success message
            formSuccess.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);
            
            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
    
    // Real-time validation on input
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Clear error message when user starts typing
            const errorMessage = this.parentNode.querySelector('.error-message');
            if (errorMessage.style.display === 'block') {
                clearFieldError(this);
            }
        });
    });
    
    
    // ===== VALIDATION FUNCTIONS =====
    function validateForm() {
        let isValid = true;
        const formInputs = contactForm.querySelectorAll('input[required], textarea[required]');
        
        formInputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function validateField(field) {
        const fieldName = field.name;
        const fieldValue = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous errors
        clearFieldError(field);
        
        // Check if field is empty
        if (!fieldValue) {
            errorMessage = `${getFieldDisplayName(fieldName)} is required.`;
            isValid = false;
        } else {
            // Field-specific validation
            switch (fieldName) {
                case 'name':
                    if (fieldValue.length < 2) {
                        errorMessage = 'Name must be at least 2 characters long.';
                        isValid = false;
                    } else if (!/^[a-zA-Z\s]+$/.test(fieldValue)) {
                        errorMessage = 'Name should only contain letters and spaces.';
                        isValid = false;
                    }
                    break;
                    
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(fieldValue)) {
                        errorMessage = 'Please enter a valid email address.';
                        isValid = false;
                    }
                    break;
                    
                case 'message':
                    if (fieldValue.length < 10) {
                        errorMessage = 'Message must be at least 10 characters long.';
                        isValid = false;
                    } else if (fieldValue.length > 1000) {
                        errorMessage = 'Message must be less than 1000 characters.';
                        isValid = false;
                    }
                    break;
            }
        }
        
        // Show error if validation failed
        if (!isValid) {
            showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        const errorElement = field.parentNode.querySelector('.error-message');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        field.style.borderColor = '#d32f2f';
    }
    
    function clearFieldError(field) {
        const errorElement = field.parentNode.querySelector('.error-message');
        errorElement.style.display = 'none';
        field.style.borderColor = '#004d40';
    }
    
    function getFieldDisplayName(fieldName) {
        const displayNames = {
            'name': 'Name',
            'email': 'Email',
            'message': 'Message'
        };
        return displayNames[fieldName] || fieldName;
    }
    
    
    // ===== SCROLL EFFECTS =====
    // Add active class to nav links based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinksList = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    
    // ===== PERFORMANCE OPTIMIZATION =====
    // Throttle scroll events for better performance
    let scrollTimeout;
    function throttleScroll(callback, delay) {
        if (scrollTimeout) return;
        
        scrollTimeout = setTimeout(() => {
            callback();
            scrollTimeout = null;
        }, delay);
    }
    
    // Apply throttling to scroll event
    window.addEventListener('scroll', () => {
        throttleScroll(() => {
            // Any scroll-based functionality can go here
        }, 16); // ~60fps
    });
});