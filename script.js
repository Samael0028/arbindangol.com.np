// Smooth scrolling functions
function scrollToContact() {
  document.getElementById("contact").scrollIntoView({
    behavior: "smooth",
  })
}

function scrollToProjects() {
  document.getElementById("projects").scrollIntoView({
    behavior: "smooth",
  })
}

// Email client function
function openEmailClient() {
  window.location.href =
    "mailto:arbin0028@gmail.com?subject=Network Infrastructure Inquiry&body=Hello, I would like to discuss my networking needs."
}

// Add scroll animations
function animateOnScroll() {
  const cards = document.querySelectorAll(".skill-card, .project-card, .testimonial-card")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  cards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(card)
  })
}

// Initialize animations when page loads
document.addEventListener("DOMContentLoaded", () => {
  animateOnScroll()

  // Add click handlers for social links
  const socialLinks = document.querySelectorAll(".social-links a")
  socialLinks.forEach((link) => {
    if (link.textContent.includes("LinkedIn")) {
      link.href = "https://www.linkedin.com/in/arbin-dangol-6787b8281/"
      link.target = "_blank"
    } else if (link.textContent.includes("GitHub")) {
      link.href = "https://github.com/Samael0028"
      link.target = "_blank"
    }
  })
})

// Add mobile menu functionality if needed
function toggleMobileMenu() {
  // This can be expanded if you add a navigation menu later
  console.log("Mobile menu toggle")
}

// Form validation (if you add a contact form later)
function validateContactForm(formData) {
  const email = formData.get("email")
  const message = formData.get("message")

  if (!email || !email.includes("@")) {
    alert("Please enter a valid email address")
    return false
  }

  if (!message || message.length < 10) {
    alert("Please enter a message with at least 10 characters")
    return false
  }

  return true
}

// Smooth reveal animation for hero section
window.addEventListener("load", () => {
  const heroContent = document.querySelector(".hero-content")
  heroContent.style.opacity = "0"
  heroContent.style.transform = "translateY(20px)"

  setTimeout(() => {
    heroContent.style.transition = "opacity 1s ease, transform 1s ease"
    heroContent.style.opacity = "1"
    heroContent.style.transform = "translateY(0)"
  }, 100)
})
