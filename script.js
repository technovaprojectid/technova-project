// ========================================
// TechNova.Project — Lightweight interactions
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const navbar = document.querySelector('.navbar');
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMobile = document.querySelector('.navbar-mobile');
  const navbarOverlay = document.querySelector('.navbar-overlay');
  const mobileMenuLinks = document.querySelectorAll('.navbar-mobile a');
  const faqItems = document.querySelectorAll('.faq-item');
  const counterElements = document.querySelectorAll('[data-counter]');

  const closeMobileMenu = () => {
    navbarToggle?.classList.remove('active');
    navbarMobile?.classList.remove('open');
    navbarOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  };

  const openMobileMenu = () => {
    navbarToggle?.classList.add('active');
    navbarMobile?.classList.add('open');
    navbarOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  navbarToggle?.addEventListener('click', () => {
    if (navbarMobile?.classList.contains('open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  navbarOverlay?.addEventListener('click', closeMobileMenu);
  mobileMenuLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbarMobile?.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const targetElement = targetId && targetId !== '#' ? document.querySelector(targetId) : null;
      if (targetElement) {
        e.preventDefault();
        const navHeight = navbar?.offsetHeight || 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  if (counterElements.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const target = parseInt(element.getAttribute('data-counter'), 10);
          const duration = parseInt(element.getAttribute('data-duration'), 10) || 1800;
          const suffix = element.getAttribute('data-suffix') || '';
          if (!Number.isNaN(target)) {
            const frameDuration = 1000 / 60;
            const totalFrames = Math.round(duration / frameDuration);
            const increment = target / totalFrames;
            let current = 0;
            let frame = 0;
            const timer = setInterval(() => {
              frame += 1;
              current += increment;
              if (frame >= totalFrames) {
                element.textContent = target + suffix;
                clearInterval(timer);
              } else {
                element.textContent = Math.floor(current) + suffix;
              }
            }, frameDuration);
            observer.unobserve(element);
          }
        }
      });
    }, { threshold: 0.5 });

    counterElements.forEach(counter => observer.observe(counter));
  }

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const answerInner = item.querySelector('.faq-answer-inner');
    if (question && answer && answerInner) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            if (otherAnswer) otherAnswer.style.maxHeight = '0';
          }
        });
        if (isActive) {
          item.classList.remove('active');
          answer.style.maxHeight = '0';
        } else {
          item.classList.add('active');
          answer.style.maxHeight = answerInner.scrollHeight + 'px';
        }
      });
    }
  });

  const handleScroll = () => {
    if (window.scrollY > 80) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

