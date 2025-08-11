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
    
    // Validation rules
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            messages: {
                required: 'Name is required.',
                minLength: 'Name must be at least 2 characters long.',
                pattern: 'Name should only contain letters and spaces.'
            }
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            messages: {
                required: 'Email is required.',
                pattern: 'Please enter a valid email address.'
            }
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 1000,
            messages: {
                required: 'Message is required.',
                minLength: 'Message must be at least 10 characters long.',
                maxLength: 'Message must be less than 1000 characters.'
            }
        }
    };
    
    // Form submission handler
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Real-time validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldErrorIfVisible(input));
    });
    
    // ===== FORM FUNCTIONS =====
    function handleFormSubmit(e) {
        e.preventDefault();
        
        if (validateForm()) {
            showFormSuccess();
            contactForm.reset();
        }
    }
    
    function validateForm() {
        const requiredFields = contactForm.querySelectorAll('input[required], textarea[required]');
        const results = Array.from(requiredFields).map(field => validateField(field));
        return results.every(isValid => isValid);
    }
    
    function validateField(field) {
        const fieldName = field.name;
        const fieldValue = field.value.trim();
        const rules = validationRules[fieldName];
        
        clearFieldError(field);
        
        if (!rules) return true;
        
        const error = getValidationError(fieldValue, rules);
        
        if (error) {
            showFieldError(field, error);
            return false;
        }
        
        return true;
    }
    
    function getValidationError(value, rules) {
        if (rules.required && !value) {
            return rules.messages.required;
        }
        
        if (value && rules.minLength && value.length < rules.minLength) {
            return rules.messages.minLength;
        }
        
        if (value && rules.maxLength && value.length > rules.maxLength) {
            return rules.messages.maxLength;
        }
        
        if (value && rules.pattern && !rules.pattern.test(value)) {
            return rules.messages.pattern;
        }
        
        return null;
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
    
    function clearFieldErrorIfVisible(field) {
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement.style.display === 'block') {
            clearFieldError(field);
        }
    }
    
    function showFormSuccess() {
        formSuccess.style.display = 'block';
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        setTimeout(() => {
            formSuccess.style.display = 'none';
        }, 5000);
    }
    
    
    // ===== SCROLL EFFECTS =====
    let scrollTimeout = null;
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinksList = document.querySelectorAll('.nav-link');
        const currentSection = getCurrentSection(sections);
        
        updateNavLinkStates(navLinksList, currentSection);
    }
    
    function getCurrentSection(sections) {
        const scrollPosition = window.pageYOffset;
        
        for (const section of sections) {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                return section.getAttribute('id');
            }
        }
        return '';
    }
    
    function updateNavLinkStates(navLinks, currentSection) {
        navLinks.forEach(link => {
            const isCurrentSection = link.getAttribute('href') === `#${currentSection}`;
            link.classList.toggle('active', isCurrentSection);
        });
    }
    
    function throttleScroll(callback, delay) {
        if (scrollTimeout) return;
        
        scrollTimeout = setTimeout(() => {
            callback();
            scrollTimeout = null;
        }, delay);
    }
    
    // Apply scroll listener with throttling
    window.addEventListener('scroll', () => {
        throttleScroll(updateActiveNavLink, 16);
    });
});