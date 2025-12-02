// static/js/presentation.js
let currentSlide = 1;
const totalSlides = 7;

function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (n > totalSlides) currentSlide = 1;
    if (n < 1) currentSlide = totalSlides;
    
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    document.getElementById(`slide${currentSlide}`).classList.add('active');
    indicators[currentSlide - 1].classList.add('active');
    
    document.getElementById('currentSlide').textContent = currentSlide;
    
    // Обновляем состояние кнопок навигации
    document.getElementById('prevBtn').disabled = currentSlide === 1;
    document.getElementById('nextBtn').disabled = currentSlide === totalSlides;
}

function changeSlide(direction) {
    currentSlide += direction;
    showSlide(currentSlide);
}

function goToSlide(slideNumber) {
    currentSlide = slideNumber;
    showSlide(currentSlide);
}

// Клавиатурная навигация
document.addEventListener('keydown', function(event) {
    switch(event.key) {
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

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    showSlide(currentSlide);
    
    // Автоматическое переключение слайдов (опционально)
    // setInterval(() => {
    //     if (currentSlide < totalSlides) {
    //         changeSlide(1);
    //     } else {
    //         goToSlide(1);
    //     }
    // }, 10000); // каждые 10 секунд
});