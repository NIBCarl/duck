// SKI MASK DUCK - Website JavaScript

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const nav = document.querySelector('.nav');
  
  if (mobileMenuButton && nav) {
    mobileMenuButton.addEventListener('click', function() {
      nav.classList.toggle('active');
    });
  }

  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize FAQ accordion
  initFaqAccordion();
  
  // Copy address functionality
  initCopyAddress();

  // Swap Widget Functionality
  const connectButton = document.querySelector('.connect-button');
  
  if (connectButton) {
    connectButton.addEventListener('click', function() {
      // In a real implementation, this would connect to a wallet provider
      alert('This would connect to a wallet in a real implementation');
      this.textContent = 'Connected';
      this.disabled = true;
    });
  }

  // Countdown Timer (if present)
  const countdownElement = document.getElementById('countdown');
  
  if (countdownElement) {
    // Set the launch date (example: 1 month from now)
    const launchDate = new Date();
    launchDate.setMonth(launchDate.getMonth() + 1);
    
    function updateCountdown() {
      const now = new Date();
      const distance = launchDate - now;
      
      // Calculate time components
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      // Update the element
      countdownElement.innerHTML = `
        <div class="countdown-item">${days}<span>Days</span></div>
        <div class="countdown-item">${hours}<span>Hours</span></div>
        <div class="countdown-item">${minutes}<span>Minutes</span></div>
        <div class="countdown-item">${seconds}<span>Seconds</span></div>
      `;
      
      // If the countdown is over
      if (distance < 0) {
        clearInterval(countdownTimer);
        countdownElement.innerHTML = "Launched!";
      }
    }
    
    // Update immediately and then set interval
    updateCountdown();
    const countdownTimer = setInterval(updateCountdown, 1000);
  }

  // Tokenomics Animation (example using Intersection Observer)
  const animateTokenomics = () => {
    const tokenomicsCards = document.querySelectorAll('.tokenomics-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add animation class when element comes into view
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    tokenomicsCards.forEach(card => {
      observer.observe(card);
    });
  };
  
  animateTokenomics();

  // Animate tokenomics value counters with percentage animation
  const animateCounters = () => {
    const tokenomicsValues = document.querySelectorAll('.tokenomics-value');
    
    tokenomicsValues.forEach(counter => {
      // Get the target value from the text content
      const target = parseFloat(counter.textContent);
      const duration = 2000; // Animation duration in milliseconds
      const frameRate = 60; // Frames per second
      const totalFrames = duration / 1000 * frameRate;
      let frame = 0;
      
      // Clear existing content
      const originalContent = counter.textContent;
      counter.textContent = '0%';
      
      // Create animation
      const animate = () => {
        frame++;
        const progress = frame / totalFrames;
        const currentValue = Math.round(progress * target);
        
        if (progress < 1) {
          counter.textContent = currentValue + '%';
          requestAnimationFrame(animate);
        } else {
          counter.textContent = originalContent;
        }
      };
      
      // Start animation when element is in viewport
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            requestAnimationFrame(animate);
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      counterObserver.observe(counter);
    });
  };
  
  // Add hover effects to tokenomics cards
  const addCardHoverEffects = () => {
    const cards = document.querySelectorAll('.tokenomics-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.transition = 'transform 0.3s ease';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
      });
    });
  };
  
  // Run animations
  animateCounters();
  addCardHoverEffects();

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (nav && nav.classList.contains('active')) {
          nav.classList.remove('active');
        }
      }
    });
  });

  // Add animation class when scrolling
  const animateOnScroll = () => {
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    elementsToAnimate.forEach(element => {
      observer.observe(element);
    });
  };
  
  animateOnScroll();
});

// Function to initialize scroll animations
function initScrollAnimations() {
    // Get all elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-fade-in, .animate-slide-up, .animate-slide-left, .animate-slide-right, .animate-scale');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add the 'in-view' class when element is visible
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Optionally unobserve after animation is triggered
                // observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.1, // trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // slightly before the element comes into view
    });
    
    // Observe each element
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Function to initialize FAQ accordion
function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isOpen = faqItem.classList.contains('open');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('open');
            });
            
            // Toggle the clicked item
            if (!isOpen) {
                faqItem.classList.add('open');
            }
        });
    });
}

// Function to initialize copy address functionality
function initCopyAddress() {
    const copyButtons = document.querySelectorAll('.copy-address');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const address = button.getAttribute('data-address');
            navigator.clipboard.writeText(address).then(() => {
                // Store original text
                const originalText = button.innerHTML;
                
                // Change button text
                button.innerHTML = '<i data-feather="check"></i> Copied!';
                feather.replace();
                
                // Revert back after 2 seconds
                setTimeout(() => {
                    button.innerHTML = originalText;
                    feather.replace();
                }, 2000);
            });
        });
    });
} 