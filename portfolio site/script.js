// Contact Form Submission (basic alert only)
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault(); // prevent actual form submit

  alert("Thanks for reaching out! I will get back to you soon.");
  this.reset(); // reset the form
});

// Animate skill bars on scroll
const skillsSection = document.querySelector("#skills");
const progressBars = document.querySelectorAll(".progress-bar div");

function animateSkills() {
  const sectionPos = skillsSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight / 1.3;

  if (sectionPos < screenPos) {
    progressBars.forEach((bar) => {
      const width = bar.style.width;
      bar.style.width = "0%";
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });

    window.removeEventListener("scroll", animateSkills);
  }
}

window.addEventListener("scroll", animateSkills);
