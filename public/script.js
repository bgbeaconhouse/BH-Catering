document.querySelector('.request-btn').addEventListener('click', () => {
  // Check if we're on the homepage
  if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
    // Scroll to the contact form
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  } else {
    // Navigate to homepage with hash
    window.location.href = 'index.html#contact';
  }
});

// Smooth scroll for menu links
document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = link.getAttribute('href');
    if (target.startsWith('#')) {
      e.preventDefault();
      console.log('Navigating to:', target);
      // Add your smooth scroll logic here
    }
    // Let regular links (like about.html) work normally
  });
});

const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  menu.classList.toggle('active');
  document.body.classList.toggle('menu-open');  // ADD THIS LINE
});

// Close menu when clicking a link
document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    menu.classList.remove('active');
  });
});

// Handle dropdown toggle on mobile
document.addEventListener('DOMContentLoaded', () => {
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdown = document.querySelector('.dropdown');
  
  if (dropdownToggle && dropdown) {
    dropdownToggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 993) {
        e.preventDefault();
        dropdown.classList.toggle('active');
      }
    });
  }
  
  // Handle hash navigation on page load
  if (window.location.hash === '#contact') {
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
  
  // Auto-fill catering type from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const cateringType = urlParams.get('type');
  if (cateringType) {
    setTimeout(() => {
      const cateringTypeSelect = document.getElementById('catering-type');
      if (cateringTypeSelect) {
        cateringTypeSelect.value = cateringType;
      }
      // Scroll to form if hash is present
      if (window.location.hash === '#contact') {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 200);
  }
  
  // Handle catering form submission
  const cateringForm = document.querySelector('.catering-form');
  if (cateringForm) {
    cateringForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = cateringForm.querySelector('.submit-btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Get form data
      const formData = new FormData(cateringForm);
      const data = Object.fromEntries(formData.entries());
      
      try {
        const response = await fetch('/api/catering-request', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
          // Show success message
          alert('Thank you! Your catering request has been submitted successfully. We\'ll get back to you soon!');
          cateringForm.reset();
        } else {
          alert('Sorry, there was an error submitting your request. Please try again or contact us directly at beaconhousecatering@gmail.com');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        alert('Sorry, there was an error submitting your request. Please try again or contact us directly at beaconhousecatering@gmail.com');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }
});