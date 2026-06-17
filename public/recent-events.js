document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('re-lightbox');
  const lightboxImage = document.getElementById('re-lightbox-image');
  const lightboxClose = document.getElementById('re-lightbox-close');
  const lightboxPrev = document.getElementById('re-lightbox-prev');
  const lightboxNext = document.getElementById('re-lightbox-next');
  const lightboxCounter = document.getElementById('re-lightbox-counter');

  let currentImages = [];
  let currentIndex = 0;

  // Attach click to each photo card
  document.querySelectorAll('.event-photo-card').forEach(card => {
    card.addEventListener('click', () => {
      const galleryId = card.getAttribute('data-gallery');
      const galleryEl = document.getElementById(galleryId);
      currentImages = Array.from(galleryEl.querySelectorAll('img'));
      currentIndex = 0;
      openLightbox();
    });
  });

  function openLightbox() {
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateImage();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateImage() {
    const img = currentImages[currentIndex];
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
    lightboxPrev.style.display = currentIndex === 0 ? 'none' : 'block';
    lightboxNext.style.display = currentIndex === currentImages.length - 1 ? 'none' : 'block';
  }

  lightboxClose.addEventListener('click', closeLightbox);

  lightboxNext.addEventListener('click', () => {
    if (currentIndex < currentImages.length - 1) {
      currentIndex++;
      updateImage();
    }
  });

  lightboxPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateImage();
    }
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight' && currentIndex < currentImages.length - 1) { currentIndex++; updateImage(); }
    if (e.key === 'ArrowLeft' && currentIndex > 0) { currentIndex--; updateImage(); }
  });
  window.toggleTestimonial = function(id) {
  const dropdown = document.getElementById(id);
  dropdown.classList.toggle('open');
  const btn = dropdown.previousElementSibling;
  btn.textContent = dropdown.classList.contains('open') ? 'Hide Testimonial' : 'View Testimonial';
};
});