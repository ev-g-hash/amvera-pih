document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('helloBtn');
    const message = document.getElementById('message');
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    
    // Устанавливаем размеры canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Массив частиц конфетти
    let confettiParticles = [];
    
    // Класс частицы конфетти
    class ConfettiParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.size = Math.random() * 8 + 4;
            this.speedX = (Math.random() - 0.5) * 6;
            this.speedY = Math.random() * 3 + 2;
            this.color = this.getRandomColor();
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 10;
            this.shape = Math.floor(Math.random() * 3); // 0: квадрат, 1: круг, 2: треугольник
        }
        
        getRandomColor() {
            const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'];
            return colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;
            
            // Добавляем гравитацию
            this.speedY += 0.1;
            
            // Добавляем сопротивление воздуха
            this.speedX *= 0.99;
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            
            switch(this.shape) {
                case 0: // квадрат
                    ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
                    break;
                case 1: // круг
                    ctx.beginPath();
                    ctx.arc(0, 0, this.size/2, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                case 2: // треугольник
                    ctx.beginPath();
                    ctx.moveTo(0, -this.size/2);
                    ctx.lineTo(-this.size/2, this.size/2);
                    ctx.lineTo(this.size/2, this.size/2);
                    ctx.closePath();
                    ctx.fill();
                    break;
            }
            
            ctx.restore();
        }
        
        isOffScreen() {
            return this.y > canvas.height + 10;
        }
    }
    
    // Функция создания конфетти
    function createConfetti() {
        confettiParticles = [];
        const particleCount = 150;
        
        for (let i = 0; i < particleCount; i++) {
            confettiParticles.push(new ConfettiParticle());
        }
    }
    
    // Функция анимации конфетти
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confettiParticles = confettiParticles.filter(particle => {
            particle.update();
            particle.draw();
            return !particle.isOffScreen();
        });
        
        if (confettiParticles.length > 0) {
            requestAnimationFrame(animateConfetti);
        }
    }
    
    // Функция запуска конфетти
    function launchConfetti() {
        createConfetti();
        animateConfetti();
    }
    
    button.addEventListener('click', function() {
        // Показываем сообщение
        message.classList.remove('hidden');
        
        // Запускаем конфетти
        launchConfetti();
        
        // Добавляем анимацию пульсации для кнопки
        button.style.animation = 'pulse 0.6s ease-in-out';
        
        // Убираем анимацию через 0.6 секунды
        setTimeout(() => {
            button.style.animation = '';
        }, 600);
        
        // Добавляем дополнительную анимацию CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
        
        // Удаляем стили через секунду
        setTimeout(() => {
            document.head.removeChild(style);
        }, 1000);
    });
});