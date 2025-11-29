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
    
    const targetSlide = document.getElementById(`slide${currentSlide}`);
    if (targetSlide) {
        targetSlide.classList.add('active');
        indicators[currentSlide - 1].classList.add('active');
    }
    
    const currentSlideElement = document.getElementById('currentSlide');
    if (currentSlideElement) {
        currentSlideElement.textContent = currentSlide;
    }
    
    // Обновляем состояние кнопок навигации
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) prevBtn.disabled = currentSlide === 1;
    if (nextBtn) nextBtn.disabled = currentSlide === totalSlides;
    
    // Обновляем заголовок страницы
    updatePageTitle();
}

function changeSlide(direction) {
    currentSlide += direction;
    showSlide(currentSlide);
}

function goToSlide(slideNumber) {
    if (slideNumber >= 1 && slideNumber <= totalSlides) {
        currentSlide = slideNumber;
        showSlide(currentSlide);
    }
}

function updatePageTitle() {
    const slideTitles = [
        'Интернет-магазин Django',
        'Обзор проекта',
        'Архитектура',
        'Модели данных',
        'Функциональность',
        'Технологии',
        'Результат'
    ];
    
    if (slideTitles[currentSlide - 1]) {
        document.title = `${slideTitles[currentSlide - 1]} - Презентация`;
    }
}

// Клавиатурная навигация
document.addEventListener('keydown', function(event) {
    // Игнорируем события, если фокус на элементе ввода
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
    }
    
    switch(event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
            event.preventDefault();
            changeSlide(-1);
            break;
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ': // Пробел
            event.preventDefault();
            changeSlide(1);
            break;
        case 'Home':
            event.preventDefault();
            goToSlide(1);
            break;
        case 'End':
            event.preventDefault();
            goToSlide(totalSlides);
            break;
        case 'Escape':
            // Можно добавить полноэкранный режим
            toggleFullscreen();
            break;
    }
});

// Сенсорная навигация для мобильных устройств
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Свайп влево - следующий слайд
            changeSlide(1);
        } else {
            // Свайп вправо - предыдущий слайд
            changeSlide(-1);
        }
    }
}

// Функция полноэкранного режима
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Ошибка входа в полноэкранный режим: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// Улучшенная инициализация
function initPresentation() {
    showSlide(currentSlide);
    
    // Показываем/скрываем индикаторы в зависимости от размера экрана
    const indicators = document.querySelector('.slide-indicators');
    if (indicators) {
        if (window.innerWidth < 768) {
            indicators.classList.add('d-none');
        } else {
            indicators.classList.remove('d-none');
        }
    }
    
    // Обновляем при изменении размера окна
    window.addEventListener('resize', function() {
        if (indicators) {
            if (window.innerWidth < 768) {
                indicators.classList.add('d-none');
            } else {
                indicators.classList.remove('d-none');
            }
        }
    });
}

// Обработка видимости страницы
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Страница скрыта, можно приостановить анимации
        document.body.style.animationPlayState = 'paused';
    } else {
        // Страница видима, возобновляем анимации
        document.body.style.animationPlayState = 'running';
    }
});

// Предзагрузка следующего слайда для улучшения производительности
function preloadNextSlide() {
    if (currentSlide < totalSlides) {
        const nextSlide = document.getElementById(`slide${currentSlide + 1}`);
        if (nextSlide) {
            // Принудительное вычисление стилей для загрузки в память
            nextSlide.offsetHeight;
        }
    }
}

// Автоматическое переключение слайдов (опционально)
let autoSlideInterval = null;

function startAutoSlide(intervalMs = 10000) {
    stopAutoSlide();
    autoSlideInterval = setInterval(() => {
        if (currentSlide < totalSlides) {
            changeSlide(1);
        } else {
            goToSlide(1);
        }
    }, intervalMs);
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

// Управление автопереключением
let isAutoSlideEnabled = false;

function toggleAutoSlide() {
    isAutoSlideEnabled = !isAutoSlideEnabled;
    if (isAutoSlideEnabled) {
        startAutoSlide();
    } else {
        stopAutoSlide();
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initPresentation();
    
    // Предзагрузка изображений
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
    });
    
    // Добавляем обработчики для кнопок навигации
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => changeSlide(-1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => changeSlide(1));
    }
    
    // Обработчики для индикаторов
    const indicatorElements = document.querySelectorAll('.indicator');
    indicatorElements.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index + 1));
    });
    
    // Предотвращаем зум на двойной тап
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Добавляем поддержку жестов для мобильных
    let isScrolling = false;
    
    document.addEventListener('touchmove', function(event) {
        if (Math.abs(event.touches[0].clientY - touchStartX) > 10) {
            isScrolling = true;
        }
    }, { passive: true });
    
    document.addEventListener('touchend', function(event) {
        setTimeout(() => {
            isScrolling = false;
        }, 100);
    }, { passive: true });
});

// Экспорт функций для глобального доступа
window.changeSlide = changeSlide;
window.goToSlide = goToSlide;
window.toggleAutoSlide = toggleAutoSlide;
window.toggleFullscreen = toggleFullscreen;

// Обработка ошибок
window.addEventListener('error', function(event) {
    console.error('Ошибка в презентации:', event.error);
});

// Производительность: Debounce для resize событий
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Применяем debounce к обработчику resize
window.addEventListener('resize', debounce(function() {
    // Переинициализация при изменении размера
    initPresentation();
}, 250));