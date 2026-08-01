const revealEls = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

revealEls.forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index * 0.04, 0.24)}s`;
  observer.observe(el);
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const stage = document.querySelector(".hero-stage");
const shell = document.querySelector(".doc-shell");

if (stage && shell && window.matchMedia("(pointer: fine)").matches) {
  stage.addEventListener("mousemove", (event) => {
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    shell.style.transform = `perspective(1200px) rotateY(${-4 + x * 8}deg) rotateX(${2 - y * 6}deg)`;
  });

  stage.addEventListener("mouseleave", () => {
    shell.style.transform = "perspective(1200px) rotateY(-4deg) rotateX(2deg)";
  });
}
