document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form from refreshing the page

  // Get form values
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();

  // Simple validation
  if (name === "" || email === "" || message === "") {
    alert("Please fill out all fields.");
    return;
  }

  // Show success message
  document.getElementById("formMessage").style.display = "block";

  // Clear form
  document.getElementById("contactForm").reset();
});
