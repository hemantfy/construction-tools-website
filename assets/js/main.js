const animateIn = () => {
  const fadeUps = document.querySelectorAll('.fade-in-up');
  gsap.from(fadeUps, {
    y: 26,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power2.out',
  });

  const floaters = document.querySelectorAll('.floating');
  gsap.to(floaters, {
    y: -8,
    duration: 2.4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    stagger: 0.2,
  });
};

const setupNavHighlight = () => {
  const currentPage = document.body.dataset.page;
  document.querySelectorAll('[data-route]').forEach((link) => {
    if (link.dataset.route === currentPage) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
};

const setupSmoothRouting = () => {
  const overlay = document.getElementById('page-transition');
  const links = document.querySelectorAll('a[data-route]');

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href.includes('#')) return;
      event.preventDefault();
      if (overlay) {
        gsap.to(overlay, {
          y: 0,
          duration: 0.45,
          ease: 'power2.in',
          onComplete: () => {
            window.location.href = href;
          },
        });
      } else {
        window.location.href = href;
      }
    });
  });

  window.addEventListener('pageshow', () => {
    if (overlay) {
      gsap.to(overlay, { y: '100%', duration: 0.6, ease: 'power2.out' });
    }
  });
};

const initAOS = () => {
  if (window.AOS) {
    AOS.init({
      once: true,
      duration: 900,
      offset: 80,
      easing: 'ease-out-quart',
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  setupNavHighlight();
  setupSmoothRouting();
  animateIn();
});