const roles = [
  "Frontend Developer",
  "Intern at ApexPlanet",
  "AI & DS Student"
];

let index = 0;
let charIndex = 0;
let isDeleting = false;
const typingTarget = document.getElementById("typewriter-text");

function typeWriter() {
  const current = roles[index];

  if (isDeleting) {
    typingTarget.textContent = current.substring(0, charIndex--);
  } else {
    typingTarget.textContent = current.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(typeWriter, 1000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index = (index + 1) % roles.length;
    setTimeout(typeWriter, 500);
  } else {
    setTimeout(typeWriter, 100);
  }
}

typeWriter();
