// Presentation JavaScript
let currentSlideIndex = 1;
const totalSlides = 7;

function updateSlideDisplay() {
  // Hide all slides
  const slides = document.querySelectorAll('.slide');
  slides.forEach(slide => {
    slide.classList.remove('active', 'prev');
  });

  // Show current slide
  const currentSlide = document.getElementById(`slide${currentSlideIndex}`);
  currentSlide.classList.add('active');

  // Update navigation buttons
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  prevBtn.disabled = currentSlideIndex === 1;
  nextBtn.disabled = currentSlideIndex === totalSlides;

  // Update slide counter
  document.getElementById('currentSlide').textContent = currentSlideIndex;

  // Update indicators
  const indicators = document.querySelectorAll('.indicator');
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index + 1 === currentSlideIndex);
  });
}

function changeSlide(direction) {
  const newIndex = currentSlideIndex + direction;
  
  if (newIndex >= 1 && newIndex <= totalSlides) {
    // Add prev class to current slide for smooth transition
    const currentSlide = document.getElementById(`slide${currentSlideIndex}`);
    if (direction > 0) {
      currentSlide.classList.add('prev');
    }
    
    currentSlideIndex = newIndex;
    updateSlideDisplay();
  }
}

function goToSlide(slideNumber) {
  if (slideNumber >= 1 && slideNumber <= totalSlides && slideNumber !== currentSlideIndex) {
    // Add prev class to current slide for smooth transition
    const currentSlide = document.getElementById(`slide${currentSlideIndex}`);
    if (slideNumber > currentSlideIndex) {
      currentSlide.classList.add('prev');
    }
    
    currentSlideIndex = slideNumber;
    updateSlideDisplay();
  }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
  switch(e.key) {
    case 'ArrowLeft':
      changeSlide(-1);
      break;
    case 'ArrowRight':
      changeSlide(1);
      break;
    case 'Home':
      goToSlide(1);
      break;
    case 'End':
      goToSlide(totalSlides);
      break;
  }
});

// Touch gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next slide
      changeSlide(1);
    } else {
      // Swipe right - previous slide
      changeSlide(-1);
    }
  }
}

// Initialize presentation
document.addEventListener('DOMContentLoaded', function() {
  updateSlideDisplay();
  
  // Add smooth loading animation
  const slides = document.querySelectorAll('.slide');
  slides.forEach((slide, index) => {
    if (index === 0) {
      slide.classList.add('active');
    }
  });
});

// Auto-resize on window resize
window.addEventListener('resize', function() {
  // Force re-render on resize for better mobile experience
  const currentSlide = document.getElementById(`slide${currentSlideIndex}`);
  if (currentSlide) {
    currentSlide.style.display = 'none';
    setTimeout(() => {
      currentSlide.style.display = 'flex';
    }, 10);
  }
});

// Prevent default touch behaviors that might interfere
document.addEventListener('touchmove', function(e) {
  if (e.target.closest('.slide-content')) {
    e.stopPropagation();
  }
}, { passive: true });

// Add loading state management
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});