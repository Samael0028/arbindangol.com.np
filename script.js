// script.js

// ========== Hamburger Menu ==========
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.setAttribute(
    'aria-expanded',
    navMenu.classList.contains('active')
  );
});

// ========== Dark Mode ==========
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Load saved preference
if (localStorage.getItem('darkMode') === 'enabled') {
  body.classList.add('dark-mode');
  darkModeToggle.textContent = '☀️';
}

darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
    darkModeToggle.textContent = '☀️';
  } else {
    localStorage.setItem('darkMode', 'disabled');
    darkModeToggle.textContent = '🌙';
  }
});

// ========== Contact Form ==========
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let valid = true;
  document.querySelectorAll('.error-message').forEach(msg => msg.textContent = '');

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  if (name.value.trim() === '') {
    name.nextElementSibling.textContent = 'Please enter your name.';
    valid = false;
  }
  if (!email.value.match(/^[^@]+@[^@]+\.[^@]+$/)) {
    email.nextElementSibling.textContent = 'Please enter a valid email.';
    valid = false;
  }
  if (message.value.trim().length < 10) {
    message.nextElementSibling.textContent = 'Message must be at least 10 characters.';
    valid = false;
  }

  if (valid) {
    // For now: send via mailto (can be replaced with backend API)
    window.location.href = `mailto:youremail@example.com?subject=Contact from ${encodeURIComponent(name.value)}&body=${encodeURIComponent(message.value)}`;

    formSuccess.style.display = 'block';
    contactForm.reset();
  }
});
