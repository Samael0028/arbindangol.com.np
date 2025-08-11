document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Clear previous errors
  const errors = this.querySelectorAll('.error-message');
  errors.forEach(err => err.style.display = 'none');

  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();

  let isValid = true;

  // Name validation
  if (name.length < 3) {
    showError('name', 'Please enter your full name (at least 3 characters).');
    isValid = false;
  }

  // Email validation simple regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError('email', 'Please enter a valid email address.');
    isValid = false;
  }

  // Message validation
  if (message.length < 10) {
    showError('message', 'Please enter a message (at least 10 characters).');
    isValid = false;
  }

  if (isValid) {
    // For now just show success message and clear form
    this.reset();
    document.getElementById('formSuccess').style.display = 'block';
  }

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = field.nextElementSibling;
    errorEl.textContent = message;
    errorEl.style.display = 'block';
  }
});
