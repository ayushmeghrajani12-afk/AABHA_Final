import './styles/style.css'
import Lenis from 'lenis'
import { initProductLightbox } from './product-lightbox.js'

// --- Preloader Logic ---
// --- Preloader Logic ---
const preloader = document.querySelector('.preloader');
const loadingFill = document.querySelector('.loading-fill');
const loadingLeaf = document.querySelector('.loading-leaf');

let count = 0;
const interval = setInterval(() => {
  count += Math.floor(Math.random() * 5) + 2; // Slower, smoother
  if (count > 100) count = 100;

  if (loadingFill) loadingFill.style.width = `${count}%`;
  if (loadingLeaf) loadingLeaf.style.left = `${count}%`;

  if (count === 100) {
    clearInterval(interval);
    setTimeout(() => {
      preloader.classList.add('is-hidden');
    }, 600);
  }
}, 50);

// --- Smooth Scroll (Lenis) ---
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// --- Scroll Reveal Logic ---
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = { threshold: 0.15 };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in-view');
        // If it has split characters, animate them
        const chars = entry.target.querySelectorAll('.char');
        chars.forEach((char, index) => {
          char.style.transitionDelay = `${index * 0.03}s`;
          char.style.transform = 'translateY(0)';
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Split text for stagger effect
  const splitTargets = document.querySelectorAll('.hero-content h1, .section-title, .brand-name');
  splitTargets.forEach(target => {
    // Basic text splitting (for demonstration, keeping HTML structure safe specific to brand-name)
    if (target.classList.contains('brand-name')) return; // handled manually or skip complex HTML

    const text = target.innerText;
    target.innerHTML = '';
    text.split('').forEach(char => {
      const span = document.createElement('span');
      span.innerText = char;
      span.classList.add('char');
      // preserve whitespace
      if (char === ' ') span.style.width = '0.3em';
      target.appendChild(span);
    });
    // Wrap widely to hide overflow for the reveal
    target.style.overflow = 'hidden';
    target.style.display = 'inline-block';
    observer.observe(target);
  });

  // Observe other fade-in elements
  const sections = document.querySelectorAll('.fade-in-section');
  sections.forEach(section => {
    section.classList.add('reveal-text');
    observer.observe(section);
  });

  // --- Parallax Image Effect ---
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
      heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 + scrolled * 0.0005})`;
    }
  });
});

initProductLightbox();

// --- Magnetic Buttons ---
const buttons = document.querySelectorAll('.cta-button');
buttons.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const pos = btn.getBoundingClientRect();
    const x = e.clientX - pos.left - pos.width / 2;
    const y = e.clientY - pos.top - pos.height / 2;

    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    btn.style.transition = 'transform 0.1s ease';
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0px, 0px)';
    btn.style.transition = 'transform 0.5s ease-out';
  });
});

// Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  // Slight delay for trailing effect
  cursorOutline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 500, fill: "forwards" });
});

// Hover state for cursor
const links = document.querySelectorAll('a, button, .product-card');
links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
    cursorOutline.style.backgroundColor = 'rgba(26, 60, 43, 0.1)';
  });
  link.addEventListener('mouseleave', () => {
    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorOutline.style.backgroundColor = 'transparent';
  });
});





