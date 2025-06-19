function showMessage() {
  alert("Hello Intern! You clicked the button 🎉");
}

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let name = document.getElementById("name").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();
  let gender = document.querySelector('input[name="gender"]:checked');

  if (!name || !phone || !email || !message || !gender) {
    alert("Please fill in all fields and select a gender.");
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    alert("Phone number must be exactly 10 digits.");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("Please enter a valid email address.");
    return;
  }

  alert("Form submitted successfully! 🚀");
  document.getElementById("contactForm").reset();
});
