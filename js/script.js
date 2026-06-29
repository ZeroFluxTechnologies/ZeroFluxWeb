/* ...................................
   JavaScript — Zeroflux Technologies
   .................................... */

(function() {
  'use strict';

  // ....................
  // TOGGLE THEME
  // ...................
  function initTheme() {
    const html = document.documentElement;
    const storedTheme = localStorage.getItem('zeroflux-theme');

    
    if (storedTheme) {
      html.setAttribute('data-theme', storedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      html.setAttribute('data-theme', 'light');
    } else {
      html.setAttribute('data-theme', 'dark');
    }

    
   window.toggleTheme = function() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('zeroflux-theme', next);
};

    
    const toggleDesktop = document.getElementById('themeToggleDesktop');
    const toggleMobile = document.getElementById('themeToggleMobile');

    function handleToggle(e) {
      if (e.type === 'click' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.toggleTheme();
      }
    }

    [toggleDesktop, toggleMobile].forEach(el => {
      if (el) {
        el.addEventListener('click', handleToggle);
        el.addEventListener('keydown', handleToggle);
      }
    });
  }

  // ........................
  // MOBILE MENU
  // .......................
  function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinksItems = document.querySelectorAll('.nav-link');

    if (!menuToggle || !navLinks) return;

    function toggleMenu() {
      const isOpen = navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    menuToggle.addEventListener('click', toggleMenu);

   
    navLinksItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        menuToggle.focus();
      }
    });
  }

  // .......................    
  //  SCROLL SPY
  // ......................
  function initScrollSpy() {
    const sections = document.querySelectorAll('section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    let ticking = false;

    function updateActiveSection() {
      const scrollY = window.scrollY + 100;
      let currentId = '';

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionBottom) {
          currentId = section.getAttribute('id');
          section.classList.add('section-highlight');
        } else {
          section.classList.remove('section-highlight');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // Initial call
    setTimeout(updateActiveSection, 100);
  }

  // .............................
  //  ANIMATIONS
  // .......................
  function initReveal() {
    const elements = document.querySelectorAll('.reveal');

    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    elements.forEach(el => observer.observe(el));

    
    document.querySelectorAll('.hero h1, .hero-sub, .hero-stats, .hero-badge').forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

  // ...................
  // FAQ 
  // ...................
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    if (!faqItems.length) return;

    faqItems.forEach(item => {
      const button = item.querySelector('.faq-question');
      if (!button) return;

      button.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            const otherButton = other.querySelector('.faq-question');
            if (otherButton) {
              otherButton.setAttribute('aria-expanded', 'false');
            }
          }
        });

        
        if (isActive) {
          item.classList.remove('active');
          button.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          button.setAttribute('aria-expanded', 'true');
        }
      });

      // Keyboard support
      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          button.click();
        }
      });
    });

   
  }

  // ................................
  // TERMINAL 
  // ...............................
  function initTerminal() {
    const output = document.getElementById('terminal-output');
    if (!output) return;

    const terminalLines = [
      { text: '[BOOT] Initializing Zeroflux Systems v5.18', cls: 'boot-system' },
      { text: '[OK] Kernel loaded successfully', cls: 'boot-ok' },
      { text: '[OK] Network interfaces online', cls: 'boot-ok' },
      { text: '[OK] SSH service active', cls: 'boot-ok' },
      { text: '[OK] Firewall rules applied', cls: 'boot-ok' },
      { text: '[OK] Monitoring agents running', cls: 'boot-ok' },
      { text: '', cls: '' },
      { text: '[OK] Running infrastructure diagnostics...', cls: 'ai-mode' },
      { text: '[OK] Server uptime ............ 99.98%', cls: 'boot-ok' },
      { text: '[OK] Network latency ......... 12ms', cls: 'boot-ok' },
      { text: '[OK] Backup integrity ........ VERIFIED', cls: 'boot-ok' },
      { text: '[OK] Security posture ........ HIGH', cls: 'boot-ok' },
      { text: '', cls: '' },
      { text: 'zeroflux@ai:~$ monitoring --live', cls: 'boot-system' },
      { text: 'All systems operational.', cls: 'boot-ok' }
    ];

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function typeLine(text, cls) {
      const line = document.createElement('div');
      line.className = `terminal-line ${cls}`;
      output.appendChild(line);

      const cursor = document.createElement('span');
      cursor.className = 'cursor';
      line.appendChild(cursor);

      for (let i = 0; i < text.length; i++) {
        cursor.insertAdjacentText('beforebegin', text.charAt(i));
        await sleep(15 + Math.random() * 25);
      }

      cursor.remove();
    }

    async function startTerminal() {
      // Clear any existing content
      output.innerHTML = '';

      for (const item of terminalLines) {
        await typeLine(item.text, item.cls);
        await sleep(250);
      }
    }

    
    const terminalEl = document.querySelector('.terminal');
    if (!terminalEl) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && output.innerHTML === '') {
          startTerminal();
          observer.disconnect();
        }
      });
    }, { threshold: 0.4 });

    observer.observe(terminalEl);
  }

  // ...........................
  //  CONTACT FORM
  // ...........................
  function initContactForm() {
    const form = document.getElementById('quoteForm');
    const statusDiv = document.getElementById('formStatus');

    if (!form || !statusDiv) return;

    
    const startTimeInput = document.getElementById('formStartTime');
    if (startTimeInput) {
      startTimeInput.value = Date.now();
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('.btn-submit');
      const originalText = submitBtn.textContent;

      // --- SPAM PROTECTION ---

      const website = document.getElementById('website');
      if (website && website.value) {
        console.log('🛡️ Spam blocked: Honeypot triggered');
        showStatus(statusDiv, '✅ Thank you! Your quote request has been sent.', 'success');
        form.reset();
        resetTimestamp(startTimeInput);
        return;
      }

      
      const startTime = parseInt(startTimeInput?.value || 0);
      const timeTaken = Date.now() - startTime;
      if (timeTaken < 3000) {
        console.log(`🛡️ Spam blocked: Submitted too fast (${timeTaken}ms)`);
        showStatus(statusDiv, '✅ Thank you! Your quote request has been sent.', 'success');
        form.reset();
        resetTimestamp(startTimeInput);
        return;
      }

     
      const referrer = document.referrer || '';
      if (referrer && !referrer.includes('zeroflux') && !referrer.includes('localhost')) {
        console.log('🛡️ Spam blocked: Invalid referrer -', referrer);
        showStatus(statusDiv, '✅ Thank you! Your quote request has been sent.', 'success');
        form.reset();
        resetTimestamp(startTimeInput);
        return;
      }

      console.log('✅ Spam checks passed - processing form...');

      

      
      const name = document.getElementById('name')?.value || '';
      const company = document.getElementById('company')?.value || '';
      const email = document.getElementById('email')?.value || '';
      const phone = document.getElementById('phone')?.value || '';
      const service = document.getElementById('service')?.value || '';
      const message = document.getElementById('message')?.value || '';

    
      submitBtn.disabled = true;
      submitBtn.textContent = '⏳ Sending...';
      statusDiv.style.display = 'none';

      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, company, email, phone, service, message }),
        });

        const data = await response.json();

        if (response.ok) {
          showStatus(statusDiv, '✅ Thank you! Your quote request has been sent. We\'ll get back to you within 24 hours.', 'success');
          form.reset();
          resetTimestamp(startTimeInput);
        } else {
          showStatus(statusDiv, data.error || '❌ Failed to send. Please try again.', 'error');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        showStatus(statusDiv, '❌ Network error. Please check your connection and try again.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }

  
  function showStatus(el, message, type) {
    el.style.display = 'block';
    el.textContent = message;

    if (type === 'success') {
      el.style.backgroundColor = '#D1FAE5';
      el.style.color = '#065F46';
      el.style.border = '1px solid #A7F3D0';
    } else {
      el.style.backgroundColor = '#FEE2E2';
      el.style.color = '#991B1B';
      el.style.border = '1px solid #FCA5A5';
    }

    el.style.padding = '15px';
    el.style.borderRadius = '8px';
  }

  
  function resetTimestamp(input) {
    if (input) {
      input.value = Date.now();
    }
  }

  // .....................................
  // 8. INITIALIZATION
  // .....................................
  function init() {
    initTheme();
    initMobileMenu();
    initScrollSpy();
    initReveal();
    initFAQ();
    initTerminal();
    initContactForm();

    console.log('✅ Zeroflux Technologies initialized');
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();