const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.about-grid, .trait, .belief').forEach((element) => {
    element.classList.add('reveal-ready');
    observer.observe(element);
  });
}

document.querySelectorAll('.button').forEach((button) => {
  button.addEventListener('click', (event) => {
    if (reducedMotion) return;
    const bounds = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.setAttribute('aria-hidden', 'true');
    ripple.style.left = `${(event.detail ? event.clientX - bounds.left : bounds.width / 2) - 10}px`;
    ripple.style.top = `${(event.detail ? event.clientY - bounds.top : bounds.height / 2) - 10}px`;
    button.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
  });
});
