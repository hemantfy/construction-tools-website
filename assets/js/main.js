// Apple-style easing curves
const easeOutExpo = 'power4.out';
const easeInOutQuart = 'power4.inOut';

// Smooth scroll reveal animations
const initScrollAnimations = () => {
  const fadeUps = document.querySelectorAll('.fade-in-up');
  
  fadeUps.forEach((element, index) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
      y: 60,
      opacity: 0,
      duration: 1.2,
      delay: index * 0.08,
      ease: easeOutExpo,
    });
  });
};

// Parallax effect for hero sections
const initParallax = () => {
  const heroElements = document.querySelectorAll('.glass-panel');
  
  heroElements.forEach((element) => {
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
      y: -30,
      ease: 'none',
    });
  });
};

// Magnetic button effect
const initMagneticButtons = () => {
  const buttons = document.querySelectorAll('.primary-gradient');
  
  buttons.forEach((button) => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.6,
        ease: easeOutExpo,
      });
    });
    
    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
      });
    });
  });
};

// Smooth floating animation with GSAP
const initFloatingElements = () => {
  const floaters = document.querySelectorAll('.floating');
  
  floaters.forEach((floater, index) => {
    gsap.to(floater, {
      y: -15,
      rotation: 2,
      duration: 3 + index * 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.3,
    });
  });
};

// Card tilt effect on hover
const initCardTilt = () => {
  const cards = document.querySelectorAll('.card-gradient, article');
  
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.5,
        ease: easeOutExpo,
        transformPerspective: 1000,
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
      });
    });
  });
};

// Smooth scroll progress indicator
const initScrollProgress = () => {
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #f59e0b, #0ea5e9);
    z-index: 9999;
    transition: width 0.1s ease-out;
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
};

// Enhanced navigation highlight
const setupNavHighlight = () => {
  const currentPage = document.body.dataset.page;
  const links = document.querySelectorAll('[data-route]');
  
  links.forEach((link) => {
    if (link.dataset.route === currentPage) {
      link.setAttribute('aria-current', 'page');
      gsap.from(link, {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
      });
    } else {
      link.removeAttribute('aria-current');
    }
  });
};

// Smooth page transitions
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
          duration: 0.6,
          ease: easeInOutQuart,
          onComplete: () => {
            window.location.href = href;
          },
        });
      } else {
        window.location.href = href;
      }
    });
  });
  
  // Smooth page reveal on load
  window.addEventListener('pageshow', () => {
    if (overlay) {
      gsap.to(overlay, {
        y: '100%',
        duration: 0.8,
        ease: easeOutExpo,
        delay: 0.1,
      });
    }
  });
};

// Animate stat numbers on scroll
const initStatCounters = () => {
  const stats = document.querySelectorAll('.stat-number');
  
  stats.forEach((stat) => {
    const text = stat.textContent;
    const hasPercent = text.includes('%');
    const hasPlus = text.includes('+');
    const hasStar = text.includes('★');
    const hasYr = text.includes('yr');
    const hasK = text.includes('k');
    
    let numericValue = parseFloat(text.replace(/[^\d.]/g, ''));
    
    if (isNaN(numericValue)) return;
    
    gsap.from(stat, {
      scrollTrigger: {
        trigger: stat,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      textContent: 0,
      duration: 2,
      ease: 'power2.out',
      snap: { textContent: hasK ? 0.1 : 1 },
      onUpdate: function() {
        let value = Math.ceil(this.targets()[0].textContent);
        let suffix = '';
        
        if (hasK) {
          value = (Math.ceil(this.targets()[0].textContent * 10) / 10).toFixed(1);
          suffix = 'k';
        }
        if (hasPercent) suffix = '%';
        if (hasPlus) suffix += '+';
        if (hasStar) suffix = '★';
        if (hasYr) suffix = 'yr';
        
        stat.textContent = value + suffix;
      }
    });
  });
};

// Initialize AOS with custom settings
const initAOS = () => {
  if (window.AOS) {
    AOS.init({
      once: true,
      duration: 1200,
      offset: 100,
      easing: 'ease-out-cubic',
      delay: 100,
    });
  }
};

// Smooth header on scroll
const initStickyHeader = () => {
  const header = document.querySelector('header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = '0 4px 20px rgba(15, 23, 42, 0.1)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.8)';
      header.style.boxShadow = '0 1px 3px rgba(15, 23, 42, 0.05)';
    }
    
    lastScroll = currentScroll;
  });
};

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);
  
  // Initialize all features
  initAOS();
  setupNavHighlight();
  setupSmoothRouting();
  initScrollAnimations();
  initParallax();
  initMagneticButtons();
  initFloatingElements();
  initCardTilt();
  initScrollProgress();
  initStatCounters();
  initStickyHeader();
  
  // Refresh ScrollTrigger after everything loads
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });
});