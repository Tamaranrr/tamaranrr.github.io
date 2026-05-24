// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((s) => observer.observe(s));

// Animate project count in hero
function animateCount(el, target, duration = 1200) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const countEl = document.getElementById('project-count');
if (countEl) {
  const heroObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        animateCount(countEl, parseInt(countEl.textContent, 10));
        heroObserver.disconnect();
      }
    },
    { threshold: 0.5 }
  );
  heroObserver.observe(countEl);
}

// Skill tag hover — purely CSS, nothing needed here

// Contact form — mailto fallback
document.getElementById('contact-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name    = document.getElementById('name').value;
  const email   = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const subject = encodeURIComponent(`Contacto desde portafolio — ${name}`);
  const body    = encodeURIComponent(`Nombre: ${name}\nCorreo: ${email}\n\n${message}`);
  window.location.href = `mailto:tamaranrr@gmail.com?subject=${subject}&body=${body}`;
});

// Animate cards on scroll with stagger
const cards = document.querySelectorAll('.project-card, .skill-category, .highlight-item');
const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = Array.from(entry.target.parentElement?.children ?? []);
        const idx = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 90, 450);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay);
        cardObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

cards.forEach((card) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(24px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  cardObserver.observe(card);
});
