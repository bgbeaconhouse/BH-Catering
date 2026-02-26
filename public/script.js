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
  document.body.classList.toggle('menu-open');
});

// Close menu when clicking a link
document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    menu.classList.remove('active');
  });
});

// Phone number auto-formatting
function formatPhoneNumber(input) {
  let digits = input.value.replace(/\D/g, '');
  if (digits.length > 10) digits = digits.slice(0, 10);
  if (digits.length === 0) {
    input.value = '';
  } else if (digits.length <= 3) {
    input.value = `(${digits}`;
  } else if (digits.length <= 6) {
    input.value = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  } else {
    input.value = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
}

// Handle dropdown toggle on mobile
document.addEventListener('DOMContentLoaded', () => {
  // Attach phone formatting to all phone inputs on the page
  document.querySelectorAll('input[type="tel"]').forEach(phoneInput => {
    phoneInput.addEventListener('input', () => formatPhoneNumber(phoneInput));
    phoneInput.setAttribute('placeholder', '(555) 555-5555');
    phoneInput.setAttribute('maxlength', '14');
  });

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
          const formContainer = document.querySelector('.form-container');
          formContainer.style.backgroundColor = 'transparent';
          formContainer.style.boxShadow = 'none';
          formContainer.style.padding = '0';
          formContainer.innerHTML = `
            <div style="
              text-align: center;
              padding: 3rem 2rem;
              background: linear-gradient(135deg, #121c4e 0%, #1a2a6e 50%, #121c4e 100%);
              border-radius: 12px;
              border: 1px solid rgba(0, 160, 224, 0.4);
              box-shadow: 0 0 30px rgba(0, 160, 224, 0.15);
            ">
              <h3 style="font-size:2rem; color:#ffffff; font-family:'Lato',sans-serif; font-weight:700; margin-bottom:1rem;">Request Submitted!</h3>
              <p style="font-size:1.1rem; color:rgba(255,255,255,0.85); font-family:'Roboto',sans-serif; line-height:1.8; margin-bottom:2rem;">Thank you for reaching out. We'll be in touch shortly to discuss the details of your event.</p>
              <p style="font-size:1.1rem; color:rgba(255,255,255,0.85); font-family:'Roboto',sans-serif; line-height:1.8; margin-bottom:1.5rem;">Want to learn more about our other social enterprises or how to donate to our cause?</p>
              <div style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; margin-top:1.5rem;">
                <button onclick="window.open('https://beaconhousethrift.org', '_blank')" style="background-color:transparent; color:white; border:2px solid white; padding:12px 28px; font-size:1rem; font-family:'Lato',sans-serif; font-weight:700; border-radius:5px; cursor:pointer;">Thrift Store Site</button>
                <button onclick="window.open('https://www.thebeaconhouse.org/services/culinary/', '_blank')" style="background-color:transparent; color:white; border:2px solid white; padding:12px 28px; font-size:1rem; font-family:'Lato',sans-serif; font-weight:700; border-radius:5px; cursor:pointer;">Culinary Page</button>
                <button onclick="window.open('https://www.thebeaconhouse.org/ways-to-give/donate/', '_blank')" style="background-color:transparent; color:white; border:2px solid white; padding:12px 28px; font-size:1rem; font-family:'Lato',sans-serif; font-weight:700; border-radius:5px; cursor:pointer;">Donate</button>
              </div>
            </div>
          `;
          formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          const formContainer = document.querySelector('.form-container');
          formContainer.insertAdjacentHTML('afterbegin', `
            <div style="background-color:#ffe0e0; border:1px solid #ff4444; border-radius:8px; padding:1rem 1.5rem; margin-bottom:1.5rem; text-align:center;">
              <p style="color:#cc0000; font-family:'Roboto',sans-serif; margin:0;">Sorry, there was an error submitting your request. Please try again or contact us directly at catering@thebeaconhouse.org</p>
            </div>
          `);
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      } catch (error) {
        console.error('Form submission error:', error);
        const formContainer = document.querySelector('.form-container');
        formContainer.insertAdjacentHTML('afterbegin', `
          <div style="background-color:#ffe0e0; border:1px solid #ff4444; border-radius:8px; padding:1rem 1.5rem; margin-bottom:1.5rem; text-align:center;">
            <p style="color:#cc0000; font-family:'Roboto',sans-serif; margin:0;">Sorry, there was an error submitting your request. Please try again or contact us directly at catering@thebeaconhouse.org</p>
          </div>
        `);
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }
});