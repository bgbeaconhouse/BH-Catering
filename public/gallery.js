// Gallery tab switching
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.gallery-tab');
  const contents = document.querySelectorAll('.gallery-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs and contents
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      // Add active class to clicked tab
      tab.classList.add('active');

      // Show corresponding content
      const tabName = tab.getAttribute('data-tab');
      document.getElementById(tabName).classList.add('active');
    });
  });

  // Lightbox functionality
  initLightbox();
});

function initLightbox() {
  // Create lightbox HTML
  const lightboxHTML = `
    <div class="lightbox" id="lightbox">
      <button class="lightbox-close" id="lightbox-close">&times;</button>
      <button class="lightbox-prev" id="lightbox-prev">&#10094;</button>
      <div class="lightbox-content">
        <img src="" alt="" class="lightbox-image" id="lightbox-image">
      </div>
      <button class="lightbox-next" id="lightbox-next">&#10095;</button>
      <div class="lightbox-counter" id="lightbox-counter"></div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', lightboxHTML);

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxCounter = document.getElementById('lightbox-counter');
  
  let currentImages = [];
  let currentIndex = 0;

  // Add click event to all gallery items
  document.querySelectorAll('.gallery-item').forEach((item, index) => {
   item.addEventListener('click', () => {
  // Get all images in the same category section
  const activeGallery = item.closest('.gallery-category');
  currentImages = Array.from(activeGallery.querySelectorAll('.gallery-item img'));
      
      // Find the index of clicked image
      const clickedImg = item.querySelector('img');
      currentIndex = currentImages.indexOf(clickedImg);
      
      openLightbox();
    });
  });

  function openLightbox() {
    lightbox.classList.add('active');
    updateLightboxImage();
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }

  function updateLightboxImage() {
    const img = currentImages[currentIndex];
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
    
    // Hide/show navigation buttons at boundaries
    if (currentIndex === 0) {
      lightboxPrev.style.display = 'none';
    } else {
      lightboxPrev.style.display = 'block';
    }
    
    if (currentIndex === currentImages.length - 1) {
      lightboxNext.style.display = 'none';
    } else {
      lightboxNext.style.display = 'block';
    }
  }

  function showNext() {
    if (currentIndex < currentImages.length - 1) {
      currentIndex++;
      updateLightboxImage();
    }
  }

  function showPrev() {
    if (currentIndex > 0) {
      currentIndex--;
      updateLightboxImage();
    }
  }

  // Event listeners
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', showNext);
  lightboxPrev.addEventListener('click', showPrev);

  // Close on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNext();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    }
  });
}